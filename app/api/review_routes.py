from flask import Blueprint, request, jsonify
from app.models import Review, db, User
from flask_login import login_required, current_user
from app.forms import ReviewForm, ReviewEditForm

review_routes = Blueprint('reviews', __name__)

def convert_tuple(tup):
    str = ''
    for item in tup:
        str = str + item
    return str


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fix_review(id):
    """
    Query for a single review and edit that review
    """
    review = Review.query.get(id)
    print(review)
    if current_user.id == review.user_id:
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review.body = convert_tuple(form.data['body']),
            review.rating = form.data['rating'],
            review.body = convert_tuple(review.body)
            review.rating = review.rating[0]
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_review(id):
    """
    Query for a single review and delete that review
    """
    review = Review.query.get(id)
    print(current_user.id == review.user_id)
    if current_user.id == review.user_id:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Deleted'}
    return {'errors': ['Unauthorized']}
