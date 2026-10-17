import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  FlaskConical, 
  FolderDown, 
  Sun, 
  Moon, 
  Database,
  Table,
  CheckCircle2,
  Globe,
  Compass,
  ArrowRightLeft
} from 'lucide-react';

interface NavbarProps {
  appMode: 'client' | 'admin';
  onChangeAppMode: (mode: 'client' | 'admin') => void;
  activeTab: 'client-home' | 'dashboard' | 'tour-detail' | 'test-runner' | 'deliverables' | 'schema';
  onSelectTab: (tab: 'client-home' | 'dashboard' | 'tour-detail' | 'test-runner' | 'deliverables' | 'schema') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  appMode,
  onChangeAppMode,
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme
}) => {
  return (
    <header className="bg-[#0b1329] border-b border-slate-800 text-slate-100 shadow-xl sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Branding Header Row */}
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onChangeAppMode('client');
                onSelectTab('client-home');
              }}
              className="text-left flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-900/30">
                <Compass className="w-6 h-6 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded tracking-wide uppercase">
                    CSE703073 · ĐỀ TÀI 13
                  </span>
                  <span className="text-sm font-black text-white tracking-tight">
                    Hệ Thống Điều Hành Tour Lữ Hành
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Sinh viên: <strong className="text-slate-200">Nguyễn Thu Hà (24107631 - V4+V5)</strong>
                </p>
              </div>
            </button>
          </div>

          {/* Mode Switcher Button (Client ↔ Admin) */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => {
                  onChangeAppMode('client');
                  onSelectTab('client-home');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  appMode === 'client'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🌐 Giao Diện Khách Hàng</span>
              </button>

              <button
                onClick={() => {
                  onChangeAppMode('admin');
                  onSelectTab('dashboard');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  appMode === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>🛡️ Phân Hệ Quản Trị (V4+V5)</span>
              </button>
            </div>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
              title={isDarkMode ? 'Chế độ Sáng' : 'Chế độ Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-300" />}
            </button>
          </div>
        </div>

        {/* Dynamic Sub-Navigation Bar based on Active Mode */}
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none text-xs">
          {appMode === 'client' ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectTab('client-home')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'client-home'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Trang Chủ / Tìm Kiếm Tour</span>
              </button>

              <button
                onClick={() => onSelectTab('tour-detail')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'tour-detail'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Chi Tiết Tour (V4)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>1. Admin Dashboard (V4)</span>
              </button>

              <button
                onClick={() => onSelectTab('tour-detail')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'tour-detail'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>2. Chi Tiết Tour (V4)</span>
              </button>

              <button
                onClick={() => onSelectTab('test-runner')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'test-runner'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>3. 05 Ca Test Buổi 7 (V5)</span>
              </button>

              <button
                onClick={() => onSelectTab('schema')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'schema'
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>4. Tra cứu CSDL (12 Bảng)</span>
              </button>

              <button
                onClick={() => onSelectTab('deliverables')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'deliverables'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FolderDown className="w-3.5 h-3.5" />
                <span>5. Xuất Tệp Minh Chứng</span>
              </button>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span>CSDL: <strong>12 bảng · 4.242 bản ghi</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};
