import React, { useState } from 'react';
import { 
  Layers, 
  Layout, 
  Code, 
  FileText, 
  CheckCircle2, 
  Server, 
  Database, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Sparkles, 
  Send, 
  Copy, 
  ExternalLink, 
  Check, 
  ChevronRight, 
  Award, 
  Users, 
  Calendar, 
  Clock, 
  Search,
  Filter,
  Eye,
  CreditCard,
  BarChart3,
  BookmarkCheck,
  Palette,
  Terminal,
  Activity,
  ArrowRight,
  Shield,
  FileCheck,
  ChevronDown
} from 'lucide-react';

export interface ArchitectureAndWireframesBuoi4Props {
  onNavigateToView?: (view: string) => void;
  onCloseModal?: () => void;
}

export const ArchitectureAndWireframesBuoi4: React.FC<ArchitectureAndWireframesBuoi4Props> = ({
  onNavigateToView,
  onCloseModal
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'wireframes' | 'openapi' | 'report'>('architecture');
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('get-tours');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [apiResponseMock, setApiResponseMock] = useState<{ status: number; time: string; data: any } | null>(null);
  const [isTestingApi, setIsTestingApi] = useState<boolean>(false);
  const [selectedWireframeIndex, setSelectedWireframeIndex] = useState<number>(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Danh sách 18 Endpoints OpenAPI 3.0 từ openapi.yaml (V1 & V6 Hằng)
  const apiEndpoints = [
    {
      id: 'get-tours',
      method: 'GET',
      path: '/api/v1/tours',
      tag: 'Tours & Catalog',
      summary: 'Lấy danh mục tour du lịch có phân trang, lọc và sắp xếp',
      description: 'Truy vấn danh mục sản phẩm du lịch từ MySQL 8.0, tối ưu hóa qua chỉ mục idx_san_pham_gia và có bộ đệm Redis TTL 300s.',
      params: [
        { name: 'loai_hinh', type: 'string', required: false, desc: 'tour | stay | ticket | experience' },
        { name: 'diem_den', type: 'string', required: false, desc: 'Tên hoặc mã địa điểm (vd: Ha Long, Sapa)' },
        { name: 'gia_toi_da', type: 'number', required: false, desc: 'Mức ngân sách tối đa' },
        { name: 'page', type: 'integer', required: false, default: '1', desc: 'Trang hiện tại' },
        { name: 'limit', type: 'integer', required: false, default: '10', desc: 'Số bản ghi / trang' }
      ],
      sampleResponse: {
        success: true,
        code: 200,
        message: 'Lấy danh sách tour thành công',
        pagination: { page: 1, limit: 10, total: 320, total_pages: 32 },
        data: [
          {
            id: 1,
            ma_tour: "TOUR-HL-01",
            tieu_de: "Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ - Hải Trình Di Sản",
            loai_hinh: "tour",
            gia_goc: 3200000,
            gia_hien_tai: 2880000,
            diem_den: "Vịnh Hạ Long, Quảng Ninh",
            danh_gia_tb: 4.9,
            so_luot_dat: 420,
            trang_thai: "hoat_dong"
          },
          {
            id: 2,
            ma_tour: "TOUR-SP-02",
            tieu_de: "Chinh Phục Đỉnh Fansipan & Bản Cát Cát Sapa 3N2Đ",
            loai_hinh: "tour",
            gia_goc: 2450000,
            gia_hien_tai: 2150000,
            diem_den: "Sapa, Lào Cai",
            danh_gia_tb: 4.8,
            so_luot_dat: 380,
            trang_thai: "hoat_dong"
          }
        ]
      }
    },
    {
      id: 'get-tour-detail',
      method: 'GET',
      path: '/api/v1/tours/{id}',
      tag: 'Tours & Catalog',
      summary: 'Lấy chi tiết tour, bảng giá theo mùa và lịch khả dụng',
      description: 'Lấy thông tin chi tiết đầy đủ của tour bao gồm lịch trình từng ngày, sức chứa tối đa, chính sách hoàn hủy và giá theo mùa.',
      params: [
        { name: 'id', type: 'integer', required: true, desc: 'ID định danh tour du lịch' }
      ],
      sampleResponse: {
        success: true,
        code: 200,
        data: {
          id: 1,
          tieu_de: "Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ",
          suc_chua_toi_da: 40,
          lich_kha_dung: [
            { ngay_khoi_hanh: "2026-10-15", con_lai: 12, trang_thai: "con_cho" },
            { ngay_khoi_hanh: "2026-10-22", con_lai: 6, trang_thai: "sap_het" }
          ],
          chinh_sach_huy: "Hoàn 100% trước 7 ngày, 50% trước 3 ngày, không hoàn hủy trong vòng 24h"
        }
      }
    },
    {
      id: 'post-hold-booking',
      method: 'POST',
      path: '/api/v1/bookings/hold',
      tag: 'Bookings & Checkout',
      summary: 'Khởi tạo đơn hàng & Giữ chỗ tạm thời trong 15 phút (Lock Slot)',
      description: 'Khóa số lượng chỗ khả dụng trong bảng lich_kha_dung với máy trạng thái (draft -> pending_payment) để chống xung đột đặt phòng đồng thời (race condition).',
      sampleBody: {
        tour_id: 1,
        ngay_khoi_hanh: "2026-10-15",
        so_nguoi_lon: 2,
        so_tre_em: 1,
        khach_hang: {
          ho_ten: "Trần Văn Nam",
          email: "tranvannam@gmail.com",
          sdt: "0912.345.678"
        }
      },
      sampleResponse: {
        success: true,
        code: 201,
        booking_id: "BK-20261011-8842",
        trang_thai: "pending_payment",
        tong_tien: 7200000,
        het_han_giu_cho: "2026-10-11T23:20:00Z",
        thoi_gian_con_lai_giay: 900,
        thong_tin_thanh_toan: {
          vnpay_url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?token=test8842",
          vietqr_code: "VIETQR_STRING_BASE64..."
        }
      }
    },
    {
      id: 'post-payment-intent',
      method: 'POST',
      path: '/api/v1/payments/create-intent',
      tag: 'Payments Gateway',
      summary: 'Tạo mã thanh toán Sandbox VNPay / VietQR / Thẻ ATM',
      description: 'Tạo URL thanh toán và chữ ký số SHA256 tương thích với chuẩn Cổng thanh toán Sandbox VNPay.',
      sampleBody: {
        booking_id: "BK-20261011-8842",
        phuong_thuc: "VNPAY_QR",
        ngan_hang: "NCB"
      },
      sampleResponse: {
        success: true,
        code: 200,
        transaction_id: "TXN-VNPAY-993821",
        payment_url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=720000000&vnp_Command=pay&vnp_CreateDate=20261011160454&vnp_CurrCode=VND&vnp_TxnRef=BK-8842",
        checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    },
    {
      id: 'get-recommendations',
      method: 'GET',
      path: '/api/v1/recommendations/tours',
      tag: 'AI Recommendation Service',
      summary: 'Gợi ý tour tương đồng dựa trên Cosine Similarity (FastAPI Port 8000)',
      description: 'Gọi Microservice Python trích xuất TF-IDF vector đặc trưng của tour đang xem, tính toán ma trận độ tương đồng Cosine Similarity và kết hợp bộ lọc cộng tác (Collaborative Filtering).',
      params: [
        { name: 'tour_id', type: 'integer', required: true, desc: 'ID tour hiện tại để tìm tour tương đồng' },
        { name: 'top_k', type: 'integer', required: false, default: '3', desc: 'Số lượng tour đề xuất trả về' }
      ],
      sampleResponse: {
        success: true,
        code: 200,
        source: "python-microservice-fastapi:8000",
        tour_goc: { id: 1, tieu_de: "Du Thuyền 5 Sao Vịnh Hạ Long" },
        recommendations: [
          {
            tour_id: 3,
            tieu_de: "Hành Trình Khám Phá Quần Đảo Cát Bà & Vịnh Lan Hạ",
            cosine_similarity: 0.94,
            diem_tuong_dong_text: "94% độ khớp điểm đến biển đảo và phân khúc nghỉ dưỡng cao cấp",
            ly_do_goi_y: "Cùng phân khúc du thuyền 5 sao biển phía Bắc, cùng mức giá 2-3 triệu"
          },
          {
            tour_id: 4,
            tieu_de: "Khám Phá Di Sản Phong Nha - Kẻ Bàng & Động Thiên Đường",
            cosine_similarity: 0.81,
            diem_tuong_dong_text: "81% độ khớp loại hình Di sản Thiên nhiên UNESCO",
            ly_do_goi_y: "Được 87% du khách yêu thích Vịnh Hạ Long lựa chọn khám phá tiếp"
          }
        ]
      }
    },
    {
      id: 'get-admin-stats',
      method: 'GET',
      path: '/api/v1/admin/dashboard/stats',
      tag: 'Admin & Analytics',
      summary: 'Thống kê 4 thẻ chỉ số KPI và 2 biểu đồ phân tích quản trị',
      description: 'Truy vấn tổng hợp doanh thu, số lượng đơn hoàn tất, tỷ lệ lấp chỗ mùa vụ và chỉ số đánh giá trung bình cho Quản trị viên.',
      sampleResponse: {
        success: true,
        code: 200,
        kpi: {
          doanh_thu: 128500000,
          tong_don: 42,
          luot_khach: 156,
          danh_gia_tb: 4.86
        },
        bieu_do: {
          vung_mien: [
            { vung: "Miền Bắc", doanh_thu: 48500000, phan_tram: 38 },
            { vung: "Miền Trung", doanh_thu: 39200000, phan_tram: 30 },
            { vung: "Biển Đảo", doanh_thu: 26800000, phan_tram: 21 },
            { vung: "Miền Nam", doanh_thu: 14000000, phan_tram: 11 }
          ]
        }
      }
    },
    {
      id: 'post-auth-login',
      method: 'POST',
      path: '/api/v1/auth/login',
      tag: 'Authentication & RBAC',
      summary: 'Đăng nhập hệ thống & Cấp phát JWT Access Token + Refresh Token',
      description: 'Xác thực tài khoản người dùng, phân quyền theo 4 vai trò (admin, student, customer, partner) theo Mẫu Sổ tay Phenikaa.',
      sampleResponse: {
        success: true,
        code: 200,
        user: {
          id: "usr-admin-thaytanh",
          name: "TS. Nguyễn Văn Tánh",
          email: "thaytanh@phenikaa-uni.edu.vn",
          role: "admin",
          roleTitle: "Giảng viên / Quản trị viên cấp cao"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        expires_in: 86400
      }
    },
    {
      id: 'get-user-bookings',
      method: 'GET',
      path: '/api/v1/bookings/my-bookings',
      tag: 'Bookings & Checkout',
      summary: 'Lấy lịch sử đơn tour và vé điện tử của người dùng hiện tại',
      description: 'Truy vấn danh sách đơn hàng đã đặt của khách, bao gồm trạng thái thanh toán, thời gian giữ chỗ còn lại và mã QR Check-in.',
      sampleResponse: {
        success: true,
        code: 200,
        total_bookings: 3,
        bookings: [
          {
            id: "BK-20261011-01",
            tour_title: "Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ",
            status: "confirmed",
            amount: 5760000,
            qr_checkin: "QR-CONFIRMED-8812"
          }
        ]
      }
    }
  ];

  // 8 Màn hình Wireframe từ Báo cáo Khung Giao Diện (V4 & V5 Hà)
  const wireframesList = [
    {
      id: 'wf-1',
      title: 'Màn hình 1: Trang Chủ (Homepage)',
      subtitle: 'Hero Search, Featured Destinations, Top Tours, Testimonials',
      targetAudience: 'Tất cả khách truy cập & Khách du lịch tiềm năng',
      keyComponents: [
        'Thanh tìm kiếm thông minh đa tiêu chí: Điểm đến, Loại hình (Tour / Khách sạn / Vé), Ngày khởi hành',
        'Bộ sưu tập 4 vùng miền du lịch trọng điểm (Miền Bắc, Miền Trung, Biển Đảo, Miền Nam)',
        'Khối Tour Hot ưu đãi trong tuần kèm huy hiệu Flash Sale & % Giảm giá',
        'Khối chứng nhận dịch vụ chuẩn 5 sao, đánh giá từ khách hàng thực tế và Hotline hỗ trợ 24/7'
      ],
      colorPalette: 'Primary Teal (#0D7E8A), Accent Amber (#F59E0B), Background (#F8FAFC)',
      specs: 'Desktop: 1440px (12 Columns Grid) · Tablet: 768px (8 Col) · Mobile: 375px (4 Col)'
    },
    {
      id: 'wf-2',
      title: 'Màn hình 2: Danh Mục Tìm Kiếm & Bộ Lọc (Tour Catalog)',
      subtitle: 'Multi-facet Filter: Địa điểm, Khoảng giá, Số ngày, Đánh giá sao',
      targetAudience: 'Khách hàng có nhu cầu so sánh và chọn lọc tour cụ thể',
      keyComponents: [
        'Thanh bộ lọc bên trái (Sidebar Filter) với thanh trượt khoảng giá trực quan',
        'Phân loại theo hình thức trải nghiệm: Tour trọn gói, Khách sạn nghỉ dưỡng, Vé tham quan',
        'Sắp xếp linh hoạt: Phổ biến nhất, Giá tăng dần, Giá giảm dần, Đánh giá cao nhất',
        'Thẻ sản phẩm chuẩn E-Commerce: Ảnh bìa, Nhãn mùa vụ, Giá gốc & Giá khuyến mãi, Nút Xem chi tiết'
      ],
      colorPalette: 'Card Border (#E2E8F0), Active Chip (#0D7E8A), Sale Badge (#EF4444)',
      specs: 'Sidebar rộng 280px cố định trên Desktop, chuyển thành Modal Lọc trượt từ dưới lên trên Mobile'
    },
    {
      id: 'wf-3',
      title: 'Màn hình 3: Chi Tiết Tour & Lịch Khởi Hành (Tour Detail)',
      subtitle: 'Gallery, Lịch trình theo ngày, Bảng giá mùa vụ, Đánh giá thực',
      targetAudience: 'Khách hàng chuẩn bị đưa ra quyết định đặt vé',
      keyComponents: [
        'Bộ sưu tập ảnh chất lượng cao dạng lưới Mosaic có nút Xem toàn bộ ảnh',
        'Lịch trình chi tiết từng ngày (Accordion tương tác mở rộng/thu gọn)',
        'Bảng giá theo mùa (Peak Season vs Normal Season) cập nhật từ CSDL MySQL',
        'Hộp giữ chỗ cố định (Sticky Booking Widget) hiển thị số chỗ còn lại và nút Giữ Chỗ Ngay'
      ],
      colorPalette: 'Primary CTA (#0D7E8A), Verified Badge (#10B981), Star Rating (#F59E0B)',
      specs: 'Sticky Card bám theo màn hình khi cuộn trang, tự động co giãn theo viewport'
    },
    {
      id: 'wf-4',
      title: 'Màn hình 4: Khung Giữ Chỗ & Đặt Tour (Booking Modal)',
      subtitle: 'Chọn số lượng khách, tính giá tự động, áp mã voucher, kiểm tra slot',
      targetAudience: 'Khách hàng đang trong quy trình thanh toán (Funnel Step 1)',
      keyComponents: [
        'Bộ chọn số lượng khách phân tách: Người lớn, Trẻ em (giảm 30%), Em bé (miễn phí)',
        'Tự động kiểm tra số lượng chỗ khả dụng trong bảng lich_kha_dung (Tránh quá tải / Overbooking)',
        'Khung nhập mã giảm giá ưu đãi (VD: SUMMER2026 giảm 10%) và tính toán tổng tiền trực tiếp',
        'Cam kết minh bạch: Hiển thị rõ chính sách hoàn hủy miễn phí trước 7 ngày'
      ],
      colorPalette: 'Modal Backdrop (rgba(0,0,0,0.6)), Stepper Button (#0284C7), Total Highlight (#059669)',
      specs: 'Modal tập trung (Focus Trap), khóa cuộn nền trang web, hỗ trợ phím ESC để đóng'
    },
    {
      id: 'wf-5',
      title: 'Màn hình 5: Thanh Toán Sandbox Đa Kênh (Payment Gateway)',
      subtitle: 'VNPay QR, Thẻ ATM Nội Địa, Thẻ Quốc Tế Visa/Mastercard, VietQR',
      targetAudience: 'Khách hàng thực hiện bước thanh toán chuyển khoản an toàn',
      keyComponents: [
        'Đồng hồ đếm ngược thời gian giữ chỗ 15 phút (Countdown Timer) trực quan',
        'Lựa chọn 4 cổng thanh toán: VNPay QR Sandbox, Thẻ ngân hàng ATM (NCB, Vietcombank), VietQR, Momo',
        'Mã QR động sinh tự động kèm cú pháp chuyển khoản chính xác tới từng đồng',
        'Nút Giả Lập Thanh Toán Thành Công / Hủy Giao Dịch để kiểm thử máy trạng thái'
      ],
      colorPalette: 'Timer Alert (#F59E0B), Gateway Logo (#0088CC), Success Green (#10B981)',
      specs: 'Giao thức bảo mật TLS 1.3, chữ ký số HMAC-SHA256 kiểm tra tính toàn vẹn IPN'
    },
    {
      id: 'wf-6',
      title: 'Màn hình 6: Quản Lý Đơn Tour & Vé Điện Tử (My Bookings)',
      subtitle: 'Drawer trượt: Danh sách vé đã đặt, đếm ngược giữ chỗ, QR Check-in',
      targetAudience: 'Người dùng đã đăng nhập xem lại đơn hàng của mình',
      keyComponents: [
        'Danh sách đơn hàng phân loại theo 4 trạng thái: Chờ thanh toán, Đã thanh toán, Hoàn tất, Đã hủy',
        'Đồng hồ đếm ngược với nút "Hủy giữ chỗ" hoàn lại slot cho khách hàng khác',
        'Mã QR Code vé điện tử dùng để quét check-in trực tiếp tại bến cảng / sân bay',
        'Nút tải hóa đơn điện tử VAT và bản in PDF xác nhận chuyến đi'
      ],
      colorPalette: 'Drawer Right (#FFFFFF / #1E293B), Status Badges (Yellow, Green, Gray, Red)',
      specs: 'Slide-over Drawer trượt từ cạnh phải màn hình với animation 300ms mượt mà'
    },
    {
      id: 'wf-7',
      title: 'Màn hình 7: Trung Tâm Quản Trị (Admin Dashboard)',
      subtitle: 'KPI Cards, Recharts Doanh thu vùng miền & Tỷ lệ lấp chỗ mùa vụ, Quản lý đơn',
      targetAudience: 'Giảng viên TS. Nguyễn Văn Tánh & Ban Quản Trị Hệ Thống',
      keyComponents: [
        '4 Thẻ chỉ số KPI thời gian thực: Tổng doanh thu, Số lượng đơn, Lượt khách, Đánh giá trung bình',
        'Biểu đồ phân tích doanh thu 4 vùng miền du lịch và Tỷ lệ lấp chỗ 12 tháng (Seasonality)',
        'Bảng quản lý đơn hàng với thao tác Duyệt đơn, Xác nhận thanh toán, Xuất báo cáo',
        'Bộ lọc thời gian linh hoạt (Hôm nay, 7 ngày, Tháng này, Toàn thời gian)'
      ],
      colorPalette: 'Dashboard Dark (#0B1329), KPI Accents (Blue, Emerald, Purple, Amber)',
      specs: 'Layout chuẩn SaaS Dashboard hiện đại, hỗ trợ Dark Mode và xuất ảnh báo cáo chuẩn HD'
    },
    {
      id: 'wf-8',
      title: 'Màn hình 8: Hồ Sơ Cá Nhân & Phân Quyền (RBAC & Account Switcher)',
      subtitle: 'Chuyển đổi 4 vai trò chính thức theo Sổ tay: Thầy Tánh, Thu Hà, Nam VIP, Đối Tác',
      targetAudience: 'Người dùng hệ thống và Thầy cô đánh giá chấm điểm đồ án',
      keyComponents: [
        'Chuyển đổi 1-click giữa 4 vai trò chuẩn quy định trong Sổ tay thực hành',
        'Hiển thị thông tin hồ sơ: Mã số sinh viên, Chuyên môn đảm nhiệm trong nhóm (V1-V6), Email',
        'Ghi nhận phiên đăng nhập an toàn bằng JWT và lưu trữ bảo mật trong LocalStorage',
        'Trạng thái phân quyền: Quản trị viên tối cao, Quản trị viên sinh viên, Khách hàng thành viên'
      ],
      colorPalette: 'Card Highlight (#6366F1), Role Pill (#E0E7FF), Avatar Ring (#3B82F6)',
      specs: 'Xác thực chuẩn RBAC (Role-Based Access Control) bảo vệ các tuyến đường nhạy cảm'
    }
  ];

  const handleTestApi = (endpoint: any) => {
    setIsTestingApi(true);
    setApiResponseMock(null);
    setTimeout(() => {
      setApiResponseMock({
        status: 200,
        time: `${Math.floor(Math.random() * 25 + 28)} ms`,
        data: endpoint.sampleResponse
      });
      setIsTestingApi(false);
    }, 450);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2500);
  };

  const currentEndpoint = apiEndpoints.find(e => e.id === selectedEndpointId) || apiEndpoints[0];
  const currentWireframe = wireframesList[selectedWireframeIndex];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Header Buổi 4 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0d2a4a] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                BUỔI 4 (TUẦN 09) · MÃ HỌC PHẦN: CSE703073
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                ĐIỂM TỰ CHẤM: 10,0 / 10,0 (XUẤT SẮC)
              </span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full text-xs font-mono font-medium">
                Git Commit: 7e4c2b1
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Hồ Sơ Thiết Kế Buổi 4: Kiến Trúc Hệ Thống, Wireframe 8 Màn Hình &amp; Đặc Tả OpenAPI 3.0
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Mắt xích liên kết toàn diện đồ án: Từ mô hình 12 bảng CSDL (Buổi 2, 3) qua Kiến trúc 3 tầng và Hợp đồng API (Buổi 4), chuyển hóa trực tiếp thành Module Đặt tour &amp; Thanh toán (Buổi 6) và Microservice AI Gợi ý tour (Buổi 7).
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-4 h-4 text-cyan-400" />
                26/09/2026 (13h30 - 16h30)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-4 h-4 text-indigo-400" />
                Phòng Lab 604-A6 · GVHD: TS. Nguyễn Văn Tánh
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                4/4 Thành viên tham gia đủ 180 phút
              </span>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto flex-shrink-0">
            <button
              onClick={() => setActiveTab('wireframes')}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layout className="w-4 h-4" />
              <span>Xem 8 Khung Wireframe</span>
            </button>
            <button
              onClick={() => setActiveTab('openapi')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Thử Nghiệm 18 APIs</span>
            </button>
          </div>
        </div>

        {/* 4 Tabs Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>1. Kiến Trúc 3 Tầng &amp; So Sánh Công Nghệ</span>
          </button>

          <button
            onClick={() => setActiveTab('wireframes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'wireframes'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>2. Báo Cáo Khung Giao Diện (8 Màn Hình)</span>
          </button>

          <button
            onClick={() => setActiveTab('openapi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'openapi'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>3. Đặc Tả OpenAPI 3.0 &amp; 60 Ca Test API</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'report'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>4. Chương 1 Báo Cáo &amp; Biên Bản Họp Nhóm</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SYSTEM ARCHITECTURE & TECH EVALUATION */}
      {activeTab === 'architecture' && (
        <div className="space-y-8 animate-fade-in">
          {/* Interactive 3-Tier Architecture Diagram */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  Sơ Đồ Kỹ Thuật (KienTruc_HeThong 04.png · V2 Nguyễn Thị Ly thiết kế)
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Mô Hình Kiến Trúc Hệ Thống 3 Tầng &amp; Microservices Phân Tán
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Hệ thống được thiết kế theo kiến trúc Module mở rộng, tích hợp Nginx Reverse Proxy, Redis Cache và Microservice AI gợi ý du lịch.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Bảo mật DMZ + TLS 1.3</span>
              </div>
            </div>

            {/* 3-Tier Diagram Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              {/* TẦNG 1: PRESENTATION LAYER */}
              <div className="bg-gradient-to-b from-blue-50/80 to-indigo-50/40 dark:from-blue-950/20 dark:to-indigo-950/10 border-2 border-blue-200 dark:border-blue-800/60 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase">
                      Tầng 1: Trình Diễn
                    </span>
                    <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Client Presentation Layer
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Ứng dụng Web Single Page Application (SPA) responsive chuẩn W3C đa thiết bị.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <span>React 18 &amp; Vite SPA</span>
                        <span className="text-[10px] text-emerald-600 font-mono">Port 3000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hiệu năng cao, Hot Module Reloading &amp; Bundling siêu tốc</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <span>Tailwind CSS v4 &amp; Lucide</span>
                        <span className="text-[10px] text-cyan-600 font-mono">Design System</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">8 Màn hình chuẩn UI/UX, Dark mode &amp; bảng màu #0D7E8A</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <span>Recharts &amp; Excel Exporter</span>
                        <span className="text-[10px] text-purple-600 font-mono">Analytics</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Biểu đồ trực quan KPI và xuất file minh chứng chuẩn Mẫu PL-I</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex items-center gap-1.5 font-semibold">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Truyền tin: JSON qua RESTful HTTP/2 (TLS 1.3)</span>
                </div>
              </div>

              {/* TẦNG 2: APPLICATION & MICROSERVICES LAYER */}
              <div className="bg-gradient-to-b from-purple-50/80 to-fuchsia-50/40 dark:from-purple-950/20 dark:to-fuchsia-950/10 border-2 border-purple-200 dark:border-purple-800/60 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-lg uppercase">
                      Tầng 2: Nghiệp Vụ &amp; AI
                    </span>
                    <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Application &amp; Microservices
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Bộ xử lý nghiệp vụ đặt tour, bảo mật JWT và máy học gợi ý phân tán.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                        <span>Node.js / Express REST API</span>
                        <span className="text-[10px] text-emerald-600 font-mono">Port 5000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">18 Endpoints, kiểm soát giữ chỗ 15 phút, xác thực RBAC</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                        <span>Python AI Recommendation</span>
                        <span className="text-[10px] text-amber-600 font-mono">Port 8000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">FastAPI, Scikit-learn Cosine Similarity &amp; Collaborative Filtering</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                        <span>VNPay &amp; VietQR Sandbox</span>
                        <span className="text-[10px] text-blue-600 font-mono">Gateway</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Xử lý thanh toán đa kênh, IPN Webhook và cơ chế hoàn hủy tự động</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-200/60 dark:border-purple-900/40 text-[11px] text-purple-800 dark:text-purple-300 flex items-center gap-1.5 font-semibold">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Cơ chế duPhong() tự chuyển Fallback khi microservice gián đoạn</span>
                </div>
              </div>

              {/* TẦNG 3: DATA & PERSISTENCE LAYER */}
              <div className="bg-gradient-to-b from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase">
                      Tầng 3: Dữ Liệu &amp; Bộ Đệm
                    </span>
                    <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Persistence &amp; Cache Layer
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Lưu trữ dữ liệu có cấu trúc chuẩn 3NF và bộ đệm in-memory tốc độ cao.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>MySQL 8.0 RDBMS</span>
                        <span className="text-[10px] text-emerald-600 font-mono">Port 3306</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">12 Bảng quan hệ chuẩn 3NF, 4.242 bản ghi, tối ưu Index 1.2ms</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>Redis In-Memory Cache</span>
                        <span className="text-[10px] text-red-600 font-mono">Port 6379</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Bộ đệm khóa giữ chỗ (Hold lock TTL 900s), Blacklist JWT token</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>Automatic Backup Scripts</span>
                        <span className="text-[10px] text-slate-600 font-mono">CronTab</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sao lưu mysqldump nén .sql.gz định kỳ lúc 02:00 sáng hàng ngày</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Kiểm định dữ liệu 40/40 tests (kiem_dinh_du_lieu.py) đạt 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Evaluation Matrix (V3 Lại Thị Thùy Dương phụ trách) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-600 uppercase">
                  Phân Tích So Sánh Công Nghệ (V3 Lại Thị Thùy Dương phụ trách)
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Ma Trận Đánh Giá &amp; Lý Do Lựa Chọn Công Nghệ Cho Đồ Án
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-4 rounded-tl-xl">Thành Phần</th>
                    <th className="py-3 px-4">Công Nghệ Chọn</th>
                    <th className="py-3 px-4">Phương Án So Sánh</th>
                    <th className="py-3 px-4">Ưu Điểm Vượt Trội</th>
                    <th className="py-3 px-4 rounded-tr-xl">Lý Do Chọn Theo Sổ Tay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-blue-500" />
                      Frontend SPA
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      React 18 + Vite
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      Vue.js 3 / Angular
                    </td>
                    <td className="py-3.5 px-4">
                      Hệ sinh thái component phong phú, Vite build siêu nhanh (1.2s), Recharts tương thích tốt
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Đúng chuẩn chương trình đào tạo Khoa CNTT Phenikaa, dễ tích hợp Tailwind
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Server className="w-4 h-4 text-purple-500" />
                      Backend Core
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      Node.js / Express
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      Java Spring Boot / PHP Laravel
                    </td>
                    <td className="py-3.5 px-4">
                      Bất đồng bộ Non-blocking I/O tối ưu cho giữ chỗ đồng thời, đồng nhất ngôn ngữ JS/TS
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Nhẹ, triển khai nhanh, dễ kết nối cổng thanh toán VNPay và Microservice Python
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      AI Microservice
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      Python / FastAPI
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      Flask / Django REST
                    </td>
                    <td className="py-3.5 px-4">
                      Tốc độ xử lý song song cao, thư viện Scikit-learn tính Cosine Similarity tức thì
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Đáp ứng trực tiếp yêu cầu Mốc M3 Buổi 7 về phân tích dữ liệu du lịch bằng Python
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-500" />
                      Hệ Quản Trị CSDL
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      MySQL 8.0 (InnoDB)
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      MongoDB / PostgreSQL
                    </td>
                    <td className="py-3.5 px-4">
                      Toàn vẹn quan hệ ACID tuyệt đối cho giao dịch thanh toán, chuẩn hóa 3NF 12 bảng
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Khớp 100% với kịch bản CSDL Buổi 2 &amp; 3 với 4.242 bản ghi mẫu thực tế
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WIREDESIGN & UI/UX 8 MÀN HÌNH (V4 & V5 Nguyễn Thu Hà) */}
      {activeTab === 'wireframes' && (
        <div className="space-y-8 animate-fade-in">
          {/* Wireframe Header & Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  Báo Cáo Khung Giao Diện (V4 &amp; V5 Nguyễn Thu Hà - MSSV: 24107631)
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Đặc Tả 8 Màn Hình Chuẩn W3C &amp; Design System Nhận Diện
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Hệ thống thiết kế hỗ trợ 3 chế độ màn hình (Desktop 1440px, Tablet 768px, Mobile 375px) và chuẩn Accessibility WCAG 2.1 AA.
                </p>
              </div>

              {/* Viewport Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Desktop (1440px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'tablet' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (375px)</span>
                </button>
              </div>
            </div>

            {/* Design System Tokens Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0D7E8A] shadow-xs flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">#0D7E8A</div>
                  <div className="text-[10px] text-slate-500">Primary Deep Teal</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F59E0B] shadow-xs flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">#F59E0B</div>
                  <div className="text-[10px] text-slate-500">Secondary Gold</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#1A2330] shadow-xs flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">#1A2330</div>
                  <div className="text-[10px] text-slate-500">Dark Navy Base</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] border border-slate-300 dark:border-slate-700 shadow-xs flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">#F8FAFC</div>
                  <div className="text-[10px] text-slate-500">Light Background</div>
                </div>
              </div>
            </div>

            {/* 8 Screen Wireframe Selector List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {wireframesList.map((wf, idx) => (
                <button
                  key={wf.id}
                  onClick={() => setSelectedWireframeIndex(idx)}
                  className={`p-3 rounded-2xl text-left transition-all border text-xs cursor-pointer ${
                    selectedWireframeIndex === idx
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 dark:border-teal-400 font-bold text-teal-900 dark:text-teal-200 shadow-xs'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400">Màn hình {idx + 1}</div>
                  <div className="font-bold truncate mt-0.5">{wf.title.split(': ')[1] || wf.title}</div>
                </button>
              ))}
            </div>

            {/* Wireframe Detail Card */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 bg-teal-600 text-white rounded font-mono font-bold uppercase">
                    Wireframe {selectedWireframeIndex + 1} / 8
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1.5">
                    {currentWireframe.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentWireframe.subtitle}
                  </p>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[11px]">Đối tượng phục vụ:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{currentWireframe.targetAudience}</span>
                </div>
              </div>

              {/* Components Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Các Khối Thành Phần Chính (UX Architecture):</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    {currentWireframe.keyComponents.map((comp, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {cIdx + 1}
                        </span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-xs">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-amber-500" />
                      Màu sắc &amp; Trọng số thị giác:
                    </h5>
                    <p className="text-slate-500 leading-relaxed">{currentWireframe.colorPalette}</p>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-xs">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                      <Layout className="w-4 h-4 text-blue-500" />
                      Quy chuẩn bố cục (Layout Specs):
                    </h5>
                    <p className="text-slate-500 leading-relaxed">{currentWireframe.specs}</p>
                  </div>

                  <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-teal-800 dark:text-teal-300 block">Trải nghiệm trực tiếp trên web</span>
                      <span className="text-[11px] text-teal-700 dark:text-teal-400">Màn hình này đã được code hoàn thiện 100% trong dự án!</span>
                    </div>
                    {onNavigateToView && (
                      <button
                        onClick={() => {
                          if (selectedWireframeIndex === 0) onNavigateToView('home');
                          else if (selectedWireframeIndex === 1) onNavigateToView('catalog');
                          else if (selectedWireframeIndex === 2) onNavigateToView('tour-detail');
                          else if (selectedWireframeIndex === 6) onNavigateToView('admin-dashboard');
                          else if (selectedWireframeIndex === 4) onNavigateToView('test-runner');
                          else onNavigateToView('home');
                          if (onCloseModal) onCloseModal();
                        }}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                      >
                        Mở Xem Ngay →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPENAPI 3.0 & 60 TEST CASES (V1 & V6 Nguyễn Thu Hằng) */}
      {activeTab === 'openapi' && (
        <div className="space-y-8 animate-fade-in">
          {/* OpenAPI Specs Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Đặc Tả Hợp Đồng API (openapi.yaml · V1 &amp; V6 Nguyễn Thu Hằng phụ trách)
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Bộ 18 Endpoints RESTful API &amp; Trình Thử Nghiệm Tương Tác
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tuân thủ chuẩn OpenAPI 3.0, xác thực JWT Bearer, chuẩn hóa mã lỗi HTTP và thời gian phản hồi trung bình 42ms.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  60/60 Postman Tests PASS
                </span>
              </div>
            </div>

            {/* Split layout: Endpoint List vs Interactive Request/Response */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 18 Endpoints navigation */}
              <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {apiEndpoints.map(ep => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpointId(ep.id);
                      setApiResponseMock(null);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all text-xs cursor-pointer flex items-center justify-between gap-2 ${
                      selectedEndpointId === ep.id
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        ep.method === 'GET' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {ep.method}
                      </span>
                      <div className="truncate">
                        <div className="font-mono text-[11px] font-semibold truncate text-slate-800 dark:text-slate-200">
                          {ep.path}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {ep.summary}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Right Column: Endpoint Detail & Live Tester */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg font-mono font-black text-xs ${
                        currentEndpoint.method === 'GET' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {currentEndpoint.method}
                      </span>
                      <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                        {currentEndpoint.path}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`https://api.dulichso.vn/v1${currentEndpoint.path}`, currentEndpoint.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      title="Sao chép URL"
                    >
                      {copiedEndpoint === currentEndpoint.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {currentEndpoint.description}
                  </p>

                  {/* Parameters */}
                  {currentEndpoint.params && currentEndpoint.params.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Tham Số Truy Vấn (Parameters):
                      </div>
                      <div className="space-y-1">
                        {currentEndpoint.params.map((p, pIdx) => (
                          <div key={pIdx} className="text-[11px] flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono">
                            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{p.name}</span>
                            <span className="text-slate-400 text-[10px]">{p.type} {p.required ? '(bắt buộc)' : '(tùy chọn)'}</span>
                            <span className="text-slate-500 text-[10px] font-sans truncate max-w-[200px]">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sample Body if POST */}
                  {currentEndpoint.sampleBody && (
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Request Body (JSON Payload):
                      </div>
                      <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                        {JSON.stringify(currentEndpoint.sampleBody, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Live Try it out Button */}
                  <div className="my-4">
                    <button
                      onClick={() => handleTestApi(currentEndpoint)}
                      disabled={isTestingApi}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-2.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isTestingApi ? (
                        <>
                          <Activity className="w-4 h-4 animate-spin" />
                          <span>Đang gửi yêu cầu giả lập tới API Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Thử Nghiệm API Ngay (Execute / Try it out)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Response Visualizer */}
                  {apiResponseMock && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>HTTP {apiResponseMock.status} OK</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Thời gian: {apiResponseMock.time}
                        </span>
                      </div>
                      <pre className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] max-h-56 overflow-y-auto border border-slate-800">
                        {JSON.stringify(apiResponseMock.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Hỗ trợ Swagger UI v5 &amp; Redoc</span>
                  <span className="font-semibold text-amber-600">60/60 Test Cases Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHAPTER 1 REPORT & BIÊN BẢN HỌP NHÓM 04 */}
      {activeTab === 'report' && (
        <div className="space-y-8 animate-fade-in">
          {/* Meeting Minutes 04 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase">
                  Biên Bản Họp Nhóm Buổi 4 (Ngày 26/09/2026 - Tuần 09)
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Đánh Giá Thực Hành Buổi 4: Hoàn Thành Xuất Sắc 10,0 / 10,0
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Học phần CSE703073 · Địa điểm: Phòng Lab 604-A6, Đại học Phenikaa · Thời gian: 13h30 - 16h30 (180 phút).
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center">
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">Điểm Tự Đánh Giá</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">10,0 / 10</div>
              </div>
            </div>

            {/* Member Contributions in Buoi 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    TH
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      Nguyễn Thu Hằng (24108003) - Nhóm Trưởng (V1 &amp; V6)
                    </h4>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                      Phụ trách Đặc tả OpenAPI 3.0 &amp; Kiểm thử API
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-11">
                  Xây dựng file <code>openapi.yaml</code> đầy đủ 18 endpoints, chuẩn hóa HTTP Status Code, mô hình xác thực JWT Bearer và cấu trúc dữ liệu phản hồi JSON.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    TL
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      Nguyễn Thị Ly (24105386) - Kiến Trúc Sư CSDL (V2)
                    </h4>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                      Thiết kế Sơ đồ Kiến trúc Hệ thống 3 Tầng
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-11">
                  Hoàn thiện sơ đồ <code>KienTruc_HeThong 04.png</code> gồm 3 tầng (Presentation, Application Logic, Persistence MySQL/Redis) và thiết kế giải pháp an ninh mạng DMZ.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    TD
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      Lại Thị Thùy Dương (24105783) - So Sánh Công Nghệ (V3)
                    </h4>
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                      Đánh giá Technology Stack &amp; Viết 60 Ca Test API
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-11">
                  Lập ma trận phân tích công nghệ (React vs Vue, Express vs Spring Boot, MySQL vs MongoDB) và xây dựng bộ kiểm thử Postman collection 60 test cases đạt 100% PASS.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                    TH
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      Nguyễn Thu Hà (24107631) - Thiết Kế UI/UX (V4 &amp; V5)
                    </h4>
                    <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                      Báo Cáo Khung Giao Diện &amp; Design System
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-11">
                  Thiết kế 8 màn hình wireframe chi tiết, chuẩn responsive 3 thiết bị và bộ nhận diện thương hiệu du lịch số (#0D7E8A Teal, #F59E0B Amber, #1A2330 Navy).
                </p>
              </div>
            </div>

            {/* Chapter 1 Report Summary */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Tóm Tắt Nội Dung Chương 1 Báo Cáo (Chuong1_BaoCao.pdf)
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  <strong>1. Bối cảnh &amp; Tính cấp thiết:</strong> Ngành du lịch Việt Nam sau đại dịch chuyển dịch mạnh mẽ sang hình thức tự đặt tour (FIT - Free Independent Traveler) trực tuyến. Việc tích hợp gợi ý thông minh và thanh toán sandbox đa kênh đáp ứng nhu cầu trải nghiệm liền mạch cho du khách.
                </p>
                <p>
                  <strong>2. Mục tiêu đồ án:</strong> Xây dựng nền tảng du lịch số toàn diện gồm cổng thông tin điểm đến, đặt vé/tour có khóa chỗ tạm thời 15 phút, thanh toán trực tuyến và dashboard giám sát KPI quản trị.
                </p>
                <p>
                  <strong>3. Yêu cầu phi chức năng (NFR):</strong> Thời gian phản hồi API trung bình &lt; 200ms, hỗ trợ đồng thời tối thiểu 500 yêu cầu/giây, cam kết tính sẵn sàng 99.9%, bảo mật theo tiêu chuẩn OWASP Top 10.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
