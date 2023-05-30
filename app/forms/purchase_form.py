from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def name_is_too_long(form, field):
    name = field.name

    if len(name) > 2000:
        raise ValidationError("name is too long")

class PurchaseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_is_too_long])
    shoe_id = IntegerField('shoe_id',  validators=[DataRequired()])
