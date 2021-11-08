from dotenv import dotenv_values
from flask import Flask

app = Flask(__name__)

# Model imports
config = dotenv_values(".env")

app.config["SQLALCHEMY_DATABASE_URI"] = config["POSTGRES_URI"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = config["SECRET_KEY"]

# Password secret SALT
SALT = config["SALT"]