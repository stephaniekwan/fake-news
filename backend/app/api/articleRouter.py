from flask import request, json, jsonify, Blueprint

from ..services import articleService
from ..error.responses import sendError

article_blueprint = Blueprint('article_blueprint', __name__,
                              url_prefix='/articles')

@article_blueprint.route('/', methods=['GET'])
def get_all_articles():
    try:
        articles = articleService.get_all_articles()
        if not articles:
            return sendError(404, "No articles found in database")
        return { "articles": articles, "error": None}
    except:
        return sendError(500, "An error occurred while retrieving all articles")


@article_blueprint.route('/', methods=['POST'])
def add_article():
    try:
        article = request.get_json()
        if not article:
            return sendError(400, "No request body provided")
        new_article = articleService.add_article(article)
        return { "article": new_article, "error": None }
    except:
        return sendError(500, "Error adding an article to database")


@article_blueprint.route('/<article_url>', methods=['GET'])
def get_article(article_url):
    try:
        article = articleService.get_article(article_url)
        if not article:
            return sendError(404, "Article not found in database")
        return { "article": article, "error": None }
    except:
        return sendError(500, "An error occurred while retrieving article")

# Dennis (To do): propery implement this
# Temporary comment this to fix syntax error.
# @article_blueprint.route('/<article_url>', methods=['POST'])
# def update_article(article):
#     # try:
#     # except:
