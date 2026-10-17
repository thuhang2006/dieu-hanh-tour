import { BookingRecord, UserReview } from '../types/tour';

const STORAGE_KEY_BOOKINGS = 'dulichso_bookings_v2';
const STORAGE_KEY_WISHLIST = 'dulichso_wishlist_v2';
const STORAGE_KEY_REVIEWS = 'dulichso_reviews_v2';

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'BK-892101',
    tourId: 1,
    tourTitle: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
    tourImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    tourCategory: 'Tour trọn gói',
    customerName: 'Nguyễn Thu Hà',
    customerPhone: '0912345678',
    customerEmail: 'nguyenthuha201106@gmail.com',
    customerNote: 'Phòng hướng vịnh tầng cao, ăn chay',
    departureDate: '2026-11-20',
    paxAdults: 2,
    paxChildren: 0,
    totalAmount: 5700000,
    discountAmount: 0,
    status: 'confirmed',
    paymentMethod: 'sandbox_card',
    transactionRef: 'SBX2026100709513783250B',
    createdAt: '2026-10-07 09:51:37',
    expiresAt: '2026-10-07 10:06:37'
  },
  {
    id: 'BK-892102',
    tourId: 2,
    tourTitle: 'Tour Tràng An - Bái Đính - Hang Múa 1 Ngày',
    tourImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    tourCategory: 'Tour trọn gói',
    customerName: 'Trần Văn Mạnh',
    customerPhone: '0988776655',
    customerEmail: 'tranmanh@gmail.com',
    customerNote: 'Đón tại Nhà hát lớn Hà Nội',
    departureDate: '2026-11-25',
    paxAdults: 1,
    paxChildren: 1,
    totalAmount: 1850000,
    discountAmount: 100000,
    voucherCode: 'GIAM100K',
    status: 'pending_payment',
    paymentMethod: 'sandbox_qr',
    createdAt: '2026-10-10 14:20:00',
    expiresAt: '2026-10-10 14:35:00'
  },
  {
    id: 'BK-892103',
    tourId: 3,
    tourTitle: 'Legacy Yên Tử MGallery 5 Sao 2N1Đ Sang Trọng',
    tourImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tourCategory: 'Lưu trú nghỉ dưỡng',
    customerName: 'Lê Hoàng Yến',
    customerPhone: '0903123456',
    customerEmail: 'hoangyen.le@gmail.com',
    customerNote: 'Kỷ niệm ngày cưới, setup hoa hồng',
    departureDate: '2026-12-05',
    paxAdults: 2,
    paxChildren: 0,
    totalAmount: 3850000,
    discountAmount: 0,
    status: 'confirmed',
    paymentMethod: 'sandbox_card',
    transactionRef: 'SBX2026100811223399001A',
    createdAt: '2026-10-08 11:22:33',
    expiresAt: '2026-10-08 11:37:33'
  },
  {
    id: 'BK-892104',
    tourId: 4,
    tourTitle: 'Vé Cáp Treo Sun World Hòn Thơm Phú Quốc (2 Chiều)',
    tourImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tourCategory: 'Vé tham quan',
    customerName: 'Phạm Minh Tuấn',
    customerPhone: '0934567890',
    customerEmail: 'tuanpm@gmail.com',
    departureDate: '2026-11-18',
    paxAdults: 4,
    paxChildren: 2,
    totalAmount: 3900000,
    discountAmount: 200000,
    voucherCode: 'SUNWORLD',
    status: 'confirmed',
    paymentMethod: 'sandbox_card',
    transactionRef: 'SBX2026100916301277441C',
    createdAt: '2026-10-09 16:30:12',
    expiresAt: '2026-10-09 16:45:12'
  }
];

export const INITIAL_REVIEWS: Record<number, UserReview[]> = {
  1: [
    {
      id: 'REV-01',
      tourId: 1,
      userName: 'Trần Thảo Ly',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment: 'Chuyến đi tuyệt vời trên cả mong đợi! Du thuyền 5 sao đẳng cấp, phòng sạch sẽ nhìn thẳng ra vịnh. Đồ ăn buffet hải sản rất phong phú và tươi ngon.',
      createdAt: '2026-10-05'
    },
    {
      id: 'REV-02',
      tourId: 1,
      userName: 'Hoàng Minh Đức',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment: 'Hướng dẫn viên nhiệt tình, chu đáo. Quy trình khóa chỗ 15 phút rất an tâm, không lo bị hủy chuyến.',
      createdAt: '2026-10-02'
    }
  ],
  2: [
    {
      id: 'REV-03',
      tourId: 2,
      userName: 'Vũ Thanh Hằng',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      comment: 'Hang Múa ngắm trọn toàn cảnh Ninh Bình đẹp mê hồn! Đi 1 ngày nhẹ nhàng nhưng ngắm được nhiều cảnh đẹp.',
      createdAt: '2026-09-28'
    }
  ]
};

// Bookings
export function getSavedBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_BOOKINGS;
}

export function saveBooking(booking: BookingRecord): BookingRecord[] {
  const current = getSavedBookings();
  const updated = [booking, ...current.filter(b => b.id !== booking.id)];
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function updateBookingStatus(id: string, newStatus: BookingRecord['status']): BookingRecord[] {
  const current = getSavedBookings();
  const updated = current.map(b => b.id === id ? { ...b, status: newStatus } : b);
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

// Wishlist
export function getSavedWishlist(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WISHLIST);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [1, 3]; // default tours 1 and 3 favorited
}

export function toggleWishlist(tourId: number): number[] {
  const list = getSavedWishlist();
  const next = list.includes(tourId) ? list.filter(id => id !== tourId) : [...list, tourId];
  try {
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}

// Reviews
export function getSavedReviews(tourId: number): UserReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (raw) {
      const all: Record<number, UserReview[]> = JSON.parse(raw);
      if (all[tourId]) return all[tourId];
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_REVIEWS[tourId] || [];
}

export function addReviewToTour(tourId: number, review: Omit<UserReview, 'id' | 'tourId' | 'createdAt'>): UserReview[] {
  const currentReviews = getSavedReviews(tourId);
  const newRev: UserReview = {
    id: `REV-${Date.now()}`,
    tourId,
    ...review,
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newRev, ...currentReviews];
  
  try {
    let all: Record<number, UserReview[]> = {};
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (raw) all = JSON.parse(raw);
    all[tourId] = updated;
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(all));
  } catch (e) {
    console.error(e);
  }
  return updated;
}
