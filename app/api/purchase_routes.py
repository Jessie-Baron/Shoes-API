from app.models import Purchase
from flask import Blueprint, db, request, jsonify
from flask_login import current_user
from app.forms import PurchaseForm, PurchaseEditForm


purchase_routes = Blueprint('purchase', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@purchase_routes.route('')
def get_purchase():
    data = Purchase.query.all()
    print("this is the data", data)
    return {purchase.to_dict()['id']: purchase.to_dict() for purchase in data}

@purchase_routes.route('/<int:id>')
def get_purchase_id(id):
    data = Purchase.query.get(id)
    return data.to_dict()


@purchase_routes.route('', methods=['POST'])
def post_purchase(id):
    form = PurchaseForm()
    if form.validate_on_submit():
        purchase_upload = Purchase(
                    name=form.data['name'],
                    date_of_purchase = form.data['date_of_purchase'],
                    shoe_id = id,
                    user_id=current_user.id
        )
        db.session.add(purchase_upload)
        db.session.commit()
        return purchase_upload.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@purchase_routes.route('/<int:id>',  methods=['PUT'])
def edit_purchase(id):
    purchase = Purchase.query.get(id)
    if current_user.id == purchase.user_id:
        form = PurchaseEditForm()
        if form.validate_on_submit():
            purchase.name = form.data["name"],
            purchase.date_of_purchase = form.data["date_of_purchase"],
            #will revisit this later, not sure what I did incorrectly
            db.session.add(purchase)
            db.session.commit()
            return purchase.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@purchase_routes.route('/<int:id>', methods=['DELETE'])
def delete_purchase(id):
    purchase = Purchase.query.get(id)
    if current_user.id == purchase.user_id:
        db.session.delete(purchase)
        db.session.commit()
        return {"data": "Deleted"}
    return {'errors': ['Unauthorized']}
