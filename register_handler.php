<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    if (empty($email) || empty($username) || empty($password)) {
        die("All fields are required!");
    }
    
    //hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        //add user into database
        $sql = "INSERT INTO users (username, email, password_hash) 
                VALUES (:username, :email, :password_hash)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password_hash' => $password_hash
        ]);
        
        //back to login page
        header("Location: account.html?registration=success");
        exit();
        
    } catch(PDOException $e) {
        if ($e->getCode() == 23000) {
            die("Username or email already exists!");
        } else {
            die("Error: " . $e->getMessage());
        }
    }
}
?>