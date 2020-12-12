from flask import Blueprint
from flask import request
from create_password import decode_token

blog = Blueprint("blog_blueprint", __name__)


@blog.route('/create-blog')
def create_blog():
    """Create New Blog"""
    auth_header = request.headers.get('Authorization')
    user_id = decode_token(auth_header)

    print(user_id)
    return user_id
