from models.init import db
from models.review import Review
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy




class Book(db.Model, SerializerMixin):
    
   __tablename__ = 'books'
   serialize_rules = ('-reviews.book',)



   id = db.Column(db.Integer, primary_key=True)
   title = db.Column(db.String(255), nullable=False)
   genre = db.Column(db.String(100), nullable=False)
   description = db.Column(db.Text, nullable=False)
   image = db.Column(db.String, nullable=False)
   star_rating = db.Column(db.Float, nullable=False)
   liked = db.Column(db.Boolean, nullable=False)

   reviews = db.relationship('Review', back_populates='book', cascade=('all','delete-orphan'))
   #favorites = db.relationship('Favorite', backref='book', lazy=True)

   users = association_proxy('reviews','user', creator=lambda userobj: Review(book=userobj))
   


   def __repr__(self):
        return f'<book {self.id}, title is: {self.title}.>'