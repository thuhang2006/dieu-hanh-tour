# BẢN DANH MỤC ĐỐI CHIẾU HỢP ĐỒNG API V0.1 VỚI MÔ HÌNH 12 BẢNG CƠ SỞ DỮ LIỆU
**Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2  
**Giai đoạn:** Buổi 4 (Tuần 09)  
**Phụ trách:** Nguyễn Thị Ly (V2 – Kiến trúc sư dữ liệu)  
**Mục tiêu kiểm định:** Rà soát 100% trường dữ liệu API đều có trong CSDL, không có trường mồ côi (Zero Orphan Fields).

---

## 1. NGUYÊN TẮC KIỂM ĐỊNH (ZERO ORPHAN FIELDS)
- Mọi trường dữ liệu gửi lên (Request Payload) hoặc trả về (Response Payload) trên API v0.1 đều phải được định nghĩa tường minh trong 12-14 bảng CSDL vật lý.
- Đảm bảo tính toàn vẹn và đồng bộ tuyệt đối giữa Frontend (V4) - Backend (V3) - Database (V2).

---

## 2. BẢN DANH MỤC ĐỐI CHIẾU CHI TIẾT THỰC THỂ & TRƯỜNG DỮ LIỆU

| STT | Endpoint API v0.1 | Phương thức | Thực thể CSDL (Bảng) | Các trường dữ liệu ánh xạ cụ thể | Tình trạng mồ côi |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | `/api/v1/destinations` | GET | `destinations`, `categories` | `id`, `name`, `slug`, `province`, `lat`, `lng`, `entrance_fee`, `best_season`, `category_id` | **0% (Khớp 100%)** |
| 2 | `/api/v1/destinations/{id}` | GET | `destinations` JOIN `articles` | `destinations.*`, `articles.title`, `articles.body`, `articles.slug`, `articles.published_at` | **0% (Khớp 100%)** |
| 3 | `/api/v1/products` | GET | `products`, `suppliers`, `reviews` | `id`, `title`, `slug`, `type`, `base_price`, `duration_days`, `capacity`, `suppliers.name`, `suppliers.province`, `AVG(reviews.rating)` | **0% (Khớp 100%)** |
| 4 | `/api/v1/products/{id}` | GET | `products`, `availabilities`, `itineraries` | `products.*`, `availabilities.service_date`, `availabilities.seats_total`, `availabilities.seats_sold`, `itineraries.day_no`, `itineraries.seq_no` | **0% (Khớp 100%)** |
| 5 | `/api/v1/products/{id}/recommend` | GET | `products`, `destinations` | `products.type`, `products.base_price`, `destinations.province` (Tính độ tương đồng qua mô-đun gợi ý) | **0% (Khớp 100%)** |
| 6 | `/api/v1/bookings` | POST | `bookings`, `availabilities` | Request: `product_id`, `service_date`, `pax` <br> Insert: `bookings(code, user_id, product_id, service_date, pax, total_amount, status='draft', hold_expires_at)` <br> Update: `availabilities.seats_held += pax` | **0% (Khớp 100%)** |
| 7 | `/api/v1/bookings/{code}` | GET | `bookings` JOIN `payments` | `bookings.code`, `bookings.service_date`, `bookings.pax`, `bookings.total_amount`, `bookings.status`, `payments.gateway`, `payments.txn_ref`, `payments.status` | **0% (Khớp 100%)** |
| 8 | `/api/v1/bookings/{code}/cancel` | POST | `bookings`, `booking_status_logs`, `availabilities` | Update: `bookings.status = 'cancelled'` <br> Insert: `booking_status_logs(booking_id, from_status, to_status, reason)` <br> Update: `availabilities.seats_held -= pax` | **0% (Khớp 100%)** |
| 9 | `/api/v1/payments/sandbox` | POST | `payments`, `bookings` | Insert: `payments(booking_id, gateway, txn_ref, amount, status='paid', paid_at)` <br> Update: `bookings.status = 'confirmed'` | **0% (Khớp 100%)** |
| 10 | `/api/v1/reviews` | POST | `reviews`, `bookings` | Kiểm tra điều kiện: `bookings.status = 'completed'` <br> Insert: `reviews(booking_id, product_id, rating, content, sentiment)` | **0% (Khớp 100%)** |
| 11 | `/api/v1/auth/login` | POST | `users`, `customer_profiles` | Query: `users.email`, `users.password_hash`, `users.role`, `users.status` <br> JOIN: `customer_profiles.full_name` | **0% (Khớp 100%)** |
| 12 | `/api/v1/healthz` | GET | Hệ thống & DB Connection | Kiểm tra `SELECT 1` tới MySQL server, tình trạng kết nối CSDL | **0% (Khớp 100%)** |

---

## 3. KẾT LUẬN & KÝ XÁC NHẬN
- **Tổng số Endpoint API v0.1:** 12 endpoint.
- **Tổng số bảng tham gia:** 12-14 bảng trong lược đồ CSDL `dulichso`.
- **Tỷ lệ trường mồ côi (Orphan Fields):** **0%** (Đạt chuẩn Buổi 4).
- **Phụ trách ký duyệt:** Nguyễn Thị Ly (V2 – Kiến trúc sư dữ liệu).
