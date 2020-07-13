from ..database.models.analyzed_articles import Analyzed_Article
import firestore_model

'''
Gets all articles from the database
@return all Analyzed_Article instances 
'''
def get_all_articles():
    articles = Analyzed_Article.query().get()

'''
Adds a new article to the database if it doesn't already exist
@param article -- the article to be added
'''
def add_article(article):
    
    existing = get_article(article)

    # if article doesn't already exist
    if len(existing) == 0:
        new_article = Analyzed_Article.make(
            url = article['url']
            domain = article['domain']
            title = article['title']
            rating = article['rating']
            risk_level = article['risk_level']
            timestamp = article['timestamp']
            reports = []
            save=True
        )
        return new_article

    else:
        return existing

'''
Gets a particular article from the database
@param article -- the article to query for
@return an Analyzed_Article instance if the article is in db, else None(?)
'''
def get_article(article):
    return Analyzed_Article.query(article['url']).get()