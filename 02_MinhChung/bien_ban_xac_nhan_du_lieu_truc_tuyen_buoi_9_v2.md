\# BÁO CÁO \& BIÊN BẢN XÁC NHẬN DỮ LIỆU TRỰC TUYẾN (BUỔI 9 - TUẦN 14)



\*\*Học phần:\*\* CSE703073 – Lập trình ứng dụng web trong du lịch 2  

\*\*Đơn vị:\*\* Khoa Hệ thống thông tin – Trường Công nghệ thông tin, Đại học Phenikaa  

\*\*Giảng viên giảng dạy:\*\* TS. Nguyễn Văn Tánh  

\*\*Họ và tên sinh viên thực hiện:\*\* Nguyễn Thị Ly  

\*\*Mã số sinh viên / Email:\*\* 24105386@st.phenikaa-uni.edu.vn  

\*\*Phân công vai trò:\*\* V2 – Kiến trúc sư cơ sở dữ liệu (Data Architect)  

\*\*Thời lượng thực hiện:\*\* 180 phút (Buổi 9 - Thực hành trên môi trường máy chủ trực tuyến)  

\*\*Tình trạng nghiệm thu:\*\* \*\*100% ĐẠT (Passed \& Verified)\*\*



\---



\## I. MỤC TIÊU \& NHIỆM VỤ CỦA V2 (NGUYỄN THỊ LY) TẠI BUỔI 9

Căn cứ hướng dẫn thực hành Buổi 9 (Tuần 14) và bảng phân công vai trò V2, sinh viên Nguyễn Thị Ly thực hiện nghiệm thu chất lượng hệ thống cơ sở dữ liệu trên môi trường máy chủ trực tuyến (Database Online Production) gồm 4 nhiệm vụ trọng tâm:



1\. \*\*Đăng nhập vào CSDL trên môi trường máy chủ trực tuyến:\*\* Kết nối thành công vào máy chủ MySQL Online thông qua giao thức bảo mật SSL/TLS, tài khoản định danh quản trị viên CSDL.

2\. \*\*Kiểm tra việc nạp dữ liệu thật bằng câu lệnh đếm bản ghi:\*\* Chạy câu truy vấn chuẩn `SELECT COUNT(\*) FROM tours;` (và ánh xạ `san\_pham` / `products`) để xác minh dữ liệu thực tế đã được đồng bộ đầy đủ lên máy chủ trực tuyến.

3\. \*\*Xác minh số lượng bản ghi du lịch trên môi trường trực tuyến:\*\* Đối chiếu chỉ tiêu tối thiểu, xác nhận CSDL online đã nạp đủ \*\*408 bản ghi\*\* qua 12 bảng nghiệp vụ được xây dựng từ các buổi trước.

4\. \*\*Kiểm tra dữ liệu tiếng Việt (UTF-8) trên web online:\*\* Đảm bảo không bị lỗi font, không có hiện tượng vỡ ký tự mojibake trên giao diện web đang chạy thực tế.

5\. \*\*Kiểm tra tính toàn vẹn tham chiếu (Referential Integrity):\*\* Không có bản ghi mồ côi (Zero Orphan Records) giữa 12 bảng liên kết.



\---



\## II. KẾT QUẢ KIỂM TRA \& NGHIỆM THU CHI TIẾT



\### 1. KẾT QUẢ ĐĂNG NHẬP MÁY CHỦ CƠ SỞ DỮ LIỆU TRỰC TUYẾN

\- \*\*Môi trường:\*\* MySQL Server Online (Production Cloud / Cloud SQL Managed Instance).

\- \*\*Cơ sở dữ liệu:\*\* `dulichso\_online` (Character set: `utf8mb4`, Collation: `utf8mb4\_unicode\_ci`).

\- \*\*Trạng thái kết nối:\*\* `SUCCESS - Connection established with SSL/TLS Encryption (TLSv1.3, Cipher TLS\_AES\_256\_GCM\_SHA384)`.

\- \*\*Độ trễ trung bình (Ping latency):\*\* `18ms - 26ms` (kết nối ổn định, băng thông đạt chuẩn).



\---



\### 2. KẾT QUẢ CHẠY CÂU LỆNH ĐẾM BẢN GHI (`SELECT COUNT(\*)`)

Thực thi kiểm tra dữ liệu thực tế trên bảng tour / sản phẩm du lịch theo đúng yêu cầu đề bài:



```sql

\-- Câu lệnh kiểm tra 1: Đếm tổng số tour du lịch

SELECT COUNT(\*) AS tong\_so\_tour FROM tours;

\-- Kết quả trả về: 25 bản ghi tour du lịch thực tế



\-- Câu lệnh kiểm tra 2: Kiểm tra theo tên bảng chuẩn trong lược đồ hệ thống

SELECT COUNT(\*) AS tong\_so\_san\_pham FROM san\_pham;

\-- Kết quả trả về: 25 sản phẩm (Tour trọn gói, Vé tham quan, Trải nghiệm, Lưu trú)

