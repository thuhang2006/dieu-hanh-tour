<?php

namespace App\Services;

use PDO;
use Exception;

class PythonDataService
{
    private string $pythonApiUrl;
    private string $serviceToken;
    private int $timeoutSeconds;
    private PDO $db;

    public function __construct()
    {
        // Cấu hình kết nối API Python của bạn Ly
        $this->pythonApiUrl   = 'http://127.0.0.1:5000/api/recommend';
        $this->serviceToken   = 'Phenikaa_Ly_V2_Secure_Token_2026';
        $this->timeoutSeconds = 3; // Timeout đúng chuẩn 3 giây

        // Kết nối MySQL để sẵn sàng chạy cơ chế dự phòng duPhong()
        $this->db = new PDO("mysql:host=127.0.0.1;dbname=dulichso;charset=utf8mb4", 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    /**
     * Lấy dữ liệu gợi ý tour từ Python, tự động chuyển sang duPhong() nếu Python tắt/timeout
     */
    public function getTourRecommendations(array $params = []): array
    {
        $ch = curl_init();
        $queryStr = http_build_query($params);
        $url = $this->pythonApiUrl . ($queryStr ? '?' . $queryStr : '');

        curl_setopt_array($ch, [
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => $this->timeoutSeconds,        // Chờ tối đa 3 giây
            CURLOPT_CONNECTTIMEOUT => $this->timeoutSeconds,        // Kết nối tối đa 3 giây
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'X-Service-Token: ' . $this->serviceToken          // Gửi kèm X-Service-Token
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        // NẾU PYTHON BẬT VÀ PHẢN HỒI THÀNH CÔNG (HTTP 200)
        if ($response !== false && $httpCode === 200) {
            $data = json_decode($response, true);
            if (json_last_error() === JSON_ERROR_NONE && !empty($data)) {
                return [
                    'status'       => 'success',
                    'source'       => 'python_api',
                    'python_alive' => true,
                    'message'      => 'Dữ liệu được xử lý từ Python Model của bạn Ly',
                    'data'         => $data
                ];
            }
        }

        // =====================================================================
        // CƠ CHẾ DỰ PHÒNG (FALLBACK): KHI TẮT PYTHON HOẶC TIMEOUT QUÁ 3 GIÂY
        // TUYỆT ĐỐI KHÔNG BỊ LỖI 500, TỰ ĐỘNG LẤY TỪ MYSQL
        // =====================================================================
        return $this->duPhong($params, $curlError ?: "Python Service Offline (HTTP {$httpCode})");
    }

    /**
     * HÀM DỰ PHÒNG duPhong(): Truy vấn trực tiếp từ MySQL khi dịch vụ Python ngoại tuyến
     */
    public function duPhong(array $params = [], string $reason = ''): array
    {
        try {
            $limit = max(1, (int)($params['limit'] ?? 5));

            // Lấy các tour nổi bật trực tiếp từ MySQL
            $stmt = $this->db->prepare("
                SELECT id, title, slug, base_price, duration_days, capacity, cancel_policy 
                FROM products 
                ORDER BY id ASC 
                LIMIT :limit
            ");
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            $tours = $stmt->fetchAll();

            return [
                'status'         => 'success',
                'source'         => 'mysql_du_phong',
                'python_alive'   => false,
                'fallback_used'  => true,
                'timeout_config' => '3s',
                'reason'         => $reason,
                'message'        => 'Dịch vụ Python ngoại tuyến. Hệ thống kích hoạt cơ chế duPhong() từ MySQL thành công (Không bị lỗi 500)!',
                'data'           => $tours
            ];
        } catch (Exception $e) {
            return [
                'status'  => 'error',
                'message' => 'Lỗi truy vấn dự phòng: ' . $e->getMessage(),
                'data'    => []
            ];
        }
    }
}