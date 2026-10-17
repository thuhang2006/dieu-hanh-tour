<?php
// backend/routes/api.php - Cổng điều hướng API và áp dụng Middleware cho Mốc M1

header('Content-Type: application/json; charset=utf-8');

// Bật CORS để Frontend (Vite/Vue) có thể gọi được API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db = require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../app/Middleware/EnsureRole.php';
require_once __DIR__ . '/../app/Controllers/AuthController.php';
require_once __DIR__ . '/../app/Controllers/ProductController.php';

$authController = new AuthController($db);
$productController = new ProductController($db);

// Đọc URI và phương thức HTTP
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Lấy dữ liệu gửi lên (hỗ trợ cả JSON body lẫn $_POST)
$inputJson = json_decode(file_get_contents('php://input'), true) ?? [];
$requestData = array_merge($_POST, $_GET, $inputJson);

// ==================== ĐỊNH TUYẾN API (ROUTING) ====================

// 1. NHÓM XÁC THỰC (AUTHENTICATION)
if ($method === 'POST' && (str_ends_with($uri, '/register') || str_ends_with($uri, '/api/v1/register'))) {
    $authController->register($requestData);
    exit;
}

if ($method === 'POST' && (str_ends_with($uri, '/login') || str_ends_with($uri, '/api/v1/login'))) {
    $authController->login($requestData);
    exit;
}

if ($method === 'POST' && (str_ends_with($uri, '/logout') || str_ends_with($uri, '/api/v1/logout'))) {
    $authController->logout();
    exit;
}

if ($method === 'GET' && (str_ends_with($uri, '/me') || str_ends_with($uri, '/api/v1/me'))) {
    $authController->me();
    exit;
}

// 2. NHÓM QUẢN TRỊ SẢN PHẨM (YÊU CẦU PHÂN QUYỀN ROLE: ADMIN)
if (str_contains($uri, '/admin/san-pham') || str_contains($uri, '/api/v1/admin/san-pham')) {
    if ($method === 'GET') {
        $page = (int)($requestData['page'] ?? 1);
        $productController->index($page);
        exit;
    }

    if ($method === 'POST') {
        $productController->store($requestData);
        exit;
    }

    if ($method === 'PUT') {
        $id = (int)($requestData['id'] ?? 0);
        $productController->update($id, $requestData);
        exit;
    }

    if ($method === 'DELETE') {
        $id = (int)($requestData['id'] ?? 0);
        $productController->destroy($id);
        exit;
    }
}

// 3. NẾU KHÔNG KHỚP ROUTE NÀO
http_response_code(404);
echo json_encode([
    'status' => 'error',
    'code' => 404,
    'message' => 'Điểm cuối API không tồn tại.'
], JSON_UNESCAPED_UNICODE);