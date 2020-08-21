import joblib
from app import webscraping

#pipeline = joblib.load('..model.pipeline.sav')
#pipeline = joblib.load('/backend/app/model/pipeline.sav')
pipeline = joblib.load('../backend/app/model/pipeline.sav')

def get_results(url):
    # define dictionary for possible values pipeline returns
    dic = {0:'real',1:'fake'}

    # clean and classify the article text
    text = webscraping.get_text(url)
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
        if(len(mAccuracy) % 2 == 0):        # this makes no sense at all :^)
            mPerc = 2
        else:
            mPerc = 1
    
    # Calculate the range.. somehow? TODO: wtf is this KEKW
    if(mPerc == 0):
        mString = "< 50%"
    elif(mPerc == 1):
        mString = "60% - 75%"
    elif(mPerc == 2):
        mString = "> 80%"

    return { 'result': dic[pred[0]], 'range': mString}
