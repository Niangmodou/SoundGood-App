import os
from flask import Flask, request, render_template, jsonify
from dotenv import dotenv_values
from config import app, SALT
from flask_cors import CORS
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from project.models import db, User
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import hashlib

JWT = JWTManager(app)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/api/current_user", methods=["GET"])
@jwt_required
def current_user():
    current_username = get_jwt_identity()

    user = User.query.filter_by(username=current_username)

    return jsonify(user)



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
            access_token = create_access_token(identity={"username": username})
            response = jsonify(
                {"token": access_token, "status": "Succesfully logged in user"}
            )
            response.status_code = 200
        else:
            response = jsonify({"status": "Incorrect username or password"})
            response.status_code = 500
    else:
        response = jsonify({"status": "error has occured"})
        response.status_code = 500

    return response


@app.route("/api/register", methods=["POST"])
def register_auth():
    data = request.get_json()

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
            response.status_code = 500
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

            response = jsonify({"status": "succesfully created user"})
            response.status_code = 200

    else:
        response = jsonify({"status": "error has occured"})
        response.status_code = 500

    return response


if __name__ == "__main__":
    app.run(debug=True)
