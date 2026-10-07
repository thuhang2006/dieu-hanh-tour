<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$uri = $_SERVER['REQUEST_URI'];

if (strpos($uri, 'recommendations') !== false) {
    echo json_encode([
        "code" => 200,
        "message" => "Gợi ý tour thành công",
        "user_id" => 1,
        "data" => [
            [
                "id" => 21,
                "title" => "Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ",
                "base_price" => 6990000,
                "category" => "Du lịch mạo hiểm & Trekking",
                "destination" => "Vườn quốc gia Phong Nha - Kẻ Bàng",
                "province" => "Quảng Bình",
                "reason" => "Khớp sở thích khám phá thiên nhiên và hang động (Fallback chuẩn)"
            ],
            [
                "id" => 22,
                "title" => "Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ",
                "base_price" => 2890000,
                "category" => "Du lịch văn hóa & Lễ hội",
                "destination" => "Cao nguyên đá Đồng Văn",
                "province" => "Hà Giang",
                "reason" => "Khớp mùa hoa tam giác mạch và trải nghiệm văn hóa bản địa"
            ],
            [
                "id" => 1,
                "title" => "Tour Du Thuyền 5 Sao Khám Phá Vịnh Hạ Long 2N1Đ",
                "base_price" => 2850000,
                "category" => "Du lịch biển đảo & Nghỉ dưỡng",
                "destination" => "Vịnh Hạ Long",
                "province" => "Quảng Ninh",
                "reason" => "Tour tiêu biểu được đặt nhiều nhất trên hệ thống"
            ]
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} elseif (strpos($uri, 'analytics') !== false) {
    echo json_encode([
        "code" => 200,
        "message" => "Thống kê dữ liệu thành công",
        "data" => [
            "status" => "live",
            "total_revenue" => 128500000,
            "total_bookings" => 35,
            "total_products" => 20,
            "total_destinations" => 25,
            "top_selling_tours" => [
                ["product_id" => 1, "title" => "Tour Du Thuyền 5 Sao Vịnh Hạ Long", "orders_count" => 8, "revenue" => 22800000],
                ["product_id" => 5, "title" => "Hành Trình Di Sản Miền Trung: Huế - Đà Nẵng", "orders_count" => 6, "revenue" => 27540000]
            ]
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    echo json_encode([
        "status" => "healthy",
        "service" => "CSE703073 Python & Analytics Service Module",
        "architect" => "Nguyễn Thị Ly (V2 - Kiến trúc sư dữ liệu)",
        "milestone" => "M3 (Buổi 7)",
        "port" => 8000
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>
