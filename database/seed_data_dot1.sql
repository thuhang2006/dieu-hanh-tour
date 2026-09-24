USE dulichso;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE booking_status_logs;
TRUNCATE TABLE payments;
TRUNCATE TABLE reviews;
TRUNCATE TABLE bookings;
TRUNCATE TABLE availabilities;
TRUNCATE TABLE itineraries;
TRUNCATE TABLE products;
TRUNCATE TABLE destinations;
TRUNCATE TABLE suppliers;
TRUNCATE TABLE customer_profiles;
TRUNCATE TABLE users;
TRUNCATE TABLE categories;
TRUNCATE TABLE articles;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. BẢNG CATEGORIES (12 bản ghi)
INSERT INTO categories (id, name, slug) VALUES
(1, 'Tour trọn gói', 'tour-tron-goi'),
(2, 'Khách sạn & Resort', 'khach-san-resort'),
(3, 'Vé vui chơi & Tham quan', 've-vui-choi'),
(4, 'Tour ẩm thực & Văn hóa', 'tour-am-thuc'),
(5, 'Tour Miền Bắc', 'tour-mien-bac'),
(6, 'Tour Miền Trung', 'tour-mien-trung'),
(7, 'Tour Miền Nam', 'tour-mien-nam'),
(8, 'Tour Trekking & Mạo hiểm', 'tour-trekking'),
(9, 'Khách sạn 5 sao', 'khach-san-5-sao'),
(10, 'Resort ven biển', 'resort-ven-bien'),
(11, 'Vé VinWonders & Safari', 've-vinwonders'),
(12, 'Vé cáp treo Sun World', 've-sunworld');

-- 2. BẢNG USERS (10 tài khoản: id, email, password_hash, role, status)
INSERT INTO users (id, email, password_hash, role, status) VALUES
(1, 'admin@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'admin', 'active'),
(2, 'quantri.hethong@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'admin', 'active'),
(3, 'ncc.hanoitourist@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'supplier', 'active'),
(4, 'ncc.saigontourist@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'supplier', 'active'),
(5, 'ncc.vietravel@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'supplier', 'active'),
(6, 'khachhang.an@gmail.com', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'customer', 'active'),
(7, 'khachhang.binh@gmail.com', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'customer', 'active'),
(8, 'khachhang.cuong@gmail.com', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'customer', 'active'),
(9, 'hds.nguyenvancuong@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'guide', 'active'),
(10, 'hds.lethimai@dulichso.vn', '$2b$12$xV06GqC1pDskK8j/jM1GkO6l6u7y8z9a0b1c2d3e4f5g6h7i8j9k.', 'guide', 'active');

-- 3. BẢNG CUSTOMER_PROFILES (3 bản ghi)
INSERT INTO customer_profiles (user_id, full_name, phone) VALUES
(6, 'Trần Văn An', '0956789012'),
(7, 'Lê Thị Bình', '0967890123'),
(8, 'Phạm Quốc Cường', '0978901234');

-- 4. BẢNG SUPPLIERS (3 bản ghi)
INSERT INTO suppliers (id, user_id, name, tax_code, province, status) VALUES
(1, 3, 'Công ty CP Hanoitourist', '0100107254', 'Hà Nội', 'approved'),
(2, 4, 'Tổng công ty Du lịch Sài Gòn (Saigontourist)', '0300625210', 'TP. Hồ Chí Minh', 'approved'),
(3, 5, 'Công ty Du lịch Vietravel', '0300456789', 'TP. Hồ Chí Minh', 'approved');

-- 5. BẢNG DESTINATIONS (25 bản ghi)
INSERT INTO destinations (id, category_id, name, slug, province, entrance_fee) VALUES
(1, 5, 'Vịnh Hạ Long', 'vinh-ha-long', 'Quảng Ninh', 250000.00),
(2, 5, 'Quần thể danh thắng Tràng An', 'trang-an', 'Ninh Bình', 250000.00),
(3, 5, 'Đỉnh Fansipan', 'dinh-fansipan', 'Lào Cai', 850000.00),
(4, 6, 'Phố cổ Hội An', 'pho-co-hoi-an', 'Quảng Nam', 120000.00),
(5, 6, 'Bà Nà Hills', 'ba-na-hills', 'Đà Nẵng', 900000.00),
(6, 6, 'Đại Nội Huế', 'dai-noi-hue', 'Thừa Thiên Huế', 200000.00),
(7, 7, 'Đảo Phú Quốc', 'dao-phu-quoc', 'Kiên Giang', 0.00),
(8, 6, 'Vườn quốc gia Phong Nha - Kẻ Bàng', 'phong-nha-ke-bang', 'Quảng Bình', 150000.00),
(9, 5, 'Hồ Hoàn Kiếm', 'ho-hoan-kiem', 'Hà Nội', 0.00),
(10, 7, 'Chợ nổi Cái Răng', 'cho-noi-cai-rang', 'Cần Thơ', 50000.00),
(11, 5, 'Cao nguyên đá Đồng Văn', 'dong-van', 'Hà Giang', 0.00),
(12, 5, 'Thung lũng Mường Hoa', 'muong-hoa', 'Lào Cai', 80000.00),
(13, 6, 'Bãi biển Mỹ Khê', 'my-khe', 'Đà Nẵng', 0.00),
(14, 6, 'Thánh địa Mỹ Sơn', 'thanh-dia-my-son', 'Quảng Nam', 150000.00),
(15, 6, 'Ghềnh Đá Đĩa', 'ghenh-da-dia', 'Phú Yên', 40000.00),
(16, 6, 'Tháp Bà Ponagar', 'thap-ba-ponagar', 'Khánh Hòa', 30000.00),
(17, 6, 'Hồ Tuyền Lâm', 'ho-tuyen-lam', 'Lâm Đồng', 0.00),
(18, 5, 'Cố đô Hoa Lư', 'co-do-hoa-lu', 'Ninh Bình', 20000.00),
(19, 7, 'Địa đạo Củ Chi', 'dia-dao-cu-chi', 'TP. Hồ Chí Minh', 125000.00),
(20, 7, 'Bến Ninh Kiều', 'ben-ninh-kieu', 'Cần Thơ', 0.00),
(21, 7, 'Mũi Cà Mau', 'mui-ca-mau', 'Cà Mau', 30000.00),
(22, 6, 'Đồi cát Bay Mũi Né', 'doi-cat-mui-ne', 'Bình Thuận', 0.00),
(23, 5, 'Núi Yên Tử', 'yen-tu', 'Quảng Ninh', 40000.00),
(24, 5, 'Chùa Hương', 'chua-huong', 'Hà Nội', 130000.00),
(25, 5, 'Vườn quốc gia Ba Bể', 'ba-be', 'Bắc Kạn', 46000.00);

-- 6. BẢNG PRODUCTS (20 bản ghi)
INSERT INTO products (id, supplier_id, category_id, title, slug, type, base_price, duration_days, capacity, cancel_policy, status) VALUES
(1, 1, 5, 'Tour Du thuyền 5 sao Vịnh Hạ Long 2N1Đ trọn gói', 'tour-ha-long-2n1d', 'tour', 2850000.00, 2, 30, 'Hủy trước 3 ngày hoàn 100%', 'published'),
(2, 1, 5, 'Tour Ninh Bình: Tràng An - Bái Đính - Hang Múa 1 ngày', 'tour-ninh-binh-1-ngay', 'tour', 890000.00, 1, 45, 'Hủy trước 24h hoàn 100%', 'published'),
(3, 1, 5, 'Tour Sa Pa - Cáp treo Fansipan - Bản Cát Cát 3N2Đ', 'tour-sapa-fansipan-3n2d', 'tour', 3450000.00, 3, 25, 'Hủy trước 3 ngày hoàn 100%', 'published'),
(4, 2, 6, 'Tour Đà Nẵng - Bán Đảo Sơn Trà - Phố Cổ Hội An 3N2Đ', 'tour-da-nang-hoi-an-3n2d', 'tour', 3890000.00, 3, 35, 'Hủy trước 3 ngày hoàn 100%', 'published'),
(5, 2, 6, 'Tour Di sản miền Trung: Huế - Đà Nẵng - Hội An 4N3Đ', 'tour-di-san-mientrung-4n3d', 'tour', 5250000.00, 4, 30, 'Hủy trước 5 ngày hoàn 100%', 'published'),
(6, 2, 7, 'Kỳ nghỉ thiên đường Phú Quốc 3N2Đ tại Resort 5 sao', 'tour-phu-quoc-nghi-duong-3n2d', 'tour', 4500000.00, 3, 20, 'Hủy trước 5 ngày hoàn 100%', 'published'),
(7, 3, 7, 'Tour Miền Tây sông nước: Mỹ Tho - Cần Thơ - Chợ Nổi 2N1Đ', 'tour-mientay-cantho-2n1d', 'tour', 1850000.00, 2, 40, 'Hủy trước 2 ngày hoàn 100%', 'published'),
(8, 1, 8, 'Tour Trekking Hà Giang: Mèo Vạc - Sông Nho Quế 3N2Đ', 'tour-trekking-ha-giang-3n2d', 'tour', 3200000.00, 3, 15, 'Hủy trước 5 ngày hoàn 100%', 'published'),
(9, 2, 9, 'Khách sạn Novotel Danang Premier Han River (1 Đêm)', 'novotel-danang-premier', 'stay', 1950000.00, 2, 2, 'Hủy trước 24h miễn phí', 'published'),
(10, 3, 10, 'Vinpearl Resort & Spa Phú Quốc (Gói phòng Deluxe 1 Đêm)', 'vinpearl-phu-quoc-deluxe', 'stay', 2600000.00, 2, 2, 'Không hoàn hủy', 'published'),
(11, 2, 11, 'Vé VinWonders & Safari Phú Quốc trọn gói combo', 've-vinwonders-safari-phuquoc', 'ticket', 1350000.00, 1, 100, 'Không hoàn hủy', 'published'),
(12, 2, 12, 'Vé cáp treo Sun World Bà Nà Hills + Buffet trưa', 've-cap-treo-ba-na-hills', 'ticket', 1150000.00, 1, 100, 'Không hoàn hủy', 'published'),
(13, 1, 12, 'Vé cáp treo Sun World Fansipan Legend khứ hồi', 've-cap-treo-fansipan-legend', 'ticket', 850000.00, 1, 100, 'Không hoàn hủy', 'published'),
(14, 1, 5, 'Tour Kayaking khám phá hang Luồn Vịnh Hạ Long', 'tour-kayak-ha-long', 'experience', 650000.00, 1, 20, 'Hủy trước 24h hoàn 100%', 'published'),
(15, 2, 6, 'Tour Quy Nhơn - Kỳ Co - Eo Gió - Ghềnh Đá Đĩa 3N2Đ', 'tour-quy-nhon-phu-yen-3n2d', 'tour', 3750000.00, 3, 25, 'Hủy trước 3 ngày hoàn 100%', 'published'),
(16, 2, 6, 'Tour Nha Trang - Du ngoạn 3 đảo ngắm san hô', 'tour-nha-trang-3-dao', 'tour', 750000.00, 1, 30, 'Hủy trước 24h hoàn 100%', 'published'),
(17, 3, 9, 'Khách sạn Colline Đà Lạt - Trung tâm chợ đêm', 'khach-san-colline-da-lat', 'stay', 1450000.00, 2, 2, 'Hủy trước 48h miễn phí', 'published'),
(18, 3, 7, 'Tour Nửa ngày Địa đạo Củ Chi bắn súng thể thao', 'tour-dia-dao-cu-chi-nua-ngay', 'experience', 450000.00, 1, 35, 'Hủy trước 24h hoàn 100%', 'published'),
(19, 1, 5, 'Tour Hành hương non thiêng Yên Tử 1 ngày', 'tour-hanh-huong-yen-tu-1-ngay', 'tour', 850000.00, 1, 45, 'Hủy trước 24h hoàn 100%', 'published'),
(20, 1, 5, 'Tour Chùa Hương: Suối Yến - Đền Trình - Động Hương Tích', 'tour-chua-huong-1-ngay', 'tour', 790000.00, 1, 50, 'Hủy trước 24h hoàn 100%', 'published');

-- 7. BẢNG ITINERARIES (7 bản ghi)
INSERT INTO itineraries (product_id, destination_id, day_no, seq_no, note) VALUES
(1, 1, 1, 1, 'Hà Nội - Vịnh Hạ Long, nhận phòng du thuyền 5 sao'),
(1, 1, 2, 2, 'Khám phá Đảo Ti Tốp, chèo kayak, về Hà Nội'),
(3, 3, 1, 1, 'Limousine đưa khách lên Sa Pa, tham quan bản làng'),
(3, 3, 2, 2, 'Cáp treo chinh phục đỉnh Fansipan'),
(3, 3, 3, 3, 'Tham quan vườn hoa núi Hàm Rồng, về Hà Nội'),
(4, 4, 1, 1, 'Tham quan chùa Linh Ứng Sơn Trà và làng đá'),
(4, 5, 2, 2, 'Bà Nà Hills Cầu Vàng và phố cổ Hội An');

-- 8. BẢNG AVAILABILITIES (10 bản ghi)
INSERT INTO availabilities (product_id, service_date, seats_total, seats_held, seats_sold) VALUES
(1, '2026-10-01', 30, 2, 10),
(1, '2026-10-02', 30, 0, 5),
(2, '2026-10-01', 45, 0, 15),
(3, '2026-10-05', 25, 3, 10),
(4, '2026-10-03', 35, 0, 15),
(5, '2026-10-10', 30, 0, 8),
(6, '2026-10-12', 20, 0, 5),
(7, '2026-10-04', 40, 0, 15),
(8, '2026-10-15', 15, 0, 8),
(11, '2026-10-01', 100, 0, 20);

-- 9. BẢNG BOOKINGS (10 bản ghi)
INSERT INTO bookings (id, code, user_id, product_id, service_date, pax, unit_price, total_amount, status) VALUES
(1, 'BK261001-001', 6, 1, '2026-10-01', 2, 2850000.00, 5700000.00, 'confirmed'),
(2, 'BK261001-002', 7, 2, '2026-10-01', 2, 890000.00, 1780000.00, 'completed'),
(3, 'BK261001-003', 8, 3, '2026-10-05', 2, 3450000.00, 6900000.00, 'confirmed'),
(4, 'BK261001-004', 6, 4, '2026-10-03', 4, 3890000.00, 15560000.00, 'pending_payment'),
(5, 'BK261001-005', 7, 7, '2026-10-04', 2, 1850000.00, 3700000.00, 'cancelled'),
(6, 'BK261001-006', 8, 11, '2026-10-01', 3, 1350000.00, 4050000.00, 'completed'),
(7, 'BK261001-007', 6, 8, '2026-10-15', 2, 3200000.00, 6400000.00, 'confirmed'),
(8, 'BK261001-008', 7, 5, '2026-10-10', 2, 5250000.00, 10500000.00, 'confirmed'),
(9, 'BK261001-009', 8, 6, '2026-10-12', 2, 4500000.00, 9000000.00, 'pending_payment'),
(10, 'BK261001-010', 6, 2, '2026-10-01', 1, 890000.00, 890000.00, 'completed');

-- 10. BẢNG BOOKING_STATUS_LOGS (Chỉ nạp booking_id để luôn tương thích mọi cột)
INSERT INTO booking_status_logs (booking_id) VALUES
(1),
(2),
(5),
(6);

-- 11. BẢNG PAYMENTS (6 bản ghi)
INSERT INTO payments (booking_id, gateway, txn_ref, amount, status) VALUES
(1, 'vnpay', 'VNP20261001001', 5700000.00, 'paid'),
(2, 'momo', 'MOMO20261001002', 1780000.00, 'paid'),
(3, 'bank_transfer', 'VCB20261001003', 6900000.00, 'paid'),
(5, 'vnpay', 'VNP20261001005', 3700000.00, 'refunded'),
(6, 'credit_card', 'STRIPE20261001006', 4050000.00, 'paid'),
(7, 'vnpay', 'VNP20261001007', 6400000.00, 'paid');

-- 12. BẢNG REVIEWS (3 bản ghi)
INSERT INTO reviews (booking_id, product_id, rating, content) VALUES
(2, 2, 5, 'Chuyến đi Tràng An rất tuyệt vời! Bác chèo đò thân thiện.'),
(6, 11, 5, 'Safari rất rộng, gia đình mình đi rất thích!'),
(10, 2, 4, 'Dịch vụ chu đáo, HDV nhiệt tình.');

-- 13. BẢNG ARTICLES (2 bản ghi)
INSERT INTO articles (destination_id, title, slug, body, author_id) VALUES
(1, 'Kinh nghiệm du lịch Vịnh Hạ Long', 'kinh-nghiem-ha-long', 'Cẩm nang du lịch Vịnh Hạ Long đầy đủ chi tiết nhất...', 1),
(4, 'Top 10 món ngon Hội An', 'top-10-mon-ngon-hoi-an', 'Khám phá ẩm thực Hội An với mì Quảng, cao lầu...', 1);
