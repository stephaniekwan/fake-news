from flask import request, json, jsonify, Blueprint
import logging
from datetime import datetime, timezone, timedelta

from app import webscraping
from ..services import modelService, articleService
from ..error.responses import sendError

model_blueprint = Blueprint('model_blueprint', __name__, url_prefix="/model")

logging.basicConfig(level=logging.INFO)

@model_blueprint.route("/", methods=["GET"])
def get_results():
    #try:
    reanalyze = request.args.get('reanalyze')
    url = request.args.get('url')
    domain = request.args.get('domain')
    if not reanalyze:                           #TESTED
        logging.error("Reanalyze param not provided")
        return sendError(404, "Reanalyze param not provided")
    if not url:                           #TESTED
        logging.error("No URL provided")
        return sendError(404, "No URL provided")
    if not domain:                           #TESTED
        logging.error("No domain provided.")
        return sendError(404, "No domain provided.")

    # make sure there's no leading or trailing whitespace
    url = url.strip()
    domain = domain.strip()
    if isinstance(reanalyze, str):
        reanalyze = reanalyze.strip()

    if reanalyze.lower() == 'true' or reanalyze == True:
        logging.info("Params received, getting results from model...")
        results = modelService.get_results(url)
        if not results:
            logging.error("No result outputted.")
            return sendError(404, "No result outputted.")
        
        article = modelService.update_db_entry(url, results)
        if article == 'No such article':
            logging.error("Article was not found, could not update")
            return sendError(400, "Article was not found, could not update")

        return {"article": article, 
                "last_analyzed": [0, 0, 0, 0],  # days, hrs, min, sec
                "pulled_from_db": False,
                "error": None}

    else: # reanalyze = FALSE
        existing = articleService.get_article(url)

        # article found in db, returning it
        if existing != 'No such article':
            logging.info("Existing article found in db")
            
            # calculate difference in datetime
            prev = existing['timestamp']
            if isinstance(type(prev), str):
                # some articles in db have invalid datetime values
                logging.info("Invalid datetime")
                return sendError(400, "Invalid datetime, consider reanalyzing it")

            prev = datetime.fromisoformat(str(prev))
            curr = datetime.now(timezone.utc)
            diff = curr - prev
            hours, secs = divmod(diff.seconds, 3600)  # returns tuple: (hours, seconds)
            mins, secs = divmod(secs, 60)             # returns tuple: (mins, seconds)

            last_analyzed = [diff.days, hours, mins, secs]

            logging.info("Article found in database, returning results")
            return { "article": existing, 
                     "last_analyzed": last_analyzed, 
                     "pulled_from_db": True,
                     "error": None}

        else:
            # article not found in db, need to add an article
            logging.info("No article found in db, getting your results...")
            results = modelService.get_results(url)
            if not results:
                logging.error("No result outputted.")
                return sendError(404, "No result outputted.")
        
            article = modelService.add_db_entry(url, domain, results)

            if article == "Article already exists in database!":
                logging.error("Article already exists")
                return sendError(400, "Article already exists")

            logging.info("Article successfully added to db")
            return {"article": article, 
                    "last_analyzed": [0, 0, 0, 0],  # days, hrs, min, sec
                    "pulled_from_db": False,
                    "error": None}

        # else (FALSE)
            # need domain and url field
            #try getting article
            #if article exists, return it, along with how long ago it was analyzed?
            #else, predict on url, then add to db

    #except:
    #    logging.error("An error has occurred while predicting an article.")
    #    return sendError(500, "An error has occurred while predicting an article.")

