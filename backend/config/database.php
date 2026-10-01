<?php
// backend/config/database.php - Kết nối CSDL MySQL và quản lý Session Database cho Mốc M1

$host = '127.0.0.1';
$port = '3306';
$dbname = 'dulichso'; // CSDL của đề tài
$username = 'root';   // Tài khoản XAMPP cục bộ
$password = '';       // Mặc định XAMPP mật khẩu rỗng

try {
    $pdo = new PDO("mysql:host={$host};port={$port};charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Tạo CSDL nếu chưa có
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbname}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `{$dbname}`;");

    // YÊU CẦU MỐC M1: Bảng lưu phiên làm việc (Session) trong CSDL
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `sessions` (
            `id` VARCHAR(128) NOT NULL PRIMARY KEY,
            `user_id` BIGINT UNSIGNED NULL,
            `ip_address` VARCHAR(45) NULL,
            `user_agent` TEXT NULL,
            `payload` LONGTEXT NOT NULL,
            `last_activity` INT NOT NULL,
            INDEX `idx_sessions_user` (`user_id`),
            INDEX `idx_sessions_last_activity` (`last_activity`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

} catch (PDOException $e) {
    die(json_encode([
        'status' => 'error',
        'message' => 'Lỗi kết nối CSDL: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE));
}

return $pdo;