from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ShoeEditForm(FlaskForm):
    img_url = StringField('Image URL', validators=[DataRequired()])
    brand = StringField('Brand', validators=[DataRequired()])
    model = StringField('Model', validators=[DataRequired()])
    shoe_type = StringField('Type', validators=[DataRequired()])
    size = IntegerField('Size', validators=[DataRequired()])
    color = StringField('Color', validators=[DataRequired()])
    material = StringField('Material', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
