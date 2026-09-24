<?php
// backend/app/Middleware/EnsureRole.php - Kiểm soát phân quyền tầng máy chủ cho Mốc M1

class EnsureRole
{
    /**
     * Kiểm tra quyền truy cập theo vai trò
     * @param array $allowedRoles Danh sách vai trò được phép (ví dụ: ['admin'])
     */
    public static function check(array $allowedRoles): void
    {
        // Khởi động phiên làm việc nếu chưa có
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // 1. Kiểm tra đăng nhập
        if (!isset($_SESSION['user'])) {
            http_response_code(401);
            echo json_encode([
                'status' => 'error',
                'code' => 401,
                'message' => 'Yêu cầu đăng nhập trước khi thực hiện hành động này.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $user = $_SESSION['user'];

        // 2. Kiểm tra vai trò của người dùng
        if (!in_array($user['role'], $allowedRoles, true)) {
            // Ghi nhật ký cảnh báo truy cập trái phép (chuẩn bị cho mục Báo cáo bảo mật)
            error_log(sprintf(
                "[%s] CANH BAO PHAN QUYEN: User ID %s (vai tro: %s) co tinh truy cap trai phep vao %s tu IP %s",
                date('Y-m-d H:i:s'),
                $user['id'] ?? 'unknown',
                $user['role'] ?? 'unknown',
                $_SERVER['REQUEST_URI'] ?? '',
                $_SERVER['REMOTE_ADDR'] ?? ''
            ));

            // Trả về đúng mã 403 Forbidden theo yêu cầu Mục 5.5 Đề thi
            http_response_code(403);
            echo json_encode([
                'status' => 'error',
                'code' => 403,
                'message' => 'Từ chối truy cập: Bạn không có đủ quyền hạn để vào khu vực quản trị.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}