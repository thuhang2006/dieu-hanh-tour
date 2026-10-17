<?php
// backend/seed_users.php - Khởi tạo các tài khoản kiểm thử có mật khẩu băm có muối (Mốc M1)

$db = require_once __DIR__ . '/config/database.php';

// Mật khẩu kiểm thử chung: Demo@2026!
$rawPassword = 'Demo@2026!';

// Băm mật khẩu có muối bằng BCRYPT (cost = 12)
$passwordHash = password_hash($rawPassword, PASSWORD_BCRYPT, ['cost' => 12]);

$testUsers = [
    [
        'email' => 'admin@demo.test',
        'role' => 'admin',
        'full_name' => 'Quản trị viên hệ thống'
    ],
    [
        'email' => 'supplier@demo.test',
        'role' => 'supplier',
        'full_name' => 'Công ty Du lịch Demo'
    ],
    [
        'email' => 'khach@demo.test',
        'role' => 'customer',
        'full_name' => 'Lại Thị Thùy Dương'
    ]
];

echo "Bắt đầu tạo tài khoản kiểm thử...\n";

foreach ($testUsers as $u) {
    // Xóa nếu đã tồn tại trước đó để nạp lại
    $stmtDel = $db->prepare("DELETE FROM users WHERE email = ?");
    $stmtDel->execute([$u['email']]);

    // Thêm vào bảng users
    $stmt = $db->prepare("
        INSERT INTO users (email, password_hash, role, status, created_at)
        VALUES (?, ?, ?, 'active', NOW())
    ");
    $stmt->execute([$u['email'], $passwordHash, $u['role']]);
    $userId = $db->lastInsertId();

    // Thêm hồ sơ khách hàng
    $stmtProf = $db->prepare("
        INSERT INTO customer_profiles (user_id, full_name)
        VALUES (?, ?)
    ");
    $stmtProf->execute([$userId, $u['full_name']]);

    echo "-> Đã tạo tài khoản: {$u['email']} | Vai trò: {$u['role']} | Mật khẩu thô: {$rawPassword}\n";
}

echo "\nChuỗi băm mật khẩu thực tế trong CSDL: " . $passwordHash . "\n";
echo "==> NẠP DỮ LIỆU TÀI KHOẢN MẪU HOÀN TẤT!\n";