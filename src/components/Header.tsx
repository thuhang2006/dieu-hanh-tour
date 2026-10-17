import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  ChevronDown, 
  ShieldCheck, 
  Calendar, 
  Download, 
  UserCheck, 
  LogOut, 
  LogIn,
  UserPlus,
  Sun, 
  Moon,
  BarChart3,
  Camera,
  FileSpreadsheet,
  FileText,
  Sparkles,
  FlaskConical,
  FolderDown,
  Layers,
  Heart,
  User,
  UserX,
  Users,
  Shield,
  Award,
  Menu,
  X,
  Check
} from 'lucide-react';
import { AppUser } from '../types/tour';

export interface HeaderProps {
  currentView: string;
  activeNav: string; // 'home' | 'tour' | 'stay' | 'ticket' | 'experience' | 'admin-dashboard' | 'test-runner' | 'deliverables' | 'schema'
  onSelectNav: (nav: string) => void;
  onOpenAdmin: () => void;
  bookingsCount?: number;
  onOpenMyBookings?: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  currentUser?: AppUser | null;
  onOpenAccountSwitcher?: () => void;
  onLoginClick?: (mode: 'login' | 'register') => void;
  onLogout?: () => void;
  onQuickSwitchRole?: (role: 'customer' | 'admin' | 'guest') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  activeNav,
  onSelectNav,
  onOpenAdmin,
  bookingsCount = 0,
  onOpenMyBookings,
  wishlistCount = 0,
  onOpenWishlist,
  isDarkMode = false,
  onToggleTheme,
  currentUser,
  onOpenAccountSwitcher,
  onLoginClick,
  onLogout,
  onQuickSwitchRole
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-[#0088cc] text-white py-1 px-4 text-[11px] font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Khuyến mãi hè 2026: Nhập mã <strong>SUMMER2026</strong> giảm 10% tối đa 500.000đ</span>
            </span>
            <span className="hidden md:inline text-blue-200">|</span>
            <span className="hidden md:inline text-blue-100">
              Hotline 24/7: <strong>1900 6868</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            {currentUser && (
              <span className="hidden sm:inline font-semibold">
                Xin chào, {currentUser.name}
              </span>
            )}
            <button
              onClick={() => {
                if (onOpenAccountSwitcher) onOpenAccountSwitcher();
                else if (onLoginClick) onLoginClick('login');
              }}
              className="text-white hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              {currentUser ? 'Đổi tài khoản' : 'Đăng nhập ngay'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Matching Video at 00:01 */}
          <div 
            onClick={() => {
              onSelectNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group select-none text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0088cc] to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                  DU LỊCH SỐ
                </span>
                <span className="text-[10px] bg-sky-100 text-[#0088cc] dark:bg-sky-950 dark:text-sky-300 font-extrabold px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                  VIỆT NAM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Hệ thống điều hành tour &amp; Đặt dịch vụ trực tuyến
              </p>
            </div>
          </div>

          {/* Navigation Menu Matching Video at 00:01 & 00:23 */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <button
              onClick={() => onSelectNav('home')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeNav === 'home'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Trang Chủ
            </button>

            <button
              onClick={() => onSelectNav('tour')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeNav === 'tour'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Tour Trọn Gói
            </button>

            <button
              onClick={() => onSelectNav('stay')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeNav === 'stay'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Lưu Trú Nghỉ Dưỡng
            </button>

            <button
              onClick={() => onSelectNav('ticket')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeNav === 'ticket'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Vé Tham Quan
            </button>

            <button
              onClick={() => onSelectNav('experience')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeNav === 'experience'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Trải Nghiệm
            </button>
          </nav>

          {/* Right Controls: User Account or Login / Register + Dark Toggle */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              /* User Account Logged-In Capsule */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-sm transition-all text-left cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full ${currentUser.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    {currentUser.avatarText}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-tight">
                        {currentUser.name}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        currentUser.role === 'customer'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : currentUser.role === 'supplier'
                          ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                          : 'bg-blue-100 text-[#0088cc] dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}>
                        {currentUser.role === 'customer' ? '👤 Khách Hàng' : currentUser.role === 'supplier' ? '🚢 Đối Tác' : '🛡️ Quản Trị'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[140px]">
                      {currentUser.roleTitle}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {/* User Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2.5 z-50 animate-fade-in text-xs">
                    <div className="px-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {currentUser.name}
                        </h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          currentUser.role === 'customer'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : currentUser.role === 'supplier'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : 'bg-blue-100 text-[#0088cc] dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {currentUser.role === 'customer' ? 'Khách Hàng' : currentUser.role === 'supplier' ? 'Đối Tác' : 'Quản Trị'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser.email}
                      </p>

                      <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${currentUser.tierColor}`}>
                        <span>{currentUser.tierBadge}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          if (onOpenMyBookings) onOpenMyBookings();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>Đơn Tour Đã Đặt</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[10px]">
                          {bookingsCount}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          if (onOpenWishlist) onOpenWishlist();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                          <span>Tour Đã Lưu Yêu Thích</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono font-bold text-[10px]">
                          {wishlistCount}
                        </span>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenAdmin();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center gap-2.5 text-[#0088cc] dark:text-blue-400 font-semibold cursor-pointer border-t border-slate-100 dark:border-slate-800 mt-1"
                        >
                          <BarChart3 className="w-4 h-4 text-[#0088cc]" />
                          <span>Bảng Điều Khiển Quản Trị</span>
                        </button>
                      )}

                      {/* Clean 4-Role Switcher from Handbook */}
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          if (onOpenAccountSwitcher) onOpenAccountSwitcher();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-200 font-medium cursor-pointer border-t border-slate-100 dark:border-slate-800 mt-1"
                      >
                        <div className="flex items-center gap-2.5">
                          <UserCheck className="w-4 h-4 text-indigo-500" />
                          <span>Đổi Vai Trò (4 Tài Khoản Sổ Tay)</span>
                        </div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 dark:bg-indigo-950 px-2 py-0.5 rounded-full font-bold">
                          Sổ tay
                        </span>
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 px-4">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full text-left py-1.5 flex items-center gap-2 text-rose-600 font-bold hover:text-rose-700 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Đăng Xuất Tài Khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Standard Clean Logged-Out State: Đăng Nhập & Đăng Ký */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onLoginClick) onLoginClick('login');
                    else if (onOpenAccountSwitcher) onOpenAccountSwitcher();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng Nhập</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onLoginClick) onLoginClick('register');
                    else if (onOpenAccountSwitcher) onOpenAccountSwitcher();
                  }}
                  className="hidden sm:flex px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Đăng Ký</span>
                </button>
              </div>
            )}

            {/* Enhanced Dark/Light Theme Button (☀️ / 🌙) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs group"
              title={isDarkMode ? 'Nhấn để chuyển sang Chế độ Sáng ☀️' : 'Nhấn để chuyển sang Chế độ Tối 🌙'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span className="text-xs font-bold text-amber-400">Tối 🌙</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:-rotate-12 transition-transform" />
                  <span className="text-xs font-bold text-slate-600">Sáng ☀️</span>
                </>
              )}
            </button>

            {/* Hamburger Button for Mobile & Tablet (lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              title={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COLLAPSIBLE MOBILE & TABLET MENU (Khổ Điện Thoại & Tablet: Không cuộn ngang)*/}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          {/* Main Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                onSelectNav('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 ${
                activeNav === 'home'
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Trang Chủ</span>
            </button>

            <button
              onClick={() => {
                onSelectNav('tour');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 ${
                activeNav === 'tour'
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-blue-500" />
              <span>Tour Trọn Gói</span>
            </button>

            <button
              onClick={() => {
                onSelectNav('stay');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 ${
                activeNav === 'stay'
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>🏨 Lưu Trú Resort</span>
            </button>

            <button
              onClick={() => {
                onSelectNav('ticket');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 ${
                activeNav === 'ticket'
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>🎟️ Vé Thắng Cảnh</span>
            </button>

            <button
              onClick={() => {
                onSelectNav('experience');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 col-span-2 ${
                activeNav === 'experience'
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>🎭 Trải Nghiệm Bản Địa</span>
            </button>
          </div>

          {/* Quick Theme Toggle in Mobile Drawer */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
              {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Chủ đề giao diện:</span>
            </div>
            <button
              onClick={() => {
                if (onToggleTheme) onToggleTheme();
              }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-2xs hover:border-[#0088cc] cursor-pointer flex items-center gap-1.5"
            >
              {isDarkMode ? <span>🌙 Chế độ Tối</span> : <span>☀️ Chế độ Sáng</span>}
            </button>
          </div>

          {/* Quick Account Controls in Mobile */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            {currentUser ? (
              <div className="w-full flex items-center justify-between p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-900 dark:text-blue-200">
                  👤 {currentUser.name} ({currentUser.roleTitle})
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAccountSwitcher) onOpenAccountSwitcher();
                  }}
                  className="text-xs text-[#0088cc] dark:text-blue-400 font-bold hover:underline"
                >
                  Đổi vai trò
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLoginClick) onLoginClick('login');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-center"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLoginClick) onLoginClick('register');
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-center"
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
