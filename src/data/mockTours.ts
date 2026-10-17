import { Tour, SeasonalityStat, RegionRevenue, RecommendationItem } from '../types/tour';

export const MOCK_TOURS: Tour[] = [
  {
    id: 1,
    code: 'TOUR-HAL-002',
    title: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
    slug: 'du-thuyen-5-sao-vinh-ha-long-2n1d',
    category: 'Tour Trọn Gói',
    type: 'tour',
    base_price: 1950000,
    original_price: 2450000,
    duration_days: 2,
    capacity: 24,
    remainingSeats: 6,
    province: 'Quảng Ninh',
    destination: 'Vịnh Hạ Long & Đảo Ti Tốp',
    rating: 4.9,
    reviews_count: 142,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa hè',
    highlights: [
      'Du thuyền 5 sao đẳng cấp quốc tế',
      'Thưởng thức buffet hải sản tươi sống trên vịnh',
      'Chiêm ngưỡng Hang Sửng Sốt và chèo thuyền Kayak',
      'Môi trường sandbox thanh toán an toàn giữ chỗ 15 phút'
    ],
    features: [
      'Du thuyền 5 sao đẳng cấp',
      'Buffet hải sản tươi sống',
      'Check-in Hang Sửng Sốt & Đảo Titop'
    ],
    description: 'Trải nghiệm du thuyền 5 sao đẳng cấp quốc tế, thưởng ngoạn kỳ quan thiên nhiên thế giới Vịnh Hạ Long, chèo thuyền kayak qua hang Luồn và tắm biển tại Đảo Ti Tốp.',
    cancel_policy: 'Hủy trước 30 ngày hoàn 100% chi phí; Hủy từ 15-29 ngày hoàn 70%; Hủy trong vòng 24 giờ không hoàn tiền.',
    itinerary: [
      {
        day: 1,
        title: 'Ngày 1: Hà Nội - Cảng Tuần Châu - Vịnh Hạ Long - Hang Sửng Sốt',
        activities: [
          { time: '08:00', name: 'Đón khách tại Nhà Hát Lớn Hà Nội', desc: 'Xe limousine đưa đón cao tốc Hà Nội - Hải Phòng - Hạ Long', duration_min: 150 },
          { time: '12:00', name: 'Làm thủ tục lên du thuyền 5 sao', desc: 'Thưởng thức đồ uống chào mừng và nghe hướng dẫn an toàn hàng hải', duration_min: 60 },
          { time: '14:30', name: 'Thăm Hang Sửng Sốt', desc: 'Khám phá hang động thạch nhũ kỳ vĩ nhất vịnh Hạ Long', duration_min: 90 },
          { time: '18:30', name: 'Tiệc hoàng hôn Sunset Party & Buffet hải sản', desc: 'Thưởng thức tiệc nướng BBQ hải sản tươi sống', duration_min: 120 }
        ]
      },
      {
        day: 2,
        title: 'Ngày 2: Tập Thái Cực Quyền - Đảo Titop - Vịnh Bái Tử Long - Hà Nội',
        activities: [
          { time: '06:30', name: 'Đón bình minh & Tập Thái Cực Quyền', desc: 'Tập bài dưỡng sinh nhẹ nhàng trên boong sundeck', duration_min: 45 },
          { time: '08:00', name: 'Chèo thuyền Kayak Hang Luồn & Tắm biển Ti Tốp', desc: 'Chinh phục đỉnh Ti Tốp ngắm toàn cảnh 360 độ vịnh', duration_min: 90 },
          { time: '11:00', name: 'Làm thủ tục trả phòng & Buffet trưa', desc: 'Du thuyền cập bến Cảng Quốc tế Tuần Châu, xe đưa về Hà Nội', duration_min: 90 }
        ]
      }
    ]
  },
  {
    id: 2,
    code: 'TICK-TRA-001',
    title: 'Tour Quần Thể Danh Thắng Tràng An - Tuyệt Tình Cốc 1 Ngày',
    slug: 'quan-the-trang-an-tuyet-tinh-coc-1-ngay',
    category: 'Vé Thắng Cảnh',
    type: 'ticket',
    base_price: 780000,
    original_price: 950000,
    duration_days: 1,
    capacity: 35,
    remainingSeats: 15,
    province: 'Ninh Bình',
    destination: 'Tràng An & Động Am Tiên',
    rating: 4.8,
    reviews_count: 89,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa xuân',
    highlights: [
      'Đi thuyền nan Tràng An qua 9 hang động tự nhiên',
      'Khám phá Tuyệt Tình Cốc hồ nước ngọc bích',
      'Thưởng thức đặc sản cơm cháy thịt dê Ninh Bình',
      'Vé ưu tiên vào cổng không cần xếp hàng'
    ],
    features: [
      'Đi thuyền nan Tràng An qua 9 hang động',
      'Khám phá Tuyệt Tình Cốc Động Am Tiên',
      'Vé điện tử QR xác nhận tức thì'
    ],
    description: 'Ngồi thuyền nan xuôi dòng sông Sào Khê qua hệ thống hang động xuyên thủy kỳ ảo, ghé thăm Động Am Tiên (Tuyệt Tình Cốc) trầm mặc giữa núi đá vôi.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100% chi phí.',
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Động Am Tiên - Thuyền Nan Tràng An',
        activities: [
          { time: '07:30', name: 'Đón khách tại Phố Cổ Hà Nội', desc: 'Xe du lịch đời mới xuất phát cao tốc Pháp Vân - Cầu Giẽ', duration_min: 120 },
          { time: '10:00', name: 'Check-in Tuyệt Tình Cốc', desc: 'Khám phá cổng thành cổ và hồ nước trong veo', duration_min: 90 },
          { time: '13:30', name: 'Hành trình thuyền nan Tràng An', desc: 'Khám phá Hang Tối, Hang Sáng, Hang Nấu Rượu', duration_min: 180 }
        ]
      }
    ]
  },
  {
    id: 3,
    code: 'EXPE-HOI-001',
    title: 'Trải Nghiệm Phố Cổ Hội An & Làm Đèn Lồng Truyền Thống',
    slug: 'trai-nghiem-pho-co-hoi-an-lam-den-long',
    category: 'Trải Nghiệm Bản Địa',
    type: 'experience',
    base_price: 450000,
    original_price: 600000,
    duration_days: 1,
    capacity: 20,
    remainingSeats: 8,
    province: 'Đà Nẵng',
    destination: 'Phố Cổ Hội An',
    rating: 4.9,
    reviews_count: 94,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Quanh năm',
    highlights: [
      'Tự tay vót nan tre dán lụa làm đèn lồng Hội An mang về',
      'Thưởng thức trà thảo mộc Mót và cao lầu phố cổ',
      'Thả hoa đăng cầu bình an trên sông Hoài',
      'Nghệ nhân bản địa trực tiếp hướng dẫn'
    ],
    features: [
      'Workshop làm đèn lồng lụa mang về',
      'Thưởng thức trà Mót phố cổ',
      'Thả đèn hoa đăng sông Hoài'
    ],
    description: 'Hòa mình vào không gian cổ kính của phố Hội, tham gia lớp học làm đèn lồng lụa truyền thống dưới sự chỉ dẫn của nghệ nhân lâu năm và dạo thuyền thả hoa đăng.',
    cancel_policy: 'Hủy trước 12 giờ hoàn tiền 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Khám phá nét đẹp làng nghề Hội An',
        activities: [
          { time: '14:30', name: 'Tập trung tại xưởng thủ công phố cổ', desc: 'Gặp gỡ nghệ nhân và chọn mẫu khung đèn lồng', duration_min: 30 },
          { time: '15:00', name: 'Tự tay dán lụa và hoàn thiện tác phẩm', desc: 'Học kỹ thuật căng lụa và trang trí tua rua truyền thống', duration_min: 90 },
          { time: '18:00', name: 'Đi thuyền gỗ và thả đèn hoa đăng', desc: 'Thả đèn giấy lung linh trên dòng sông Hoài về đêm', duration_min: 60 }
        ]
      }
    ]
  },
  {
    id: 4,
    code: 'STAY-TOP-001',
    title: 'Topas Ecolodge Sapa - Bungalow Đôi Giữa Thung Lũng Mường Hoa',
    slug: 'topas-ecolodge-sapa-bungalow-muong-hoa',
    category: 'Lưu Trú Nghỉ Dưỡng',
    type: 'stay',
    base_price: 4950000,
    original_price: 6200000,
    duration_days: 2,
    capacity: 10,
    remainingSeats: 3,
    province: 'Lào Cai',
    destination: 'Thung Lũng Mường Hoa, Sa Pa',
    rating: 4.9,
    reviews_count: 215,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa thu',
    highlights: [
      'Bungalow đá granit view thung lũng 360 độ',
      'Hồ bơi vô cực nước ấm lưng chừng mây đệ nhất Tây Bắc',
      'Bữa sáng buffet phong cách hữu cơ Bắc Âu',
      'Xe shuttle bus đón tiễn trung tâm Sa Pa miễn phí'
    ],
    features: [
      'Bungalow đá tự nhiên view thung lũng 360°',
      'Hồ bơi vô cực nước ấm lưng chừng mây',
      'Buffet sáng hữu cơ chuẩn Bắc Âu'
    ],
    description: 'Khu nghỉ dưỡng sinh thái hàng đầu thế giới được National Geographic vinh danh, tọa lạc trên đỉnh đồi hình nón giữa lòng thung lũng Mường Hoa.',
    cancel_policy: 'Hủy trước 7 ngày hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Check-in Topas Ecolodge - Ngắm hoàng hôn',
        activities: [
          { time: '14:00', name: 'Nhận phòng Bungalow view thung lũng', desc: 'Thưởng thức trà thảo mộc chào mừng', duration_min: 30 },
          { time: '16:00', name: 'Tắm hồ bơi nước ấm vô cực', desc: 'Ngắm mây vắt ngang đỉnh núi Hoàng Liên Sơn', duration_min: 120 }
        ]
      }
    ]
  },
  {
    id: 5,
    code: 'TICK-HON-002',
    title: 'Vé Cáp Treo Hòn Thơm Vượt Biển & Công Viên Nước Aquatopia',
    slug: 've-cap-treo-hon-thom-aquatopia',
    category: 'Vé Thắng Cảnh',
    type: 'ticket',
    base_price: 680000,
    original_price: 750000,
    duration_days: 1,
    capacity: 50,
    remainingSeats: 25,
    province: 'Kiên Giang',
    destination: 'Đảo Phú Quốc & Hòn Thơm',
    rating: 4.8,
    reviews_count: 312,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Nam',
    season: 'Quanh năm',
    highlights: [
      'Cáp treo 3 dây vượt biển dài nhất thế giới 7.899m',
      'Trọn gói công viên nước Aquatopia 20 trò chơi hiện đại',
      'Check-in bãi biển Bãi Trào nước ngọc bích',
      'Quét mã QR vào cổng không cần xếp hàng'
    ],
    features: [
      'Cáp treo vượt biển dài nhất thế giới 7.899m',
      'Trọn gói công viên nước Aquatopia',
      'Vé điện tử QR xác nhận tức thì'
    ],
    description: 'Trải nghiệm cáp treo ngắm toàn cảnh đảo ngọc Phú Quốc từ trên cao, thỏa sức vui chơi tại công viên nước chủ đề hiện đại bậc nhất Đông Nam Á.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Khám phá Hòn Thơm Paradise Island',
        activities: [
          { time: '08:30', name: 'Ga An Thới lên cáp treo', desc: 'Ngắm nhìn làng chài và biển ngọc Phú Quốc', duration_min: 30 },
          { time: '09:30', name: 'Công viên nước Aquatopia', desc: 'Thử thách các đường trượt ống cảm giác mạnh', duration_min: 240 }
        ]
      }
    ]
  },
  {
    id: 6,
    code: 'TOUR-MOC-003',
    title: 'Khám Phá Cao Nguyên Mộc Châu Mùa Hoa Cải Trắng & Đồi Chè Trái Tim',
    slug: 'kham-pha-moc-chau-mua-hoa-cai-trang',
    category: 'Tour Trọn Gói',
    type: 'tour',
    base_price: 1250000,
    original_price: 1600000,
    duration_days: 2,
    capacity: 25,
    remainingSeats: 9,
    province: 'Sơn La',
    destination: 'Cao nguyên Mộc Châu',
    rating: 4.7,
    reviews_count: 58,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa đông',
    highlights: [
      'Đồi chè trái tim Mộc Châu xanh ngát',
      'Thung lũng mận Nà Ka nở hoa trắng muốt',
      'Thác Dải Yếm và cầu kính tình yêu',
      'Thưởng thức bê chao và sữa chua nếp cẩm'
    ],
    features: [
      'Đồi chè trái tim bát ngát',
      'Thung lũng hoa mận trắng Nà Ka',
      'Thưởng thức bê chao đặc sản'
    ],
    description: 'Hành trình trốn khói bụi thành phố đến với cao nguyên Mộc Châu trong lành, đắm mình giữa bạt ngàn nương chè xanh và những thung lũng hoa cải trắng.',
    cancel_policy: 'Hủy trước 48 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Đèo Thung Khe - Mộc Châu',
        activities: [
          { time: '06:30', name: 'Xuất phát từ Hà Nội', desc: 'Dừng chân chụp ảnh đèo đá trắng Thung Khe', duration_min: 240 }
        ]
      }
    ]
  },
  {
    id: 7,
    code: 'TOUR-HAG-004',
    title: 'Tour Chinh Phục Cực Cỏ Loong Cổ & Hẻm Tu Sản Sông Nho Quế',
    slug: 'chinh-phuc-lung-cu-hem-tu-san-nho-que',
    category: 'Tour Trọn Gói',
    type: 'tour',
    base_price: 2350000,
    original_price: 2800000,
    duration_days: 3,
    capacity: 20,
    remainingSeats: 5,
    province: 'Hà Giang',
    destination: 'Đồng Văn & Sông Nho Quế',
    rating: 4.9,
    reviews_count: 115,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa thu',
    highlights: [
      'Chinh phục đèo Mã Pí Lèng đệ nhất hùng quan',
      'Đi thuyền hẻm vực Tu Sản sâu nhất Đông Nam Á',
      'Lễ chào cờ thiêng liêng tại Cột cờ Lũng Cú',
      'Trải nghiệm văn hóa chợ phiên vùng cao'
    ],
    features: [
      'Đèo Mã Pí Lèng hùng vĩ',
      'Thuyền ngắm hẻm Tu Sản sông Nho Quế',
      'Cột cờ quốc gia Lũng Cú'
    ],
    description: 'Chinh phục cung đường huyền thoại của dải đất biên cương phía Bắc, ngắm hẻm vực Tu Sản sâu thẳm soi bóng dòng sông Nho Quế xanh biếc.',
    cancel_policy: 'Hủy trước 72 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Quản Bạ - Yên Minh',
        activities: [
          { time: '06:00', name: 'Đón đoàn đi Hà Giang', desc: 'Chinh phục Cổng trời Quản Bạ và Núi Đôi Cô Tiên', duration_min: 300 }
        ]
      }
    ]
  },
  {
    id: 8,
    code: 'STAY-INT-002',
    title: 'InterContinental Danang Sun Peninsula Resort Bán Đảo Sơn Trà',
    slug: 'intercontinental-danang-resort-son-tra',
    category: 'Lưu Trú Nghỉ Dưỡng',
    type: 'stay',
    base_price: 8900000,
    original_price: 11000000,
    duration_days: 2,
    capacity: 12,
    remainingSeats: 4,
    province: 'Đà Nẵng',
    destination: 'Bán Đảo Sơn Trà, Đà Nẵng',
    rating: 5.0,
    reviews_count: 178,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Mùa hè',
    highlights: [
      'Kiến trúc kiệt tác của kiến trúc sư lừng danh Bill Bensley',
      '4 tầng thiết kế: Thiên Đường, Bầu Trời, Mặt Đất và Biển Cả',
      'Bãi biển Bãi Bắc riêng tư tuyệt đối',
      'Nhà hàng La Maison 1888 đạt sao ẩm thực thế giới'
    ],
    features: [
      'Resort 5 sao đẳng cấp thế giới của Bill Bensley',
      'Bãi biển riêng tư ôm trọn vịnh Bãi Bắc',
      'Nhà hàng sao Michelin La Maison 1888'
    ],
    description: 'Khu nghỉ dưỡng sang trọng bậc nhất thế giới nép mình giữa khu bảo tồn thiên nhiên bán đảo Sơn Trà hoang sơ.',
    cancel_policy: 'Hủy trước 14 ngày hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Nghỉ dưỡng thượng lưu tại Sơn Trà',
        activities: [
          { time: '14:00', name: 'Check-in bằng cáp treo Nam Tram', desc: 'Trải nghiệm di chuyển độc đáo giữa các tầng resort', duration_min: 30 }
        ]
      }
    ]
  },
  {
    id: 9,
    code: 'TICK-BAN-003',
    title: 'Vé Cáp Treo Sun World Ba Na Hills & Check-in Cầu Vàng',
    slug: 've-cap-treo-ba-na-hills-cau-vang',
    category: 'Vé Thắng Cảnh',
    type: 'ticket',
    base_price: 900000,
    original_price: 1050000,
    duration_days: 1,
    capacity: 60,
    remainingSeats: 30,
    province: 'Đà Nẵng',
    destination: 'Bà Nà Hills, Đà Nẵng',
    rating: 4.8,
    reviews_count: 410,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Quanh năm',
    highlights: [
      'Cầu Vàng bàn tay khổng lồ biểu tượng du lịch thế giới',
      'Làng Pháp cổ kính ngập tràn hoa tươi 4 mùa',
      'Khu vui chơi trong nhà Fantasy Park hơn 100 trò chơi',
      'Trải nghiệm khí hậu 4 mùa độc đáo trong 1 ngày'
    ],
    features: [
      'Cầu Vàng bàn tay khổng lồ nổi tiếng',
      'Làng Pháp cổ kính & Fantasy Park',
      'Vé QR trực tiếp không xếp hàng'
    ],
    description: 'Thưởng ngoạn kỳ quan Cầu Vàng nổi tiếng toàn cầu, hòa mình vào không khí lễ hội châu Âu rực rỡ sắc màu trên đỉnh Bà Nà.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Khám phá xứ sở thần tiên Bà Nà Hills',
        activities: [
          { time: '08:30', name: 'Lên cáp treo tại Ga Suối Mơ', desc: 'Ngắm thác Tóc Tiên và rừng nguyên sinh Sơn Trà', duration_min: 25 },
          { time: '09:00', name: 'Check-in Cầu Vàng buổi sáng', desc: 'Thời điểm ít người và ánh sáng đẹp nhất chụp ảnh', duration_min: 90 }
        ]
      }
    ]
  },
  {
    id: 10,
    code: 'TOUR-CON-005',
    title: 'Hành Hương Côn Đảo Linh Thiêng - Viếng Mộ Cô Sáu Ban Đêm 3N2Đ',
    slug: 'hanh-huong-con-dao-linh-thieng-3n2d',
    category: 'Tour Trọn Gói',
    type: 'tour',
    base_price: 3850000,
    original_price: 4500000,
    duration_days: 3,
    capacity: 20,
    remainingSeats: 5,
    province: 'Bà Rịa - Vũng Tàu',
    destination: 'Côn Đảo & Nghĩa trang Hàng Dương',
    rating: 4.96,
    reviews_count: 112,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Nam',
    season: 'Quanh năm',
    highlights: [
      'Lễ viếng mộ Cô Sáu ban đêm linh thiêng lúc 23h',
      'Khám phá hệ thống Nhà tù Côn Đảo, Chuồng Cọp Pháp, Chuồng Cọp Mỹ',
      'Tắm biển Bãi Đầm Trầu ngắm máy bay cất hạ cánh',
      'Bao gồm xe đưa đón sân bay Cỏ Ống'
    ],
    features: [
      'Lễ viếng mộ Cô Sáu lúc 23h đêm linh thiêng',
      'Di tích lịch sử Nhà tù Côn Đảo',
      'Tắm biển Bãi Đầm Trầu ngắm máy bay'
    ],
    description: 'Hành trình về miền tâm linh linh thiêng viếng mộ nữ anh hùng Võ Thị Sáu lúc 23h đêm tại Nghĩa trang Hàng Dương, khám phá hệ thống Nhà tù Côn Đảo.',
    cancel_policy: 'Hủy trước 72 giờ hoàn cọc 80%; Hủy sau 72 giờ tính 50% phí.',
    itinerary: [
      {
        day: 1,
        title: 'Ngày 1: Hành hương đất thiêng Côn Đảo',
        activities: [
          { time: '08:30', name: 'Đón khách tại sân bay Cỏ Ống', desc: 'Xe trung chuyển đưa đoàn về khách sạn nhận phòng', duration_min: 90 },
          { time: '14:30', name: 'Thăm Di tích Lịch sử Nhà tù Côn Đảo', desc: 'Khám phá Trại Phú Hải, Chuồng Cọp Pháp, Chuồng Cọp Mỹ', duration_min: 150 },
          { time: '22:30', name: 'Lễ viếng mộ Cô Sáu tại Nghĩa trang Hàng Dương', desc: 'Lễ dâng hương ban đêm linh thiêng và cầu an', duration_min: 120 }
        ]
      }
    ]
  },
  {
    id: 11,
    code: 'EXPE-CAN-002',
    title: 'Tour Miệt Vườn Chợ Nổi Cái Răng Cần Thơ & Lò Hủ Tiếu Pizza',
    slug: 'cho-noi-cai-rang-lo-hu-tieu-pizza',
    category: 'Trải Nghiệm Bản Địa',
    type: 'experience',
    base_price: 350000,
    original_price: 450000,
    duration_days: 1,
    capacity: 25,
    remainingSeats: 12,
    province: 'Cần Thơ',
    destination: 'Chợ Nổi Cái Răng, Cần Thơ',
    rating: 4.8,
    reviews_count: 85,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Nam',
    season: 'Quanh năm',
    highlights: [
      'Xuồng máy rẽ sóng tham quan chợ nổi lúc 5h30 sáng bình minh',
      'Thưởng thức hủ tiếu nước ngọt thanh ngay trên ghe bập bềnh',
      'Học làm bánh hủ tiếu chiên giòn pizza tại lò truyền thống',
      'Thưởng thức trái cây miệt vườn tươi rói vừa hái'
    ],
    features: [
      'Đi xuồng máy chợ nổi Cái Răng lúc sáng sớm',
      'Thưởng thức hủ tiếu sông nước độc đáo',
      'Trải nghiệm làm hủ tiếu pizza giòn rụm'
    ],
    description: 'Trải nghiệm nét văn hóa giao thương sông nước độc đáo bậc nhất đồng bằng sông Cửu Long và thưởng thức ẩm thực miền Tây trứ danh.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Khám phá văn hóa sông nước Tây Đô',
        activities: [
          { time: '05:30', name: 'Lên thuyền tại Bến Ninh Kiều', desc: 'Đón bình minh sông Hậu và hướng về chợ nổi', duration_min: 45 },
          { time: '06:30', name: 'Ăn sáng hủ tiếu ghe chợ nổi', desc: 'Trải nghiệm tô hủ tiếu nóng hổi giữa chợ sông', duration_min: 45 }
        ]
      }
    ]
  },
  {
    id: 12,
    code: 'EXPE-DAL-003',
    title: 'Tour Săn Mây Cầu Đất Đà Lạt & Vườn Dâu Tây Công Nghệ Cao',
    slug: 'san-may-cau-dat-da-lat-vuon-dau-tay',
    category: 'Trải Nghiệm Bản Địa',
    type: 'experience',
    base_price: 550000,
    original_price: 700000,
    duration_days: 1,
    capacity: 18,
    remainingSeats: 6,
    province: 'Lâm Đồng',
    destination: 'Cầu Đất, Đà Lạt',
    rating: 4.9,
    reviews_count: 132,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Tây Nguyên',
    season: 'Quanh năm',
    highlights: [
      'Săn biển mây thảm gỗ Cầu Đất lúc bình minh 5h sáng',
      'Tự tay hái dâu tây giống Nhật Bản tại vườn treo sinh học',
      'Check-in tuabin gió khổng lồ giữa đồi chè cổ thụ',
      'Thưởng thức cà phê trứng nóng giữa cái lạnh cao nguyên'
    ],
    features: [
      'Đón bình minh săn biển mây thảm gỗ',
      'Tự tay hái dâu tây organic tại vườn',
      'Check-in đồi chè cổ thụ Cầu Đất'
    ],
    description: 'Chuyến săn mây sớm ngắm trọn biển mây bồng bềnh cuộn tràn qua các sườn đồi thông Đà Lạt, kết hợp hái dâu tây chín mọng.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Hành trình săn mây Cầu Đất',
        activities: [
          { time: '04:30', name: 'Xe đón khách tại trung tâm Đà Lạt', desc: 'Khởi hành sớm đến thảm gỗ Cầu Đất đón bình minh', duration_min: 45 },
          { time: '05:30', name: 'Ngắm biển mây và uống cà phê nóng', desc: 'Chụp ảnh khoảnh khắc mặt trời ló rạng', duration_min: 90 }
        ]
      }
    ]
  },
  {
    id: 13,
    code: 'STAY-VIN-003',
    title: 'Vinpearl Resort & Spa Phú Quốc - Villa Biển Riêng Tư 3N2Đ',
    slug: 'vinpearl-resort-spa-phu-quoc-villa-bien',
    category: 'Lưu Trú Nghỉ Dưỡng',
    type: 'stay',
    base_price: 6200000,
    original_price: 7800000,
    duration_days: 3,
    capacity: 10,
    remainingSeats: 2,
    province: 'Kiên Giang',
    destination: 'Bãi Dài, Bắc Đảo Phú Quốc',
    rating: 4.9,
    reviews_count: 265,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Nam',
    season: 'Quanh năm',
    highlights: [
      'Villa hồ bơi riêng biệt view hoàng hôn Bãi Dài lãng mạn',
      'Trọn gói vé vui chơi VinWonders & Vinpearl Safari mở',
      '3 bữa buffet hải sản cao cấp tiêu chuẩn quốc tế',
      'Xe điện đưa đón nội khu 24/7'
    ],
    features: [
      'Villa hồ bơi riêng view hoàng hôn biển',
      'Trọn gói vui chơi VinWonders & Safari',
      'Buffet hải sản 3 bữa phong phú'
    ],
    description: 'Nghỉ dưỡng đẳng cấp cùng gia đình tại quần thể giải trí - nghỉ dưỡng Phú Quốc United Center, tận hưởng bãi biển Bãi Dài êm đềm cát trắng.',
    cancel_policy: 'Hủy trước 10 ngày hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Check-in Villa & Thư giãn hoàng hôn',
        activities: [
          { time: '14:00', name: 'Nhận Villa hồ bơi riêng', desc: 'Thưởng thức trái cây chào mừng và set trà chiều', duration_min: 30 }
        ]
      }
    ]
  },
  {
    id: 14,
    code: 'EXPE-MUN-004',
    title: 'Lặn Biển Ngắm San Hô Hòn Mun Nha Trang Bằng Khí Scuba',
    slug: 'lan-bien-hon-mun-nha-trang-scuba',
    category: 'Trải Nghiệm Bản Địa',
    type: 'experience',
    base_price: 650000,
    original_price: 850000,
    duration_days: 1,
    capacity: 15,
    remainingSeats: 5,
    province: 'Khánh Hòa',
    destination: 'Khu bảo tồn Hòn Mun, Nha Trang',
    rating: 4.9,
    reviews_count: 98,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Mùa hè',
    highlights: [
      'Lặn bình khí cùng huấn luyện viên kèm 1:1 an toàn',
      'Khu bảo tồn biển sinh học đầu tiên và đẹp nhất Việt Nam',
      'Chiêm ngưỡng hơn 350 loài san hô và đàn cá biển nhiệt đới',
      'Tặng kèm bộ ảnh & video dưới nước chất lượng cao'
    ],
    features: [
      'Lặn bình khí kèm huấn luyện viên 1:1',
      'Khu bảo tồn san hô tự nhiên Hòn Mun',
      'Tặng ảnh và video dưới nước 4K'
    ],
    description: 'Khám phá thế giới đại dương huyền bí tại rạn san hô Hòn Mun, bơi lội giữa hàng trăm đàn cá rực rỡ sắc màu dưới làn nước biển trong vắt.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Lặn biển thám hiểm Hòn Mun',
        activities: [
          { time: '08:00', name: 'Cano đón khách tại Cảng Cầu Đá', desc: 'Khởi hành ra vùng lõi khu bảo tồn Hòn Mun', duration_min: 30 },
          { time: '09:00', name: 'Huấn luyện kỹ năng & Lặn thử', desc: 'Lặn sâu 6-10m chiêm ngưỡng san hô', duration_min: 90 }
        ]
      }
    ]
  },
  {
    id: 15,
    code: 'TICK-HUE-004',
    title: 'Vé Tham Quan Quần Thể Di Tích Cố Đô Huế Lăng Tẩm Triều Nguyễn',
    slug: 've-tham-quan-co-do-hue-lang-tam-trieu-nguyen',
    category: 'Vé Thắng Cảnh',
    type: 'ticket',
    base_price: 420000,
    original_price: 500000,
    duration_days: 1,
    capacity: 40,
    remainingSeats: 18,
    province: 'Thừa Thiên Huế',
    destination: 'Đại Nội Huế & Lăng Tẩm',
    rating: 4.8,
    reviews_count: 118,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Mùa thu',
    highlights: [
      'Vé trọn gói Đại Nội Hoàng Cung & 3 lăng: Khải Định, Minh Mạng, Tự Đức',
      'Hạn sử dụng vé 2 ngày linh hoạt lịch trình tham quan',
      'Hỗ trợ thiết bị thuyết minh tự động Audio Guide hiện đại',
      'Thưởng thức nhã nhạc cung đình Huế tại Nhà hát Duyệt Thị Đường'
    ],
    features: [
      'Vé trọn gói Đại Nội & 3 Lăng Tẩm lớn',
      'Thời hạn sử dụng linh hoạt 2 ngày',
      'Vé điện tử QR quét mã vào thẳng cổng'
    ],
    description: 'Tìm về dấu ấn vàng son của triều đại phong kiến cuối cùng tại Việt Nam, chiêm ngưỡng kiến trúc cung đình tinh xảo và các lăng tẩm trầm mặc.',
    cancel_policy: 'Hủy trước 24 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Chiêm ngưỡng kiến trúc Cố Đô',
        activities: [
          { time: '08:00', name: 'Tham quan Hoàng Thành Huế', desc: 'Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành', duration_min: 150 }
        ]
      }
    ]
  },
  {
    id: 16,
    code: 'TOUR-PHY-006',
    title: 'Tour Xứ Nẫu Phú Yên - Hoa Vàng Trên Cỏ Xanh & Gành Đá Đĩa 3N2Đ',
    slug: 'tour-phu-yen-hoa-vang-tren-co-xanh-ganh-da-dia',
    category: 'Tour Trọn Gói',
    type: 'tour',
    base_price: 1650000,
    original_price: 2100000,
    duration_days: 3,
    capacity: 25,
    remainingSeats: 8,
    province: 'Phú Yên',
    destination: 'Ghềnh Đá Đĩa & Bãi Xép',
    rating: 4.85,
    reviews_count: 82,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Mùa hè',
    highlights: [
      'Chiêm ngưỡng Ghềnh Đá Đĩa cấu trúc lục lăng độc nhất vô nhị',
      'Check-in Bãi Xép bối cảnh phim Tôi thấy hoa vàng trên cỏ xanh',
      'Đón những tia bình minh đầu tiên của đất liền tại Mũi Điện',
      'Thưởng thức mắt cá ngừ đại dương hầm thuốc bắc béo ngậy'
    ],
    features: [
      'Ghềnh Đá Đĩa kỳ quan địa chất tự nhiên',
      'Đồi cỏ Bãi Xép ngắm biển trong vắt',
      'Đón bình minh tại Mũi Điện cực Đông'
    ],
    description: 'Hành trình khám phá vẻ đẹp hoang sơ, yên bình của vùng đất duyên hải Nam Trung Bộ với những bãi biển thơ mộng và ẩm thực biển đậm đà.',
    cancel_policy: 'Hủy trước 48 giờ hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Tuy Hòa - Tháp Nhạn - Bãi Xép',
        activities: [
          { time: '09:00', name: 'Đón sân bay Tuy Hòa', desc: 'Thăm tháp Nhạn ngắm toàn cảnh sông Ba', duration_min: 90 },
          { time: '14:30', name: 'Check-in đồi xương rồng Bãi Xép', desc: 'Tắm biển bãi cát vàng mịn', duration_min: 150 }
        ]
      }
    ]
  },
  {
    id: 21,
    code: 'TOUR-QBI-021',
    title: 'Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ',
    slug: 'tour-tham-hiem-hang-en-quang-binh-3n2d',
    category: 'Du lịch mạo hiểm & Trekking',
    type: 'experience',
    base_price: 6990000,
    original_price: 7990000,
    duration_days: 3,
    capacity: 16,
    remainingSeats: 5,
    province: 'Quảng Bình',
    destination: 'Vườn quốc gia Phong Nha - Kẻ Bàng',
    rating: 4.95,
    reviews_count: 64,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Trung',
    season: 'Mùa xuân',
    highlights: [
      'Chinh phục hang động tự nhiên lớn thứ 3 thế giới',
      'Cắm trại qua đêm bên trong bãi cát ngầm của Hang Én',
      'Lội suối Rào Thương và băng qua rừng nguyên sinh Kẻ Bàng',
      'Đội ngũ trợ lý an toàn và chuyên gia hang động chuyên nghiệp'
    ],
    features: [
      'Hang Én kỳ vĩ lớn thứ 3 thế giới',
      'Cắm trại lều ngầm độc đáo',
      'Trekking rừng nguyên sinh Kẻ Bàng'
    ],
    description: 'Trải nghiệm hành trình thám hiểm hang động tự nhiên hoang sơ và kỳ vĩ bậc nhất thế giới tại Vườn quốc gia Phong Nha - Kẻ Bàng.',
    cancel_policy: 'Hủy trước 7 ngày hoàn 80%; Hủy trong vòng 48h không hoàn tiền do chi phí hậu cần đặc thù.',
    itinerary: [
      {
        day: 1,
        title: 'Đồng Hới - Bản Đoòng - Hang Én',
        activities: [
          { time: '08:00', name: 'Xe đón tại Đồng Hới di chuyển vào Vườn Quốc Gia', desc: 'Hướng dẫn an toàn và phổ biến nội quy bảo tồn', duration_min: 120 },
          { time: '12:00', name: 'Nghỉ ngơi và ăn trưa tại Bản Đoòng', desc: 'Giao lưu cùng đồng bào Bru-Vân Kiều', duration_min: 60 },
          { time: '16:00', name: 'Đến cửa Hang Én và dựng lều', desc: 'Tắm suối ngầm và ăn tối BBQ', duration_min: 180 }
        ]
      }
    ]
  },
  {
    id: 22,
    code: 'TOUR-HGI-022',
    title: 'Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ',
    slug: 'kham-pha-cao-nguyen-da-dong-van-3n2d',
    category: 'Du lịch văn hóa & Lễ hội',
    type: 'tour',
    base_price: 2890000,
    original_price: 3490000,
    duration_days: 3,
    capacity: 25,
    remainingSeats: 7,
    province: 'Hà Giang',
    destination: 'Cao nguyên đá Đồng Văn',
    rating: 4.88,
    reviews_count: 112,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    side_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    region: 'Miền Bắc',
    season: 'Mùa thu',
    highlights: [
      'Chinh phục Đèo Mã Pí Lèng đệ nhất hùng quan',
      'Đi thuyền trên hẻm Tu Sản dòng sông Nho Quế ngọc bích',
      'Check-in Cột cờ Lũng Cú điểm cực Bắc thiêng liêng',
      'Thưởng thức mùa hoa tam giác mạch và bánh tam giác mạch nướng'
    ],
    features: [
      'Hẻm Tu Sản & Sông Nho Quế',
      'Cột cờ Lũng Cú cực Bắc',
      'Cao nguyên đá di sản UNESCO'
    ],
    description: 'Hành trình chiêm ngưỡng vẻ đẹp hùng vĩ của Công viên Địa chất Toàn cầu UNESCO Cao nguyên đá Đồng Văn.',
    cancel_policy: 'Hủy trước 3 ngày hoàn 100%.',
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Hà Giang - Quản Bạ - Yên Minh',
        activities: [
          { time: '06:30', name: 'Xuất phát từ Hà Nội đi Hà Giang', desc: 'Xe limousine chất lượng cao', duration_min: 300 },
          { time: '14:00', name: 'Dừng chân Cổng Trời Quản Bạ', desc: 'Ngắm Núi Đôi Cô Tiên và rừng thông Yên Minh', duration_min: 90 }
        ]
      }
    ]
  }
];

// Gợi ý tour tương đồng dùng thuật toán Python TF-IDF + Cosine Similarity
// Khớp 100% với endpoint GET /api/v1/recommendations?user_id=1 của Nguyễn Thị Ly (V2)
export const PYTHON_RECOMMENDATIONS: Record<number, RecommendationItem[]> = {
  1: [
    {
      product_id: 21,
      title: 'Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ',
      base_price: 6990000,
      province: 'Quảng Bình',
      destination: 'Vườn quốc gia Phong Nha - Kẻ Bàng',
      category: 'Du lịch mạo hiểm & Trekking',
      similarity_score: 0.942,
      match_reason: 'Khớp sở thích khám phá thiên nhiên và hang động (Fallback chuẩn)',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 22,
      title: 'Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ',
      base_price: 2890000,
      province: 'Hà Giang',
      destination: 'Cao nguyên đá Đồng Văn',
      category: 'Du lịch văn hóa & Lễ hội',
      similarity_score: 0.885,
      match_reason: 'Khớp mùa hoa tam giác mạch và trải nghiệm văn hóa bản địa',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 1,
      title: 'Tour Du Thuyền 5 Sao Khám Phá Vịnh Hạ Long 2N1Đ',
      base_price: 2850000,
      province: 'Quảng Ninh',
      destination: 'Vịnh Hạ Long',
      category: 'Du lịch biển đảo & Nghỉ dưỡng',
      similarity_score: 0.820,
      match_reason: 'Tour tiêu biểu được đặt nhiều nhất trên hệ thống',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    }
  ],
  10: [
    {
      product_id: 1,
      title: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
      base_price: 1950000,
      province: 'Quảng Ninh',
      destination: 'Vịnh Hạ Long',
      category: 'Tour Trọn Gói',
      similarity_score: 0.912,
      match_reason: 'Tương đồng cao về loại hình biển đảo & dịch vụ nghỉ dưỡng cao cấp',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 16,
      title: 'Tour Xứ Nẫu Phú Yên - Hoa Vàng Trên Cỏ Xanh & Gành Đá Đĩa 3N2Đ',
      base_price: 1650000,
      province: 'Phú Yên',
      destination: 'Ghềnh Đá Đĩa & Bãi Xép',
      category: 'Tour Trọn Gói',
      similarity_score: 0.865,
      match_reason: 'Tương đồng về trải nghiệm biển đảo hoang sơ và cảnh quan thiên nhiên kỳ thú',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 2,
      title: 'Quần Thể Danh Thắng Tràng An - Tuyệt Tình Cốc 1 Ngày',
      base_price: 780000,
      province: 'Ninh Bình',
      destination: 'Tràng An & Bái Đính',
      category: 'Vé Thắng Cảnh',
      similarity_score: 0.835,
      match_reason: 'Phù hợp du khách quan tâm đến du lịch tâm linh và chiêm bái di sản',
      source: 'python_service',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

// Fallback MySQL khi tắt dịch vụ Python
export const MYSQL_FALLBACK_RECOMMENDATIONS: Record<number, RecommendationItem[]> = {
  1: [
    {
      product_id: 7,
      title: 'Tour Chinh Phục Cực Cỏ Loong Cổ & Hẻm Tu Sản (Fallback MySQL)',
      base_price: 2350000,
      province: 'Hà Giang',
      destination: 'Đồng Văn & Nho Quế',
      category: 'Tour Trọn Gói',
      similarity_score: 0.78,
      match_reason: 'Khớp danh mục [Tour Trọn Gói] và biên độ giá ±40% từ bảng products MySQL',
      source: 'mysql_fallback',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 16,
      title: 'Tour Xứ Nẫu Phú Yên 3N2Đ (Fallback MySQL)',
      base_price: 1650000,
      province: 'Phú Yên',
      destination: 'Ghềnh Đá Đĩa',
      category: 'Tour Trọn Gói',
      similarity_score: 0.72,
      match_reason: 'Khớp danh mục [Tour Trọn Gói] cùng phân khúc ngân sách từ MySQL duPhong()',
      source: 'mysql_fallback',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    }
  ],
  10: [
    {
      product_id: 16,
      title: 'Tour Xứ Nẫu Phú Yên 3N2Đ (Fallback MySQL)',
      base_price: 1650000,
      province: 'Phú Yên',
      destination: 'Ghềnh Đá Đĩa',
      category: 'Tour Trọn Gói',
      similarity_score: 0.76,
      match_reason: 'Khớp danh mục [Tour Trọn Gói] và khoảng giá lân cận từ MySQL',
      source: 'mysql_fallback',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      product_id: 1,
      title: 'Tour Vịnh Hạ Long 2N1Đ (Fallback MySQL)',
      base_price: 1950000,
      province: 'Quảng Ninh',
      destination: 'Vịnh Hạ Long',
      category: 'Tour Trọn Gói',
      similarity_score: 0.74,
      match_reason: 'Khớp loại hình biển đảo từ hàm duPhong() dự phòng MySQL',
      source: 'mysql_fallback',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

export const SEASONALITY_DATA: SeasonalityStat[] = [
  { month: 1, monthName: 'Tháng 1', seatsSold: 198, totalSeats: 220, occupancyRate: 90.0, avgPrice: 3250000, seasonType: 'Cao điểm' },
  { month: 2, monthName: 'Tháng 2 (Tết)', seatsSold: 215, totalSeats: 220, occupancyRate: 97.7, avgPrice: 3800000, seasonType: 'Cao điểm' },
  { month: 3, monthName: 'Tháng 3', seatsSold: 184, totalSeats: 230, occupancyRate: 80.0, avgPrice: 2950000, seasonType: 'Cao điểm' },
  { month: 4, monthName: 'Tháng 4 (Lễ)', seatsSold: 228, totalSeats: 240, occupancyRate: 95.0, avgPrice: 3500000, seasonType: 'Cao điểm' },
  { month: 5, monthName: 'Tháng 5', seatsSold: 142, totalSeats: 240, occupancyRate: 59.2, avgPrice: 2450000, seasonType: 'Thấp điểm' },
  { month: 6, monthName: 'Tháng 6', seatsSold: 156, totalSeats: 250, occupancyRate: 62.4, avgPrice: 2600000, seasonType: 'Thấp điểm' },
  { month: 7, monthName: 'Tháng 7 (Hè)', seatsSold: 235, totalSeats: 250, occupancyRate: 94.0, avgPrice: 3400000, seasonType: 'Cao điểm' },
  { month: 8, monthName: 'Tháng 8 (Hè)', seatsSold: 210, totalSeats: 240, occupancyRate: 87.5, avgPrice: 3100000, seasonType: 'Cao điểm' },
  { month: 9, monthName: 'Tháng 9', seatsSold: 118, totalSeats: 220, occupancyRate: 53.6, avgPrice: 2200000, seasonType: 'Thấp điểm' },
  { month: 10, monthName: 'Tháng 10', seatsSold: 130, totalSeats: 220, occupancyRate: 59.1, avgPrice: 2350000, seasonType: 'Thấp điểm' },
  { month: 11, monthName: 'Tháng 11', seatsSold: 145, totalSeats: 230, occupancyRate: 63.0, avgPrice: 2550000, seasonType: 'Thấp điểm' },
  { month: 12, monthName: 'Tháng 12 (Noel)', seatsSold: 210, totalSeats: 230, occupancyRate: 91.3, avgPrice: 3600000, seasonType: 'Cao điểm' }
];

export const REGION_REVENUE_DATA: RegionRevenue[] = [
  { region: 'Miền Bắc (Đông & Tây Bắc)', revenue: 48500000, bookingsCount: 52, color: '#3B82F6' },
  { region: 'Miền Trung & Tây Nguyên', revenue: 39200000, bookingsCount: 41, color: '#10B981' },
  { region: 'Biển Đảo (Phú Quốc, Hạ Long, Côn Đảo)', revenue: 26800000, bookingsCount: 29, color: '#F59E0B' },
  { region: 'Miền Nam & ĐBS Cửu Long', revenue: 14000000, bookingsCount: 20, color: '#8B5CF6' }
];
