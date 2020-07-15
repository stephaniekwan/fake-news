# from flask import make_response
from config import db
from ..database.models.analyzed_articles import Analyzed_Article
import firestore_model
from firebase_admin import firestore

def get_all_articles():
    '''
    Gets all articles from the database
    @return all Analyzed_Article instances
    '''
    #return Analyzed_Article.query().get()
    return db.collection_group('analyzed_article')

def add_article(article):
    '''
    Adds a new article to the database if it doesn't already exist
    @param article -- the article to be added
    '''
    existing = get_article(article['url'])

    # if article doesn't already exist
    if len(existing) == 0:
        new_article = Analyzed_Article.make(
            url = article['url'],
            domain = article['domain'],
            title = article['title'],
            rating = article['rating'],
            risk_level = article['risk_level'],
            timestamp = article['timestamp'],
            reports = [],
            save=True
        )
        #return new_article

    return
    #return existing

def get_article(article_url):
    '''
    Gets a particular article from the database
    @param article -- the article to query for
    @return an Analyzed_Article instance if the article is in db, else error
    '''
    query = Analyzed_Article.query([
        ('url', article_url)
      ]
    ).get()
    return query

def update_article(article_url, ):
    '''TODO: QUESTION-do we want to clear all reports for the article?
    TODO: QUESTION-should we just update the risk_level?
    For when user wants to reanalyze an article, thus giving it a
    new rating, risk_level, timestamp, and refreshing reports
    '''
    existing = get_article(article_url)

    # if article already exists, delete it
    if len(existing) != 0:
        existing.set({ 'risk_level': article['risk_level'] })
        #existing.set({ 'risk_level': article.risk_level })

    # make a new article
    else:
        add_article(article)
    
    return