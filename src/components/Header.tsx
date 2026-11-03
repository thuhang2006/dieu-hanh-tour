import React, { useState } from 'react';
import { 
  Compass, 
  Heart, 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  ShieldCheck, 
  LogOut, 
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { AppUser } from '../types/tour';

interface HeaderProps {
  currentView: string;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenAdmin: () => void;
  bookingsCount: number;
  onOpenMyBookings: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: AppUser | null;
  onOpenAccountSwitcher: () => void;
  onQuickSwitchRole: (role: 'customer' | 'admin' | 'guest') => void;
  onLoginClick: (mode: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  activeNav,
  onSelectNav,
  onOpenAdmin,
  bookingsCount,
  onOpenMyBookings,
  wishlistCount,
  onOpenWishlist,
  isDarkMode,
  onToggleTheme,
  currentUser,
  onOpenAccountSwitcher,
  onQuickSwitchRole,
  onLoginClick,
  onLogout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors">
      {/* Top Banner Quảng Cáo & Hotline */}
      <div className="bg-[#0088cc] text-white text-[11px] py-1.5 px-4 font-semibold">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Khuyến mãi hè 2026</span>
            <span>Nhập mã <strong>SUMMER2026</strong> giảm 10% tối đa 500.000đ</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span>Hotline 24/7: <strong>1900 6868</strong></span>
            <span>Xin chào, {currentUser ? currentUser.name : 'Khách vãng lai'}</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onSelectNav('home')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center font-black shadow-md shadow-blue-500/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">DU LỊCH SỐ</span>
              <span className="text-[10px] font-black bg-blue-100 text-[#0088cc] dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded">VIỆT NAM</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Hệ thống điều hành tour & Đặt dịch vụ trực tuyến</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => onSelectNav('home')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeNav === 'home' && currentView === 'home'
                ? 'bg-slate-100 dark:bg-slate-800 text-[#0088cc] dark:text-blue-400 font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Trang Chủ
          </button>
          <button
            onClick={() => onSelectNav('tour')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeNav === 'tour'
                ? 'bg-[#0088cc] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Tour Trọn Gói
          </button>
          <button
            onClick={() => onSelectNav('stay')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeNav === 'stay'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Lưu Trú Nghỉ Dưỡng
          </button>
          <button
            onClick={() => onSelectNav('ticket')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeNav === 'ticket'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Vé Tham Quan
          </button>
          <button
            onClick={() => onSelectNav('experience')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeNav === 'experience'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Trải Nghiệm
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDarkMode ? 'Bật chế độ Sáng' : 'Bật chế độ Tối'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Account Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                {currentUser ? currentUser.name.substring(0, 2).toUpperCase() : 'KH'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {currentUser ? currentUser.name : 'Khách Vãng Lai'}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {currentUser ? currentUser.roleTitle : 'Chưa đăng nhập'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu Popup (Nơi có nút Tour Đã Lưu Yêu Thích) */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-2 z-50 text-xs"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* User Info Box */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {currentUser ? currentUser.name : 'Khách Vãng Lai'}
                    </span>
                    <span className="text-[9px] font-black bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full">
                      {currentUser ? currentUser.roleTitle : 'Guest'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {currentUser ? currentUser.email : 'dukhach@gmail.com'}
                  </p>
                </div>

                {/* 🎯 NÚT ĐƠN TOUR ĐÃ ĐẶT */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenMyBookings();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-500" />
                    <span>Đơn Tour Đã Đặt</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-black">
                    {bookingsCount}
                  </span>
                </button>

                {/* 🎯 NÚT TOUR ĐÃ LƯU YÊU THÍCH (ĐÃ SỬA LỖI ĐỂ GỌI ĐÚNG HÀM LỌC) */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenWishlist(); // <-- Gọi đúng hàm mở danh sách yêu thích
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Tour Đã Lưu Yêu Thích</span>
                  </div>
                  <span className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px] px-2 py-0.5 rounded-full font-black">
                    {wishlistCount}
                  </span>
                </button>

                {/* Phân Quản Trị / Đăng Xuất */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Trang Quản Trị Admin</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng Xuất Tài Khoản</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};