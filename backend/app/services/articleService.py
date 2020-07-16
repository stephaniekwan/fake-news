# from flask import make_response
from ..database.models.analyzed_articles import Analyzed_Article
import firestore_model
from firebase_admin import firestore
from ..database import db

articles_ref =  db.collection('articles')

def get_all_articles():
    '''
    Gets all articles from the database
    @return all Analyzed_Article instances
    '''
    #return articles_ref.list_documents()
    #return db.collection_group('articles')
    # doc_ref = articles_ref.document('1')

    doc = doc_ref.get()
    if doc.exists:
        print(f'Document data: {doc.to_dict()}')
    else:
        print(u'No such document!')
        return None

    articles = [doc.to_dict() for doc in articles_ref.stream()]
    return articles

def add_article(article):
    '''
    Adds a new article to the database if it doesn't already exist
    @param article -- the article to be added

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
    '''
    articles_ref.document('1').set(article)
    return article

def get_article(article_url):

    '''
    Gets a particular article from the database
    @param article -- the article to query for
    @return an Analyzed_Article instance if the article is in db, else error
    '''
    doc_ref = articles_ref.document('1')
    doc = doc_ref.get()

    if doc.exists:
        print(f'Document data: {doc.to_dict()}')
    else:
        print(u'No such document!')

    return doc.to_dict()

def update_article(article_url):
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
