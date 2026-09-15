# YÊU CẦU CHỨC NĂNG (FR) VÀ PHI CHỨC NĂNG (NFR) - BUỔI 2

## 1. Yêu cầu chức năng:
- FR-AUTH-01: Xác thực người dùng, băm mật khẩu Argon2id.
- FR-PERM-01: Phân quyền vai trò (Admin, Operator, Guide, Customer).
- FR-CATL-01: Tìm kiếm, lọc tour theo địa điểm, khoảng giá, mùa vụ.
- FR-CATL-02: Hiển thị lịch trình chi tiết theo từng ngày (itineraries).
- FR-BOOK-01: Giữ chỗ có thời hạn 15 phút, khóa hàng chống tranh chấp chỗ cuối.
- FR-BOOK-02: Tự động giải phóng chỗ khi hết hạn giữ chỗ.
- FR-PAY-01: Thanh toán trực tuyến thử nghiệm Sandbox.
- FR-ORDR-01: Quản lý trạng thái đơn, chính sách hoàn/hủy tour.
- FR-ADMN-01: Bảng điều khiển quản trị thống kê doanh thu và công suất tải.
- FR-PYMD-01: Dịch vụ Python gợi ý tour tương đồng và phân tích mùa vụ.

## 2. Yêu cầu phi chức năng (Có ngưỡng đo đạc):
- NFR-PERF-01: Thời gian phản hồi trang < 2.0 giây trên mạng di động.
- NFR-PERF-02: Chịu tải đồng thời tối thiểu 10 người dùng, lỗi < 1%.
- NFR-SECU-01: 100% câu truy vấn dùng Prepared Statement/ORM, chống SQL Injection.
- NFR-RESP-01: Responsive hoàn chỉnh trên 3 khổ: Mobile (<640px), Tablet (640-1023px), Desktop (>=1024px).
- NFR-ACCE-01: Tương phản màu WCAG 2.1 AA, điều hướng được bằng phím Tab.
