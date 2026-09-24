# -*- coding: utf-8 -*-
"""
Kiem dinh chat luong bo du lieu mau CSE703073.
Chay:  python3 kiem_dinh_du_lieu.py
Yeu cau: pip install pandas
Ket qua: in bang ket luan, tra ve ma thoat 0 neu toan bo phep kiem dinh dat.
"""
import os
import sys
import pandas as pd

CSVD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'csv')
loi = []


def doc(ten):
    return pd.read_csv(os.path.join(CSVD, ten + '.csv'), dtype=str, keep_default_na=False)


def kiem(mo_ta, dieu_kien, chi_tiet=''):
    trang_thai = 'ĐẠT   ' if dieu_kien else 'KHÔNG '
    print('%s | %s %s' % (trang_thai, mo_ta, ('- ' + chi_tiet) if chi_tiet and not dieu_kien else ''))
    if not dieu_kien:
        loi.append(mo_ta)


bang = {t: doc(t) for t in ['diem_den', 'nha_cung_cap', 'nguoi_dung', 'san_pham', 'gia_theo_mua',
                            'lich_kha_dung', 'don_dat', 'chi_tiet_don', 'thanh_toan',
                            'danh_gia', 'bai_viet', 'nhat_ky_he_thong']}

print('\n=== 1. KHOI LUONG DU LIEU ===')
tong = sum(len(v) for v in bang.values())
for t, v in bang.items():
    print('     %-20s %6d' % (t, len(v)))
kiem('Tổng số bản ghi >= 300 (Mục 2.2 Đề thi)', tong >= 300, 'tổng = %d' % tong)
kiem('Số thực thể >= 10', len(bang) >= 10, 'có %d bảng' % len(bang))

print('\n=== 2. KHOA CHINH DUY NHAT ===')
KHOA = {'diem_den': 'ma_diem_den', 'nha_cung_cap': 'ma_ncc', 'nguoi_dung': 'ma_nguoi_dung',
        'san_pham': 'ma_san_pham', 'gia_theo_mua': 'ma_gia_mua', 'lich_kha_dung': 'ma_lich',
        'don_dat': 'ma_don', 'chi_tiet_don': 'ma_chi_tiet', 'thanh_toan': 'ma_thanh_toan',
        'danh_gia': 'ma_danh_gia', 'bai_viet': 'ma_bai_viet', 'nhat_ky_he_thong': 'ma_nhat_ky'}
for t, k in KHOA.items():
    kiem('Khóa chính %s.%s duy nhất' % (t, k), bang[t][k].is_unique)

print('\n=== 3. TOAN VEN THAM CHIEU ===')
FK = [('san_pham', 'ma_ncc', 'nha_cung_cap', 'ma_ncc'),
      ('san_pham', 'ma_diem_den', 'diem_den', 'ma_diem_den'),
      ('gia_theo_mua', 'ma_san_pham', 'san_pham', 'ma_san_pham'),
      ('lich_kha_dung', 'ma_san_pham', 'san_pham', 'ma_san_pham'),
      ('don_dat', 'ma_nguoi_dung', 'nguoi_dung', 'ma_nguoi_dung'),
      ('chi_tiet_don', 'ma_don', 'don_dat', 'ma_don'),
      ('chi_tiet_don', 'ma_san_pham', 'san_pham', 'ma_san_pham'),
      ('chi_tiet_don', 'ma_lich', 'lich_kha_dung', 'ma_lich'),
      ('thanh_toan', 'ma_don', 'don_dat', 'ma_don'),
      ('danh_gia', 'ma_san_pham', 'san_pham', 'ma_san_pham'),
      ('danh_gia', 'ma_don', 'don_dat', 'ma_don'),
      ('bai_viet', 'ma_diem_den', 'diem_den', 'ma_diem_den')]
for (bc, cc, bcha, ccha) in FK:
    con = set(bang[bc][cc]) - {''}
    cha = set(bang[bcha][ccha])
    thieu = con - cha
    kiem('%s.%s -> %s.%s' % (bc, cc, bcha, ccha), not thieu, '%d giá trị mồ côi' % len(thieu))

print('\n=== 4. RANG BUOC NGHIEP VU ===')
lkd = bang['lich_kha_dung'].astype({'tong_cho': int, 'da_dat': int, 'con_lai': int})
kiem('lich_kha_dung: con_lai = tong_cho - da_dat',
     bool((lkd['con_lai'] == lkd['tong_cho'] - lkd['da_dat']).all()))
kiem('lich_kha_dung: da_dat <= tong_cho', bool((lkd['da_dat'] <= lkd['tong_cho']).all()))
kiem('lich_kha_dung: con_lai >= 0', bool((lkd['con_lai'] >= 0).all()))

ct = bang['chi_tiet_don'].astype({'so_luong': int, 'don_gia': int, 'thanh_tien': int})
kiem('chi_tiet_don: thanh_tien = so_luong * don_gia',
     bool((ct['thanh_tien'] == ct['so_luong'] * ct['don_gia']).all()))
kiem('chi_tiet_don: so_luong > 0', bool((ct['so_luong'] > 0).all()))

don = bang['don_dat'].astype({'tong_tien': int})
tong_ct = ct.groupby('ma_don')['thanh_tien'].sum()
gop = don.set_index('ma_don')['tong_tien']
lech = (gop - tong_ct).abs().max()
kiem('don_dat.tong_tien khớp tổng chi tiết', lech == 0, 'lệch tối đa %s' % lech)

dg = bang['danh_gia'].astype({'diem': int})
kiem('danh_gia: điểm trong [1..5]', bool(dg['diem'].between(1, 5).all()))
don_ht = set(don[don['trang_thai'] == 'hoan_tat']['ma_don'])
kiem('danh_gia chỉ thuộc đơn đã hoàn tất', set(dg['ma_don']).issubset(don_ht))

sp = bang['san_pham'].astype({'gia_co_ban': int, 'suc_chua_toi_da': int, 'so_luot_danh_gia': int})
kiem('san_pham: gia_co_ban > 0', bool((sp['gia_co_ban'] > 0).all()))
kiem('san_pham: suc_chua_toi_da > 0', bool((sp['suc_chua_toi_da'] > 0).all()))
dg_duyet = dg[dg['trang_thai_kiem_duyet'] == 'da_duyet'].groupby('ma_san_pham').size()
tinh_lai = sp.set_index('ma_san_pham')['so_luot_danh_gia']
kiem('san_pham.so_luot_danh_gia khớp số đánh giá đã duyệt',
     bool((tinh_lai.reindex(dg_duyet.index) == dg_duyet).all()))

gm = bang['gia_theo_mua']
kiem('gia_theo_mua: mỗi sản phẩm đủ 04 mùa',
     bool((gm.groupby('ma_san_pham').size() == 4).all()))

print('\n=== 5. TINH DAY DU VA HOP LE ===')
dd = bang['diem_den'].astype({'vi_do': float, 'kinh_do': float})
kiem('diem_den: vĩ độ trong [8.0, 24.0]', bool(dd['vi_do'].between(8.0, 24.0).all()))
kiem('diem_den: kinh độ trong [102.0, 110.0]', bool(dd['kinh_do'].between(102.0, 110.0).all()))
kiem('diem_den: đường dẫn tĩnh duy nhất', dd['duong_dan_tinh'].is_unique)
nd = bang['nguoi_dung']
kiem('nguoi_dung: tên đăng nhập duy nhất', nd['ten_dang_nhap'].is_unique)
kiem('nguoi_dung: có đủ 05 vai trò', nd['vai_tro'].nunique() == 5)
kiem('nguoi_dung: KHÔNG chứa cột mật khẩu', 'mat_khau' not in nd.columns)
kiem('thanh_toan: chỉ có mã giao dịch môi trường thử nghiệm',
     bool(bang['thanh_toan']['ma_giao_dich_sandbox'].str.startswith('SBX').all()))
kiem('nhat_ky_he_thong: có bản ghi mức warning',
     'warning' in set(bang['nhat_ky_he_thong']['muc']))

print('\n' + '=' * 62)
if loi:
    print('KET LUAN: KHONG DAT — %d phep kiem dinh that bai' % len(loi))
    for l in loi:
        print('   - ' + l)
    sys.exit(1)
print('KET LUAN: DAT — toan bo phep kiem dinh thanh cong.')
print('Tong so ban ghi: %d' % tong)
sys.exit(0)
