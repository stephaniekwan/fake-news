from flask import Flask, abort, jsonify, request, render_template
import joblib
from app import webscraping
import json
import os
import zipfile

#zip pipeline and unzip pipeline
with zipfile.ZipFile("pipeline_1.3.zip", "r") as zip_ref:
    zip_ref.extractall("./backend/app/model")

pipeline = joblib.load('./pipeline_1.3.sav')

#app = Flask(__name__)

#@app.route('/')
def home():
    return render_template('index.html')

# FIXME: fix all the methods
#@app.route('/api',methods=['POST'])
def get_delay(url):

    """
    result=request.form
    query_title = result['title']
    query_author = result['author']
    query_text = result['maintext']
    print(query_text)
    query = get_all_query(query_title, query_author, query_text)
    user_input = {'query':query}
    """
    text = get_text(url)
    clean_text = clean_data(text)
    pred = pipeline.predict(clean_text)
    print(pred)
    dic = {1:'real',0:'fake'}
    mResult = pred[0]
    # mResult = pred
    mAccuracy = pipeline.predict(clean_text)
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
    return { 'result': dic[pred[0]], 'range': mString}

#if __name__ == '__main__':
#    app.run(port=8080, debug=True)
