from flask import request, json, jsonify, Blueprint

from ..services import reportService
from ..error.responses import sendError

report_blueprint = Blueprint('report_blueprint', __name__, url_prefix="/reports")

@report_blueprint.route("/", methods=["GET"])
def getAllReports():
    try:
        return
        ## reports = reportService.getAllReports()
        ## return { "reports": reports, "error": None }
    except:
        return sendError(500, "An error occurred while retrieving reports")
@report_blueprint.route("/", methods=["POST"])
def postReport():
    try:
        report = request.get_json()
        if not report:
            return sendError(400, "No request body provided")
        new_report = reportService.postReport(report)
        return { "report": new_report, "error": None, }
    except:
        return sendError(500, "Error creating new report")

@report_blueprint.route("/<report_id>", methods=["GET"])
def getReport(report_id):
    try:
        report = reportService.getReportById(report_id)
        if not report:
            return sendError(404, "Report not found in database")
        return { "report": report, "error": None }
    except:
        return sendError(500, "An error occurred while retrieving report")
