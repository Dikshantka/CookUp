<?php
/**
 * ====================================================================
 * COOK-UP LOGIN HANDLER
 * Processes user authentication and manages login sessions
 * 
 * Features:
 * - Secure password verification using PHP's password_verify()
 * - SQL injection protection with prepared statements
 * - Session management for logged-in users
 * - Admin/regular user role-based redirection
 * - Error handling with try-catch blocks
 * ====================================================================
 */

// Include database configuration
require_once 'config.php';

// Process login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and retrieve form data
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    
    // Validate input data
    if (empty($username) || empty($password)) {
        die("Please fill in all required fields!");
    }
    
    try {
        // Prepare SQL query to find user by username
        // Using prepared statements to prevent SQL injection
        $sql = "SELECT id, username, password_hash, is_admin, created_at FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify user exists and password is correct
        if ($user && password_verify($password, $user['password_hash'])) {
            // Authentication successful - start user session
            session_start();
            
            // Store user information in session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['is_admin'] = $user['is_admin'];
            $_SESSION['login_time'] = date('Y-m-d H:i:s');
            
            // Update last login timestamp
            $updateSql = "UPDATE users SET last_login = NOW() WHERE id = :user_id";
            $updateStmt = $pdo->prepare($updateSql);
            $updateStmt->execute([':user_id' => $user['id']]);
            
            // Redirect based on user role
            if ($user['is_admin']) {
                // Admin users go to dashboard
                header("Location: admin_dashboard.php");
            } else {
                // Regular users go to recipes page
                header("Location: recipes.html");
            }
            exit();
        } else {
            // Authentication failed
            die("Invalid username or password! Please check your credentials and try again.");
        }
        
    } catch(PDOException $e) {
        // Database error handling
        error_log("Login error: " . $e->getMessage());
        die("Login failed due to a system error. Please try again later.");
    }
} else {
    // Redirect to login page if accessed directly
    header("Location: account.html");
    exit();
}
?>