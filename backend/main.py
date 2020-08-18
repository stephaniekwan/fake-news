from flask_script import Manager
from livereload import Server

# for the model
from flask import Flask, abort, jsonify, request, render_template
import joblib
from app import webscraping
import json

from app import create_app
import os

# Create development app
# To Do (Opt to change dev environments in .env file)
application = create_app()
manager = Manager(application)

@manager.command
def run():
    application.run(host='0.0.0.0')
    # Works for local host and server
    # Server IP: IP = 132.249.238.69; local host: 127.0.0.1
    # app.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    # Dennis(To do): Investigate sometimes, livereload does not work
    server = Server(manager.run())
    server.serve()


"""
pipeline = joblib.load('./pipeline.sav')

# after getting the cleaned text from the article 
# see functions in webscraping.py
pred_headline = pipeline.predict(headline)
pred_text = pipeline.predict(text)

# feel like this is more tailored to testing using the dataset
dic = {0:'real', 1:'fake'}




"""


