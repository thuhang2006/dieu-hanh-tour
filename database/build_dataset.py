# -*- coding: utf-8 -*-
"""
Sinh bo du lieu mau du lich cho hoc phan CSE703073.
Toan bo du lieu la DU LIEU MO PHONG phuc vu dao tao.
Chay:  python3 build_dataset.py
"""
import csv, os, random, datetime, json, unicodedata

random.seed(20261115)          # co dinh de tai lap duoc ket qua
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'CSE703073_Dataset_DuLich')
CSVD = os.path.join(OUT, 'csv')
os.makedirs(CSVD, exist_ok=True)

# ----------------------------------------------------------------- du lieu goc
VUNG = {
    'Tây Bắc Bộ': [('Lào Cai', 22.34, 103.84), ('Sơn La', 21.33, 103.91), ('Điện Biên', 21.39, 103.02),
                   ('Hòa Bình', 20.81, 105.34), ('Yên Bái', 21.72, 104.90)],
    'Đông Bắc Bộ': [('Hà Giang', 22.82, 104.98), ('Cao Bằng', 22.67, 106.26), ('Quảng Ninh', 20.96, 107.08),
                    ('Lạng Sơn', 21.85, 106.76), ('Tuyên Quang', 21.82, 105.21)],
    'Đồng bằng sông Hồng': [('Hà Nội', 21.03, 105.85), ('Ninh Bình', 20.25, 105.97), ('Hải Phòng', 20.86, 106.68),
                            ('Nam Định', 20.42, 106.17), ('Bắc Ninh', 21.19, 106.07)],
    'Bắc Trung Bộ': [('Thanh Hóa', 19.81, 105.78), ('Nghệ An', 18.80, 105.68), ('Quảng Bình', 17.47, 106.62),
                     ('Huế', 16.46, 107.59), ('Hà Tĩnh', 18.34, 105.91)],
    'Nam Trung Bộ': [('Đà Nẵng', 16.05, 108.22), ('Quảng Nam', 15.88, 108.33), ('Khánh Hòa', 12.24, 109.20),
                     ('Bình Định', 13.78, 109.22), ('Ninh Thuận', 11.56, 108.99)],
    'Tây Nguyên': [('Lâm Đồng', 11.94, 108.44), ('Đắk Lắk', 12.68, 108.05), ('Gia Lai', 13.98, 108.00),
                   ('Kon Tum', 14.35, 108.00)],
    'Đông Nam Bộ': [('TP. Hồ Chí Minh', 10.78, 106.70), ('Bà Rịa – Vũng Tàu', 10.35, 107.08),
                    ('Đồng Nai', 10.95, 106.82), ('Tây Ninh', 11.31, 106.10)],
    'Đồng bằng sông Cửu Long': [('Cần Thơ', 10.03, 105.78), ('An Giang', 10.52, 105.12),
                                ('Kiên Giang', 10.01, 105.08), ('Cà Mau', 9.18, 105.15), ('Bến Tre', 10.24, 106.38)],
}
LOAI_DIEM_DEN = ['Di sản văn hóa', 'Danh thắng thiên nhiên', 'Bãi biển', 'Vườn quốc gia',
                 'Làng nghề truyền thống', 'Di tích lịch sử', 'Đô thị – mua sắm', 'Sinh thái nông nghiệp']
TIEN_TO_DIEM = {
    'Di sản văn hóa': ['Quần thể di sản', 'Khu di sản', 'Phố cổ', 'Thành cổ'],
    'Danh thắng thiên nhiên': ['Thung lũng', 'Hang động', 'Thác', 'Đỉnh núi'],
    'Bãi biển': ['Bãi biển', 'Vịnh', 'Đảo', 'Bán đảo'],
    'Vườn quốc gia': ['Vườn quốc gia', 'Khu bảo tồn', 'Rừng nguyên sinh'],
    'Làng nghề truyền thống': ['Làng gốm', 'Làng lụa', 'Làng mây tre', 'Làng chiếu'],
    'Di tích lịch sử': ['Đền', 'Chùa', 'Khu tưởng niệm', 'Địa đạo'],
    'Đô thị – mua sắm': ['Phố đi bộ', 'Chợ đêm', 'Khu trung tâm', 'Quảng trường'],
    'Sinh thái nông nghiệp': ['Miệt vườn', 'Đồi chè', 'Cánh đồng', 'Trang trại'],
}
HAU_TO_DIEM = ['Ban Mai', 'Thanh Bình', 'Hương Giang', 'Đại Lộc', 'Vân Sơn', 'Phú Cường', 'An Khê',
               'Tây Hồ', 'Bình Minh', 'Ngọc Trai', 'Long Hải', 'Thiên Hương', 'Mỹ Cảnh', 'Hòa Xuân']
MUA = ['Xuân (T1–T3)', 'Hè (T4–T6)', 'Thu (T7–T9)', 'Đông (T10–T12)']
LOAI_SP = ['Tour trọn gói', 'Lưu trú', 'Vé tham quan', 'Dịch vụ trải nghiệm', 'Vận chuyển']
HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý']
DEM = ['Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Thanh', 'Quang', 'Khánh', 'Ngọc', 'Gia', 'Hải', 'Thu']
TEN = ['An', 'Bình', 'Chi', 'Dũng', 'Giang', 'Hà', 'Hùng', 'Khoa', 'Lan', 'Linh', 'Mai', 'Nam',
       'Oanh', 'Phúc', 'Quân', 'Sơn', 'Thảo', 'Trang', 'Tuấn', 'Vy', 'Yến', 'Đạt', 'Nhung', 'Kiên']
TT_DON = ['cho_thanh_toan', 'da_thanh_toan', 'hoan_tat', 'da_huy', 'cho_hoan_tien']
PT_TT = ['the_noi_dia_sandbox', 'vi_dien_tu_sandbox', 'chuyen_khoan_mo_phong', 'tien_mat_tai_quay']
VAI_TRO = ['quan_tri', 'nha_cung_cap', 'khach_hang', 'huong_dan_vien', 'kiem_thu']


def khong_dau(s):
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return s.replace('đ', 'd').replace('Đ', 'D')


def slug(s):
    s = khong_dau(s).lower()
    out = []
    for ch in s:
        out.append(ch if ch.isalnum() else '-')
    r = ''.join(out)
    while '--' in r:
        r = r.replace('--', '-')
    return r.strip('-')


def ho_ten():
    return '%s %s %s' % (random.choice(HO), random.choice(DEM), random.choice(TEN))


def ghi(ten_tep, truong, hang):
    p = os.path.join(CSVD, ten_tep)
    with open(p, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=truong)
        w.writeheader()
        w.writerows(hang)
    print('  %-26s %5d dòng' % (ten_tep, len(hang)))
    return len(hang)


THONG_KE = {}
D0 = datetime.date(2026, 1, 5)

# ----------------------------------------------------------------- 1. diem_den
diem_den = []
i = 0
for vung, tinhs in VUNG.items():
    for (tinh, lat, lng) in tinhs:
        for _ in range(2):
            i += 1
            loai = random.choice(LOAI_DIEM_DEN)
            ten = '%s %s' % (random.choice(TIEN_TO_DIEM[loai]), random.choice(HAU_TO_DIEM))
            diem_den.append({
                'ma_diem_den': 'DD%03d' % i,
                'ten_diem_den': ten,
                'duong_dan_tinh': slug(ten) + '-' + slug(tinh),
                'tinh_thanh': tinh,
                'vung_mien': vung,
                'loai_hinh': loai,
                'vi_do': round(lat + random.uniform(-0.25, 0.25), 6),
                'kinh_do': round(lng + random.uniform(-0.25, 0.25), 6),
                'mua_phu_hop': random.choice(MUA),
                'thoi_luong_tham_quan_gio': random.choice([1.5, 2, 3, 4, 5, 6, 8]),
                'gia_ve_tham_quan': random.choice([0, 20000, 40000, 60000, 80000, 120000, 150000, 250000]),
                'suc_tai_ngay': random.choice([200, 400, 600, 800, 1200, 2000, 3000]),
                'trang_thai': 'hoat_dong' if random.random() > 0.06 else 'tam_dung',
            })
THONG_KE['diem_den'] = ghi('diem_den.csv', list(diem_den[0].keys()), diem_den)

# ----------------------------------------------------------------- 2. nha_cung_cap
ncc = []
for i in range(1, 25):
    tinh = random.choice(random.choice(list(VUNG.values())))[0]
    ncc.append({
        'ma_ncc': 'NCC%03d' % i,
        'ten_ncc': 'Công ty %s %s' % (random.choice(['Du lịch', 'Lữ hành', 'Dịch vụ', 'Đầu tư du lịch']),
                                      random.choice(HAU_TO_DIEM)),
        'ma_so_thue_mo_phong': '0%09d' % random.randint(100000000, 999999999),
        'tinh_thanh': tinh,
        'nguoi_dai_dien': ho_ten(),
        'dien_thoai_mo_phong': '09%08d' % random.randint(10000000, 99999999),
        'thu_dien_tu_mo_phong': 'ncc%03d@example.test' % i,
        'ngay_hop_tac': (D0 - datetime.timedelta(days=random.randint(120, 1400))).isoformat(),
        'trang_thai_hop_tac': random.choice(['dang_hop_tac'] * 9 + ['tam_dung']),
    })
THONG_KE['nha_cung_cap'] = ghi('nha_cung_cap.csv', list(ncc[0].keys()), ncc)

# ----------------------------------------------------------------- 3. san_pham
san_pham = []
for i in range(1, 141):
    dd = random.choice(diem_den)
    loai = random.choice(LOAI_SP)
    if loai == 'Tour trọn gói':
        gia, songay, succ = random.choice([1290000, 1890000, 2450000, 3200000, 4800000, 6500000]), random.choice([2, 3, 4, 5]), random.choice([12, 16, 20, 25, 30])
    elif loai == 'Lưu trú':
        gia, songay, succ = random.choice([450000, 690000, 980000, 1450000, 2200000]), 1, random.choice([2, 4, 6])
    elif loai == 'Vé tham quan':
        gia, songay, succ = random.choice([50000, 90000, 150000, 250000]), 1, random.choice([100, 200, 400])
    elif loai == 'Dịch vụ trải nghiệm':
        gia, songay, succ = random.choice([180000, 350000, 520000, 850000]), 1, random.choice([8, 10, 15, 20])
    else:
        gia, songay, succ = random.choice([120000, 260000, 480000, 750000]), 1, random.choice([16, 29, 45])
    ten = '%s %s – %s' % (loai, dd['ten_diem_den'], dd['tinh_thanh'])
    san_pham.append({
        'ma_san_pham': 'SP%04d' % i,
        'ten_san_pham': ten,
        'duong_dan_tinh': slug(ten)[:80],
        'ma_ncc': random.choice(ncc)['ma_ncc'],
        'ma_diem_den': dd['ma_diem_den'],
        'loai_san_pham': loai,
        'gia_co_ban': gia,
        'don_vi_tinh': 'khách' if loai != 'Lưu trú' else 'phòng/đêm',
        'so_ngay': songay,
        'suc_chua_toi_da': succ,
        'chinh_sach_huy': random.choice(['Miễn phí trước 7 ngày', 'Miễn phí trước 3 ngày',
                                         'Phí 30% trong 48 giờ', 'Không hoàn sau khi xác nhận']),
        'diem_danh_gia_tb': 0.0,
        'so_luot_danh_gia': 0,
        'trang_thai': 'dang_ban' if random.random() > 0.08 else 'ngung_ban',
        'ngay_tao': (D0 - datetime.timedelta(days=random.randint(30, 900))).isoformat(),
    })

# ----------------------------------------------------------------- 4. gia_theo_mua
gia_mua = []
k = 0
HE_SO = {'Xuân (T1–T3)': 1.15, 'Hè (T4–T6)': 1.35, 'Thu (T7–T9)': 1.00, 'Đông (T10–T12)': 0.85}
for sp in san_pham:
    for m in MUA:
        k += 1
        gia_mua.append({
            'ma_gia_mua': 'GM%05d' % k,
            'ma_san_pham': sp['ma_san_pham'],
            'mua': m,
            'he_so_gia': HE_SO[m],
            'gia_ap_dung': int(round(sp['gia_co_ban'] * HE_SO[m] / 1000.0) * 1000),
        })
THONG_KE['gia_theo_mua'] = ghi('gia_theo_mua.csv', list(gia_mua[0].keys()), gia_mua)

# ----------------------------------------------------------------- 5. lich_kha_dung
lich = []
k = 0
for sp in san_pham:
    if sp['trang_thai'] != 'dang_ban':
        continue
    for d in range(0, 60, random.choice([3, 4, 5])):
        k += 1
        ngay = D0 + datetime.timedelta(days=d)
        tong = sp['suc_chua_toi_da']
        da_dat = random.randint(0, tong)
        lich.append({
            'ma_lich': 'LKD%06d' % k,
            'ma_san_pham': sp['ma_san_pham'],
            'ngay_khoi_hanh': ngay.isoformat(),
            'tong_cho': tong,
            'da_dat': da_dat,
            'con_lai': tong - da_dat,
            'trang_thai': 'mo_ban' if tong - da_dat > 0 else 'het_cho',
        })
THONG_KE['lich_kha_dung'] = ghi('lich_kha_dung.csv', list(lich[0].keys()), lich)

# ----------------------------------------------------------------- 6. nguoi_dung
nguoi_dung = []
for i in range(1, 111):
    if i <= 2:
        vt = 'quan_tri'
    elif i <= 22:
        vt = 'nha_cung_cap'
    elif i <= 30:
        vt = 'huong_dan_vien'
    elif i <= 35:
        vt = 'kiem_thu'
    else:
        vt = 'khach_hang'
    ten = ho_ten()
    nguoi_dung.append({
        'ma_nguoi_dung': 'ND%04d' % i,
        'ho_ten': ten,
        'ten_dang_nhap': slug(ten).replace('-', '.') + str(i),
        'thu_dien_tu_mo_phong': 'nd%04d@example.test' % i,
        'vai_tro': vt,
        'ma_ncc': ncc[(i - 3) % len(ncc)]['ma_ncc'] if vt == 'nha_cung_cap' else '',
        'so_dien_thoai_mo_phong': '09%08d' % random.randint(10000000, 99999999),
        'so_thich': ', '.join(random.sample(LOAI_DIEM_DEN, k=random.randint(1, 3))),
        'ngay_tao': (D0 - datetime.timedelta(days=random.randint(10, 1000))).isoformat(),
        'trang_thai': 'kich_hoat' if random.random() > 0.05 else 'khoa',
    })
THONG_KE['nguoi_dung'] = ghi('nguoi_dung.csv', list(nguoi_dung[0].keys()), nguoi_dung)
khach = [u for u in nguoi_dung if u['vai_tro'] == 'khach_hang']

# ----------------------------------------------------------------- 7. don_dat + chi_tiet + thanh_toan
don, chi_tiet, thanh_toan = [], [], []
kk = 0
for i in range(1, 261):
    kh = random.choice(khach)
    ngay_dat = D0 - datetime.timedelta(days=random.randint(0, 120))
    tt = random.choices(TT_DON, weights=[12, 30, 40, 12, 6])[0]
    so_dong = random.choices([1, 2, 3], weights=[70, 22, 8])[0]
    tong = 0
    dong_tam = []
    for _ in range(so_dong):
        l = random.choice(lich)
        sp = next(s for s in san_pham if s['ma_san_pham'] == l['ma_san_pham'])
        sl = random.randint(1, min(4, max(1, sp['suc_chua_toi_da'])))
        mua = MUA[(datetime.date.fromisoformat(l['ngay_khoi_hanh']).month - 1) // 3]
        don_gia = next(g['gia_ap_dung'] for g in gia_mua
                       if g['ma_san_pham'] == sp['ma_san_pham'] and g['mua'] == mua)
        thanh_tien = don_gia * sl
        tong += thanh_tien
        dong_tam.append((sp, l, sl, don_gia, thanh_tien))
    phi_huy = int(tong * 0.3) if tt in ('da_huy', 'cho_hoan_tien') else 0
    don.append({
        'ma_don': 'DH%05d' % i,
        'ma_nguoi_dung': kh['ma_nguoi_dung'],
        'ngay_dat': ngay_dat.isoformat(),
        'trang_thai': tt,
        'tong_tien': tong,
        'phi_huy': phi_huy,
        'so_tien_hoan': (tong - phi_huy) if tt == 'cho_hoan_tien' else 0,
        'kenh_dat': random.choice(['website', 'ung_dung_di_dong', 'tong_dai']),
        'ghi_chu': random.choice(['', '', '', 'Yêu cầu ăn chay', 'Đi cùng trẻ nhỏ', 'Cần đón tại sân bay']),
    })
    for (sp, l, sl, don_gia, thanh_tien) in dong_tam:
        kk += 1
        chi_tiet.append({
            'ma_chi_tiet': 'CT%06d' % kk,
            'ma_don': 'DH%05d' % i,
            'ma_san_pham': sp['ma_san_pham'],
            'ma_lich': l['ma_lich'],
            'ngay_khoi_hanh': l['ngay_khoi_hanh'],
            'so_luong': sl,
            'don_gia': don_gia,
            'thanh_tien': thanh_tien,
        })
    if tt in ('da_thanh_toan', 'hoan_tat', 'cho_hoan_tien'):
        thanh_toan.append({
            'ma_thanh_toan': 'TT%05d' % (len(thanh_toan) + 1),
            'ma_don': 'DH%05d' % i,
            'phuong_thuc': random.choice(PT_TT),
            'so_tien': tong,
            'trang_thai': 'thanh_cong',
            'ma_giao_dich_sandbox': 'SBX%010d' % random.randint(1, 9999999999),
            'thoi_diem': (ngay_dat + datetime.timedelta(minutes=random.randint(2, 240))).isoformat(),
        })
    elif tt == 'cho_thanh_toan' and random.random() < 0.35:
        thanh_toan.append({
            'ma_thanh_toan': 'TT%05d' % (len(thanh_toan) + 1),
            'ma_don': 'DH%05d' % i,
            'phuong_thuc': random.choice(PT_TT),
            'so_tien': tong,
            'trang_thai': random.choice(['that_bai', 'nguoi_dung_huy']),
            'ma_giao_dich_sandbox': 'SBX%010d' % random.randint(1, 9999999999),
            'thoi_diem': (ngay_dat + datetime.timedelta(minutes=random.randint(2, 60))).isoformat(),
        })
THONG_KE['don_dat'] = ghi('don_dat.csv', list(don[0].keys()), don)
THONG_KE['chi_tiet_don'] = ghi('chi_tiet_don.csv', list(chi_tiet[0].keys()), chi_tiet)
THONG_KE['thanh_toan'] = ghi('thanh_toan.csv', list(thanh_toan[0].keys()), thanh_toan)

# ----------------------------------------------------------------- 8. danh_gia
NX_TOT = ['Hướng dẫn viên nhiệt tình, lịch trình hợp lý.', 'Cảnh đẹp, tổ chức đúng giờ.',
          'Dịch vụ tốt so với mức giá.', 'Phòng sạch, nhân viên thân thiện.',
          'Trải nghiệm đáng nhớ, sẽ quay lại.']
NX_TB = ['Lịch trình hơi gấp nhưng chấp nhận được.', 'Ăn uống bình thường, chỗ nghỉ ổn.',
         'Đông khách vào cuối tuần.', 'Cần cải thiện khâu đón khách.']
NX_KEM = ['Thông tin trên website chưa khớp thực tế.', 'Chờ đợi lâu ở điểm tập trung.',
          'Giá cao so với chất lượng nhận được.']
danh_gia = []
sp_map = {s['ma_san_pham']: s for s in san_pham}
don_ok = [d for d in don if d['trang_thai'] == 'hoan_tat']
i = 0
for d in don_ok:
    for ct in [c for c in chi_tiet if c['ma_don'] == d['ma_don']]:
        if random.random() < 0.62:
            i += 1
            diem = random.choices([5, 4, 3, 2, 1], weights=[38, 32, 18, 8, 4])[0]
            nx = random.choice(NX_TOT if diem >= 4 else (NX_TB if diem == 3 else NX_KEM))
            danh_gia.append({
                'ma_danh_gia': 'DG%05d' % i,
                'ma_san_pham': ct['ma_san_pham'],
                'ma_don': d['ma_don'],
                'ma_nguoi_dung': d['ma_nguoi_dung'],
                'diem': diem,
                'noi_dung': nx,
                'ngay_danh_gia': (datetime.date.fromisoformat(d['ngay_dat'])
                                  + datetime.timedelta(days=random.randint(3, 30))).isoformat(),
                'trang_thai_kiem_duyet': random.choices(['da_duyet', 'cho_duyet', 'tu_choi'],
                                                        weights=[85, 12, 3])[0],
            })
THONG_KE['danh_gia'] = ghi('danh_gia.csv', list(danh_gia[0].keys()), danh_gia)

# cap nhat diem trung binh vao san_pham
from collections import defaultdict
agg = defaultdict(list)
for g in danh_gia:
    if g['trang_thai_kiem_duyet'] == 'da_duyet':
        agg[g['ma_san_pham']].append(g['diem'])
for s in san_pham:
    ds = agg.get(s['ma_san_pham'], [])
    s['so_luot_danh_gia'] = len(ds)
    s['diem_danh_gia_tb'] = round(sum(ds) / len(ds), 2) if ds else 0.0
THONG_KE['san_pham'] = ghi('san_pham.csv', list(san_pham[0].keys()), san_pham)

# ----------------------------------------------------------------- 9. bai_viet
bai_viet = []
CHU_DE = ['Cẩm nang', 'Kinh nghiệm', 'Gợi ý hành trình', 'Ẩm thực', 'Văn hóa bản địa', 'Mẹo tiết kiệm']
for i in range(1, 61):
    dd = random.choice(diem_den)
    cd = random.choice(CHU_DE)
    tieu_de = '%s khi đến %s, %s' % (cd, dd['ten_diem_den'], dd['tinh_thanh'])
    bai_viet.append({
        'ma_bai_viet': 'BV%04d' % i,
        'tieu_de': tieu_de,
        'duong_dan_tinh': slug(tieu_de)[:90],
        'ma_diem_den': dd['ma_diem_den'],
        'chu_de': cd,
        'the_gan': ', '.join(random.sample(['gia-dinh', 'phuot', 'nghi-duong', 'am-thuc', 'di-san',
                                            'bien', 'nui', 'cuoi-tuan'], k=3)),
        'tom_tat': 'Bài viết mô phỏng phục vụ đào tạo, giới thiệu %s tại %s.' % (dd['loai_hinh'].lower(), dd['tinh_thanh']),
        'so_luot_xem': random.randint(50, 12000),
        'ngay_dang': (D0 - datetime.timedelta(days=random.randint(5, 700))).isoformat(),
        'trang_thai': random.choices(['xuat_ban', 'ban_nhap'], weights=[88, 12])[0],
    })
THONG_KE['bai_viet'] = ghi('bai_viet.csv', list(bai_viet[0].keys()), bai_viet)

# ----------------------------------------------------------------- 10. nhat_ky_he_thong
HANH_DONG = ['dang_nhap', 'dang_xuat', 'tao_don', 'huy_don', 'sua_gia', 'duyet_danh_gia',
             'tu_choi_truy_cap', 'doi_mat_khau', 'tai_tep']
nhat_ky = []
for i in range(1, 201):
    u = random.choice(nguoi_dung)
    hd = random.choice(HANH_DONG)
    nhat_ky.append({
        'ma_nhat_ky': 'NK%05d' % i,
        'thoi_diem': (datetime.datetime(2026, 1, 5) - datetime.timedelta(minutes=random.randint(0, 130000))).isoformat(timespec='seconds'),
        'ma_nguoi_dung': u['ma_nguoi_dung'],
        'vai_tro': u['vai_tro'],
        'hanh_dong': hd,
        'doi_tuong': random.choice(['don_dat', 'san_pham', 'danh_gia', 'nguoi_dung']),
        'muc': 'warning' if hd == 'tu_choi_truy_cap' else 'info',
        'dia_chi_ip_mo_phong': '10.%d.%d.%d' % (random.randint(0, 255), random.randint(0, 255), random.randint(1, 254)),
    })
THONG_KE['nhat_ky_he_thong'] = ghi('nhat_ky_he_thong.csv', list(nhat_ky[0].keys()), nhat_ky)

# ----------------------------------------------------------------- tu dien du lieu
TD = [
    ('diem_den', 'ma_diem_den', 'CHAR(5)', 'Khóa chính', 'Mã định danh điểm đến, dạng DDnnn'),
    ('diem_den', 'ten_diem_den', 'VARCHAR(150)', 'NOT NULL', 'Tên hiển thị của điểm đến'),
    ('diem_den', 'duong_dan_tinh', 'VARCHAR(180)', 'UNIQUE', 'Đường dẫn thân thiện dùng cho SEO'),
    ('diem_den', 'tinh_thanh', 'VARCHAR(60)', 'NOT NULL, INDEX', 'Tỉnh hoặc thành phố trực thuộc trung ương'),
    ('diem_den', 'vung_mien', 'VARCHAR(40)', 'INDEX', 'Vùng du lịch, dùng để nhóm và lọc'),
    ('diem_den', 'loai_hinh', 'VARCHAR(60)', 'INDEX', 'Phân loại điểm đến theo loại hình du lịch'),
    ('diem_den', 'vi_do / kinh_do', 'DECIMAL(9,6)', 'NOT NULL', 'Tọa độ địa lý phục vụ bản đồ và tìm theo bán kính'),
    ('diem_den', 'mua_phu_hop', 'VARCHAR(30)', '', 'Mùa khuyến nghị tham quan'),
    ('diem_den', 'thoi_luong_tham_quan_gio', 'DECIMAL(4,1)', '', 'Thời lượng tham quan trung bình'),
    ('diem_den', 'suc_tai_ngay', 'INT', '', 'Sức tải tối đa mỗi ngày, dùng cho bài toán quản lý điểm đến'),
    ('nha_cung_cap', 'ma_ncc', 'CHAR(6)', 'Khóa chính', 'Mã nhà cung cấp dịch vụ'),
    ('san_pham', 'ma_san_pham', 'CHAR(6)', 'Khóa chính', 'Mã sản phẩm du lịch'),
    ('san_pham', 'ma_ncc', 'CHAR(6)', 'Khóa ngoại → nha_cung_cap', 'Chủ sở hữu sản phẩm, dùng để phân quyền theo phạm vi'),
    ('san_pham', 'ma_diem_den', 'CHAR(5)', 'Khóa ngoại → diem_den', 'Điểm đến gắn với sản phẩm'),
    ('san_pham', 'gia_co_ban', 'INT', 'NOT NULL, CHECK > 0', 'Giá gốc theo đơn vị đồng, chưa áp hệ số mùa'),
    ('san_pham', 'suc_chua_toi_da', 'INT', 'NOT NULL', 'Số chỗ tối đa cho mỗi lượt khởi hành'),
    ('san_pham', 'diem_danh_gia_tb', 'DECIMAL(3,2)', 'Trường dẫn xuất', 'Trung bình điểm đánh giá đã duyệt'),
    ('gia_theo_mua', 'he_so_gia', 'DECIMAL(4,2)', 'NOT NULL', 'Hệ số nhân giá theo mùa vụ'),
    ('lich_kha_dung', 'ma_lich', 'CHAR(9)', 'Khóa chính', 'Một suất khởi hành của một sản phẩm'),
    ('lich_kha_dung', 'con_lai', 'INT', 'CHECK >= 0', 'Số chỗ còn bán, là trường trọng yếu khi xử lý đặt đồng thời'),
    ('nguoi_dung', 'vai_tro', 'ENUM', 'NOT NULL, INDEX', 'quan_tri, nha_cung_cap, khach_hang, huong_dan_vien, kiem_thu'),
    ('don_dat', 'ma_don', 'CHAR(7)', 'Khóa chính', 'Mã đơn đặt'),
    ('don_dat', 'trang_thai', 'ENUM', 'NOT NULL, INDEX', 'cho_thanh_toan, da_thanh_toan, hoan_tat, da_huy, cho_hoan_tien'),
    ('chi_tiet_don', 'ma_lich', 'CHAR(9)', 'Khóa ngoại → lich_kha_dung', 'Suất khởi hành được đặt'),
    ('thanh_toan', 'ma_giao_dich_sandbox', 'VARCHAR(30)', '', 'Mã giao dịch môi trường thử nghiệm, không phải giao dịch thật'),
    ('danh_gia', 'trang_thai_kiem_duyet', 'ENUM', 'NOT NULL', 'da_duyet, cho_duyet, tu_choi'),
    ('bai_viet', 'the_gan', 'VARCHAR(200)', '', 'Danh sách thẻ, phục vụ gợi ý nội dung liên quan'),
    ('nhat_ky_he_thong', 'muc', 'ENUM', 'INDEX', 'info, warning, error'),
]
with open(os.path.join(OUT, 'tu_dien_du_lieu.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['bang', 'truong', 'kieu_du_lieu', 'rang_buoc', 'y_nghia_nghiep_vu'])
    w.writerows(TD)

# ----------------------------------------------------------------- luoc do SQL
SCHEMA = """-- =====================================================================
-- CSE703073 - Lap trinh ung dung web trong du lich 2
-- Luoc do CSDL mau (MySQL 8.0, utf8mb4). DU LIEU MO PHONG phuc vu dao tao.
-- =====================================================================
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS nhat_ky_he_thong, danh_gia, bai_viet, thanh_toan, chi_tiet_don,
  don_dat, lich_kha_dung, gia_theo_mua, san_pham, nguoi_dung, nha_cung_cap, diem_den;

CREATE TABLE diem_den (
  ma_diem_den              CHAR(5)       NOT NULL,
  ten_diem_den             VARCHAR(150)  NOT NULL,
  duong_dan_tinh           VARCHAR(180)  NOT NULL,
  tinh_thanh               VARCHAR(60)   NOT NULL,
  vung_mien                VARCHAR(40)   NOT NULL,
  loai_hinh                VARCHAR(60)   NOT NULL,
  vi_do                    DECIMAL(9,6)  NOT NULL,
  kinh_do                  DECIMAL(9,6)  NOT NULL,
  mua_phu_hop              VARCHAR(30)   NULL,
  thoi_luong_tham_quan_gio DECIMAL(4,1)  NULL,
  gia_ve_tham_quan         INT           NOT NULL DEFAULT 0,
  suc_tai_ngay             INT           NULL,
  trang_thai               ENUM('hoat_dong','tam_dung') NOT NULL DEFAULT 'hoat_dong',
  PRIMARY KEY (ma_diem_den),
  UNIQUE KEY uq_diem_den_duong_dan (duong_dan_tinh),
  KEY idx_diem_den_tinh (tinh_thanh),
  KEY idx_diem_den_loai (loai_hinh),
  KEY idx_diem_den_toado (vi_do, kinh_do)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE nha_cung_cap (
  ma_ncc               CHAR(6)      NOT NULL,
  ten_ncc              VARCHAR(150) NOT NULL,
  ma_so_thue_mo_phong  VARCHAR(20)  NULL,
  tinh_thanh           VARCHAR(60)  NULL,
  nguoi_dai_dien       VARCHAR(100) NULL,
  dien_thoai_mo_phong  VARCHAR(20)  NULL,
  thu_dien_tu_mo_phong VARCHAR(120) NULL,
  ngay_hop_tac         DATE         NULL,
  trang_thai_hop_tac   ENUM('dang_hop_tac','tam_dung') NOT NULL DEFAULT 'dang_hop_tac',
  PRIMARY KEY (ma_ncc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE nguoi_dung (
  ma_nguoi_dung          CHAR(6)      NOT NULL,
  ho_ten                 VARCHAR(100) NOT NULL,
  ten_dang_nhap          VARCHAR(80)  NOT NULL,
  thu_dien_tu_mo_phong   VARCHAR(120) NOT NULL,
  vai_tro   ENUM('quan_tri','nha_cung_cap','khach_hang','huong_dan_vien','kiem_thu') NOT NULL,
  ma_ncc                 CHAR(6)      NULL,
  so_dien_thoai_mo_phong VARCHAR(20)  NULL,
  so_thich               VARCHAR(200) NULL,
  ngay_tao               DATE         NOT NULL,
  trang_thai             ENUM('kich_hoat','khoa') NOT NULL DEFAULT 'kich_hoat',
  -- LUU Y: cot mat khau KHONG co trong tap du lieu mau.
  -- Nhom tu sinh mat khau bang ham bam co muoi (bcrypt / Argon2) khi nap du lieu.
  PRIMARY KEY (ma_nguoi_dung),
  UNIQUE KEY uq_nd_ten_dang_nhap (ten_dang_nhap),
  UNIQUE KEY uq_nd_thu_dien_tu (thu_dien_tu_mo_phong),
  KEY idx_nd_vai_tro (vai_tro),
  CONSTRAINT fk_nd_ncc FOREIGN KEY (ma_ncc) REFERENCES nha_cung_cap (ma_ncc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE san_pham (
  ma_san_pham      CHAR(6)      NOT NULL,
  ten_san_pham     VARCHAR(200) NOT NULL,
  duong_dan_tinh   VARCHAR(200) NOT NULL,
  ma_ncc           CHAR(6)      NOT NULL,
  ma_diem_den      CHAR(5)      NOT NULL,
  loai_san_pham    VARCHAR(50)  NOT NULL,
  gia_co_ban       INT          NOT NULL,
  don_vi_tinh      VARCHAR(20)  NOT NULL,
  so_ngay          INT          NOT NULL DEFAULT 1,
  suc_chua_toi_da  INT          NOT NULL,
  chinh_sach_huy   VARCHAR(120) NULL,
  diem_danh_gia_tb DECIMAL(3,2) NOT NULL DEFAULT 0,
  so_luot_danh_gia INT          NOT NULL DEFAULT 0,
  trang_thai       ENUM('dang_ban','ngung_ban') NOT NULL DEFAULT 'dang_ban',
  ngay_tao         DATE         NOT NULL,
  PRIMARY KEY (ma_san_pham),
  UNIQUE KEY uq_sp_duong_dan (duong_dan_tinh),
  KEY idx_sp_diem_den (ma_diem_den),
  KEY idx_sp_ncc (ma_ncc),
  KEY idx_sp_loai_gia (loai_san_pham, gia_co_ban),
  CONSTRAINT fk_sp_ncc FOREIGN KEY (ma_ncc) REFERENCES nha_cung_cap (ma_ncc),
  CONSTRAINT fk_sp_dd  FOREIGN KEY (ma_diem_den) REFERENCES diem_den (ma_diem_den),
  CONSTRAINT ck_sp_gia CHECK (gia_co_ban > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gia_theo_mua (
  ma_gia_mua   CHAR(7)      NOT NULL,
  ma_san_pham  CHAR(6)      NOT NULL,
  mua          VARCHAR(30)  NOT NULL,
  he_so_gia    DECIMAL(4,2) NOT NULL,
  gia_ap_dung  INT          NOT NULL,
  PRIMARY KEY (ma_gia_mua),
  UNIQUE KEY uq_gm (ma_san_pham, mua),
  CONSTRAINT fk_gm_sp FOREIGN KEY (ma_san_pham) REFERENCES san_pham (ma_san_pham) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lich_kha_dung (
  ma_lich        CHAR(9)  NOT NULL,
  ma_san_pham    CHAR(6)  NOT NULL,
  ngay_khoi_hanh DATE     NOT NULL,
  tong_cho       INT      NOT NULL,
  da_dat         INT      NOT NULL DEFAULT 0,
  con_lai        INT      NOT NULL,
  trang_thai     ENUM('mo_ban','het_cho','tam_dung') NOT NULL DEFAULT 'mo_ban',
  PRIMARY KEY (ma_lich),
  UNIQUE KEY uq_lkd (ma_san_pham, ngay_khoi_hanh),
  KEY idx_lkd_ngay (ngay_khoi_hanh),
  CONSTRAINT fk_lkd_sp FOREIGN KEY (ma_san_pham) REFERENCES san_pham (ma_san_pham) ON DELETE CASCADE,
  CONSTRAINT ck_lkd_conlai CHECK (con_lai >= 0 AND da_dat >= 0 AND da_dat <= tong_cho)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE don_dat (
  ma_don        CHAR(7)     NOT NULL,
  ma_nguoi_dung CHAR(6)     NOT NULL,
  ngay_dat      DATE        NOT NULL,
  trang_thai    ENUM('cho_thanh_toan','da_thanh_toan','hoan_tat','da_huy','cho_hoan_tien') NOT NULL,
  tong_tien     BIGINT      NOT NULL,
  phi_huy       BIGINT      NOT NULL DEFAULT 0,
  so_tien_hoan  BIGINT      NOT NULL DEFAULT 0,
  kenh_dat      VARCHAR(30) NULL,
  ghi_chu       VARCHAR(255) NULL,
  PRIMARY KEY (ma_don),
  KEY idx_don_nd (ma_nguoi_dung),
  KEY idx_don_trangthai_ngay (trang_thai, ngay_dat),
  CONSTRAINT fk_don_nd FOREIGN KEY (ma_nguoi_dung) REFERENCES nguoi_dung (ma_nguoi_dung)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE chi_tiet_don (
  ma_chi_tiet    CHAR(8) NOT NULL,
  ma_don         CHAR(7) NOT NULL,
  ma_san_pham    CHAR(6) NOT NULL,
  ma_lich        CHAR(9) NOT NULL,
  ngay_khoi_hanh DATE    NOT NULL,
  so_luong       INT     NOT NULL,
  don_gia        INT     NOT NULL,
  thanh_tien     BIGINT  NOT NULL,
  PRIMARY KEY (ma_chi_tiet),
  KEY idx_ct_don (ma_don),
  KEY idx_ct_lich (ma_lich),
  CONSTRAINT fk_ct_don  FOREIGN KEY (ma_don) REFERENCES don_dat (ma_don) ON DELETE CASCADE,
  CONSTRAINT fk_ct_sp   FOREIGN KEY (ma_san_pham) REFERENCES san_pham (ma_san_pham),
  CONSTRAINT fk_ct_lich FOREIGN KEY (ma_lich) REFERENCES lich_kha_dung (ma_lich),
  CONSTRAINT ck_ct_sl CHECK (so_luong > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE thanh_toan (
  ma_thanh_toan         CHAR(7)     NOT NULL,
  ma_don                CHAR(7)     NOT NULL,
  phuong_thuc           VARCHAR(40) NOT NULL,
  so_tien               BIGINT      NOT NULL,
  trang_thai            ENUM('thanh_cong','that_bai','nguoi_dung_huy','cho_xu_ly') NOT NULL,
  ma_giao_dich_sandbox  VARCHAR(30) NULL,
  thoi_diem             DATETIME    NOT NULL,
  PRIMARY KEY (ma_thanh_toan),
  KEY idx_tt_don (ma_don),
  CONSTRAINT fk_tt_don FOREIGN KEY (ma_don) REFERENCES don_dat (ma_don) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE danh_gia (
  ma_danh_gia           CHAR(7)      NOT NULL,
  ma_san_pham           CHAR(6)      NOT NULL,
  ma_don                CHAR(7)      NOT NULL,
  ma_nguoi_dung         CHAR(6)      NOT NULL,
  diem                  TINYINT      NOT NULL,
  noi_dung              VARCHAR(500) NULL,
  ngay_danh_gia         DATE         NOT NULL,
  trang_thai_kiem_duyet ENUM('da_duyet','cho_duyet','tu_choi') NOT NULL DEFAULT 'cho_duyet',
  PRIMARY KEY (ma_danh_gia),
  UNIQUE KEY uq_dg (ma_don, ma_san_pham, ma_nguoi_dung),
  KEY idx_dg_sp (ma_san_pham, trang_thai_kiem_duyet),
  CONSTRAINT fk_dg_sp  FOREIGN KEY (ma_san_pham) REFERENCES san_pham (ma_san_pham),
  CONSTRAINT fk_dg_don FOREIGN KEY (ma_don) REFERENCES don_dat (ma_don) ON DELETE CASCADE,
  CONSTRAINT fk_dg_nd  FOREIGN KEY (ma_nguoi_dung) REFERENCES nguoi_dung (ma_nguoi_dung),
  CONSTRAINT ck_dg_diem CHECK (diem BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE bai_viet (
  ma_bai_viet    CHAR(6)      NOT NULL,
  tieu_de        VARCHAR(200) NOT NULL,
  duong_dan_tinh VARCHAR(200) NOT NULL,
  ma_diem_den    CHAR(5)      NULL,
  chu_de         VARCHAR(50)  NULL,
  the_gan        VARCHAR(200) NULL,
  tom_tat        VARCHAR(500) NULL,
  so_luot_xem    INT          NOT NULL DEFAULT 0,
  ngay_dang      DATE         NOT NULL,
  trang_thai     ENUM('xuat_ban','ban_nhap') NOT NULL DEFAULT 'ban_nhap',
  PRIMARY KEY (ma_bai_viet),
  UNIQUE KEY uq_bv_duong_dan (duong_dan_tinh),
  KEY idx_bv_diem_den (ma_diem_den),
  CONSTRAINT fk_bv_dd FOREIGN KEY (ma_diem_den) REFERENCES diem_den (ma_diem_den)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE nhat_ky_he_thong (
  ma_nhat_ky          CHAR(7)     NOT NULL,
  thoi_diem           DATETIME    NOT NULL,
  ma_nguoi_dung       CHAR(6)     NULL,
  vai_tro             VARCHAR(20) NULL,
  hanh_dong           VARCHAR(40) NOT NULL,
  doi_tuong           VARCHAR(40) NULL,
  muc                 ENUM('info','warning','error') NOT NULL DEFAULT 'info',
  dia_chi_ip_mo_phong VARCHAR(45) NULL,
  PRIMARY KEY (ma_nhat_ky),
  KEY idx_nk_thoi_diem (thoi_diem),
  KEY idx_nk_muc (muc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
"""
with open(os.path.join(OUT, 'schema.sql'), 'w', encoding='utf-8') as f:
    f.write(SCHEMA)

# ----------------------------------------------------------------- seed.sql
def esc(v):
    if v is None or v == '':
        return 'NULL'
    s = str(v).replace('\\', '\\\\').replace("'", "''")
    return "'" + s + "'"


def insert_block(bang, rows, cols):
    out = ['\n-- ' + bang + ' (%d dòng)' % len(rows)]
    for i in range(0, len(rows), 100):
        lot = rows[i:i + 100]
        out.append('INSERT INTO %s (%s) VALUES' % (bang, ', '.join(cols)))
        vals = []
        for r in lot:
            vals.append('  (' + ', '.join(esc(r[c]) for c in cols) + ')')
        out.append(',\n'.join(vals) + ';')
    return '\n'.join(out)


with open(os.path.join(OUT, 'seed.sql'), 'w', encoding='utf-8') as f:
    f.write('-- Du lieu mau CSE703073 (MO PHONG). Chay sau schema.sql\nSET NAMES utf8mb4;\n')
    f.write('SET FOREIGN_KEY_CHECKS = 0;\n')
    f.write(insert_block('diem_den', diem_den, list(diem_den[0].keys())))
    f.write(insert_block('nha_cung_cap', ncc, list(ncc[0].keys())))
    f.write(insert_block('nguoi_dung', nguoi_dung, list(nguoi_dung[0].keys())))
    f.write(insert_block('san_pham', san_pham, list(san_pham[0].keys())))
    f.write(insert_block('gia_theo_mua', gia_mua, list(gia_mua[0].keys())))
    f.write(insert_block('lich_kha_dung', lich, list(lich[0].keys())))
    f.write(insert_block('don_dat', don, list(don[0].keys())))
    f.write(insert_block('chi_tiet_don', chi_tiet, list(chi_tiet[0].keys())))
    f.write(insert_block('thanh_toan', thanh_toan, list(thanh_toan[0].keys())))
    f.write(insert_block('danh_gia', danh_gia, list(danh_gia[0].keys())))
    f.write(insert_block('bai_viet', bai_viet, list(bai_viet[0].keys())))
    f.write(insert_block('nhat_ky_he_thong', nhat_ky, list(nhat_ky[0].keys())))
    f.write('\nSET FOREIGN_KEY_CHECKS = 1;\n')

THONG_KE['TONG_CONG'] = sum(THONG_KE.values())
with open(os.path.join(OUT, 'thong_ke.json'), 'w', encoding='utf-8') as f:
    json.dump(THONG_KE, f, ensure_ascii=False, indent=2)

print('\nTong so ban ghi:', THONG_KE['TONG_CONG'])
