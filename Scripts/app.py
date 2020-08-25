from flask import Flask, abort, jsonify, request, render_template
import joblib
from feature import *
import json

pipeline = joblib.load('./pipeline.sav')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api',methods=['POST'])
def get_delay():

    result = request.form
    query_title = result['title']
    query_author = result['author']
    query_text = result['maintext']
    print(query_text)
    query = get_all_query(query_title, query_author, query_text)
    user_input = {'query':query}
    pred = pipeline.predict(query)
    print(pred)
    dic = {0:'real',1:'fake'}
    mResult = pred[0]
    mAccuracy = pipeline.predict(query)
    mLen = len(mAccuracy)
    if(mLen != 0):
        if (mResult == 1):
            mPerc = 0
        elif (mResult == 0):
            if(mAccuracy[0] == 'T'):
                mPerc = 1
            else:
                mPerc = 2
        if(mPerc == 0):
            mString = "< 50%"
        elif(mPerc == 1):
            mString = "60% - 75%"
        elif(mPerc == 2):
            mString = "> 80%"
    return f'<html><body><h1>{dic[pred[0]]}</h1><h1>{mString}</h1> <form action="/"> <button type="submit">back </button> </form></body></html>'


if __name__ == '__main__':
    app.run(port=8080, debug=True)
