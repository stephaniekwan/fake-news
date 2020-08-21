from flask import request, json, jsonify, Blueprint
from app import webscraping

import logging

from ..services import modelService
from ..error.responses import sendError

model_blueprint = Blueprint('model_blueprint', __name__, url_prefix="/model")

logging.basicConfig(level=logging.INFO)

@model_blueprint.route("/", methods=["GET"])
def get_results():
    '''
    logging.info("Getting results from model...")
    url = request.args.get('url')
    results = modelService.get_results(url)
    print(results)

    if results is None:
        logging.error("No result outputted.")
        return sendError(404, "No result outputted.")

    logging.info("Result successfully outputted.")
    return { "results": results, "error": None }
    '''
    try:
        logging.info("Getting results from model...")
        url = request.args.get('url')
        print(url)
        results = modelService.get_results(url)
        print(results)

        if results is None:
            logging.error("No result outputted.")
            return sendError(404, "No result outputted.")

        logging.info("Result successfully outputted.")
        return { "results": results, "error": None }
    except:
        logging.error("An error has occurred while predicting an article. send help")
        return sendError(500, "An error has occurred while predicting an article.")


