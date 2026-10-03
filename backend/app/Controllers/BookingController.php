<?php

namespace App\Controllers;

use App\Http\Middleware\EnsureRole;
use PDO;
use PDOException;
use Exception;

class BookingController
{
    private PDO $db;

    public function __construct()
    {
        // Khởi tạo kết nối CSDL MySQL
        $host = '127.0.0.1';
        $dbname = 'dulichso';
        $username = 'root';
        $password = '';

        $this->db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    /**
     * 1. API GIỮ CHỖ VÀ KHÓA TRANH CHẤP ĐỒNG THỜI (PESSIMISTIC LOCKING)
     * POST /api/v1/bookings/hold
     */
    public function hold(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        // Bắt đầu session nếu chưa có
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Bắt buộc đăng nhập tài khoản (customer hoặc admin)
        if (empty($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode([
                'status'  => 'error',
                'code'    => 401,
                'message' => 'Yêu cầu đăng nhập trước khi thực hiện giữ chỗ tour.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $scheduleId   = (int)($input['schedule_id'] ?? 0);
        $numSlots     = (int)($input['num_slots'] ?? 1);
        $contactName  = trim($input['contact_name'] ?? '');
        $contactPhone = trim($input['contact_phone'] ?? '');
        $contactEmail = trim($input['contact_email'] ?? '');
        $userId       = (int)$_SESSION['user_id'];

        if ($scheduleId <= 0 || $numSlots <= 0 || empty($contactName) || empty($contactPhone)) {
            http_response_code(422);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Dữ liệu không hợp lệ. Vui lòng cung cấp đầy đủ schedule_id, num_slots (> 0), họ tên và số điện thoại.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // === BẮT ĐẦU GIAO DỊCH DATABASE TRANSACTION ===
        try {
            $this->db->beginTransaction();

            // BƯỚC 1: KHÓA BẢN GHI ĐỘC QUYỀN BẰNG "FOR UPDATE"
            // Câu lệnh này giải quyết triệt để tranh chấp: các tiến trình khác cùng đặt lịch này sẽ phải chờ
            $stmt = $this->db->prepare("
                SELECT id, product_id, available_slots, price, status 
                FROM tour_schedules 
                WHERE id = :id 
                FOR UPDATE
            ");
            $stmt->execute([':id' => $scheduleId]);
            $schedule = $stmt->fetch();

            if (!$schedule) {
                $this->db->rollBack();
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Lịch khởi hành không tồn tại.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            if ($schedule['status'] !== 'open') {
                $this->db->rollBack();
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Lịch khởi hành này đã đóng hoặc đã hết chỗ.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            // BƯỚC 2: KIỂM TRA SỐ CHỖ CÒN LẠI (CHỐNG OVERBOOKING)
            if ($schedule['available_slots'] < $numSlots) {
                $this->db->rollBack();
                http_response_code(409); // 409 Conflict: Xung đột tài nguyên đồng thời
                echo json_encode([
                    'status'          => 'conflict',
                    'message'         => 'Rất tiếc! Số chỗ còn lại không đủ (chỉ còn ' . $schedule['available_slots'] . ' chỗ). Vui lòng chọn số lượng ít hơn hoặc chọn chuyến khác!',
                    'available_slots' => (int)$schedule['available_slots']
                ], JSON_UNESCAPED_UNICODE);
                return;
            }

            // BƯỚC 3: CẬP NHẬT TRỪ SỐ CHỖ KHẢ DỤNG
            $updateSlots = $this->db->prepare("
                UPDATE tour_schedules 
                SET available_slots = available_slots - :slots,
                    status = CASE WHEN (available_slots - :slots) = 0 THEN 'full' ELSE status END
                WHERE id = :id
            ");
            $updateSlots->execute([
                ':slots' => $numSlots,
                ':id'    => $scheduleId
            ]);

            // BƯỚC 4: TẠO BẢN GHI GIỮ CHỖ CÓ THỜI HẠN 15 PHÚT
            $bookingCode   = 'BK' . date('Ymd') . strtoupper(substr(uniqid(), -5));
            $totalAmount   = (float)$schedule['price'] * $numSlots;
            $holdExpiresAt = date('Y-m-d H:i:s', strtotime("+15 minutes"));

            $insertBooking = $this->db->prepare("
                INSERT INTO bookings (
                    booking_code, user_id, schedule_id, num_slots, 
                    total_amount, status, hold_expires_at, 
                    contact_name, contact_phone, contact_email
                ) VALUES (
                    :booking_code, :user_id, :schedule_id, :num_slots,
                    :total_amount, 'holding', :hold_expires_at,
                    :contact_name, :contact_phone, :contact_email
                )
            ");
            $insertBooking->execute([
                ':booking_code'    => $bookingCode,
                ':user_id'         => $userId,
                ':schedule_id'     => $scheduleId,
                ':num_slots'       => $numSlots,
                ':total_amount'    => $totalAmount,
                ':hold_expires_at' => $holdExpiresAt,
                ':contact_name'    => $contactName,
                ':contact_phone'   => $contactPhone,
                ':contact_email'   => $contactEmail
            ]);

            $bookingId = (int)$this->db->lastInsertId();

            // BƯỚC 5: COMMIT GIAO DỊCH VÀ GIẢI PHÓNG KHÓA
            $this->db->commit();

            http_response_code(201);
            echo json_encode([
                'status'  => 'success',
                'message' => 'Giữ chỗ thành công! Bạn có 15 phút để hoàn tất xác nhận thanh toán.',
                'data'    => [
                    'booking_id'      => $bookingId,
                    'booking_code'    => $bookingCode,
                    'num_slots'       => $numSlots,
                    'total_amount'    => $totalAmount,
                    'status'          => 'holding',
                    'hold_expires_at' => $holdExpiresAt
                ]
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            http_response_code(500);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Lỗi hệ thống trong giao dịch giữ chỗ: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * 2. API XÁC NHẬN ĐẶT CHỖ
     * POST /api/v1/bookings/confirm
     */
    public function confirm(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Yêu cầu đăng nhập.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $bookingCode = trim($input['booking_code'] ?? '');

        try {
            $this->db->beginTransaction();

            $stmt = $this->db->prepare("SELECT * FROM bookings WHERE booking_code = :code FOR UPDATE");
            $stmt->execute([':code' => $bookingCode]);
            $booking = $stmt->fetch();

            if (!$booking) {
                $this->db->rollBack();
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Không tìm thấy mã đơn đặt chỗ.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            if ($booking['status'] !== 'holding') {
                $this->db->rollBack();
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Đơn đặt chỗ không ở trạng thái chờ thanh toán.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            // Kiểm tra hết hạn giữ chỗ 15 phút
            if (strtotime($booking['hold_expires_at']) < time()) {
                // Hoàn lại số chỗ cho schedule
                $this->db->prepare("
                    UPDATE tour_schedules 
                    SET available_slots = available_slots + :slots, status = 'open' 
                    WHERE id = :id
                ")->execute([':slots' => $booking['num_slots'], ':id' => $booking['schedule_id']]);

                $this->db->prepare("UPDATE bookings SET status = 'expired' WHERE id = :id")
                         ->execute([':id' => $booking['id']]);

                $this->db->commit();
                http_response_code(410);
                echo json_encode(['status' => 'expired', 'message' => 'Đơn giữ chỗ đã quá hạn 15 phút và bị hủy tự động.'], JSON_UNESCAPED_UNICODE);
                return;
            }

            // Xác nhận thành công
            $this->db->prepare("UPDATE bookings SET status = 'confirmed' WHERE id = :id")
                     ->execute([':id' => $booking['id']]);

            $this->db->commit();

            echo json_encode([
                'status'  => 'success',
                'message' => 'Xác nhận đặt chỗ thành công! Chuyến đi của bạn đã được đảm bảo.',
                'data'    => ['booking_code' => $bookingCode, 'status' => 'confirmed']
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
}