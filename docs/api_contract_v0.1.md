# TÀI LIỆU ĐẶC TẢ HỢP ĐỒNG API (API CONTRACT) PHIÊN BẢN 0.1
- **Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2
- **Người chủ trì thiết kế (V3):** Lại Thị Thùy Dương
- **Người phối hợp đối chiếu:** Nguyễn Thị Ly (V2 - CSDL), Nguyễn Thu Hà (V4 - Giao diện)
- **Phiên bản:** 0.1.0

---

## 1. QUY ƯỚC CHUNG

### 1.1. Cấu trúc URL gốc & Định dạng
- **Base URL:** `https://<ten-mien>/api/v1`
- **Định dạng trao đổi:** `application/json; charset=utf-8`

### 1.2. Thống nhất mã trạng thái HTTP chuẩn
- **`200 OK`**: Truy vấn hoặc xử lý thành công.
- **`201 Created`**: Tạo mới bản ghi thành công (giữ chỗ, tạo đơn đặt).
- **`400 Bad Request`**: Dữ liệu gửi lên sai định dạng cú pháp JSON.
- **`401 Unauthorized`**: Chưa xác thực danh tính (chưa đăng nhập).
- **`403 Forbidden`**: Không đủ quyền hạn truy cập tài nguyên.
- **`404 Not Found`**: Không tìm thấy tài nguyên yêu cầu.
- **`422 Unprocessable Entity`**: Vi phạm ràng buộc nghiệp vụ (hết chỗ, ngày không hợp lệ).

### 1.3. Cấu trúc phản hồi chuẩn
- **Khi thành công:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Thông báo thành công"
}
{
  "success": false,
  "message": "Dữ liệu gửi lên không hợp lệ.",
  "errors": {
    "service_date": ["Ngày khởi hành phải sau ngày hôm nay."],
    "pax": ["Số khách vượt quá số chỗ còn lại."]
  }
}
---

## 2. DANH MỤC CÁC ĐIỂM CUỐI (API ENDPOINTS)

### PHẦN I: DÀNH CHO MÀN HÌNH TRANG CHỦ

#### 1. Dữ liệu tổng hợp Trang chủ
- **Method:** `GET`
- **Endpoint:** `/home`
- **Mô tả:** Lấy danh sách điểm đến nổi bật, các tour hot và bài viết cẩm nang mới nhất để đổ lên Trang chủ.
- **Mã trạng thái:** `200 OK`
- **Response mẫu:**
```json
{
  "success": true,
  "data": {
    "featured_destinations": [
      {
        "ma_diem_den": "DD001",
        "ten_diem_den": "Vịnh Hạ Long",
        "duong_dan_tinh": "vinh-ha-long",
        "tinh_thanh": "Quảng Ninh",
        "mua_phu_hop": "Hè (T4–T6)",
        "gia_ve_tham_quan": 250000
      }
    ],
    "top_tours": [
      {
        "ma_san_pham": "SP0001",
        "ten_san_pham": "Tour Khám phá Vịnh Hạ Long 2 ngày",
        "duong_dan_tinh": "tour-kham-pha-vinh-ha-long-2-ngay",
        "loai_san_pham": "Tour trọn gói",
        "gia_co_ban": 1890000,
        "diem_danh_gia_tb": 4.8
      }
    ],
    "latest_articles": [
      {
        "ma_bai_viet": "BV0001",
        "tieu_de": "Cẩm nang du lịch Hạ Long tự túc",
        "duong_dan_tinh": "cam-nang-du-lich-ha-long-tu-tuc",
        "ngay_dang": "2026-01-05"
      }
    ]
  }
}
{
  "success": true,
  "data": [
    {
      "ma_san_pham": "SP0001",
      "ten_san_pham": "Tour Khám phá Vịnh Hạ Long 2 ngày",
      "duong_dan_tinh": "tour-kham-pha-vinh-ha-long-2-ngay",
      "loai_san_pham": "Tour trọn gói",
      "gia_co_ban": 1890000,
      "so_ngay": 2,
      "suc_chua_toi_da": 20,
      "diem_danh_gia_tb": 4.8,
      "so_luot_danh_gia": 15,
      "tinh_thanh": "Quảng Ninh"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 60
  }
}
---

### PHẦN II: DÀNH CHO MÀN HÌNH DANH SÁCH & TÌM KIẾM

#### 2. Danh sách sản phẩm có bộ lọc và phân trang Server-side
- **Method:** `GET`
- **Endpoint:** `/products`
- **Mô tả:** Tìm kiếm và lọc sản phẩm theo đa tiêu chí. Bắt buộc phân trang ở tầng máy chủ (không tải hết về trình duyệt).
- **Tham số truy vấn (Query Parameters):**
  - `keyword`: Tìm theo từ khóa trong tên tour.
  - `province`: Tên tỉnh/thành phố cần tìm (ví dụ: `Ninh Bình`, `Quảng Ninh`).
  - `type`: Loại sản phẩm (`Tour trọn gói`, `Lưu trú`, `Vé tham quan`, `Dịch vụ trải nghiệm`, `Vận chuyển`).
  - `price_min`: Mức giá từ (VNĐ).
  - `price_max`: Mức giá đến (VNĐ).
  - `page`: Số trang hiện tại (mặc định: `1`).
  - `per_page`: Số lượng sản phẩm mỗi trang (mặc định: `12`).
- **Mã trạng thái thành công:** `200 OK`
- **Response mẫu:**
```json
{
  "success": true,
  "data": [
    {
      "ma_san_pham": "SP0001",
      "ten_san_pham": "Tour Khám phá Vịnh Hạ Long 2 ngày",
      "duong_dan_tinh": "tour-kham-pha-vinh-ha-long-2-ngay",
      "loai_san_pham": "Tour trọn gói",
      "gia_co_ban": 1890000,
      "so_ngay": 2,
      "suc_chua_toi_da": 20,
      "diem_danh_gia_tb": 4.8,
      "so_luot_danh_gia": 15,
      "tinh_thanh": "Quảng Ninh"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 60
  }
}
---

### PHẦN III: DÀNH CHO MÀN HÌNH CHI TIẾT SẢN PHẨM & ĐẶT CHỖ

#### 3. Chi tiết sản phẩm du lịch
- **Method:** `GET`
- **Endpoint:** `/products/{slug_or_id}`
- **Mô tả:** Lấy thông tin chi tiết một tour, chính sách hủy, thông tin nhà cung cấp và lịch trình theo ngày.
- **Mã trạng thái thành công:** `200 OK`
- **Response mẫu:**
```json
{
  "success": true,
  "data": {
    "ma_san_pham": "SP0001",
    "ten_san_pham": "Tour Khám phá Vịnh Hạ Long 2 ngày",
    "duong_dan_tinh": "tour-kham-pha-vinh-ha-long-2-ngay",
    "loai_san_pham": "Tour trọn gói",
    "gia_co_ban": 1890000,
    "so_ngay": 2,
    "suc_chua_toi_da": 20,
    "chinh_sach_huy": "Hủy trước 72 giờ: hoàn 100%; 24-72 giờ: hoàn 50%",
    "nha_cung_cap": {
      "ma_ncc": "NCC001",
      "ten_ncc": "Công ty Lữ hành Long Hải",
      "tinh_thanh": "Nam Định"
    },
    "itineraries": [
      {
        "day_no": 1,
        "seq_no": 1,
        "destination_name": "Vịnh Hạ Long",
        "duration_min": 300,
        "note": "Tham quan vịnh và chèo kayak"
      }
    ],
    "diem_danh_gia_tb": 4.8,
    "so_luot_danh_gia": 15
  }
}
{
  "success": true,
  "data": [
    {
      "ma_lich": "LKD000001",
      "ngay_khoi_hanh": "2026-11-15",
      "tong_cho": 20,
      "con_lai": 6,
      "gia_ap_dung": 1950000,
      "trang_thai": "mo_ban"
    }
  ]
}
{
  "success": true,
  "data": [
    {
      "ma_san_pham": "SP0012",
      "ten_san_pham": "Tour Di sản Cố đô Huế 3 ngày",
      "diem_tuong_dong": 0.8421
    }
  ]
}
{
  "ma_san_pham": "SP0001",
  "ma_lich": "LKD000001",
  "ngay_khoi_hanh": "2026-11-15",
  "so_luong": 2,
  "ghi_chu": "Yêu cầu đón tại khách sạn"
}
{
  "success": true,
  "message": "Đã giữ chỗ thành công. Vui lòng thanh toán trong vòng 15 phút.",
  "data": {
    "ma_don": "DH00001",
    "ma_san_pham": "SP0001",
    "ngay_khoi_hanh": "2026-11-15",
    "so_luong": 2,
    "don_gia": 1950000,
    "tong_tien": 3900000,
    "trang_thai": "cho_thanh_toan",
    "hold_expires_at": "2026-11-01T14:45:00+07:00"
  }
}
#### 4. Lịch khả dụng & Tồn chỗ theo ngày
- **Method:** `GET`
- **Endpoint:** `/products/{ma_san_pham}/availabilities`
- **Mô tả:** Lấy các ngày khởi hành còn chỗ trong tháng phục vụ giao diện chọn ngày đặt chỗ.
- **Tham số truy vấn (Query Parameters):**
  - `month`: Tháng cần xem (1 đến 12).
  - `year`: Năm cần xem (ví dụ: `2026`).
- **Mã trạng thái thành công:** `200 OK`
- **Response mẫu:**
```json
{
  "success": true,
  "data": [
    {
      "ma_lich": "LKD000001",
      "ngay_khoi_hanh": "2026-11-15",
      "tong_cho": 20,
      "con_lai": 6,
      "gia_ap_dung": 1950000,
      "trang_thai": "mo_ban"
    }
  ]
}{
  "success": true,
  "data": [
    {
      "ma_san_pham": "SP0012",
      "ten_san_pham": "Tour Di sản Cố đô Huế 3 ngày",
      "diem_tuong_dong": 0.8421
    }
  ]
}
{
  "ma_san_pham": "SP0001",
  "ma_lich": "LKD000001",
  "ngay_khoi_hanh": "2026-11-15",
  "so_luong": 2,
  "ghi_chu": "Yêu cầu đón tại khách sạn"
}
{
  "success": true,
  "message": "Đã giữ chỗ thành công. Vui lòng thanh toán trong vòng 15 phút.",
  "data": {
    "ma_don": "DH00001",
    "ma_san_pham": "SP0001",
    "ngay_khoi_hanh": "2026-11-15",
    "so_luong": 2,
    "don_gia": 1950000,
    "tong_tien": 3900000,
    "trang_thai": "cho_thanh_toan",
    "hold_expires_at": "2026-11-01T14:45:00+07:00"
  }
}
{
  "phuong_thuc": "the_noi_dia_sandbox"
}
{
  "success": true,
  "message": "Thanh toán thành công.",
  "ma_giao_dich_sandbox": "SBX9876543210",
  "trang_thai": "da_thanh_toan"
}
{
  "success": true,
  "message": "Hủy đơn thành công theo chính sách.",
  "phi_huy": 1170000,
  "so_tien_hoan": 2730000,
  "trang_thai": "cho_hoan_tien"
}
{
  "ma_don": "DH00001",
  "ma_san_pham": "SP0001",
  "diem": 5,
  "noi_dung": "Hướng dẫn viên nhiệt tình, cảnh đẹp đúng như mô tả."
}
{
  "ung_dung": "ok",
  "csdl": "ok",
  "dich_vu_python": "ok",
  "thoi_diem": "2026-09-22T08:00:00+07:00"
}