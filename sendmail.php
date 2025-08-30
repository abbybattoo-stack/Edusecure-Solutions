<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Ensure PHPMailer is installed via Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP settings for GoDaddy Workspace Email
        $mail->isSMTP();
        $mail->Host = 'smtp.secureserver.net';   // GoDaddy SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'info@edusecuresolutions.com'; 
        $mail->Password = 'YOUR_EMAIL_PASSWORD'; 
        $mail->SMTPSecure = 'ssl';  // Use 'tls' if using port 587
        $mail->Port = 465;          // Can also try 587 with tls

        // Sender & recipient
        $mail->setFrom('info@edusecuresolutions.com', 'EduSecure Website');
        $mail->addAddress('info@edusecuresolutions.com'); // Recipient

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message";
        $mail->Body    = "<p><strong>Message:</strong></p><p>$message</p>";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}
?>