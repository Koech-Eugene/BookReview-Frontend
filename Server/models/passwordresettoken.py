from models.init import db
from sqlalchemy.orm import validates

class PasswordRestToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    token = db.Column(db.String(20), nullable=False)
    expiration = db.Column(db.DateTime)
    user = db.relationship('User',back_populates='reset_tokens')



def __repr__(self):
        return f'<passwordResetToken {self.id}, token is: {self.token}.>'
