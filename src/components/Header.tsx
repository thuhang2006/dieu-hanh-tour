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
  activeNav: string;
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
      {/* Top micro announcement bar (Đã giữ lại khuyến mãi, hotline và gỡ bỏ chữ Đăng nhập ngay) */}
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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
                Hệ thống điều hành tour & Đặt dịch vụ trực tuyến
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <button
              onClick={() => onSelectNav('home')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Trang Chủ
            </button>

            <button
              onClick={() => onSelectNav('tour')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeNav === 'tour'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Tour Trọn Gói
            </button>

            <button
              onClick={() => onSelectNav('stay')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeNav === 'stay'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Lưu Trú Nghỉ Dưỡng
            </button>

            <button
              onClick={() => onSelectNav('ticket')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeNav === 'ticket'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Vé Tham Quan
            </button>

            <button
              onClick={() => onSelectNav('experience')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeNav === 'experience'
                  ? 'bg-[#0088cc] text-white font-extrabold shadow-sm shadow-blue-500/20'
                  : 'hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Trải Nghiệm
            </button>
          </nav>

          {/* Right Controls: User Account or Login/Register + Theme Toggle */}
          <div className="flex items-center gap-3">
            {currentUser ? (
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
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[140px]">
                      {currentUser.roleTitle}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2.5 z-50 animate-fade-in text-xs">
                    <div className="px-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {currentUser.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentUser.email}
                      </p>
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

            {/* Dark/Light Theme Button */}
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

            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};