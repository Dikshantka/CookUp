<?php
//Db connection
$host = 'localhost';
$dbname = 'cookup_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Database connection successful!<br>"; //for debugging issues
} catch(PDOException $e) {
    die("Connection Failed: " . $e->getMessage());
}
?>