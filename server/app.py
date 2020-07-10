from flask import Flask
from config import config
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    register_extension(app)
    register_blueprint(app)
    CORS(app)
    return app


def register_extension(app):
    from extensions import mysql

    mysql.init_app(app)


def register_blueprint(app):
    from user_blueprint import user

    app.register_blueprint(user, url_prefix="/user")


app = create_app()
