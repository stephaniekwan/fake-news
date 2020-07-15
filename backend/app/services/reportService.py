from config import db
from ..database.models.reports import Report
import firestore_model
from firebase_admin import firestore

def getAllReports():
    '''
    Gets all reports from the database
    @return all Report instances
    '''
    return db.collection_group('report')

def postReport(report):
    '''
    Adds a new report to the database if it doesn't already exist
    @param report -- the report to be added
    '''

    # possible change/update - steph
    reports = getReport(report['report_id'])
    #reports = getReport(report.report_id)

    if len(reports) == 0:
        new_report = Report.make(
                report_id=report['report_id'],
                url=report['url'],
                tag=report['tag'],
                comment=report['comment']
                save=True
        )
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
