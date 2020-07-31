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
        # print("article: \n", json.dumps(article))
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


@article_blueprint.route('/<article_url>', methods=['GET'])
def get_article(article_url):
    try:
        logging.info("Getting a single article...")
        article = articleService.get_article(article_url)
        if article == 'No such document':
            logging.error("Article not found in database")
            return sendError(404, "Article not found in database")
        return { "article": article, "error": None }
    except:
        logging.error("Error retrieving article")
        return sendError(500, "Error retrieving article")

# To do (dennis): We need to update this method after figuring out fields that need to be updated.
@article_blueprint.route("/<article_url>", methods=["POST"])
def update_article(article_url):
    try:
        logging.info("Getting request body...")
        article = request.get_json()

        if not article:
            logging.error("No request body provided")
            return sendError(400, "No request body provided")

        logging.info("Updating a single article...")
        article = articleService.update_article(article_url, article)

        if article == 'No such document':
            logging.error("Article not found in database")
            return sendError(404, "Article not found in database")

        return { "article": article, "error": None }
    except:
        logging.error("Error Updating article")
        return sendError(500, "Error Updating article")