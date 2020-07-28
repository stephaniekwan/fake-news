from newspaper import Article
import string
import nltk
import os
import sys
import re
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

#test url
url = "https://ktla.com/news/local-news/3-food-suppliers-in-l-a-county-ordered-to-close-after-significant-coronavirus-outbreaks/amp/"

#parsing url in English
news_article = Article(url, language = "en")
news_article.download()
news_article.parse()
news_article.nlp()

#for testing purposes
#print(news_article.title)
#print(news_article.text)

#title and text of the article
title = news_article.title
text = news_article.text

#cleaning of data
lemmatizer = WordNetLemmatizer()
def clean_data(article):
    article = article.replace('\n', ' ')
    cleaned_text = ''
    article = article.lower()
    article = re.sub(r'[^\w\s]','', article)
    tokenized = word_tokenize(article)
    stop_removed = [word for word in tokenized if not word in stopwords.words('english')]
    
    for word in stop_removed:
        cleaned_text = cleaned_text + ' ' + str(lemmatizer.lemmatize(word))#.lower()
    return cleaned_text

clean_text = clean_data(text)
clean_title = clean_data(title)

#for debugging purposes (see jupyter notebook for the print)
#print(clean_title)
#print('\n')
#print(clean_text)