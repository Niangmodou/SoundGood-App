from ctypes import resize
import os
from flask import request, render_template, jsonify
from sqlalchemy.sql.expression import true
from config import app, SALT
from sqlalchemy import desc
import heapq
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from project.models import db, User, AudioRecording, Post, Comment
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS
import hashlib

JWT = JWTManager(app)
ERROR = "error has occured"
CORS(app)

# Endpoint for homepage
@app.route("/")
@jwt_required()
def home():
    current_username = get_jwt_identity()["username"]

    try:
        user = User.query.filter_by(username=current_username).first()
        serialized_user = user.as_dict()

        response = jsonify(serialized_user)
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 500

    return response


# Endpoint for login page
@app.route("/login")
def login():
    return render_template("login.html")


# Endpoint for register page
@app.route("/register")
def register():
    return render_template("register.html")


# Endpoint to retrieve the current logged in user
@app.route("/api/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_username = get_jwt_identity()["username"]

    try:
        user = User.query.filter_by(username=current_username).first()
        serialized_user = user.as_dict()

        response = jsonify(serialized_user)
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 500

    return response


# Endpoint to login user
@app.route("/api/login", methods=["POST"])
def login_auth():
    data = request.get_json()
    print(data)
    if data:
        username = data["username"]
        password = data["password"]

        password_salt = password + SALT
        password_hash = hashlib.sha256(password_salt.encode("utf-8")).hexdigest()

        user = User.query.filter_by(username=username, password=password_hash).first()

        if user:
            access_token = create_access_token(identity={"username": username})
            response = jsonify(
                {"token": access_token, "status": "Succesfully logged in user"}
            )
            response.status_code = 200
        else:
            response = jsonify({"status": "Incorrect username or password"})
            response.status_code = 200
    else:
        response = jsonify({"status": ERROR})
        response.status_code = 500

    return response


# Endpoint to register a new user
@app.route("/api/register", methods=["POST"])
def register_auth():
    data = request.get_json()
    print(data)
    if data:
        first_name = data["first_name"]
        last_name = data["last_name"]
        username = data["username"]
        password = data["password"]
        email_address = data["email_address"]

        password_salt = password + SALT
        password_hash = hashlib.sha256(password_salt.encode("utf-8")).hexdigest()

        # Duplicate user
        user = User.query.filter_by(username=username).first()

        if user:
            response = jsonify(
                {"status": "there is already a user with the same username"}
            )
            response.status_code = 200
        else:
            new_user = User(
                username=username,
                first_name=first_name,
                last_name=last_name,
                password=password_hash,
                email_address=email_address,
            )
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity={"username": username})

            response = jsonify(
                {"status": "Succesfully created user", "token": access_token}
            )
            print(response)
            response.status_code = 200

    else:
        response = jsonify({"status": ERROR})
        response.status_code = 500

    return response


# Endpoint to retrieve all the recordings
@app.route("/api/recordings", methods=["GET"])
def get_all_recordings():
    try:
        recordings_list = list(AudioRecording.query.all())

        # Serializing the recordings in the list
        recordings_serialzied = [recording.as_dict() for recording in recordings_list]

        data = {"recordings": recordings_serialzied}

        response = jsonify(data)
        response.status_code = 200

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to retrieve all of the posts for the forum
@app.route("/api/forum", methods=["GET"])
def retrieve_forum_posts():
    try:
        all_posts = list(Post.query.all())

        # Serialization
        serialized_posts = [post.as_dict() for post in all_posts]

        data = {"posts": serialized_posts}

        response = jsonify(data)
        response.status_code = 200

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Function to retrieve the details of a post given the ID
@app.route("/api/post", methods=["GET"])
def retrieve_post_given_id():
    try:
        post_id = int(request.args.get("postid"))

        requested_post = Post.query.filter(id=post_id).first()

        # Sorting in descending order
        recent_results = list(requested_post.comments.order_by(desc("date_posted")))

        data = {
            "post": requested_post.as_dict(),
            "recentResults": recent_results
        }

        response = jsonify(data)
        response.status_code = 200

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to like a comment given the ID
@app.route("/api/likecomment", methods=["POST"])
@jwt_required()
def like_comment():
    try:
        comment_id = int(request.args.get("commentid"))

        request_json = request.get_json()
        if request_json:
            # Retrieve user from user token
            # TODO: Keep track of which comment user has liked
            # Prevent double counting
            _ = get_jwt_identity()["username"]

            comment = Comment.query.filter(id=comment_id).first()
            comment.like_count += 1

            db.session.commit()

            response = jsonify({"status": "success"})
            response.status_code = 200

            return response
        else:
            response = jsonify({"status": ERROR})
            response.status_code = 400

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to dislike a comment given the ID
@app.route("/api/dislikecomment", methods=["POST"])
@jwt_required()
def dislike_comment():
    try:
        comment_id = int(request.args.get("commentid"))

        request_json = request.get_json()
        if request_json:
            # Retrieve user from user token
            # TODO: Keep track of which comment user has disliked
            # Prevent double counting
            _ = get_jwt_identity()["username"]

            comment = Comment.query.filter(id=comment_id).first()
            comment.dislike_count += 1

            db.session.commit()

            response = jsonify({"status": "success"})
            response.status_code = 200

            return response

        else:
            response = jsonify({"status": "success"})
            response.status_code = 200

            return response
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to retrieve all the posts of a user
@app.route("/api/userposts", methods=["GET"])
@jwt_required
def retrieve_user_posts():
    try:
        current_user = get_jwt_identity()["username"]

        user_posts = Post.query.filter(user_id=current_user.id)

        serialized_posts = [post.as_dict() for post in user_posts]

        data = {"posts": serialized_posts}
        response = jsonify(data)
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response

#test
if __name__ == "__main__":
    app.run(debug=True)
