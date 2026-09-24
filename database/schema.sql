-- Học phần: CSE703073 - Lập trình ứng dụng web trong du lịch 2
-- Phụ trách: Nguyễn Thị Ly (V2 - Kiến trúc sư dữ liệu)
CREATE DATABASE IF NOT EXISTS dulichso CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dulichso;

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT UNSIGNED NULL,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(140) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cat_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','supplier','customer','guide') NOT NULL DEFAULT 'customer',
    status ENUM('active','locked') NOT NULL DEFAULT 'active',
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_users_role_status (role, status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_profiles (
    user_id BIGINT UNSIGNED PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    phone VARCHAR(20) NULL,
    preferences JSON NULL,
    CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(180) NOT NULL,
    tax_code VARCHAR(20) NULL,
    province VARCHAR(80) NOT NULL,
    status ENUM('pending','approved','suspended') NOT NULL DEFAULT 'pending',
    CONSTRAINT fk_sup_user FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_sup_province (province, status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS destinations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    province VARCHAR(80) NOT NULL,
    lat DECIMAL(10,7) NULL,
    lng DECIMAL(10,7) NULL,
    best_season VARCHAR(60) NULL,
    visit_minutes SMALLINT UNSIGNED NULL,
    entrance_fee DECIMAL(12,2) NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dest_cat FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_dest_province (province),
    FULLTEXT KEY ft_dest (name, description)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    supplier_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    type ENUM('tour','stay','transfer','ticket','experience') NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    duration_days TINYINT UNSIGNED NOT NULL DEFAULT 1,
    capacity SMALLINT UNSIGNED NOT NULL,
    cancel_policy VARCHAR(255) NOT NULL,
    status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prod_sup FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    CONSTRAINT fk_prod_cat FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT chk_prod_price CHECK (base_price >= 0),
    INDEX idx_prod_filter (status, type, base_price)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS itineraries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    destination_id BIGINT UNSIGNED NOT NULL,
    day_no TINYINT UNSIGNED NOT NULL DEFAULT 1,
    seq_no TINYINT UNSIGNED NOT NULL DEFAULT 1,
    duration_min SMALLINT UNSIGNED NULL,
    note VARCHAR(255) NULL,
    CONSTRAINT fk_it_prod FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_it_dest FOREIGN KEY (destination_id) REFERENCES destinations(id),
    UNIQUE KEY uq_it (product_id, day_no, seq_no)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS availabilities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    service_date DATE NOT NULL,
    seats_total SMALLINT UNSIGNED NOT NULL,
    seats_held SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    seats_sold SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    price_override DECIMAL(12,2) NULL,
    CONSTRAINT fk_av_prod FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT chk_av_seats CHECK (seats_held + seats_sold <= seats_total),
    UNIQUE KEY uq_av (product_id, service_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code CHAR(12) NOT NULL UNIQUE,
    user_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    service_date DATE NOT NULL,
    pax SMALLINT UNSIGNED NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(14,2) NOT NULL,
    status ENUM('draft','pending_payment','confirmed','cancelled','expired','refunded','completed') NOT NULL DEFAULT 'draft',
    hold_expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_bk_prod FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT chk_bk_pax CHECK (pax >= 1)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS booking_status_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    from_status VARCHAR(20) NULL,
    to_status VARCHAR(20) NOT NULL,
    actor_id BIGINT UNSIGNED NULL,
    reason VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bsl_bk FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL,
    gateway VARCHAR(40) NOT NULL,
    txn_ref VARCHAR(80) NOT NULL UNIQUE,
    amount DECIMAL(14,2) NOT NULL,
    status ENUM('initiated','paid','failed','refunded') NOT NULL DEFAULT 'initiated',
    paid_at DATETIME NULL,
    CONSTRAINT fk_pay_bk FOREIGN KEY (booking_id) REFERENCES bookings(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT UNSIGNED NOT NULL UNIQUE,
    product_id BIGINT UNSIGNED NOT NULL,
    rating TINYINT UNSIGNED NOT NULL,
    content TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rv_bk FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT fk_rv_prod FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT chk_rv_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    destination_id BIGINT UNSIGNED NULL,
    title VARCHAR(220) NOT NULL,
    slug VARCHAR(240) NOT NULL UNIQUE,
    body MEDIUMTEXT NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    published_at DATETIME NULL,
    CONSTRAINT fk_art_dest FOREIGN KEY (destination_id) REFERENCES destinations(id),
    CONSTRAINT fk_art_user FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    actor_id BIGINT UNSIGNED NULL,
    action VARCHAR(60) NOT NULL,
    entity VARCHAR(60) NOT NULL,
    entity_id BIGINT UNSIGNED NULL,
    before_json JSON NULL,
    after_json JSON NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
