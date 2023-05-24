from xmlrpc.client import DateTime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Purchases(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    now = DateTime.datetime.utcnow

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    date_of_purchase = db.Column(db.DateTime, default=now)
    shoe_id = db.Column(db.Integer, foreign_key= True("shoe_id"))
    user_id = db.Column(db.Integer, foreign_key= True("user_id"))
    user = db.relationship("User", backref="purchases")
    shoe = db.relationship("Shoes", backref="purchases")




   

    @property
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date of purchase': self.date_of_purchase
            'shoe_id': self.shoe_id
            'user_id': self.user_id
        }
