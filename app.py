#!/usr/bin/env python3
"""Minimal HTTP server. GET /health returns the text ok."""

import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if urlsplit(self.path).path == "/health":
            body = b"ok"
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_error(404)

    def log_message(self, fmt, *args):
        return


def serve(host="127.0.0.1", port=8000):
    server = ThreadingHTTPServer((host, port), HealthHandler)
    server.serve_forever()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    print(f"listening on http://127.0.0.1:{port}", flush=True)
    serve(port=port)
