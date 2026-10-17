export interface Tour {
  id: number;
  code?: string;
  title: string;
  slug: string;
  category: string;
  type: 'tour' | 'stay' | 'ticket' | 'experience' | 'transfer';
  base_price: number;
  original_price?: number;
  duration_days: number;
  capacity: number;
  remainingSeats: number;
  province: string;
  destination: string;
  rating: number;
  reviews_count: number;
  image: string;
  side_images?: string[];
  region?: string;
  season?: string;
  highlights?: string[];
  features?: string[];
  description: string;
  cancel_policy: string;
  itinerary: {
    day: number;
    title: string;
    activities: { time: string; name: string; desc: string; duration_min: number }[];
  }[];
}

export interface RecommendationItem {
  product_id: number;
  title: string;
  base_price: number;
  province: string;
  destination: string;
  category: string;
  similarity_score: number; // e.g. 0.942
  match_reason: string;
  source: 'python_service' | 'mysql_fallback';
  image: string;
}

export interface TestCase {
  id: string;
  module: string;
  useCase: string;
  name: string;
  objective: string;
  precondition: string;
  steps: string[];
  inputData: string;
  expectedResult: string;
  actualResult: string;
  status: 'PASS' | 'FAIL' | 'BLOCKED';
  severity: 'Cao' | 'Nghiêm trọng (Blocker)' | 'Trung bình' | 'Thấp';
  tester: string;
  testDate: string;
  techNote: string;
  logOutput?: string;
}

export interface SeasonalityStat {
  month: number;
  monthName: string;
  seatsSold: number;
  totalSeats: number;
  occupancyRate: number; // 0 - 100
  avgPrice: number;
  seasonType: 'Cao điểm' | 'Thấp điểm';
}

export interface RegionRevenue {
  region: string;
  revenue: number;
  bookingsCount: number;
  color: string;
}

export interface BookingRecord {
  id: string; // e.g. BK-202610-8921
  tourId: number;
  tourTitle: string;
  tourImage?: string;
  tourCategory?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNote?: string;
  departureDate: string;
  paxAdults: number;
  paxChildren: number;
  totalAmount: number;
  discountAmount?: number;
  voucherCode?: string;
  status: 'pending_payment' | 'confirmed' | 'cancelled' | 'refunded';
  paymentMethod: 'sandbox_card' | 'sandbox_qr' | 'vnpay';
  transactionRef?: string;
  createdAt: string;
  expiresAt: string;
}

export interface UserReview {
  id: string;
  tourId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  role: 'customer' | 'admin' | 'supplier' | 'tester';
  roleTitle: string;
  email: string;
  phone: string;
  avatarText: string;
  avatarBg: string;
  tierBadge: string;
  tierColor: string;
  description: string;
  handbookPurpose?: string;
  password?: string;
}
