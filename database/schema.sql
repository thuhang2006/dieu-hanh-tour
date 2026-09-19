-- =====================================================================
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
