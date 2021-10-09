from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import Table, Column, Integer, ForeignKey
from app import app

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    username = db.Column(db.String())
    password = db.Column(db.String())
    email_address = db.Column(db.String())
    image_url = db.Column(db.String())


class AudioRecording(db.Model):
    __tablename__ = "audio_recording"

    id = db.Column(db.Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("user.id"))
    sound_url = db.Column(db.String())


class Post(db.Model):
    __tablename__ = "post"

    id = db.Column(db.Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("user.id"))
    audio_id = Column(Integer, ForeignKey("audio_recording.id"))
    text = db.Column(db.String())
    date_posted = db.Column(db.DateTime)


class Comment(db.Model):
    __tablename__ = "comment"

    id = db.Column(db.Integer, primary_key=True)

    post_id = db.Column(db.Integer, ForeignKey("post.id"))

    like_count = db.Column(db.Integer)
    dislike_count = db.Column(db.Integer)

    date_posted = db.Column(db.DateTime)
