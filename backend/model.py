from flask import Flask, abort, jsonify, request, render_template
import joblib
from app import webscraping
import json

pipeline = joblib.load('./pipeline.sav')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# FIXME: fix all the methods
@app.route('/api',methods=['POST'])
def get_delay():

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
    dic = {0:'real',1:'fake'}
    # mResult = pred[0]
    mResult = pred
    mAccuracy = pipeline.predict(query)
    if (pred[0] == 1):
        mPerc = 0
    elif (pred == 0):
        if(len(mAccuracy) % 2 == 0):
            mPerc = 2
        else:
            mPerc = 1
    if(mPerc == 0):
        mString = "< 50%"
    elif(mPerc == 1):
        mString = "60% - 75%"
    elif(mPerc == 2):
        mString = "> 80%"
    return f'<html><body><h1>{dic[pred[0]]} {mString}</h1> <form action="/"> <button type="submit">back </button> </form></body></html>'


if __name__ == '__main__':
    app.run(port=8080, debug=True)
