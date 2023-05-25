from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ShoeForm(FlaskForm):
    img_url = StringField('Image URL')
    brand = StringField('Brand', validators=[DataRequired()])
    model = StringField('Model', validators=[DataRequired()])
    shoe_type = StringField('Type', validators=[DataRequired()])
    size = IntegerField('Size', validators=[DataRequired()])
    color = StringField('Color', validators=[DataRequired()])
    material = StringField('Material', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    submit = SubmitField('Submit')

    # def create_shoe(self):
    #     shoe = ShoeForm(
    #         img_url=self.img_url.data,
    #         brand=self.brand.data,
    #         model=self.model.data,
    #         shoe_type=self.shoe_type.data,
    #         size=self.size.data,
    #         color=self.color.data,
    #         material=self.material.data,
    #         price=self.price.data,
    #         review_id=self.review_id.data
    #     )

    # def update_shoe(self, shoe):
    #         shoe.img_url = self.img_url.data
    #         shoe.brand = self.brand.data
    #         shoe.model = self.model.data
    #         shoe.shoe_type = self.shoe_type.data
    #         shoe.size = self.size.data
    #         shoe.color = self.color.data
    #         shoe.material = self.material.data
    #         shoe.price = self.price.data
    #         shoe.review_id = self.review_id.data
