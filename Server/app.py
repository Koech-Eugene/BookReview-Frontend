from flask import Flask, make_response, request
from flask_migrate import Migrate

from models.user import User
from models.book import Book
from models.review import Review
from models.favourite import Favourite
from models.passwordresettoken import PasswordRestToken
import jwt
from jwt import InvalidTokenError, ExpiredSignatureError
import os 
import base64
from flasgger import Swagger
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from sqlalchemy.exc import IntegrityError
import random
import string
from models.init import db

app = Flask(__name__)
app.config['SWAGGAR'] = {
    'title':'Authentication and Authorisation for user',
    'uiversion': 3
}
swagger = Swagger(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
secret_key = base64.b64encode(os.urandom(24)).decode('utf-8')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app,db)

db.init_app(app)

@app.route('/register',methods=['POST'])
def register():
    '''
    Register a new user
    ---
    - Authentication
    Parameters:
    tags:
    - name: username
      in: body
      type: string
      required: true
      description: user's username (should be unique)
    - name: password
      in: body
      type:required
      description: user's password 

      responses:
        201:
        description: User registered successfuly
        schema:
            type: object
            properties:
                message:
                    type: string
                    description: login succsess message
        400:
            description: user did not login successfully
    
    '''

    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    hashed_pass = generate_password_hash(password,method='pbkdf2:sha512')
    try:
        new_user = User(username=username,password=hashed_pass,email=email)
    except ValueError:
        return make_response({"error":'email is not valid'})
    except IntegrityError:
        return make_response({"error":'password or username not valid'})
    
    db.session.add(new_user)
    db.session.commit()
    return make_response({'message':'user has been registered'})



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username = username).first()

    if not user:
        return make_response({'error':'username is not valid'})
     

    if check_password_hash(user.password, password):
        expiration_time = datetime.utcnow() + timedelta(hours=3)
        token = jwt.encode({'user_id':user.id,'exp':expiration_time}, secret_key, algorithm='HS256')
        print(token)
        return make_response({'message':'Login successful', 'token':token}, 200)
    else:
        return make_response({'error':'wrong password'})

# helper function to decode the token
    
def decode_token(token):
    
    try:
        print(token)
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return "The token is expired please login again"
    except jwt.InvalidTokenError:
        return "The token is invalid please login again"

@app.route('/protected_routes')
def protected_example():
    
    token = request.headers.get('Authorization')
    

    if not token:
        return make_response({'error':'No token given'}, 401)
    
    # clean token
    token = token.split(' ')[1]
    print('clean token is:', token)


    payload = decode_token(token)
    if isinstance(payload,str):
        return make_response({'message':payload}, 401)
    return make_response({'message':'user has access here'}, 200)
    
    







# ResetPassword

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    username = data.get('username')
    
    user = User.query.filter_by(username = username).first()
    
    if not user:
        return make_response({"error":'username not found'})
    token = ''.join(random.choices(string.ascii_letters + string.digits, k=20))
    expiration = datetime.now() + timedelta(minutes=15)
    print(user.id, 'Hereeeeee')

    reset_token = PasswordRestToken(user_id=user.id,token=token, expiration=expiration)
    db.session.add(reset_token)
    db.session.commit()
    return make_response({"reset_token":reset_token.token})

    
def decode(token):
    payload = jwt.decode(token, secret_key, algorithms=["HS256"])
    return payload

if __name__ == 'main':
    app.run(port=5555, debug=True)