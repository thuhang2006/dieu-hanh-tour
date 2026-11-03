import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Building2, 
  Ticket, 
  Footprints, 
  MapPin, 
  Calendar, 
  Search, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ArrowRight,
  Heart,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import { Tour } from '../types/tour';
import { getSavedWishlist, toggleWishlist } from '../utils/bookingStore';

interface ClientHomeProps {
  onSelectTourDetail: (tourId: number) => void;
  onOpenBookingModal: (tour: Tour) => void;
  onNavigateCatalog: (filterType?: string, destination?: string, date?: string) => void;
  onOpenAdmin: () => void;
}

export const ClientHome: React.FC<ClientHomeProps> = ({
  onSelectTourDetail,
  onOpenBookingModal,
  onNavigateCatalog,
  onOpenAdmin
}) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [departureDate, setDepartureDate] = useState('2026-11-20');

  // Homepage tabs filter for tours
  const [activeTab, setActiveTab] = useState<string>('all');
  const [homeSortBy, setHomeSortBy] = useState<string>('featured');

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>(getSavedWishlist());

  const handleToggleLike = (e: React.MouseEvent, tourId: number) => {
    e.stopPropagation();
    const updated = toggleWishlist(tourId);
    setWishlist(updated);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateCatalog(serviceType, destinationInput, departureDate);
  };

  // Filtered tours on homepage (Đã cập nhật bộ lọc theo danh sách yêu thích)
  const displayedTours = useMemo(() => {
    return MOCK_TOURS.filter(tour => {
      if (activeTab === 'favorites') {
        return wishlist.includes(tour.id); // Chỉ lấy các tour đã thả tim
      }
      if (activeTab !== 'all' && tour.type !== activeTab) return false;
      return true;
    }).sort((a, b) => {
      if (homeSortBy === 'price-asc') return a.base_price - b.base_price;
      if (homeSortBy === 'price-desc') return b.base_price - a.base_price;
      if (homeSortBy === 'rating') return b.rating - a.rating;
      return b.id - a.id;
    });
  }, [activeTab, homeSortBy, wishlist]);

  const POPULAR_DESTINATIONS = ['Hạ Long', 'Sa Pa', 'Ninh Bình', 'Phú Quốc', 'Đà Nẵng', 'Mộc Châu'];

  return (
    <div className="space-y-12 animate-fade-in text-slate-800 dark:text-slate-100 max-w-7xl mx-auto w-full">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[480px] flex flex-col justify-center items-center text-center p-6 sm:p-12 shadow-2xl border border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80"
          alt="Vịnh Hạ Long"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />

        <div className="relative z-10 max-w-4xl space-y-4 mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Khám Phá Vẻ Đẹp <span className="text-[#FBBF24]">Việt Nam</span>
            <br />
            <span className="bg-gradient-to-r from-[#34D399] to-[#38BDF8] bg-clip-text text-transparent">
              Tươi Đẹp
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Đặt tour trọn gói, khách sạn resort 5 sao, vé tham quan và trải nghiệm văn hóa bản địa với cam kết giữ chỗ thời gian thực 15 phút.
          </p>
        </div>

        {/* Floating White Search Card */}
        <form 
          onSubmit={handleSearchSubmit}
          className="relative z-20 w-full max-w-4xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-3 transition-colors"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            <div className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                ĐIỂM ĐẾN DU LỊCH
              </label>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-[#0088cc] flex-shrink-0" />
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-bold focus:outline-none placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Hạ Long, Sa Pa, Ninh Bình..."
                />
              </div>
            </div>

            <div className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                LOẠI DỊCH VỤ
              </label>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Compass className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-bold focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-800 dark:[&>option]:text-slate-100"
                >
                  <option value="all">Tất cả dịch vụ</option>
                  <option value="tour">Tour trọn gói</option>
                  <option value="stay">Lưu trú nghỉ dưỡng</option>
                  <option value="ticket">Vé tham quan</option>
                  <option value="experience">Trải nghiệm văn hóa</option>
                </select>
              </div>
            </div>

            <div className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                THỜI GIAN KHỞI HÀNH
              </label>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Calendar className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-bold focus:outline-none cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white py-3.5 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Tìm Kiếm Chuyến Đi</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">Gợi ý tìm nhanh:</span>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setDestinationInput(dest);
                  onNavigateCatalog('all', dest, departureDate);
                }}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#0088cc] dark:hover:bg-[#0088cc] hover:text-white dark:hover:text-white text-slate-600 dark:text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {dest}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORY CARDS SECTION                                                 */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Danh Mục Dịch Vụ Du Lịch
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bấm trực tiếp vào từng danh mục để xem toàn bộ danh sách dịch vụ chi tiết
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigateCatalog('tour')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0088cc] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                Tour Trọn Gói
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Đã bao gồm xe đưa đón, khách sạn, hướng dẫn viên, ăn uống & vé tham quan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-[#0088cc] group-hover:translate-x-1 transition-transform">
              <span>Xem danh sách tour</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateCatalog('stay')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                Lưu Trú Nghỉ Dưỡng
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Resort 5 sao, Villa mặt hồ, khách sạn boutique cao cấp view thung lũng & biển.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Xem khách sạn</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateCatalog('ticket')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Ticket className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                Vé Thắng Cảnh
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Vé cáp treo Sun World Fansipan, vé thuyền Tràng An, công viên giải trí không xếp hàng.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Xem vé tham quan</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateCatalog('experience')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Footprints className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                Trải Nghiệm Bản Địa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Workshop làm gốm Bát Tràng, chèo kayak hang động, tour ẩm thực đêm phố cổ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Xem trải nghiệm</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SẢN PHẨM & TOUR BÁN CHẠY NHẤT (Interactive Tabs & Wishlist)             */}
      {/* ========================================================================= */}
      <div id="tour-list-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Sản Phẩm & Tour Bán Chạy Nhất
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Được đánh giá cao bởi hơn 12.000+ du khách trong nước và quốc tế
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-400 font-semibold">Sắp xếp:</span>
            <select
              value={homeSortBy}
              onChange={(e) => setHomeSortBy(e.target.value)}
              className="text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Category Tabs on Homepage (Đã bổ sung tab Tour Đã Lưu) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
          {[
            { key: 'all', label: `Tất Cả (${MOCK_TOURS.length})` },
            { key: 'tour', label: `Tour Trọn Gói (${MOCK_TOURS.filter(t => t.type === 'tour').length})` },
            { key: 'stay', label: `Lưu Trú Resort (${MOCK_TOURS.filter(t => t.type === 'stay').length})` },
            { key: 'ticket', label: `Vé Tham Quan (${MOCK_TOURS.filter(t => t.type === 'ticket').length})` },
            { key: 'experience', label: `Trải Nghiệm (${MOCK_TOURS.filter(t => t.type === 'experience').length})` },
            { key: 'favorites', label: `❤️ Tour Đã Lưu (${wishlist.length})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.key
                  ? tab.key === 'favorites' 
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                    : 'bg-[#0088cc] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTours.length > 0 ? (
            displayedTours.map((tour) => {
              const isLiked = wishlist.includes(tour.id);

              return (
                <div 
                  key={tour.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />

                      <div className="absolute top-3 left-3 bg-[#0088cc]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm shadow-xs uppercase tracking-wider">
                        {tour.category}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(e, tour.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm cursor-pointer"
                        title={isLiked ? 'Bỏ lưu yêu thích' : 'Lưu vào yêu thích'}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{tour.province}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{tour.rating}</span>
                        <span className="text-[9px] text-slate-300">({tour.reviews_count})</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 
                        onClick={() => onSelectTourDetail(tour.id)}
                        className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-[#0088cc] cursor-pointer transition-colors leading-snug"
                      >
                        {tour.title}
                      </h3>

                      {tour.features && (
                        <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          {tour.features.slice(0, 2).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 line-clamp-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0088cc] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        {tour.original_price && (
                          <span className="text-[10px] text-slate-400 line-through block font-mono">
                            {tour.original_price.toLocaleString('vi-VN')} đ
                          </span>
                        )}
                        <span className="text-base font-black text-[#0088cc] font-mono leading-tight">
                          {tour.base_price.toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectTourDetail(tour.id)}
                          className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                        >
                          Chi tiết
                        </button>

                        <button
                          onClick={() => onSelectTourDetail(tour.id)}
                          className="py-2 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                        >
                          Đặt Ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Bạn chưa lưu tour yêu thích nào.</p>
              <p className="text-xs text-slate-400">Hãy bấm vào biểu tượng trái tim trên các tour bạn quan tâm để lưu vào đây nhé!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};