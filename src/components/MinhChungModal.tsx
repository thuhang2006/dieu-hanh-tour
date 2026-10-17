import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Monitor, 
  Smartphone, 
  Tablet, 
  FileSpreadsheet, 
  Image as ImageIcon,
  Sparkles,
  Eye
} from 'lucide-react';

interface MinhChungModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MinhChungModal: React.FC<MinhChungModalProps> = ({ isOpen, onClose }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (fileName: string, url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadNotice(`Đã tải xuống: ${fileName}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/70 text-[#0088cc] flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Hồ Sơ Minh Chứng: 9_anh_chup_man_hinh_ba_trang_ba_kho.png
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                  PASS 100%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lưới 09 màn hình web thật (3 trang: Home, Catalog, Tour Detail × 3 khổ: Desktop, Tablet, Mobile)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Toast */}
        {downloadNotice && (
          <div className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-100 dark:border-emerald-800 flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Action Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10 border border-sky-200 dark:border-sky-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0088cc]" />
                Tệp Minh Chứng Chuẩn Nộp Bài Buổi 08
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Độ phân giải siêu nét 2400×1600px, đầy đủ nhãn URL, thông số kích thước và trạng thái PASS kiểm thử.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/9_anh_chup_man_hinh_ba_trang_ba_kho.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-sky-500" />
                Mở Ảnh Tab Mới
              </a>
              <button
                onClick={() => handleDownload('9_anh_chup_man_hinh_ba_trang_ba_kho.png', '/9_anh_chup_man_hinh_ba_trang_ba_kho.png')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0088cc] hover:bg-sky-600 transition-colors shadow-md shadow-sky-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Tải Ảnh .PNG Về Máy
              </button>
            </div>
          </div>

          {/* Full Image Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Xem trực tiếp ảnh thực tế của web:</span>
              <span className="text-[11px] text-slate-400">2400 × 1600 px · 400 KB</span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 p-2 shadow-inner group relative">
              <img
                src="/9_anh_chup_man_hinh_ba_trang_ba_kho.png"
                alt="9 Ảnh Chụp Màn Hình Ba Trang Ba Khổ"
                className="w-full h-auto rounded-xl object-contain max-h-[480px] mx-auto transition-transform group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => handleDownload('9_anh_chup_man_hinh_ba_trang_ba_kho.png', '/9_anh_chup_man_hinh_ba_trang_ba_kho.png')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-slate-900 shadow-lg backdrop-blur flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#0088cc]" />
                  Tải ảnh này
                </button>
              </div>
            </div>
          </div>

          {/* Structure Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/60">
              <div className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 mb-1.5">
                <Monitor className="w-4 h-4 text-sky-600" />
                <span>Cột 1: Khổ Desktop (1920×1080)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Hiển thị toàn màn hình, thanh Header cố định, lưới 3-4 cột thẻ Tour, form đặt vé chia đôi 2 cột rõ ràng.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60">
              <div className="flex items-center gap-2 font-bold text-purple-800 dark:text-purple-300 mb-1.5">
                <Tablet className="w-4 h-4 text-purple-600" />
                <span>Cột 2: Khổ Tablet (768×1024)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Layout thích ứng 2 cột đối xứng, thanh điều hướng co gọn, giao diện chạm mượt mà chuẩn iPad/Android Tablet.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Cột 3: Khổ Mobile (390×844)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Layout 1 cột dọc thân thiện một tay chạm, nút đặt tour và mã VietQR full-width, thanh menu ẩn dạng drawer.
              </p>
            </div>
          </div>

          {/* Other 3 Deliverables Available for 1-Click Download */}
          <div className="pt-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-3">
              Các Tệp Minh Chứng Nộp Bài Khác Trong Hồ Sơ (02_MinhChung/)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      anh_hai_chu_de_giao_dien.png
                    </p>
                    <p className="text-[10px] text-slate-400">Light vs Dark mode</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload('anh_hai_chu_de_giao_dien.png', '/anh_hai_chu_de_giao_dien.png')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors ml-2"
                  title="Tải ảnh 2 chủ đề"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      Danh_Muc_60_Ca_KiemThu.xlsx
                    </p>
                    <p className="text-[10px] text-slate-400">60 ca: Thuận, Lỗi, Biên</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload('Danh_Muc_60_Ca_KiemThu.xlsx', '/Danh_Muc_60_Ca_KiemThu.xlsx')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors ml-2"
                  title="Tải 60 ca test"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      Ma_Tran_Tuong_Thich_3TrinhDuyet.xlsx
                    </p>
                    <p className="text-[10px] text-slate-400">9 ô ma trận 3 trình duyệt</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload('Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx', '/Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors ml-2"
                  title="Tải ma trận 9 ô"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Học phần: CSE703073 · MSSV: 24107631 · Nguyễn Thu Hà
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
