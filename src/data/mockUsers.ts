import { AppUser } from '../types/tour';

// 1. TÀI KHOẢN KHÁCH HÀNG THÀNH VIÊN (CUSTOMER)
export const CUSTOMER_USERS: AppUser[] = [
  {
    id: 'usr-khach-nam',
    name: 'Trần Văn Nam',
    role: 'customer',
    roleTitle: 'Khách Hàng Thành Viên (VIP Gold)',
    email: 'tranvannam@gmail.com',
    phone: '0988.123.456',
    avatarText: 'TN',
    avatarBg: 'bg-amber-600',
    tierBadge: '⭐ Hội Viên VIP Gold (1.250 điểm)',
    tierColor: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    description: 'Tài khoản khách hàng thành viên kiểm thử quy trình tìm kiếm, áp dụng mã voucher giảm giá, đặt chỗ và thanh toán VietQR.',
    handbookPurpose: 'Trải nghiệm tìm kiếm tour, áp mã giảm giá 10%, đặt chỗ trực tuyến và theo dõi lịch sử đơn hàng',
    password: '123456'
  },
  {
    id: 'usr-khach-thao',
    name: 'Lê Phương Thảo',
    role: 'customer',
    roleTitle: 'Khách Hàng Mới (Thành viên Silver)',
    email: 'phuongthao.le@gmail.com',
    phone: '0977.654.321',
    avatarText: 'PT',
    avatarBg: 'bg-emerald-600',
    tierBadge: '🌿 Thành Viên Silver (680 điểm)',
    tierColor: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    description: 'Khách hàng thành viên trải nghiệm đặt combo nghỉ dưỡng biển và lưu danh sách tour yêu thích.',
    handbookPurpose: 'Kiểm thử đặt tour gia đình, lưu yêu thích và hủy đơn trong thời hạn',
    password: '123456'
  }
];

// 2. TÀI KHOẢN QUẢN TRỊ & GIẢNG VIÊN (ADMINISTRATORS)
export const ADMIN_USERS: AppUser[] = [
  {
    id: 'usr-admin-thaytanh',
    name: 'TS. Nguyễn Văn Tánh',
    role: 'admin',
    roleTitle: 'Giảng Viên Hướng Dẫn / Quản Trị Cấp Cao',
    email: 'thaytanh@phenikaa-uni.edu.vn',
    phone: '024.6291.8118',
    avatarText: 'NT',
    avatarBg: 'bg-indigo-700',
    tierBadge: '🎓 Giảng Viên Hướng Dẫn',
    tierColor: 'bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    description: 'Giảng viên phụ trách học phần Lập trình ứng dụng Web trong Du lịch 2 (CSE703073). Toàn quyền kiểm thử, đánh giá chấm điểm đồ án.',
    handbookPurpose: 'Đánh giá, nghiệm thu toàn diện hệ thống điều hành tour và chấm điểm đồ án theo Sổ tay CSE703073',
    password: '123456'
  },
  {
    id: 'usr-admin-ha',
    name: 'Nguyễn Thu Hà',
    role: 'admin',
    roleTitle: 'Quản Trị Viên Sinh Viên (Nhóm 13 - V4 & V5)',
    email: 'thuha.admin@dulichso.vn',
    phone: '0912.834.921',
    avatarText: 'HA',
    avatarBg: 'bg-[#0088cc]',
    tierBadge: '⭐ Sinh Viên Thực Hiện (V4 & V5)',
    tierColor: 'bg-blue-50 text-[#0088cc] border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
    description: 'Sinh viên phụ trách Nhiệm vụ V4 (Giao diện Responsive 3 khổ, 2 chủ đề Sáng/Tối) và V5 (Kiểm thử 60 ca & Ma trận tương thích 9 ô).',
    handbookPurpose: 'Điều hành nền tảng tour, xác nhận đơn hàng, hoàn tiền theo máy trạng thái và xuất bộ minh chứng',
    password: '123456'
  },
  {
    id: 'usr-admin-hang',
    name: 'Nguyễn Thu Hằng',
    role: 'admin',
    roleTitle: 'Trưởng Nhóm Sinh Viên (Nhóm Trưởng 13)',
    email: 'thuhang.lead@dulichso.vn',
    phone: '0987.654.321',
    avatarText: 'TH',
    avatarBg: 'bg-rose-600',
    tierBadge: '👑 Trưởng Nhóm 13',
    tierColor: 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
    description: 'Trưởng nhóm phụ trách tổng thể đề tài ĐT-13, điều phối các thành viên và đóng gói bài nộp.',
    handbookPurpose: 'Theo dõi tiến độ đồ án, tổng hợp KPI doanh thu và đóng gói sản phẩm nghiệm thu',
    password: '123456'
  }
];

// 3. TÀI KHOẢN ĐỐI TÁC CUNG ỨNG DỊCH VỤ (SUPPLIER / PARTNER)
export const SUPPLIER_USERS: AppUser[] = [
  {
    id: 'usr-supplier',
    name: 'Lê Hoàng Long',
    role: 'supplier',
    roleTitle: 'Đối Tác Cung Ứng Dịch Vụ Lữ Hành',
    email: 'doitac.halongbay@dulichso.vn',
    phone: '0936.789.012',
    avatarText: 'LH',
    avatarBg: 'bg-teal-600',
    tierBadge: '🚢 Đối Tác Cung Ứng',
    tierColor: 'bg-teal-50 text-teal-700 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    description: 'Nhà cung cấp dịch vụ du thuyền vịnh Hạ Long và khách sạn lưu trú liên kết trong hệ thống.',
    handbookPurpose: 'Quản lý số chỗ còn trống (allotment), xác nhận tình trạng khởi hành và phối hợp vận hành tour',
    password: '123456'
  }
];

// TẤT CẢ TÀI KHOẢN HỆ THỐNG
export const COURSE_HANDBOOK_USERS: AppUser[] = [
  ...ADMIN_USERS,
  ...CUSTOMER_USERS,
  ...SUPPLIER_USERS
];

// Mặc định tài khoản Khách hàng để trải nghiệm duyệt và đặt tour tự nhiên:
export const DEFAULT_CUSTOMER_USER = CUSTOMER_USERS[0]; // Trần Văn Nam (VIP Gold)
export const DEFAULT_ADMIN_USER = ADMIN_USERS[1]; // Nguyễn Thu Hà (V4 & V5)
export const THAY_TANH_USER = ADMIN_USERS[0]; // TS. Nguyễn Văn Tánh (Giảng viên hướng dẫn)
export const DEFAULT_USER = DEFAULT_CUSTOMER_USER;

// 4 VAI TRÒ CHUẨN QUY ĐỊNH THEO SỔ TAY THỰC HÀNH CSE703073 (ĐỀ TÀI ĐT-13)
export const OFFICIAL_HANDBOOK_ROLES: AppUser[] = [
  THAY_TANH_USER, // 1. Giảng viên hướng dẫn / Quản trị cấp cao (TS. Nguyễn Văn Tánh)
  DEFAULT_ADMIN_USER, // 2. Quản trị viên sinh viên phụ trách V4-V5 (Nguyễn Thu Hà)
  DEFAULT_CUSTOMER_USER, // 3. Khách hàng thành viên VIP Gold (Trần Văn Nam)
  SUPPLIER_USERS[0] // 4. Đối tác cung ứng dịch vụ lữ hành (Lê Hoàng Long)
];
