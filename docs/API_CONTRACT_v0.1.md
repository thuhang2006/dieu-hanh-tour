# TÀI LIỆU HỢP ĐỒNG API (API CONTRACT) - PHIÊN BẢN 0.1
**Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2  
**Dự án:** Điều Hành Tour & Du Lịch Số  
**Người phụ trách:** Lại Thị Thùy Dương (Vai trò V3 - Phát triển máy chủ)  
**Ngày lập:** Buổi 4 (Tuần 09)  

---

## 1. Mục tiêu và phạm vi
Tài liệu này xác lập hợp đồng giao diện lập trình ứng dụng (API Contract) giữa tầng máy chủ (Backend Laravel 11 / Node.js) và tầng giao diện (Frontend Vue 3 / React). Hợp đồng này cho phép:
1. Nhóm phát triển máy chủ (V3) và nhóm phát triển giao diện (V4) triển khai độc lập, song song mà không phụ thuộc lẫn nhau.
2. Đảm bảo 100% trường dữ liệu API ánh xạ chính xác tới 12 thực thể trong CSDL (phối hợp cùng V2).
3. Đặt tiền đề cho việc xây dựng 60 ca kiểm thử chức năng (phối hợp cùng V5).

---

## 2. Bảng quy chuẩn mã trạng thái HTTP chuẩn (HTTP Status Codes)

Hệ thống thống nhất sử dụng 7 mã trạng thái HTTP chuẩn mực theo chuẩn RFC 7231:

| Mã HTTP | Tên chuẩn | Ý nghĩa nghiệp vụ trong hệ thống | Kịch bản phát sinh |
| :---: | :--- | :--- | :--- |
| **`200`** | **OK** | Yêu cầu xử lý thành công và trả về dữ liệu tương ứng. | Truy vấn danh sách tour, xem chi tiết điểm đến, kiểm tra tồn chỗ khả dụng. |
| **`201`** | **Created** | Yêu cầu xử lý thành công và đã tạo mới tài nguyên trong CSDL. | Tạo đơn giữ chỗ 15 phút (`/api/v1/bookings`), gửi đánh giá mới (`/api/v1/reviews`). |
| **`400`** | **Bad Request** | Yêu cầu bị từ chối do vi phạm quy tắc nghiệp vụ. | Đặt số khách vượt quá số chỗ còn lại, cố tình hủy đơn khi đã quá thời hạn cho phép. |
| **`401`** | **Unauthorized** | Người dùng chưa đăng nhập hoặc phiên làm việc/token hết hạn. | Khách truy cập vào trang cá nhân hoặc thực hiện đặt chỗ mà chưa xác thực danh tính. |
| **`403`** | **Forbidden** | Đã đăng nhập nhưng không có quyền thực thi tài nguyên này (RBAC). | Khách hàng cố gọi API cập nhật sản phẩm của Nhà cung cấp, hoặc xem đơn hàng của người khác. |
| **`404`** | **Not Found** | Không tìm thấy tài nguyên trong hệ thống. | Truy cập sản phẩm theo `slug` không tồn tại, tra cứu đơn hàng sai mã. |
| **`422`** | **Unprocessable Entity** | Dữ liệu đầu vào sai cú pháp hoặc vi phạm ràng buộc xác thực. | Ngày khởi hành nhỏ hơn ngày hiện tại, số lượng khách <= 0, định dạng email không đúng. |

---

## 3. Danh mục các điểm cuối chính (Key Endpoints)
1. **Điểm đến (`/destinations`):**
   - `GET /api/v1/destinations`: Lấy danh sách điểm đến theo tỉnh thành, vùng miền, loại hình.
2. **Sản phẩm du lịch (`/products`):**
   - `GET /api/v1/products`: Bộ lọc đa tiêu chí (từ khóa, mức giá, ngày khởi hành, loại hình) có phân trang.
   - `GET /api/v1/products/{slug}`: Chi tiết sản phẩm, lịch trình chi tiết và chính sách hủy.
   - `GET /api/v1/products/{id}/availabilities`: Lấy số chỗ còn lại theo từng ngày khởi hành.
3. **Đặt chỗ & Giữ chỗ (`/bookings`):**
   - `POST /api/v1/bookings`: Tạo đơn giữ chỗ trong 15 phút, khóa hàng chống tranh chấp đồng thời.
4. **Thanh toán Sandbox (`/payments`):**
   - `POST /api/v1/payments/sandbox`: Giả lập thanh toán thẻ nội địa, ví điện tử (mã `SBX...`).
5. **Gợi ý & Dữ liệu Python (`/recommend`):**
   - `GET /api/v1/products/{id}/recommend`: Tích hợp mô-đun Python gợi ý sản phẩm tương đồng.
6. **Đánh giá (`/reviews`):**
   - `POST /api/v1/reviews`: Đánh giá dịch vụ dành riêng cho đơn đã hoàn tất.