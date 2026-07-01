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

define('HUBSPOT_TOKEN', getenv('HUBSPOT_TOKEN') ?: '');
define('HUBSPOT_API', 'https://api.hubapi.com');

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A valid email address is required.']);
    exit();
}

try {
    // Try to create contact; if already exists, update subscription status
    $payload = json_encode([
        'properties' => [
            'email'                        => $email,
            'hs_email_optout_all_email'    => false,
        ]
    ]);

    $ch = curl_init(HUBSPOT_API . '/crm/v3/objects/contacts');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . HUBSPOT_TOKEN,
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

    $data = json_decode($response, true);

    // 409 = contact already exists — treat as success
    if ($httpCode === 201 || $httpCode === 200 || $httpCode === 409) {
        echo json_encode(['success' => true, 'message' => 'Thank you for subscribing!']);
    } else {
        $msg = $data['message'] ?? "Subscription failed (HTTP $httpCode)";
        throw new Exception($msg);
    }

} catch (Exception $e) {
    error_log('HubSpot Subscribe Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
