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
    shoes = Shoe.query.all()
    return jsonify({'shoes': [shoe.to_dict() for shoe in shoes]})


@shoe_routes.route('/<int:id>')
def shoe(id):
    """
    Query for a shoe by id and return that shoe in a dictionary
    """
    shoe = Shoe.query.get(id)
    if shoe is None:
        return jsonify({'error': 'Shoe not found'}), 404
    return jsonify(shoe.to_dict())

@shoe_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_shoe(id):
    """
    Create a shoe
    """
    form = ShoeForm()
    print(request)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    print(form.errors)
    print(form.validate_on_submit())
    if form.validate_on_submit():
        shoe = Shoe(body=form.data['body'],
                        rating = form.data['rating'],
                        user_id=current_user.id,
                        shoe_id=id)
        db.session.add(shoe)
        db.session.commit()
        return shoe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@shoe_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fix_shoe(id):
    """
    Query for a single shoe and edit that shoe
    """
    shoe = Shoe.query.get(id)
    if current_user.id == shoe.user_id:
        form = ShoeEditForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            shoe.body = form.data['body'],
            shoe.rating = form.data['rating'],
            db.session.add(shoe)
            db.session.commit()
            return shoe.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@shoe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_shoe(id):
    """
    Query for a single shoe and delete that shoe
    """
    shoe = Shoe.query.get(id)
    print(current_user.id == shoe.user_id)
    if current_user.id == shoe.user_id:
        db.session.delete(shoe)
        db.session.commit()
        return {'message': 'Deleted'}
    return {'errors': ['Unauthorized']}


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
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
