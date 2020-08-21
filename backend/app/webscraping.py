from newspaper import Article
import string
import nltk
#nltk.download('punkt')
#nltk.download('stopwords')
#nltk.download('wordnet')
import os
import sys
import re
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


# for getting the article
def get_text(url):
    news_article = Article(url, language = "en")
    news_article.download()
    news_article.parse()
    news_article.nlp()

    headline = news_article.title
    text = news_article.text

    result = headline + text
    # if you want to  return a list
    return result

# to clean the text
def clean_data(article):
    lemmatizer = WordNetLemmatizer()
    article = article.replace('\n', ' ')
    #article = article.replace('\n\n', ' ')
    cleaned_text = ''
    article = article.lower()
    article = re.sub(r'[^\w\s]','', article)
    tokenized = word_tokenize(article)
    stop_removed = [word for word in tokenized if not word in stopwords.words('english')]
    
    for word in stop_removed:
        cleaned_text = cleaned_text + ' ' + str(lemmatizer.lemmatize(word))#.lower()
    
    return cleaned_text

#F
#print("STONKS")
#print(clean_data("the cow jumped over the moon"))
#sendHelp = get_text("https://amp.cnn.com/cnn/2020/08/17/us/coronavirus-college-university/index.html")
#print(clean_data(sendHelp[1]))
# for future reference to call
#clean_text = clean_data(text)
#clean_headline = clean_data(headline)
