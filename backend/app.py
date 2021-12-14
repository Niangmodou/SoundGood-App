import datetime
import hashlib
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from project.models import db, User, AudioRecording, Post, Comment
from ctypes import resize
import os
from flask import request, render_template, jsonify
from config import app, SALT
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

JWT = JWTManager(app)
ERROR = "error has occured"
CORS(app)

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
def retrieve_current_user():
    current_username = get_jwt_identity()["username"]

    try:
        user = User.query.filter_by(username=current_username).first()

        user_posts = Post.query.filter_by(user_id=user.id)

        serialized_posts = [post.as_dict() for post in user_posts]

        data = {"user": user.as_dict(), "posts": serialized_posts}

        response = jsonify(data)
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 500

    return response


# Endpoint to update the user
@app.route("/api/update_user", methods=["POST"])
@jwt_required()
def update_user_data():
    try:
        current_username = get_jwt_identity()["username"]

        request_json = request.get_json()
        if request_json:
            first_name = request_json["firstName"]
            last_name = request_json["lastName"]
            email = request_json["email"]

            # Retrieve current user
            user = User.query.filter_by(username=current_username).first()
            
            user.email = email
            user.first_name = first_name
            user.last_name = last_name

            db.session.commit()

            response = jsonify({"status": "Succesfully edited user"})
            response.status_code = 200
        else:
            response = jsonify({"status": ERROR})
            response.status_code = 500

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 500


    return response


# Endpoint to login user
@app.route("/api/login", methods=["POST"])
def login_auth():
    data = request.get_json()
    if data:
        username = data["username"]
        password = data["password"]

        password_salt = password + SALT
        password_hash = hashlib.sha256(password_salt.encode("utf-8")).hexdigest()

        user = User.query.filter_by(username=username, password=password_hash).first()

        if user:
            access_token = create_access_token(
                identity={"username": username}, expires_delta=False
            )
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

    if data:
        first_name = data["first_name"]
        last_name = data["last_name"]
        username = data["username"]
        password = data["password"]
        email_address = data["email_address"]
        image_url = data["image_url"]

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
                image_url=image_url,
            )
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(
                identity={"username": username}, expires_delta=False
            )

            response = jsonify(
                {"status": "Succesfully created user", "token": access_token}
            )
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
        serialized_posts = []
        for post in all_posts:
            post_dict = post.as_dict()

            # Retrieving the user
            user_id = post_dict["user_id"]

            user = User.query.filter_by(id=user_id).first()

            post_dict["user"] = user.as_dict()

            del post_dict["user_id"]

            serialized_posts.append(post_dict)

        # Reverse to sort in ascending order
        reverse_posts = serialized_posts[::-1]
        data = {"posts": reverse_posts}

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
        print("POST")
        post_id = int(request.args.get("postid"))
        requested_post = Post.query.filter_by(id=post_id).first()
        user = User.query.filter_by(id=requested_post.user_id).first()
        audio = AudioRecording.query.filter_by(id=requested_post.audio_id).first()

        # Sorting in descending order
        recent_results = list(Comment.query.filter_by(post_id=post_id).all())[::-1]

        recent_results_serialized = []

        for comment in recent_results:
            comment_dict = comment.as_dict()

            comment_dict['user'] = User.query.filter_by(id=int(comment_dict["user_id"])).first().as_dict()

            del comment_dict["user_id"]

            recent_results_serialized.append(comment_dict)
            
        data = {
            "post": requested_post.as_dict(),
            "recentResults": recent_results_serialized,
            "user": user.as_dict(),
            "audio": audio.as_dict(),
        }
        
        response = jsonify(data)
        response.status_code = 200

    except Exception as e:
        print("EXCEPTION:", e)
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to like a comment given the ID
@app.route("/api/likecomment", methods=["POST"])
@jwt_required()
def like_comment():
    try:
        print("LIKING")
        print(request)
        request_json = request.get_json()
        print(request_json)
        if request_json:
            comment_id = int(request_json["commentId"])
    
            # Retrieve user from user token
            # TODO: Keep track of which comment user has liked
            # Prevent double counting
            _ = get_jwt_identity()["username"]

            comment = Comment.query.filter_by(id=comment_id).first()
  
            comment.like_count += 1
        
            db.session.commit()

            response = jsonify({"status": "success"})
            response.status_code = 200

        else:
            response = jsonify({"status": ERROR})
            response.status_code = 400

    except Exception as e:
        print(e)
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to create a comment on a post
@app.route("/api/createcomment", methods=["POST"])
@jwt_required()
def comment_post():
    try:
        username = get_jwt_identity()["username"]

        # Finding the user
        user_commented = User.query.filter_by(username=username).first()

        request_json = request.get_json()
        post_id = int(request_json["postId"])
        comment = request_json["comment"]
        
        # Create a new comment
        new_comment = Comment(
            post_id=int(post_id),
            user_id=user_commented.id,
            text=comment,
            like_count=0,
            dislike_count=0,
            date_posted=datetime.datetime.now(),
        )

        db.session.add(new_comment)
        db.session.commit()

        response = jsonify({"status": "success"})
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to dislike a comment given the ID
@app.route("/api/dislikecomment", methods=["POST"])
@jwt_required()
def dislike_comment():
    try:
        print("DISLIKE")
        request_json = request.get_json()
        if request_json:
            comment_id = int(request_json["commentId"])
            # Retrieve user from user token
            # TODO: Keep track of which comment user has disliked
            # Prevent double counting
            _ = get_jwt_identity()["username"]

            comment = Comment.query.filter_by(id=comment_id).first()
            comment.dislike_count += 1

            db.session.commit()

            response = jsonify({"status": "success"})
            response.status_code = 200

        else:
            response = jsonify({"status": "success"})
            response.status_code = 200

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to create a new post
@app.route("/api/createpost", methods=["POST"])
@jwt_required()
def create_new_post():
    username = get_jwt_identity()["username"]

    request_json = request.get_json()
    if request_json:
        current_user = User.query.filter_by(username=username).first()

        new_audio = AudioRecording(
            user_id=current_user.id, sound_url=request_json["soundUrl"]
        )

        db.session.add(new_audio)
        db.session.commit()

        new_post = Post(
            user_id=current_user.id,
            audio_id=new_audio.id,
            description=request_json["title"],
            text=request_json["description"],
            date_posted=datetime.datetime.now(),
        )

        db.session.add(new_post)
        db.session.commit()
        response = jsonify({"status": "success"})
        response.status_code = 200

    else:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to retrieve all the posts of a user
@app.route("/api/userposts", methods=["GET"])
@jwt_required()
def retrieve_user_posts():
    try:
        username = get_jwt_identity()["username"]
        current_user = User.query.filter_by(username=username)

        user_posts = Post.query.filter(user_id=current_user.id)

        serialized_posts = [post.as_dict() for post in user_posts]

        # Retrieve all the comments of each post
        for post in serialized_posts:
            comments = list(Comment.query.filter_by(post_id=int(post["id"])))

            # Serializing comments
            comments = [comment.as_dict() for comment in comments]

            post["comments"] = comments

        data = {"posts": serialized_posts}
        response = jsonify(data)
        response.status_code = 200
    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


# Endpoint to select a comment as an approved answer
@app.route("/api/approveanswer", methods=["POST"])
@jwt_required()
def approve_answer():
    try:
        request_json = request.get_json()
        if request_json:
            post_id = int(request_json["postId"])
            comment_id = int(request_json["commentId"])

            # Setting all the other comments as unfavorited
            post = Post.query.filter_by(id=post_id).first()
            comments = Comment.query.filter_by(post_id=post.id)

            for comment in comments:
                if comment.id == comment_id:
                    print("Found")
                    comment.is_approved = True
                else:
                    comment.is_approved = False

            # TODO: Check whether we should commit after each individual transaction
            # or after we have assigned evverything
            db.session.commit()

    except Exception:
        response = jsonify({"status": ERROR})
        response.status_code = 400

    return response


if __name__ == "__main__":
    app.run(debug=True)
