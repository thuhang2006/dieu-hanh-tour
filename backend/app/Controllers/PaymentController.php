<?php

namespace App\Controllers;

use PDO;
use PDOException;

class PaymentController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = new PDO("mysql:host=127.0.0.1;dbname=dulichso;charset=utf8mb4", 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        // Đảm bảo bảng bookings chấp nhận trạng thái đa dạng và có bảng payments
        $this->db->exec("
            ALTER TABLE `bookings` MODIFY COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'holding';
            CREATE TABLE IF NOT EXISTS `payments` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `booking_id` INT NOT NULL,
                `transaction_code` VARCHAR(100) NOT NULL UNIQUE,
                `amount` DECIMAL(12,2) NOT NULL,
                `payment_method` VARCHAR(50) DEFAULT 'sandbox',
                `status` VARCHAR(50) DEFAULT 'completed',
                `refund_amount` DECIMAL(12,2) DEFAULT 0.00,
                `refund_fee` DECIMAL(12,2) DEFAULT 0.00,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function sendResponse(int $code, array $data): void
    {
        if (!headers_sent()) {
            http_response_code($code);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * 1. API Xác nhận thanh toán Sandbox (Tự sinh mã SBX...)
     */
    public function sandboxPay(int $customBookingId = 0): void
    {
        $rawInput = file_get_contents('php://input');
        $jsonInput = !empty($rawInput) ? json_decode($rawInput, true) : null;
        $input = $jsonInput ?: $_REQUEST;

        $bookingId = $customBookingId ?: (int)($input['booking_id'] ?? 0);

        if ($bookingId <= 0) {
            $this->sendResponse(400, ['status' => 'error', 'message' => 'Vui lòng cung cấp booking_id hợp lệ']);
            return;
        }

        try {
            $stmt = $this->db->prepare("SELECT * FROM bookings WHERE id = ?");
            $stmt->execute([$bookingId]);
            $booking = $stmt->fetch();

            if (!$booking) {
                $this->sendResponse(404, ['status' => 'error', 'message' => 'Không tìm thấy đơn đặt tour']);
                return;
            }

            if ($booking['status'] === 'da_thanh_toan' || $booking['status'] === 'paid') {
                $this->sendResponse(400, ['status' => 'error', 'message' => 'Đơn đặt này đã được thanh toán trước đó!']);
                return;
            }

            if (in_array($booking['status'], ['cancelled', 'expired', 'huy_don'])) {
                $this->sendResponse(400, ['status' => 'error', 'message' => 'Không thể thanh toán đơn hàng đã bị hủy hoặc hết hạn!']);
                return;
            }

            // Tự động sinh mã giao dịch SBX + NămThángNgàyGiờPhútGiây + Mã ngẫu nhiên
            $transactionCode = 'SBX' . date('YmdHis') . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
            $amount = (float)$booking['total_amount'];

            $this->db->beginTransaction();

            // Cập nhật trạng thái đơn sang 'da_thanh_toan'
            $updateStmt = $this->db->prepare("UPDATE bookings SET status = 'da_thanh_toan' WHERE id = ?");
            $updateStmt->execute([$bookingId]);

            // Ghi nhận vào bảng payments
            $payStmt = $this->db->prepare("
                INSERT INTO payments (booking_id, transaction_code, amount, payment_method, status)
                VALUES (?, ?, ?, 'sandbox', 'completed')
            ");
            $payStmt->execute([$bookingId, $transactionCode, $amount]);

            $this->db->commit();

            $this->sendResponse(200, [
                'status' => 'success',
                'message' => 'Xác nhận thanh toán thử nghiệm Sandbox thành công!',
                'data' => [
                    'booking_id'       => $bookingId,
                    'booking_code'     => $booking['booking_code'],
                    'transaction_code' => $transactionCode,
                    'amount'           => $amount,
                    'order_status'     => 'da_thanh_toan',
                    'payment_method'   => 'Sandbox Thử nghiệm',
                    'paid_at'          => date('Y-m-d H:i:s')
                ]
            ]);

        } catch (PDOException $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            $this->sendResponse(500, ['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    /**
     * 2. Máy trạng thái đơn: Xử lý hủy đơn và hoàn tiền (Thu phí 30%, hoàn 70%)
     * CHẶN HOÀN TIỀN NẾU ĐƠN CHƯA THANH TOÁN
     */
    public function cancelAndRefund(int $customBookingId = 0): void
    {
        $rawInput = file_get_contents('php://input');
        $jsonInput = !empty($rawInput) ? json_decode($rawInput, true) : null;
        $input = $jsonInput ?: $_REQUEST;

        $bookingId = $customBookingId ?: (int)($input['booking_id'] ?? 0);

        if ($bookingId <= 0) {
            $this->sendResponse(400, ['status' => 'error', 'message' => 'Vui lòng cung cấp booking_id hợp lệ']);
            return;
        }

        try {
            $stmt = $this->db->prepare("SELECT * FROM bookings WHERE id = ?");
            $stmt->execute([$bookingId]);
            $booking = $stmt->fetch();

            if (!$booking) {
                $this->sendResponse(404, ['status' => 'error', 'message' => 'Không tìm thấy đơn đặt tour']);
                return;
            }

            // QUY TẮC MÁY TRẠNG THÁI: CHẶN NẾU CHƯA THANH TOÁN
            if ($booking['status'] !== 'da_thanh_toan' && $booking['status'] !== 'paid') {
                $this->sendResponse(400, [
                    'status' => 'error',
                    'code'   => 'BLOCKED_REFUND_UNPAID',
                    'message' => "Chặn hoàn tiền: Đơn hàng đang ở trạng thái '{$booking['status']}' (chưa thanh toán). Không đủ điều kiện hoàn tiền!",
                    'current_status' => $booking['status']
                ]);
                return;
            }

            $totalAmount = (float)$booking['total_amount'];
            $feePercentage = 0.30;    // Thu phí 30%
            $refundPercentage = 0.70; // Hoàn tiền 70%

            $cancellationFee = round($totalAmount * $feePercentage, 2);
            $refundAmount    = round($totalAmount * $refundPercentage, 2);

            $this->db->beginTransaction();

            // Chuyển trạng thái đơn sang 'da_huy_hoan_tien'
            $updateBooking = $this->db->prepare("UPDATE bookings SET status = 'da_huy_hoan_tien' WHERE id = ?");
            $updateBooking->execute([$bookingId]);

            // Cập nhật bảng payments
            $updatePay = $this->db->prepare("
                UPDATE payments 
                SET status = 'refunded', refund_fee = ?, refund_amount = ? 
                WHERE booking_id = ?
            ");
            $updatePay->execute([$cancellationFee, $refundAmount, $bookingId]);

            // Trả lại số chỗ vào lịch tour (nếu có schedule_id)
            if (!empty($booking['schedule_id']) && !empty($booking['num_slots'])) {
                $restoreSeats = $this->db->prepare("
                    UPDATE tour_schedules 
                    SET available_slots = available_slots + ? 
                    WHERE id = ?
                ");
                $restoreSeats->execute([(int)$booking['num_slots'], (int)$booking['schedule_id']]);
            }

            $this->db->commit();

            $this->sendResponse(200, [
                'status'  => 'success',
                'message' => 'Hủy đơn và hoàn tiền theo chính sách thành công!',
                'data' => [
                    'booking_id'       => $bookingId,
                    'booking_code'     => $booking['booking_code'],
                    'previous_status'  => $booking['status'],
                    'new_status'       => 'da_huy_hoan_tien',
                    'total_amount'     => $totalAmount,
                    'cancellation_fee' => $cancellationFee,
                    'fee_rate'         => '30%',
                    'refund_amount'    => $refundAmount,
                    'refund_rate'      => '70%',
                    'policy_applied'   => 'Thu phí hủy 30%, hoàn trả 70% giá trị đơn hàng cho khách hàng.'
                ]
            ]);

        } catch (PDOException $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            $this->sendResponse(500, ['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}