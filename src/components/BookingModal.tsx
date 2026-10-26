import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Tour, AppUser } from '../types/tour';

interface BookingModalProps {
  tour: Tour;
  onClose: () => void;
  onPaymentSuccess?: (bookingCode: string, amount: number) => void;
  onPaymentCancel?: (bookingCode: string) => void;
  currentUser?: AppUser | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tour,
  onClose,
  onPaymentSuccess,
  onPaymentCancel,
  currentUser
}) => {
  const [pax, setPax] = useState<number>(2);
  const [departureDate, setDepartureDate] = useState<string>('2026-11-20');
  const [customerName, setCustomerName] = useState<string>(currentUser ? currentUser.name : 'Trần Văn Nam');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser ? currentUser.phone : '0988.123.456');
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser ? currentUser.email : 'tranvannam@gmail.com');
  
  // 15-minute hold timer (900 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(900);
  const [bookingCode, setBookingCode] = useState<string>('BK-892101');
  const [step, setStep] = useState<'hold' | 'payment' | 'success' | 'cancelled'>('hold');
  const [paymentGateway, setPaymentGateway] = useState<'sandbox' | 'vietqr'>('sandbox');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalAmount = tour.base_price * pax;

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleConfirmHold = (e: React.FormEvent) => {
    e.preventDefault();
    if (pax > tour.remainingSeats) {
      setErrorMessage(`Rất tiếc! Tour chỉ còn ${tour.remainingSeats} chỗ khả dụng. Vui lòng giảm số lượng khách.`);
      return;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam đơn giản
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(customerPhone)) {
      setErrorMessage("Số điện thoại không hợp lệ! Vui lòng nhập đúng 10-11 chữ số bắt đầu bằng số 0.");
      return;
    }

    setErrorMessage(null);
    setStep('payment');
  };

  const handlePaySandboxSuccess = () => {
    setStep('success');
    if (onPaymentSuccess) {
      onPaymentSuccess(bookingCode, totalAmount);
    }
  };

  const handlePayCancelMidway = () => {
    setStep('cancelled');
    if (onPaymentCancel) {
      onPaymentCancel(bookingCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-fade-in my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Holding & Guest details */}
        {step === 'hold' && (
          <form onSubmit={handleConfirmHold} className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Khóa giữ chỗ trực tuyến (Hold 15 Phút)
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {tour.title}
              </h2>
              <p className="text-xs text-slate-500">
                {tour.destination} · {tour.province} · {tour.duration_days}N{tour.duration_days - 1}Đ
              </p>
            </div>

            {/* Hold Timer Alert */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200">
                <Clock className="w-4 h-4 text-blue-600 animate-spin-slow" />
                <span>Thời hạn giữ chỗ khả dụng:</span>
              </div>
              <span className="font-mono font-black text-sm text-blue-700 dark:text-blue-400">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Ngày khởi hành:
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Số lượng hành khách:
                </label>
                <div className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 rounded-lg p-1 bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    className="w-7 h-7 rounded bg-slate-200 dark:bg-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold font-mono">{pax}</span>
                  <button
                    type="button"
                    onClick={() => setPax(pax + 1)}
                    className="w-7 h-7 rounded bg-slate-200 dark:bg-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Họ tên người liên hệ:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Số điện thoại:</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Email:</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Total calculation */}
            <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500">Đơn giá: {tour.base_price.toLocaleString('vi-VN')} đ × {pax} khách</span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  Tổng tiền thanh toán:
                </div>
              </div>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                {totalAmount.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-900/20"
              >
                Tiếp tục đến bước thanh toán
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Portal (Testing Ca 1 & Ca 2) */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  MÃ ĐƠN: <strong className="font-mono text-slate-900 dark:text-white">{bookingCode}</strong>
                </span>
                <span className="text-xs font-mono font-bold text-amber-600 flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                  <Clock className="w-3.5 h-3.5" /> {formatTimer(secondsRemaining)}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                Chọn Cổng Thanh Toán Trực Tuyến
              </h2>
            </div>

            {/* Payment Options Selector */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentGateway('sandbox')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  paymentGateway === 'sandbox'
                    ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4 text-blue-600" />
                <div>
                  <div>Cổng Sandbox</div>
                  <span className="text-[10px] text-slate-400 font-normal">Thử nghiệm thanh toán</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentGateway('vietqr')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  paymentGateway === 'vietqr'
                    ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <div>
                  <div>VietQR Napas 247</div>
                  <span className="text-[10px] text-slate-400 font-normal">Chuyển khoản tự động</span>
                </div>
              </button>
            </div>

            {/* Gateway UI preview */}
            {paymentGateway === 'sandbox' ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate