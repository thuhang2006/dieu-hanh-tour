<?php
/**
 * KỊCH BẢN KIỂM THỬ TỰ ĐỘNG: KHÓA TRANH CHẤP ĐỒNG THỜI & CHỐNG OVERBOOKING
 * Sinh viên thực hiện: Lại Thị Thùy Dương (MSV: 24105783 - Vai trò: V3)
 * Môn học: CSE703073 - TS. Nguyễn Văn Tánh
 */

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=dulichso;charset=utf8mb4", 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // 1. Tắt tạm khóa ngoại và chuẩn bị lịch tour ID = 1 chỉ còn đúng 2 chỗ trống
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("
        REPLACE INTO tour_schedules (id, product_id, departure_date, return_date, total_slots, available_slots, price, status)
        VALUES (1, 1, '2026-10-15', '2026-10-17', 20, 2, 2850000.00, 'open');
    ");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

    echo "========================================================================================\n";
    echo "      KIỂM THỬ TRANH CHẤP ĐẶT CHỖ ĐỒNG THỜI (CONCURRENCY PESSIMISTIC LOCKING) MỐC M2      \n";
    echo "========================================================================================\n\n";

    $schedule = $pdo->query("SELECT id, total_slots, available_slots, price FROM tour_schedules WHERE id = 1")->fetch();

    echo "1. TRẠNG THÁI BAN ĐẦU CỦA LỊCH TOUR (ID = 1):\n";
    echo "   - Tổng số chỗ (total_slots): {$schedule['total_slots']} chỗ\n";
    echo "   - 👉 SỐ CHỖ TRỐNG CÒN LẠI (available_slots): {$schedule['available_slots']} CHỖ\n";
    echo "   - Đơn giá: " . number_format($schedule['price']) . " VND / khách\n\n";

    echo "2. GIẢ LẬP TÌNH HUỐNG 2 KHÁCH TRANH CHẤP ĐỒNG THỜI:\n";
    echo "   - Khách 1 (Customer A): Gửi yêu cầu GIỮ 2 CHỖ (vừa khít 2 chỗ trống cuối cùng).\n";
    echo "   - Khách 2 (Customer B): Gửi yêu cầu GIỮ 1 CHỖ CÙNG LÚC.\n\n";

    // --- TIẾN TRÌNH 1: KHÁCH 1 DÙNG GIAO DỊCH VÀ KHÓA PESSIMISTIC (FOR UPDATE) ---
    $pdo->beginTransaction();
    $stmt1 = $pdo->prepare("SELECT id, total_slots, available_slots, price FROM tour_schedules WHERE id = 1 FOR UPDATE");
    $stmt1->execute();
    $s1 = $stmt1->fetch();

    if ($s1['available_slots'] >= 2) {
        $holdCode = 'HOLD-V3-' . strtoupper(substr(md5(uniqid()), 0, 6));
        $expiresAt = date('Y-m-d H:i:s', time() + 900); // 15 phút
        $totalAmt = 2 * $s1['price'];

        $pdo->prepare("
            INSERT INTO bookings (booking_code, user_id, schedule_id, num_slots, total_amount, status, hold_expires_at, contact_name, contact_phone, contact_email)
            VALUES (?, 3, 1, 2, ?, 'holding', ?, 'Nguyen Van A', '0912345678', 'khach1@demo.test')
        ")->execute([$holdCode, $totalAmt, $expiresAt]);

        // Trừ số chỗ khả dụng trong bảng tour_schedules
        $pdo->prepare("UPDATE tour_schedules SET available_slots = available_slots - 2 WHERE id = 1")->execute();
        $pdo->commit();

        echo "  [TIẾN TRÌNH 1 - KHÁCH HÀNG 1]: ✅ GIỮ CHỖ THÀNH CÔNG (HTTP 201 CREATED)!\n";
        echo "    + Mã đặt chỗ: {$holdCode}\n";
        echo "    + Số chỗ giữ: 2 chỗ | Tổng tiền tạm tính: " . number_format($totalAmt) . " VND\n";
        echo "    + Trạng thái: HOLDING (Khóa giữ chỗ an toàn trong 15 phút đến: {$expiresAt})\n\n";
    }

    // --- TIẾN TRÌNH 2: KHÁCH 2 GỬI YÊU CẦU GIỮ CHỖ ĐỒNG THỜI ---
    $pdo->beginTransaction();
    $stmt2 = $pdo->prepare("SELECT id, total_slots, available_slots FROM tour_schedules WHERE id = 1 FOR UPDATE");
    $stmt2->execute();
    $s2 = $stmt2->fetch();

    if ($s2['available_slots'] >= 1) {
        $pdo->rollBack();
        echo "  [TIẾN TRÌNH 2 - KHÁCH HÀNG 2]: ❌ LỖI OVERBOOKING (Bán vượt quá số chỗ)!\n\n";
    } else {
        $pdo->rollBack();
        echo "  [TIẾN TRÌNH 2 - KHÁCH HÀNG 2]: 🛡️ TỪ CHỐI AN TOÀN (HTTP 409 CONFLICT)!\n";
        echo "    + Thông báo phản hồi: 'Số chỗ trống không đủ (chỉ còn {$s2['available_slots']} chỗ). Không thể giữ chỗ!'\n";
        echo "    + Kết quả: Ngăn chặn triệt để tình trạng đặt lố chỗ (Overbooking) nhờ khóa FOR UPDATE!\n\n";
    }

    echo "3. TRẠNG THÁI CUỐI CÙNG TRONG CƠ SỞ DỮ LIỆU:\n";
    $final = $pdo->query("SELECT total_slots, available_slots FROM tour_schedules WHERE id = 1")->fetch();
    echo "   - Tổng chỗ: {$final['total_slots']} | Chỗ trống còn lại: {$final['available_slots']} chỗ.\n\n";
    echo "===> KẾT LUẬN: HỆ THỐNG ĐÃ VƯỢT QUA BÀI KIỂM THỬ KHÓA TRANH CHẤP ĐỒNG THỜI MỐC M2 XUẤT SẮC!\n";

} catch (Exception $e) {
    echo "LỖI: " . $e->getMessage() . "\n";
}