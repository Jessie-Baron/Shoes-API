from .db import db, environment, SCHEMA, add_prefix_for_prod

class Shoe(db.Model):
    __tablename__ = 'shoes'

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(255), nullable=True)
    brand = db.Column(db.String(40), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(40), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(40), nullable=False)
    material = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    review = db.relationship("Review", backref="shoes")

    def to_dict(self):
        return {
            'id': self.id,
            'img_url': self.img_url,
            'brand': self.brand,
            'model': self.model,
            'type': self.type,
            'size': self.size,
            'color': self.color,
            'material': self.material,
            'price': self.price,
            'Review': [review.to_dict() for review in self.reviews]
        }
