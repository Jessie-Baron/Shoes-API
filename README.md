# Shoes-API

simple Full-Stack, single-page application using Python, Flask with SQLAlchemy and more in the backend as well as JavaScript, React with Redux and CSS in the front end. Our database for shoes is imported from kaggle using the Kaggle API and cleansed using Pandas. Live link coming!

## Wiki

[Schema](https://github.com/Jessie-Baron/Shoes-API/wiki/Schema)

[Asana Board](https://github.com/Jessie-Baron/Shoes-API/wiki/Asana-Board)


## Getting started

Clone this repository (only this branch)

Install dependencies

    pipenv install -r requirements.txt
    
Create a .env file based on the example with proper settings for your development environment

Make sure the SQLite3 database connection URL is in the .env file

This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

Get into your pipenv, and run your Flask app

    pipenv shell
    flask run

To run the React App, checkout the README inside the react-app directory.
