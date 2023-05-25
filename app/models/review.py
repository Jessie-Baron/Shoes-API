from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False, unique=True)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    shoe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("shoes.id")))
    user = db.relationship("User", backref="reviews")
    shoe = db.relationship("Shoe", backref="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'rating': self.rating,
            'user_id': self.user_id,
            'shoe_id': self.shoe_id,
            'User': [user.to_dict() for user in self.user],
            'Shoe': [shoe.to_dict() for shoe in self.shoe]
        }
