import firestore_model
from firebase_admin import firestore
from ..database import db

articles_ref =  db.collection('articles')

def get_all_articles():
    '''
    Gets all articles from the database
    @return all Analyzed_Article instances
    '''
    articles = [doc.to_dict() for doc in articles_ref.stream()]
    return articles

def add_article(article):
    '''
    Add an article to the database if it doesn't already exist.
    If it already exists, do not overwrite (keep old data)
    @return info that the article already exists; else return the article
    '''
    existing = get_article(article['url'])

    # if it already exists, keep the old entry
    if existing != 'No such article':
        return "Article already exists in database!"


    articles_ref.add(article)

    return article

def get_article(article_url):

    '''
    Gets a particular article from the database
    @param article -- the article to query for
    @return an Analyzed_Article instance if the article is in db, else error
    '''

    # Get a single article from database that matches the article_url
    doc_ref_gen = articles_ref.where(u'url', u'==', article_url).limit(1).stream()
    #print("before", type(doc_ref))

    #Get the document snapshot of the doc_ref_gen generator
    doc_ref = next(doc_ref_gen, None)
    #print("after", type(doc_ref))

    # document referenced does not exist
    if not doc_ref:
        return 'No such article'

    # Get the data in the document by accessing it using its reference
    doc = doc_ref.reference.get()

    print(f'Document data: {doc.to_dict()}')

    return doc.to_dict()

def update_article(article_url, article):
    '''TODO: QUESTION-do we want to clear all reports for the article?
    TODO: QUESTION-should we just update the risk_level?
    For when user wants to reanalyze an article, thus giving it a
    new rating, risk_level, timestamp, and refreshing reports
    '''
    existing = get_article(article_url)

    # if article already exists, delete it
    # if len(existing) != 0 and article['risk_level']:
    # existing.set({ 'risk_level': article['risk_level'] })

    # To do (dennis): We need to update this method after figuring out fields that need to be updated.

    return existing