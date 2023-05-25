from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class PurchaseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    date_of_purchase = DateField("date of purchase", validators=[DataRequired()])
