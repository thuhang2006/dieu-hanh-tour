import React, { useState, useEffect } from 'react';
import { Tour } from '../types/tour';

// Định nghĩa Interface Props cho ClientHome
export interface ClientHomeProps {
  initialTab?: string; // Khai báo prop initialTab để sửa lỗi TS2322
  onSelectTourDetail: (tourId: number) => void;
  onOpenBookingModal: (tour: Tour) => void;
  onNavigateCatalog: (type?: string, destination?: string, date?: string) => void;
  onOpenAdmin: () => void;
}

export const ClientHome: React.FC<ClientHomeProps> = ({
  initialTab = 'all',
  onSelectTourDetail,
  onOpenBookingModal,
  onNavigateCatalog,
  onOpenAdmin
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Cập nhật activeTab khi initialTab truyền vào từ App.tsx thay đổi
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="space-y-8">
      {/* Banner / Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 shadow-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Khám Phá Thế Giới Cùng Du Lịch Số
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mb-6">
          Trải nghiệm những chuyến đi tuyệt vời nhất với giá ưu đãi và dịch vụ chất lượng hàng đầu.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigateCatalog('all')}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-50 transition"
          >
            Xem Tất Cả Tour
          </button>
          <button
            onClick={onOpenAdmin}
            className="px-6 py-3 bg-blue-800/50 hover:bg-blue-800 text-white font-semibold rounded-xl backdrop-blur transition"
          >
            Trang Quản Trị
          </button>
        </div>
      </section>

      {/* Danh sách Tour Section */}
      <section id="tour-list-section" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {activeTab === 'favorites' ? 'Danh Sách Tour Yêu Thích' : 'Danh Sách Tour Nổi Bật'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'favorites'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Yêu thích ❤️
            </button>
          </div>
        </div>

        {/* Nội dung danh sách Tour */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Component hiển thị danh sách các thẻ Tour của bạn sẽ nằm ở đây */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">Tour Du Lịch Mẫu</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Đang hiển thị nội dung cho tab: <span className="font-semibold">{activeTab}</span>
            </p>
            <button
              onClick={() => onSelectTourDetail(1)}
              className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};