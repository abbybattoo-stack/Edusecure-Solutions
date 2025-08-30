<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Ensure PHPMailer is installed via Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName    = htmlspecialchars($_POST['first_name'] ?? '');
    $lastName     = htmlspecialchars($_POST['last_name'] ?? '');
    $email        = htmlspecialchars($_POST['email'] ?? '');
    $organization = htmlspecialchars($_POST['organization'] ?? '');
    $service      = htmlspecialchars($_POST['service'] ?? '');
    $subject      = htmlspecialchars($_POST['subject'] ?? '');
    $message      = htmlspecialchars($_POST['message'] ?? '');

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.secureserver.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@edusecuresolutions.com';
        $mail->Password   = 'Security@123';  // ⚠️ replace with your real password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('info@edusecuresolutions.com', 'EduSecure Website');
        $mail->addAddress('info@edusecuresolutions.com');

        if (!empty($email)) {
            $mail->addReplyTo($email, $firstName . ' ' . $lastName);
        }

        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission: $subject";
        $mail->Body    = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$firstName} {$lastName}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Organization:</strong> {$organization}</p>
            <p><strong>Service Interest:</strong> {$service}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        ";

        $mail->AltBody = "New contact form submission:\n\n"
            . "Name: {$firstName} {$lastName}\n"
            . "Email: {$email}\n"
            . "Organization: {$organization}\n"
            . "Service Interest: {$service}\n"
            . "Subject: {$subject}\n"
            . "Message:\n{$message}";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}
?>
