import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Award, Lock, Clock, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'admin-dashboard') => void;
  onOpenMinhChung?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMinhChung }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-10 border-b border-slate-100 dark:border-slate-800 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0088cc] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs">Bảo Hiểm Du Lịch</h5>
              <p className="text-[11px] text-slate-500">Bảo hiểm trọn gói mọi hành trình</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs">Giữ Chỗ Tức Thì</h5>
              <p className="text-[11px] text-slate-500">Khóa giữ chỗ 15 phút an tâm</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs">Thanh Toán An Toàn</h5>
              <p className="text-[11px] text-slate-500">Mã hóa chuẩn PCI-DSS 256-bit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs">Hỗ Trợ 24/7</h5>
              <p className="text-[11px] text-slate-500">Đồng hành trong suốt chuyến đi</p>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-left">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#0088cc] uppercase tracking-wider flex items-center gap-2">
              <span>DU LỊCH SỐ VIỆT NAM</span>
            </h4>
            <p className="leading-relaxed text-[11px] text-slate-600 dark:text-slate-400">
              Nền tảng thương mại điện tử và điều hành tour lữ hành trực tuyến hàng đầu Việt Nam. Tối ưu trải nghiệm đặt dịch vụ theo thời gian thực và quản lý lịch trình thông minh.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-400">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Top 10 Nền tảng Du lịch số xuất sắc 2026
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              DỊCH VỤ DU LỊCH
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Tour du lịch trọn gói trong nước</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Khách sạn &amp; Resort nghỉ dưỡng</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Vé tham quan, cáp treo &amp; công viên</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Trải nghiệm văn hóa &amp; làng nghề bản địa</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Thuê xe du lịch &amp; đưa đón sân bay</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              CHÍNH SÁCH &amp; ĐIỀU KHOẢN
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Điều khoản dịch vụ &amp; Đặt chỗ</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Chính sách hoàn tiền &amp; Hủy tour</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Chính sách bảo mật thông tin cá nhân</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Quy trình xử lý tranh chấp khiếu nại</li>
              <li className="hover:text-[#0088cc] cursor-pointer transition-colors">Bảo hiểm du lịch bắt buộc</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              LIÊN HỆ &amp; HỖ TRỢ 24/7
            </h4>
            <div className="space-y-2 text-[11px]">
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#0088cc]" />
                <span>Hotline: <strong className="text-slate-800 dark:text-slate-200 font-bold">1900 6868</strong> (Miễn cước)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0088cc]" />
                <span>Email: <strong className="text-slate-800 dark:text-slate-200">cskh@dulichso.vn</strong></span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0088cc] mt-0.5 flex-shrink-0" />
                <span>Tòa nhà Du Lịch Số, Yên Nghĩa, Hà Đông, TP. Hà Nội</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Thời gian làm việc: 08:00 - 22:00 (Thứ 2 - Chủ Nhật)
              </p>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="py-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Phương thức thanh toán chấp nhận:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                VISA
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                MasterCard
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                JCB
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-[#0088cc] font-bold text-[10px] border border-blue-200 dark:border-blue-800">
                VNPAY QR
              </span>
              <span className="px-2.5 py-1 rounded-md bg-pink-50 dark:bg-pink-950 text-pink-600 font-bold text-[10px] border border-pink-200 dark:border-pink-800">
                MoMo
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 font-bold text-[10px] border border-emerald-200 dark:border-emerald-800">
                Napas 247
              </span>
            </div>
          </div>
        </div>

        {/* Clean Professional Copyright & Academic Submission */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              © 2026 CÔNG TY CỔ PHẦN CÔNG NGHỆ &amp; DU LỊCH SỐ VIỆT NAM • Giấy phép kinh doanh lữ hành quốc tế số: 01-999/2026/TCDL-GP LHQT.
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Mã số doanh nghiệp: 0109886688 do Sở Kế hoạch và Đầu tư TP. Hà Nội cấp.
            </p>
          </div>
          {onOpenMinhChung && (
            <button
              onClick={onOpenMinhChung}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#0088cc] dark:text-sky-400 border border-sky-200 dark:border-sky-800 text-[11px] font-bold hover:bg-sky-100 transition-colors"
              title="Xem và tải ảnh 9 màn hình và hồ sơ minh chứng kiểm thử"
            >
              <span>📁 Hồ sơ minh chứng học phần (Ảnh 9 màn hình)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
