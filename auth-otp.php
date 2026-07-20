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

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'u448928185_gogmi_website');
define('DB_USER', 'u448928185_site_database');
define('DB_PASS', 'CDCTeam2o25');

function getDB(): PDO {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    return $pdo;
}

function maskEmail(string $email): string {
    [$local, $domain] = explode('@', $email);
    $masked = substr($local, 0, 2) . str_repeat('*', max(strlen($local) - 2, 3));
    return $masked . '@' . $domain;
}

function sendOTPEmail(string $toEmail, string $toName, string $otp): bool {
    $subject = 'Your GoGMI Login Code';
    $message = "Dear {$toName},\n\n"
        . "Your one-time login code is:\n\n"
        . "  {$otp}\n\n"
        . "This code expires in 10 minutes. Do not share it with anyone.\n\n"
        . "If you did not request this, please ignore this email.\n\n"
        . "— GoGMI Team\n"
        . "Gulf of Guinea Maritime Institute\n"
        . "www.gogmi.org.gh";

    $headers = implode("\r\n", [
        'From: GoGMI <noreply@gogmi.org.gh>',
        'Reply-To: info@gogmi.org.gh',
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ]);

    return mail($toEmail, $subject, $message, $headers);
}

$input  = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

try {
    $pdo = getDB();

    // ── SEND OTP ──────────────────────────────────────────────────────────
    if ($action === 'send') {
        $membershipId = trim($input['membershipId'] ?? '');
        if (!$membershipId) throw new Exception('Membership ID is required.');

        // Look up user via membership
        $stmt = $pdo->prepare("
            SELECT u.id, u.full_name, u.email, m.membership_id, m.status
            FROM memberships m
            JOIN users u ON u.id = m.user_id
            WHERE m.membership_id = ?
            LIMIT 1
        ");
        $stmt->execute([$membershipId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) throw new Exception('Membership ID not found.');
        if ($row['status'] !== 'active') throw new Exception('This membership is not active.');

        // Delete any existing unused OTPs for this user
        $pdo->prepare("DELETE FROM otp_sessions WHERE user_id = ? AND used = 0")->execute([$row['id']]);

        // Generate 6-digit OTP
        $otp     = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $expires = date('Y-m-d H:i:s', strtotime('+10 minutes'));

        $pdo->prepare("INSERT INTO otp_sessions (user_id, otp_code, expires_at) VALUES (?, ?, ?)")
            ->execute([$row['id'], $otp, $expires]);

        $sent = sendOTPEmail($row['email'], $row['full_name'], $otp);

        if (!$sent) {
            error_log("OTP email failed for user {$row['id']} ({$row['email']})");
        }

        echo json_encode([
            'success'      => true,
            'maskedEmail'  => maskEmail($row['email']),
            'message'      => 'OTP sent to your registered email address.',
        ]);

    // ── VERIFY OTP ────────────────────────────────────────────────────────
    } elseif ($action === 'verify') {
        $membershipId = trim($input['membershipId'] ?? '');
        $otpCode      = trim($input['otp'] ?? '');

        if (!$membershipId || !$otpCode) throw new Exception('Membership ID and OTP are required.');

        // Fetch user + OTP session
        $stmt = $pdo->prepare("
            SELECT u.id, u.full_name, u.email, u.phone, u.country, u.organization, u.position,
                   m.membership_id, m.plan_name, m.membership_type, m.status, m.expiry_date,
                   o.id as otp_id, o.otp_code, o.expires_at, o.used
            FROM memberships m
            JOIN users u ON u.id = m.user_id
            LEFT JOIN otp_sessions o ON o.user_id = u.id AND o.used = 0
            WHERE m.membership_id = ?
            ORDER BY o.created_at DESC
            LIMIT 1
        ");
        $stmt->execute([$membershipId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) throw new Exception('Membership ID not found.');
        if ($row['status'] !== 'active') throw new Exception('This membership is not active.');
        if (!$row['otp_id']) throw new Exception('No OTP found. Please request a new one.');
        if ($row['used']) throw new Exception('OTP already used. Please request a new one.');
        if (strtotime($row['expires_at']) < time()) throw new Exception('OTP has expired. Please request a new one.');
        if ($row['otp_code'] !== $otpCode) throw new Exception('Invalid OTP. Please try again.');

        // Mark OTP as used
        $pdo->prepare("UPDATE otp_sessions SET used = 1 WHERE id = ?")->execute([$row['otp_id']]);

        echo json_encode([
            'success' => true,
            'data'    => [
                'user' => [
                    'id'           => $row['id'],
                    'full_name'    => $row['full_name'],
                    'email'        => $row['email'],
                    'phone'        => $row['phone'],
                    'country'      => $row['country'],
                    'organization' => $row['organization'],
                    'position'     => $row['position'],
                ],
                'membership' => [
                    'membership_id'   => $row['membership_id'],
                    'plan_name'       => $row['plan_name'],
                    'membership_type' => $row['membership_type'],
                    'status'          => $row['status'],
                    'expiry_date'     => $row['expiry_date'],
                ],
            ],
        ]);

    } else {
        throw new Exception('Unknown action.');
    }

} catch (Exception $e) {
    error_log('OTP Auth Error: ' . $e->getMessage());
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
