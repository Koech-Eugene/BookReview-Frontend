from models.init import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates





class Review(db.Model,SerializerMixin):
   
    __tablename__ = 'reviews'
    serialize_rules = ('-reviews.user','favourites.user')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    comment = db.Column(db.String(255))
    user = db.relationship('User', back_populates='reviews')
    book = db.relationship('Book', back_populates='reviews')

# @validates('user_id', 'book_id')
# def validates_foreign_keys(self, key, value):
#     if key == 'user_id':
#         #validate user_id
#         user = User.query.get(value)
#         if user is None:
#             raise ValueError("User does not exist")
#     elif key == 'book_id':
#         #validate book_id
#         book = Book.query.get(value)
#         if book is None:
#             raise ValueError("Book does not exist")
        
#         return value

    def __repr__(self):
        return f"<Review {self.id}>"

    def serialize(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'comment': self.comment
        }