from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import dotenv_values

# Model imports
config = dotenv_values(".env")

app = Flask(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = config['POSTGRES_URI']
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = config['SECRET_KEY']

@app.route("/")
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug = True)