import React, { useState, useMemo, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar, 
  Filter,
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  BarChart3, 
  PieChart,
  Search,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  CreditCard,
  Clock,
  ShieldAlert,
  ChevronDown,
  RefreshCw,
  FileText,
  Layers,
  Award,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { SEASONALITY_DATA, REGION_REVENUE_DATA, MOCK_TOURS } from '../data/mockTours';
import { BookingRecord, Tour } from '../types/tour';
import { getSavedBookings, updateBookingStatus } from '../utils/bookingStore';

interface AdminDashboardProps {
  onBackToCustomer?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>(getSavedBookings());
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<'all' | 'high' | 'low'>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Booking management filter & search
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingSearchTerm, setBookingSearchTerm] = useState<string>('');

  // Reload bookings from storage
  const reloadBookings = () => {
    setBookings(getSavedBookings());
  };

  useEffect(() => {
    reloadBookings();
  }, []);

  // Filter seasonality data
  const filteredSeasonality = useMemo(() => {
    return SEASONALITY_DATA.filter(item => {
      if (selectedSeasonFilter === 'high' && item.seasonType !== 'Cao điểm') return false;
      if (selectedSeasonFilter === 'low' && item.seasonType !== 'Thấp điểm') return false;
      if (selectedQuarter === 'q1' && ![1, 2, 3].includes(item.month)) return false;
      if (selectedQuarter === 'q2' && ![4, 5, 6].includes(item.month)) return false;
      if (selectedQuarter === 'q3' && ![7, 8, 9].includes(item.month)) return false;
      if (selectedQuarter === 'q4' && ![10, 11, 12].includes(item.month)) return false;
      return true;
    });
  }, [selectedSeasonFilter, selectedQuarter]);

  // Dynamic calculations based on live bookings
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalRevenue = 128500000 + confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookingsCount = 142 + bookings.length;
  const totalTourists = 486 + bookings.reduce((sum, b) => sum + (b.paxAdults + b.paxChildren), 0);
  const avgRating = 4.88;

  // Filtered live bookings
  const displayedBookings = useMemo(() => {
    return bookings.filter(b => {
      if (bookingFilterStatus !== 'all' && b.status !== bookingFilterStatus) return false;
      if (bookingSearchTerm.trim()) {
        const term = bookingSearchTerm.toLowerCase().trim();
        const str = `${b.id} ${b.customerName} ${b.customerPhone} ${b.tourTitle}`.toLowerCase();
        if (!str.includes(term)) return false;
      }
      return true;
    });
  }, [bookings, bookingFilterStatus, bookingSearchTerm]);

  // Action: Confirm payment
  const handleApprovePayment = (id: string) => {
    const updated = updateBookingStatus(id, 'confirmed');
    setBookings(updated);
    setNotification({
      type: 'success',
      message: `Đã xác nhận thanh toán thành công cho đơn hàng #${id}!`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Action: Refund request
  const handleRequestRefund = (booking: BookingRecord) => {
    if (booking.status === 'pending_payment') {
      setNotification({
        type: 'error',
        message: `Đơn #${booking.id} đang ở trạng thái chưa thanh toán. Máy trạng thái chặn hoàn tiền đối với đơn chưa phát sinh giao dịch!`
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    if (booking.status === 'confirmed') {
      const updated = updateBookingStatus(booking.id, 'refunded');
      setBookings(updated);
      setNotification({
        type: 'info',
        message: `Đã duyệt hoàn tiền ${(booking.totalAmount).toLocaleString('vi-VN')} đ cho đơn #${booking.id} theo chính sách hoàn trả.`
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Action: Cancel booking
  const handleCancelBooking = (id: string) => {
    const updated = updateBookingStatus(id, 'cancelled');
    setBookings(updated);
    setNotification({
      type: 'info',
      message: `Đã hủy chỗ và hoàn trả số lượng ghế tồn cho đơn #${id}.`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Top 3 best selling tours calculation
  const topTours = useMemo(() => {
    return [
      {
        rank: 1,
        id: 1,
        title: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
        category: 'Tour Trọn Gói',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
        orders: 14,
        revenue: 27300000,
        occupancy: 92,
        badgeColor: 'bg-amber-500 text-white'
      },
      {
        rank: 2,
        id: 5,
        title: 'Hành Trình Di Sản Miền Trung: Huế - Đà Nẵng - Hội An 4N3Đ',
        category: 'Tour Trọn Gói',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
        orders: 11,
        revenue: 25190000,
        occupancy: 88,
        badgeColor: 'bg-slate-400 text-white'
      },
      {
        rank: 3,
        id: 3,
        title: 'Legacy Yên Tử MGallery 5 Sao 2N1Đ Sang Trọng',
        category: 'Lưu Trú Nghỉ Dưỡng',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        orders: 9,
        revenue: 23400000,
        occupancy: 82,
        badgeColor: 'bg-amber-700 text-white'
      }
    ];
  }, []);

  return (
    <div id="admin-dashboard-container" className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 max-w-7xl mx-auto w-full pb-12">
      {/* ========================================================================= */}
      {/* 1. CLEAN ADMIN HEADER                                                     */}
      {/* ========================================================================= */}
      <div className="pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Bảng Điều Khiển Quản Trị
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tổng quan doanh thu, đơn đặt tour và hoạt động vận hành
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-3 animate-fade-in shadow-md ${
          notification.type === 'error'
            ? 'bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            : notification.type === 'info'
            ? 'bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200'
            : 'bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
        }`}>
          <div className="flex items-center gap-2.5">
            {notification.type === 'error' ? (
              <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0" />
            ) : notification.type === 'info' ? (
              <RotateCcw className="w-5 h-5 text-blue-500 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. 4 EXECUTIVE KPI STAT CARDS (Elevated & Visual Polish)                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Doanh Thu */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute top-0 left-6 right-6 h-1 rounded-t-3xl bg-gradient-to-r from-blue-500 to-cyan-400" />
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">Tổng Doanh Thu</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-[#0088cc] dark:text-sky-400 ring-1 ring-blue-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
            {(totalRevenue / 1000000).toFixed(1)} <span className="text-lg font-bold text-slate-500 dark:text-slate-400">triệu đ</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4%</span>
            </span>
            <span className="text-slate-400 font-medium">So với cùng kỳ 2025</span>
          </div>
        </div>

        {/* KPI 2: Tổng Đơn Tour */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute top-0 left-6 right-6 h-1 rounded-t-3xl bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">Đơn Hàng &amp; Giữ Chỗ</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
            {totalBookingsCount} <span className="text-lg font-bold text-slate-500 dark:text-slate-400">đơn</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>94.2%</span>
            </span>
            <span className="text-slate-400 font-medium">Tỷ lệ thanh toán hoàn tất</span>
          </div>
        </div>

        {/* KPI 3: Lượt Khách */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute top-0 left-6 right-6 h-1 rounded-t-3xl bg-gradient-to-r from-amber-500 to-orange-400" />
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">Lượt Khách Phục Vụ</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
            {totalTourists} <span className="text-lg font-bold text-slate-500 dark:text-slate-400">khách</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              78.9%
            </span>
            <span className="text-slate-400 font-medium">Công suất lấp đầy bình quân</span>
          </div>
        </div>

        {/* KPI 4: Đánh Giá Trung Bình */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
          <div className="absolute top-0 left-6 right-6 h-1 rounded-t-3xl bg-gradient-to-r from-rose-500 to-pink-500" />
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">Chất Lượng Dịch Vụ</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <Star className="w-5 h-5 fill-rose-500" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline gap-1">
            <span>{avgRating}</span>
            <span className="text-base text-slate-400 font-normal">/ 5.0</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>98.6%</span>
            </span>
            <span className="text-slate-400 font-medium">Khách hàng hài lòng</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EXECUTIVE ANALYTICS: TOP TOURS & OPERATIONAL METRICS                    */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0088cc] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Hiệu Quả Kinh Doanh &amp; Top Sản Phẩm Tour Dẫn Đầu
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-9">
              Thống kê sản phẩm lữ hành có đóng góp doanh thu lớn nhất cùng tỷ lệ lấp chỗ thực tế.
            </p>
          </div>

          <div className="flex items-center gap-2 pl-9 sm:pl-0">
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bán chạy nhất tháng</span>
            </span>
          </div>
        </div>

        {/* 4 Summary Metric Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all hover:bg-slate-100/60">
            <span className="text-slate-500 dark:text-slate-400 text-xs block font-semibold">Doanh Thu Cơ Sở Đạt</span>
            <span className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1 block">128.500.000 đ</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">+18.4% tăng trưởng</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all hover:bg-slate-100/60">
            <span className="text-slate-500 dark:text-slate-400 text-xs block font-semibold">Đơn Khách Hoàn Tất</span>
            <span className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1 block">35 đơn thử nghiệm</span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5 block">Tỷ lệ thanh toán 94.2%</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all hover:bg-slate-100/60">
            <span className="text-slate-500 dark:text-slate-400 text-xs block font-semibold">Sản Phẩm Đang Mở Bán</span>
            <span className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1 block">20 tour &amp; resort</span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5 block">100% hoạt động</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all hover:bg-slate-100/60">
            <span className="text-slate-500 dark:text-slate-400 text-xs block font-semibold">Tỉnh Thành Phủ Sóng</span>
            <span className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1 block">25 địa danh</span>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5 block">Bắc - Trung - Nam</span>
          </div>
        </div>

        {/* Top 3 Bestseller Tour Cards with Visual Images */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Bảng Xếp Hạng 3 Tour Có Doanh Số Cao Nhất:</span>
            </h3>
            <span className="text-[11px] text-slate-400">Cập nhật theo dữ liệu đặt tour</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topTours.map((t) => (
              <div 
                key={t.id}
                className="group relative bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={t.image} 
                      alt={t.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <span className={`absolute top-1 left-1 w-5 h-5 rounded-full ${t.badgeColor} font-black text-[10px] flex items-center justify-center shadow-md`}>
                      {t.rank}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#0088cc] dark:text-sky-400 block mb-0.5">
                      {t.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                      {t.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Doanh thu đạt</span>
                    <span className="text-xs font-mono font-black text-rose-600 dark:text-rose-400">
                      {t.revenue.toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t.orders} đơn đặt</span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {t.occupancy}% lấp đầy
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LIVE BOOKINGS MANAGEMENT & ORDER STATE MACHINE TABLE                     */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Quản Trị Đơn Hàng &amp; Máy Trạng Thái (State Machine)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-9">
              Quy trình điều hành tour: Giữ chỗ 15 phút (pending_payment), xác nhận thanh toán (confirmed), duyệt hoàn tiền (refunded) và quản lý hủy đơn.
            </p>
          </div>

          <div className="flex items-center gap-2 pl-9 sm:pl-0">
            <button
              onClick={reloadBookings}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Làm mới bảng đơn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tải Lại</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { key: 'all', label: `Tất cả (${bookings.length})` },
              { key: 'confirmed', label: `Đã thanh toán (${bookings.filter(b => b.status === 'confirmed').length})` },
              { key: 'pending_payment', label: `Đang giữ chỗ (${bookings.filter(b => b.status === 'pending_payment').length})` },
              { key: 'refunded', label: `Đã hoàn tiền (${bookings.filter(b => b.status === 'refunded').length})` },
              { key: 'cancelled', label: `Đã hủy (${bookings.filter(b => b.status === 'cancelled').length})` }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setBookingFilterStatus(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  bookingFilterStatus === tab.key
                    ? 'bg-[#0088cc] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={bookingSearchTerm}
              onChange={(e) => setBookingSearchTerm(e.target.value)}
              placeholder="Tìm mã đơn, tên khách, số điện thoại..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs font-medium focus:outline-none focus:border-[#0088cc] transition-colors"
            />
            {bookingSearchTerm && (
              <button
                onClick={() => setBookingSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bookings Table with Enhanced Polish */}
        <div className="overflow-x-auto border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Mã Đơn</th>
                <th className="py-3.5 px-4">Tour / Dịch Vụ</th>
                <th className="py-3.5 px-4">Khách Hàng</th>
                <th className="py-3.5 px-4">Khởi Hành</th>
                <th className="py-3.5 px-4 text-right">Tổng Tiền</th>
                <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                <th className="py-3.5 px-4 text-center">Hành Động Quản Trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {displayedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShoppingBag className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                      <span>Không tìm thấy đơn hàng nào khớp với điều kiện lọc.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#0088cc] dark:text-sky-400">{b.id}</span>
                      {b.transactionRef && (
                        <span className="block text-[10px] text-slate-400 font-mono truncate max-w-[120px] mt-0.5">
                          {b.transactionRef}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-[220px]">
                        {b.tourTitle}
                      </div>
                      <span className="text-[10px] text-slate-400">{b.tourCategory || 'Tour trọn gói'}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                          {b.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{b.customerName}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{b.customerPhone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span>{b.departureDate}</span>
                      <span className="block text-[10px] text-slate-400">{b.paxAdults + b.paxChildren} khách</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {b.totalAmount.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {b.status === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                          <Check className="w-3 h-3" />
                          <span>Đã thanh toán</span>
                        </span>
                      ) : b.status === 'pending_payment' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>Chờ giữ chỗ (15p)</span>
                        </span>
                      ) : b.status === 'refunded' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
                          <RotateCcw className="w-3 h-3" />
                          <span>Đã hoàn tiền</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          <X className="w-3 h-3" />
                          <span>Đã hủy</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {b.status === 'pending_payment' && (
                          <button
                            onClick={() => handleApprovePayment(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                            title="Xác nhận thanh toán thủ công"
                          >
                            <Check className="w-3 h-3" />
                            <span>Duyệt Tiền</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleRequestRefund(b)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
                            b.status === 'confirmed'
                              ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-800'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 dark:border-slate-700'
                          }`}
                          title={b.status === 'pending_payment' ? 'Thử nghiệm máy trạng thái: Chặn hoàn tiền đơn chưa thanh toán' : 'Hoàn tiền cho khách'}
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Hoàn Tiền</span>
                        </button>

                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 text-slate-600 dark:text-slate-300 font-bold text-[11px] transition-colors cursor-pointer"
                            title="Hủy đơn hàng"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. VISUAL ANALYTIC CHARTS: REGION REVENUE + 12-MONTH SEASONALITY          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* BIỂU ĐỒ 1: DOANH THU THEO VÙNG MIỀN (5 Cột) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0088cc] flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  1. Doanh Thu Theo Vùng Miền
                </h3>
              </div>
              <span className="text-[11px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-2.5 py-0.5 rounded-full">
                4 Trọng Điểm
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 pl-9">
              Phân tích cơ cấu nguồn thu lữ hành để tối ưu phương tiện, hướng dẫn viên và hợp đồng khách sạn.
            </p>

            <div className="space-y-4">
              {REGION_REVENUE_DATA.map((item, idx) => {
                const percent = Math.round((item.revenue / 128500000) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {item.region}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 dark:text-white font-mono">
                          {(item.revenue / 1000000).toFixed(1)} tr ({percent}%)
                        </span>
                        <span className="text-slate-400 ml-1.5 font-normal">
                          · {item.bookingsCount} đơn
                        </span>
                      </div>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${percent}%`, 
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex justify-between items-center">
            <span>Mô hình CSDL: <strong className="text-slate-700 dark:text-slate-300">destinations &amp; orders</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn hóa 100%
            </span>
          </div>
        </div>

        {/* BIỂU ĐỒ 2: TỶ LỆ LẤP CHỖ THEO MÙA VỤ 12 THÁNG (7 Cột) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  2. Tỷ Lệ Lấp Chỗ 12 Tháng (Seasonality Rate)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phân tích mùa cao điểm &amp; thấp điểm từ thuật toán Python (analytics.py)
                </p>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <select
                value={selectedSeasonFilter}
                onChange={(e) => setSelectedSeasonFilter(e.target.value as any)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc] cursor-pointer"
              >
                <option value="all">Tất cả mùa</option>
                <option value="high">Chỉ Mùa Cao Điểm (&gt;80%)</option>
                <option value="low">Chỉ Mùa Thấp Điểm (&lt;80%)</option>
              </select>

              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc] cursor-pointer"
              >
                <option value="all">Cả năm 2026</option>
                <option value="q1">Quý 1 (Tết / Xuân)</option>
                <option value="q2">Quý 2 (Hè sớm)</option>
                <option value="q3">Quý 3 (Cao điểm hè)</option>
                <option value="q4">Quý 4 (Thu Đông)</option>
              </select>
            </div>
          </div>

          {/* Bar Chart Visualization with Benchmark Line */}
          <div className="mt-6 mb-4">
            <div className="relative h-52 flex items-end gap-1.5 sm:gap-2.5 pt-8 pb-2 border-b border-slate-200 dark:border-slate-800">
              {/* 80% Benchmark Target Threshold Line */}
              <div 
                className="absolute left-0 right-0 border-b border-dashed border-rose-400/80 dark:border-rose-500/80 pointer-events-none z-10 flex items-center justify-end pr-2"
                style={{ bottom: `${(80 / 100) * 160 + 10}px` }}
              >
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-white/90 dark:bg-slate-900/90 px-1.5 py-0.5 rounded shadow-xs">
                  Mục tiêu 80%
                </span>
              </div>

              {filteredSeasonality.map((stat) => {
                const isHighSeason = stat.seasonType === 'Cao điểm';
                return (
                  <div key={stat.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap">
                      <div className="font-bold">{stat.monthName}: {stat.occupancyRate}%</div>
                      <div className="text-slate-300">Đã bán: {stat.seatsSold}/{stat.totalSeats} chỗ</div>
                    </div>

                    {/* Bar */}
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer ${
                        isHighSeason 
                          ? 'bg-gradient-to-t from-amber-500 to-orange-400 group-hover:from-amber-600 group-hover:to-orange-500 shadow-xs' 
                          : 'bg-gradient-to-t from-[#0088cc] to-sky-400 group-hover:from-blue-600 group-hover:to-sky-500 shadow-xs'
                      }`}
                      style={{ height: `${Math.max(16, (stat.occupancyRate / 100) * 160)}px` }}
                    />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2 truncate w-full text-center">
                      T{stat.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend and Analysis Notes */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-gradient-to-r from-amber-500 to-orange-400" />
                <span className="text-slate-600 dark:text-slate-400">Cao Điểm (&gt; 80%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-gradient-to-r from-[#0088cc] to-sky-400" />
                <span className="text-slate-600 dark:text-slate-400">Thấp Điểm (&lt; 80%)</span>
              </div>
            </div>

            <span className="text-slate-500">
              Công suất bình quân cả năm: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">78.9%</strong>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
