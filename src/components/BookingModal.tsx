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
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span>Số tiền:</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{totalAmount.toLocaleString('vi-VN')} VNĐ</strong>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span>Môi trường:</span>
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-bold text-[10px]">
                    Sandbox Test Mode
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
                  <div>• Thẻ thử nghiệm: <code>9704 0000 0000 0001 (NGUYEN THU HA)</code></div>
                  <div>• Mã giao dịch tự động sinh: <code>SBX2026100709513783250B</code></div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2 text-xs">
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-2">
                    <QrCode className="w-16 h-16 text-cyan-400" />
                    <span className="text-[9px] font-mono mt-1 text-slate-300">VIETQR NAPAS 247</span>
                  </div>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Quét mã để thanh toán {totalAmount.toLocaleString('vi-VN')} đ
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  Nội dung chuyển khoản: <strong>{bookingCode}</strong>
                </p>
              </div>
            )}

            {/* Test Action Buttons for Buổi 7 (Ca 1 & Ca 2) */}
            <div className="pt-2 space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePayCancelMidway}
                  className="flex-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all"
                  title="Kiểm thử Ca 2: Hủy thanh toán giữa chừng, đơn giữ nguyên trạng thái chờ"
                >
                  Hủy thanh toán giữa chừng (Ca 2)
                </button>

                <button
                  type="button"
                  onClick={handlePaySandboxSuccess}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 active:scale-95 transition-all"
                  title="Kiểm thử Ca 1: Thanh toán Sandbox thành công"
                >
                  Xác nhận thanh toán thành công (Ca 1)
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400">
                Nhấn vào một trong hai nút để thực thi và quan sát máy trạng thái đơn hàng Buổi 7.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Success state (Ca 1 verified) */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-4 text-xs">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                Ca 1: Thanh Toán Sandbox Thành Công (HTTP 200 OK)
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                Đã Xác Nhận Đơn Hàng #{bookingCode}
              </h2>
              <p className="text-slate-500 mt-1">
                Giao dịch được ghi nhận qua cổng Sandbox. Mã tham chiếu: <code>SBX2026100709513783250B</code>
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left font-mono text-[11px] space-y-1 text-slate-700 dark:text-slate-300">
              <div>• Trạng thái đơn: <strong className="text-emerald-600">da_thanh_toan (confirmed)</strong></div>
              <div>• Suất chỗ: <strong className="text-blue-600">seats_sold += {pax}</strong> (Đã chốt)</div>
              <div>• Số tiền thực thu: <strong>{totalAmount.toLocaleString('vi-VN')} VNĐ</strong></div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold"
            >
              Đóng và quay lại
            </button>
          </div>
        )}

        {/* Step 4: Cancelled state (Ca 2 verified) */}
        {step === 'cancelled' && (
          <div className="text-center py-6 space-y-4 text-xs">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                Ca 2: Hủy Thanh Toán Giữa Chừng
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                Đơn Hàng Giữ Nguyên Trạng Thái Chờ
              </h2>
              <p className="text-slate-500 mt-1">
                Khách hủy giữa chừng tại cổng thanh toán. Đơn vẫn giữ chỗ an toàn, không bị trừ sai số chỗ!
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left font-mono text-[11px] space-y-1 text-slate-700 dark:text-slate-300">
              <div>• Trạng thái đơn: <strong className="text-amber-600">pending_payment (holding)</strong></div>
              <div>• Thời gian giữ chỗ còn lại: <strong>{formatTimer(secondsRemaining)}</strong></div>
              <div>• Tồn kho: <strong className="text-emerald-600">Bảo toàn nguyên vẹn</strong></div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold"
            >
              Đóng và tiếp tục duyệt tour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
