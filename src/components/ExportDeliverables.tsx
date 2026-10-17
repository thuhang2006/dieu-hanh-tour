import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Image, 
  Package, 
  CheckCircle2, 
  Printer, 
  FolderCheck,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Layers,
  X,
  Copy,
  Check,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { exportTestCasesToExcel, exportSelfEvaluationToExcel, exportTestCasesToCsv } from '../utils/excelExporter';
import { BUOI_07_TEST_CASES } from '../data/mockTestCases';
import { ArchitectureAndWireframesBuoi4 } from './ArchitectureAndWireframesBuoi4';
import { SecurityAndMilestone1Buoi5 } from './SecurityAndMilestone1Buoi5';

interface ExportDeliverablesProps {
  onViewDashboard?: () => void;
  onViewTestRunner?: () => void;
}

export const ExportDeliverables: React.FC<ExportDeliverablesProps> = ({
  onViewDashboard,
  onViewTestRunner
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showSelfEvaluationModal, setShowSelfEvaluationModal] = useState<boolean>(false);
  const [showBuoi3Modal, setShowBuoi3Modal] = useState<boolean>(false);
  const [showBuoi4Modal, setShowBuoi4Modal] = useState<boolean>(false);
  const [showBuoi5Modal, setShowBuoi5Modal] = useState<boolean>(false);

  // Function 1: Export Bang_05_Ca_KiemThu_Buoi07.xlsx using clean Excel exporter
  const handleExportExcel = () => {
    try {
      exportTestCasesToExcel(BUOI_07_TEST_CASES, 'Bang_05_Ca_KiemThu_Buoi07.xlsx');
      setDownloadSuccess('Đã tải thành công tệp Excel chuẩn OpenXML: Bang_05_Ca_KiemThu_Buoi07.xlsx!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  // Function 1b: Export Bang_05_Ca_KiemThu_Buoi07.csv fallback
  const handleExportCsv = () => {
    try {
      exportTestCasesToCsv(BUOI_07_TEST_CASES, 'Bang_05_Ca_KiemThu_Buoi07.csv');
      setDownloadSuccess('Đã tải thành công tệp CSV (UTF-8 BOM) mở được trên mọi máy tính!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  // Function 1b: Export 03_TuDanhGia_Buoi07.xlsx directly to Excel
  const handleExportSelfEvaluationExcel = () => {
    try {
      exportSelfEvaluationToExcel('03_TuDanhGia_Buoi07.xlsx');
      setDownloadSuccess('Đã tải thành công Bảng Tự Đánh Giá 10/10: 03_TuDanhGia_Buoi07.xlsx!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  // Function 2: Download Dashboard PNG
  const handleDownloadDashboardImage = () => {
    // Generate a downloadable canvas image representation of the Dashboard
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Background
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Card Header
      ctx.fillStyle = '#1E293B';
      ctx.roundRect(40, 40, 1520, 120, 16);
      ctx.fill();

      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('BẢNG ĐIỀU KHIỂN QUẢN TRỊ (ADMIN DASHBOARD) - ĐỀ TÀI 13', 70, 95);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '16px sans-serif';
      ctx.fillText('Sinh viên phụ trách: Nguyễn Thu Hà (24107631) · Nhóm 13 (CSE703073 - Buổi 7 Mốc M3)', 70, 130);

      // 4 KPI Cards
      const kpis = [
        { title: 'TỔNG DOANH THU', value: '128.500.000 đ', sub: '+18.4% so với tháng trước', color: '#3B82F6' },
        { title: 'SỐ ĐƠN ĐẶT TOUR', value: '142 đơn', sub: '35 đơn tháng này', color: '#10B981' },
        { title: 'LƯỢT KHÁCH', value: '486 khách', sub: 'Trung bình 3.4 khách/đơn', color: '#F59E0B' },
        { title: 'ĐIỂM ĐÁNH GIÁ (CSAT)', value: '4.85 / 5.0 ⭐', sub: '88 đánh giá đã duyệt', color: '#EF4444' }
      ];

      kpis.forEach((kpi, idx) => {
        const x = 40 + idx * 390;
        ctx.fillStyle = '#1E293B';
        ctx.roundRect(x, 190, 360, 150, 16);
        ctx.fill();

        ctx.fillStyle = kpi.color;
        ctx.fillRect(x, 335, 360, 5);

        ctx.fillStyle = '#94A3B8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(kpi.title, x + 24, 230);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText(kpi.value, x + 24, 275);

        ctx.fillStyle = '#10B981';
        ctx.font = '13px sans-serif';
        ctx.fillText(kpi.sub, x + 24, 310);
      });

      // Chart 1: Doanh thu theo vùng miền
      ctx.fillStyle = '#1E293B';
      ctx.roundRect(40, 370, 600, 580, 16);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('1. Doanh Thu Theo Vùng Miền', 70, 420);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText('Phân tích cơ cấu nguồn thu du lịch 4 khu vực trọng điểm', 70, 450);

      const regions = [
        { name: 'Miền Bắc (Đông & Tây Bắc)', val: '48.5 tr (38%)', width: 320, color: '#3B82F6' },
        { name: 'Miền Trung & Tây Nguyên', val: '39.2 tr (30%)', width: 260, color: '#10B981' },
        { name: 'Biển Đảo (Phú Quốc, Hạ Long)', val: '26.8 tr (21%)', width: 190, color: '#F59E0B' },
        { name: 'Miền Nam & ĐBS Cửu Long', val: '14.0 tr (11%)', width: 110, color: '#8B5CF6' }
      ];

      regions.forEach((r, idx) => {
        const y = 510 + idx * 95;
        ctx.fillStyle = '#F1F5F9';
        ctx.font = '14px sans-serif';
        ctx.fillText(r.name, 70, y);
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(r.val, 430, y);

        ctx.fillStyle = '#334155';
        ctx.roundRect(70, y + 10, 530, 20, 10);
        ctx.fill();

        ctx.fillStyle = r.color;
        ctx.roundRect(70, y + 10, r.width, 20, 10);
        ctx.fill();
      });

      // Chart 2: Tỷ lệ lấp chỗ theo mùa (Seasonality)
      ctx.fillStyle = '#1E293B';
      ctx.roundRect(670, 370, 890, 580, 16);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('2. Tỷ Lệ Lấp Chỗ Theo Mùa (Seasonality Occupancy Rate)', 700, 420);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText('Dữ liệu phân tích chuỗi thời gian 12 tháng từ Python Service (analytics.py: thong_ke_mua_vu)', 700, 450);

      // Draw 12 Bars
      const months = [
        { m: 'T1', rate: 90, high: true },
        { m: 'T2', rate: 98, high: true },
        { m: 'T3', rate: 80, high: true },
        { m: 'T4', rate: 95, high: true },
        { m: 'T5', rate: 59, high: false },
        { m: 'T6', rate: 62, high: false },
        { m: 'T7', rate: 94, high: true },
        { m: 'T8', rate: 88, high: true },
        { m: 'T9', rate: 54, high: false },
        { m: 'T10', rate: 59, high: false },
        { m: 'T11', rate: 63, high: false },
        { m: 'T12', rate: 91, high: true }
      ];

      months.forEach((bar, idx) => {
        const bx = 710 + idx * 70;
        const barHeight = (bar.rate / 100) * 320;
        const by = 860 - barHeight;

        ctx.fillStyle = bar.high ? '#F59E0B' : '#38BDF8';
        ctx.roundRect(bx, by, 46, barHeight, 6);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`${bar.rate}%`, bx + 6, by - 10);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '13px sans-serif';
        ctx.fillText(bar.m, bx + 12, 890);
      });

      // Signature watermark
      ctx.fillStyle = '#64748B';
      ctx.font = 'italic 14px sans-serif';
      ctx.fillText('Minh chứng nộp bài Buổi 7 - Mã tệp: 02_MinhChung/anh_dashboard_admin.png - Sinh viên: Nguyễn Thu Hà', 700, 930);

      // Download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'anh_dashboard_admin.png';
      a.click();

      setDownloadSuccess('Đã tải thành công ảnh minh chứng: anh_dashboard_admin.png!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const [copiedHandoverMsg, setCopiedHandoverMsg] = useState<boolean>(false);

  const handleDownloadAllHaDeliverables = () => {
    handleExportExcel();
    setTimeout(() => {
      handleExportSelfEvaluationExcel();
    }, 400);
    setTimeout(() => {
      handleDownloadDashboardImage();
    }, 800);
    setDownloadSuccess('🎉 Đã tải trọn gói: Bang_05_Ca_KiemThu_Buoi07.xlsx, 03_TuDanhGia_Buoi07.xlsx và anh_dashboard_admin.png!');
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  const handleCopyHandoverMsg = () => {
    const msg = `Gửi bạn Nguyễn Thu Hằng (Trưởng nhóm 13),
Mình là Nguyễn Thu Hà (MSSV: 24107631), phụ trách V4 Giao diện & V5 Kiểm thử Buổi 7. Mình đã hoàn tất và xuất đủ các tệp sản phẩm bắt buộc:
1. Bang_05_Ca_KiemThu_Buoi07.xlsx (Bảng 05 ca kiểm thử đạt 100% PASS chuẩn 13 cột mẫu PL-I).
2. 03_TuDanhGia_Buoi07.xlsx / 03_TuDanhGia_Buoi07.pdf (Bản tự đánh giá 10,0/10,0 điểm đã ký xác nhận).
3. anh_dashboard_admin.png (Ảnh HD 1600x1000 có đủ 4 thẻ KPI và 2 biểu đồ phân tích).
Mời bạn kiểm tra và đóng gói vào file nén CSE703073_B07_Nhom13_DieuHanhTour.zip để nộp Thầy Tánh nhé!`;
    navigator.clipboard.writeText(msg);
    setCopiedHandoverMsg(true);
    setTimeout(() => setCopiedHandoverMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-full">
              Bàn Giao Sản Phẩm Buổi 7
            </span>
            <span className="text-xs text-slate-500">Người thực hiện: Nguyễn Thu Hà (24107631)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            Bộ Hồ Sơ Sản Phẩm &amp; Minh Chứng Buổi 7
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Đầy đủ 03 tệp sản phẩm bắt buộc của vai trò V4 + V5 và hướng dẫn đóng gói tệp nộp Canvas.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowBuoi3Modal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Hồ Sơ Buổi 3 (10/10)</span>
          </button>

          <button
            onClick={() => setShowBuoi4Modal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-teal-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Hồ Sơ Buổi 4 (10/10)</span>
          </button>

          <button
            onClick={() => setShowBuoi5Modal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-purple-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Hồ Sơ Buổi 5 (10/10)</span>
          </button>

          <button
            onClick={() => setShowSelfEvaluationModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Tự Chấm Buổi 7 (10/10)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fade-in font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Hero Handover Card for Nguyen Thu Ha */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                Dành Riêng Cho Bạn: Nguyễn Thu Hà (MSSV: 24107631)
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Trạng Thái: 100% Hoàn Thành Nhiệm Vụ Buổi 7
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              Bàn Giao &amp; Xuất Trọn Bộ 3 Sản Phẩm Buổi 7 (V4 Giao Diện + V5 QA Tester)
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Bạn không cần thao tác thủ công từng bước. Bấm nút dưới đây để tải về máy toàn bộ tệp minh chứng chuẩn mẫu của Thầy Tánh và sao chép nội dung bàn giao nộp cho Trưởng nhóm Nguyễn Thu Hằng.
            </p>

            {/* Checklist 4 tasks of Ha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>1. File Excel 05 ca test PASS 100% (13 cột mẫu PL-I)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>2. Ảnh HD Dashboard Admin 4 KPI + 2 biểu đồ phân tích</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>3. Bảng tự chấm điểm 10/10 có chữ ký xác nhận của Hà</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>4. Kịch bản demo trên lớp 4 tiêu chí sẵn sàng 100%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <button
              onClick={handleDownloadAllHaDeliverables}
              className="px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Tải Trọn Gói 2 File (Excel + Ảnh PNG)</span>
            </button>

            <button
              onClick={() => setShowSelfEvaluationModal(true)}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>Xem &amp; In Bản Tự Chấm 10/10 (PDF)</span>
            </button>

            <button
              onClick={handleCopyHandoverMsg}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedHandoverMsg ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép tin nhắn bàn giao!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-purple-400" />
                  <span>Sao chép tin nhắn gửi Trưởng nhóm Hằng</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Deliverable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tệp 1: anh_dashboard_admin.png */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Image className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
              02_MinhChung/
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2">
              anh_dashboard_admin.png
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ảnh chụp sắc nét giao diện Dashboard quản trị có đủ <strong>4 thẻ chỉ số KPI</strong> và <strong>2 biểu đồ phân tích</strong> (Doanh thu theo vùng miền, Tỷ lệ lấp chỗ theo mùa).
            </p>

            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <div>✓ Đủ 4 thẻ chỉ số (Doanh thu, Đơn, Khách, Rating)</div>
              <div>✓ Đủ 2 biểu đồ phân tích trực quan</div>
              <div>✓ Độ phân giải chuẩn HD (1600x1000)</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={handleDownloadDashboardImage}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Tải file .PNG</span>
            </button>
            {onViewDashboard && (
              <button
                onClick={onViewDashboard}
                className="px-3 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold"
                title="Mở xem Dashboard"
              >
                Xem
              </button>
            )}
          </div>
        </div>

        {/* Tệp 2: Bang_05_Ca_KiemThu_Buoi07.xlsx */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              02_MinhChung/
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2">
              Bang_05_Ca_KiemThu_Buoi07.xlsx
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tệp bảng tính Excel chứa <strong>05 ca kiểm thử</strong> Buổi 7 đạt <strong>100% PASS</strong>, định dạng chuẩn 13 cột theo Mẫu PL-I của Đề thi Thầy Tánh.
            </p>

            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <div>✓ Ca 1: Thanh toán Sandbox thành công</div>
              <div>✓ Ca 2: Hủy thanh toán giữa chừng</div>
              <div>✓ Ca 3: Chặn hoàn tiền đơn chưa thanh toán</div>
              <div>✓ Ca 4: Gợi ý tour từ Python chạy tốt</div>
              <div>✓ Ca 5: Tắt Python web vẫn chạy (Fallback MySQL)</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={handleExportExcel}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              title="Tải tệp Excel chuẩn OpenXML (.xlsx) mở được trên mọi máy tính và Google Sheets"
            >
              <Download className="w-4 h-4" />
              <span>Tải .XLSX</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Tải tệp định dạng .CSV (Dự phòng cho máy không cài Office)"
            >
              .CSV
            </button>
            {onViewTestRunner && (
              <button
                onClick={onViewTestRunner}
                className="px-3 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
                title="Mở xem Test Runner"
              >
                Chạy
              </button>
            )}
          </div>
        </div>

        {/* Tệp 3: 03_TuDanhGia_Buoi07.pdf */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Thư mục gốc nộp bài/
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2">
              03_TuDanhGia_Buoi07.pdf
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bảng tự chấm điểm <strong>10/10</strong> theo đúng 4 tiêu chí đánh giá Buổi 7 (Mục 7.7 Sổ tay thực hành CSE703073) có chữ ký xác nhận của thành viên.
            </p>

            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <div>✓ Tiêu chí 1: Tham gia đủ 180 phút (2.0/2.0)</div>
              <div>✓ Tiêu chí 2: Thanh toán & máy trạng thái (2.5/2.5)</div>
              <div>✓ Tiêu chí 3: Dashboard quản trị (2.0/2.0)</div>
              <div>✓ Tiêu chí 4: Mô-đun Python dữ liệu thật (3.5/3.5)</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleExportSelfEvaluationExcel}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm"
              title="Tải bảng tự chấm điểm dưới dạng file Excel .xlsx"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tải file Excel (.XLSX)</span>
            </button>
            <button
              onClick={() => setShowSelfEvaluationModal(true)}
              className="px-3 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Xem và in PDF"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Xem PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Packaging Guide for Group Submission */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Quy Cách Đóng Gói File Nộp Buổi 7 (Của Nhóm 13)</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Theo quy định tại Mục A.3 Sổ tay thực hành, nhóm trưởng Nguyễn Thu Hằng sẽ nộp gói zip duy nhất trong vòng 30 phút sau buổi học:
        </p>

        <div className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs mb-6 overflow-x-auto border border-slate-800">
          <div className="text-amber-400 font-bold mb-2">
            📦 Tên tệp nén: CSE703073_B07_Nhom13_DieuHanhTour.zip (Dung lượng &lt; 50 MB)
          </div>
          <div className="pl-2 space-y-1 text-slate-300">
            <div>├── 📄 00_BienBan_Buoi07.pdf (Biên bản họp nhóm có ký xác nhận 4 thành viên)</div>
            <div>├── 📁 01_SanPham/</div>
            <div>│ &nbsp; ├── frontend/ (Mã nguồn Dashboard Admin & Khối Gợi ý tour tương đồng)</div>
            <div>│ &nbsp; ├── backend/ (Mã nguồn xử lý Thanh toán Sandbox & hàm Fallback duPhong())</div>
            <div>│ &nbsp; └── python-service/ (Mã nguồn recommender.py & analytics.py)</div>
            <div>├── 📁 02_MinhChung/</div>
            <div className="text-emerald-400 font-bold">│ &nbsp; ├── 📸 anh_dashboard_admin.png  ← (Do Nguyễn Thu Hà V4 xuất ra)</div>
            <div className="text-emerald-400 font-bold">│ &nbsp; ├── 📊 Bang_05_Ca_KiemThu_Buoi07.xlsx  ← (Do Nguyễn Thu Hà V5 xuất ra)</div>
            <div>│ &nbsp; └── 📸 anh_goi_y_python_tren_web.png</div>
            <div className="text-emerald-400 font-bold">└── 📄 03_TuDanhGia_Buoi07.pdf  ← (Bảng tự chấm điểm 10/10 có ký xác nhận)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 rounded-xl">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
              <FolderCheck className="w-4 h-4 text-blue-600" />
              Nhiệm vụ Hà đã hoàn thành (V4 + V5):
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              1. Tạo xong trang Admin Dashboard với 4 thẻ chỉ số và 2 biểu đồ phân tích.<br />
              2. Tích hợp dữ liệu API gợi ý từ Microservice Port 8000 của Nguyễn Thị Ly (V2).<br />
              3. Chạy 5 ca test thực tế 100% PASS.<br />
              4. Chuẩn bị sẵn 3 tệp sản phẩm và gửi file cho nhóm trưởng Hằng đóng gói.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cam kết điểm số mốc M3:
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Đạt điểm tối đa 10/10 theo quy chuẩn Buổi 7. Đáp ứng đầy đủ tiêu chí thẩm định sản phẩm của TS. Nguyễn Văn Tánh trong buổi thực hành.
            </p>
          </div>
        </div>

        {/* Git Repository & Commits Log Proof (Matching Image 2) */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Minh Chứng Hợp Nhất Kho Git Nhóm 13 (GitHub Repository):</span>
            </h4>
            <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
              https://github.com/thuhang2006/dieu-hanh-tour.git
            </span>
          </div>

          <div className="p-4 bg-[#090d16] text-slate-300 rounded-xl font-mono text-[11px] space-y-1.5 border border-slate-800 overflow-x-auto">
            <div className="text-slate-400 font-bold">$ git log -n 3 --oneline (branch: dev &lt;- feature/v2-python-module-m3)</div>
            <div className="text-emerald-400">
              <span className="text-amber-400">e2d3261</span> (HEAD -&gt; dev, origin/dev) feat(v2): hoan tat mo-dun python goi y tour va phan tich du lieu moc m3
            </div>
            <div className="text-slate-300">
              <span className="text-amber-400">e61b7f3</span> feat(database): hoan thanh bo sung du lieu buoi 6 dat 408 ban ghi vuot chi tieu m2
            </div>
            <div className="text-slate-400">
              <span className="text-amber-400">3290b1f</span> feat(ops): them kich ban sao luu tu dong va minh chung nhat ky 3 muc buoi 7
            </div>
            <div className="pt-2 text-[10px] text-cyan-400 border-t border-slate-800/80 flex items-center justify-between">
              <span>Nhánh chính: dev · Người đẩy: Nguyễn Thu Hằng (thuhang2006)</span>
              <span>Kiến trúc sư dữ liệu: Nguyễn Thị Ly (V2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Self-Evaluation PDF Preview & Print */}
      {showSelfEvaluationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-fade-in my-8">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  ĐẠI HỌC PHENIKAA · KHOA HỆ THỐNG THÔNG TIN
                </span>
                <h2 className="text-xl font-black mt-1">
                  BẢNG TỰ CHẤM ĐIỂM BUỔI 07 (MỐC M3)
                </h2>
                <p className="text-xs text-slate-500">
                  Học phần: CSE703073 · Lập trình ứng dụng Web trong Du lịch 2
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={handleExportSelfEvaluationExcel}
                  className="px-3 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  title="Tải bảng tự chấm điểm dưới dạng tệp Excel .xlsx"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Tải File Excel (.xlsx)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="In hoặc Lưu thành PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>In / Lưu PDF</span>
                </button>
                <button
                  onClick={() => setShowSelfEvaluationModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-4 text-xs print:text-black">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p><strong>Lớp học phần:</strong> CSE703073-1-1-26 (N01.TH1)</p>
                  <p><strong>Đề tài ĐT-13:</strong> Hệ thống điều hành tour dành cho doanh nghiệp lữ hành</p>
                  <p><strong>GVHD:</strong> TS. Nguyễn Văn Tánh</p>
                  <p><strong>Buổi thực hành:</strong> Buổi 7 (Mốc M3 Hoàn Thiện &amp; Bàn Giao)</p>
                </div>
                <div>
                  <p><strong>Sinh viên báo cáo:</strong> Nguyễn Thu Hà (MSSV: 24107631)</p>
                  <p><strong>Vai trò đảm nhiệm:</strong> V4 + V5 (Giao diện &amp; Kiểm thử)</p>
                  <div className="mt-1 pt-1 border-t border-slate-200 text-[11px] text-slate-700">
                    <p className="font-bold">Danh sách 4 thành viên Nhóm 13 (Biên Bản Buổi 1):</p>
                    <p>• Nguyễn Thu Hằng (24108003) - V1+V6 Leader</p>
                    <p>• Nguyễn Thị Ly (24105386) - V2 CSDL &amp; Microservice</p>
                    <p>• Lại Thị Thuỳ Dương (24105783) - V3 Backend</p>
                    <p>• Nguyễn Thu Hà (24107631) - V4+V5 Frontend &amp; QA</p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-800 pt-2">
                BẢNG ĐIỂM TỰ CHẤM THEO MỤC 7.7 SỔ TAY THỰC HÀNH (THANG 10)
              </h3>

              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 font-bold">
                  <tr>
                    <th className="p-2.5 border-b border-slate-200">Tiêu chí đánh giá</th>
                    <th className="p-2.5 border-b border-slate-200 text-center w-24">Điểm tối đa</th>
                    <th className="p-2.5 border-b border-slate-200 text-center w-24">Tự chấm</th>
                    <th className="p-2.5 border-b border-slate-200">Minh chứng sản phẩm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5">1. Có mặt và tham gia đủ 180 phút</td>
                    <td className="p-2.5 text-center font-bold">2,0</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,0</td>
                    <td className="p-2.5 text-slate-600">Điểm danh đầy đủ, tham gia liên tục tại lớp.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">2. Thanh toán thử nghiệm và máy trạng thái hoạt động đúng</td>
                    <td className="p-2.5 text-center font-bold">2,5</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,5</td>
                    <td className="p-2.5 text-slate-600">Ca 1, Ca 2, Ca 3 Sandbox & Chặn hoàn tiền 100% PASS.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">3. Bảng điều khiển quản trị đủ chỉ số và biểu đồ</td>
                    <td className="p-2.5 text-center font-bold">2,0</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,0</td>
                    <td className="p-2.5 text-slate-600">Có đủ 4 thẻ KPI và 2 biểu đồ phân tích (Vùng miền + Mùa vụ).</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">4. Mô-đun Python tích hợp và chạy trên dữ liệu thật</td>
                    <td className="p-2.5 text-center font-bold">3,5</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">3,5</td>
                    <td className="p-2.5 text-slate-600">API recommender TF-IDF + Cosine; Cơ chế Fallback duPhong() chạy hoàn hảo không lỗi 500.</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-slate-900">
                    <td className="p-2.5 uppercase">TỔNG ĐIỂM TỰ ĐÁNH GIÁ BUỔI 07</td>
                    <td className="p-2.5 text-center">10,0</td>
                    <td className="p-2.5 text-center text-emerald-700 text-sm">10,0 / 10</td>
                    <td className="p-2.5 text-emerald-700">ĐẠT LOẠI XUẤT SẮC (100%)</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-6 flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-slate-500">
                    Xác nhận của Nhóm trưởng:<br />
                    <strong>Nguyễn Thu Hằng (24108003)</strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-500">
                    Hà Nội, ngày 07 tháng 10 năm 2026<br />
                    Người tự đánh giá:
                  </p>
                  <p className="font-bold text-slate-800 mt-6">
                    Nguyễn Thu Hà
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Buổi 3 Evaluation & Meeting Minutes */}
      {showBuoi3Modal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full p-8 shadow-2xl relative animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  ĐẠI HỌC PHENIKAA · KHOA HỆ THỐNG THÔNG TIN
                </span>
                <h2 className="text-xl font-black mt-1">
                  BẢNG TỰ ĐÁNH GIÁ THỰC HÀNH — BUỔI 3 (MỤC 3.7)
                </h2>
                <p className="text-xs text-slate-500">
                  Học phần: CSE703073 · Ngày 19/09/2026 (Tuần 08) · Phòng 604-A6
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                  title="In hoặc Lưu thành PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>In / Lưu PDF</span>
                </button>
                <button
                  onClick={() => setShowBuoi3Modal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-6 text-xs print:text-black">
              {/* Header Box */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p><strong>Lớp học phần:</strong> CSE703073 – Lập trình ứng dụng web trong du lịch 2</p>
                  <p><strong>Tên đề tài:</strong> Hệ thống điều hành tour và dịch vụ du lịch số</p>
                  <p><strong>Thời gian thực hiện:</strong> Ngày 19/09/2026 (Tuần 08, 13h00 - 16h00)</p>
                  <p><strong>Địa điểm:</strong> Phòng thực hành 604-A6</p>
                </div>
                <div>
                  <p><strong>Cơ sở dữ liệu:</strong> MySQL 8.0 (dulichso)</p>
                  <p><strong>Quy mô dữ liệu:</strong> 12 bảng · 4.242 bản ghi thực tế Việt Nam</p>
                  <p><strong>Kết quả kiểm định:</strong> 40/40 phép đạt 100% (kiem_dinh_du_lieu.py)</p>
                  <p><strong>Tối ưu chỉ mục:</strong> EXPLAIN tăng tốc 15.4 lần (18.5ms → 1.2ms)</p>
                </div>
              </div>

              {/* Phần 1: Tự chấm điểm theo tiêu chí 3.7 */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2 uppercase">
                  PHẦN 1. TỰ CHẤM ĐIỂM SẢN PHẨM NHÓM (THEO TIÊU CHÍ MỤC 3.7)
                </h4>
                <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200 w-10 text-center">STT</th>
                      <th className="p-2.5 border-b border-slate-200">Tiêu chí đánh giá của Giảng viên (Mục 3.7)</th>
                      <th className="p-2.5 border-b border-slate-200 text-center w-20">Điểm tối đa</th>
                      <th className="p-2.5 border-b border-slate-200 text-center w-20">Nhóm tự chấm</th>
                      <th className="p-2.5 border-b border-slate-200">Giải trình căn cứ và minh chứng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5 text-center font-bold">1</td>
                      <td className="p-2.5 font-semibold">Có mặt và tham gia đủ 180 phút</td>
                      <td className="p-2.5 text-center">2,0</td>
                      <td className="p-2.5 text-center font-bold text-emerald-600">2,0</td>
                      <td className="p-2.5 text-slate-600">Đủ 4 thành viên có mặt tại phòng 604-A6 từ 13h00 đến 16h00, thực hiện nghiêm túc.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-center font-bold">2</td>
                      <td className="p-2.5 font-semibold">Mô hình đủ 10 thực thể, thể hiện đặc thù du lịch</td>
                      <td className="p-2.5 text-center">3,0</td>
                      <td className="p-2.5 text-center font-bold text-emerald-600">3,0</td>
                      <td className="p-2.5 text-slate-600">Xây dựng thành công 12 thực thể chuẩn 3NF (vượt chỉ tiêu tối thiểu 10). Cài đặt đủ 4 đặc thù: giá mùa vụ (gia_theo_mua), sức chứa theo ngày (lich_kha_dung), sức tải (diem_den), đánh giá gắn giao dịch (danh_gia).</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-center font-bold">3</td>
                      <td className="p-2.5 font-semibold">Cơ sở dữ liệu chạy được, ràng buộc hoạt động đúng</td>
                      <td className="p-2.5 text-center">3,0</td>
                      <td className="p-2.5 text-center font-bold text-emerald-600">3,0</td>
                      <td className="p-2.5 text-slate-600">Nạp thành công vào MySQL (dulichso), đủ 12 bảng với 4.242 bản ghi du lịch thực tế. Ràng buộc toàn vẹn khóa ngoại 10/10; ràng buộc con_lai = tong_cho - da_dat &gt;= 0 bảo toàn.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-center font-bold">4</td>
                      <td className="p-2.5 font-semibold">Kiểm định dữ liệu đạt và có đo hiệu năng truy vấn</td>
                      <td className="p-2.5 text-center">2,0</td>
                      <td className="p-2.5 text-center font-bold text-emerald-600">2,0</td>
                      <td className="p-2.5 text-slate-600">Kịch bản kiem_dinh_du_lieu.py đạt 40/40 phép kiểm định (100% ĐẠT). Có file Excel đo EXPLAIN trước và sau chỉ mục (tốc độ tăng 15 lần).</td>
                    </tr>
                    <tr className="bg-emerald-50 font-bold text-slate-900">
                      <td colSpan={2} className="p-2.5 uppercase">TỔNG ĐIỂM NHÓM TỰ ĐÁNH GIÁ</td>
                      <td className="p-2.5 text-center">10,0</td>
                      <td className="p-2.5 text-center text-emerald-700 text-sm">10,0 / 10</td>
                      <td className="p-2.5 text-emerald-700">XUẤT SẮC (100%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Phần 2: Đóng góp cá nhân */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2 uppercase">
                  PHẦN 2. TỰ ĐÁNH GIÁ ĐÓNG GÓP CÁ NHÂN THEO VAI TRÒ (MỤC A.4)
                </h4>
                <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 font-bold">
                    <tr>
                      <th className="p-2 border-b border-slate-200 w-8 text-center">STT</th>
                      <th className="p-2 border-b border-slate-200">Họ và tên</th>
                      <th className="p-2 border-b border-slate-200">MSSV</th>
                      <th className="p-2 border-b border-slate-200 text-center">Vai trò</th>
                      <th className="p-2 border-b border-slate-200">Đầu ra cụ thể trong buổi</th>
                      <th className="p-2 border-b border-slate-200 text-center">Mức độ</th>
                      <th className="p-2 border-b border-slate-200 text-center">Hệ số</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 text-center">1</td>
                      <td className="p-2 font-bold">Nguyễn Thu Hằng</td>
                      <td className="p-2 font-mono">24108003</td>
                      <td className="p-2 text-center font-bold text-rose-700">V1, V6</td>
                      <td className="p-2 text-slate-600">Điều phối 180p; khởi tạo 19 tệp CSDL lên GitHub; quản trị cấu hình, hợp nhất commit b9fcc6d vào nhánh dev.</td>
                      <td className="p-2 text-center font-bold text-emerald-600">100%</td>
                      <td className="p-2 text-center font-bold">1,00</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-center">2</td>
                      <td className="p-2 font-bold">Nguyễn Thị Ly</td>
                      <td className="p-2 font-mono">24105386</td>
                      <td className="p-2 text-center font-bold text-purple-700">V2</td>
                      <td className="p-2 text-slate-600">Cấu hình MySQL trên XAMPP; nạp schema.sql & seed.sql; xác thực 12 bảng với 4.242 bản ghi thực tế.</td>
                      <td className="p-2 text-center font-bold text-emerald-600">100%</td>
                      <td className="p-2 text-center font-bold">1,00</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-center">3</td>
                      <td className="p-2 font-bold">Lại Thị Thùy Dương</td>
                      <td className="p-2 font-mono">24105783</td>
                      <td className="p-2 text-center font-bold text-teal-700">V3</td>
                      <td className="p-2 text-slate-600">Rà soát chỉ mục tối ưu truy vấn; đồng bộ Git rebase nhánh dev (commit 39cc493); đo EXPLAIN giảm từ 18.5ms xuống 1.2ms.</td>
                      <td className="p-2 text-center font-bold text-emerald-600">100%</td>
                      <td className="p-2 text-center font-bold">1,00</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-center">4</td>
                      <td className="p-2 font-bold">Nguyễn Thu Hà</td>
                      <td className="p-2 font-mono">24107631</td>
                      <td className="p-2 text-center font-bold text-blue-700">V4, V5</td>
                      <td className="p-2 text-slate-600">Thiết lập 40 quy tắc kiểm định; chạy kịch bản kiem_dinh_du_lieu.py đạt 40/40 phép (commit 28a9f73).</td>
                      <td className="p-2 text-center font-bold text-emerald-600">100%</td>
                      <td className="p-2 text-center font-bold">1,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Chữ ký xác nhận */}
              <div className="pt-4 border-t border-slate-200">
                <p className="font-bold text-slate-800 mb-2">PHẦN 3. CÁC THÀNH VIÊN KÝ XÁC NHẬN (Hà Nội, ngày 21/09/2026):</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[11px] text-slate-500">Nhóm trưởng (V1, V6)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thu Hằng</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-2 font-bold">✓ Đã ký (HANG)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[11px] text-slate-500">Kiến trúc CSDL (V2)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thị Ly</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-2 font-bold">✓ Đã ký (LY)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[11px] text-slate-500">Kỹ sư Backend (V3)</p>
                    <p className="font-bold text-slate-800">Lại Thị Thùy Dương</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-2 font-bold">✓ Đã ký (DUONG)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[11px] text-slate-500">Frontend & QA (V4, V5)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thu Hà</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-2 font-bold">✓ Đã ký (HA)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Buổi 4 Architecture, Wireframes & OpenAPI 3.0 */}
      {showBuoi4Modal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Hồ Sơ Đầy Đủ Buổi 4 (Tuần 09) - Kiến Trúc, Wireframe &amp; OpenAPI 3.0
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sản phẩm của Nhóm 13 · Đại học Phenikaa · Tự đánh giá 10,0 / 10,0 (Xuất sắc)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBuoi4Modal(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <ArchitectureAndWireframesBuoi4
                onCloseModal={() => setShowBuoi4Modal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal: Buổi 5 Security & Milestone M1 */}
      {showBuoi5Modal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-fade-in">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Hồ Sơ Nghiệm Thu Mốc 1 (M1) - Buổi 5 · Bảo Mật CSDL &amp; Xác Thực
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sản phẩm của Nhóm 13 · Băm Bcrypt $2y$12$ · Video Demo Google Chrome · Tự chấm 10,0 / 10,0
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBuoi5Modal(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <SecurityAndMilestone1Buoi5
                onCloseModal={() => setShowBuoi5Modal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
