from ..models import db, User, Review
from sqlalchemy.sql import text

def seed_reviews():
    demo_review_1 = Review(
        body="Great shoes!", rating=5, user_id=1, shoe_id=1)
    demo_review_2 = Review(
        body="Excellent quality and comfortable fit.", rating=4, user_id=1, shoe_id=2)
    demo_review_3 = Review(
        body="Impressed with the durability.", rating=4, user_id=1, shoe_id=3)
    demo_review_4 = Review(
        body="Highly recommend these shoes.", rating=5, user_id=1, shoe_id=4)
    marnie_review_1 = Review(
        body="Nice design and comfortable.", rating=4, user_id=2, shoe_id=5)
    marnie_review_2 = Review(
        body="Received many compliments on these shoes.", rating=5, user_id=2, shoe_id=6)
    marnie_review_3 = Review(
        body="Slightly tight in the toe area.", rating=3, user_id=2, shoe_id=7)
    marnie_review_4 = Review(
        body="Good value for the price.", rating=4, user_id=2, shoe_id=8)
    bobbie_review_1 = Review(
        body="Not happy with the quality.", rating=2, user_id=3, shoe_id=9)
    bobbie_review_2 = Review(
        body="Too narrow for my feet.", rating=2, user_id=3, shoe_id=10)
    bobbie_review_3 = Review(
        body="Uncomfortable after long hours of wear.", rating=2, user_id=3, shoe_id=11)
    bobbie_review_4 = Review(
        body="Disappointed with the color.", rating=2, user_id=3, shoe_id=12)
    bella_review_1 = Review(
        body="Love these shoes! Highly recommend.", rating=5, user_id=4, shoe_id=13)
    bella_review_2 = Review(
        body="Perfect fit and stylish.", rating=5, user_id=4, shoe_id=14)
    bella_review_3 = Review(
        body="Received many compliments on these shoes.", rating=5, user_id=4, shoe_id=15)
    bella_review_4 = Review(
        body="Great for both casual and formal occasions.", rating=5, user_id=4, shoe_id=16)

    # Add four reviews for the remaining users

    db.session.add(demo_review_1)
    db.session.add(demo_review_2)
    db.session.add(demo_review_3)
    db.session.add(demo_review_4)

    db.session.add(marnie_review_1)
    db.session.add(marnie_review_2)
    db.session.add(marnie_review_3)
    db.session.add(marnie_review_4)

    db.session.add(bobbie_review_1)
    db.session.add(bobbie_review_2)
    db.session.add(bobbie_review_3)
    db.session.add(bobbie_review_4)

    db.session.add(bella_review_1)
    db.session.add(bella_review_2)
    db.session.add(bella_review_3)
    db.session.add(bella_review_4)

    # Add four reviews for the remaining users

    db.session.commit()

def undo_reviews():
    db.session.execute(text("DELETE FROM reviews;"))
    db.session.commit()
