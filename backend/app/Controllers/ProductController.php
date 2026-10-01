<?php
// backend/app/Controllers/ProductController.php - CRUD sản phẩm du lịch cho vai trò Quản trị viên (Mốc M1)

require_once __DIR__ . '/../Middleware/EnsureRole.php';

class ProductController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * 1. Lấy danh sách sản phẩm (có phân trang phía máy chủ)
     */
    public function index(int $page = 1, int $limit = 10): void
    {
        EnsureRole::check(['admin']);
        $page = max(1, $page);
        $offset = ($page - 1) * $limit;

        // Đếm tổng số bản ghi
        $total = $this->db->query("SELECT COUNT(*) FROM products")->fetchColumn();

        // Truy vấn phân trang
        $stmt = $this->db->prepare("
            SELECT p.id, p.title, p.slug, p.type, p.base_price, p.duration_days, p.capacity, p.status,
                   s.name AS supplier_name, c.name AS category_name
            FROM products p
            LEFT JOIN suppliers s ON p.supplier_id = s.id
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id DESC
            LIMIT ? OFFSET ?
        ");
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->bindValue(2, $offset, PDO::PARAM_INT);
        $stmt->execute();
        $items = $stmt->fetchAll();

        echo json_encode([
            'status' => 'success',
            'data' => $items,
            'pagination' => [
                'current_page' => $page,
                'limit' => $limit,
                'total_items' => (int)$total,
                'total_pages' => ceil($total / $limit)
            ]
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 2. Thêm mới sản phẩm (Bắt buộc vai trò 'admin' hoặc 'supplier')
     */
    public function store(array $data): void
    {
        EnsureRole::check(['admin', 'supplier']);

        $title = trim($data['title'] ?? '');
        $supplierId = (int)($data['supplier_id'] ?? 1);
        $categoryId = (int)($data['category_id'] ?? 1);
        $type = $data['type'] ?? 'tour';
        $basePrice = (float)($data['base_price'] ?? 0);
        $durationDays = (int)($data['duration_days'] ?? 1);
        $capacity = (int)($data['capacity'] ?? 20);
        $cancelPolicy = trim($data['cancel_policy'] ?? 'Miễn phí hủy trước 7 ngày');

        // Kiểm tra hợp lệ dữ liệu
        if (empty($title) || $basePrice <= 0 || $capacity <= 0) {
            http_response_code(422);
            echo json_encode([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ: Tên, giá gốc (>0) và sức chứa (>0) là bắt buộc.'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $slug = 'sp-' . time() . '-' . rand(100, 999);

        $stmt = $this->db->prepare("
            INSERT INTO products (supplier_id, category_id, title, slug, type, base_price, duration_days, capacity, cancel_policy, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', NOW())
        ");
        $stmt->execute([$supplierId, $categoryId, $title, $slug, $type, $basePrice, $durationDays, $capacity, $cancelPolicy]);

        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'Thêm sản phẩm du lịch thành công.',
            'product_id' => $this->db->lastInsertId()
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 3. Cập nhật sản phẩm (Chỉ Admin)
     */
    public function update(int $id, array $data): void
    {
        EnsureRole::check(['admin']);

        $title = trim($data['title'] ?? '');
        $basePrice = (float)($data['base_price'] ?? 0);
        $capacity = (int)($data['capacity'] ?? 0);

        $stmt = $this->db->prepare("
            UPDATE products 
            SET title = COALESCE(NULLIF(?, ''), title),
                base_price = CASE WHEN ? > 0 THEN ? ELSE base_price END,
                capacity = CASE WHEN ? > 0 THEN ? ELSE capacity END
            WHERE id = ?
        ");
        $stmt->execute([$title, $basePrice, $basePrice, $capacity, $capacity, $id]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Cập nhật sản phẩm thành công.'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 4. Xóa sản phẩm (Chỉ Admin)
     */
    public function destroy(int $id): void
    {
        EnsureRole::check(['admin']);

        $stmt = $this->db->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Đã xóa sản phẩm ID ' . $id . ' thành công.'
        ], JSON_UNESCAPED_UNICODE);
    }
}