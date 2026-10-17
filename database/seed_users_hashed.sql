-- =========================================================================
-- HỌC PHẦN: CSE703073 - PHÁT TRIỂN ỨNG DỤNG WEB (TS. NGUYỄN VĂN TÁNH)
-- BẢN DỮ LIỆU SEED: TÀI KHOẢN NGƯỜI DÙNG VỚI MẬT KHẨU BĂM BCRYPT CÓ MUỐI ($2y$12$)
-- SINH VIÊN THỰC HIỆN: LẠI THỊ THÙY DƯƠNG (MSV: 24105783 - VAI TRÒ: V3)
-- MẬT KHẨU GỐC TRƯỚC KHI BĂM: Demo@2026!
-- =========================================================================

-- 1. Đảm bảo cấu trúc bảng users
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'supplier', 'customer') NOT NULL DEFAULT 'customer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Dữ liệu nạp tài khoản với mật khẩu đã băm an toàn theo chuẩn BCRYPT (Cost = 12)
INSERT INTO `users` (`id`, `email`, `password_hash`, `role`) VALUES
(1, 'admin@demo.test', '$2y$12$6oivgwZ5fcGU9gsHjDAJe8IKWMx5kgJZwRCMfKIFJphggWQbaXre', 'admin'),
(2, 'supplier@demo.test', '$2y$12$6oivgwZ5fcGU9gsHjDAJe8IKWMx5kgJZwRCMfKIFJphggWQbaXre', 'supplier'),
(3, 'khach@demo.test', '$2y$12$6oivgwZ5fcGU9gsHjDAJe8IKWMx5kgJZwRCMfKIFJphggWQbaXre', 'customer')
ON DUPLICATE KEY UPDATE 
    `password_hash` = VALUES(`password_hash`),
    `role` = VALUES(`role`);