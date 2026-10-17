import React, { useState, useMemo, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  Check, 
  Compass,
  ChevronDown
} from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import { Tour } from '../types/tour';

interface TourCatalogProps {
  initialType?: string;
  initialDestination?: string;
  initialDate?: string;
  onSelectTour: (tourId: number) => void;
  onGoHome: () => void;
}

export const TourCatalog: React.FC<TourCatalogProps> = ({
  initialType = 'tour',
  initialDestination = '',
  initialDate = '',
  onSelectTour,
  onGoHome
}) => {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [destination, setDestination] = useState<string>(initialDestination);
  const [departureDate, setDepartureDate] = useState<string>(initialDate);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');

  useEffect(() => {
    setSelectedType(initialType || 'all');
    if (initialDestination) setDestination(initialDestination);
    if (initialDate) setDepartureDate(initialDate);
  }, [initialType, initialDestination, initialDate]);

  // Breadcrumb title matching Image 2
  const getCategoryBreadcrumbTitle = () => {
    switch (selectedType) {
      case 'tour':
        return 'Tour Du Lịch Trọn Gói';
      case 'stay':
        return 'Lưu Trú & Resort Nghỉ Dưỡng';
      case 'ticket':
        return 'Vé Tham Quan & Cáp Treo';
      case 'experience':
        return 'Trải Nghiệm Bản Địa';
      default:
        return 'Tất Cả Sản Phẩm Du Lịch';
    }
  };

  // Filter list
  const filteredTours = useMemo(() => {
    return MOCK_TOURS.filter(tour => {
      // Filter by service type
      if (selectedType !== 'all' && tour.type !== selectedType) {
        return false;
      }
      // Filter by max price
      if (tour.base_price > maxPrice) {
        return false;
      }
      // Filter by destination
      if (destination.trim() && destination !== 'all') {
        const destLower = destination.toLowerCase().trim();
        const tourDest = `${tour.province} ${tour.destination} ${tour.title}`.toLowerCase();
        if (!tourDest.includes(destLower)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.base_price - b.base_price;
      if (sortBy === 'price-desc') return b.base_price - a.base_price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.id - a.id;
    });
  }, [selectedType, maxPrice, destination, sortBy]);

  const handleResetFilter = () => {
    setSelectedType('tour');
    setMaxPrice(10000000);
    setDestination('all');
    setDepartureDate('');
  };

  return (
    <div className="space-y-5 animate-fade-in text-slate-800 dark:text-slate-100 max-w-7xl mx-auto w-full">
      {/* 1. Breadcrumbs Matching Image 2: "Trang Chủ  >  Tour Du Lịch Trọn Gói" */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button 
          onClick={onGoHome}
          className="hover:text-[#0088cc] text-slate-600 dark:text-slate-300 font-normal transition-colors"
        >
          Trang Chủ
        </button>
        <span className="text-slate-400">&gt;</span>
        <span className="text-[#0088cc] font-medium">
          {getCategoryBreadcrumbTitle()}
        </span>
      </div>

      {/* 2. Side-By-Side Flex Layout Matching Image 2 (NEVER overlapping) */}
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: BỘ LỌC TÌM KIẾM (Fixed width 260px - 280px)                 */}
        {/* ========================================================================= */}
        <div className="w-full md:w-[260px] lg:w-[280px] flex-shrink-0 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          {/* Header Row: Icon + "Bộ Lọc Tìm Kiếm" + "Thiết lập lại" */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-[#0088cc]" />
              <span>Bộ Lọc Tìm Kiếm</span>
            </div>

            <button
              onClick={handleResetFilter}
              className="text-xs text-[#0088cc] hover:underline font-semibold transition-colors"
            >
              Thiết lập lại
            </button>
          </div>

          {/* Section 1: Phân Loại Dịch Vụ */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              PHÂN LOẠI DỊCH VỤ
            </label>
            <div className="space-y-1 text-xs">
              {[
                { key: 'all', label: 'Tất cả dịch vụ' },
                { key: 'tour', label: 'Tour trọn gói' },
                { key: 'stay', label: 'Lưu trú nghỉ dưỡng' },
                { key: 'ticket', label: 'Vé tham quan' },
                { key: 'experience', label: 'Trải nghiệm văn hóa' }
              ].map(item => {
                const isActive = selectedType === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedType(item.key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left text-xs ${
                      isActive
                        ? 'bg-[#0088cc] text-white font-bold shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-[#0088cc] hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Mức Giá Tối Đa */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                MỨC GIÁ TỐI ĐA
              </label>
              <span className="font-mono font-bold text-rose-600 text-xs">
                {maxPrice.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <input
              type="range"
              min={500000}
              max={10000000}
              step={250000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0088cc] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>500.000 đ</span>
              <span>10.000.000 đ</span>
            </div>
          </div>

          {/* Section 3: Điểm Đến / Tỉnh Thành */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ĐIỂM ĐẾN / TỈNH THÀNH
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 pr-8 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0088cc] cursor-pointer shadow-2xs"
              >
                <option value="all">Tất cả địa điểm toàn quốc</option>
                <option value="Quảng Ninh">Quảng Ninh (Hạ Long)</option>
                <option value="Ninh Bình">Ninh Bình (Tràng An)</option>
                <option value="Đà Nẵng">Đà Nẵng / Hội An</option>
                <option value="Lào Cai">Lào Cai (Sa Pa)</option>
                <option value="Kiên Giang">Kiên Giang (Phú Quốc)</option>
                <option value="Sơn La">Sơn La (Mộc Châu)</option>
                <option value="Hà Giang">Hà Giang (Đồng Văn)</option>
                <option value="Cần Thơ">Cần Thơ (Chợ Nổi)</option>
                <option value="Lâm Đồng">Lâm Đồng (Đà Lạt)</option>
                <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu (Côn Đảo)</option>
                <option value="Khánh Hòa">Khánh Hòa (Nha Trang)</option>
                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                <option value="Phú Yên">Phú Yên (Ghềnh Đá Đĩa)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Section 4: Ngày Khởi Hành */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              NGÀY KHỞI HÀNH
            </label>
            <div className="relative">
              <select
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 pr-8 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0088cc] cursor-pointer shadow-2xs"
              >
                <option value="">Tất cả các ngày khởi hành</option>
                <option value="2026-11-20">20/11/2026 (Cuối tuần)</option>
                <option value="2026-11-25">25/11/2026</option>
                <option value="2026-12-01">01/12/2026</option>
                <option value="2026-12-24">24/12/2026 (Giáng sinh)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: KẾT QUẢ TÌM KIẾM & DANH SÁCH TOUR                           */}
        {/* ========================================================================= */}
        <div className="flex-1 min-w-0 w-full space-y-5">
          {/* Top Summary Bar Matching Image 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs">
            <div className="text-slate-600 dark:text-slate-400">
              Tìm thấy <strong className="text-[#0088cc] font-bold">{filteredTours.length}</strong> kết quả phù hợp{' '}
              <span className="text-slate-400 font-normal">(Trang 1 / 1)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sắp xếp theo:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredTours.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 my-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0088cc] flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8 stroke-[1.8]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Không tìm thấy tour phù hợp
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Hãy thử điều chỉnh bộ lọc của bạn hoặc chọn lại danh mục khác.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetFilter}
                className="px-5 py-2.5 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            /* RESULTS GRID MATCHING IMAGE 2 EXACTLY */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredTours.map((tour) => {
                return (
                  <div
                    key={tour.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Frame Matching Image 2 */}
                      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Category Badge on Top-Left (Navy pill matching Image 2) */}
                        <div className="absolute top-3 left-3 bg-slate-900/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs shadow-xs">
                          {tour.category}
                        </div>

                        {/* Rating on Top-Right (Navy pill with star matching Image 2) */}
                        <div className="absolute top-3 right-3 bg-slate-900/75 text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs shadow-xs">
                          <span>★</span>
                          <span>{tour.rating}</span>
                        </div>

                        {/* Remaining Badge on Bottom-Left (Red pill matching Image 2) */}
                        <div className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          Chỉ còn {tour.remainingSeats} chỗ!
                        </div>
                      </div>

                      {/* Content Body Matching Image 2 */}
                      <div className="p-4 space-y-2">
                        {/* Title */}
                        <h3
                          onClick={() => onSelectTour(tour.id)}
                          className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-[#0088cc] cursor-pointer transition-colors leading-snug"
                        >
                          {tour.title}
                        </h3>

                        {/* Meta Row: Location, Duration, Remaining Seats Status */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span>{tour.province}</span>
                          </div>

                          <span>•</span>

                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{tour.duration_days} ngày {tour.duration_days - 1} đêm</span>
                          </div>

                          <span>•</span>

                          <span className="text-rose-500 font-semibold">
                            Còn {tour.remainingSeats} chỗ
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Price & Action Matching Image 2 */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            Giá trọn gói
                          </span>
                          <span className="text-base font-black text-rose-600 font-mono leading-tight">
                            {tour.base_price.toLocaleString('vi-VN')} đ
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectTour(tour.id)}
                          className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
                        >
                          Xem Chi Tiết
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Pagination Bar Matching Image 2: "Hiển thị 1 - X / X tour (Quy chuẩn 12 tour/trang)" */}
          {filteredTours.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs mt-6">
              <span className="text-slate-500 dark:text-slate-400">
                Hiển thị 1 - {filteredTours.length} / {filteredTours.length} tour (Quy chuẩn 12 tour/trang)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 font-medium px-2 py-1 transition-colors"
                >
                  &lt; Trước
                </button>

                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-[#0088cc] text-white font-bold text-xs flex items-center justify-center shadow-xs"
                >
                  1
                </button>

                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 font-medium px-2 py-1 transition-colors"
                >
                  Sau &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
