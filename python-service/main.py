import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from recommender import recommend_tours_for_user
from analytics import get_business_analytics

PORT = 8000

class TourismAPIHandler(BaseHTTPRequestHandler):
    def _send_response_json(self, data: dict, status_code: int = 200):
        response_body = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(response_body)))
        self.end_headers()
        self.wfile.write(response_body)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if path in ["/", "/health"]:
            self._send_response_json({
                "status": "healthy",
                "service": "CSE703073 Python Analytics & Recommender Module",
                "architect": "Nguyễn Thị Ly (V2)",
                "milestone": "M3 (Buổi 7)"
            })
        elif path == "/api/v1/recommendations":
            q = parse_qs(parsed.query)
            uid = int(q.get("user_id", [1])[0])
            self._send_response_json({
                "code": 200,
                "message": "Gợi ý tour thành công",
                "user_id": uid,
                "data": recommend_tours_for_user(uid)
            })
        elif path == "/api/v1/analytics/trends":
            self._send_response_json({
                "code": 200,
                "message": "Thống kê dữ liệu thành công",
                "data": get_business_analytics()
            })
        else:
            self._send_response_json({"error": "Endpoint không tồn tại"}, 404)

if __name__ == "__main__":
    server = HTTPServer(("", PORT), TourismAPIHandler)
    print("=" * 60)
    print(f"🚀 [V2 NGUYỄN THỊ LY] Dịch vụ Python đang chạy tại cổng {PORT}...")
    print(f"👉 Health Check:   http://localhost:{PORT}/health")
    print(f"👉 API Gợi ý Tour: http://localhost:{PORT}/api/v1/recommendations?user_id=1")
    print(f"👉 API Thống kê:   http://localhost:{PORT}/api/v1/analytics/trends")
    print("=" * 60)
    server.serve_forever()
