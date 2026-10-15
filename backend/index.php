<?php
/**
 * API ROUTER - HỆ THỐNG ĐIỀU HÀNH TOUR DU LỊCH SỐ
 * CSE703073 - TS. Nguyễn Văn Tánh
 * Sinh viên: Lại Thị Thùy Dương (MSV: 24105783 - V3)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Service-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Tự động nạp các class trong app/
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/app/';
    $len = strlen($prefix);

    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

use App\Controllers\SearchController;
use App\Controllers\BookingController;
use App\Controllers\PaymentController;
use App\Services\PythonDataService;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// 1. API Tìm kiếm tour (Mốc M2)
if ($uri === '/api/v1/tours/search' && $method === 'GET') {
    (new SearchController())->search();
    exit;
}

// 2. API Giữ chỗ tour chống Overbooking (Mốc M2)
if ($uri === '/api/v1/bookings/hold' && $method === 'POST') {
    (new BookingController())->hold();
    exit;
}

// 3. API Thanh toán Sandbox (Mốc M3 - Sinh mã SBX...)
if ($uri === '/api/v1/payments/sandbox' && ($method === 'POST' || $method === 'GET')) {
    (new PaymentController())->sandboxPay();
    exit;
}

// 4. API Máy trạng thái: Hủy đơn & Hoàn tiền (Thu phí 30%, hoàn 70%)
if ($uri === '/api/v1/payments/cancel-refund' && ($method === 'POST' || $method === 'GET')) {
    (new PaymentController())->cancelAndRefund();
    exit;
}

// 5. API Tích hợp Python & Cơ chế dự phòng duPhong() từ MySQL
if ($uri === '/api/v1/recommendations' && $method === 'GET') {
    header('Content-Type: application/json; charset=utf-8');
    $service = new PythonDataService();
    $result = $service->getTourRecommendations($_GET);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Trang mặc định kiểm tra trạng thái máy chủ
if ($uri === '/' || $uri === '/api/v1') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'online',
        'message' => 'Backend API Điều hành Tour Du lịch số đang hoạt động',
        'student' => 'Lại Thị Thùy Dương (24105783) - V3 Backend',
        'milestone' => 'M3 - Thanh toán Sandbox, Máy trạng thái đơn & Tích hợp Python'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['status' => 'error', 'message' => "Không tìm thấy đường dẫn API: {$uri}"], JSON_UNESCAPED_UNICODE);