<?php

namespace App\Controllers;

use PDO;
use PDOException;

class SearchController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = new PDO("mysql:host=127.0.0.1;dbname=dulichso;charset=utf8mb4", 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function search(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $keyword  = trim($_GET['q'] ?? '');
        $minPrice = isset($_GET['min_price']) && $_GET['min_price'] !== '' ? (float)$_GET['min_price'] : null;
        $maxPrice = isset($_GET['max_price']) && $_GET['max_price'] !== '' ? (float)$_GET['max_price'] : null;
        $page     = max(1, (int)($_GET['page'] ?? 1));
        $limit    = max(1, min(50, (int)($_GET['limit'] ?? 10)));
        $offset   = ($page - 1) * $limit;

        // Cho hiển thị tất cả các tour
        $conditions = ["1 = 1"];
        $params = [];

        if (!empty($keyword)) {
            $conditions[] = "title LIKE :keyword";
            $params[':keyword'] = "%{$keyword}%";
        }
        if ($minPrice !== null && $minPrice >= 0) {
            $conditions[] = "base_price >= :min_price";
            $params[':min_price'] = $minPrice;
        }
        if ($maxPrice !== null && $maxPrice > 0) {
            $conditions[] = "base_price <= :max_price";
            $params[':max_price'] = $maxPrice;
        }

        $whereSql = implode(' AND ', $conditions);

        try {
            $countStmt = $this->db->prepare("SELECT COUNT(*) FROM products WHERE {$whereSql}");
            $countStmt->execute($params);
            $totalItems = (int)$countStmt->fetchColumn();

            $sql = "SELECT id, title, slug, type, base_price, duration_days, capacity, cancel_policy, status 
                    FROM products 
                    WHERE {$whereSql} 
                    ORDER BY id ASC 
                    LIMIT :offset, :limit";
            $stmt = $this->db->prepare($sql);
            foreach ($params as $k => $v) {
                $stmt->bindValue($k, $v);
            }
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            $items = $stmt->fetchAll();

            echo json_encode([
                'status' => 'success',
                'pagination' => [
                    'current_page' => $page,
                    'limit'        => $limit,
                    'total_items'  => $totalItems,
                    'total_pages'  => ceil($totalItems / $limit)
                ],
                'data' => $items
            ], JSON_UNESCAPED_UNICODE);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
}