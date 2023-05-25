from flask import Blueprint, jsonify
from ..models import Shoes

shoe_routes = Blueprint('shoes', __name__)


@shoe_routes.route('/')
def shoes():
    """
    Query for all shoes and return them in a list of shoe dictionaries
    """
    shoes = Shoes.query.all()
    return jsonify({'shoes': [shoe.to_dict() for shoe in shoes]})


@shoe_routes.route('/<int:id>')
def shoe(id):
    """
    Query for a shoe by id and return that shoe in a dictionary
    """
    shoe = Shoes.query.get(id)
    if shoe is None:
        return jsonify({'error': 'Shoe not found'}), 404
    return jsonify(shoe.to_dict())