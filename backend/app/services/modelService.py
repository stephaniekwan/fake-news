import joblib
import datetime

from app import webscraping
from .articleService import add_article, update_article

#pipeline = joblib.load('..model.pipeline.sav')
#pipeline = joblib.load('/backend/app/model/pipeline.sav')
pipeline = joblib.load('../backend/app/model/pipeline.sav')

def get_results(url):
    # define dictionary for possible values pipeline returns
    dic = {0:'real',1:'fake'}

    # clean and classify the article text
    text = webscraping.get_text(url)
    #print("GET TEXT: ", text, "\n")
    headline = text[0]
    clean_text = webscraping.clean_data(text)
    #print("CLEAN TEXT: ", clean_text, "\n")

    #text_array[0] = clean_text
    
    pred = pipeline.predict([clean_text]) # outputs 0 or 1
    mResult = pred[0]

    # calculating percentage to assign to a range
    mAccuracy = pipeline.predict([clean_text])
    if (pred[0] == 1):
        mPerc = 0
    elif (pred[0] == 0):
        if(len(mAccuracy) % 2 == 0):        #  :^)
            mPerc = 2
        else:
            mPerc = 1
    
    # Calculate the range.. somehow? TODO: send help KEKW
    if(mPerc == 0):
        mString = "< 50%"
    elif(mPerc == 1):
        mString = "60% - 75%"
    elif(mPerc == 2):
        mString = "> 80%"

    return { 'headline': headline, 'result': dic[pred[0]], 'range': mString}


def add_db_entry(url, domain, results):
    title = results['headline']
    range = results['range']
    risk_level = get_risk_level(range)
    timestamp = datetime.datetime.now()

    article = add_article({
        "url": url,
        "domain": domain,
        "title": title,
        "range": range,
        "risk_level": risk_level,
        "timestamp": timestamp,
        "reports": []
    })

    return article


def update_db_entry(url, results):
    range = results['range']
    risk_level = get_risk_level(range)
    timestamp = datetime.datetime.now()

    # how to get a formatted string version of the datetime object
    print(timestamp.strftime('%c'))

    article = update_article(url, range, risk_level, timestamp)
    return article


def get_risk_level(range):
    if range == "> 80%":
        return 0
    elif range == "60% - 75%":
        return 1
    elif range == "< 50%":
        return 2

#print(get_results("https://www.cnn.com/2020/08/24/politics/vance-trump-taxes-subpoena/index.html"))