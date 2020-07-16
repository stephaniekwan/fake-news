from flask import request, json, jsonify, Blueprint
import logging

from ..services import reportService
from ..error.responses import sendError

report_blueprint = Blueprint('report_blueprint', __name__, url_prefix="/reports")

# configure logging so that info messages will also be logged
logging.basicConfig(level=logging.INFO)

@report_blueprint.route("/", methods=["GET"])
def getAllReports():
    try:
        print("Getting all reports...")
        return
        ## reports = reportService.getAllReports()
        ## return { "reports": reports, "error": None }
    except:
        logging.error("An error occurred while retrieving reports")
        return sendError(500, "An error occurred while retrieving reports")

@report_blueprint.route("/", methods=["POST"])
def postReport():
    try:
        print("Creating report...")
        report = request.get_json()
        print("report: \n", json.dumps(report))
        if not report:
            logging.error("No request body provided")
            return sendError(400, "No request body provided")
        new_report = reportService.postReport(report)
        #print("Report created successfully")
        logging.info("Report created successfully")
        return { "report": new_report, "error": None, }
    except:
        logging.error("Error creating new report")
        return sendError(500, "Error creating new report")

@report_blueprint.route("/<report_id>", methods=["GET"])
def getReport(report_id):
    try:
        print("Getting single report...")
        report = reportService.getReportById(report_id)
        if not report:
            logging.error("Report not found in database")
            return sendError(404, "Report not found in database")
        logging.info("Report found")
        return { "report": report, "error": None }
    except:
        logging.error("An error occurred while retrieving report")
        return sendError(500, "An error occurred while retrieving report")
