from ..database.models.reports import Report

def getAllReports():
    return

def postReport(report):

    reports = Report.query([
            ('user_id', report['user_id']),
        ]
    ).get()

    if len(reports) == 0:
        new_report = Report.make(
                user_id=report['user_id'],
                url=report['url'],
                tag=report['tag'],
                comment=report['comment']
        )
    return

def getReport():
    return
