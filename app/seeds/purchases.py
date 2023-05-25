from ..models import db, Purchase, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_purchases():
    purchase_one = Purchase(
        name='wcdk', date_of_purchase= "2022-23-01", shoe_id= 55 , user_id= 1)
    purchase_two = Purchase(
        name='lsdk', date_of_purchase= "2020-03-02", shoe_id= 22 , user_id= 1)
    purchase_three = Purchase(
        name='reth', date_of_purchase= "2021-12-06", shoe_id= 4, user_id= 1)
    purchase_four = Purchase(
        name='plks', date_of_purchase= "2022-23-01", shoe_id= 8 , user_id= 1)
    purchase_five = Purchase(
        name='nvfh', date_of_purchase= "2020-05-05", shoe_id= 34, user_id= 1)
    purchase_six = Purchase(
        name='olrf', date_of_purchase= "2022-04-04", shoe_id= 87, user_id= 2)
    purchase_seven = Purchase(
        name='csde', date_of_purchase= "2019-15-09", shoe_id= 117, user_id= 2)
    purchase_eight = Purchase(
        name='mkcl', date_of_purchase='"2022-23-12"', shoe_id= 200, user_id= 2)
    purchase_nine = Purchase(
        name='idrq', date_of_purchase= "2022-18-09", shoe_id= 456, user_id= 2)
    purchase_ten = Purchase(
        name='qwxz', date_of_purchase= "2020-03-02", shoe_id= 67, user_id= 2)
    purchase_eleven = Purchase(
        name='yufe', date_of_purchase= "2019-14-08", shoe_id= 79, user_id= 3)
    purchase_tweleve = Purchase(
        name='zscv', date_of_purchase= "2021-04-02", shoe_id= 94, user_id= 3)
    purchase_thirteen = Purchase(
        name='xclk', date_of_purchase= "2020-01-07", shoe_id= 657, user_id= 3)
    purchase_fourteen = Purchase(
        name='aplk', date_of_purchase= "2018-18-05", shoe_id= 101 , user_id= 3)
    purchase_fifteen = Purchase(
        name='iuvb', date_of_purchase= "2019-15-09", shoe_id= 132, user_id= 3)
    purchase_sixteen = Purchase(
        name='undf', date_of_purchase= "2020-08-08", shoe_id= 210, user_id= 4)
    purchase_seventeen = Purchase(
        name='vbdl', date_of_purchase= "2019-25-12", shoe_id= 889, user_id= 4)
    purchase_eighteen = Purchase(
        name='kjhd', date_of_purchase= "2020-04-07", shoe_id= 289, user_id= 4)
    purchase_nineteen = Purchase(
        name='json', date_of_purchase= "2018-14-02", shoe_id= 300, user_id= 4)
    purchase_twenty = Purchase(
        name='dxnc', date_of_purchase= "2018-12-03", shoe_id= 1, user_id= 4)
    purchase_twenty_one = Purchase(
        name='bipw', date_of_purchase= "2019-23-05", shoe_id= 777, user_id= 5)
    purchase_twenty_two = Purchase(
        name='nper', date_of_purchase= "2023-12-04", shoe_id= 320, user_id= 5)
    purchase_twenty_three = Purchase(
        name='rtui', date_of_purchase= "2019-18-11", shoe_id= 906, user_id= 5)
    purchase_twenty_four = Purchase(
        name='onjs', date_of_purchase= "2023-22-01", shoe_id= 444, user_id= 5)
    purchase_twenty_five = Purchase(
        name='dfvs', date_of_purchase= "2018-24-006", shoe_id= 1000, user_id= 5)



    db.session.add(purchase_one)
    db.session.add(purchase_two)
    db.session.add(purchase_three)
    db.session.add(purchase_four)
    db.session.add(purchase_five)
    db.session.add(purchase_six)
    db.session.add(purchase_seven)
    db.session.add(purchase_eight)
    db.session.add(purchase_nine)
    db.session.add(purchase_ten)
    db.session.add(purchase_eleven)
    db.session.add(purchase_tweleve)
    db.session.add(purchase_thirteen)
    db.session.add(purchase_fourteen)
    db.session.add(purchase_fifteen)
    db.session.add(purchase_sixteen)
    db.session.add(purchase_seventeen)
    db.session.add(purchase_eighteen)
    db.session.add(purchase_nineteen)
    db.session.add(purchase_twenty)
    db.session.add(purchase_twenty_one)
    db.session.add(purchase_twenty_two)
    db.session.add(purchase_twenty_three)
    db.session.add(purchase_twenty_four)
    db.session.add(purchase_twenty_five)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_purchases():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()