from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def name_too_long(form, field):
    name = field.data
    if len(name) <= 0 or len(name) >40:
        print("error")
        raise ValidationError("Character limit exceeded")
def caption_is_not_too_long(form, field):
    caption = field.data
    if len(caption) >= 2500:
        print("error")
        raise ValidationError("Character limit exceeded")


class PurchaseEditForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired(), name_too_long])
    name = StringField('name', validators=[DataRequired()])
    date_of_purchase = DateField("date of purchase", validators=[DataRequired()])
    shoe_id = IntegerField("shoe_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])