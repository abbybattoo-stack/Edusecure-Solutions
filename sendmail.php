<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // make sure Composer dependencies are installed

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'] ?? '';
    $last_name  = $_POST['last_name'] ?? '';
    $email      = $_POST['email'] ?? '';
    $service    = $_POST['service'] ?? '';
    $message    = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.secureserver.net';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@edusecuresolutions.com'; 
        $mail->Password = 'Security@123'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // use ssl
        $mail->Port = 465;

        // From & To
        $mail->setFrom('info@edusecuresolutions.com', 'EduSecure Website');
        $mail->addAddress('info@edusecuresolutions.com');

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message";
        $mail->Body    = "
            <p><strong>Name:</strong> $first_name $last_name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Service:</strong> $service</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}
?>
