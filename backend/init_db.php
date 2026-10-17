<?php
// backend/init_db.php - Tự động nạp bảng và khởi tạo tài khoản mẫu chuẩn Mốc M1

$host = '127.0.0.1';
$port = '3306';
$dbname = 'dulichso';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host={$host};port={$port};charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    echo "1. Đang tạo cơ sở dữ liệu `{$dbname}`...\n";
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbname}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `{$dbname}`;");

    echo "2. Đang tạo cấu trúc các bảng theo chuẩn schema...\n";
    
    // Bảng users
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `users` (
          `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          `email` VARCHAR(180) NOT NULL UNIQUE,
          `password_hash` VARCHAR(255) NOT NULL,
          `role` ENUM('admin','supplier','customer','guide') NOT NULL DEFAULT 'customer',
          `status` ENUM('active','locked') NOT NULL DEFAULT 'active',
          `last_login_at` TIMESTAMP NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX `idx_users_role_status` (`role`, `status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Bảng customer_profiles
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `customer_profiles` (
          `user_id` BIGINT UNSIGNED PRIMARY KEY,
          `full_name` VARCHAR(160) NOT NULL,
          `phone` VARCHAR(20) NULL,
          `preferences` JSON NULL,
          CONSTRAINT `fk_cp_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Bảng suppliers
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `suppliers` (
          `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          `user_id` BIGINT UNSIGNED NULL,
          `name` VARCHAR(180) NOT NULL,
          `tax_code` VARCHAR(20) NULL,
          `province` VARCHAR(80) NOT NULL,
          `status` ENUM('pending','approved','suspended') NOT NULL DEFAULT 'approved'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Bảng categories
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `categories` (
          `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          `parent_id` BIGINT UNSIGNED NULL,
          `name` VARCHAR(120) NOT NULL,
          `slug` VARCHAR(140) NOT NULL UNIQUE,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Bảng products
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `products` (
          `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          `supplier_id` BIGINT UNSIGNED NOT NULL DEFAULT 1,
          `category_id` BIGINT UNSIGNED NOT NULL DEFAULT 1,
          `title` VARCHAR(200) NOT NULL,
          `slug` VARCHAR(220) NOT NULL UNIQUE,
          `type` ENUM('tour','stay','transfer','ticket','experience') NOT NULL DEFAULT 'tour',
          `base_price` DECIMAL(12,2) NOT NULL,
          `duration_days` TINYINT UNSIGNED NOT NULL DEFAULT 1,
          `capacity` SMALLINT UNSIGNED NOT NULL,
          `cancel_policy` VARCHAR(255) NOT NULL,
          `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'published',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Bảng sessions (Lưu phiên vào CSDL)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `sessions` (
          `id` VARCHAR(128) NOT NULL PRIMARY KEY,
          `user_id` BIGINT UNSIGNED NULL,
          `ip_address` VARCHAR(45) NULL,
          `user_agent` TEXT NULL,
          `payload` LONGTEXT NOT NULL,
          `last_activity` INT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    echo "3. Đang tạo các tài khoản kiểm thử và băm mật khẩu có muối...\n";
    $rawPassword = 'Demo@2026!';
    $passwordHash = password_hash($rawPassword, PASSWORD_BCRYPT, ['cost' => 12]);

    $testUsers = [
        ['admin@demo.test', 'admin', 'Quản trị viên hệ thống'],
        ['supplier@demo.test', 'supplier', 'Công ty Lữ hành Quốc tế'],
        ['khach@demo.test', 'customer', 'Lại Thị Thùy Dương']
    ];

    foreach ($testUsers as $u) {
        $pdo->prepare("DELETE FROM users WHERE email = ?")->execute([$u[0]]);
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role, status, created_at) VALUES (?, ?, ?, 'active', NOW())");
        $stmt->execute([$u[0], $passwordHash, $u[1]]);
        $uid = $pdo->lastInsertId();

        $pdo->prepare("INSERT INTO customer_profiles (user_id, full_name) VALUES (?, ?)")->execute([$uid, $u[2]]);
        echo "   [OK] Đã tạo tài khoản: {$u[0]} | Vai trò: {$u[1]} | Mật khẩu thô: {$rawPassword}\n";
    }

    // Chèn 1 nhà cung cấp và 1 danh mục mẫu nếu chưa có
    $pdo->exec("INSERT IGNORE INTO suppliers (id, name, province, status) VALUES (1, 'Công ty Du lịch Hà Nội', 'Hà Nội', 'approved');");
    $pdo->exec("INSERT IGNORE INTO categories (id, name, slug) VALUES (1, 'Tour trọn gói', 'tour-tron-goi');");

    echo "\n=== KẾT QUẢ THỰC TẾ TRONG CSDL ===\n";
    $query = $pdo->query("SELECT id, email, role, password_hash FROM users");
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: {$row['id']} | Email: {$row['email']} | Role: {$row['role']} | Hash: {$row['password_hash']}\n";
    }

    echo "\n===> KHỞI TẠO CSDL & MẬT KHẨU BĂM THÀNH CÔNG RỰC RỠ!\n";

} catch (PDOException $e) {
    die("Lỗi: " . $e->getMessage() . "\n");
}