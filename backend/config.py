# Python wrapper for Firebase
import pyrebase

# init firebase connection to database using pyrebase
firebase = pyrebase.initialize_app (
    {
        apiKey: "AIzaSyDXQDNAFdn5Qj_qHf3uJfiaAYy17bPquGw",
        authDomain: "sdsc-fake-news.firebaseapp.com",
        databaseURL: "https://sdsc-fake-news.firebaseio.com",
        projectId: "sdsc-fake-news",
        storageBucket: "sdsc-fake-news.appspot.com",
        messagingSenderId: "948422758469",
        appId: "1:948422758469:web:67bb4ec77cde4ce524532c",
        measurementId: "G-XZ1C5TYLDF"
    }
)

# create variable to access firebase DB
db = firebase.database()