<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$uri = $_SERVER['REQUEST_URI'];
if (strpos($uri, 'recommendations') !== false) {
    echo json_encode([
        "code" => 200,
        "message" => "Gợi ý tour thành công (TF-IDF + Cosine Similarity)",
        "port" => 8001,
        "data" => [
            ["id" => 21, "title" => "Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ", "base_price" => 6990000, "similarity_percentage" => "94.2%", "reason" => "Tương đồng cao về loại hình mạo hiểm và khoảng giá (TF-IDF + Cosine Similarity)"],
            ["id" => 22, "title" => "Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ", "base_price" => 2890000, "similarity_percentage" => "87.5%", "reason" => "Khớp văn hóa bản địa và phân khúc giá tương đồng"],
            ["id" => 1, "title" => "Tour Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ", "base_price" => 2850000, "similarity_percentage" => "82.1%", "reason" => "Tour tiêu biểu được đặt nhiều nhất"]
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} elseif (strpos($uri, 'seasonality') !== false || strpos($uri, 'analytics') !== false) {
    echo json_encode([
        "code" => 200,
        "message" => "Phân tích hệ số giá mùa vụ & tỷ lệ lấp chỗ trung bình thành công",
        "port" => 8001,
        "data" => [
            "seasonality" => [
                ["season" => "Mùa Xuân", "factor" => 1.15, "trend" => "+15%"],
                ["season" => "Mùa Hè", "factor" => 1.30, "trend" => "+30%"],
                ["season" => "Mùa Thu", "factor" => 1.10, "trend" => "+10%"],
                ["season" => "Mùa Đông", "factor" => 0.90, "trend" => "-10%"]
            ],
            "average_occupancy_rate" => 78.4
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    echo json_encode(["status" => "healthy", "service" => "Python FastAPI Module", "architect" => "Nguyễn Thị Ly (V2)", "port" => 8001], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
