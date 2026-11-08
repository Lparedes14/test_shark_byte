import threading
import unittest
from http.server import ThreadingHTTPServer
from urllib.error import HTTPError
from urllib.request import urlopen

from app import HealthHandler


class HealthRouteTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), HealthHandler)
        cls.port = cls.server.server_address[1]
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.thread.join(timeout=5)
        cls.server.server_close()

    def test_health_returns_exactly_ok(self):
        with urlopen(f"http://127.0.0.1:{self.port}/health") as response:
            body = response.read().decode("utf-8")
            self.assertEqual(response.status, 200)
            self.assertEqual(body, "ok")

    def test_other_paths_are_not_ok(self):
        with self.assertRaises(HTTPError) as caught:
            urlopen(f"http://127.0.0.1:{self.port}/")
        self.assertEqual(caught.exception.code, 404)


if __name__ == "__main__":
    unittest.main()
