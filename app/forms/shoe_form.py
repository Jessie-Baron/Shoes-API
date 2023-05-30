from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ShoeForm(FlaskForm):
    img_url = StringField('img_url')
    brand = StringField('brand', validators=[DataRequired()])
    model = StringField('model', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    size = IntegerField('size', validators=[DataRequired()])
    color = StringField('color', validators=[DataRequired()])
    material = StringField('material', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    submit = SubmitField('submit')

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
