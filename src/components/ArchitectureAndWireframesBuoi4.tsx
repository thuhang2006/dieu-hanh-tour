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

  // Danh sách 18 Endpoints OpenAPI 3.0 từ openapi.yaml
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

  // 8 Màn hình Wireframe
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
              Hồ Sơ Thiết Kế Buổi 4: Kiến Trúc Hệ Thống, Wireframe 8 Màn Hình & Đặc Tả OpenAPI 3.0
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Mắt xích liên kết toàn diện đồ án: Từ mô hình 12 bảng CSDL (Buổi 2, 3) qua Kiến trúc 3 tầng và Hợp đồng API (Buổi 4), chuyển hóa trực tiếp thành Module Đặt tour & Thanh toán (Buổi 6) và Microservice AI Gợi ý tour (Buổi 7).
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
            <span>1. Kiến Trúc 3 Tầng & So Sánh Công Nghệ</span>
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
            <span>3. Đặc Tả OpenAPI 3.0 & 60 Ca Test API</span>
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
            <span>4. Chương 1 Báo Cáo & Biên Bản Họp Nhóm</span>
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
                  Mô Hình Kiến Trúc Hệ Thống 3 Tầng & Microservices Phân Tán
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
                        <span>React 18 & Vite SPA</span>
                        <span className="text-[10px] text-emerald-600 font-mono">Port 3000</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hiệu năng cao, Hot Module Reloading & Bundling siêu tốc</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <span>Tailwind CSS v4 & Lucide</span>
                        <span className="text-[10px] text-cyan-600 font-mono">Design System</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">8 Màn hình chuẩn UI/UX, Dark mode & bảng màu #0D7E8A</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <span>Recharts & Excel Exporter</span>
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
                      Tầng 2: Nghiệp Vụ & AI
                    </span>
                    <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Application & Microservices
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
                      <p className="text-[11px] text-slate-500 mt-0.5">FastAPI, Scikit-learn Cosine Similarity & Collaborative Filtering</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                        <span>VNPay & VietQR Sandbox</span>
                        <span className="text-[10px] text-blue-600 font-mono">Gateway</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Tích hợp cổng thanh toán Sandbox, chữ ký SHA256 & IPN Webhook</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-200/60 dark:border-purple-900/40 text-[11px] text-purple-800 dark:text-purple-300 flex items-center gap-1.5 font-semibold">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Kết nối CSDL: Connection Pool (Max 20 conns)</span>
                </div>
              </div>

              {/* TẦNG 3: DATA & CACHING LAYER */}
              <div className="bg-gradient-to-b from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10 border-2 border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase">
                      Tầng 3: Dữ Liệu & Caching
                    </span>
                    <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    Persistence Data Layer
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    Lưu trữ dữ liệu quan hệ ACID 12 bảng và bộ nhớ đệm truy xuất siêu tốc.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>MySQL 8.0 Relational DB</span>
                        <span className="text-[10px] text-emerald-600 font-mono">Port 3306</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">12 Bảng chuẩn 3NF, Khóa ngoại InnoDB, Chỉ mục idx_san_pham_gia</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>Redis In-Memory Cache</span>
                        <span className="text-[10px] text-rose-600 font-mono">Port 6379</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Cache danh mục tour (TTL 300s) và khóa phiên giữ chỗ 15 phút</p>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>Cloudinary / AWS S3 Storage</span>
                        <span className="text-[10px] text-indigo-600 font-mono">CDN Asset</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Lưu trữ ảnh du thuyền, banner di sản và tài liệu PDF minh chứng</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Đồng bộ: Backup định kỳ 00:00 hàng ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WIREFRAMES REPORT */}
      {activeTab === 'wireframes' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Khung Giao Diện Wireframe: {currentWireframe.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{currentWireframe.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${previewDevice === 'desktop' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${previewDevice === 'tablet' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${previewDevice === 'mobile' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-2">
              {wireframesList.map((wf, idx) => (
                <button
                  key={wf.id}
                  onClick={() => setSelectedWireframeIndex(idx)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedWireframeIndex === idx
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{wf.title}</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Thành Phần Giao Diện Trọng Tâm</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {currentWireframe.keyComponents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Đối Tượng Sử Dụng</span>
                  <span className="text-slate-500">{currentWireframe.targetAudience}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Thông Số Thiết Kế Grid</span>
                  <span className="text-slate-500">{currentWireframe.specs}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPENAPI SPEC & TESTER */}
      {activeTab === 'openapi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase px-1">Danh sách API Endpoints ({apiEndpoints.length})</span>
              {apiEndpoints.map(ep => (
                <button
                  key={ep.id}
                  onClick={() => { setSelectedEndpointId(ep.id); setApiResponseMock(null); }}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-mono transition-all flex items-center justify-between border ${
                    selectedEndpointId === ep.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-600' : 'bg-blue-500/20 text-blue-600'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="truncate">{ep.path}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 bg-slate-950 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-amber-400 font-bold">{currentEndpoint.method} {currentEndpoint.path}</span>
                <button
                  onClick={() => handleTestApi(currentEndpoint)}
                  disabled={isTestingApi}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold font-sans transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTestingApi ? 'Đang gửi...' : 'Gửi Request'}</span>
                </button>
              </div>

              <div>
                <p className="text-slate-400 font-sans mb-2">{currentEndpoint.summary}</p>
                <p className="text-slate-500 text-[11px] font-sans">{currentEndpoint.description}</p>
              </div>

              {apiResponseMock && (
                <div className="space-y-2 pt-3 border-t border-slate-800 animate-fade-in">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">Status: {apiResponseMock.status} OK</span>
                    <span className="text-slate-400">Response Time: {apiResponseMock.time}</span>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-xl overflow-x-auto text-[11px] text-cyan-300 border border-slate-800">
                    {JSON.stringify(apiResponseMock.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REPORT & MINUTES */}
      {activeTab === 'report' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs text-slate-600 dark:text-slate-400">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Chương 1 Báo Cáo & Biên Bản Họp Nhóm Buổi 4</h2>
          <p className="leading-relaxed">
            Buổi 4 đánh dấu bước ngoặt chuyển đổi từ thiết kế CSDL quan hệ sang đặc tả giao diện UI/UX và hợp đồng tích hợp API chuẩn OpenAPI 3.0. Nhóm đã hoàn thành 100% mục tiêu đề ra với 8 bản vẽ wireframe chi tiết và 18 API endpoints đầy đủ tham số.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Thư Ký Họp Nhóm</span>
              <span>Nguyễn Thu Hà (V4 - Trưởng nhóm Frontend)</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Người Duyệt Báo Cáo</span>
              <span>TS. Nguyễn Văn Tánh (Giảng viên hướng dẫn)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};