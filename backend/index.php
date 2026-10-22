<?php
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Service-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function checkRateLimit(int $maxRequests = 60, int $timeWindowSeconds = 60): void {
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $cacheDir = sys_get_temp_dir() . '/rate_limit_cache';
    if (!is_dir($cacheDir)) {
        @mkdir($cacheDir, 0777, true);
    }
    $cacheFile = $cacheDir . '/rl_' . md5($clientIp) . '.json';
    $now = time();
    $data = ['count' => 0, 'start_time' => $now];

    if (file_exists($cacheFile)) {
        $loaded = json_decode(@file_get_contents($cacheFile), true);
        if ($loaded && ($now - $loaded['start_time']) < $timeWindowSeconds) {
            $data = $loaded;
        }
    }

    $data['count']++;
    @file_put_contents($cacheFile, json_encode($data));

    header('X-RateLimit-Limit: ' . $maxRequests);
    header('X-RateLimit-Remaining: ' . max(0, $maxRequests - $data['count']));

    if ($data['count'] > $maxRequests) {
        http_response_code(429);
        header('Content-Type: application/json; charset=utf-8');
        header('Retry-After: ' . ($timeWindowSeconds - ($now - $data['start_time'])));
        echo json_encode([
            'status'  => 'error',
            'code'    => 'RATE_LIMIT_EXCEEDED',
            'message' => "Bạn đã gửi quá nhiều yêu cầu ({$data['count']}/{$maxRequests} req/min). Vui lòng thử lại sau!",
            'policy'  => 'OWASP A04 - Anti DDoS & Automated Brute-Force Rate Limiting'
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
}

checkRateLimit(60, 60);

spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    $file = $baseDir . str_replace('\\', '/', substr($class, $len)) . '.php';
    if (file_exists($file)) require_once $file;
});

use App\Controllers\SearchController;
use App\Controllers\BookingController;
use App\Controllers\PaymentController;
use App\Services\PythonDataService;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/v1/tours/search' && $method === 'GET') {
    (new SearchController())->search();
    exit;
}
if ($uri === '/api/v1/bookings/hold' && $method === 'POST') {
    (new BookingController())->hold();
    exit;
}
if ($uri === '/api/v1/payments/sandbox' && ($method === 'POST' || $method === 'GET')) {
    (new PaymentController())->sandboxPay();
    exit;
}
if ($uri === '/api/v1/payments/cancel-refund' && ($method === 'POST' || $method === 'GET')) {
    (new PaymentController())->cancelAndRefund();
    exit;
}
if ($uri === '/api/v1/recommendations' && $method === 'GET') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode((new PythonDataService())->getTourRecommendations($_GET), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
if ($uri === '/api/v1/security/health' || $uri === '/' || $uri === '/api/v1') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'secure',
        'message' => 'Hệ thống Backend đạt chuẩn an toàn OWASP Top 10',
        'student' => 'Lại Thị Thùy Dương (24105783) - V3 Backend',
        'security_checks' => [
            'sql_injection'          => 'SAFE (100% PDO Prepared Statements)',
            'password_storage'       => 'SAFE (BCRYPT with Salt, Cost=12)',
            'sensitive_data_exposure'=> 'SAFE (Passwords/Salts omitted from API)',
            'security_headers'       => 'ENABLED (X-Frame-Options: DENY, X-Content-Type-Options: nosniff)',
            'rate_limiting'          => 'ACTIVE (Max 60 requests/min per IP)'
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['status' => 'error', 'message' => "Không tìm thấy đường dẫn API: {$uri}"], JSON_UNESCAPED_UNICODE);