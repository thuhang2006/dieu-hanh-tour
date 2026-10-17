import os, time
from typing import Dict, Any

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

_ANALYTICS_CACHE: Dict[str, Any] = {}

def get_fallback_analytics() -> Dict[str, Any]:
    return {
        "status": "fallback",
        "total_revenue": 128500000.0,
        "total_bookings": 35,
        "total_products": 20,
        "total_destinations": 25,
        "top_selling_tours": [
            {"product_id": 1, "title": "Tour Du Thuyền 5 Sao Vịnh Hạ Long", "orders_count": 8, "revenue": 22800000.0},
            {"product_id": 5, "title": "Hành Trình Di Sản Miền Trung: Huế - Đà Nẵng", "orders_count": 6, "revenue": 27540000.0},
            {"product_id": 4, "title": "Hà Giang Mùa Hoa Tam Giác Mạch", "orders_count": 5, "revenue": 13950000.0}
        ],
        "booking_status_distribution": {
            "confirmed": 18,
            "completed": 10,
            "pending_payment": 5,
            "cancelled": 2
        }
    }

def get_business_analytics() -> Dict[str, Any]:
    now = time.time()
    if "stats" in _ANALYTICS_CACHE and (now - _ANALYTICS_CACHE["stats"]["timestamp"] < 300):
        return _ANALYTICS_CACHE["stats"]["data"]
    try:
        if pymysql is None:
            return get_fallback_analytics()
        conn = pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor, connect_timeout=3)
        with conn.cursor() as cursor:
            cursor.execute("SELECT COALESCE(SUM(total_amount), 0) AS rev, COUNT(id) AS b_cnt FROM bookings WHERE status IN ('confirmed', 'completed')")
            s = cursor.fetchone()
            cursor.execute("SELECT COUNT(*) AS total FROM products")
            p_cnt = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM destinations")
            d_cnt = cursor.fetchone()["total"]
            cursor.execute("""
                SELECT b.product_id, p.title, COUNT(b.id) AS orders_count, COALESCE(SUM(b.total_amount), 0) AS revenue
                FROM bookings b JOIN products p ON b.product_id = p.id
                GROUP BY b.product_id, p.title ORDER BY orders_count DESC LIMIT 3
            """)
            top = cursor.fetchall()
            for t in top: t["revenue"] = float(t["revenue"])
        conn.close()
        res = {
            "status": "live",
            "total_revenue": float(s["rev"]),
            "total_bookings": s["b_cnt"],
            "total_products": p_cnt,
            "total_destinations": d_cnt,
            "top_selling_tours": top
        }
        _ANALYTICS_CACHE["stats"] = {"timestamp": now, "data": res}
        return res
    except Exception:
        return get_fallback_analytics()
