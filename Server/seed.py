from app import db, User, Book, Review,Favourite, app


with app.app_context():
    User.query.delete()
