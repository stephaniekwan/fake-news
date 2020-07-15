# Python wrapper for Firebase
#import pyrebase
#from flask_api import FlaskAPI

# imports to use firebase and cloud firestore
import firebase_admin
from firebase_admin import credentials, firestore


# set up connection to cloud firestore DB in cloud
# cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred, {
#     'projectId': 'sdsc-fake-news',
# })

cred = credentials.Certificate("./firebase-private-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

'''
# init firebase connection to database using pyrebase
config = {
    apiKey: "AIzaSyDXQDNAFdn5Qj_qHf3uJfiaAYy17bPquGw",
    authDomain: "sdsc-fake-news.firebaseapp.com",
    databaseURL: "https://sdsc-fake-news.firebaseio.com",
    projectId: "sdsc-fake-news",
    storageBucket: "sdsc-fake-news.appspot.com",
    messagingSenderId: "948422758469",
    appId: "1:948422758469:web:67bb4ec77cde4ce524532c",
    measurementId: "G-XZ1C5TYLDF"
}
firebase = pyrebase.initialize_app(config)

# create variable to access firebase DB
db = firebase.database()
'''
