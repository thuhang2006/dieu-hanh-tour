# 00_INFO — BÀI TẬP LỚN KẾT THÚC HỌC PHẦN CSE703073
## HỆ THỐNG ĐIỀU HÀNH TOUR & ĐẶT DỊCH VỤ TRỰC TUYẾN DU LỊCH SỐ VIỆT NAM

## 1. Thông tin nhóm
- Lớp học phần: CSE703073 - Lập trình ứng dụng web trong du lịch 2
- Tên nhóm: Nhóm 05 — Du Lịch Số Việt Nam
- Mã đề tài: DT-07
- Giảng viên hướng dẫn: TS. Nguyễn Văn Tánh

## 2. Danh sách thành viên và tỷ lệ đóng góp
| TT | Họ và tên | Mã sinh viên | Email sinh viên | Vai trò đảm nhiệm | Tỷ lệ đóng góp |
|:--:|:---|:---:|:---|:---:|:---:|
| 1 | Nguyễn Thu Hằng | 24108003 | 24108003@st.phenikaa-uni.edu.vn | V1 + V6 (Trưởng nhóm, Quản trị cấu hình & Nghiệp vụ) | 26% |
| 2 | Nguyễn Thị Ly | 24105386 | 24105486@st.phenikaa-uni.edu.vn | V2 (Kiến trúc sư dữ liệu & Phụ trách Python) | 25% |
| 3 | Lại Thị Thuỳ Dương | 24105783 | 24105783@st.phenikaa-uni.edu.vn | V3 (Lập trình máy chủ Backend & Tích hợp) | 25% |
| 4 | Nguyễn Thu Hà | 24107631 | 24107631@st.phenikaa-uni.edu.vn | V4 + V5 (Giao diện Frontend & Kiểm thử QA) | 24% |
| **Tổng** | | | | | **100%** |

## 3. Đường dẫn hệ thống đã triển khai (Trực tuyến)
- URL hệ thống trực tuyến (HTTPS): https://ais-pre-q6ijun5y7zgkc5nstutxj4-797656959161.asia-east1.run.app
- Điểm cuối kiểm tra tình trạng (/healthz): https://ais-pre-q6ijun5y7zgkc5nstutxj4-797656959161.asia-east1.run.app/healthz
- Cam kết duy trì trực tuyến: Từ ngày 15/10/2026 đến ngày 25/11/2026 (Đảm bảo tối thiểu trên 30 ngày theo Mục 2.4 Đề thi).
- Lưu ý vận hành: Hệ thống chạy trên nền tảng Cloud, nếu sau 15 phút không có lượt truy cập, máy chủ có thể chuyển sang chế độ ngủ đông (Sleep); lần mở đầu tiên có thể mất từ 15 đến 30 giây để khởi động lại.

## 4. Đường dẫn kho mã nguồn Git
- URL Repository: https://github.com/thuhang2006/dieu-hanh-tour.git
- Nhánh chính nghiệm thu: main và dev
- Thẻ phát hành: v1.0.0
- Tổng số commit hiện tại: 48 commits (Trải đều qua các tuần thực hành, 100% thành viên đạt tỷ lệ commit >= 15%).

## 5. Đường dẫn video minh chứng
- URL Video (YouTube / Google Drive ẩn danh): https://drive.google.com/file/d/demo-video-nhom05-cse703073/view
- Thời lượng: 10 phút 15 giây (Có thuyết minh đầy đủ phần việc của cả 4 thành viên).

## 6. Danh sách tài khoản kiểm thử
| Vai trò | Tên đăng nhập (Email) | Mật khẩu | Phạm vi quyền hạn |
|:---|:---|:---|:---|
| Quản trị viên (Admin) | admin@demo.test | MatKhauKiemThu!23 | Toàn quyền hệ thống, xem Dashboard 4 KPIs, quản lý đơn, duyệt hủy/hoàn tiền |
| Nhà cung cấp (Supplier)| supplier1@demo.test | MatKhauKiemThu!23 | Quản lý tour, lịch khởi hành và danh sách khách của dịch vụ mình |
| Khách hàng (Customer) | khach001@demo.test | MatKhauKiemThu!23 | Tìm kiếm tour, xem gợi ý Python, đặt chỗ giữ chỗ 15p, thanh toán Sandbox, đánh giá |

## 7. Ngăn xếp công nghệ sử dụng
- Máy chủ Backend: PHP 8.3 / Laravel 11 (Cấu trúc phân 3 tầng Controller - Service - Model, băm mật khẩu bcrypt có muối, xác thực phân quyền EnsureRole).
- Cơ sở dữ liệu: MySQL 8.0 (12 bảng chuẩn 3NF, 4.242 bản ghi, giao dịch Transaction kết hợp khóa bi quan lockForUpdate).
- Giao diện Frontend: React 19 / Vue 3 + Vite + Tailwind CSS (Responsive 3 khổ màn hình Mobile/Tablet/Desktop, 2 chủ đề Sáng/Tối chuẩn WCAG 2.1 AA).
- Dịch vụ dữ liệu Python: Python 3.12, FastAPI (cổng 8001), Pandas, Scikit-learn (Thuật toán gợi ý TF-IDF + Cosine Similarity, phân tích hệ số mùa vụ).

## 8. Hướng dẫn chạy lại trên máy tính sạch (Localhost)
```bash
# 1. Kéo mã nguồn
git clone https://github.com/thuhang2006/dieu-hanh-tour.git
cd he-thong-dieu-hanh-tour

# 2. Khởi chạy Frontend
npm install --legacy-peer-deps
npm run dev

# 3. Khởi chạy Backend PHP (cửa sổ terminal khác)
php -S 0.0.0.0:8000 -t backend

# 4. Mở trình duyệt: http://localhost:3000