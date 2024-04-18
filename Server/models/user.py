from models.init import db
from models.review import Review
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-reviews.user','favourites.user')

   

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
   

    reviews = db.relationship('Review',back_populates='user', cascade=('all','delete-orphan'))

    
    favourites = db.relationship('Favourite',back_populates='user',cascade=('all', 'delete-orphan'))
    reset_tokens = db.relationship('PasswordRestToken',back_populates='user',cascade=('all','delete-orphan'))

    
    books = association_proxy('reviews','book', creator=lambda bookobj: Review(book=bookobj))
    

    # @validates('email')
    # def validate_email(self, key, email):
    #     if (not email.endswith('@gmail.com') and not email.endswith('@yahoo.com') and
    #      not email.endswith('@outlook.com')):
    #         raise ValueError('Invalid email domain')
    #     return email
    

    

    def __repr__(self):
        return f'<user {self.id}, username is: {self.username}.>'