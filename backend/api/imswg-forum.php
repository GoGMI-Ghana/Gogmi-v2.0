<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// DATABASE CONFIGURATION
$host = 'localhost';
$dbname = 'u448928185_gogmi';  
$username = 'u448928185_gogmi';           
$password = 'CDCTeam2o25';               

try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!$data) {
        throw new Exception('Invalid data received');
    }
    
    // Validate required fields
    $required = ['fullName', 'email', 'position', 'country'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception(ucfirst($field) . ' is required');
        }
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
    
    // Sanitize input data
    $fullName = htmlspecialchars(trim($data['fullName']));
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $whatsappNumber = htmlspecialchars(trim($data['whatsappNumber'] ?? ''));
    $country = htmlspecialchars(trim($data['country']));
    $position = htmlspecialchars(trim($data['position']));
    $institution = htmlspecialchars(trim($data['institution'] ?? ''));
    
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create table for IMSWG Forum 2026 applications
    $createTable = "
        CREATE TABLE IF NOT EXISTS imswg_forum_2026 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            whatsapp_number VARCHAR(50),
            country VARCHAR(100) NOT NULL,
            position VARCHAR(255) NOT NULL,
            institution VARCHAR(255),
            application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_country (country),
            INDEX idx_status (status),
            INDEX idx_application_date (application_date)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTable);
    
    // Check for duplicate email
    $checkStmt = $pdo->prepare("SELECT id FROM imswg_forum_2026 WHERE email = ?");
    $checkStmt->execute([$email]);
    if ($checkStmt->fetch()) {
        throw new Exception('This email has already been registered for IMSWG Forum 2026');
    }
    
    // Insert new application
    $stmt = $pdo->prepare("
        INSERT INTO imswg_forum_2026 
        (full_name, email, whatsapp_number, country, position, institution) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $fullName, 
        $email, 
        $whatsappNumber, 
        $country, 
        $position, 
        $institution
    ]);
    
    $applicationId = $pdo->lastInsertId();
    $referenceNumber = 'IMSWG2026-' . str_pad($applicationId, 5, '0', STR_PAD_LEFT);
    
    // Send notification email to admin (info@gogmi.org.gh)
    $adminEmail = 'info@gogmi.org.gh';
    $subject = 'New IMSWG Forum 2026 Application - ' . $fullName;
    
    $emailBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #132552; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .field { margin-bottom: 15px; padding: 10px; background-color: white; border-left: 4px solid #8E3400; }
                .field strong { color: #132552; display: inline-block; width: 200px; }
                .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>New IMSWG Forum 2026 Application</h2>
            </div>
            <div class='content'>
                <div class='field'><strong>Application ID:</strong> #$applicationId</div>
                <div class='field'><strong>Reference Number:</strong> $referenceNumber</div>
                <div class='field'><strong>Full Name:</strong> $fullName</div>
                <div class='field'><strong>Email Address:</strong> $email</div>
                <div class='field'><strong>WhatsApp Number:</strong> " . ($whatsappNumber ?: 'Not provided') . "</div>
                <div class='field'><strong>Country of Residence:</strong> $country</div>
                <div class='field'><strong>Position/Title:</strong> $position</div>
                <div class='field'><strong>Institution/Organisation:</strong> " . ($institution ?: 'Not provided') . "</div>
                <div class='field'><strong>Application Date:</strong> " . date('F j, Y \a\t g:i A') . "</div>
                <div class='field'><strong>Status:</strong> <span style='color: orange; font-weight: bold;'>PENDING REVIEW</span></div>
            </div>
            <div class='footer'>
                <p>This is an automated notification from GoGMI IMSWG Forum Registration System</p>
                <p>Gulf of Guinea Maritime Institute &copy; " . date('Y') . "</p>
            </div>
        </body>
        </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: IMSWG Forum <noreply@gogmi.org.gh>\r\n";
    $headers .= "Reply-To: info@gogmi.org.gh\r\n";
    
    // Send to admin
    mail($adminEmail, $subject, $emailBody, $headers);
    
    // Send confirmation email to applicant
    $confirmSubject = 'IMSWG Forum 2026 - Application Received';
    $confirmBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #132552; color: white; padding: 20px; text-align: center; }
                .content { padding: 30px; }
                .highlight { background-color: #f0f8ff; padding: 15px; border-left: 4px solid #8E3400; margin: 20px 0; }
                .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>Application Confirmed</h2>
            </div>
            <div class='content'>
                <p>Dear <strong>$fullName</strong>,</p>
                
                <p>Thank you for your application to participate in the <strong>IMSWG Forum 2026 - Quarter 1</strong>.</p>
                
                <div class='highlight'>
                    <p style='margin: 0;'><strong>Application Reference Number:</strong></p>
                    <h3 style='margin: 10px 0; color: #8E3400;'>$referenceNumber</h3>
                </div>
                
                <p>Your application has been successfully received and is currently under review by our team.</p>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Our team will review your application</li>
                    <li>You will receive an email notification regarding your application status</li>
                    <li>If approved, you will receive further details about the forum</li>
                </ul>
                
                <p>If you have any questions, please contact us at <a href='mailto:info@gogmi.org.gh' style='color: #8E3400;'>info@gogmi.org.gh</a></p>
                
                <p>We look forward to your participation!</p>
                
                <p style='margin-top: 30px;'>
                    Best regards,<br>
                    <strong>Gulf of Guinea Maritime Institute (GoGMI)</strong>
                </p>
            </div>
            <div class='footer'>
                <p>© " . date('Y') . " Gulf of Guinea Maritime Institute. All rights reserved.</p>
            </div>
        </body>
        </html>
    ";
    
    // Send to applicant
    mail($email, $confirmSubject, $confirmBody, $headers);
    
    // Return success response
    echo json_encode([
        'success' => true, 
        'message' => 'Application submitted successfully! You will receive a confirmation email shortly.',
        'data' => [
            'applicationId' => $applicationId,
            'referenceNumber' => $referenceNumber,
            'fullName' => $fullName,
            'email' => $email
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("IMSWG Application Error (PDO): " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'A database error occurred. Please try again later or contact support.'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>
