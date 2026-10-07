import os, time
from typing import List, Dict, Any

try:
    import pymysql
except ImportError:
    pymysql = None

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "dulichso"),
    "charset": "utf8mb4"
}

_CACHE: Dict[str, Dict[str, Any]] = {}
CACHE_TTL_SECONDS = 300

def get_fallback_recommendations() -> List[Dict[str, Any]]:
    return [
        {
            "id": 21,
            "title": "Tour Thám Hiểm Hang Én Quảng Bình 3N2Đ",
            "slug": "tour-tham-hiem-hang-en-3n2d",
            "base_price": 6990000.0,
            "category": "Du lịch mạo hiểm & Trekking",
            "destination": "Vườn quốc gia Phong Nha - Kẻ Bàng",
            "province": "Quảng Bình",
            "reason": "Phù hợp với khách yêu thích khám phá thiên nhiên và hang động (Fallback chuẩn)"
        },
        {
            "id": 22,
            "title": "Khám Phá Cao Nguyên Đá Đồng Văn 3N2Đ",
            "slug": "kham-pha-cao-nguyen-da-dong-van",
            "base_price": 2890000.0,
            "category": "Du lịch văn hóa & Lễ hội",
            "destination": "Cao nguyên đá Đồng Văn",
            "province": "Hà Giang",
            "reason": "Khớp mùa hoa tam giác mạch và trải nghiệm văn hóa bản địa"
        },
        {
            "id": 1,
            "title": "Tour Du Thuyền 5 Sao Khám Phá Vịnh Hạ Long 2N1Đ",
            "slug": "tour-ha-long-5-sao-2n1d",
            "base_price": 2850000.0,
            "category": "Du lịch biển đảo & Nghỉ dưỡng",
            "destination": "Vịnh Hạ Long",
            "province": "Quảng Ninh",
            "reason": "Tour tiêu biểu được đặt nhiều nhất trên hệ thống"
        }
    ]

def recommend_tours_for_user(user_id: int, limit: int = 4) -> List[Dict[str, Any]]:
    cache_key = f"rec_user_{user_id}_{limit}"
    now = time.time()
    if cache_key in _CACHE and (now - _CACHE[cache_key]["timestamp"] < CACHE_TTL_SECONDS):
        return _CACHE[cache_key]["data"]
    try:
        if pymysql is None:
            return get_fallback_recommendations()
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor, connect_timeout=3)
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT p.id, p.title, p.slug, p.type, p.base_price, c.name AS category_name, d.name AS destination_name, d.province
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN itineraries it ON p.id = it.product_id
                LEFT JOIN destinations d ON it.destination_id = d.id
                WHERE p.status = 'published'
                GROUP BY p.id
                ORDER BY p.id DESC LIMIT %s
            """, (limit,))
            tours = cursor.fetchall()
            results = [{
                "id": t["id"],
                "title": t["title"],
                "slug": t["slug"],
                "type": t["type"],
                "base_price": float(t["base_price"]),
                "category": t["category_name"] or "Du lịch trải nghiệm",
                "destination": t["destination_name"] or "Điểm đến hấp dẫn",
                "province": t["province"] or "Việt Nam",
                "reason": "Khớp sở thích du lịch và danh mục nổi bật"
            } for t in tours]
            conn.close()
            if not results:
                return get_fallback_recommendations()
            _CACHE[cache_key] = {"timestamp": now, "data": results}
            return results
    except Exception:
        return get_fallback_recommendations()
