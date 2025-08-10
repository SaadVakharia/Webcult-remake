<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composer autoload

// Load email configuration
$emailConfig = require 'email-config.php';

// Ensure the request is an AJAX POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        !isset($_SERVER['HTTP_X_REQUESTED_WITH']) ||
        strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'
    ) {
        echo json_encode(['type' => 'error', 'text' => 'Sorry, request must be Ajax POST']);
        exit;
    }

    // Get and sanitize POST fields (based on your HTML form)
    $user_name = filter_var($_POST["name"] ?? '', FILTER_SANITIZE_STRING);
    $user_email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST["subject"] ?? '', FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"] ?? '', FILTER_SANITIZE_STRING);

    // Validate fields
    if (strlen($user_name) < 3) {
        echo json_encode(['type' => 'error', 'text' => 'Name is too short or empty!']);
        exit;
    }
    if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['type' => 'error', 'text' => 'Please enter a valid email!']);
        exit;
    }
    if (strlen($subject) < 3) {
        echo json_encode(['type' => 'error', 'text' => 'Subject is required']);
        exit;
    }
    if (strlen($message) < 3) {
        echo json_encode(['type' => 'error', 'text' => 'Too short message! Please enter something.']);
        exit;
    }

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings using config
        $mail->isSMTP();
        $mail->Host = $emailConfig['smtp_host'];
        $mail->SMTPAuth = $emailConfig['smtp_auth'];
        $mail->Username = $emailConfig['smtp_username'];
        $mail->Password = $emailConfig['smtp_password'];
        $mail->SMTPSecure = $emailConfig['smtp_secure'];
        $mail->Port = $emailConfig['smtp_port'];

        // Recipients using config
        $mail->setFrom($emailConfig['from_email'], $emailConfig['from_name']);
        $mail->addAddress($emailConfig['to_email']);

        // Content
        $mail->Subject = $subject;
        $mail->Body = "Message: $message\n\nFrom: $user_name\nEmail: $user_email";

        $mail->send();
        echo json_encode(['type' => 'message', 'text' => "Hi $user_name, thank you for your email."]);
    } catch (Exception $e) {
        echo json_encode(['type' => 'error', 'text' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['type' => 'error', 'text' => 'Invalid request.']);
}
