<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Set HUBSPOT_TOKEN in your server environment (e.g. .env or Apache/Nginx config)
// It is the same token used in hubspot-blog.php
define('HUBSPOT_TOKEN', getenv('HUBSPOT_TOKEN') ?: '');
define('HUBSPOT_API', 'https://api.hubapi.com');

$action = $_GET['action'] ?? 'list';

try {
    if ($action === 'list') {
        $limit  = min((int)($_GET['limit'] ?? 12), 50);
        $offset = (int)($_GET['offset'] ?? 0);

        // Fetch sent/published marketing emails
        $url = HUBSPOT_API . "/marketing/v3/emails?limit={$limit}&offset={$offset}&state=PUBLISHED";

        $data = hubspotRequest($url);

        $newsletters = [];
        foreach ($data['results'] ?? [] as $email) {
            $newsletters[] = [
                'id'          => $email['id'],
                'subject'     => $email['subject'] ?? ($email['name'] ?? 'Newsletter'),
                'name'        => $email['name'] ?? '',
                'previewText' => $email['previewText'] ?? '',
                'publishDate' => $email['publishDate'] ?? ($email['updatedAt'] ?? ''),
                'thumbnail'   => $email['thumbnail'] ?? null,
                'absoluteUrl' => $email['absoluteUrl'] ?? null,
            ];
        }

        $total = $data['total'] ?? count($newsletters);

        echo json_encode([
            'success' => true,
            'data'    => [
                'newsletters' => $newsletters,
                'total'       => $total,
                'offset'      => $offset,
                'limit'       => $limit,
                'hasMore'     => $total > ($offset + $limit),
            ]
        ]);

    } else {
        throw new Exception('Unknown action: ' . $action);
    }

} catch (Exception $e) {
    error_log('HubSpot Newsletter API Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

function hubspotRequest(string $url): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . HUBSPOT_TOKEN,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        throw new Exception('Connection error: ' . $curlErr);
    }

    if ($httpCode >= 400) {
        $errorData = json_decode($response, true);
        $msg = $errorData['message'] ?? "HubSpot API error (HTTP $httpCode)";
        throw new Exception($msg);
    }

    return json_decode($response, true) ?? [];
}
