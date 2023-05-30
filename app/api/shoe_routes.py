from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Shoe, db, Review
from app.forms import ShoeForm, ShoeEditForm, ReviewForm

shoe_routes = Blueprint('shoes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@shoe_routes.route('')
def shoes():
    """
    Query for all shoes and return them in a list of shoe dictionaries
    """
    data = Shoe.query.all()
    return {shoe.to_dict()['id']: shoe.to_dict() for shoe in data}


@shoe_routes.route('/<int:id>')
def shoe(id):
    """
    Query for a shoe by id and return that shoe in a dictionary
    """
    data = Shoe.query.get(id)
    return data.to_dict()

@shoe_routes.route('', methods=['POST'])
@login_required
def post_shoe():
    """
    Create a shoe
    """
    form = ShoeForm()
    shoe = Shoe(
            img_url = form.data['img_url'],
            brand = form.data['brand'],
            model = form.data['model'],
            type = form.data['type'],
            size = form.data['size'],
            color = form.data['color'],
            material = form.data['material'],
            price = form.data['price']
            )
    db.session.add(shoe)
    db.session.commit()
    return shoe.to_dict()

@shoe_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fix_shoe(id):
    """
    Query for a single shoe and edit that shoe
    """
    shoe = Shoe.query.get(id)
    form = ShoeEditForm()
    print(form.data)
    shoe.brand = form.data['brand']
    shoe.model = form.data['model']
    shoe.shoe_type = form.data['shoe_type']
    shoe.size = form.data['size']
    shoe.color = form.data['color']
    shoe.material = form.data['material']
    shoe.price = form.data['price']
    db.session.add(shoe)
    db.session.commit()
    return shoe.to_dict()

@shoe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_shoe(id):
    """
    Query for a single shoe and delete that shoe
    """
    shoe = Shoe.query.get(id)
    db.session.delete(shoe)
    db.session.commit()
    return {'message': 'Deleted'}


# review routes

@shoe_routes.route('/reviews')
def get_reviews():
    """
    queries for all reviews for a shoe
    """
    data = Review.query.all()
    print("this is the data", data)
    return {review.to_dict()['id']: review.to_dict() for review in data}

@shoe_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def post_review(id):
    """
    Posts a review to a shoe
    """
    form = ReviewForm()
    print(request)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    print(form.errors)
    print(form.validate_on_submit())
    if form.validate_on_submit():
        review = Review(body=form.data['body'],
                        rating = form.data['rating'],
                        user_id=current_user.id,
                        shoe_id=id)
        print(type(review.body))
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
