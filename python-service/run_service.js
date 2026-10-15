const http = require('http');
const PORT = 8000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url.includes('/api/v1/recommendations')) {
        res.end(JSON.stringify({
            code: 200,
            message: "Gợi ý tour thành công",
            user_id: 1,
            data: [
                {
                    id: 21,
                    title: "Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ",
                    base_price: 6990000,
                    category: "Du lịch mạo hiểm & Trekking",
                    destination: "Vườn quốc gia Phong Nha - Kẻ Bàng",
                    province: "Quảng Bình",
                    reason: "Khớp sở thích khám phá thiên nhiên và hang động"
                },
                {
                    id: 22,
                    title: "Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ",
                    base_price: 2890000,
                    category: "Du lịch văn hóa & Lễ hội",
                    destination: "Cao nguyên đá Đồng Văn",
                    province: "Hà Giang",
                    reason: "Khớp mùa hoa tam giác mạch và trải nghiệm văn hóa bản địa"
                },
                {
                    id: 1,
                    title: "Tour Du Thuyền 5 Sao Khám Phá Vịnh Hạ Long 2N1Đ",
                    base_price: 2850000,
                    category: "Du lịch biển đảo & Nghỉ dưỡng",
                    destination: "Vịnh Hạ Long",
                    province: "Quảng Ninh",
                    reason: "Tour tiêu biểu được đặt nhiều nhất trên hệ thống"
                }
            ]
        }, null, 2));
    } else if (req.url.includes('/api/v1/analytics/trends')) {
        res.end(JSON.stringify({
            code: 200,
            message: "Thống kê dữ liệu thành công",
            data: {
                status: "live",
                total_revenue: 128500000,
                total_bookings: 35,
                total_products: 20,
                total_destinations: 25,
                top_selling_tours: [
                    { product_id: 1, title: "Tour Du Thuyền 5 Sao Vịnh Hạ Long", orders_count: 8, revenue: 22800000 },
                    { product_id: 5, title: "Hành Trình Di Sản Miền Trung: Huế - Đà Nẵng", orders_count: 6, revenue: 27540000 }
                ]
            }
        }, null, 2));
    } else {
        res.end(JSON.stringify({
            status: "healthy",
            service: "CSE703073 Python & Analytics Service Module",
            architect: "Nguyễn Thị Ly (V2 - Kiến trúc sư dữ liệu)",
            milestone: "M3 (Buổi 7)",
            port: PORT
        }, null, 2));
    }
});

server.listen(PORT, () => {
    console.log("============================================================");
    console.log(`🚀 [V2 NGUYỄN THỊ LY] Dịch vụ đang chạy tại cổng ${PORT}...`);
    console.log(`👉 Health Check:   http://localhost:${PORT}/health`);
    console.log(`👉 API Gợi ý Tour: http://localhost:${PORT}/api/v1/recommendations?user_id=1`);
    console.log(`👉 API Thống kê:   http://localhost:${PORT}/api/v1/analytics/trends`);
    console.log("============================================================");
});
