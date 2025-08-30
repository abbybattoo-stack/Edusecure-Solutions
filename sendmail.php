<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php'; // Adjust path if vendor is not in same folder

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect form inputs safely
    $first_name = htmlspecialchars($_POST['first_name'] ?? '');
    $last_name  = htmlspecialchars($_POST['last_name'] ?? '');
    $email      = htmlspecialchars($_POST['email'] ?? '');
    $service    = htmlspecialchars($_POST['service'] ?? '');
    $message    = htmlspecialchars($_POST['message'] ?? '');

    $mail = new PHPMailer(true);

    try {
        // SMTP settings for GoDaddy
        $mail->isSMTP();
        $mail->Host       = 'smtp.secureserver.net';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@edusecuresolutions.com';  // Your email
        $mail->Password   = 'Security@123';                 // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // SSL
        $mail->Port       = 465;                            // SSL port

        // Sender & Recipient
        $mail->setFrom('info@edusecuresolutions.com', 'EduSecure Website');
        $mail->addAddress('info@edusecuresolutions.com');   // Send to yourself

        // (Optional) add user as reply-to
        if (!empty($email)) {
            $mail->addReplyTo($email, $first_name . ' ' . $last_name);
        }

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message";
        $mail->Body    = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$first_name} {$last_name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Service:</strong> {$service}</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
        ";

        // Send email
        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}
