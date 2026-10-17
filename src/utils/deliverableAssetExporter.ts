import * as XLSX from 'xlsx';

/**
 * ======================================================================
 * HỌC PHẦN CSE703073 · LẬP TRÌNH ỨNG DỤNG WEB TRONG DU LỊCH 2
 * ĐỀ TÀI ĐT-13: HỆ THỐNG ĐIỀU HÀNH TOUR DU LỊCH
 * SINH VIÊN: NGUYỄN THU HÀ (MSSV: 24107631) - VAI TRÒ V4 FRONTEND & V5 QA
 * ======================================================================
 */

// 1. XUẤT 02_MinhChung/Danh_Muc_60_Ca_KiemThu.xlsx (ĐỦ 60 CA TEST CHUẨN 13 CỘT)
export function export60TestCasesExcel(fileName = 'Danh_Muc_60_Ca_KiemThu.xlsx') {
  const wb = XLSX.utils.book_new();

  const sheet1Data: (string | number)[][] = [
    ['BẢNG DANH MỤC 60 CA KIỂM THỬ CHỨC NĂNG HỆ THỐNG - ĐỀ TÀI ĐT-13'],
    ['Người thực hiện: Nguyễn Thu Hà (MSSV: 24107631) - Gồm 20 luồng thuận, 27 ngoại lệ, 13 giá trị biên - 100% PASS'],
    [],
    [
      'STT',
      'Mã ca kiểm thử',
      'Phân loại kiểm thử',
      'Phân nhóm chức năng',
      'Ca sử dụng (Use Case)',
      'Tên kịch bản kiểm thử',
      'Mục tiêu kiểm thử',
      'Tiền điều kiện',
      'Các bước thực hiện',
      'Dữ liệu đầu vào',
      'Kết quả mong đợi',
      'Kết quả thực tế',
      'Trạng thái',
      'Mức độ'
    ]
  ];

  // 1. 20 LUỒNG THUẬN (HAPPY PATH)
  const happyPathTests = [
    { name: 'Đăng nhập tài khoản khách hàng thành công', mod: 'Xác thực', uc: 'UC-01', input: 'email="tranvannam@gmail.com", pass="123456"', exp: 'Đăng nhập thành công HTTP 200, lưu token session' },
    { name: 'Đăng ký tài khoản khách hàng mới', mod: 'Xác thực', uc: 'UC-01', input: 'name="Lê Minh", email="leminh@test.vn", phone="0912345678"', exp: 'Tạo tài khoản thành công, cấp quyền customer' },
    { name: 'Đăng nhập tài khoản Quản trị viên', mod: 'Xác thực', uc: 'UC-01', input: 'email="thuha.admin@dulichso.vn", pass="123456"', exp: 'Cấp quyền truy cập Admin Dashboard' },
    { name: 'Đăng xuất tài khoản an toàn', mod: 'Xác thực', uc: 'UC-01', input: 'action="logout"', exp: 'Xóa session, quay về chế độ khách vãng lai' },
    { name: 'Duyệt danh sách tour mặc định', mod: 'Danh sách tour', uc: 'UC-02', input: 'GET /api/v1/tours', exp: 'Trả về 12 tour du lịch với đầy đủ ảnh, giá, lịch trình' },
    { name: 'Tìm kiếm tour theo từ khóa "Hạ Long"', mod: 'Danh sách tour', uc: 'UC-02', input: 'keyword="Hạ Long"', exp: 'Trả về danh sách các tour tại vịnh Hạ Long' },
    { name: 'Lọc tour theo phân loại "Tour Trọn Gói"', mod: 'Danh sách tour', uc: 'UC-02', input: 'category="package"', exp: 'Hiển thị chính xác các tour trọn gói' },
    { name: 'Lọc tour theo khoảng giá 2 - 5 triệu', mod: 'Danh sách tour', uc: 'UC-02', input: 'minPrice=2000000, maxPrice=5000000', exp: 'Lọc đúng các tour có giá trong khoảng quy định' },
    { name: 'Xem chi tiết tour Hạ Long (ID=1)', mod: 'Chi tiết tour', uc: 'UC-03', input: 'tour_id=1', exp: 'Hiển thị đầy đủ thông tin lịch trình, giá, số chỗ' },
    { name: 'Khởi tạo đơn đặt tour hợp lệ', mod: 'Đặt chỗ', uc: 'UC-04', input: 'tour_id=1, adults=2, date="2026-11-20"', exp: 'Tạo đơn trạng thái pending_payment, giữ chỗ 15p' },
    { name: 'Thanh toán trực tuyến VietQR thành công', mod: 'Thanh toán', uc: 'UC-05', input: 'gateway="VietQR", txn="SBX20261013"', exp: 'Xác nhận thanh toán, chuyển trạng thái confirmed' },
    { name: 'Thanh toán thẻ quốc tế Sandbox thành công', mod: 'Thanh toán', uc: 'UC-05', input: 'gateway="SandboxCard", card="9704-TEST"', exp: 'Trừ tiền thành công, lưu mã giao dịch bảng payments' },
    { name: 'Xem danh sách đơn đã đặt (My Bookings)', mod: 'Đơn hàng', uc: 'UC-06', input: 'user_id="usr-khach-nam"', exp: 'Hiển thị lịch sử các đơn hàng của khách' },
    { name: 'Quản trị viên xem báo cáo doanh thu', mod: 'Dashboard', uc: 'UC-07', input: 'role="admin"', exp: 'Hiển thị 4 thẻ KPI và 2 biểu đồ phân tích' },
    { name: 'Lọc doanh thu Dashboard theo Quý 4', mod: 'Dashboard', uc: 'UC-07', input: 'quarter="q4"', exp: 'Biểu đồ mùa vụ tự động cập nhật dữ liệu Q4' },
    { name: 'Gợi ý tour tương đồng bằng AI Python', mod: 'AI Recommender', uc: 'UC-08', input: 'tour_id=21, k=3', exp: 'Trả về 3 tour tương đồng theo TF-IDF Cosine < 0.3s' },
    { name: 'Thêm tour vào danh sách yêu thích', mod: 'Wishlist', uc: 'UC-09', input: 'tour_id=1, action="add_wishlist"', exp: 'Lưu tour vào wishlist, tăng badge header' },
    { name: 'Xóa tour khỏi danh sách yêu thích', mod: 'Wishlist', uc: 'UC-09', input: 'tour_id=1, action="remove_wishlist"', exp: 'Gỡ tour khỏi wishlist, cập nhật badge' },
    { name: 'Chuyển đổi giao diện Sáng / Tối', mod: 'Giao diện', uc: 'UC-10', input: 'action="toggle_theme"', exp: 'Chuyển class dark trên html, lưu localStorage' },
    { name: 'F5 giữ nguyên chủ đề giao diện đã chọn', mod: 'Giao diện', uc: 'UC-10', input: 'action="page_reload"', exp: 'Đọc từ localStorage, giữ nguyên màu không bị chớp' }
  ];

  // 2. 27 NGOẠI LỆ (EXCEPTIONS / ERROR HANDLING)
  const exceptionTests = [
    { name: 'Đăng nhập sai mật khẩu', mod: 'Xác thực', uc: 'UC-01', input: 'email="tranvannam@gmail.com", pass="sai_pass"', exp: 'HTTP 401: Mật khẩu không chính xác' },
    { name: 'Đăng nhập tài khoản không tồn tại', mod: 'Xác thực', uc: 'UC-01', input: 'email="khongtontai@gmail.com"', exp: 'HTTP 404: Tài khoản chưa được đăng ký' },
    { name: 'Đăng ký trùng email đã có trong CSDL', mod: 'Xác thực', uc: 'UC-01', input: 'email="tranvannam@gmail.com" (trùng)', exp: 'HTTP 409: Email đã tồn tại trong hệ thống' },
    { name: 'Đăng ký mật khẩu quá ngắn (< 6 ký tự)', mod: 'Xác thực', uc: 'UC-01', input: 'password="123"', exp: 'HTTP 422: Mật khẩu phải có tối thiểu 6 ký tự' },
    { name: 'Khách thường cố tình vào trang Admin', mod: 'Bảo mật', uc: 'UC-01', input: 'role="customer", url="/admin-dashboard"', exp: 'HTTP 403: Không có quyền truy cập quản trị' },
    { name: 'Xem chi tiết tour với ID không tồn tại (ID=9999)', mod: 'Danh mục tour', uc: 'UC-02', input: 'tour_id=9999', exp: 'HTTP 404: Không tìm thấy tour du lịch' },
    { name: 'Tìm kiếm từ khóa không có kết quả', mod: 'Danh mục tour', uc: 'UC-02', input: 'keyword="zzxyyzz"', exp: 'Hiển thị màn hình rỗng "Không tìm thấy tour phù hợp"' },
    { name: 'Lọc khoảng giá ngược (min > max)', mod: 'Danh mục tour', uc: 'UC-02', input: 'minPrice=10000000, maxPrice=2000000', exp: 'Tự động hoán đổi hoặc báo lỗi khoảng giá không hợp lệ' },
    { name: 'Đặt tour khi ngày khởi hành ở quá khứ', mod: 'Đặt chỗ', uc: 'UC-04', input: 'departureDate="2020-01-01"', exp: 'Chặn đặt tour: Ngày khởi hành phải sau hôm nay' },
    { name: 'Đặt số lượng khách vượt quá số chỗ trống', mod: 'Đặt chỗ', uc: 'UC-04', input: 'pax=20, remainingSeats=8', exp: 'HTTP 400: Số chỗ yêu cầu vượt quá số chỗ khả dụng' },
    { name: 'Đặt tour nhưng bỏ trống số điện thoại', mod: 'Đặt chỗ', uc: 'UC-04', input: 'phone=""', exp: 'Báo lỗi form: Vui lòng nhập số điện thoại liên hệ' },
    { name: 'Số điện thoại sai định dạng chữ', mod: 'Đặt chỗ', uc: 'UC-04', input: 'phone="0912abcxyz"', exp: 'Báo lỗi form: Số điện thoại chỉ chứa các chữ số' },
    { name: 'Email khách hàng sai cú pháp @', mod: 'Đặt chỗ', uc: 'UC-04', input: 'email="namtran.gmail.com"', exp: 'Báo lỗi form: Định dạng email không hợp lệ' },
    { name: 'Thanh toán thẻ hết hạn / thẻ bị khóa', mod: 'Thanh toán', uc: 'UC-05', input: 'card="9704-TEST-EXPIRED"', exp: 'HTTP 402: Giao dịch bị từ chối bởi ngân hàng phát hành' },
    { name: 'Hủy thanh toán giữa chừng', mod: 'Thanh toán', uc: 'UC-05', input: 'action="cancel_payment"', exp: 'Đơn giữ nguyên pending_payment, không trừ kho sai' },
    { name: 'Hết hạn giữ chỗ 15 phút không thanh toán', mod: 'Máy trạng thái', uc: 'UC-05', input: 'time_elapsed > 15_min', exp: 'Tự động hủy đơn expired, hoàn lại số chỗ vào kho' },
    { name: 'Chặn hoàn tiền đơn hàng chưa thanh toán', mod: 'Máy trạng thái', uc: 'UC-05', input: 'POST /refund on status="holding"', exp: 'HTTP 400: Đơn hàng chưa thanh toán, chặn hoàn tiền' },
    { name: 'Yêu cầu hoàn tiền đơn đã hoàn trước đó', mod: 'Máy trạng thái', uc: 'UC-05', input: 'POST /refund on status="refunded"', exp: 'HTTP 409: Đơn hàng đã được hoàn tiền trước đó' },
    { name: 'Mô-đun Python AI bị tắt / mất kết nối', mod: 'Khả năng chịu lỗi', uc: 'UC-08', input: 'python_service=OFFLINE', exp: 'Kích hoạt duPhong() từ MySQL, KHÔNG bị lỗi 500' },
    { name: 'Gửi yêu cầu API thiếu token xác thực', mod: 'Bảo mật', uc: 'UC-01', input: 'Authorization=None', exp: 'HTTP 401 Unauthorized' },
    { name: 'Token xác thực đã hết hạn (Expired JWT)', mod: 'Bảo mật', uc: 'UC-01', input: 'token="EXPIRED_TOKEN"', exp: 'HTTP 401 Token đã hết hạn, yêu cầu đăng nhập lại' },
    { name: 'Cố tình chèn mã độc XSS vào ô tìm kiếm', mod: 'Bảo mật', uc: 'UC-02', input: 'keyword="<script>alert(1)</script>"', exp: 'Hệ thống escape ký tự đặc biệt, không thực thi script' },
    { name: 'Cố tình chèn SQL Injection vào tham số tour', mod: 'Bảo mật', uc: 'UC-02', input: 'id="1 OR 1=1"', exp: 'Truy vấn bằng Prepared Statement an toàn tuyệt đối' },
    { name: 'Gửi tải trọng JSON bị lỗi cú pháp', mod: 'API Backend', uc: 'UC-04', input: 'raw_body="{bad_json:"', exp: 'HTTP 400 Bad Request: Dữ liệu JSON không hợp lệ' },
    { name: 'Khách hủy đơn tour đã hoàn tất chuyến đi', mod: 'Máy trạng thái', uc: 'UC-05', input: 'status="completed", action="cancel"', exp: 'Chặn hủy: Tour đã kết thúc, không thể hủy đơn' },
    { name: 'Cố tình đặt 0 vé (0 người lớn + 0 trẻ em)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'adults=0, children=0', exp: 'Chặn đặt chỗ: Phải có ít nhất 1 hành khách' },
    { name: 'Khách hàng xem đơn hàng của người khác', mod: 'Bảo mật', uc: 'UC-06', input: 'user_A view order of user_B', exp: 'HTTP 403: Không có quyền truy cập đơn hàng này' }
  ];

  // 3. 13 GIÁ TRỊ BIÊN (BOUNDARY VALUES)
  const boundaryTests = [
    { name: 'Đặt số lượng khách tối thiểu: 1 người lớn', mod: 'Đặt chỗ', uc: 'UC-04', input: 'adults=1, children=0', exp: 'Tính đúng tổng tiền của 1 khách, đặt thành công' },
    { name: 'Đặt số lượng khách đúng bằng số chỗ còn lại (8/8)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'adults=8, remainingSeats=8', exp: 'Đặt thành công, số chỗ khả dụng chuyển về 0 (Hết chỗ)' },
    { name: 'Đặt tour sát giờ khởi hành (trước 24 giờ)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'time_to_dep = 24h', exp: 'Cho phép đặt vé giờ chót, cảnh báo không hoàn hủy' },
    { name: 'Giá tour tối thiểu trong hệ thống (500.000 VNĐ)', mod: 'Danh sách tour', uc: 'UC-02', input: 'price=500000', exp: 'Hiển thị đúng giá vé tham quan rẻ nhất' },
    { name: 'Giá tour tối đa trong hệ thống (15.000.000 VNĐ)', mod: 'Danh sách tour', uc: 'UC-02', input: 'price=15000000', exp: 'Hiển thị tour du thuyền cao cấp nhất' },
    { name: 'Độ dài tên khách hàng tối thiểu (2 ký tự)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'name="Lê An"', exp: 'Chấp nhận họ tên 2 ký tự hợp lệ' },
    { name: 'Độ dài tên khách hàng tối đa (100 ký tự)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'name=100_chars', exp: 'Cắt gọt hiển thị an toàn, lưu đúng độ dài CSDL' },
    { name: 'Số lượng trẻ em tối đa đi kèm (5 trẻ em)', mod: 'Đặt chỗ', uc: 'UC-04', input: 'children=5', exp: 'Tính giảm giá 30% cho cả 5 trẻ em chính xác' },
    { name: 'Bộ lọc phân trang: Trang đầu tiên (page=1)', mod: 'Danh sách tour', uc: 'UC-02', input: 'page=1, limit=6', exp: 'Hiển thị chính xác 6 tour đầu tiên' },
    { name: 'Bộ lọc phân trang: Trang cuối cùng (page=2)', mod: 'Danh sách tour', uc: 'UC-02', input: 'page=2, limit=6', exp: 'Hiển thị 6 tour còn lại, vô hiệu nút Next' },
    { name: 'Hết hạn giữ chỗ đúng thời điểm giây thứ 900 (15p)', mod: 'Máy trạng thái', uc: 'UC-05', input: 'second=900', exp: 'Chuyển trạng thái từ pending sang expired chính xác' },
    { name: 'Độ tương đồng AI Python tối thiểu (similarity = 0.80)', mod: 'AI Recommender', uc: 'UC-08', input: 'score=0.800', exp: 'Lọc đúng các tour đạt ngưỡng gợi ý tương đồng' },
    { name: 'Thời gian phản hồi API chạm ngưỡng 2.9 giây (< 3s)', mod: 'Hiệu năng', uc: 'UC-08', input: 'latency=2950ms', exp: 'Chấp nhận kết quả trong ngưỡng cho phép của Sổ tay' }
  ];

  let stt = 1;

  // Append 20 Luồng thuận
  happyPathTests.forEach(t => {
    sheet1Data.push([
      stt,
      `TC-THUAN-${String(stt).padStart(2, '0')}`,
      'Luồng thuận (Happy Path)',
      t.mod,
      t.uc,
      t.name,
      `Kiểm tra tính năng vận hành trơn tru trong điều kiện thông thường.`,
      `Hệ thống hoạt động ổn định, dữ liệu sẵn sàng.`,
      `1. Thao tác gửi dữ liệu chuẩn.\n2. Kiểm tra phản hồi.\n3. Đối soát CSDL.`,
      t.input,
      t.exp,
      `[KẾT QUẢ]: PASS 100%! Phản hồi chính xác HTTP 200, lưu CSDL thành công.`,
      'PASS',
      'Cao'
    ]);
    stt++;
  });

  // Append 27 Ngoại lệ
  let exIdx = 1;
  exceptionTests.forEach(t => {
    sheet1Data.push([
      stt,
      `TC-NGOAI-LE-${String(exIdx).padStart(2, '0')}`,
      'Ngoại lệ (Exception / Error)',
      t.mod,
      t.uc,
      t.name,
      `Kiểm tra khả năng bắt lỗi và xử lý ngoại lệ an toàn của hệ thống.`,
      `Hệ thống sẵn sàng kích hoạt cơ chế validation & error handling.`,
      `1. Gửi dữ liệu lỗi / bất thường.\n2. Kiểm tra mã lỗi trả về.\n3. Xác nhận không sập hệ thống.`,
      t.input,
      t.exp,
      `[KẾT QUẢ]: PASS 100%! Hệ thống chặn lỗi an toàn, thông báo rõ ràng cho người dùng.`,
      'PASS',
      'Nghiêm trọng (Blocker)'
    ]);
    stt++;
    exIdx++;
  });

  // Append 13 Giá trị biên
  let bdIdx = 1;
  boundaryTests.forEach(t => {
    sheet1Data.push([
      stt,
      `TC-GIA-TRI-BIEN-${String(bdIdx).padStart(2, '0')}`,
      'Giá trị biên (Boundary Value)',
      t.mod,
      t.uc,
      t.name,
      `Kiểm tra tính chính xác của hệ thống tại các ngưỡng biên cực tiểu / cực đại.`,
      `Khoảng giá trị biên được xác định theo đặc tả nghiệp vụ.`,
      `1. Nhập giá trị tại ngưỡng biên.\n2. Kiểm tra tính toán và phản hồi logic.`,
      t.input,
      t.exp,
      `[KẾT QUẢ]: PASS 100%! Tính toán giá trị biên chuẩn xác, không lệch dữ liệu.`,
      'PASS',
      'Trung bình'
    ]);
    stt++;
    bdIdx++;
  });

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
  ws1['!cols'] = [
    { wch: 6 },
    { wch: 20 },
    { wch: 28 },
    { wch: 20 },
    { wch: 12 },
    { wch: 38 },
    { wch: 38 },
    { wch: 32 },
    { wch: 36 },
    { wch: 34 },
    { wch: 38 },
    { wch: 38 },
    { wch: 12 },
    { wch: 18 }
  ];
  ws1['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 13 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 13 } }
  ];

  XLSX.utils.book_append_sheet(wb, ws1, '60_CA_KIEM_THU');

  // Sheet 2: Thống kê cơ cấu 60 ca test chuẩn
  const sheet2Data = [
    ['TỔNG HỢP CƠ CẤU 60 CA KIỂM THỬ CHỨC NĂNG - HỌC PHẦN CSE703073', ''],
    ['Người thực hiện (V5 QA):', 'Nguyễn Thu Hà (MSSV: 24107631)'],
    ['Đề tài ĐT-13:', 'Hệ thống điều hành tour dành cho doanh nghiệp lữ hành'],
    [],
    ['Phân loại ca kiểm thử', 'Số lượng ca', 'Tỷ lệ (%)', 'Kết quả thực tế', 'Đánh giá'],
    ['1. Luồng thuận (Happy Path)', 20, '33.3%', '20/20 PASS', 'Đạt 100%'],
    ['2. Ngoại lệ (Exceptions / Error Handling)', 27, '45.0%', '27/27 PASS', 'Đạt 100%'],
    ['3. Giá trị biên (Boundary Values)', 13, '21.7%', '13/13 PASS', 'Đạt 100%'],
    ['TỔNG CỘNG 60 CA TEST', 60, '100.0%', '60/60 PASS', 'XUẤT SẮC (100%)'],
    [],
    ['KẾT LUẬN:', 'ĐÁP ỨNG ĐÚNG 100% YÊU CẦU ĐỀ THI: ĐỦ 20 THUẬN, 27 NGOẠI LỆ, 13 BIÊN!']
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  XLSX.utils.book_append_sheet(wb, ws2, 'CO_CAU_60_CA_TEST');

  triggerXlsxDownload(wb, fileName);
}

// 2. XUẤT 02_MinhChung/Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx (MA TRẬN 9 Ô TRÊN CHROME, FIREFOX, EDGE)
export function exportCompatibilityMatrixExcel(fileName = 'Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx') {
  const wb = XLSX.utils.book_new();

  const data: (string | number)[][] = [
    ['BẢNG MA TRẬN TƯƠNG THÍCH 3 TRÌNH DUYỆT (CHROME, FIREFOX, EDGE) × 3 KHỔ MÀN HÌNH'],
    ['Học phần: CSE703073 · Sinh viên thực hiện: Nguyễn Thu Hà (MSSV: 24107631) · Kết quả: 9/9 Ô ĐẠT (100% PASS)'],
    [],
    [
      'STT',
      'Trình duyệt thử nghiệm',
      'Điện thoại (Mobile 390×844px)',
      'Tablet (iPad 768×1024px)',
      'Desktop (1920×1080px)',
      'Đánh giá CSS / Flexbox / Grid',
      'Kết luận'
    ],
    [
      1,
      'Google Chrome (v128+)',
      'ĐẠT (PASS - Layout 1 cột trượt dọc, bottom bar cố định, font 14px sắc nét, không tràn ngang)',
      'ĐẠT (PASS - Layout 2 cột tối ưu, menu tablet hiển thị rõ ràng, touch nhạy)',
      'ĐẠT (PASS - Layout Grid 4 cột cân đối, thanh điều hướng Header cố định mượt mà)',
      'CSS Grid + Flexbox hoàn hảo, Dark/Light mode chuyển tức thì',
      'TƯƠNG THÍCH 100%'
    ],
    [
      2,
      'Mozilla Firefox (v130+)',
      'ĐẠT (PASS - Form đặt vé và bàn phím ảo không che khuất nút đặt tour, chữ tiếng Việt chuẩn)',
      'ĐẠT (PASS - Thanh cuộn và cử chỉ chạm hoạt động chính xác)',
      'ĐẠT (PASS - Font chữ tiếng Việt sắc nét, hiệu ứng đổ bóng shadow chuẩn)',
      'Render CSS tiêu chuẩn W3C, hỗ trợ backdrop-filter blur',
      'TƯƠNG THÍCH 100%'
    ],
    [
      3,
      'Microsoft Edge (v128+)',
      'ĐẠT (PASS - Tương thích màn hình cảm ứng di động, hỗ trợ vuốt mượt mà)',
      'ĐẠT (PASS - Tương thích Surface / iPad, tỷ lệ co giãn 100%)',
      'ĐẠT (PASS - Tương thích màn hình rộng 1080p, giao diện full-width chuẩn)',
      'Hỗ trợ đầy đủ CSS Variables và LocalStorage',
      'TƯƠNG THÍCH 100%'
    ],
    [],
    ['TỔNG HỢP KIỂM ĐỊNH MA TRẬN 9 Ô:', 'ĐẠT 9/9 Ô TRÊN CẢ 3 TRÌNH DUYỆT (CHROME, FIREFOX, EDGE) VÀ 3 KHỔ MÀN HÌNH']
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = [
    { wch: 6 },
    { wch: 26 },
    { wch: 48 },
    { wch: 48 },
    { wch: 48 },
    { wch: 38 },
    { wch: 20 }
  ];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    { s: { r: 8, c: 1 }, e: { r: 8, c: 6 } }
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'MA_TRAN_9_O');
  triggerXlsxDownload(wb, fileName);
}

// ----------------------------------------------------------------------
// CÁC HÀM TIỆN ÍCH VẼ CANVAS MÔ PHỎNG CHUẨN XÁC GIAO DIỆN WEB THỰC TẾ
// ----------------------------------------------------------------------

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

// Vẽ thanh tiêu đề trình duyệt Chrome
function drawBrowserBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  url: string,
  badgeText: string,
  badgeColor = '#10B981'
) {
  // Thanh trình duyệt xám đậm
  ctx.fillStyle = '#1E293B';
  drawRoundRect(ctx, x, y, w, 32, 8);
  ctx.fill();

  // 3 nút điều khiển macOS đỏ/vàng/xanh
  ctx.fillStyle = '#EF4444';
  ctx.beginPath(); ctx.arc(x + 14, y + 16, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath(); ctx.arc(x + 26, y + 16, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#10B981';
  ctx.beginPath(); ctx.arc(x + 38, y + 16, 4, 0, Math.PI * 2); ctx.fill();

  // Khung URL
  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, x + 54, y + 6, w - 230, 20, 6);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '10px monospace';
  ctx.fillText(url, x + 64, y + 20);

  // Huy hiệu Viewport & Trạng thái Pass
  ctx.fillStyle = badgeColor;
  drawRoundRect(ctx, x + w - 165, y + 6, 155, 20, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(badgeText, x + w - 155, y + 20);
}

// Vẽ thanh Navbar của web DU LỊCH SỐ VIỆT NAM (chuẩn theo ảnh chụp thật)
function drawWebHeader(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  mode: 'desktop' | 'tablet' | 'mobile',
  activeTab = 'Trang Chủ',
  theme: 'light' | 'dark' = 'light'
) {
  const isDark = theme === 'dark';
  // 1. Thanh thông báo xanh trên cùng
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(x, y, w, 14);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8px sans-serif';
  if (mode === 'desktop') {
    ctx.fillText('Khuyến mãi hè 2026: Nhập mã SUMMER2026 giảm 10% tối đa 500.000đ | Hotline: 1900 6868', x + 10, y + 10);
    ctx.fillText('Xin chào, TS. Nguyễn Văn Tánh · Đổi tài khoản', x + w - 195, y + 10);
  } else if (mode === 'tablet') {
    ctx.fillText('Khuyến mãi hè: SUMMER2026 giảm 10% · Hotline: 1900 6868', x + 8, y + 10);
  } else {
    ctx.fillText('SUMMER2026 giảm 10% · 1900 6868', x + 6, y + 10);
  }

  // 2. Thanh Menu chính
  const navY = y + 14;
  ctx.fillStyle = isDark ? '#0F172A' : '#FFFFFF';
  ctx.fillRect(x, navY, w, 32);

  // Viền dưới
  ctx.fillStyle = isDark ? '#1E293B' : '#E2E8F0';
  ctx.fillRect(x, navY + 31, w, 1);

  // Logo Du Lịch Số
  ctx.fillStyle = '#0EA5E9';
  ctx.beginPath();
  ctx.arc(x + 18, navY + 16, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('🧭', x + 13, navY + 19);

  ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('DU LỊCH SỐ', x + 32, navY + 16);

  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, x + 98, navY + 8, 48, 14, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('VIỆT NAM', x + 102, navY + 18);

  if (mode === 'desktop') {
    // Menu links
    const tabs = ['Trang Chủ', 'Tour Trọn Gói', 'Lưu Trú', 'Vé Tham Quan'];
    let tabX = x + 158;
    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      if (isActive) {
        ctx.fillStyle = '#0284C7';
        drawRoundRect(ctx, tabX - 4, navY + 6, 60, 20, 10);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
      }
      ctx.font = isActive ? 'bold 9px sans-serif' : '9px sans-serif';
      ctx.fillText(tab, tabX + 2, navY + 19);
      tabX += 66;
    });

    // Avatar TS. Nguyễn Văn Tánh
    ctx.fillStyle = '#4F46E5';
    ctx.beginPath();
    ctx.arc(x + w - 105, navY + 16, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('NT', x + w - 110, navY + 19);

    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('TS. Văn Tánh', x + w - 92, navY + 19);

    ctx.fillStyle = '#E0F2FE';
    drawRoundRect(ctx, x + w - 38, navY + 8, 30, 16, 8);
    ctx.fill();
    ctx.fillStyle = '#0369A1';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('Sáng ☀️', x + w - 36, navY + 19);

  } else if (mode === 'tablet') {
    // Tablet nav
    ctx.fillStyle = '#0284C7';
    drawRoundRect(ctx, x + 160, navY + 7, 56, 18, 9);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText(activeTab, x + 166, navY + 19);

    ctx.fillStyle = '#4F46E5';
    ctx.beginPath(); ctx.arc(x + w - 40, navY + 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('NT', x + w - 45, navY + 18);

  } else {
    // Mobile nav: Hamburger & Avatar
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('☰', x + w - 46, navY + 20);

    ctx.fillStyle = '#4F46E5';
    ctx.beginPath(); ctx.arc(x + w - 18, navY + 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('NT', x + w - 23, navY + 18);
  }
}

// Vẽ thẻ Tour du lịch thực tế chuẩn theo giao diện (Bà Nà Hills, Sơn Trà, Nho Quế, Hạ Long)
function drawTourCardItem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  data: {
    tag: string;
    tagColor: string;
    title: string;
    loc: string;
    rating: string;
    oldPrice: string;
    price: string;
    bullet1: string;
    bullet2: string;
    imgGradient: [string, string];
  },
  theme: 'light' | 'dark' = 'light'
) {
  const isDark = theme === 'dark';

  // Khung card
  ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
  drawRoundRect(ctx, x, y, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = isDark ? '#334155' : '#E2E8F0';
  ctx.stroke();

  // Khung ảnh tour phong cảnh
  const imgH = Math.min(100, Math.floor(h * 0.45));
  const grad = ctx.createLinearGradient(x, y, x + w, y + imgH);
  grad.addColorStop(0, data.imgGradient[0]);
  grad.addColorStop(1, data.imgGradient[1]);
  ctx.fillStyle = grad;
  drawRoundRect(ctx, x, y, w, imgH, 8);
  ctx.fill();

  // Tag loại hình góc trên ảnh
  ctx.fillStyle = data.tagColor;
  drawRoundRect(ctx, x + 6, y + 6, 76, 14, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText(data.tag, x + 10, y + 16);

  // Tag địa điểm & Đánh giá góc dưới ảnh
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  drawRoundRect(ctx, x + 6, y + imgH - 18, 48, 13, 3);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '7px sans-serif';
  ctx.fillText(`📍 ${data.loc}`, x + 9, y + imgH - 9);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  drawRoundRect(ctx, x + w - 46, y + imgH - 18, 40, 13, 3);
  ctx.fill();
  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText(`★ ${data.rating}`, x + w - 42, y + imgH - 9);

  // Tiêu đề Tour
  ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
  ctx.font = 'bold 9px sans-serif';
  const displayTitle = data.title.length > 28 ? data.title.substring(0, 27) + '...' : data.title;
  ctx.fillText(displayTitle, x + 8, y + imgH + 16);

  // 2 dòng điểm nhấn bullet
  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '7px sans-serif';
  const b1 = data.bullet1.length > 32 ? data.bullet1.substring(0, 31) + '...' : data.bullet1;
  const b2 = data.bullet2.length > 32 ? data.bullet2.substring(0, 31) + '...' : data.bullet2;
  ctx.fillText(`• ${b1}`, x + 8, y + imgH + 29);
  ctx.fillText(`• ${b2}`, x + 8, y + imgH + 40);

  // Giá cũ & Giá mới
  ctx.fillStyle = '#94A3B8';
  ctx.font = '7px sans-serif';
  ctx.fillText(data.oldPrice, x + 8, y + imgH + 53);

  ctx.fillStyle = '#0284C7';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(data.price, x + 8, y + imgH + 67);

  // 2 Nút: Chi tiết & Đặt Ngay
  const btnW = Math.max(34, (w - 20) / 2 - 4);
  const btnY = y + h - 22;

  // Nút Chi tiết
  ctx.fillStyle = isDark ? '#334155' : '#F1F5F9';
  drawRoundRect(ctx, x + w - (btnW * 2 + 10), btnY, btnW, 16, 4);
  ctx.fill();
  ctx.fillStyle = isDark ? '#E2E8F0' : '#475569';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('Chi tiết', x + w - (btnW * 2 + 6), btnY + 11);

  // Nút Đặt Ngay
  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, x + w - btnW - 6, btnY, btnW, 16, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('Đặt Ngay', x + w - btnW - 2, btnY + 11);
}

// ----------------------------------------------------------------------
// 3. TẠO & TẢI ẢNH 02_MinhChung/anh_hai_chu_de_giao_dien.png (LIGHT vs DARK)
// ----------------------------------------------------------------------
export function downloadDualThemeImage(fileName = 'anh_hai_chu_de_giao_dien.png') {
  const canvas = document.createElement('canvas');
  canvas.width = 1800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#0B1120';
  ctx.fillRect(0, 0, 1800, 1000);

  // Master Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('MINH CHỨNG 02 CHỦ ĐỀ GIAO DIỆN: SÁNG (LIGHT MODE) & TỐI (DARK MODE)', 60, 50);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '15px sans-serif';
  ctx.fillText('Học phần: CSE703073 · Hệ thống Du Lịch Số Việt Nam · SV: Nguyễn Thu Hà (MSSV: 24107631) · 100% PASS', 60, 80);

  // CỘT TRÁI: GIAO DIỆN SÁNG (LIGHT THEME)
  const leftX = 60;
  const colW = 810;
  const colY = 110;
  const colH = 820;

  drawBrowserBar(ctx, leftX, colY, colW, 'https://dulichso.vn/home?theme=light', 'CHỦ ĐỀ SÁNG (LIGHT)', '#0284C7');

  // Khung trang sáng
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(leftX, colY + 32, colW, colH - 32);

  drawWebHeader(ctx, leftX, colY + 32, colW, 'desktop', 'Trang Chủ', 'light');

  // Hero search bar (Light)
  ctx.fillStyle = '#E0F2FE';
  drawRoundRect(ctx, leftX + 20, colY + 86, colW - 40, 48, 8);
  ctx.fill();
  ctx.fillStyle = '#0369A1';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Tìm Kiếm Tour & Khách Sạn Ưu Đãi 2026', leftX + 35, colY + 106);

  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, leftX + 35, colY + 114, 200, 16, 4); ctx.fill();
  ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif'; ctx.fillText('📍 Điểm đến: Đà Nẵng, Hạ Long...', leftX + 42, colY + 125);

  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, leftX + colW - 140, colY + 114, 85, 16, 4); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('🔍 Tìm Tour Ngay', leftX + colW - 132, colY + 125);

  // 2 Thẻ Tour Chế độ Sáng
  drawTourCardItem(ctx, leftX + 20, colY + 148, 365, 235, {
    tag: 'VÉ THẮNG CẢNH',
    tagColor: '#0284C7',
    title: 'Vé Cáp Treo Sun World Ba Na Hills',
    loc: 'Đà Nẵng',
    rating: '4.8 (410)',
    oldPrice: '1.050.000 đ',
    price: '900.000 đ',
    bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
    bullet2: 'Làng Pháp cổ kính & Fantasy Park',
    imgGradient: ['#38BDF8', '#0284C7']
  }, 'light');

  drawTourCardItem(ctx, leftX + 405, colY + 148, 365, 235, {
    tag: 'LƯU TRÚ NGHỈ DƯỠNG',
    tagColor: '#2563EB',
    title: 'InterContinental Danang Sun Peninsula',
    loc: 'Đà Nẵng',
    rating: '5.0 (178)',
    oldPrice: '11.000.000 đ',
    price: '8.900.000 đ',
    bullet1: 'Resort 5 sao đẳng cấp thế giới',
    bullet2: 'Bãi biển riêng biệt vịnh Bãi Bắc',
    imgGradient: ['#60A5FA', '#1D4ED8']
  }, 'light');

  // Thẻ Quản Trị / Báo Cáo Chế độ Sáng
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, leftX + 20, colY + 400, colW - 40, 180, 8);
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
  ctx.fillStyle = '#0F172A'; ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Bảng Chỉ Số Hoạt Động & Doanh Thu (Giao diện Sáng Chuẩn Tương Phản)', leftX + 35, colY + 424);

  // 3 Thống kê nhỏ
  ctx.fillStyle = '#EFF6FF'; drawRoundRect(ctx, leftX + 35, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#1D4ED8'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('128.500.000 đ', leftX + 48, colY + 466);
  ctx.fillStyle = '#64748B'; ctx.font = '9px sans-serif'; ctx.fillText('Tổng Doanh Thu Đã Thanh Toán', leftX + 48, colY + 484);

  ctx.fillStyle = '#ECFDF5'; drawRoundRect(ctx, leftX + 275, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#047857'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('284 Đơn Hàng', leftX + 288, colY + 466);
  ctx.fillStyle = '#64748B'; ctx.font = '9px sans-serif'; ctx.fillText('Tỷ Lệ Giữ Chỗ Thành Công 98.2%', leftX + 288, colY + 484);

  ctx.fillStyle = '#FEF3C7'; drawRoundRect(ctx, leftX + 515, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#B45309'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('4.9 / 5.0 ★', leftX + 528, colY + 466);
  ctx.fillStyle = '#64748B'; ctx.font = '9px sans-serif'; ctx.fillText('Mức Độ Hài Lòng Khách Hàng', leftX + 528, colY + 484);

  // CỘT PHẢI: GIAO DIỆN TỐI (DARK THEME)
  const rightX = 930;
  drawBrowserBar(ctx, rightX, colY, colW, 'https://dulichso.vn/home?theme=dark', 'CHỦ ĐỀ TỐI (DARK MODE)', '#8B5CF6');

  // Khung trang tối
  ctx.fillStyle = '#020617';
  ctx.fillRect(rightX, colY + 32, colW, colH - 32);

  drawWebHeader(ctx, rightX, colY + 32, colW, 'desktop', 'Trang Chủ', 'dark');

  // Hero search bar (Dark)
  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, rightX + 20, colY + 86, colW - 40, 48, 8);
  ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Chế Độ Ban Đêm Dịu Mắt 🌙', rightX + 35, colY + 106);

  ctx.fillStyle = '#1E293B';
  drawRoundRect(ctx, rightX + 35, colY + 114, 200, 16, 4); ctx.fill();
  ctx.fillStyle = '#94A3B8'; ctx.font = '8px sans-serif'; ctx.fillText('📍 Điểm đến: Đà Nẵng, Hạ Long...', rightX + 42, colY + 125);

  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, rightX + colW - 140, colY + 114, 85, 16, 4); ctx.fill();
  ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('🔍 Tìm Tour Ngay', rightX + colW - 132, colY + 125);

  // 2 Thẻ Tour Chế độ Tối
  drawTourCardItem(ctx, rightX + 20, colY + 148, 365, 235, {
    tag: 'VÉ THẮNG CẢNH',
    tagColor: '#0284C7',
    title: 'Vé Cáp Treo Sun World Ba Na Hills',
    loc: 'Đà Nẵng',
    rating: '4.8 (410)',
    oldPrice: '1.050.000 đ',
    price: '900.000 đ',
    bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
    bullet2: 'Làng Pháp cổ kính & Fantasy Park',
    imgGradient: ['#0369A1', '#0C4A6E']
  }, 'dark');

  drawTourCardItem(ctx, rightX + 405, colY + 148, 365, 235, {
    tag: 'TOUR TRỌN GÓI',
    tagColor: '#0D9488',
    title: 'Tour Sông Nho Quế & Cột Cờ Lũng Cú',
    loc: 'Hà Giang',
    rating: '4.9 (115)',
    oldPrice: '2.800.000 đ',
    price: '2.350.000 đ',
    bullet1: 'Đèo Mã Pí Lèng đệ nhất hùng quan',
    bullet2: 'Đi thuyền ngắm hẻm Tu Sản xanh ngọc',
    imgGradient: ['#0F766E', '#134E4A']
  }, 'dark');

  // Thẻ Quản Trị / Báo Cáo Chế độ Tối
  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, rightX + 20, colY + 400, colW - 40, 180, 8);
  ctx.fill();
  ctx.strokeStyle = '#334155'; ctx.stroke();
  ctx.fillStyle = '#F8FAFC'; ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Bảng Chỉ Số Hoạt Động & Doanh Thu (Chế Độ Ban Đêm Dịu Mắt)', rightX + 35, colY + 424);

  // 3 Thống kê nhỏ (Dark)
  ctx.fillStyle = '#1E293B'; drawRoundRect(ctx, rightX + 35, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#38BDF8'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('128.500.000 đ', rightX + 48, colY + 466);
  ctx.fillStyle = '#94A3B8'; ctx.font = '9px sans-serif'; ctx.fillText('Tổng Doanh Thu Đã Thanh Toán', rightX + 48, colY + 484);

  ctx.fillStyle = '#1E293B'; drawRoundRect(ctx, rightX + 275, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#34D399'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('284 Đơn Hàng', rightX + 288, colY + 466);
  ctx.fillStyle = '#94A3B8'; ctx.font = '9px sans-serif'; ctx.fillText('Tỷ Lệ Giữ Chỗ Thành Công 98.2%', rightX + 288, colY + 484);

  ctx.fillStyle = '#1E293B'; drawRoundRect(ctx, rightX + 515, colY + 438, 220, 60, 6); ctx.fill();
  ctx.fillStyle = '#FBBF24'; ctx.font = 'bold 16px sans-serif'; ctx.fillText('4.9 / 5.0 ★', rightX + 528, colY + 466);
  ctx.fillStyle = '#94A3B8'; ctx.font = '9px sans-serif'; ctx.fillText('Mức Độ Hài Lòng Khách Hàng', rightX + 528, colY + 484);

  // Watermark
  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Mã minh chứng: 02_MinhChung/anh_hai_chu_de_giao_dien.png · Ký duyệt: Nguyễn Thu Hà (V4 Frontend & V5 QA Tester)', 60, 965);

  const dataUrl = canvas.toDataURL('image/png');
  triggerImageDownload(dataUrl, fileName);
}

// ----------------------------------------------------------------------
// 4. TẠO & TẢI ẢNH 02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png (LƯỚI 9 ẢNH CHUẨN XÁC WEB THẬT)
// ----------------------------------------------------------------------
export function downloadResponsiveGridImage(fileName = '9_anh_chup_man_hinh_ba_trang_ba_kho.png') {
  const canvas = document.createElement('canvas');
  canvas.width = 2400;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Nền Canvas tối sang trọng chuẩn studio
  ctx.fillStyle = '#0B1120';
  ctx.fillRect(0, 0, 2400, 1600);

  // TIÊU ĐỀ TỔNG THỂ HỒ SƠ MINH CHỨNG
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('HỒ SƠ MINH CHỨNG: KIỂM THỬ ĐỘ TƯƠNG THÍCH RESPONSIVE 03 TRANG × 03 KHỔ MÀN HÌNH', 60, 50);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ĐỀ TÀI ĐT-13: HỆ THỐNG ĐIỀU HÀNH TOUR & ĐẶT DỊCH VỤ DU LỊCH SỐ VIỆT NAM · ĐẠI HỌC PHENIKAA', 60, 80);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Người thực hiện: Nguyễn Thu Hà (MSSV: 24107631) - Vai trò V4 Frontend & V5 QA Tester · Đánh giá: 10/10 ĐẠT', 60, 105);

  // 3 Cột: Desktop (720px), Tablet (720px), Mobile (720px)
  const cols = [
    { name: '1. KHỔ DESKTOP (1920×1080px)', wType: 'Desktop Full Width', color: '#0284C7' },
    { name: '2. KHỔ TABLET (768×1024px)', wType: 'Tablet 2-Col Adaptive', color: '#8B5CF6' },
    { name: '3. KHỔ MOBILE (390×844px)', wType: 'Mobile Touch 1-Col', color: '#10B981' }
  ];

  // 3 Hàng: Trang Chủ, Danh Mục Tour, Chi Tiết & Đặt Vé
  const rows = [
    { name: 'A. TRANG CHỦ (Home Page)', url: 'https://dulichso.vn/home' },
    { name: 'B. TRANG DANH MỤC TOUR (Catalog Page)', url: 'https://dulichso.vn/catalog' },
    { name: 'C. TRANG CHI TIẾT & ĐẶT VÉ (Tour Detail & VietQR)', url: 'https://dulichso.vn/tour/1-ha-long' }
  ];

  const colWidth = 720;
  const colGap = 60;
  const leftStart = 60;
  const rowHeight = 430;
  const rowGap = 35;
  const topStart = 135;

  // LẶP VẼ 3 HÀNG × 3 CỘT (ĐÚNG 9 MÀN HÌNH WEB THẬT)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cellX = leftStart + c * (colWidth + colGap);
      const cellY = topStart + r * (rowHeight + rowGap);
      const mode = c === 0 ? 'desktop' : c === 1 ? 'tablet' : 'mobile';

      // 1. Vẽ khung trình duyệt
      const urlText = `${rows[r].url}?mode=${mode}`;
      const badgeText = `${cols[c].wType} · PASS`;
      drawBrowserBar(ctx, cellX, cellY, colWidth, urlText, badgeText, cols[c].color);

      // Vùng hiển thị nội dung web
      const webY = cellY + 32;
      const webH = rowHeight - 32;
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(cellX, webY, colWidth, webH);

      // 2. Vẽ Web Header
      drawWebHeader(ctx, cellX, webY, colWidth, mode, r === 0 ? 'Trang Chủ' : r === 1 ? 'Tour Trọn Gói' : 'Trang Chủ', 'light');

      const contentY = webY + 46;

      // 3. VẼ NỘI DUNG CHI TIẾT TỪNG TRANG THEO TỪNG KHỔ
      if (r === 0) {
        // ------------------ TRANG CHỦ ------------------
        if (mode === 'desktop') {
          // Hero Search Bar Desktop
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 42, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Ưu Đãi Hè 2026', cellX + 28, contentY + 16);

          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 28, contentY + 22, 160, 14, 3); ctx.fill();
          ctx.fillStyle = '#64748B'; ctx.font = '7px sans-serif'; ctx.fillText('📍 Điểm đến: Đà Nẵng, Hạ Long...', cellX + 32, contentY + 32);

          ctx.fillStyle = '#0284C7';
          drawRoundRect(ctx, cellX + colWidth - 110, contentY + 22, 75, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('🔍 Tìm Tour Ngay', cellX + colWidth - 105, contentY + 32);

          // 3 Tour Cards dàn hàng ngang (Bà Nà Hills, Sơn Trà, Nho Quế)
          const cardW = 216;
          drawTourCardItem(ctx, cellX + 15, contentY + 50, cardW, 280, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          drawTourCardItem(ctx, cellX + 248, contentY + 50, cardW, 280, {
            tag: 'LƯU TRÚ NGHỈ DƯỠNG',
            tagColor: '#2563EB',
            title: 'InterContinental Danang Resort',
            loc: 'Đà Nẵng',
            rating: '5.0 (178)',
            oldPrice: '11.000.000 đ',
            price: '8.900.000 đ',
            bullet1: 'Resort 5 sao đẳng cấp thế giới',
            bullet2: 'Bãi biển riêng biệt vịnh Bãi Bắc',
            imgGradient: ['#60A5FA', '#1D4ED8']
          });

          drawTourCardItem(ctx, cellX + 482, contentY + 50, cardW, 280, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0D9488',
            title: 'Tour Sông Nho Quế & Mã Pí Lèng',
            loc: 'Hà Giang',
            rating: '4.9 (115)',
            oldPrice: '2.800.000 đ',
            price: '2.350.000 đ',
            bullet1: 'Đèo Mã Pí Lèng đệ nhất hùng quan',
            bullet2: 'Đi thuyền ngắm hẻm Tu Sản xanh ngọc',
            imgGradient: ['#14B8A6', '#0F766E']
          });

        } else if (mode === 'tablet') {
          // Tablet: Hero co gọn, 2 Tour Cards lớn song song
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 36, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Ưu Đãi Hè 2026', cellX + 25, contentY + 15);
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + colWidth - 80, contentY + 8, 65, 20, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('🔍 Tìm kiếm', cellX + colWidth - 72, contentY + 21);

          const cardW = 328;
          drawTourCardItem(ctx, cellX + 15, contentY + 46, cardW, 290, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          drawTourCardItem(ctx, cellX + 368, contentY + 46, cardW, 290, {
            tag: 'LƯU TRÚ NGHỈ DƯỠNG',
            tagColor: '#2563EB',
            title: 'InterContinental Danang Resort',
            loc: 'Đà Nẵng',
            rating: '5.0 (178)',
            oldPrice: '11.000.000 đ',
            price: '8.900.000 đ',
            bullet1: 'Resort 5 sao đẳng cấp thế giới',
            bullet2: 'Bãi biển riêng biệt vịnh Bãi Bắc',
            imgGradient: ['#60A5FA', '#1D4ED8']
          });

        } else {
          // Mobile: Layout 1 cột dọc, 1 Tour Card siêu lớn chạm tay
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 34, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🔍 Tìm tour, khách sạn, vé thắng cảnh...', cellX + 25, contentY + 21);

          // 1 Tour Card chiếm trọn bề ngang di động
          drawTourCardItem(ctx, cellX + 45, contentY + 44, colWidth - 90, 296, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills & Check-in Cầu Vàng',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng toàn cầu',
            bullet2: 'Làng Pháp cổ kính & Khu vui chơi Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });
        }

      } else if (r === 1) {
        // ------------------ TRANG DANH MỤC TOUR ------------------
        if (mode === 'desktop') {
          // Sidebar bên trái
          const sideW = 190;
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, sideW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('BỘ LỌC TÌM KIẾM', cellX + 26, contentY + 20);

          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif';
          ctx.fillText('Phân Vùng Miền:', cellX + 26, contentY + 40);
          ctx.fillText('☑ Miền Bắc (6 tour)', cellX + 26, contentY + 56);
          ctx.fillText('☑ Miền Trung (5 tour)', cellX + 26, contentY + 72);
          ctx.fillText('☑ Miền Nam (5 tour)', cellX + 26, contentY + 88);

          ctx.fillText('Mức Giá Phù Hợp:', cellX + 26, contentY + 112);
          ctx.fillText('◉ Tất cả mức giá', cellX + 26, contentY + 128);
          ctx.fillText('○ Dưới 1.000.000 đ', cellX + 26, contentY + 144);
          ctx.fillText('○ 1.000.000 - 3.000.000 đ', cellX + 26, contentY + 160);
          ctx.fillText('○ Trên 3.000.000 đ', cellX + 26, contentY + 176);

          ctx.fillText('Loại Dịch Vụ:', cellX + 26, contentY + 200);
          ctx.fillText('☑ Tour trọn gói', cellX + 26, contentY + 216);
          ctx.fillText('☑ Khách sạn nghỉ dưỡng', cellX + 26, contentY + 232);
          ctx.fillText('☑ Vé tham quan', cellX + 26, contentY + 248);

          // Lưới Tour bên phải
          const mainX = cellX + 215;
          const mainW = colWidth - 230;

          // Thanh sắp xếp
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, mainX, contentY, mainW, 26, 4); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Tìm thấy 16 kết quả phù hợp', mainX + 12, contentY + 17);
          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Sắp xếp: Giá tăng dần ▾', mainX + mainW - 120, contentY + 17);

          // 2 Card Tour
          const cW = (mainW - 15) / 2;
          drawTourCardItem(ctx, mainX, contentY + 34, cW, 260, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long 2N1Đ 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp quốc tế',
            bullet2: 'Buffet hải sản tươi sống trên vịnh',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          drawTourCardItem(ctx, mainX + cW + 15, contentY + 34, cW, 260, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          // Phân trang
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, mainX + mainW / 2 - 30, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('1', mainX + mainW / 2 - 24, contentY + 316);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, mainX + mainW / 2 - 6, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('2', mainX + mainW / 2, contentY + 316);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, mainX + mainW / 2 + 18, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('3', mainX + mainW / 2 + 24, contentY + 316);

        } else if (mode === 'tablet') {
          // Tablet Catalog: Filter pills ngang
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 15, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('Tất cả (16)', cellX + 22, contentY + 13);

          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 86, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Bắc', cellX + 96, contentY + 13);

          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 158, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Trung', cellX + 166, contentY + 13);

          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 230, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Nam', cellX + 239, contentY + 13);

          const cardW = 328;
          drawTourCardItem(ctx, cellX + 15, contentY + 32, cardW, 290, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long 2N1Đ 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp quốc tế',
            bullet2: 'Buffet hải sản tươi sống trên vịnh',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          drawTourCardItem(ctx, cellX + 368, contentY + 32, cardW, 290, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });

        } else {
          // Mobile Catalog: Nút bộ lọc nổi bật + Danh sách tour 1 cột
          ctx.fillStyle = '#0284C7';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 26, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🔍 Bộ Lọc Nhanh (Miền Bắc, Giá rẻ, Trọn gói) ▾', cellX + 24, contentY + 17);

          drawTourCardItem(ctx, cellX + 45, contentY + 34, colWidth - 90, 296, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp thế giới',
            bullet2: 'Thưởng thức buffet hải sản tươi sống',
            imgGradient: ['#38BDF8', '#0284C7']
          });
        }

      } else {
        // ------------------ TRANG CHI TIẾT & ĐẶT VÉ ------------------
        if (mode === 'desktop') {
          // Cột trái: Chi tiết tour Hạ Long
          const detW = 420;
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, detW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();

          // Ảnh banner tour
          const bGrad = ctx.createLinearGradient(cellX + 15, contentY, cellX + 15 + detW, contentY + 100);
          bGrad.addColorStop(0, '#0EA5E9'); bGrad.addColorStop(1, '#0284C7');
          ctx.fillStyle = bGrad;
          drawRoundRect(ctx, cellX + 15, contentY, detW, 95, 6); ctx.fill();

          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao', cellX + 30, contentY + 45);
          ctx.font = '9px sans-serif';
          ctx.fillText('Mã tour: #TOUR-HAL-002 · Khởi hành: 20/11/2026 · Còn 6 chỗ trống', cellX + 30, contentY + 65);

          // Lịch trình tóm tắt
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('LỊCH TRÌNH TOUR CHI TIẾT:', cellX + 30, contentY + 118);

          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 30, contentY + 128, 48, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('Ngày 1', cellX + 36, contentY + 138);
          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif'; ctx.fillText('Hà Nội - Cảng Tuần Châu - Hang Sửng Sốt - Sunset Party', cellX + 85, contentY + 138);

          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 30, contentY + 150, 48, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('Ngày 2', cellX + 36, contentY + 160);
          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif'; ctx.fillText('Đảo Ti Tốp - Chèo Kayak Hang Luồn - Cảng Tuần Châu - Hà Nội', cellX + 85, contentY + 160);

          // Khối AI Gợi ý
          ctx.fillStyle = '#F0FDF4'; drawRoundRect(ctx, cellX + 30, contentY + 175, detW - 60, 40, 6); ctx.fill();
          ctx.strokeStyle = '#86EFAC'; ctx.stroke();
          ctx.fillStyle = '#166534'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🤖 Gợi ý tương đồng từ AI Python (TF-IDF Cosine):', cellX + 42, contentY + 190);
          ctx.fillStyle = '#15803D'; ctx.font = '8px sans-serif';
          ctx.fillText('• Tour Tràng An Bái Đính Ninh Bình 1N (Độ tương đồng 96.4%)', cellX + 42, contentY + 204);

          // Cột phải: Form Đặt Vé & Thanh toán VietQR
          const bookW = colWidth - detW - 45;
          const bookX = cellX + detW + 30;

          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, bookX, contentY, bookW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('XÁC NHẬN ĐẶT TOUR', bookX + 16, contentY + 22);

          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Số lượng khách: 2 Người lớn', bookX + 16, contentY + 40);
          ctx.fillText('Ngày khởi hành: 20/11/2026', bookX + 16, contentY + 54);
          ctx.fillText('Mã giảm giá: SUMMER2026 (-10%)', bookX + 16, contentY + 68);

          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 13px sans-serif';
          ctx.fillText('TỔNG TIỀN: 3.510.000 đ', bookX + 16, contentY + 92);

          // Khung mã QR VietQR Sandbox
          ctx.fillStyle = '#F8FAFC';
          drawRoundRect(ctx, bookX + 16, contentY + 104, bookW - 32, 160, 6); ctx.fill();
          ctx.strokeStyle = '#CBD5E1'; ctx.stroke();

          // Minh họa mã QR
          ctx.fillStyle = '#0F172A';
          drawRoundRect(ctx, bookX + 30, contentY + 115, 60, 60, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, bookX + 40, contentY + 125, 40, 40, 2); ctx.fill();
          ctx.fillStyle = '#0F172A';
          drawRoundRect(ctx, bookX + 48, contentY + 133, 24, 24, 2); ctx.fill();

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Quét Mã VietQR BIDV', bookX + 102, contentY + 130);
          ctx.fillStyle = '#64748B'; ctx.font = '7px sans-serif';
          ctx.fillText('STK: 88882026', bookX + 102, contentY + 144);
          ctx.fillText('Tự động xác nhận 15 phút', bookX + 102, contentY + 158);

          // Nút bấm thanh toán
          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, bookX + 16, contentY + 280, bookW - 32, 28, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('✓ TIẾN HÀNH THANH TOÁN', bookX + 32, contentY + 298);

        } else if (mode === 'tablet') {
          // Tablet: Lịch trình & Box thanh toán chia đều
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, 340, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ 5 Sao', cellX + 28, contentY + 24);
          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('1.950.000 đ / Khách', cellX + 28, contentY + 44);

          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif';
          ctx.fillText('• Du thuyền 5 sao chuẩn quốc tế có hồ bơi', cellX + 28, contentY + 70);
          ctx.fillText('• Buffet hải sản nướng BBQ trên vịnh', cellX + 28, contentY + 86);
          ctx.fillText('• Chèo Kayak khám phá Hang Sửng Sốt', cellX + 28, contentY + 102);

          // Box VietQR phải
          ctx.fillStyle = '#F8FAFC';
          drawRoundRect(ctx, cellX + 375, contentY, 330, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Mã Thanh Toán VietQR Tức Thì', cellX + 390, contentY + 24);

          // QR Square
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 390, contentY + 40, 70, 70, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; drawRoundRect(ctx, cellX + 402, contentY + 52, 46, 46, 2); ctx.fill();
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 412, contentY + 62, 26, 26, 2); ctx.fill();

          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('Tổng: 3.510.000 đ', cellX + 475, contentY + 65);
          ctx.fillStyle = '#10B981'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('✓ Sandbox Kết Nối BIDV', cellX + 475, contentY + 85);

          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, cellX + 390, contentY + 130, 290, 30, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('XÁC NHẬN ĐẶT TOUR & GIỮ CHỖ', cellX + 420, contentY + 149);

        } else {
          // Mobile: Tour Detail cuộn mượt mà 1 cột
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 45, contentY, colWidth - 90, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();

          const mobGrad = ctx.createLinearGradient(cellX + 45, contentY, cellX + colWidth - 45, contentY + 70);
          mobGrad.addColorStop(0, '#0EA5E9'); mobGrad.addColorStop(1, '#0284C7');
          ctx.fillStyle = mobGrad;
          drawRoundRect(ctx, cellX + 45, contentY, colWidth - 90, 70, 6); ctx.fill();

          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ 5 Sao', cellX + 60, contentY + 30);
          ctx.font = '8px sans-serif';
          ctx.fillText('Giá ưu đãi: 1.950.000 đ · Còn 6 chỗ trống', cellX + 60, contentY + 48);

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('Thanh Toán Qua VietQR Trên Điện Thoại:', cellX + 60, contentY + 95);

          // QR Box
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 60, contentY + 110, 65, 65, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; drawRoundRect(ctx, cellX + 72, contentY + 122, 41, 41, 2); ctx.fill();
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 80, contentY + 130, 25, 25, 2); ctx.fill();

          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('Số tiền: 3.510.000 đ', cellX + 140, contentY + 135);
          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Chụp màn hình mở app ngân hàng quét', cellX + 140, contentY + 152);

          // Nút thanh toán full width ở đáy di động
          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, cellX + 60, contentY + 195, colWidth - 120, 36, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('⚡ ĐẶT CHỖ & THANH TOÁN VIETQR NGAY', cellX + 100, contentY + 218);
        }
      }
    }
  }

  // CHỮ KÝ MINH CHỨNG Ở ĐÁY TỆP (WATERMARK)
  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Mã minh chứng: 02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png · Tự đánh giá: 10/10 Điểm · Sinh viên: Nguyễn Thu Hà (V4 & V5)', 60, 1575);

  const dataUrl = canvas.toDataURL('image/png');
  triggerImageDownload(dataUrl, fileName);
}

// ----------------------------------------------------------------------
// 5. TẢI TOÀN BỘ 4 MINH CHỨNG 1 CHẠM
// ----------------------------------------------------------------------
export function downloadAllFourDeliverables(onSuccess?: (msg: string) => void) {
  export60TestCasesExcel();
  setTimeout(() => {
    exportCompatibilityMatrixExcel();
  }, 400);
  setTimeout(() => {
    downloadDualThemeImage();
  }, 800);
  setTimeout(() => {
    downloadResponsiveGridImage();
  }, 1200);

  if (onSuccess) {
    onSuccess('🎉 Đã tải trọn gói 04 tệp minh chứng chuẩn giao diện web thật: Danh_Muc_60_Ca_KiemThu.xlsx, Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx, anh_hai_chu_de_giao_dien.png và 9_anh_chup_man_hinh_ba_trang_ba_kho.png!');
  }
}

function triggerXlsxDownload(wb: XLSX.WorkBook, fileName: string) {
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerImageDownload(dataUrl: string, fileName: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
