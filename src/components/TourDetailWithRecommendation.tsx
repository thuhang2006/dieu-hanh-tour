import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ArrowUpRight,
  Power, 
  Info, 
  AlertCircle,
  X,
  CreditCard,
  QrCode,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Compass,
  Tag,
  Printer,
  Heart,
  MessageSquare,
  Send,
  Check
} from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import { Tour, BookingRecord, UserReview, AppUser } from '../types/tour';
import { saveBooking, getSavedReviews, addReviewToTour, toggleWishlist, getSavedWishlist } from '../utils/bookingStore';

interface TourDetailWithRecommendationProps {
  tourId?: number;
  onGoHome: () => void;
  onOpenAdmin: () => void;
  onSelectOtherTour?: (id: number) => void;
  onBookingCreated?: (booking: BookingRecord) => void;
  currentUser?: AppUser;
}

export const TourDetailWithRecommendation: React.FC<TourDetailWithRecommendationProps> = ({
  tourId = 1,
  onGoHome,
  onOpenAdmin,
  onSelectOtherTour,
  onBookingCreated,
  currentUser
}) => {
  const currentTour: Tour = MOCK_TOURS.find(t => t.id === tourId) || MOCK_TOURS[0];

  // Gallery state (swap active image)
  const allImages = [
    currentTour.image,
    ...(currentTour.side_images || [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
    ])
  ];
  const [activeImage, setActiveImage] = useState<string>(allImages[0]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>(getSavedWishlist());
  const isLiked = wishlist.includes(currentTour.id);

  const handleToggleLike = () => {
    const updated = toggleWishlist(currentTour.id);
    setWishlist(updated);
  };

  // Itinerary accordion state
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Booking Form State
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [paxAdults, setPaxAdults] = useState<number>(2);
  const [paxChildren, setPaxChildren] = useState<number>(0);
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Trần Văn Nam');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '0988.123.456');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'tranvannam@gmail.com');
  const [customerNote, setCustomerNote] = useState('');

  // Voucher state
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; msg: string } | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  // 15:00 countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(900);
  
  // Payment Gateway Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'sandbox_card' | 'sandbox_qr'>('sandbox_card');
  const [cardNumber, setCardNumber] = useState('9704-8888-9999-PASS');
  const [cardHolder, setCardHolder] = useState(currentUser ? currentUser.name.toUpperCase() : 'TRAN VAN NAM');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardOtp, setCardOtp] = useState('123456');

  // Booking Success Invoice State
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);

  // Sync inputs if user changes
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerPhone(currentUser.phone);
      setCustomerEmail(currentUser.email);
      setCardHolder(currentUser.name.toUpperCase());
      setNewReviewAuthor(currentUser.name);
    } else {
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      setCardHolder('KHACH VANG LAI');
      setNewReviewAuthor('Khách Vãng Lai');
    }
  }, [currentUser]);

  // Reviews state
  const [reviews, setReviews] = useState<UserReview[]>(getSavedReviews(currentTour.id));
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>(currentUser?.name || 'Trần Văn Nam');
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  // Reset active image when tour changes
  useEffect(() => {
    setActiveImage(currentTour.image);
    setReviews(getSavedReviews(currentTour.id));
  }, [currentTour.id]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync booking customer details when currentUser switches
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerPhone(currentUser.phone);
      setCustomerEmail(currentUser.email);
      const latinName = currentUser.name
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Z\s]/g, '');
      setCardHolder(latinName || 'NGUYEN THU HA');
    }
  }, [currentUser]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Price calculations
  const adultSubtotal = currentTour.base_price * paxAdults;
  const childSubtotal = Math.round(currentTour.base_price * 0.7 * paxChildren);
  const subtotalBeforeDiscount = adultSubtotal + childSubtotal;
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const totalAmount = Math.max(0, subtotalBeforeDiscount - discountAmount);

  // Voucher application
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError(null);
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'GIAM10') {
      const disc = Math.round(subtotalBeforeDiscount * 0.1);
      setAppliedVoucher({ code, discount: disc, msg: 'Đã áp dụng giảm 10% tổng đơn!' });
    } else if (code === 'HALONG500') {
      const disc = Math.min(500000, subtotalBeforeDiscount);
      setAppliedVoucher({ code, discount: disc, msg: 'Đã áp dụng giảm 500.000 đ!' });
    } else if (code === 'VOUCHERVIP') {
      const disc = Math.round(subtotalBeforeDiscount * 0.15);
      setAppliedVoucher({ code, discount: disc, msg: 'Đã áp dụng mã VIP giảm 15%!' });
    } else {
      setVoucherError('Mã không hợp lệ hoặc đã hết lượt. Thử: GIAM10 hoặc HALONG500');
    }
  };

  // Submit booking form -> opens payment dialog
  const handleOpenCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  // Complete Payment (TC-M3-PAY-001)
  const handleConfirmSandboxPayment = () => {
    const newBookingId = `BK-${Date.now().toString().slice(-6)}`;
    const newTxnRef = `SBX${new Date().getFullYear()}${String(Date.now()).slice(-8)}PASS`;
    
    const record: BookingRecord = {
      id: newBookingId,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      tourCategory: currentTour.category,
      customerName,
      customerPhone,
      customerEmail,
      customerNote,
      departureDate,
      paxAdults,
      paxChildren,
      totalAmount,
      discountAmount,
      voucherCode: appliedVoucher?.code,
      status: 'confirmed',
      paymentMethod,
      transactionRef: newTxnRef,
      createdAt: new Date().toLocaleString('vi-VN'),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toLocaleString('vi-VN')
    };

    saveBooking(record);
    if (onBookingCreated) onBookingCreated(record);
    setCreatedBooking(record);
    setIsPaymentModalOpen(false);
    setShowSuccessModal(true);
  };

  // Cancel Payment Mid-way (TC-M3-PAY-002)
  const handleCancelSandboxPayment = () => {
    const newBookingId = `BK-${Date.now().toString().slice(-6)}`;
    const record: BookingRecord = {
      id: newBookingId,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      tourCategory: currentTour.category,
      customerName,
      customerPhone,
      customerEmail,
      customerNote,
      departureDate,
      paxAdults,
      paxChildren,
      totalAmount,
      discountAmount,
      voucherCode: appliedVoucher?.code,
      status: 'pending_payment',
      paymentMethod,
      createdAt: new Date().toLocaleString('vi-VN'),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toLocaleString('vi-VN')
    };

    saveBooking(record);
    if (onBookingCreated) onBookingCreated(record);
    setCreatedBooking(record);
    setIsPaymentModalOpen(false);
    setShowSuccessModal(true);
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const updated = addReviewToTour(currentTour.id, {
      userName: newReviewAuthor.trim() || 'Nguyễn Thu Hà',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });
    setReviews(updated);
    setNewReviewComment('');
    setReviewSuccessMsg('Cảm ơn bạn! Đánh giá đã được đăng thành công.');
    setTimeout(() => setReviewSuccessMsg(null), 4000);
  };


  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 max-w-7xl mx-auto w-full">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button 
          onClick={onGoHome}
          className="hover:text-[#0088cc] transition-colors"
        >
          Trang Chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="hover:text-[#0088cc] cursor-pointer">
          {currentTour.category}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
          {currentTour.title}
        </span>
      </div>

      {/* 2. Tour Header Title & Badges */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0088cc] dark:text-blue-400 text-xs font-mono font-bold border border-blue-200 dark:border-blue-800">
              {currentTour.code || 'TOUR-HAL-002'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              {currentTour.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              {currentTour.region || 'Miền Bắc'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              {currentTour.season || 'Mùa hè'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {currentTour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{currentTour.province}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 font-semibold">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{currentTour.duration_days}N{currentTour.duration_days - 1}Đ</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span>{currentTour.rating} ({reviews.length} đánh giá)</span>
            </div>
            <span>•</span>
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 font-bold transition-colors ${
                isLiked ? 'text-rose-600' : 'text-slate-400 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 stroke-rose-500' : ''}`} />
              <span>{isLiked ? 'Đã lưu yêu thích' : 'Lưu yêu thích'}</span>
            </button>
          </div>
        </div>

        {/* Top Right Price Display */}
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            ĐƠN GIÁ / 1 KHÁCH
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#0088cc] font-mono leading-none mt-1">
            {currentTour.base_price.toLocaleString('vi-VN')} đ
          </div>
          {currentTour.original_price && (
            <span className="text-xs text-slate-400 line-through font-mono mt-1 block">
              {currentTour.original_price.toLocaleString('vi-VN')} đ
            </span>
          )}
        </div>
      </div>

      {/* 3. Photo Gallery (Interactive click thumbnail to change main image) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="lg:col-span-2 h-full relative overflow-hidden group">
          <img
            src={activeImage}
            alt={currentTour.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            Ảnh chụp thực tế • Nhấp ảnh nhỏ bên cạnh để đổi ảnh
          </div>
        </div>

        <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
          {allImages.slice(1, 3).map((imgUrl, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`h-full relative overflow-hidden cursor-pointer group rounded-xl border-2 transition-all ${
                activeImage === imgUrl ? 'border-[#0088cc] ring-2 ring-blue-500/30' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Ảnh phụ ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Two Columns Layout (65% Info + 35% Sticky Booking Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: CHI TIẾT TOUR & GỢI Ý PYTHON (65%)                           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Điểm Nổi Bật Của Chuyến Đi */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0088cc]" />
              <span>ĐIỂM NỔI BẬT CỦA CHUYẾN ĐI</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Du thuyền 5 sao đẳng cấp quốc tế
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Thưởng thức buffet hải sản tươi sống
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Chiêm ngưỡng danh lam thắng cảnh huyền ảo
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Môi trường sandbox thanh toán an toàn 100%
                </span>
              </div>
            </div>
          </div>



          {/* Section: Lịch Trình Chi Tiết (Interactive Accordion per Day) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0088cc]" />
                <span>LỊCH TRÌNH CHI TIẾT (BẤM ĐỂ MỞ TỪNG NGÀY)</span>
              </h3>
              <span className="text-xs text-slate-400 font-semibold">
                {currentTour.itinerary.length} ngày hành trình
              </span>
            </div>

            <div className="space-y-3">
              {currentTour.itinerary.map((dayItem) => {
                const isOpen = expandedDay === dayItem.day;
                return (
                  <div 
                    key={dayItem.day} 
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isOpen ? null : dayItem.day)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0088cc] text-white flex items-center justify-center text-xs font-black">
                          {dayItem.day}
                        </span>
                        <span>{dayItem.title}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 space-y-3 pl-10 border-l-2 border-blue-300 dark:border-blue-800 ml-4 mb-2 animate-fade-in">
                        {dayItem.activities.map((act, aIdx) => (
                          <div key={aIdx} className="text-xs space-y-0.5 relative">
                            <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{act.time}</span>
                              <span>{act.name}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                              {act.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>



          {/* Section: Đánh Giá Của Khách Hàng (Interactive review list + write review form) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0088cc]" />
                <span>ĐÁNH GIÁ TỪ DU KHÁCH ({reviews.length})</span>
              </h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span>{currentTour.rating} / 5.0</span>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white text-xs font-bold flex items-center justify-center">
                        {rev.userName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                          {rev.userName}
                        </h5>
                        <span className="text-[10px] text-slate-400">{rev.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 stroke-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* Write Review Form */}
            <form onSubmit={handleSubmitReview} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                Viết Đánh Giá Của Bạn:
              </h4>

              {reviewSuccessMsg && (
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{reviewSuccessMsg}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Chọn số sao:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-4 h-4 ${s <= newReviewRating ? 'fill-amber-400 stroke-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="Tên của bạn..."
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <textarea
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Chia sẻ trải nghiệm thực tế về chuyến đi của bạn..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#0088cc]"
                required
              />

              <button
                type="submit"
                className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Đánh Giá Ngay</span>
              </button>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: STICKY BOOKING CARD (Interactive Pricing & Vouchers)         */}
        {/* ========================================================================= */}
        <div className="sticky top-24">
          <form
            onSubmit={handleOpenCheckout}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[11px] font-bold text-[#0088cc] uppercase tracking-wider block">
                PHÂN BỔ GIỮ CHỖ TRỰC TUYẾN
              </span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">Thời gian giữ chỗ:</span>
                <span className="font-mono font-black text-base text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                ✓ Trạng thái: Đang khả dụng (còn {currentTour.remainingSeats} chỗ)
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ngày khởi hành:
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-[#0088cc]"
                  required
                />
              </div>

              {/* Pax Adults */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Người lớn:
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {currentTour.base_price.toLocaleString('vi-VN')} đ/người
                  </span>
                </div>
                <div className="flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaxAdults(Math.max(1, paxAdults - 1))}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 font-bold shadow-xs hover:bg-slate-100 text-slate-800 dark:text-white"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {paxAdults} người lớn
                  </span>
                  <button
                    type="button"
                    onClick={() => setPaxAdults(paxAdults + 1)}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 font-bold shadow-xs hover:bg-slate-100 text-slate-800 dark:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Pax Children */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Trẻ em (5-11 tuổi):
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {Math.round(currentTour.base_price * 0.7).toLocaleString('vi-VN')} đ (70%)
                  </span>
                </div>
                <div className="flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaxChildren(Math.max(0, paxChildren - 1))}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 font-bold shadow-xs hover:bg-slate-100 text-slate-800 dark:text-white"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {paxChildren} trẻ em
                  </span>
                  <button
                    type="button"
                    onClick={() => setPaxChildren(paxChildren + 1)}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 font-bold shadow-xs hover:bg-slate-100 text-slate-800 dark:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Họ và tên người đặt:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-[#0088cc]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Số điện thoại liên hệ:
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-[#0088cc]"
                  required
                />
              </div>

              {/* Voucher Code Input */}
              <div className="pt-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mã Giảm Giá / Voucher:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="Nhập GIAM10 hoặc HALONG500..."
                    className="flex-1 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-mono font-bold text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    className="px-3 py-2 bg-slate-800 text-white dark:bg-slate-700 rounded-xl font-bold text-xs hover:bg-slate-700"
                  >
                    Áp Dụng
                  </button>
                </div>

                {appliedVoucher && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{appliedVoucher.msg} (-{appliedVoucher.discount.toLocaleString('vi-VN')} đ)</span>
                  </p>
                )}
                {voucherError && (
                  <p className="text-[10px] text-rose-500 mt-1">{voucherError}</p>
                )}
              </div>
            </div>

            {/* Total Calculation Row */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Tạm tính ({paxAdults} Lớn{paxChildren > 0 ? `, ${paxChildren} Trẻ` : ''}):</span>
                <span className="font-mono">{subtotalBeforeDiscount.toLocaleString('vi-VN')} đ</span>
              </div>
              {appliedVoucher && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>Giảm giá ({appliedVoucher.code}):</span>
                  <span className="font-mono">-{appliedVoucher.discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  Tổng thanh toán:
                </span>
                <span className="font-mono font-black text-xl text-[#0088cc]">
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            {/* Action Button: Opens Sandbox Checkout */}
            <button
              type="submit"
              className="w-full py-4 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Bắt Đầu Khóa Chỗ &amp; Đặt Tour (15 Phút)</span>
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. CỔNG THANH TOÁN SANDBOX THỰC NGHIỆM MODAL (Test Cases M3)               */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 relative animate-scale-up">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-[#0088cc] flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  Cổng Thanh Toán Trực Tuyến An Toàn
                </h3>
                <p className="text-xs text-slate-500">
                  Mã hóa bảo mật PCI-DSS 256-bit • Khóa giữ chỗ 15 phút
                </p>
              </div>
            </div>

            {/* Order summary bar */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-400 block text-[11px]">Đơn hàng:</span>
                <strong className="text-slate-900 dark:text-white line-clamp-1 max-w-[280px]">
                  {currentTour.title}
                </strong>
                <span className="text-slate-500">{departureDate} • {paxAdults + paxChildren} khách</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Số tiền cần thanh toán:</span>
                <span className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            {/* Method switcher */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod('sandbox_card')}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'sandbox_card'
                    ? 'border-[#0088cc] bg-blue-50/50 dark:bg-blue-950/40 text-[#0088cc]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Thẻ Sandbox Test</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('sandbox_qr')}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'sandbox_qr'
                    ? 'border-[#0088cc] bg-blue-50/50 dark:bg-blue-950/40 text-[#0088cc]'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Quét VietQR Demo</span>
              </button>
            </div>

            {/* Payment form */}
            {paymentMethod === 'sandbox_card' ? (
              <div className="space-y-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Số thẻ thanh toán (VISA / MasterCard / Napas):
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Chủ thẻ:
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Mã xác thực OTP:
                    </label>
                    <input
                      type="text"
                      value={cardOtp}
                      onChange={(e) => setCardOtp(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3">
                <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto shadow-md border border-slate-200 flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-900" />
                </div>
                <p className="text-xs text-slate-500">
                  Mở ứng dụng Ngân hàng bất kỳ hoặc VNPAY để quét mã thanh toán mô phỏng.
                </p>
              </div>
            )}

            {/* Payment Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmSandboxPayment}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác Nhận Thanh Toán Ngay</span>
              </button>

              <button
                type="button"
                onClick={handleCancelSandboxPayment}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Hủy Thanh Toán (Giữ Chỗ 15 Phút)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ĐẶT CHỖ THÀNH CÔNG HOẶC BẢO LƯU MODAL                                  */}
      {/* ========================================================================= */}
      {showSuccessModal && createdBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6 relative animate-scale-up">
            {/* Green or Amber Icon */}
            {createdBooking.status === 'confirmed' ? (
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-10 h-10 stroke-[2.2]" />
              </div>
            )}

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {createdBooking.status === 'confirmed' ? 'Đặt Chỗ & Thanh Toán Thành Công!' : 'Đã Khóa Giữ Chỗ 15 Phút!'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                {createdBooking.status === 'confirmed'
                  ? 'Giao dịch đã được ghi nhận vào hệ thống. Chúc quý khách có chuyến đi tuyệt vời!'
                  : 'Bạn đã chọn dừng giao dịch: Suất chỗ của bạn được bảo lưu 15 phút an toàn.'}
              </p>
            </div>

            {/* Details Table */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-xs space-y-2 border border-slate-100 dark:border-slate-700/60 text-left">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Mã Đơn Hàng:</span>
                <strong className="font-mono text-slate-900 dark:text-white">{createdBooking.id}</strong>
              </div>
              {createdBooking.transactionRef && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Mã Giao Dịch:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {createdBooking.transactionRef}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Trạng Thái:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                  createdBooking.status === 'confirmed' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {createdBooking.status === 'confirmed' ? 'Đã thanh toán thành công' : 'Đang giữ chỗ 15 phút'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Tour:</span>
                <span className="font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[240px] text-right">
                  {createdBooking.tourTitle}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Khách Hàng:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {createdBooking.customerName} - {createdBooking.customerPhone}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Ngày Đi &amp; Số Khách:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {createdBooking.departureDate} · {createdBooking.paxAdults + createdBooking.paxChildren} người
                </span>
              </div>
              <div className="flex justify-between items-center py-1 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Tổng Tiền:</span>
                <span className="font-mono font-black text-sm text-[#0088cc]">
                  {createdBooking.totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onGoHome();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>Hoàn Tất & Về Trang Chủ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};
