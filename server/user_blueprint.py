import jwt
import os
import uuid
from flask import Blueprint
from flask import request, jsonify
from create_password import *
from extensions import mysql

user = Blueprint('user_blueprint', __name__)


@user.route('/test')
def testing():
    return "successful"


@user.route('/register', methods=['POST'])
def register():
    """Register new user"""

    email = request.json["email"]
    name = request.json["name"]
    password = request.json["password"]
    salt = generate_salt()
    password_hash = generate_password(password+salt)
    cursor = mysql.connection.cursor()

    cursor.execute(
        """SELECT * FROM users WHERE email=%s""", (email,)
    )

    results = cursor.fetchall()
    print(len(results))
    if len(results) == 0:

        cursor.execute(
            """INSERT INTO users (name, email, password, salt) VALUES(%s, %s, %s, %s)""", (
                name, email, password_hash, salt)
        )

        mysql.connection.commit()
        return {"message": "Created", "status": 201}

    else:
        return {"message": "Email already exixts", "status": 400}
    cursor.close()


@user.route('/login', methods=['POST'])
def login():
    """Login"""

    email = request.json["email"]
    password = request.json["password"]

    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM users WHERE email=%s""", (email,)
    )

    results = cursor.fetchone()

    if not bool(results):
        return {"status": 404, "message": "User does not exist"}

    password_hash = generate_password(password+results['salt'])

    if results['password'] == password_hash:
        token = jwt.encode({"id": results['id']},
                           os.environ['JWT_SECRET'], algorithm='HS256').decode('utf-8')
        print(token)
        return_object = {"status": 200, "name": results['name'], "email": results['email'],
                         "profile_picture": results['user_picture'], "token": token}
        return return_object

    return {"message": "Invalid Credentials", "status": 401}
