from models.init import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy




class Favourite(db.Model, SerializerMixin):
    __tablename__ = 'favourites'
    #serialize_only = ('favorite_id', 'user_id', 'book_id', 'title', 'genre')
    serialize_rules = ('-user.favourites')


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    title = db.Column(db.String)
    genre = db.Column(db.String)


    
    # reviews = db.relationship('Review', back_populates='favorites')
    # Define relationship with user model.
    user = db.relationship('User', back_populates='favourites')


    def __repr__(self):
        return f"<Favorites(favorite_id={self.favorite_id}, user_id={self.user_id}, book_id={self.book_id}, title='{self.title}', genre='{self.genre}')>"