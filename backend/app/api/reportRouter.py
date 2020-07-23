from flask import request, json, jsonify, Blueprint
import logging

from ..services import reportService
from ..error.responses import sendError

report_blueprint = Blueprint('report_blueprint', __name__, url_prefix="/reports")

# configure logging so that info messages will also be logged
logging.basicConfig(level=logging.INFO)

@report_blueprint.route("/", methods=["GET"])
def get_all_reports():
    try:
        print("Getting all reports...")
        reports = reportService.get_all_reports()

        # Empty report database
        if not reports or len(reports) == 0:
            logging.error("No reports found in database")
            return sendError(404, "No reports found in database")

        logging.info("All Reports successfully retrieved")
        return { "reports": reports, "error": None }
    except:
        logging.error("An error occurred while retrieving reports")
        return sendError(500, "An error occurred while retrieving reports")

@report_blueprint.route("/", methods=["POST"])
def add_report():

    try:
        print("Creating report...")
        report = request.get_json()
        print("report: \n", json.dumps(report))
        # no request provided
        if not report:
            logging.error("No request body provided")
            return sendError(400, "No request body provided")

        new_report = reportService.add_report(report)
        # handle duplicate reports
        if new_report == "Report already exists in database":
            logging.error("Report already exists in database")
            return sendError(400, "Duplicate report")

        # article with same url must exist
        if new_report == "Article with corresponding url does not exist":
            logging.error("Article with corresponding url does not exist")
            return sendError(400, "Article with corresponding url does not exist")

        # create the new report if no errors
        logging.info("Report created successfully")
        return { "report": new_report, "error": None, }
    except:
        logging.error("Error creating new report")
        return sendError(500, "Error creating new report")

@report_blueprint.route("/<user_id>/user", methods=["GET"])
def get_report_by_user_id(user_id):
    try:
        print("Getting single report...")
        report = reportService.get_report_by_user_id(user_id)

        # Report not in database
        if report == 'No such document':
            logging.error("Report not found in database")
            return sendError(404, "Report not found in database")

        logging.info("Report found")
        return { "report": report, "error": None }
    except:
        logging.error("An error occurred while retrieving report")
        return sendError(500, "An error occurred while retrieving report")

@report_blueprint.route("/<report_id>/report", methods=["GET"])
def get_report_by_report_id(report_id):
    try:
        print("Getting single report...")
        report = reportService.get_report_by_report_id(report_id)

        # Report not in database
        if report == 'No such document':
            logging.error("Report not found in database")
            return sendError(404, "Report not found in database")

        logging.info("Report found")
        return { "report": report, "error": None }
    except:
        logging.error("An error occurred while retrieving report")
        return sendError(500, "An error occurred while retrieving report")
