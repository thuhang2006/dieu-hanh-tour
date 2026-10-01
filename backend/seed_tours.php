<?php
$pdo = new PDO("mysql:host=127.0.0.1;dbname=dulichso;charset=utf8mb4", 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

// 1. Tắt tạm kiểm tra khóa ngoại để nạp dữ liệu không bị chặn
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");

// 2. Chèn trực tiếp vào products
$pdo->exec("
    REPLACE INTO `products` 
        (`id`, `supplier_id`, `category_id`, `title`, `slug`, `type`, `base_price`, `duration_days`, `capacity`, `cancel_policy`, `status`) 
    VALUES 
        (1, 1, 1, 'Tour Du Thuyen Vinh Ha Long 2N1D Dang Cap 5 Sao', 'tour-vinh-ha-long-2n1d', 'tour', 2850000.00, 2, 20, 'flexible', 'approved'),
        (2, 1, 1, 'Tour Kham Pha Da Nang - Ba Na Hills - Cau Vang 3N2D', 'tour-da-nang-ba-na-hills', 'tour', 3490000.00, 3, 25, 'standard', 'approved'),
        (3, 1, 1, 'Tour Nghi Duong Thien Duong Bien Dao Phu Quoc 4N3D', 'tour-bien-dao-phu-quoc', 'tour', 4950000.00, 4, 30, 'strict', 'approved');
");

$pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

// 3. Đếm số lượng thực tế
$count = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
echo "\n============================================\n";
echo "SỐ LƯỢNG TOUR TRONG BẢNG PRODUCTS HIỆN TẠI: " . $count . " TOUR\n";
echo "============================================\n";

$rows = $pdo->query("SELECT id, title, base_price, status FROM products")->fetchAll();
foreach ($rows as $r) {
    echo "- ID: {$r['id']} | {$r['title']} | Giá: {$r['base_price']} | Status: {$r['status']}\n";
}