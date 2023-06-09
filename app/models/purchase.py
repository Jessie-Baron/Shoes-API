import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Purchase(db.Model):
    __tablename__ = 'purchases'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    date_of_purchase = db.Column(db.String)
    shoe_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("shoes.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", backref="purchases")
    shoe = db.relationship("Shoe", backref="purchases")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date_of_purchase': self.date_of_purchase,
            'shoe_id': self.shoe_id,
            'user_id': self.user_id,
            'User': self.user.to_dict()
        }
