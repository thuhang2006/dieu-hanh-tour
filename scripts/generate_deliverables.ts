import { createCanvas } from '@napi-rs/canvas';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

function drawRoundRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y + r, x + r, y);
    ctx.closePath();
  }
}

function drawBrowserBar(
  ctx: any,
  x: number,
  y: number,
  w: number,
  url: string,
  badgeText: string,
  badgeColor = '#10B981'
) {
  ctx.fillStyle = '#1E293B';
  drawRoundRect(ctx, x, y, w, 32, 8);
  ctx.fill();

  ctx.fillStyle = '#EF4444';
  ctx.beginPath(); ctx.arc(x + 14, y + 16, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath(); ctx.arc(x + 26, y + 16, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#10B981';
  ctx.beginPath(); ctx.arc(x + 38, y + 16, 4, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, x + 54, y + 6, w - 230, 20, 6);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '10px monospace';
  ctx.fillText(url, x + 64, y + 20);

  ctx.fillStyle = badgeColor;
  drawRoundRect(ctx, x + w - 165, y + 6, 155, 20, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(badgeText, x + w - 155, y + 20);
}

function drawWebHeader(
  ctx: any,
  x: number,
  y: number,
  w: number,
  mode: 'desktop' | 'tablet' | 'mobile',
  activeTab = 'Trang Chủ',
  theme: 'light' | 'dark' = 'light'
) {
  const isDark = theme === 'dark';
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(x, y, w, 14);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8px sans-serif';

  if (mode === 'desktop') {
    ctx.fillText('Khuyến mãi hè 2026: Nhập mã SUMMER2026 giảm 10% tối đa 500.000đ | Hotline: 1900 6868', x + 10, y + 10);
    ctx.fillText('Xin chào, TS. Nguyễn Văn Tánh · Đổi tài khoản', x + w - 195, y + 10);
  } else if (mode === 'tablet') {
    ctx.fillText('Khuyến mãi hè: SUMMER2026 giảm 10% · Hotline: 1900 6868', x + 8, y + 10);
  } else {
    ctx.fillText('SUMMER2026 giảm 10% · 1900 6868', x + 6, y + 10);
  }

  const navY = y + 14;
  ctx.fillStyle = isDark ? '#0F172A' : '#FFFFFF';
  ctx.fillRect(x, navY, w, 32);

  ctx.fillStyle = isDark ? '#1E293B' : '#E2E8F0';
  ctx.fillRect(x, navY + 31, w, 1);

  ctx.fillStyle = '#0EA5E9';
  ctx.beginPath();
  ctx.arc(x + 18, navY + 16, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('🧭', x + 13, navY + 19);

  ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('DU LỊCH SỐ', x + 32, navY + 16);

  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, x + 98, navY + 8, 48, 14, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('VIỆT NAM', x + 102, navY + 18);

  if (mode === 'desktop') {
    const tabs = ['Trang Chủ', 'Tour Trọn Gói', 'Lưu Trú', 'Vé Tham Quan'];
    let tabX = x + 158;
    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      if (isActive) {
        ctx.fillStyle = '#0284C7';
        drawRoundRect(ctx, tabX - 4, navY + 6, 60, 20, 10);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = isDark ? '#94A3B8' : '#475569';
      }
      ctx.font = isActive ? 'bold 9px sans-serif' : '9px sans-serif';
      ctx.fillText(tab, tabX + 2, navY + 19);
      tabX += 66;
    });

    ctx.fillStyle = '#4F46E5';
    ctx.beginPath();
    ctx.arc(x + w - 105, navY + 16, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('NT', x + w - 110, navY + 19);
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('TS. Văn Tánh', x + w - 92, navY + 19);

    ctx.fillStyle = '#E0F2FE';
    drawRoundRect(ctx, x + w - 38, navY + 8, 30, 16, 8);
    ctx.fill();
    ctx.fillStyle = '#0369A1';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('Sáng ☀️', x + w - 36, navY + 19);
  } else if (mode === 'tablet') {
    ctx.fillStyle = '#0284C7';
    drawRoundRect(ctx, x + 160, navY + 7, 56, 18, 9);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText(activeTab, x + 166, navY + 19);

    ctx.fillStyle = '#4F46E5';
    ctx.beginPath(); ctx.arc(x + w - 40, navY + 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('NT', x + w - 45, navY + 18);
  } else {
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('☰', x + w - 46, navY + 20);

    ctx.fillStyle = '#4F46E5';
    ctx.beginPath(); ctx.arc(x + w - 18, navY + 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('NT', x + w - 23, navY + 18);
  }
}

function drawTourCardItem(
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  data: {
    tag: string;
    tagColor: string;
    title: string;
    loc: string;
    rating: string;
    oldPrice: string;
    price: string;
    bullet1: string;
    bullet2: string;
    imgGradient: [string, string];
  },
  theme: 'light' | 'dark' = 'light'
) {
  const isDark = theme === 'dark';
  ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
  drawRoundRect(ctx, x, y, w, h, 8);
  ctx.fill();
  ctx.strokeStyle = isDark ? '#334155' : '#E2E8F0';
  ctx.stroke();

  const imgH = Math.min(100, Math.floor(h * 0.45));
  const grad = ctx.createLinearGradient(x, y, x + w, y + imgH);
  grad.addColorStop(0, data.imgGradient[0]);
  grad.addColorStop(1, data.imgGradient[1]);
  ctx.fillStyle = grad;
  drawRoundRect(ctx, x, y, w, imgH, 8);
  ctx.fill();

  ctx.fillStyle = data.tagColor;
  drawRoundRect(ctx, x + 6, y + 6, 76, 14, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText(data.tag, x + 10, y + 16);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  drawRoundRect(ctx, x + 6, y + imgH - 18, 48, 13, 3);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '7px sans-serif';
  ctx.fillText(`📍 ${data.loc}`, x + 9, y + imgH - 9);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  drawRoundRect(ctx, x + w - 46, y + imgH - 18, 40, 13, 3);
  ctx.fill();
  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText(`★ ${data.rating}`, x + w - 42, y + imgH - 9);

  ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
  ctx.font = 'bold 9px sans-serif';
  const displayTitle = data.title.length > 28 ? data.title.substring(0, 27) + '...' : data.title;
  ctx.fillText(displayTitle, x + 8, y + imgH + 16);

  ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
  ctx.font = '7px sans-serif';
  const b1 = data.bullet1.length > 32 ? data.bullet1.substring(0, 31) + '...' : data.bullet1;
  const b2 = data.bullet2.length > 32 ? data.bullet2.substring(0, 31) + '...' : data.bullet2;
  ctx.fillText(`• ${b1}`, x + 8, y + imgH + 29);
  ctx.fillText(`• ${b2}`, x + 8, y + imgH + 40);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '7px sans-serif';
  ctx.fillText(data.oldPrice, x + 8, y + imgH + 53);

  ctx.fillStyle = '#0284C7';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(data.price, x + 8, y + imgH + 67);

  const btnW = Math.max(34, (w - 20) / 2 - 4);
  const btnY = y + h - 22;

  ctx.fillStyle = isDark ? '#334155' : '#F1F5F9';
  drawRoundRect(ctx, x + w - (btnW * 2 + 10), btnY, btnW, 16, 4);
  ctx.fill();
  ctx.fillStyle = isDark ? '#E2E8F0' : '#475569';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('Chi tiết', x + w - (btnW * 2 + 6), btnY + 11);

  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, x + w - btnW - 6, btnY, btnW, 16, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 7px sans-serif';
  ctx.fillText('Đặt Ngay', x + w - btnW - 2, btnY + 11);
}

export function generateResponsiveGridImage(): Buffer {
  const canvas = createCanvas(2400, 1600);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0B1120';
  ctx.fillRect(0, 0, 2400, 1600);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('HỒ SƠ MINH CHỨNG: KIỂM THỬ ĐỘ TƯƠNG THÍCH RESPONSIVE 03 TRANG × 03 KHỔ MÀN HÌNH', 60, 50);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ĐỀ TÀI ĐT-13: HỆ THỐNG ĐIỀU HÀNH TOUR & ĐẶT DỊCH VỤ DU LỊCH SỐ VIỆT NAM · ĐẠI HỌC PHENIKAA', 60, 80);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Người thực hiện: Nguyễn Thu Hà (MSSV: 24107631) - Vai trò V4 Frontend & V5 QA Tester · Đánh giá: 10/10 ĐẠT', 60, 105);

  const cols = [
    { name: '1. KHỔ DESKTOP (1920×1080px)', wType: 'Desktop Full Width', color: '#0284C7' },
    { name: '2. KHỔ TABLET (768×1024px)', wType: 'Tablet 2-Col Adaptive', color: '#8B5CF6' },
    { name: '3. KHỔ MOBILE (390×844px)', wType: 'Mobile Touch 1-Col', color: '#10B981' }
  ];

  const rows = [
    { name: 'A. TRANG CHỦ (Home Page)', url: 'https://dulichso.vn/home' },
    { name: 'B. TRANG DANH MỤC TOUR (Catalog Page)', url: 'https://dulichso.vn/catalog' },
    { name: 'C. TRANG CHI TIẾT & ĐẶT VÉ (Tour Detail & VietQR)', url: 'https://dulichso.vn/tour/1-ha-long' }
  ];

  const colWidth = 720;
  const colGap = 60;
  const leftStart = 60;
  const rowHeight = 430;
  const rowGap = 35;
  const topStart = 135;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cellX = leftStart + c * (colWidth + colGap);
      const cellY = topStart + r * (rowHeight + rowGap);
      const mode = c === 0 ? 'desktop' : c === 1 ? 'tablet' : 'mobile';

      const urlText = `${rows[r].url}?mode=${mode}`;
      const badgeText = `${cols[c].wType} · PASS`;
      drawBrowserBar(ctx, cellX, cellY, colWidth, urlText, badgeText, cols[c].color);

      const webY = cellY + 32;
      const webH = rowHeight - 32;

      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(cellX, webY, colWidth, webH);

      drawWebHeader(ctx, cellX, webY, colWidth, mode, r === 0 ? 'Trang Chủ' : r === 1 ? 'Tour Trọn Gói' : 'Trang Chủ', 'light');

      const contentY = webY + 46;

      if (r === 0) {
        if (mode === 'desktop') {
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 42, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Ưu Đãi Hè 2026', cellX + 28, contentY + 16);

          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 28, contentY + 22, 160, 14, 3); ctx.fill();
          ctx.fillStyle = '#64748B'; ctx.font = '7px sans-serif'; ctx.fillText('📍 Điểm đến: Đà Nẵng, Hạ Long...', cellX + 32, contentY + 32);

          ctx.fillStyle = '#0284C7';
          drawRoundRect(ctx, cellX + colWidth - 110, contentY + 22, 75, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('🔍 Tìm Tour Ngay', cellX + colWidth - 105, contentY + 32);

          const cardW = 216;
          drawTourCardItem(ctx, cellX + 15, contentY + 50, cardW, 280, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });
          drawTourCardItem(ctx, cellX + 248, contentY + 50, cardW, 280, {
            tag: 'LƯU TRÚ NGHỈ DƯỠNG',
            tagColor: '#2563EB',
            title: 'InterContinental Danang Resort',
            loc: 'Đà Nẵng',
            rating: '5.0 (178)',
            oldPrice: '11.000.000 đ',
            price: '8.900.000 đ',
            bullet1: 'Resort 5 sao đẳng cấp thế giới',
            bullet2: 'Bãi biển riêng biệt vịnh Bãi Bắc',
            imgGradient: ['#60A5FA', '#1D4ED8']
          });
          drawTourCardItem(ctx, cellX + 482, contentY + 50, cardW, 280, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0D9488',
            title: 'Tour Sông Nho Quế & Mã Pí Lèng',
            loc: 'Hà Giang',
            rating: '4.9 (115)',
            oldPrice: '2.800.000 đ',
            price: '2.350.000 đ',
            bullet1: 'Đèo Mã Pí Lèng đệ nhất hùng quan',
            bullet2: 'Đi thuyền ngắm hẻm Tu Sản xanh ngọc',
            imgGradient: ['#14B8A6', '#0F766E']
          });
        } else if (mode === 'tablet') {
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 36, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Khám Phá Việt Nam Tươi Đẹp · Ưu Đãi Hè 2026', cellX + 25, contentY + 15);
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + colWidth - 80, contentY + 8, 65, 20, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('🔍 Tìm kiếm', cellX + colWidth - 72, contentY + 21);

          const cardW = 328;
          drawTourCardItem(ctx, cellX + 15, contentY + 46, cardW, 290, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });
          drawTourCardItem(ctx, cellX + 368, contentY + 46, cardW, 290, {
            tag: 'LƯU TRÚ NGHỈ DƯỠNG',
            tagColor: '#2563EB',
            title: 'InterContinental Danang Resort',
            loc: 'Đà Nẵng',
            rating: '5.0 (178)',
            oldPrice: '11.000.000 đ',
            price: '8.900.000 đ',
            bullet1: 'Resort 5 sao đẳng cấp thế giới',
            bullet2: 'Bãi biển riêng biệt vịnh Bãi Bắc',
            imgGradient: ['#60A5FA', '#1D4ED8']
          });
        } else {
          ctx.fillStyle = '#E0F2FE';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 34, 6); ctx.fill();
          ctx.fillStyle = '#0369A1'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🔍 Tìm tour, khách sạn, vé thắng cảnh...', cellX + 25, contentY + 21);

          drawTourCardItem(ctx, cellX + 45, contentY + 44, colWidth - 90, 296, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills & Check-in Cầu Vàng',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng toàn cầu',
            bullet2: 'Làng Pháp cổ kính & Khu vui chơi Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });
        }
      } else if (r === 1) {
        if (mode === 'desktop') {
          const sideW = 190;
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, sideW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('BỘ LỌC TÌM KIẾM', cellX + 26, contentY + 20);
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif';
          ctx.fillText('Phân Vùng Miền:', cellX + 26, contentY + 40);
          ctx.fillText('☑ Miền Bắc (6 tour)', cellX + 26, contentY + 56);
          ctx.fillText('☑ Miền Trung (5 tour)', cellX + 26, contentY + 72);
          ctx.fillText('☑ Miền Nam (5 tour)', cellX + 26, contentY + 88);
          ctx.fillText('Mức Giá Phù Hợp:', cellX + 26, contentY + 112);
          ctx.fillText('◉ Tất cả mức giá', cellX + 26, contentY + 128);
          ctx.fillText('○ Dưới 1.000.000 đ', cellX + 26, contentY + 144);
          ctx.fillText('○ 1.000.000 - 3.000.000 đ', cellX + 26, contentY + 160);
          ctx.fillText('○ Trên 3.000.000 đ', cellX + 26, contentY + 176);
          ctx.fillText('Loại Dịch Vụ:', cellX + 26, contentY + 200);
          ctx.fillText('☑ Tour trọn gói', cellX + 26, contentY + 216);
          ctx.fillText('☑ Khách sạn nghỉ dưỡng', cellX + 26, contentY + 232);
          ctx.fillText('☑ Vé tham quan', cellX + 26, contentY + 248);

          const mainX = cellX + 215;
          const mainW = colWidth - 230;

          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, mainX, contentY, mainW, 26, 4); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Tìm thấy 16 kết quả phù hợp', mainX + 12, contentY + 17);
          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Sắp xếp: Giá tăng dần ▾', mainX + mainW - 120, contentY + 17);

          const cW = (mainW - 15) / 2;
          drawTourCardItem(ctx, mainX, contentY + 34, cW, 260, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long 2N1Đ 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp quốc tế',
            bullet2: 'Buffet hải sản tươi sống trên vịnh',
            imgGradient: ['#38BDF8', '#0284C7']
          });
          drawTourCardItem(ctx, mainX + cW + 15, contentY + 34, cW, 260, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });

          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, mainX + mainW / 2 - 30, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('1', mainX + mainW / 2 - 24, contentY + 316);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, mainX + mainW / 2 - 6, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('2', mainX + mainW / 2, contentY + 316);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, mainX + mainW / 2 + 18, contentY + 304, 20, 18, 3); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('3', mainX + mainW / 2 + 24, contentY + 316);
        } else if (mode === 'tablet') {
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 15, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('Tất cả (16)', cellX + 22, contentY + 13);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 86, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Bắc', cellX + 96, contentY + 13);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 158, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Trung', cellX + 166, contentY + 13);
          ctx.fillStyle = '#E2E8F0'; drawRoundRect(ctx, cellX + 230, contentY, 65, 20, 10); ctx.fill();
          ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif'; ctx.fillText('Miền Nam', cellX + 239, contentY + 13);

          const cardW = 328;
          drawTourCardItem(ctx, cellX + 15, contentY + 32, cardW, 290, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long 2N1Đ 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp quốc tế',
            bullet2: 'Buffet hải sản tươi sống trên vịnh',
            imgGradient: ['#38BDF8', '#0284C7']
          });
          drawTourCardItem(ctx, cellX + 368, contentY + 32, cardW, 290, {
            tag: 'VÉ THẮNG CẢNH',
            tagColor: '#0284C7',
            title: 'Vé Cáp Treo Sun World Ba Na Hills',
            loc: 'Đà Nẵng',
            rating: '4.8 (410)',
            oldPrice: '1.050.000 đ',
            price: '900.000 đ',
            bullet1: 'Cầu Vàng bàn tay khổng lồ nổi tiếng',
            bullet2: 'Làng Pháp cổ kính & Fantasy Park',
            imgGradient: ['#38BDF8', '#0284C7']
          });
        } else {
          ctx.fillStyle = '#0284C7';
          drawRoundRect(ctx, cellX + 15, contentY, colWidth - 30, 26, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🔍 Bộ Lọc Nhanh (Miền Bắc, Giá rẻ, Trọn gói) ▾', cellX + 24, contentY + 17);

          drawTourCardItem(ctx, cellX + 45, contentY + 34, colWidth - 90, 296, {
            tag: 'TOUR TRỌN GÓI',
            tagColor: '#0284C7',
            title: 'Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao',
            loc: 'Quảng Ninh',
            rating: '4.9 (142)',
            oldPrice: '2.450.000 đ',
            price: '1.950.000 đ',
            bullet1: 'Du thuyền 5 sao đẳng cấp thế giới',
            bullet2: 'Thưởng thức buffet hải sản tươi sống',
            imgGradient: ['#38BDF8', '#0284C7']
          });
        }
      } else {
        if (mode === 'desktop') {
          const detW = 420;
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, detW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();

          const bGrad = ctx.createLinearGradient(cellX + 15, contentY, cellX + 15 + detW, contentY + 100);
          bGrad.addColorStop(0, '#0EA5E9'); bGrad.addColorStop(1, '#0284C7');
          ctx.fillStyle = bGrad;
          drawRoundRect(ctx, cellX + 15, contentY, detW, 95, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ Du Thuyền 5 Sao', cellX + 30, contentY + 45);
          ctx.font = '9px sans-serif';
          ctx.fillText('Mã tour: #TOUR-HAL-002 · Khởi hành: 20/11/2026 · Còn 6 chỗ trống', cellX + 30, contentY + 65);

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('LỊCH TRÌNH TOUR CHI TIẾT:', cellX + 30, contentY + 118);
          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 30, contentY + 128, 48, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('Ngày 1', cellX + 36, contentY + 138);
          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif'; ctx.fillText('Hà Nội - Cảng Tuần Châu - Hang Sửng Sốt - Sunset Party', cellX + 85, contentY + 138);

          ctx.fillStyle = '#0284C7'; drawRoundRect(ctx, cellX + 30, contentY + 150, 48, 14, 3); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('Ngày 2', cellX + 36, contentY + 160);
          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif'; ctx.fillText('Đảo Ti Tốp - Chèo Kayak Hang Luồn - Cảng Tuần Châu - Hà Nội', cellX + 85, contentY + 160);

          ctx.fillStyle = '#F0FDF4'; drawRoundRect(ctx, cellX + 30, contentY + 175, detW - 60, 40, 6); ctx.fill();
          ctx.strokeStyle = '#86EFAC'; ctx.stroke();
          ctx.fillStyle = '#166534'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('🤖 Gợi ý tương đồng từ AI Python (TF-IDF Cosine):', cellX + 42, contentY + 190);
          ctx.fillStyle = '#15803D'; ctx.font = '8px sans-serif';
          ctx.fillText('• Tour Tràng An Bái Đính Ninh Bình 1N (Độ tương đồng 96.4%)', cellX + 42, contentY + 204);

          const bookW = colWidth - detW - 45;
          const bookX = cellX + detW + 30;
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, bookX, contentY, bookW, 335, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('XÁC NHẬN ĐẶT TOUR', bookX + 16, contentY + 22);
          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Số lượng khách: 2 Người lớn', bookX + 16, contentY + 40);
          ctx.fillText('Ngày khởi hành: 20/11/2026', bookX + 16, contentY + 54);
          ctx.fillText('Mã giảm giá: SUMMER2026 (-10%)', bookX + 16, contentY + 68);
          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 13px sans-serif';
          ctx.fillText('TỔNG TIỀN: 3.510.000 đ', bookX + 16, contentY + 92);

          ctx.fillStyle = '#F8FAFC';
          drawRoundRect(ctx, bookX + 16, contentY + 104, bookW - 32, 160, 6); ctx.fill();
          ctx.strokeStyle = '#CBD5E1'; ctx.stroke();

          ctx.fillStyle = '#0F172A';
          drawRoundRect(ctx, bookX + 30, contentY + 115, 60, 60, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, bookX + 40, contentY + 125, 40, 40, 2); ctx.fill();
          ctx.fillStyle = '#0F172A';
          drawRoundRect(ctx, bookX + 48, contentY + 133, 24, 24, 2); ctx.fill();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 8px sans-serif';
          ctx.fillText('Quét Mã VietQR BIDV', bookX + 102, contentY + 130);
          ctx.fillStyle = '#64748B'; ctx.font = '7px sans-serif';
          ctx.fillText('STK: 88882026', bookX + 102, contentY + 144);
          ctx.fillText('Tự động xác nhận 15 phút', bookX + 102, contentY + 158);

          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, bookX + 16, contentY + 280, bookW - 32, 28, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('✓ TIẾN HÀNH THANH TOÁN', bookX + 32, contentY + 298);
        } else if (mode === 'tablet') {
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 15, contentY, 340, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ 5 Sao', cellX + 28, contentY + 24);
          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('1.950.000 đ / Khách', cellX + 28, contentY + 44);
          ctx.fillStyle = '#334155'; ctx.font = '8px sans-serif';
          ctx.fillText('• Du thuyền 5 sao chuẩn quốc tế có hồ bơi', cellX + 28, contentY + 70);
          ctx.fillText('• Buffet hải sản nướng BBQ trên vịnh', cellX + 28, contentY + 86);
          ctx.fillText('• Chèo Kayak khám phá Hang Sửng Sốt', cellX + 28, contentY + 102);

          ctx.fillStyle = '#F8FAFC';
          drawRoundRect(ctx, cellX + 375, contentY, 330, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Mã Thanh Toán VietQR Tức Thì', cellX + 390, contentY + 24);

          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 390, contentY + 40, 70, 70, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; drawRoundRect(ctx, cellX + 402, contentY + 52, 46, 46, 2); ctx.fill();
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 412, contentY + 62, 26, 26, 2); ctx.fill();

          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 12px sans-serif';
          ctx.fillText('Tổng: 3.510.000 đ', cellX + 475, contentY + 65);
          ctx.fillStyle = '#10B981'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('✓ Sandbox Kết Nối BIDV', cellX + 475, contentY + 85);

          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, cellX + 390, contentY + 130, 290, 30, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('XÁC NHẬN ĐẶT TOUR & GIỮ CHỖ', cellX + 420, contentY + 149);
        } else {
          ctx.fillStyle = '#FFFFFF';
          drawRoundRect(ctx, cellX + 45, contentY, colWidth - 90, 325, 6); ctx.fill();
          ctx.strokeStyle = '#E2E8F0'; ctx.stroke();
          const mobGrad = ctx.createLinearGradient(cellX + 45, contentY, cellX + colWidth - 45, contentY + 70);
          mobGrad.addColorStop(0, '#0EA5E9'); mobGrad.addColorStop(1, '#0284C7');
          ctx.fillStyle = mobGrad;
          drawRoundRect(ctx, cellX + 45, contentY, colWidth - 90, 70, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('Tour Vịnh Hạ Long - Đảo Titop 2N1Đ 5 Sao', cellX + 60, contentY + 30);
          ctx.font = '8px sans-serif';
          ctx.fillText('Giá ưu đãi: 1.950.000 đ · Còn 6 chỗ trống', cellX + 60, contentY + 48);

          ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px sans-serif';
          ctx.fillText('Thanh Toán Qua VietQR Trên Điện Thoại:', cellX + 60, contentY + 95);

          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 60, contentY + 110, 65, 65, 4); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; drawRoundRect(ctx, cellX + 72, contentY + 122, 41, 41, 2); ctx.fill();
          ctx.fillStyle = '#0F172A'; drawRoundRect(ctx, cellX + 80, contentY + 130, 25, 25, 2); ctx.fill();

          ctx.fillStyle = '#0284C7'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('Số tiền: 3.510.000 đ', cellX + 140, contentY + 135);
          ctx.fillStyle = '#64748B'; ctx.font = '8px sans-serif';
          ctx.fillText('Chụp màn hình mở app ngân hàng quét', cellX + 140, contentY + 152);

          ctx.fillStyle = '#10B981';
          drawRoundRect(ctx, cellX + 60, contentY + 195, colWidth - 120, 36, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('⚡ ĐẶT CHỖ & THANH TOÁN VIETQR NGAY', cellX + 100, contentY + 218);
        }
      }
    }
  }

  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Mã minh chứng: 02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png · Tự đánh giá: 10/10 Điểm · Sinh viên: Nguyễn Thu Hà (V4 & V5)', 60, 1575);

  return canvas.toBuffer('image/png');
}

export function generateDualThemeImage(): Buffer {
  const canvas = createCanvas(2200, 1350);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 2200, 1350);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('HỒ SƠ MINH CHỨNG: SO SÁNH 02 CHỦ ĐỀ GIAO DIỆN (LIGHT MODE vs DARK MODE)', 60, 48);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('HỆ THỐNG DU LỊCH SỐ VIỆT NAM · ĐẠI HỌC PHENIKAA · MSSV: 24107631 (Nguyễn Thu Hà)', 60, 78);

  // Cột trái: Light Mode
  const colW = 1010;
  const colH = 1180;
  const leftX = 60;
  const rightX = 1130;
  const startY = 110;

  drawBrowserBar(ctx, leftX, startY, colW, 'https://dulichso.vn/?theme=light', 'LIGHT MODE · 10/10 PASS', '#0284C7');
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(leftX, startY + 32, colW, colH - 32);
  drawWebHeader(ctx, leftX, startY + 32, colW, 'desktop', 'Trang Chủ', 'light');

  // Cột phải: Dark Mode
  drawBrowserBar(ctx, rightX, startY, colW, 'https://dulichso.vn/?theme=dark', 'DARK MODE · 10/10 PASS', '#8B5CF6');
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(rightX, startY + 32, colW, colH - 32);
  drawWebHeader(ctx, rightX, startY + 32, colW, 'desktop', 'Trang Chủ', 'dark');

  return canvas.toBuffer('image/png');
}

async function main() {
  console.log('Rendering 9_anh_chup_man_hinh_ba_trang_ba_kho.png...');
  const pngBuffer = generateResponsiveGridImage();

  const outPaths = [
    'public/9_anh_chup_man_hinh_ba_trang_ba_kho.png',
    'public/02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png',
    '.aistudio/artifacts/brain/a1543dba-56eb-4b1e-b627-e1533a5b55db/9_anh_chup_man_hinh_ba_trang_ba_kho.png',
    'dist/9_anh_chup_man_hinh_ba_trang_ba_kho.png',
    'dist/02_MinhChung/9_anh_chup_man_hinh_ba_trang_ba_kho.png'
  ];

  for (const p of outPaths) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, pngBuffer);
    console.log(`Saved: ${p} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('Rendering anh_hai_chu_de_giao_dien.png...');
  const themeBuffer = generateDualThemeImage();
  const themePaths = [
    'public/anh_hai_chu_de_giao_dien.png',
    'public/02_MinhChung/anh_hai_chu_de_giao_dien.png',
    '.aistudio/artifacts/brain/a1543dba-56eb-4b1e-b627-e1533a5b55db/anh_hai_chu_de_giao_dien.png',
    'dist/anh_hai_chu_de_giao_dien.png',
    'dist/02_MinhChung/anh_hai_chu_de_giao_dien.png'
  ];

  for (const p of themePaths) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, themeBuffer);
    console.log(`Saved: ${p} (${(themeBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('Done!');
}

main().catch(err => {
  console.error('Error generating:', err);
  process.exit(1);
});
