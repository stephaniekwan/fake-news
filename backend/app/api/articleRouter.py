from flask import request, json, jsonify, Blueprint
import logging

from ..services import articleService
from ..error.responses import sendError

article_blueprint = Blueprint('article_blueprint', __name__,
                              url_prefix='/articles')

# configure logging so that info messages will also be logged
logging.basicConfig(level=logging.INFO)

@article_blueprint.route('/', methods=['GET'])
def get_all_articles():
    try:
        logging.info("Getting all articles...")
        articles = articleService.get_all_articles()
        if not articles or len(articles) == 0:
            logging.error("No articles found in database")
            return sendError(404, "No articles found in database")
        logging.info("All articles successfully retrieved")
        return { "articles": articles, "error": None}
    except:
        logging.error("Error retrieving all articles")
        return sendError(500, "Error retrieving all articles")


@article_blueprint.route('/', methods=['POST'])
def add_article():
    try:
        logging.info("Adding article...")
        article = request.get_json()
        # No request provided
        if not article:
            logging.error("No request body provided")
            return sendError(400, "No request body provided")

        new_article = articleService.add_article(article)
        # Existing article found
        if new_article == "Article already exists in database!":
            logging.info("Article already exists in database!")
            #return { "article": get_article(article['url']), "error": None }
            # return get_article(article['url'])
            return sendError(400, "Duplicate article")

        # Create the new article if no other errors
        logging.info("Article successfully added")
        return { "article": new_article, "error": None }
    except:
        logging.error("Error adding an article to database")
        return sendError(500, "Error adding an article to database")


@article_blueprint.route('/article', methods=['GET'])
def get_article():
    try:
        article_url = request.args.get('url')
        if not article_url:
            logging.error("No url provided")
            return sendError(400, "No url provided as param")

        logging.info("Getting a single article...")
        article = articleService.get_article(article_url)
        if article == 'No such article':
            logging.error("Article not found in database")
            return sendError(404, "Article not found in database")
        return { "article": article, "error": None }
    except:
        logging.error("Error retrieving article")
        return sendError(500, "Error retrieving article")


@article_blueprint.route("/article", methods=["POST"])
def update_article():
    try: 
        req = request.get_json()
        if not req:
            logging.error("No request body provided")
            return sendError(400, "No request body provided")

        article_url = req['url']
        rating = req['rating']
        risk_level = req['risk_level']
        timestamp = req['timestamp']

        logging.info("Received request fields, updating article...")
        article = articleService.update_article(article_url, rating, 
                                                risk_level, timestamp)
        if article == "No such article":
            logging.error("Article not found in database")
            return sendError(404, "Article not found in database")
        
        logging.info("Article successfully updated")
        return { "article": article, "error": None }
    except:
        logging.error("Error updating article")
        return sendError(500, "Error updating article")

@article_blueprint.route("/domain", methods=["GET"])
def check_domain():
    try:
        domain = request.args.get("domain")
        if not domain:
            logging.error("No domain was provided")
            return sendError(400, "No domain was provided")

        logging.info("Request for checking domain received, querying db...")
        risk = articleService.check_domain(domain)

        if risk == "Domain not found":
            logging.error("Domain not found in db")
            return sendError(404, "Domain not found in db")

        # valid outputs
        if risk == "risky" or risk == "safe":
            logging.info("Domain has been checked, returning results")
            return { "risk": risk, "error": None }

    except:
        logging.error("Error checking the domain")
        return sendError(500, "Error checking the domain")
