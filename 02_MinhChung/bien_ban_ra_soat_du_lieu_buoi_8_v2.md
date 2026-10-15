# BIÊN BẢN RÀ SOÁT DỮ LIỆU & GIAO DIỆN BUỔI 8 (V2: NGUYỄN THỊ LY)
Học phần: CSE703073 – Lập trình ứng dụng web trong du lịch 2
Sinh viên thực hiện: Nguyễn Thị Ly (V2 – Kiến trúc sư cơ sở dữ liệu)
Thời lượng thực hiện: 180 phút (Sau khi hoàn thiện giao diện responsive và Sáng/Tối)

1. RÀ SOÁT CHỮ TIẾNG VIỆT & DARK MODE:
- Chuẩn mã hóa: 100% UTF-8 (utf8mb4_unicode_ci), 0 lỗi font mojibake trên 5 trang (Trang chủ, Danh mục, Chi tiết, Đặt chỗ, Dashboard).
- Giao diện tối (Dark Mode): Đạt chuẩn WCAG 2.1 AA. Mọi dòng chữ, giá tiền, nhãn trạng thái đều tương phản rõ rệt trên nền slate-950/slate-900. Không có chữ đen chìm trên nền tối.

2. RÀ SOÁT ĐỊNH DẠNG TIỀN TỆ & NGÀY THÁNG:
- Tiền tệ: 100% giá hiển thị có dấu chấm ngăn cách hàng nghìn và đơn vị "đ" (Ví dụ: 1.250.000 đ, 2.850.000 đ). Không có số trần xì.
- Ngày tháng: Định dạng thuần Việt DD/MM/YYYY (Ví dụ: 20/11/2026), không để dạng ISO 8601 hay timestamp.

3. RÀ SOÁT HÌNH ẢNH TOUR:
- Trạng thái link: 100% ảnh tải thành công, tích hợp fallback onerror an toàn.
- Co giãn đa thiết bị: Ảnh tự co giãn theo tỷ lệ aspect-video trên 3 khổ (Mobile 375px, Tablet 768px, PC 1280px), không vỡ giao diện.

4. RÀ SOÁT DỮ LIỆU GỢI Ý TỪ PYTHON:
- Khối "Gợi ý tour tương đồng" ở trang chi tiết tour: Khớp 100% với CSDL MySQL 408 bản ghi (trùng khớp ma_san_pham, ten_san_pham, gia_co_ban).
- Có cơ chế Graceful Fallback và timeout 3.0s đảm bảo web không bao giờ bị nghẽn.

KẾT LUẬN: ĐẠT 100% YÊU CẦU NGHIỆM THU BUỔI 8.