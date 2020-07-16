from ..database.models.reports import Report
import firestore_model
from firebase_admin import firestore
from ..database import db

reports_ref = db.collection('reports')

def getAllReports():
    '''
    Gets all reports from the database
    @return all Report instances
    '''
    reports = [doc.to_dict() for doc in reports_ref.stream()]
    return reports


def postReport(report):
    '''
    Adds a new report to the database if it doesn't already exist
    @param report -- the report to be added
    '''

    # possible change/update - steph
    # reports = getReport(report['report_id'])
    #reports = getReport(report.report_id)

    # if len(reports) == 0:
    #     new_report = Report.make(
    #             report_id=report['report_id'],
    #             url=report['url'],
    #             tag=report['tag'],
    #             comment=report['comment']
    #             save=True
    #     )
    # return

    # This works without model (Dennis)
    # Question: do we need to use model or not?
    # (To Do): set a proper way to insert the report
    reports_ref.document('9').set(report)
    return

    '''Original Code
    reports = Report.query([
            ('user_id', report['user_id']),
        ]
    ).get()
    reports = getReport(report['user_id'])

    if len(reports) == 0:
        new_report = Report.make(
                user_id=report['user_id'],
                url=report['url'],
                tag=report['tag'],
                comment=report['comment']
                save=True
        )
    return
    '''

def getReport(report_id):
    '''
    Finds the single report that matches the report_id
    @param report_id -- the reportID to search for
    '''
    report = Report.query([
        ('report_id', report_id)
      ]
    ).get()

    return report
