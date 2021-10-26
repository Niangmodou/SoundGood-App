import os
from flask import Flask, request, jsonify
from dotenv import dotenv_values
from config import app
from flask_cors import CORS
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from project.models import User

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/login", methods=["POST"])
def login():
    # Retrieve data from frontend
    data = request.json()


@app.route("/register", methods=["POST"])
def register():
    # Retrieve data from frontend
    data = request.json()

if __name__ == "__main__":
    app.run(debug=True)
