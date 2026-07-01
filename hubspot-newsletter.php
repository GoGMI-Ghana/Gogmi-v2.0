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

// Same token as hubspot-blog.php — paste it directly here on the server
define('HUBSPOT_TOKEN', getenv('HUBSPOT_TOKEN') ?: '');
define('HUBSPOT_API', 'https://api.hubapi.com');

$action = $_GET['action'] ?? 'list';

try {

    // ── LIST ─────────────────────────────────────────────────────────────
    if ($action === 'list') {
        $limit  = min((int)($_GET['limit'] ?? 12), 50);
        $offset = (int)($_GET['offset'] ?? 0);

        $url  = HUBSPOT_API . "/marketing/v3/emails?limit={$limit}&offset={$offset}&state=PUBLISHED";
        $data = hubspotRequest($url);

        $newsletters = [];
        foreach ($data['results'] ?? [] as $email) {
            $newsletters[] = formatNewsletter($email);
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

    // ── SINGLE ───────────────────────────────────────────────────────────
    } elseif ($action === 'single') {
        $id = $_GET['id'] ?? '';
        if (!$id) throw new Exception('ID is required');

        $email = hubspotRequest(HUBSPOT_API . "/marketing/v3/emails/{$id}");

        // Try to get the rendered HTML body
        // HubSpot stores email HTML in content.html or rssEmailBody
        $html = $email['content']['html']
             ?? $email['rssEmailBody']
             ?? $email['primaryEmailBody']
             ?? null;

        // If no inline HTML, try fetching the web-version URL and returning it as raw HTML
        if (!$html && !empty($email['absoluteUrl'])) {
            $ch = curl_init($email['absoluteUrl']);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_TIMEOUT        => 15,
                CURLOPT_USERAGENT      => 'GoGMI-Website/1.0',
            ]);
            $fetched = curl_exec($ch);
            $code    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($code === 200 && $fetched) {
                $html = $fetched;
            }
        }

        echo json_encode([
            'success' => true,
            'data'    => array_merge(formatNewsletter($email), ['html' => $html]),
        ]);

    } else {
        throw new Exception('Unknown action: ' . $action);
    }

} catch (Exception $e) {
    error_log('HubSpot Newsletter API Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function formatNewsletter(array $email): array {
    return [
        'id'          => $email['id'],
        'subject'     => $email['subject'] ?? ($email['name'] ?? 'Newsletter'),
        'name'        => $email['name'] ?? '',
        'previewText' => $email['previewText'] ?? '',
        'publishDate' => $email['publishDate'] ?? ($email['updatedAt'] ?? ''),
        'thumbnail'   => $email['thumbnail'] ?? null,
        'absoluteUrl' => $email['absoluteUrl'] ?? null,
    ];
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

    if ($curlErr) throw new Exception('Connection error: ' . $curlErr);

    if ($httpCode >= 400) {
        $errorData = json_decode($response, true);
        throw new Exception($errorData['message'] ?? "HubSpot API error (HTTP $httpCode)");
    }

    return json_decode($response, true) ?? [];
}
