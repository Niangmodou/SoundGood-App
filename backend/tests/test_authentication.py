import sys
import os
import unittest
from app import app
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from project.models import db, User


class RegisterTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        db.create_all()

    def test_register_new_user(self):
        new_user_payload = {
            "first_name": "test",
            "last_name": "user1",
            "username": "test1",
            "password": "testpassword",
            "email_address": "test@soundgood.com"
        }

        response = self.app.post("/api/register", json=new_user_payload)

        self.assertEqual(response.json["status"], "succesfully created user")
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class LoginTest(unittest.TestCase):
    def setUp(self):
        db.create_all()
        self.app = app.test_client()

    def test_login_user_has_access(self):
        # register a new user
        new_user_payload = {
            "first_name": "test",
            "last_name": "user1",
            "username": "test1",
            "password": "testpassword",
            "email_address": "test@soundgood.com"
        }
        register_response = self.app.post("/api/register", json=new_user_payload)
        self.assertEqual(register_response.status_code, 200)
        self.assertEqual(register_response.json["status"], "succesfully created user")

        # attempting to log this user in
        user_payload = {
            "username": "test1",
            "password": "testpassword",
        }

        login_response = self.app.post("/api/login", json=user_payload)
        self.assertEqual(login_response.status_code, 200)
        self.assertEqual(login_response.json["status"], "Succesfully logged in user")

    def test_login_user_does_not_have_access(self):
        # attempting to log in nonexistent user
        user_payload = {
            "username": "test1",
            "password": "testpassword",
        }

        login_response = self.app.post("/api/login", json=user_payload)
        self.assertEqual(login_response.status_code, 500)
        self.assertEqual(login_response.json["status"], "Incorrect username or password")

    def tearDown(self):
        db.session.remove()
        db.drop_all()


if __name__ == '__main__':
    unittest.main()