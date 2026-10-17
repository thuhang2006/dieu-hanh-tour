import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  QrCode, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Printer
} from 'lucide-react';
import { BookingRecord, AppUser } from '../types/tour';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onSelectTour: (tourId: number) => void;
  onCancelHoldBooking?: (bookingId: string) => void;
  currentUser?: AppUser;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onSelectTour,
  onCancelHoldBooking,
  currentUser
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  if (!isOpen) return null;

  const filtered = bookings.filter(b => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đã thanh toán (Thành công)
          </span>
        );
      case 'pending_payment':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 flex items-center gap-1 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Đang giữ chỗ 15 phút (Chờ thanh toán)
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Đã hủy chỗ
          </span>
        );
      case 'refunded':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
            Đã hoàn tiền
          </span>
        );
    }
  };

  const handlePrint = (booking: BookingRecord) => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Danh Sách Đơn Tour &amp; Dịch Vụ Đã Đặt
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tài khoản: <strong className="text-[#0088cc] dark:text-blue-400">{currentUser?.name || 'Nguyễn Thu Hà'}</strong> ({currentUser?.email || 'nguyenthuha201106@gmail.com'}) • {bookings.length} đơn hàng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { key: 'all', label: `Tất cả (${bookings.length})` },
            { key: 'confirmed', label: `Đã thanh toán (${bookings.filter(b => b.status === 'confirmed').length})` },
            { key: 'pending_payment', label: `Đang giữ chỗ (${bookings.filter(b => b.status === 'pending_payment').length})` },
            { key: 'refunded', label: `Hoàn tiền (${bookings.filter(b => b.status === 'refunded').length})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                filterStatus === tab.key
                  ? 'bg-[#0088cc] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-500 font-medium">Chưa có đơn hàng nào trong mục này.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-[#0088cc]/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {item.tourImage && (
                    <img 
                      src={item.tourImage} 
                      alt={item.tourTitle}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" 
                    />
                  )}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#0088cc] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                        {item.id}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {item.tourTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>Khởi hành: <strong className="text-slate-700 dark:text-slate-200">{item.departureDate}</strong></span>
                      <span>•</span>
                      <span>Số khách: <strong className="text-slate-700 dark:text-slate-200">{item.paxAdults} Lớn{item.paxChildren > 0 ? `, ${item.paxChildren} Trẻ` : ''}</strong></span>
                      <span>•</span>
                      <span>Tổng tiền: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{item.totalAmount.toLocaleString('vi-VN')} đ</strong></span>
                    </div>

                    {item.transactionRef && (
                      <p className="text-[11px] text-slate-400 font-mono">
                        Mã giao dịch: {item.transactionRef}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectTour(item.tourId);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-[#0088cc] hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Xem Tour</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {item.status === 'confirmed' && (
                    <button
                      onClick={() => handlePrint(item)}
                      className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold transition-all flex items-center gap-1.5"
                      title="In hóa đơn & vé điện tử"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">In Vé</span>
                    </button>
                  )}

                  {item.status === 'pending_payment' && onCancelHoldBooking && (
                    <button
                      onClick={() => onCancelHoldBooking(item.id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-all"
                    >
                      Hủy Giữ Chỗ
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Mã hóa bảo vệ thông tin đặt vé chuẩn ISO/IEC 27001.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
