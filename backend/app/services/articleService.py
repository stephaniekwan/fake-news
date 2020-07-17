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

    articles = [doc.to_dict() for doc in articles_ref.stream()]
    return articles

def add_article(article):
    #articles_ref.document('1').set(article)
    # TODO: (steph) add conditional so that we dont add an article twice
        # probably use get_article when its done
    existing = get_article(article['url'])
    #print("existing: ", type(existing)) || dict
    #print("article: ", type(article))   || dict

    # if it already exists, keep the old entry
    if existing != None:
        return "Article already exists in database!"


    articles_ref.add(article)

    # Dennis(To do): when the article already exists in db, it should not return the actual article
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
        print(u'No such document!')
        return None

    # Get the data in the document by accessing it using its reference
    doc = doc_ref.reference.get()

    print(f'Document data: {doc.to_dict()}')

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
