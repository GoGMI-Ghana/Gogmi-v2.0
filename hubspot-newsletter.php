<?php
/**
 * HubSpot Newsletter (Marketing Emails) API
 * Place this file at: api.gogmi.org.gh/api/courses/hubspot-newsletter.php
 *
 * Fetches published marketing emails from HubSpot to display as newsletters
 * on the GoGMI website.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ── CONFIG ─────────────────────────────────────────────────────────────────
// Use the same HubSpot private app token already used in hubspot-blog.php
define('HUBSPOT_API_KEY', getenv('HUBSPOT_API_KEY') ?: 'YOUR_HUBSPOT_PRIVATE_APP_TOKEN');

$action = $_GET['action'] ?? 'list';
$limit  = min((int)($_GET['limit'] ?? 12), 50);
$offset = max((int)($_GET['offset'] ?? 0), 0);

// ── HELPERS ────────────────────────────────────────────────────────────────
function hubspot_get(string $url): array {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . HUBSPOT_API_KEY,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);

    if ($err) {
        return ['error' => $err, 'code' => 0];
    }
    return ['body' => json_decode($body, true), 'code' => $code];
}

function format_newsletter(array $email): array {
    return [
        'id'            => $email['id'] ?? '',
        'name'          => $email['name'] ?? '',
        'subject'       => $email['subject'] ?? ($email['name'] ?? ''),
        'previewText'   => $email['previewText'] ?? '',
        'publishDate'   => $email['publishDate'] ?? ($email['updatedAt'] ?? ''),
        'thumbnail'     => $email['thumbnail'] ?? null,
        'absoluteUrl'   => $email['absoluteUrl'] ?? null,
        'type'          => 'newsletter',
    ];
}

// ── ROUTES ─────────────────────────────────────────────────────────────────
if ($action === 'list') {
    // HubSpot Marketing Emails v3 — fetch sent/published emails only
    $url = "https://api.hubapi.com/marketing/v3/emails?limit={$limit}&offset={$offset}&state=PUBLISHED";

    $result = hubspot_get($url);

    if (!empty($result['error'])) {
        echo json_encode(['success' => false, 'message' => 'cURL error: ' . $result['error']]);
        exit();
    }

    if ($result['code'] !== 200) {
        echo json_encode([
            'success' => false,
            'message' => 'HubSpot returned HTTP ' . $result['code'],
            'detail'  => $result['body'],
        ]);
        exit();
    }

    $raw    = $result['body'];
    $emails = array_map('format_newsletter', $raw['results'] ?? []);
    $total  = $raw['total'] ?? count($emails);

    echo json_encode([
        'success' => true,
        'data'    => [
            'newsletters' => $emails,
            'total'       => $total,
            'hasMore'     => ($offset + $limit) < $total,
        ],
    ]);
    exit();
}

echo json_encode(['success' => false, 'message' => 'Unknown action']);
