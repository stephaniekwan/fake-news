import firestore_model
from firebase_admin import firestore
from ..database import db

articles_ref =  db.collection('articles')

'''
Gets all articles from the database
@return all Analyzed_Article instances
'''
def get_all_articles():
    articles = [doc.to_dict() for doc in articles_ref.stream()]
    return articles

'''
Add an article to the database if it doesn't already exist.
If it already exists, do not overwrite (keep old data)
@return info that the article already exists; else return the article
'''
def add_article(article):
    existing = get_article(article['url'])

    # if it already exists, keep the old entry
    if existing != 'No such article':
        return "Article already exists in database!"

    articles_ref.add(article)

    return article

'''
Gets a particular article from the database
@param article -- the article to query for
@return an Analyzed_Article instance if the article is in db, else error
'''
def get_article(article_url):

    # Get a single article from database that matches the article_url
    doc_ref_gen = articles_ref.where(u'url', u'==', article_url).limit(1).stream()
    #print("before", type(doc_ref_gen))

    #Get the document snapshot of the doc_ref_gen generator
    doc_ref = next(doc_ref_gen, None)
    #print("after", type(doc_ref))
    #print(type(doc_ref.reference))

    # document referenced does not exist
    if not doc_ref:
        return 'No such article'

    # Get the data in the document by accessing it using its reference
    doc = doc_ref.reference.get()

    #print(f'Document data: {doc.to_dict()}')

    return doc.to_dict()

'''
For when user wants to reanalyze an article, thus giving it a
new rating, risk_level, and timestamp
@param article_url -- the url to query for
@param risk_level -- the new risk level of the article (int)
@param rating -- the new rating of the article (range of percentages)
@param timestamp -- the time of the new analysis
@return updated Analyzed_Article instance in dictionary form
'''
def update_article(article_url, rating, risk_level, timestamp):
    #TODO: QUESTION-do we want to clear all reports for the article?
    
    existing = get_article(article_url)
    print(existing)

    if(existing == 'No such article'):
        return 'No such article'

    # Get a single article from database that matches the article_url
    doc_ref_gen = articles_ref.where(u'url', u'==', article_url).limit(1).stream()

    #Get the document reference from the iterator
    doc_ref = next(doc_ref_gen, None)
    doc_ref = doc_ref.reference

    doc_ref.update({
        'risk_level' : risk_level,
        'rating' : rating,
        'timestamp' : timestamp
    })

    doc = doc_ref.get()

    return doc.to_dict()
