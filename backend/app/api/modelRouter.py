from flask import request, json, jsonify, Blueprint
from app import webscraping

import logging

from ..services import modelService, articleService
from ..error.responses import sendError

model_blueprint = Blueprint('model_blueprint', __name__, url_prefix="/model")

logging.basicConfig(level=logging.INFO)

@model_blueprint.route("/", methods=["GET"])
def get_results():
    try:
        reanalyze = request.args.get('reanalyze')
        url = request.args.get('url')
        domain = request.args.get('domain')
        if not reanalyze:
            logging.error("Reanalyze param not provided")
            return sendError(404, "Reanalyze param not provided")
        if not url:
            logging.error("No URL provided")
            return sendError(404, "No URL provided")
        if not domain:
            logging.error("No domain provided.")
            return sendError(404, "No domain provided.")

        if reanalyze.lower() == 'true':
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
                    "error": None}

        else: # reanalyze = FALSE
            #TODO: (steph) test existing article more
            existing = articleService.get_article(url)

            # article found in db, returning it
            if existing != 'No such article':
                logging.info("Existing article found in db")
                
                # calculate difference in datetime
                #curr = datetime.datetime(2017, 6, 21, 18, 25, 30) #placeholders
                #prev = datetime.datetime(2017, 5, 16, 8, 21, 10)  #placeholders
                prev = existing['timestamp']
                #print(prev)
                #print(type(prev))
                #TODO: fix this type comparison (steph)
                if type(prev) != datetime.datetime:
                    # some articles in db have invalid datetime values
                    return "invalid datetime object"
                print(type(prev)) # should be datetime.datetime obj
                curr = datetime.datetime.now()
                diff = curr - prev
                hours, secs = divmod(diff.seconds, 3600)  # returns tuple: (hours, seconds)
                mins, secs = divmod(secs, 60)             # returns tuple: (mins, seconds)


                last_analyzed = [diff.days, hours, mins, secs]
                print("last analyzed: ", last_analyzed)

                return { "article": existing, "last_analyzed": last_analyzed, "error": None}

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
                        "error": None}

        # else (FALSE)
            # need domain and url field
            #try getting article
            #if article exists, return it, along with how long ago it was analyzed?
            #else, predict on url, then add to db

    except:
        logging.error("An error has occurred while predicting an article.")
        return sendError(500, "An error has occurred while predicting an article.")

