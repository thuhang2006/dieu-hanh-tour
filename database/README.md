# Bộ dữ liệu mẫu du lịch — CSE703073

**Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2
**Đơn vị:** Khoa Hệ thống thông tin, Trường Công nghệ thông tin, Đại học Phenikaa
**Phiên bản:** 1.0 · **Tổng số bản ghi:** 4.242 · **Số bảng:** 12

> **CẢNH BÁO BẮT BUỘC ĐỌC.** Toàn bộ dữ liệu trong bộ này là **dữ liệu mô phỏng**, sinh bằng
> chương trình, dùng cho mục đích đào tạo. Tên người, tên doanh nghiệp, số điện thoại, thư điện
> tử, mã số thuế, mã giao dịch đều **không có thật**. Không sử dụng bộ dữ liệu này để đưa ra bất
> kỳ nhận định nào về thị trường du lịch thực tế. Tên tỉnh, thành phố và tọa độ địa lý là có thật
> nhưng tên điểm đến là **tên giả định**.

---

## 1. Bộ dữ liệu này giải quyết vấn đề gì

Mục 2.2 Đề thi yêu cầu hệ thống có **tối thiểu 10 thực thể** và **tối thiểu 300 bản ghi dữ liệu
du lịch có nguồn gốc rõ ràng**. Nhiều nhóm bế tắc ở tuần 6 vì không tìm được dữ liệu. Bộ này
cung cấp một điểm khởi đầu hợp lệ để nhóm:

- có ngay dữ liệu chạy thử cho chức năng tìm kiếm, lọc, đặt chỗ, thống kê;
- có lược đồ tham chiếu đúng chuẩn để đối chiếu với mô hình dữ liệu của nhóm;
- có kịch bản kiểm định chất lượng dữ liệu để tái sử dụng cho dữ liệu do nhóm tự thu thập.

**Lưu ý về điểm số.** Dùng nguyên bộ dữ liệu này là **đạt mức tối thiểu**. Để đạt mức tốt ở
thành phần B1 (2,4 điểm — trọng số lớn nhất), nhóm phải bổ sung dữ liệu do chính nhóm khảo sát
hoặc thu thập từ nguồn mở, trình bày quy trình thu thập, làm sạch và kiểm định trong Chương 2.
Việc sử dụng bộ dữ liệu này phải được khai báo rõ trong báo cáo.

---

## 2. Cấu trúc thư mục

```
CSE703073_Dataset_DuLich/
├── README.md                  Tài liệu này
├── schema.sql                 Lược đồ CSDL MySQL 8.0 (12 bảng, khóa ngoại, chỉ mục, CHECK)
├── seed.sql                   Toàn bộ dữ liệu dưới dạng câu lệnh INSERT (≈400 KB)
├── tu_dien_du_lieu.csv        Từ điển dữ liệu: bảng, trường, kiểu, ràng buộc, ý nghĩa
├── thong_ke.json              Thống kê số bản ghi mỗi bảng
├── kiem_dinh_du_lieu.py       Kịch bản kiểm định 40 phép kiểm tra chất lượng dữ liệu
├── build_dataset.py           Kịch bản sinh lại dữ liệu (thay đổi quy mô nếu cần)
└── csv/                       12 tệp CSV, mã hóa UTF-8, dấu phân cách dấu phẩy
    ├── diem_den.csv               76      ├── don_dat.csv           260
    ├── nha_cung_cap.csv           24      ├── chi_tiet_don.csv      365
    ├── nguoi_dung.csv            110      ├── thanh_toan.csv        209
    ├── san_pham.csv              140      ├── danh_gia.csv           88
    ├── gia_theo_mua.csv          560      ├── bai_viet.csv           60
    └── lich_kha_dung.csv       2.150      └── nhat_ky_he_thong.csv  200
```

---

## 3. Mô hình dữ liệu

```
nha_cung_cap ──< san_pham >── diem_den ──< bai_viet
                    │  │
                    │  └──< gia_theo_mua        (giá theo 4 mùa, hệ số nhân)
                    └──< lich_kha_dung          (tồn theo ngày khởi hành)
                              │
nguoi_dung ──< don_dat ──< chi_tiet_don ────────┘
                 │  └──< thanh_toan             (chỉ môi trường thử nghiệm)
                 └──< danh_gia >── san_pham
nhat_ky_he_thong                                (ghi vết thao tác, 3 mức)
```

**Bốn đặc thù du lịch được thể hiện trong lược đồ** — đây là phần nhóm cần phân tích ở Chương 2:

1. **Giá biến động theo mùa vụ.** Bảng `gia_theo_mua` tách giá khỏi sản phẩm; hệ số hè 1,35 và
   hệ số đông 0,85 phản ánh quy luật mùa vụ. Giá thực tế của một đơn phụ thuộc ngày khởi hành.
2. **Tồn kho theo ngày, không phải theo sản phẩm.** Bảng `lich_kha_dung` là nơi phát sinh bài
   toán tranh chấp khi hai khách cùng đặt chỗ cuối cùng. Ràng buộc `con_lai >= 0` là ràng buộc
   trọng yếu nhất của toàn hệ thống.
3. **Sức tải điểm đến.** Trường `diem_den.suc_tai_ngay` cho phép nhóm làm bài toán quản lý điểm
   đến thông minh, cảnh báo quá tải.
4. **Đánh giá gắn với giao dịch.** `danh_gia` chỉ tồn tại khi đơn ở trạng thái `hoan_tat`, tránh
   đánh giá ảo. Trường `trang_thai_kiem_duyet` phục vụ chức năng kiểm duyệt nội dung.

**Điều cố ý không có trong bộ dữ liệu:** bảng `nguoi_dung` **không có cột mật khẩu**. Nhóm phải tự
sinh mật khẩu và băm bằng bcrypt hoặc Argon2 khi nạp dữ liệu — đây là yêu cầu bắt buộc tại
Mục 2.2 Đề thi và là một trong bảy yêu cầu bảo mật.

---

## 4. Nạp dữ liệu vào MySQL

### 4.1. Trên cả ba nền tảng (cách nhanh nhất)

```bash
# Buoc 1: tao co so du lieu va tai khoan ung dung
mysql -u root -p -e "CREATE DATABASE dulichso CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Buoc 2: nap luoc do
mysql -u root -p dulichso < schema.sql

# Buoc 3: nap du lieu
mysql -u root -p dulichso < seed.sql

# Buoc 4: kiem tra
mysql -u root -p dulichso -e "SELECT COUNT(*) FROM san_pham; SELECT COUNT(*) FROM lich_kha_dung;"
```

### 4.2. Ghi chú theo nền tảng

| Nền tảng | Ghi chú |
|---|---|
| **Windows** | Nếu lệnh `mysql` không nhận, thêm `C:\Program Files\MySQL\MySQL Server 8.0\bin` vào biến `Path`. Trong PowerShell, dùng `Get-Content seed.sql \| mysql -u root -p dulichso` thay cho toán tử `<`. |
| **macOS** | Cài bằng `brew install mysql` rồi `brew services start mysql`. Chip Apple dùng đường dẫn `/opt/homebrew/bin`. |
| **Linux** | `sudo apt install mysql-server` rồi `sudo mysql_secure_installation`. Nếu đăng nhập root bằng socket, dùng `sudo mysql dulichso < seed.sql`. |
| **Docker** | `docker compose exec -T db mysql -u root -p"$MYSQL_ROOT_PASSWORD" dulichso < seed.sql` |

### 4.3. Nạp từ CSV thay vì SQL

Dùng khi nhóm làm việc với PostgreSQL, SQLite hoặc muốn xử lý dữ liệu bằng Python trước khi nạp.

```bash
# MySQL: bat quyen nap tep cuc bo
mysql --local-infile=1 -u root -p dulichso
```
```sql
SET GLOBAL local_infile = 1;
LOAD DATA LOCAL INFILE 'csv/diem_den.csv'
INTO TABLE diem_den
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

Thứ tự nạp bắt buộc (do ràng buộc khóa ngoại):
`diem_den` → `nha_cung_cap` → `nguoi_dung` → `san_pham` → `gia_theo_mua` → `lich_kha_dung`
→ `don_dat` → `chi_tiet_don` → `thanh_toan` → `danh_gia` → `bai_viet` → `nhat_ky_he_thong`.

### 4.4. Nạp bằng Python (khuyến nghị cho mô-đun Python bắt buộc)

```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://dulichso_app:MAT_KHAU@127.0.0.1:3306/dulichso?charset=utf8mb4")
thu_tu = ['diem_den', 'nha_cung_cap', 'nguoi_dung', 'san_pham', 'gia_theo_mua',
          'lich_kha_dung', 'don_dat', 'chi_tiet_don', 'thanh_toan',
          'danh_gia', 'bai_viet', 'nhat_ky_he_thong']

for bang in thu_tu:
    df = pd.read_csv(f'csv/{bang}.csv')
    df.to_sql(bang, engine, if_exists='append', index=False, chunksize=500)
    print(f'{bang:22s} {len(df):6d} dòng')
```

---

## 5. Kiểm định chất lượng dữ liệu

```bash
pip install pandas
python3 kiem_dinh_du_lieu.py      # Windows: python kiem_dinh_du_lieu.py
```

Kịch bản chạy **40 phép kiểm định** theo năm nhóm: khối lượng dữ liệu, tính duy nhất của khóa
chính, toàn vẹn tham chiếu, ràng buộc nghiệp vụ và tính hợp lệ của miền giá trị. Mã thoát bằng 0
khi toàn bộ phép kiểm định đạt.

**Nhóm bắt buộc chạy lại kịch bản này sau khi bổ sung dữ liệu của mình** và đưa ảnh chụp kết quả
vào Chương 2 báo cáo. Đây là minh chứng trực tiếp cho mức "Tốt" của thành phần B1.

Kết quả kiểm định của bản phát hành 1.0: **40/40 phép kiểm định đạt**, 0 vi phạm khóa ngoại khi
nạp thực tế vào cơ sở dữ liệu.

---

## 6. Truy vấn mẫu để bắt đầu

```sql
-- 1. Tim san pham theo dia phuong va khoang gia, co phan trang
SELECT s.ma_san_pham, s.ten_san_pham, d.tinh_thanh, s.gia_co_ban, s.diem_danh_gia_tb
FROM san_pham s
JOIN diem_den d ON d.ma_diem_den = s.ma_diem_den
WHERE d.tinh_thanh = 'Ninh Bình'
  AND s.gia_co_ban BETWEEN 500000 AND 3000000
  AND s.trang_thai = 'dang_ban'
ORDER BY s.diem_danh_gia_tb DESC, s.gia_co_ban ASC
LIMIT 12 OFFSET 0;

-- 2. Kiem tra ton kha dung truoc khi dat cho (dung trong giao dich, co khoa hang)
START TRANSACTION;
SELECT con_lai FROM lich_kha_dung WHERE ma_lich = 'LKD000123' FOR UPDATE;
UPDATE lich_kha_dung
   SET da_dat = da_dat + 2, con_lai = con_lai - 2
 WHERE ma_lich = 'LKD000123' AND con_lai >= 2;
-- neu ROW_COUNT() = 0 thi het cho, ROLLBACK
COMMIT;

-- 3. Doanh thu theo thang va theo vung mien (cho bang dieu khien quan tri)
SELECT DATE_FORMAT(dd.ngay_dat, '%Y-%m') AS thang,
       d.vung_mien,
       COUNT(DISTINCT dd.ma_don) AS so_don,
       SUM(ct.thanh_tien)        AS doanh_thu
FROM don_dat dd
JOIN chi_tiet_don ct ON ct.ma_don = dd.ma_don
JOIN san_pham s      ON s.ma_san_pham = ct.ma_san_pham
JOIN diem_den d      ON d.ma_diem_den = s.ma_diem_den
WHERE dd.trang_thai IN ('da_thanh_toan', 'hoan_tat')
GROUP BY thang, d.vung_mien
ORDER BY thang DESC, doanh_thu DESC;

-- 4. Ty le huy don theo nha cung cap (phat hien van de chat luong dich vu)
SELECT n.ten_ncc,
       COUNT(*)                                                        AS tong_don,
       SUM(dd.trang_thai = 'da_huy')                                   AS don_huy,
       ROUND(100 * SUM(dd.trang_thai = 'da_huy') / COUNT(*), 1)        AS ty_le_huy
FROM don_dat dd
JOIN chi_tiet_don ct ON ct.ma_don = dd.ma_don
JOIN san_pham s      ON s.ma_san_pham = ct.ma_san_pham
JOIN nha_cung_cap n  ON n.ma_ncc = s.ma_ncc
GROUP BY n.ten_ncc
HAVING tong_don >= 5
ORDER BY ty_le_huy DESC;

-- 5. Diem den co nguy co qua tai (bai toan quan ly diem den thong minh)
SELECT d.ten_diem_den, d.tinh_thanh, d.suc_tai_ngay,
       l.ngay_khoi_hanh, SUM(l.da_dat) AS luot_dat_du_kien
FROM lich_kha_dung l
JOIN san_pham s ON s.ma_san_pham = l.ma_san_pham
JOIN diem_den d ON d.ma_diem_den = s.ma_diem_den
GROUP BY d.ma_diem_den, l.ngay_khoi_hanh
HAVING luot_dat_du_kien > d.suc_tai_ngay * 0.8
ORDER BY luot_dat_du_kien DESC;
```

---

## 7. Sinh lại hoặc mở rộng dữ liệu

```bash
python3 build_dataset.py
```

Kịch bản dùng hạt giống ngẫu nhiên cố định (`random.seed(20261115)`) nên **kết quả tái lập được**:
chạy lại luôn cho ra đúng bộ dữ liệu này. Muốn thay đổi quy mô, sửa các vòng lặp `range(...)` trong
tệp; muốn có bộ dữ liệu khác, đổi giá trị hạt giống.

Sau khi sửa, **bắt buộc** chạy lại `kiem_dinh_du_lieu.py` trước khi dùng.

---

## 8. Điều kiện sử dụng

- Được phép sử dụng, sửa đổi, mở rộng trong phạm vi học phần CSE703073.
- Khi sử dụng, nhóm phải ghi rõ trong Chương 2 báo cáo: nguồn dữ liệu là bộ mẫu của học phần,
  phần nào giữ nguyên, phần nào do nhóm bổ sung.
- Không công bố bộ dữ liệu này như dữ liệu thị trường thực tế dưới bất kỳ hình thức nào.
- Mọi hoạt động thanh toán trong dữ liệu là mô phỏng; nghiêm cấm gắn với cổng thanh toán thật.
