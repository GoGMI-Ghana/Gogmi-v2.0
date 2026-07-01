<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

define('PORTAL_ID', '146341722');
define('FORM_ID',   'bc2fb711-814c-4249-ba20-0e31cfb85e0a');

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A valid email address is required.']);
    exit();
}

try {
    $payload = json_encode([
        'fields' => [
            ['objectTypeId' => '0-1', 'name' => 'email', 'value' => $email],
        ],
        'context' => [
            'pageUri'  => $_SERVER['HTTP_REFERER'] ?? 'https://gogmi.org.gh',
            'pageName' => 'GoGMI Website',
        ],
    ]);

    $url = "https://api.hsforms.com/submissions/v3/integration/submit/" . PORTAL_ID . "/" . FORM_ID;

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr) throw new Exception('Connection error: ' . $curlErr);

    if ($httpCode === 200 || $httpCode === 204) {
        echo json_encode(['success' => true, 'message' => 'Thank you for subscribing!']);
    } else {
        $data = json_decode($response, true);
        $msg  = $data['message'] ?? "Submission failed (HTTP $httpCode)";
        throw new Exception($msg);
    }

} catch (Exception $e) {
    error_log('HubSpot Subscribe Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
