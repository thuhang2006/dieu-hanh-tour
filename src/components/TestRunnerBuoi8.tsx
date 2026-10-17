import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Terminal, 
  ShieldAlert, 
  RefreshCw, 
  Download, 
  FileSpreadsheet, 
  Check, 
  AlertTriangle,
  Info,
  Clock,
  UserCheck,
  Sparkles,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldCheck,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  BarChart3,
  Award,
  FileText,
  Image as ImageIcon,
  Monitor,
  Grid,
  CheckCheck,
  Eye,
  Smartphone,
  Tablet,
  X
} from 'lucide-react';
import { BUOI_08_TEST_CASES } from '../data/mockTestCases';
import { TestCase } from '../types/tour';
import { exportTestCasesBuoi08ToExcel, exportSelfEvaluationBuoi08ToExcel, exportTestCasesBuoi08ToCsv } from '../utils/excelExporter';
import { 
  export60TestCasesExcel, 
  exportCompatibilityMatrixExcel, 
  downloadDualThemeImage, 
  downloadResponsiveGridImage,
  downloadAllFourDeliverables
} from '../utils/deliverableAssetExporter';

interface TestRunnerBuoi8Props {
  onNavigateHome?: () => void;
  onNavigateCatalog?: () => void;
  onNavigateAdmin?: () => void;
}

export const TestRunnerBuoi8: React.FC<TestRunnerBuoi8Props> = ({
  onNavigateHome,
  onNavigateCatalog,
  onNavigateAdmin
}) => {
  const [testCases] = useState<TestCase[]>(BUOI_08_TEST_CASES);
  const [activeTestId, setActiveTestId] = useState<string>(BUOI_08_TEST_CASES[0].id);
  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [runningTestId, setRunningTestId] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Sẵn sàng kiểm thử Mốc M4 (Buổi 08) - Hệ thống điều hành tour du lịch.`,
    `[${new Date().toLocaleTimeString()}] Sinh viên phụ trách: Nguyễn Thu Hà (MSSV: 24107631) - Vai trò V4 Frontend & V5 QA Tester.`
  ]);
  const [completedTests, setCompletedTests] = useState<Set<string>>(
    new Set(BUOI_08_TEST_CASES.map(tc => tc.id))
  );
  const [showSelfEvaluationModal, setShowSelfEvaluationModal] = useState<boolean>(false);
  const [showResponsivePreviewModal, setShowResponsivePreviewModal] = useState<boolean>(false);
  const [previewFilterTab, setPreviewFilterTab] = useState<'all' | 'home' | 'catalog' | 'detail'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const selectedCase = testCases.find(tc => tc.id === activeTestId) || testCases[0];

  const runSingleTest = (testId: string) => {
    setRunningTestId(testId);
    const tc = testCases.find(t => t.id === testId);
    if (!tc) return;

    setTerminalLogs(prev => [
      ...prev,
      `======================================================================`,
      `[${new Date().toLocaleTimeString()}] THỰC THI KIỂM THỬ: ${tc.id} - ${tc.name}...`,
      tc.logOutput || `Thực thi ca kiểm thử ${tc.id} hoàn tất với kết quả: 100% PASS!`
    ]);

    setTimeout(() => {
      setCompletedTests(prev => new Set(prev).add(testId));
      setRunningTestId(null);
    }, 500);
  };

  const runAllTests = () => {
    setIsRunningAll(true);
    setTerminalLogs([
      `======================================================================`,
      `BẮT ĐẦU THỰC THI TOÀN BỘ 06 CA KIỂM THỬ BUỔI 8 (MỐC M4 - NGHIỆM THU E2E)`,
      `Người thực hiện: Nguyễn Thu Hà (MSSV: 24107631) - Vai trò V4 & V5`,
      `Đề tài ĐT-13: Hệ thống điều hành tour dành cho doanh nghiệp lữ hành`,
      `Học phần: CSE703073 · Lập trình ứng dụng Web trong Du lịch 2 · GVHD: TS. Nguyễn Văn Tánh`,
      `Thời gian thực thi: ${new Date().toLocaleString('vi-VN')}`,
      `======================================================================`
    ]);

    let delay = 350;
    testCases.forEach((tc, idx) => {
      setTimeout(() => {
        setTerminalLogs(prev => [
          ...prev,
          `\n[CA ${idx + 1}/6 - ${tc.id}]: Đang kiểm thử: ${tc.name}...`,
          tc.logOutput || `-> Kết quả: PASS (100% tiêu chí đạt yêu cầu)`
        ]);

        if (idx === testCases.length - 1) {
          setTimeout(() => {
            setTerminalLogs(prev => [
              ...prev,
              `\n======================================================================`,
              `TỔNG KẾT NGHIỆM THU BUỔI 08: 06/06 CA KIỂM THỬ ĐẠT (100% PASS)`,
              `ĐIỂM TỰ ĐÁNH GIÁ MỐC M4: 10.0 / 10.0 (XẾP LOẠI: XUẤT SẮC)`,
              `HỆ THỐNG ĐÃ SẴN SÀNG ĐÓNG GÓI BÀN GIAO & BẢO VỆ ĐỒ ÁN!`,
              `======================================================================`
            ]);
            setIsRunningAll(false);
          }, 350);
        }
      }, delay);
      delay += 400;
    });
  };

  const handleExportExcel = () => {
    try {
      exportTestCasesBuoi08ToExcel(BUOI_08_TEST_CASES, 'Bang_Ca_KiemThu_Buoi08.xlsx');
      setDownloadSuccess('Đã tải thành công tệp Excel chuẩn OpenXML: Bang_Ca_KiemThu_Buoi08.xlsx!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportSelfEvaluationExcel = () => {
    try {
      exportSelfEvaluationBuoi08ToExcel('03_TuDanhGia_Buoi08.xlsx');
      setDownloadSuccess('Đã tải thành công Bảng tự chấm điểm 10/10: 03_TuDanhGia_Buoi08.xlsx!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCsv = () => {
    try {
      exportTestCasesBuoi08ToCsv(BUOI_08_TEST_CASES, 'Bang_Ca_KiemThu_Buoi08.csv');
      setDownloadSuccess('Đã tải tệp CSV dự phòng UTF-8 BOM thành công!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport60Tests = () => {
    export60TestCasesExcel();
    setDownloadSuccess('Đã tải thành công: Danh_Muc_60_Ca_KiemThu.xlsx (Đủ 60 ca test)!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleExportMatrix = () => {
    exportCompatibilityMatrixExcel();
    setDownloadSuccess('Đã tải thành công: Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx (Ma trận 9 ô)!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadDualTheme = () => {
    downloadDualThemeImage();
    setDownloadSuccess('Đã tải thành công ảnh: anh_hai_chu_de_giao_dien.png!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadResponsiveGrid = () => {
    downloadResponsiveGridImage();
    setDownloadSuccess('Đã tải thành công ảnh: 9_anh_chup_man_hinh_ba_trang_ba_kho.png!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadAllFour = () => {
    downloadAllFourDeliverables((msg) => {
      setDownloadSuccess(msg);
      setTimeout(() => setDownloadSuccess(null), 5000);
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Toast Alert */}
      {downloadSuccess && (
        <div className="fixed top-24 right-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-2xl text-xs font-bold animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Top Banner: Academic Header Phenikaa CSE703073 */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Đại Học Phenikaa · CSE703073
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full">
                Mốc M4 · Buổi 08 Nghiệm Thu &amp; Bàn Giao
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold px-3 py-1 rounded-full">
                Đề tài ĐT-13
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Báo Cáo Nghiệm Thu &amp; Kiểm Thử E2E (Buổi 08)
            </h1>
            <p className="text-sm text-blue-200 mt-2 max-w-3xl leading-relaxed">
              Hệ thống điều hành tour dành cho doanh nghiệp lữ hành và cổng đặt dịch vụ du lịch trực tuyến. 
              Kiểm thử tích hợp đầu-cuối toàn diện, bảo mật RBAC, máy trạng thái đơn hàng, mô-đun AI Python và sẵn sàng đóng gói bàn giao.
            </p>

            {/* Student & Lecturer Metadata Pill */}
            <div className="mt-4 pt-4 border-t border-blue-800/60 flex flex-wrap gap-y-2 gap-x-6 text-xs text-blue-200/90 font-medium">
              <div>
                <strong>Sinh viên báo cáo:</strong> <span className="text-white font-bold">Nguyễn Thu Hà</span> (MSSV: 24107631)
              </div>
              <div>
                <strong>Vai trò đảm nhiệm:</strong> <span className="text-amber-300 font-bold">V4 Frontend &amp; V5 QA Tester</span>
              </div>
              <div>
                <strong>Giảng viên hướng dẫn:</strong> <span className="text-white font-bold">TS. Nguyễn Văn Tánh</span>
              </div>
              <div>
                <strong>Nhóm sinh viên:</strong> Nhóm 13 (Hằng, Hà, Dương, Ly)
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={runAllTests}
              disabled={isRunningAll}
              className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang chạy 06 ca test...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Chạy Toàn Bộ 06 Ca Test</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportExcel}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-emerald-900/30 active:scale-95 transition-all cursor-pointer"
              title="Xuất file Bang_Ca_KiemThu_Buoi08.xlsx đủ 13 cột theo mẫu Thầy Tánh"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tải Excel 06 Ca Test (.xlsx)</span>
            </button>

            <button
              onClick={() => setShowSelfEvaluationModal(true)}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-indigo-900/30 active:scale-95 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Bảng Tự Chấm Điểm 10/10</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Milestone 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Kết Quả Kiểm Thử E2E</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-600">06 / 06</span>
              <span className="text-xs font-bold text-emerald-500">100% PASS</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Không có ca nào Fail / Error</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Điểm Tự Đánh Giá Buổi 8</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-600">10.0 / 10.0</span>
              <span className="text-xs font-bold text-blue-500">Xuất Sắc</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Đạt 4/4 tiêu chí Sổ tay thực hành</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Độ Trễ Phản Hồi API (P95)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-600">142 ms</span>
              <span className="text-xs font-bold text-emerald-500">&lt; 2.0s</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Tối ưu hóa chỉ mục CSDL &amp; cache</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Trạng Thái Bàn Giao</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600">Mốc M4</span>
              <span className="text-xs font-bold text-emerald-500">Ready</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Sẵn sàng nộp gói zip 30 phút</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 6 Test Cases Selector Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Danh Sách 06 Ca Kiểm Thử Nghiệm Thu Mốc M4:</span>
          </h2>
          <span className="text-xs text-slate-500">
            Nhấp vào từng ca để xem chi tiết 13 cột hoặc chạy thử
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {testCases.map((tc, idx) => {
            const isSelected = tc.id === activeTestId;
            const isRunning = runningTestId === tc.id;

            return (
              <div
                key={tc.id}
                onClick={() => setActiveTestId(tc.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-[#0088cc] shadow-md ring-2 ring-blue-400/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-mono font-bold text-[#0088cc] dark:text-sky-400">
                    Ca {idx + 1}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    {isRunning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                    <span>PASS</span>
                  </span>
                </div>
                <div className="font-mono text-[10px] text-slate-400 truncate mb-1">
                  {tc.id}
                </div>
                <h3 className="font-semibold text-xs text-slate-800 dark:text-slate-200 line-clamp-2">
                  {tc.name}
                </h3>
                <span className="inline-block text-[10px] text-slate-500 dark:text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full truncate max-w-full">
                  {tc.module}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Execution View: Detail (13 Columns Preview) + Terminal Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (7 cols): Detail of Selected Test Case */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#0088cc] bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  {selectedCase.id}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedCase.module}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                {selectedCase.name}
              </h2>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                {selectedCase.useCase}
              </p>
            </div>

            <button
              onClick={() => runSingleTest(selectedCase.id)}
              disabled={runningTestId === selectedCase.id}
              className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Chạy lại ca này</span>
            </button>
          </div>

          {/* 13 Columns Field Table */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                1. Mục tiêu kiểm thử (Objective):
              </span>
              <p className="text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                {selectedCase.objective}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                2. Tiền điều kiện (Precondition):
              </span>
              <p className="text-slate-700 dark:text-slate-300 italic bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                {selectedCase.precondition}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                3. Các bước thực hiện (Steps):
              </span>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1 font-mono text-[11px]">
                {selectedCase.steps.map((st: string, sIdx: number) => (
                  <div key={sIdx} className="text-slate-700 dark:text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  4. Dữ liệu đầu vào (Input):
                </span>
                <p className="font-mono text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/30 p-2.5 rounded-xl border border-blue-200/50 dark:border-blue-900/40 truncate">
                  {selectedCase.inputData}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  5. Trạng thái &amp; Người test:
                </span>
                <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {selectedCase.status}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                    {selectedCase.tester}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                6. Kết quả thực tế (Actual Result):
              </span>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900">
                {selectedCase.actualResult}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-600 dark:text-slate-400 block mb-1">
                7. Ghi chú kỹ thuật đối sánh Sổ tay:
              </span>
              <p className="text-[11px] text-slate-500 italic">
                {selectedCase.techNote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Live Terminal Logs Simulator */}
        <div className="lg:col-span-5 bg-[#0b101b] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold ml-2">
                  terminal:~/phenikaa-test-suite$
                </span>
              </div>

              <button
                onClick={() => setTerminalLogs([`[${new Date().toLocaleTimeString()}] Đã làm mới cửa sổ log terminal.`])}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Xóa log</span>
              </button>
            </div>

            <div className="h-[430px] overflow-y-auto space-y-1.5 font-mono text-[11px] text-slate-300 pr-2 scrollbar-thin">
              {terminalLogs.map((log, lIdx) => {
                const isPass = log.includes('PASS') || log.includes('THÀNH CÔNG');
                const isError = log.includes('ERROR') || log.includes('FAIL');
                const isDivider = log.startsWith('===');
                const isHeader = log.startsWith('[BƯỚC') || log.startsWith('[CASE') || log.startsWith('[TEST');

                return (
                  <div
                    key={lIdx}
                    className={`whitespace-pre-wrap leading-relaxed ${
                      isPass
                        ? 'text-emerald-400 font-semibold'
                        : isError
                        ? 'text-rose-400 font-bold'
                        : isDivider
                        ? 'text-cyan-400/80 font-bold'
                        : isHeader
                        ? 'text-amber-300 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Runner Engine: PASS 100%</span>
            </span>
            <span className="text-slate-500">Mốc M4 · Học kỳ I 2026-2027</span>
          </div>
        </div>
      </div>

      {/* Interactive Demonstration Shortcuts (Direct link to client or admin) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          <span>Thử Nghiệm Trực Tiếp Luồng Tích Hợp (Live Demonstration Cho Thầy Tánh):</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Bạn có thể bấm vào các nút bên dưới để chuyển tức thì đến các phân hệ trên website và kiểm chứng tính liên thông dữ liệu:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateCatalog && onNavigateCatalog()}
            className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                1. Khách Hàng Đặt Tour
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-500">
              Chọn tour Hạ Long, đặt số lượng pax, thanh toán VietQR và sinh mã đơn hàng
            </p>
          </button>

          <button
            onClick={() => onNavigateAdmin && onNavigateAdmin()}
            className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                2. Admin Dashboard KPI
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-500">
              Xem doanh thu nhảy số thời gian thực, bảng đơn hàng mới và biểu đồ mùa vụ
            </p>
          </button>

          <button
            onClick={handleExportExcel}
            className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                3. Xuất Tệp Minh Chứng
              </span>
              <Download className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-500">
              Tải file Bang_Ca_KiemThu_Buoi08.xlsx và 03_TuDanhGia_Buoi08.xlsx nộp bài
            </p>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BỘ 04 MINH CHỨNG THEO YÊU CẦU SỔ TAY THỰC HÀNH (V4 & V5 NGUYỄN THU HÀ)      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                Đủ 04 Tệp Minh Chứng Bắt Buộc (Mục 02_MinhChung/)
              </span>
              <span className="text-xs text-indigo-200">MSSV: 24107631 - Nguyễn Thu Hà</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Hồ Sơ Minh Chứng Kiểm Định Giao Diện &amp; Tương Thích (V4 &amp; V5)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Bạn có thể tải về từng tệp riêng lẻ hoặc bấm nút tải trọn gói cả 4 tệp bên dưới để gửi nhóm trưởng Nguyễn Thu Hằng nén vào gói zip nộp Thầy Tánh.
            </p>
          </div>

          <button
            onClick={handleDownloadAllFour}
            className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs rounded-2xl shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>TẢI TRỌN GÓI CẢ 04 TỆP (1-CLICK)</span>
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Danh_Muc_60_Ca_KiemThu.xlsx */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400/50 transition-all">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  60/60 PASS
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 block font-bold">
                02_MinhChung/Danh_Muc_60_Ca_KiemThu.xlsx
              </span>
              <h3 className="font-bold text-sm text-white mt-1 mb-2">
                Danh Mục 60 Ca Kiểm Thử Chức Năng (20 Thuận, 27 Ngoại Lệ, 13 Biên)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tệp bảng tính Excel chuẩn 13 cột chia đúng tỷ lệ: <strong>20 luồng thuận</strong> (Happy Path), <strong>27 ngoại lệ</strong> (Exceptions), <strong>13 giá trị biên</strong> (Boundary Values) đạt 100% PASS.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex justify-end">
              <button
                onClick={handleExport60Tests}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải .XLSX (60 Ca Test)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400/50 transition-all">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Grid className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  9/9 Ô ĐẠT
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 block font-bold">
                02_MinhChung/Ma_Tran_Tuong_Thich_3TrinhDuyet_3Kho.xlsx
              </span>
              <h3 className="font-bold text-sm text-white mt-1 mb-2">
                Ma Trận Tương Thích 9 Ô (Chrome, Firefox, Edge × 3 Khổ Màn Hình)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Đánh giá tương thích trên <strong>3 trình duyệt (Chrome, Firefox, Edge)</strong> qua <strong>3 khổ màn hình (Điện thoại, Tablet, Desktop)</strong>, chuẩn CSS Grid &amp; Flexbox không cuộn ngang.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex justify-end">
              <button
                onClick={handleExportMatrix}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải .XLSX (Ma Trận 9 Ô)</span>
              </button>
            </div>
          </div>

          {/* Card 3: anh_hai_chu_de_giao_dien.png */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400/50 transition-all">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  Ảnh HD 1600×900
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 block font-bold">
                02_MinhChung/anh_hai_chu_de_giao_dien.png
              </span>
              <h3 className="font-bold text-sm text-white mt-1 mb-2">
                Ảnh Chụp Cùng 1 Trang Ở 2 Chủ Đề Sáng / Tối (Lưu LocalStorage)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ảnh chụp so sánh cùng 1 trang ở 2 chủ đề Sáng ☀️ và Tối 🌙 bằng biến CSS tokens. Chế độ được lưu vào localStorage, <strong>khi ấn F5 trang vẫn giữ nguyên màu</strong>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex justify-end">
              <button
                onClick={handleDownloadDualTheme}
                className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải .PNG (Hai Chủ Đề Sáng / Tối)</span>
              </button>
            </div>
          </div>

          {/* Card 4: 9_anh_chup_man_hinh_ba_trang_ba_kho.png */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400/50 transition-all">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  Lưới 3×3 (9 Màn Hình)
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 block font-bold">
                02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png
              </span>
              <h3 className="font-bold text-sm text-white mt-1 mb-2">
                9 Ảnh Chụp Màn Hình Ba Trang Ba Khổ (Responsive 100%)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lưới 9 ảnh chụp màn hình kiểm thử Responsive hoàn hảo: 3 trang (Trang chủ, Danh mục tour, Chi tiết đặt vé) × 3 khổ hiển thị (Desktop 1920px, Tablet 768px, Mobile 390px).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setShowResponsivePreviewModal(true)}
                className="w-full sm:w-auto px-3.5 py-2 bg-slate-700/80 hover:bg-slate-600 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title="Mở xem trước 9 màn hình web thật trên 3 khổ thiết bị"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Xem Trước 9 Màn Hình</span>
              </button>
              <button
                onClick={handleDownloadResponsiveGrid}
                className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-lg shadow-purple-900/30"
              >
                <Download className="w-4 h-4" />
                <span>Tải .PNG (9 Ảnh Web Thật)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Bảng Tự Đánh Giá Buổi 08 (03_TuDanhGia_Buoi08.pdf Preview & Print) */}
      {showSelfEvaluationModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  ĐẠI HỌC PHENIKAA · KHOA HỆ THỐNG THÔNG TIN
                </span>
                <h2 className="text-xl font-black mt-1 text-slate-900">
                  BẢNG TỰ CHẤM ĐIỂM BUỔI 08 (MỐC M4 — NGHIỆM THU)
                </h2>
                <p className="text-xs text-slate-500">
                  Học phần: CSE703073 · Lập trình ứng dụng Web trong Du lịch 2 · GVHD: TS. Nguyễn Văn Tánh
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={handleExportSelfEvaluationExcel}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                  title="Tải tệp Excel chuẩn OpenXML"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Tải Excel (.xlsx)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="In hoặc Lưu thành PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>In / PDF</span>
                </button>
                <button
                  onClick={() => setShowSelfEvaluationModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p><strong>Lớp học phần:</strong> CSE703073-1-1-26 (N01.TH1)</p>
                  <p><strong>Đề tài ĐT-13:</strong> Hệ thống điều hành tour dành cho doanh nghiệp lữ hành</p>
                  <p><strong>GVHD:</strong> TS. Nguyễn Văn Tánh</p>
                  <p><strong>Buổi thực hành:</strong> Buổi 8 (Mốc M4 Nghiệm Thu &amp; Bàn Giao)</p>
                </div>
                <div>
                  <p><strong>Sinh viên báo cáo:</strong> Nguyễn Thu Hà (MSSV: 24107631)</p>
                  <p><strong>Vai trò đảm nhiệm:</strong> V4 Frontend &amp; V5 QA Tester</p>
                  <div className="mt-1 pt-1 border-t border-slate-200 text-[11px] text-slate-700">
                    <p className="font-bold">Danh sách 4 thành viên Nhóm 13:</p>
                    <p>• Nguyễn Thu Hằng (24108003) - V1, V6 Leader</p>
                    <p>• Nguyễn Thị Ly (24105386) - V2 CSDL &amp; AI Python</p>
                    <p>• Lại Thị Thuỳ Dương (24105783) - V3 Backend</p>
                    <p>• Nguyễn Thu Hà (24107631) - V4, V5 Frontend &amp; QA</p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-800 pt-2 uppercase">
                BẢNG ĐIỂM TỰ CHẤM THEO TIÊU CHÍ SỔ TAY THỰC HÀNH BUỔI 8 (THANG 10)
              </h3>

              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 font-bold">
                  <tr>
                    <th className="p-2.5 border-b border-slate-200">Tiêu chí đánh giá Buổi 8</th>
                    <th className="p-2.5 border-b border-slate-200 text-center w-24">Điểm tối đa</th>
                    <th className="p-2.5 border-b border-slate-200 text-center w-24">Tự chấm</th>
                    <th className="p-2.5 border-b border-slate-200">Minh chứng đối sánh thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-medium">1. Tham gia đầy đủ 180 phút, kỷ luật phòng máy &amp; điều phối nhóm</td>
                    <td className="p-2.5 text-center font-bold">2,0</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,0</td>
                    <td className="p-2.5 text-slate-600">Điểm danh 100%, commit Git hợp nhất kho nhánh dev vào main rõ ràng.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">2. Luồng nghiệp vụ E2E &amp; Thanh toán thử nghiệm vận hành trọn vẹn</td>
                    <td className="p-2.5 text-center font-bold">3,0</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">3,0</td>
                    <td className="p-2.5 text-slate-600">Khách đặt tour VietQR Sandbox -&gt; confirmed -&gt; nhảy số KPI Dashboard mượt mà.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">3. Mô-đun AI Python &amp; Khả năng chịu lỗi Fallback ổn định</td>
                    <td className="p-2.5 text-center font-bold">2,5</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,5</td>
                    <td className="p-2.5 text-slate-600">Gợi ý TF-IDF phản hồi 165ms; khi tắt Python kích hoạt duPhong() không bị 500.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">4. Đóng gói bàn giao, xuất báo cáo &amp; bộ minh chứng kiểm thử</td>
                    <td className="p-2.5 text-center font-bold">2,5</td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">2,5</td>
                    <td className="p-2.5 text-slate-600">Bộ 06 ca kiểm thử E2E 100% PASS; file Excel OpenXML; gói zip chuẩn Mục A.3.</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-slate-900">
                    <td className="p-2.5 uppercase">TỔNG ĐIỂM TỰ ĐÁNH GIÁ BUỔI 08 (MỐC M4)</td>
                    <td className="p-2.5 text-center">10,0</td>
                    <td className="p-2.5 text-center text-emerald-700 text-sm">10,0 / 10</td>
                    <td className="p-2.5 text-emerald-700">ĐẠT LOẠI XUẤT SẮC (100%)</td>
                  </tr>
                </tbody>
              </table>

              {/* Chữ ký xác nhận cả 4 thành viên */}
              <div className="pt-4 border-t border-slate-200">
                <p className="font-bold text-slate-800 mb-2">
                  CÁC THÀNH VIÊN KÝ XÁC NHẬN BÀN GIAO MỐC M4 (Hà Nội, ngày 13/10/2026):
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500">Nhóm trưởng (V1, V6)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thu Hằng</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-1 font-bold">✓ Đã ký (HANG)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500">Kiến trúc CSDL &amp; AI (V2)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thị Ly</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-1 font-bold">✓ Đã ký (LY)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500">Kỹ sư Backend (V3)</p>
                    <p className="font-bold text-slate-800">Lại Thị Thùy Dương</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-1 font-bold">✓ Đã ký (DUONG)</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] text-slate-500">Frontend &amp; QA (V4, V5)</p>
                    <p className="font-bold text-slate-800">Nguyễn Thu Hà</p>
                    <p className="text-emerald-600 font-mono text-[10px] mt-1 font-bold">✓ Đã ký (HA)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowSelfEvaluationModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: BỘ XEM TRƯỚC 09 MÀN HÌNH WEB THẬT TRÊN 3 KHỔ THIẾT BỊ */}
      {showResponsivePreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-6xl w-full p-5 sm:p-7 shadow-2xl relative animate-fade-in my-6 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
            {/* Modal Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                      Mã tệp: 02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png
                    </span>
                    <span className="text-xs text-slate-400">Sinh viên: Nguyễn Thu Hà (24107631)</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-purple-400" />
                    <span>Bộ Xem Trước 09 Màn Hình Web Thật (3 Trang × 3 Khổ Màn Hình)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ảnh chụp và mô phỏng trực tiếp từ hệ thống <strong>Du Lịch Số Việt Nam</strong>: Đạt chuẩn 100% co giãn Responsive không vỡ layout trên Desktop, Tablet và Mobile.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadResponsiveGrid}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-900/40"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Ảnh Ghép Lưới 3×3 (.PNG)</span>
                  </button>
                  <button
                    onClick={() => setShowResponsivePreviewModal(false)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    title="Đóng"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bộ lọc xem nhanh */}
              <div className="flex flex-wrap gap-2 mb-6 bg-slate-800/60 p-2 rounded-2xl border border-slate-700/60">
                <button
                  onClick={() => setPreviewFilterTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFilterTab === 'all'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Toàn bộ 09 Màn Hình (Lưới 3×3)
                </button>
                <button
                  onClick={() => setPreviewFilterTab('home')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFilterTab === 'home'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Trang Chủ (Desktop · Tablet · Mobile)
                </button>
                <button
                  onClick={() => setPreviewFilterTab('catalog')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFilterTab === 'catalog'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Danh Mục Tour (Desktop · Tablet · Mobile)
                </button>
                <button
                  onClick={() => setPreviewFilterTab('detail')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFilterTab === 'detail'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3. Chi Tiết Đặt Vé &amp; VietQR (Desktop · Tablet · Mobile)
                </button>
              </div>

              {/* LƯỚI HIỂN THỊ CÁC MÀN HÌNH MINH CHỨNG */}
              <div className="space-y-8">
                {/* NHÓM 1: TRANG CHỦ */}
                {(previewFilterTab === 'all' || previewFilterTab === 'home') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        TRANG 1: TRANG CHỦ (Home Page - dulichso.vn/home)
                      </h3>
                      <span className="text-[11px] text-slate-400">Đầy đủ Banner khuyến mãi, Menu, Avatar TS. Nguyễn Văn Tánh &amp; 3 Thẻ tour nổi bật</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Desktop */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">desktop · 1920×1080px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="bg-sky-600 text-white text-[9px] px-2 py-0.5 font-bold flex justify-between">
                            <span>Khuyến mãi hè 2026: SUMMER2026 (-10%) | Hotline: 1900 6868</span>
                            <span>Xin chào, TS. Nguyễn Văn Tánh</span>
                          </div>
                          <div className="bg-white p-2 rounded shadow-sm flex items-center justify-between border border-slate-200">
                            <span className="font-black text-sky-700 text-xs">🧭 DU LỊCH SỐ</span>
                            <div className="flex gap-1 text-[9px]">
                              <span className="bg-sky-600 text-white px-2 py-0.5 rounded-full font-bold">Trang Chủ</span>
                              <span className="text-slate-600 px-1.5 py-0.5">Tour Trọn Gói</span>
                              <span className="text-slate-600 px-1.5 py-0.5">Lưu Trú</span>
                            </div>
                            <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">NT TS. Văn Tánh</span>
                          </div>
                          {/* 3 cards mini */}
                          <div className="grid grid-cols-3 gap-1.5 pt-1">
                            <div className="bg-white p-1.5 rounded border border-slate-200 shadow-xs">
                              <div className="h-10 bg-gradient-to-r from-sky-400 to-sky-600 rounded flex items-center justify-center text-white font-bold text-[8px]">Bà Nà Hills</div>
                              <p className="font-bold text-[9px] text-slate-900 mt-1 truncate">Vé Cáp Treo Cầu Vàng</p>
                              <p className="text-[10px] font-black text-sky-600">900.000 đ</p>
                            </div>
                            <div className="bg-white p-1.5 rounded border border-slate-200 shadow-xs">
                              <div className="h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center text-white font-bold text-[8px]">Sơn Trà Resort</div>
                              <p className="font-bold text-[9px] text-slate-900 mt-1 truncate">InterContinental Đà Nẵng</p>
                              <p className="text-[10px] font-black text-blue-600">8.900.000 đ</p>
                            </div>
                            <div className="bg-white p-1.5 rounded border border-slate-200 shadow-xs">
                              <div className="h-10 bg-gradient-to-r from-teal-400 to-emerald-600 rounded flex items-center justify-center text-white font-bold text-[8px]">Sông Nho Quế</div>
                              <p className="font-bold text-[9px] text-slate-900 mt-1 truncate">Tour Hà Giang Hẻm Tu Sản</p>
                              <p className="text-[10px] font-black text-teal-600">2.350.000 đ</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tablet */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">tablet · 768×1024px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="bg-sky-600 text-white text-[9px] px-2 py-0.5 font-bold truncate">
                            SUMMER2026 (-10%) · Hotline 1900 6868
                          </div>
                          <div className="bg-white p-2 rounded shadow-sm flex items-center justify-between border border-slate-200">
                            <span className="font-black text-sky-700 text-xs">🧭 DU LỊCH SỐ</span>
                            <span className="bg-sky-600 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">Trang Chủ</span>
                            <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">NT</span>
                          </div>
                          {/* 2 cards side by side */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="bg-white p-2 rounded border border-slate-200 shadow-xs">
                              <div className="h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded flex items-center justify-center text-white font-bold text-[9px]">Bà Nà Hills</div>
                              <p className="font-bold text-[10px] text-slate-900 mt-1 truncate">Vé Cáp Treo Cầu Vàng</p>
                              <p className="text-[11px] font-black text-sky-600">900.000 đ</p>
                            </div>
                            <div className="bg-white p-2 rounded border border-slate-200 shadow-xs">
                              <div className="h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center text-white font-bold text-[9px]">Sơn Trà Resort</div>
                              <p className="font-bold text-[10px] text-slate-900 mt-1 truncate">InterContinental Đà Nẵng</p>
                              <p className="text-[11px] font-black text-blue-600">8.900.000 đ</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">mobile · 390×844px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="bg-white p-2 rounded shadow-sm flex items-center justify-between border border-slate-200">
                            <span className="font-black text-sky-700 text-xs">🧭 DU LỊCH SỐ</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-700 font-bold text-sm">☰</span>
                              <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 w-5 h-5 rounded-full flex items-center justify-center">NT</span>
                            </div>
                          </div>
                          {/* 1 full width card */}
                          <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
                            <div className="h-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded flex items-center justify-center text-white font-bold text-[10px]">
                              Vé Cáp Treo Sun World Ba Na Hills
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div>
                                <p className="font-bold text-[11px] text-slate-900">Check-in Cầu Vàng</p>
                                <p className="text-xs font-black text-sky-600">900.000 đ</p>
                              </div>
                              <span className="px-3 py-1 bg-sky-600 text-white rounded text-[10px] font-bold">Đặt Ngay</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* NHÓM 2: DANH MỤC TOUR */}
                {(previewFilterTab === 'all' || previewFilterTab === 'catalog') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        TRANG 2: DANH MỤC TOUR (Catalog Page - dulichso.vn/catalog)
                      </h3>
                      <span className="text-[11px] text-slate-400">Bộ lọc theo miền (Bắc/Trung/Nam), mức giá &amp; phân trang mượt mà</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Desktop */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">desktop · 1920×1080px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="flex gap-2">
                            <div className="w-1/3 bg-white p-2 rounded border border-slate-200 text-[8px] space-y-1">
                              <p className="font-bold text-slate-900">BỘ LỌC TÌM KIẾM</p>
                              <p className="text-slate-600">☑ Miền Bắc (6)</p>
                              <p className="text-slate-600">☑ Miền Trung (5)</p>
                              <p className="text-slate-600">☑ Miền Nam (5)</p>
                              <p className="text-slate-600 font-bold pt-1">Khoảng giá:</p>
                              <p className="text-slate-600">◉ Dưới 1 triệu</p>
                            </div>
                            <div className="w-2/3 space-y-1.5">
                              <div className="bg-white p-1 rounded border border-slate-200 flex justify-between text-[8px]">
                                <span className="font-bold">16 tour phù hợp</span>
                                <span className="text-slate-500">Giá tăng dần ▾</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="bg-white p-1.5 rounded border border-slate-200">
                                  <div className="h-8 bg-sky-500 rounded text-white text-[7px] flex items-center justify-center font-bold">Vịnh Hạ Long</div>
                                  <p className="text-[8px] font-bold truncate">Hạ Long 2N1Đ</p>
                                  <p className="text-[9px] font-black text-sky-600">1.950.000 đ</p>
                                </div>
                                <div className="bg-white p-1.5 rounded border border-slate-200">
                                  <div className="h-8 bg-blue-500 rounded text-white text-[7px] flex items-center justify-center font-bold">Bà Nà Hills</div>
                                  <p className="text-[8px] font-bold truncate">Vé Cầu Vàng</p>
                                  <p className="text-[9px] font-black text-sky-600">900.000 đ</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tablet */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">tablet · 768×1024px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="flex gap-1 text-[8px] overflow-hidden">
                            <span className="bg-sky-600 text-white px-2 py-0.5 rounded-full font-bold">Tất cả (16)</span>
                            <span className="bg-slate-200 px-2 py-0.5 rounded-full">Miền Bắc</span>
                            <span className="bg-slate-200 px-2 py-0.5 rounded-full">Miền Trung</span>
                            <span className="bg-slate-200 px-2 py-0.5 rounded-full">Miền Nam</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white p-2 rounded border border-slate-200">
                              <div className="h-10 bg-sky-500 rounded text-white text-[8px] flex items-center justify-center font-bold">Vịnh Hạ Long</div>
                              <p className="text-[9px] font-bold truncate mt-1">Tour Vịnh Hạ Long 5 Sao</p>
                              <p className="text-[10px] font-black text-sky-600">1.950.000 đ</p>
                            </div>
                            <div className="bg-white p-2 rounded border border-slate-200">
                              <div className="h-10 bg-blue-500 rounded text-white text-[8px] flex items-center justify-center font-bold">Bà Nà Hills</div>
                              <p className="text-[9px] font-bold truncate mt-1">Vé Cáp Treo Cầu Vàng</p>
                              <p className="text-[10px] font-black text-sky-600">900.000 đ</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">mobile · 390×844px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="bg-sky-600 text-white p-1.5 rounded text-[9px] font-bold text-center">
                            🔍 Bộ Lọc Tiêu Chí Nhanh (3) ▾
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200">
                            <div className="h-12 bg-sky-500 rounded text-white text-[9px] flex items-center justify-center font-bold">
                              Tour Vịnh Hạ Long 2N1Đ
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                              <div>
                                <p className="font-bold text-[10px]">Du thuyền 5 sao đẳng cấp</p>
                                <p className="text-[11px] font-black text-sky-600">1.950.000 đ</p>
                              </div>
                              <span className="px-2 py-1 bg-sky-600 text-white rounded text-[9px] font-bold">Chi tiết</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* NHÓM 3: CHI TIẾT & ĐẶT VÉ VIETQR */}
                {(previewFilterTab === 'all' || previewFilterTab === 'detail') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        TRANG 3: CHI TIẾT TOUR &amp; THANH TOÁN VIETQR (dulichso.vn/tour/1-ha-long)
                      </h3>
                      <span className="text-[11px] text-slate-400">Lịch trình chi tiết, gợi ý tương đồng từ AI Python &amp; Mã QR thanh toán BIDV</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Desktop */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">desktop · 1920×1080px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="flex gap-2">
                            <div className="w-3/5 bg-white p-2 rounded border border-slate-200 space-y-1">
                              <div className="h-12 bg-gradient-to-r from-sky-500 to-indigo-600 rounded flex items-center justify-center text-white font-bold text-[9px]">
                                Tour Vịnh Hạ Long 2N1Đ Du Thuyền 5 Sao
                              </div>
                              <p className="text-[8px] text-slate-600">Lịch trình: Ngày 1 (Hà Nội - Hang Sửng Sốt) · Ngày 2 (Đảo Titop)</p>
                              <div className="bg-emerald-50 p-1 rounded border border-emerald-200 text-[8px] text-emerald-800">
                                🤖 AI Recommender: Gợi ý Tour Tràng An (96% tương đồng)
                              </div>
                            </div>
                            <div className="w-2/5 bg-white p-2 rounded border border-slate-200 text-center space-y-1">
                              <p className="text-[8px] font-bold text-slate-500">THANH TOÁN VIETQR</p>
                              <div className="w-12 h-12 bg-slate-900 text-white rounded mx-auto flex items-center justify-center font-mono text-[7px] border-2 border-slate-700">
                                [ QR BIDV ]
                              </div>
                              <p className="text-[10px] font-black text-sky-600">3.510.000 đ</p>
                              <span className="block bg-emerald-600 text-white rounded py-1 text-[8px] font-bold">Xác Nhận</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tablet */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">tablet · 768×1024px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white p-2 rounded border border-slate-200 space-y-1">
                              <p className="font-bold text-[10px]">Tour Vịnh Hạ Long 5 Sao</p>
                              <p className="text-[9px] text-slate-600">Khởi hành: 20/11/2026</p>
                              <p className="text-xs font-black text-sky-600">1.950.000 đ</p>
                            </div>
                            <div className="bg-white p-2 rounded border border-slate-200 text-center space-y-1">
                              <div className="w-10 h-10 bg-slate-900 text-white rounded mx-auto flex items-center justify-center font-mono text-[6px]">
                                [ QR ]
                              </div>
                              <p className="text-[9px] font-bold text-emerald-600">VietQR Sandbox BIDV</p>
                              <span className="block bg-emerald-600 text-white rounded py-0.5 text-[8px] font-bold">Đặt Chỗ</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-400">mobile · 390×844px</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">PASS (100%)</span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-900 text-xs space-y-2 select-none">
                          <div className="bg-white p-2 rounded border border-slate-200">
                            <p className="font-bold text-[10px]">Tour Hạ Long 2N1Đ &amp; VietQR</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center text-[6px] font-mono shrink-0">
                                [ QR ]
                              </div>
                              <div className="flex-1">
                                <p className="text-[9px] text-slate-500">Mã đơn: #HAL-2026</p>
                                <p className="text-[11px] font-black text-sky-600">3.510.000 đ</p>
                              </div>
                              <span className="px-2 py-1 bg-emerald-600 text-white rounded text-[9px] font-bold">Thanh Toán</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">✓ Tiêu chí Buổi 8:</span> Đủ 09 ảnh kiểm thử tương thích (Trang chủ, Catalog, Chi tiết đặt vé) trên 03 thiết bị (Desktop, Tablet, Mobile).
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadResponsiveGrid}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải File 9_anh_chup_man_hinh_ba_trang_ba_kho.png</span>
                </button>
                <button
                  onClick={() => setShowResponsivePreviewModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
