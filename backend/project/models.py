from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import Table, Column, Integer, ForeignKey
from config import app

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

    # Used for serialization
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name != "password"}


class AudioRecording(db.Model):
    __tablename__ = "audio_recording"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    sound_url = db.Column(db.String())

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Post(db.Model):
    __tablename__ = "post"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    audio_id = db.Column(db.Integer, db.ForeignKey("audio_recording.id"))
    description = db.Column(db.String())
    text = db.Column(db.String())
    date_posted = db.Column(db.DateTime)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Comment(db.Model):
    __tablename__ = "comment"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    is_approved = db.Column(db.Boolean) 
    text = db.Column(db.String())

    like_count = db.Column(db.Integer)
    dislike_count = db.Column(db.Integer)

    date_posted = db.Column(db.DateTime)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
