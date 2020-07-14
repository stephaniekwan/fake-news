# from flask import make_response
from ..database.models.analyzed_articles import Analyzed_Article
import firestore_model

def get_all_articles():
    '''
    Gets all articles from the database
    @return all Analyzed_Article instances
    '''
    return Analyzed_Article.query().get()

def add_article(article):
    '''
    Adds a new article to the database if it doesn't already exist
    @param article -- the article to be added
    '''
    existing = get_article(article)

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
        return new_article

    return existing

def get_article(article_url):
    '''
    Gets a particular article from the database
    @param article -- the article to query for
    @return an Analyzed_Article instance if the article is in db, else error
    '''
    return Analyzed_Article.query(article_url).get()

def update_article(article):
    '''TODO
    For when user wants to reanalyze an article, thus giving it a
    new rating, risk_level, timestamp, and refreshing reports?
    Can also combine this with add_article by adding a param 'overwrite'
    '''
    return
