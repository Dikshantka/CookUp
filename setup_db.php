<?php
require_once 'config.php';

try {
    //Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (id INT(11) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_admin BOOLEAN DEFAULT FALSE
    )";
    
    $pdo->exec($sql);
    echo "Users table created successfully!<br>";
    
    //Create admin
    $admin_username = 'admin';
    $admin_email = 'admin@cookup.com';
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    
    $sql = "INSERT IGNORE INTO users (username, email, password_hash, is_admin) 
            VALUES (:username, :email, :password, TRUE)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':username' => $admin_username,
        ':email' => $admin_email,
        ':password' => $admin_password
    ]);
    
    echo "Admin user created!<br>";
    echo "Username: admin<br>";
    echo "Password: admin123<br>";
    echo "<strong>Please change these credentials after first login!</strong>";
    
} catch(PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}
?>