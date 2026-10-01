<?php
/**
 * BỘ ĐỊNH TUYẾN CHÍNH (MAIN API ROUTER) - MỐC M2
 * Sinh viên: Lại Thị Thùy Dương (V3)
 */

// Bật hiển thị lỗi chi tiết để dễ kiểm tra
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Cấu hình CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nạp các Middleware và Controller
if (file_exists(__DIR__ . '/app/Http/Middleware/EnsureRole.php')) {
    require_once __DIR__ . '/app/Http/Middleware/EnsureRole.php';
}
require_once __DIR__ . '/app/Controllers/SearchController.php';
require_once __DIR__ . '/app/Controllers/BookingController.php';

use App\Controllers\SearchController;
use App\Controllers\BookingController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

switch (true) {
    // 1. API Tìm kiếm tour
    case ($method === 'GET' && $uri === '/api/v1/tours/search'):
        $controller = new SearchController();
        $controller->search();
        break;

    // 2. API Giữ chỗ & Khóa tranh chấp
    case ($method === 'POST' && $uri === '/api/v1/bookings/hold'):
        $controller = new BookingController();
        $controller->hold();
        break;

    // 3. API Xác nhận đặt chỗ
    case ($method === 'POST' && $uri === '/api/v1/bookings/confirm'):
        $controller = new BookingController();
        $controller->confirm();
        break;

    default:
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'system'    => 'Hệ thống Quản lý và Điều hành Tour Du lịch số',
            'milestone' => 'M2',
            'developer' => 'Lai Thi Thuy Duong (V3)',
            'status'    => 'running',
            'endpoints' => [
                'search'  => 'GET /api/v1/tours/search',
                'hold'    => 'POST /api/v1/bookings/hold',
                'confirm' => 'POST /api/v1/bookings/confirm'
            ]
        ], JSON_UNESCAPED_UNICODE);
        break;
}