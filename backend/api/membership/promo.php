<?php
// CRITICAL: These headers MUST be first - before ANY other code
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

header('Content-Type: application/json');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$configFile = __DIR__ . '/promo-config.php';
if (!is_file($configFile)) {
    echo json_encode(['success' => true, 'valid' => false, 'reason' => 'invalid']);
    exit();
}
$config = require $configFile;

$data   = json_decode(file_get_contents('php://input'), true);
$code   = strtoupper(trim((string)($data['code'] ?? '')));
$planId = (string)($data['planId'] ?? '');

// Offer window (UTC). With no starts_at, the window opens when the config file was uploaded.
$utc      = new DateTimeZone('UTC');
$startsAt = !empty($config['starts_at'])
    ? (new DateTime($config['starts_at'], $utc))->getTimestamp()
    : filemtime($configFile);
$expiresAt = !empty($config['expires_at'])
    ? (new DateTime($config['expires_at'], $utc))->getTimestamp()
    : $startsAt + ((int)$config['duration_hours']) * 3600;
$now = time();

$reason = null;
if ($code === '' || !hash_equals(strtoupper($config['code']), $code)) {
    $reason = 'invalid';
} elseif ($planId !== '' && !in_array($planId, $config['plans'], true)) {
    $reason = 'plan';
} elseif ($now < $startsAt) {
    $reason = 'not_started';
} elseif ($now >= $expiresAt) {
    $reason = 'expired';
}

if ($reason !== null) {
    echo json_encode(['success' => true, 'valid' => false, 'reason' => $reason]);
    exit();
}

echo json_encode([
    'success'         => true,
    'valid'           => true,
    'code'            => strtoupper($config['code']),
    'discountPercent' => (int)$config['discount_percent'],
    'expiresAt'       => gmdate('c', $expiresAt),
]);
