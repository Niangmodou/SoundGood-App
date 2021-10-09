import sys
import os
import unittest
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from project.models import (
    db, 
    User,
    AudioRecording,
    Post,
    Comment
    )


class ModelTests(unittest.TestCase):
    def setUp(self):
        db.create_all()

    def test_new_user(self):
        test_user = User(
            first_name = "Test",
            last_name = "User",
            username = "testuser",
            email_address = "testuser@test.com",
            password = "passwordhash",
            image_url = "https://123456.imageurl.com"
        )

        self.assertEqual(test_user.first_name, "Test")
        self.assertEqual(test_user.last_name, "User")
        self.assertEqual(test_user.username, "testuser")
        self.assertEqual(test_user.email_address, "testuser@test.com")
        self.assertEqual(test_user.image_url, "https://123456.imageurl.com")

    def test_new_audio(self):
        test_user = User(
            id = 0,
            first_name = "Test",
            last_name = "User",
            username = "testuser",
            email_address = "testuser@test.com",
            password = "passwordhash",
            image_url = "https://123456.imageurl.com"
        )

        test_audio = AudioRecording(
            user_id = test_user.id,
            sound_url = "12345.soundurl.com"
        )

        self.assertEqual(test_audio.user_id, 0)
        self.assertEqual(test_audio.sound_url, '12345.soundurl.com')

    def test_new_post(self):
        test_user = User(
            id = 0,
            first_name = "Test",
            last_name = "User",
            username = "testuser",
            email_address = "testuser@test.com",
            password = "passwordhash",
            image_url = "https://123456.imageurl.com"
        )

        test_audio = AudioRecording(
            id = 0,
            user_id = test_user.id,
            sound_url = "12345.soundurl.com"
        )

        test_post = Post(
            user_id = test_user.id,
            audio_id = test_audio.id,
            text = "test post"
        )

        self.assertEqual(test_post.user_id, 0)
        self.assertEqual(test_post.audio_id, 0)
        self.assertEqual(test_post.text, "test post")

    def test_new_comment(self):
        test_user = User(
            id = 0,
            first_name = "Test",
            last_name = "User",
            username = "testuser",
            email_address = "testuser@test.com",
            password = "passwordhash",
            image_url = "https://123456.imageurl.com"
        )

        test_audio = AudioRecording(
            id = 0,
            user_id = test_user.id,
            sound_url = "12345.soundurl.com"
        )

        test_post = Post(
            id = 0,
            user_id = test_user.id,
            audio_id = test_audio.id,
            text = "test post"
        )

        test_comment = Comment(
            post_id = test_post.id,

            like_count = 0,
            dislike_count = 1,
        )

        self.assertEqual(test_comment.post_id, 0)
        self.assertEqual(test_comment.like_count, 0)
        self.assertEqual(test_comment.dislike_count, 1)

if __name__ == "__main__":
    unittest.main()