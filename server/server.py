import os
import hashlib
import jwt
from flask import Flask
from flask import request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Nikhil@123'
app.config['MYSQL_DB'] = 'blog'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


def hash_password(password):
    """Hash Password"""

    hash = hashlib.md5()
    hash.update(password.encode('utf-8'))
    return hash.hexdigest()


def generate_salt():
    """Create a salt"""

    salt = os.urandom(16)
    return salt.hex()


def generate_password(string):
    """Hash the password"""

    password = hash_password(string)
    for _ in range(100):
        password = hash_password(password)
    return password


def decode_token(token):
    """Decode Token"""

    encoded_token = token.split(" ")[1]
    return jwt.decode(encoded_token, 'nikhil', algorithms=['HS256'])


@app.route('/')
def test():
    return "Ping"


@app.route('/register', methods=['POST'])
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


@app.route('/login', methods=['POST'])
def login():
    email = request.json["email"]
    password = request.json["password"]

    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM users WHERE email=%s""", (email,)
    )

    results = cursor.fetchone()

    password_hash = generate_password(password+results['salt'])

    if results['password'] == password_hash:
        token = jwt.encode({"id": results['id']}, "secret", algorithm='HS256')
        return {"status": 200, "name": results['name'], "email": results['email'], "profile_picture": results['user_picture']}

    return {"message": "Invalid Credentials", "status": 401}
