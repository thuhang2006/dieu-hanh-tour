# BẢN ĐỐI CHIẾU HỢP ĐỒNG API VỚI MÔ HÌNH 12 BẢNG CƠ SỞ DỮ LIỆU
**Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2
**Buổi thực hành:** Buổi 4 (Tuần 09)
**Thành viên thực hiện:** Nguyễn Thị Ly (V2 – Kiến trúc sư dữ liệu)
**Đầu ra:** Báo cáo đối chiếu thực thể và trường dữ liệu - Không có trường mồ côi (100% khớp)

## 1. NGUYÊN TẮC KIỂM ĐỊNH TÍNH NHẤT QUÁN
- 100% các tham số Request và Response trên Hợp đồng API v0.1 đều có trường dữ liệu vật lý tương ứng trong 12-14 bảng CSDL.
- Đảm bảo nhánh FE (V4 - Nguyễn Thu Hà) và BE (V3 - Lại Thị Thùy Dương) làm việc song song mà không bị lệch schema.

## 2. MA TRẬN ÁNH XẠ ĐIỂM CUỐI (ENDPOINTS) VỚI CSDL
1. GET /api/v1/destinations -> Bảng destinations(id, name, slug, province, lat, lng, entrance_fee, best_season)
2. GET /api/v1/destinations/{id} -> destinations JOIN articles ON articles.destination_id = destinations.id
3. GET /api/v1/products -> products JOIN suppliers, destinations, reviews
4. GET /api/v1/products/{id} -> products JOIN availabilities, itineraries, suppliers
5. GET /api/v1/products/{id}/recommend -> Mô-đun Python tính toán từ products.type & destinations.province
6. POST /api/v1/bookings -> bookings(code, user_id, product_id, service_date, pax, total_amount, status='draft', hold_expires_at) + cập nhật availabilities.seats_held
7. GET /api/v1/bookings/{code} -> bookings JOIN payments
8. POST /api/v1/bookings/{code}/cancel -> cập nhật bookings.status='cancelled' + hoàn trả availabilities.seats_held
9. POST /api/v1/payments/sandbox -> payments(booking_id, gateway, txn_ref, amount, status='paid') + cập nhật bookings.status='confirmed'
10. POST /api/v1/reviews -> reviews(booking_id, product_id, rating, content) (Ràng buộc: bookings.status='completed')
11. POST /api/v1/auth/login -> users(email, password_hash, role, status)
12. GET /api/v1/healthz -> Kiểm tra kết nối CSDL và dịch vụ phụ trợ
