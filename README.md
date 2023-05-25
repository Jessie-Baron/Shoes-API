# Shoes-API

simple Full-Stack, single-page application using Python, Flask with SQLAlchemy and more in the backend as well as JavaScript, React with Redux and CSS in the front end. Our database for shoes is imported from kaggle using the Kaggle API and cleansed using Pandas. Live link coming!

## Asana Board

Our team used a Kanban board from Asana to manage and delegate tasks.

![Screen Shot 2023-05-25 at 10 39 47 AM](https://github.com/Jessie-Baron/Shoes-API/assets/101578812/67cb04b5-b2af-4c28-9ba5-a84877cc5bff)



## Schema

![drawSQL-shoes-export-2023-05-25](https://github.com/Jessie-Baron/Shoes-API/assets/101578812/d054beda-0aec-4b3b-a21a-00667d724895)


## Getting started

Clone this repository (only this branch)

Install dependencies

    pipenv install -r requirements.txt
    
Create a .env file based on the example with proper settings for your development environment

Make sure the SQLite3 database connection URL is in the .env file

This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

Get into your pipenv, migrate your database, seed your database, and run your Flask app

    pipenv shell
    flask db upgrade
    flask seed all
    flask run

To run the React App, checkout the README inside the react-app directory.
