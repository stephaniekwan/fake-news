import string
import nlkt
from nltk.corpus import stopwords
# nltk.download('stopwords')
from nltk.tokenize import word_tokenize
# nltk.download('punkt')
from nltk.stem import PorterStemmer
import sklearn
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
import itertools
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from sklearn.linear_model import PassiveAggressiveClassifier
import os

print(os.listdir("../input"))
df = pd.read_csv('../input/data.csv')               #The data set going into the model

for i in range(0,df.shape[0]-1):
    if(df.Body.isnull()[i]):
        df.Body[i] = df.Headline[i]
        
y = df.Label
X = df.Body

# clean data for body
puncRemoveX = X.translate(str.maketrans('','', string.punctuation))
tokenizeX = word_tokenize(puncRemoveX)
stopX = [word for word in tokenizeX if not word in stopwords.words('english')]
onlyAlphaX = [word for word in stopX if word.isalpha()]
porterX = PorterStemmer()
X = [porterX.stem(word) for word in onlyAlphaX]

# clean data for headline
puncRemoveY = X.translate(str.maketrans('','', string.punctuation))
tokenizeY = word_tokenize(puncRemoveY)
stopY = [word for word in tokenizeY if not word in stopwords.words('english')]
onlyAlphaY = [word for word in stopY if word.isalpha()]
porterY = PorterStemmer()
y = [porterY.stem(word) for word in onlyAlphaY]


X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.2)

#Applying tfidf to the data set
tfidf_vect = TfidfVectorizer(stop_words = 'english')
tfidf_train = tfidf_vect.fit_transform(X_train)
tfidf_test = tfidf_vect.transform(X_test)
tfidf_df = pd.DataFrame(tfidf_train.A, columns=tfidf_vect.get_feature_names())

#Applying Naive Bayes
clf = MultinomialNB() 
clf.fit(tfidf_train, y_train)                       # Fit Naive Bayes classifier according to X, y
pred = clf.predict(tfidf_test)                      # Perform classification on an array of test vectors X.
score = metrics.accuracy_score(y_test, pred)
print("accuracy:   %0.3f" % score)
cm = metrics.confusion_matrix(y_test, pred)
print(cm)