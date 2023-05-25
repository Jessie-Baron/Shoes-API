from flask import Blueprint, request, jsonify
from app.models import Review, db, User
from flask_login import login_required, current_user
from app.forms import ReviewForm, ReviewEditForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@review_routes.route('')
def get_reviews():
    """
    queries for all reviews for a shoe
    """
    data = Review.query.all()
    print("this is the data", data)
    return {review.to_dict()['id']: review.to_dict() for review in data}

@review_routes.route('/<int:id>', methods=['POST'])
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


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fix_review(id):
    """
    Query for a single review and edit that review
    """
    review = Review.query.get(id)
    if current_user.id == review.user_id:
        form = ReviewEditForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            review.body = form.data['body'],
            review.rating = form.data['rating'],
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
