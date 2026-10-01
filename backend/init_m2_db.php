<?php
/**
 * SCRIPT KHỞI TẠO BẢNG ĐẶT CHỖ & LỊCH KHỞI HÀNH (MỐC M2)
 * Sinh viên: Lại Thị Thùy Dương (V3 - Backend)
 */

$host = '127.0.0.1';
$dbname = 'dulichso';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    echo "===> KET NOI CSDL THANH CONG!\n\n";

    // 1. Tạo bảng tour_schedules (Lịch khởi hành & quản lý tồn chỗ)
    $sqlSchedules = "
    CREATE TABLE IF NOT EXISTS `tour_schedules` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `product_id` INT NOT NULL,
        `departure_date` DATE NOT NULL,
        `return_date` DATE NOT NULL,
        `total_slots` INT NOT NULL DEFAULT 30,
        `available_slots` INT NOT NULL DEFAULT 30,
        `price` DECIMAL(12, 2) NOT NULL,
        `status` ENUM('open', 'closed', 'full') DEFAULT 'open',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_product_date` (`product_id`, `departure_date`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($sqlSchedules);
    echo "[OK] Tao bang `tour_schedules` thanh cong.\n";

    // 2. Tạo bảng bookings (Quản lý giữ chỗ và đặt chỗ có thời hạn)
    $sqlBookings = "
    CREATE TABLE IF NOT EXISTS `bookings` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `booking_code` VARCHAR(20) NOT NULL UNIQUE,
        `user_id` INT NOT NULL,
        `schedule_id` INT NOT NULL,
        `num_slots` INT NOT NULL,
        `total_amount` DECIMAL(12, 2) NOT NULL,
        `status` ENUM('holding', 'confirmed', 'cancelled', 'expired') DEFAULT 'holding',
        `hold_expires_at` DATETIME NOT NULL,
        `contact_name` VARCHAR(100) NOT NULL,
        `contact_phone` VARCHAR(20) NOT NULL,
        `contact_email` VARCHAR(100) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_status_expires` (`status`, `hold_expires_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($sqlBookings);
    echo "[OK] Tao bang `bookings` thanh cong.\n";

    // 3. Nạp dữ liệu mẫu lịch khởi hành để kiểm thử tranh chấp (cho sản phẩm id = 1, còn 5 chỗ)
    $stmtCheck = $pdo->query("SELECT COUNT(*) FROM tour_schedules");
    if ($stmtCheck->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO `tour_schedules` (`product_id`, `departure_date`, `return_date`, `total_slots`, `available_slots`, `price`, `status`)
            VALUES 
            (1, '2026-10-15', '2026-10-18', 20, 5, 2500000.00, 'open'),
            (1, '2026-10-25', '2026-10-28', 30, 15, 2500000.00, 'open'),
            (2, '2026-11-01', '2026-11-05', 25, 20, 4800000.00, 'open');
        ");
        echo "[OK] Nap du lieu mau lich khoi hanh de test giu cho thanh cong!\n";
    }

    echo "\n===> HOAN TAT KHOI TAO CSDL MOC M2 CHO V3!\n";

} catch (PDOException $e) {
    die("Loi CSDL: " . $e->getMessage() . "\n");
}