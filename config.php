<?php
/**
 * ====================================================================
 * COOK-UP DATABASE CONFIGURATION
 * Central database connection and configuration management
 * 
 * Features:
 * - PDO database connection with error handling
 * - Secure connection parameters
 * - Development/production environment support
 * - UTF-8 character set support
 * ====================================================================
 */

// Database connection parameters
// NOTE: Update these values for your environment
$host = 'localhost';              // Database server hostname
$dbname = 'cookup_db';           // Database name
$username = 'root';              // Database username
$password = '';                  // Database password
$charset = 'utf8mb4';            // Character set for Unicode support

// Construct DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

// PDO connection options for security and performance
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,     // Enable exceptions for errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,          // Set default fetch mode
    PDO::ATTR_EMULATE_PREPARES   => false,                     // Use real prepared statements
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"        // Set charset for the connection
];

try {
    // Establish database connection
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Optional: Display success message for debugging (remove in production)
    if (isset($_GET['debug']) && $_GET['debug'] === 'true') {
        echo "<div style='background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;'>";
        echo "✅ Database connection successful!<br>";
        echo "Connected to: $dbname on $host<br>";
        echo "Character set: $charset";
        echo "</div>";
    }
    
} catch(PDOException $e) {
    // Log error details for debugging (in production, log to file instead of displaying)
    error_log("Database connection failed: " . $e->getMessage());
    
    // Display user-friendly error message
    die("<div style='background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px; font-family: Arial, sans-serif;'>
            <strong>Database Connection Failed!</strong><br>
            Unable to connect to the Cook-Up database. Please check your configuration and try again.<br>
            <small>Error details have been logged for the administrator.</small>
         </div>");
}

/**
 * Global database connection is now available as $pdo
 * Use this connection object throughout the application
 * Example: $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
 */
?>