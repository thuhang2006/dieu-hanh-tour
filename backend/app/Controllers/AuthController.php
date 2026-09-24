<?php
// backend/app/Controllers/AuthController.php - Xử lý Xác thực và Băm mật khẩu có muối cho Mốc M1

class AuthController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Đăng ký tài khoản khách hàng mới
     * Mật khẩu được băm có muối bằng bcrypt (cost = 12)
     */
    public function register(array $data): void
    {
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $fullName = trim($data['full_name'] ?? '');

        // 1. Kiểm tra tính hợp lệ dữ liệu phía máy chủ (Server-side validation)
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Email không hợp lệ.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if (strlen($password) < 8) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Mật khẩu phải có tối thiểu 8 ký tự.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        // 2. Kiểm tra email đã tồn tại chưa
        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['status' => 'error', 'message' => 'Email này đã được sử dụng.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        // 3. YÊU CẦU BẮT BUỘC: Băm mật khẩu có muối bằng thuật toán an toàn
        // Tuyệt đối không dùng md5/sha1/sha256 thô
        $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

        // 4. Lưu vào bảng users (chuẩn cấu trúc schema.sql)
        $this->db->beginTransaction();
        try {
            $stmt = $this->db->prepare("
                INSERT INTO users (email, password_hash, role, status, created_at)
                VALUES (?, ?, 'customer', 'active', NOW())
            ");
            $stmt->execute([$email, $passwordHash]);
            $userId = $this->db->lastInsertId();

            // Lưu hồ sơ khách hàng
            $stmtProfile = $this->db->prepare("
                INSERT INTO customer_profiles (user_id, full_name)
                VALUES (?, ?)
            ");
            $stmtProfile->execute([$userId, $fullName ?: 'Khách hàng']);

            $this->db->commit();

            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'Đăng ký tài khoản thành công.',
                'data' => [
                    'id' => $userId,
                    'email' => $email,
                    'role' => 'customer'
                ]
            ], JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Lỗi máy chủ khi tạo tài khoản.'], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Đăng nhập và quản lý phiên làm việc
     */
    public function login(array $data): void
    {
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập đầy đủ email và mật khẩu.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $stmt = $this->db->prepare("SELECT id, email, password_hash, role, status FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        // Kiểm tra mật khẩu băm
        if (!$user || !password_verify($password, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Email hoặc mật khẩu không chính xác.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        if ($user['status'] === 'locked') {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Tài khoản của bạn đã bị khóa.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        // BẮT BUỘC: Khởi tạo phiên và tái sinh ID phiên để chống cố định phiên (Mục 6.2)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_regenerate_id(true);

        $_SESSION['user'] = [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role']
        ];

        // Cập nhật thời điểm đăng nhập gần nhất
        $stmtUpdate = $this->db->prepare("UPDATE users SET last_login_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$user['id']]);

        // Đồng bộ lưu thông tin phiên vào bảng sessions trong CSDL
        $sessionId = session_id();
        $payload = json_encode($_SESSION['user']);
        $stmtSession = $this->db->prepare("
            REPLACE INTO sessions (id, user_id, ip_address, user_agent, payload, last_activity)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmtSession->execute([
            $sessionId,
            $user['id'],
            $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            $_SERVER['HTTP_USER_AGENT'] ?? 'CLI/Browser',
            $payload,
            time()
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Đăng nhập thành công.',
            'user' => $_SESSION['user']
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Đăng xuất và hủy phiên
     */
    public function logout(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Xóa phiên trong bảng sessions của CSDL
        $sessionId = session_id();
        $stmt = $this->db->prepare("DELETE FROM sessions WHERE id = ?");
        $stmt->execute([$sessionId]);

        // Hủy session trên máy chủ
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();

        echo json_encode([
            'status' => 'success',
            'message' => 'Đã đăng xuất và hủy phiên thành công.'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Lấy thông tin phiên hiện tại
     */
    public function me(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['user'])) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Chưa đăng nhập.'], JSON_UNESCAPED_UNICODE);
            return;
        }

        echo json_encode([
            'status' => 'success',
            'user' => $_SESSION['user']
        ], JSON_UNESCAPED_UNICODE);
    }
}