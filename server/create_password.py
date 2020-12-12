import os
import jwt
import hashlib


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

    return jwt.decode(token, os.environ['JWT_SECRET'], algorithms=['HS256'])
