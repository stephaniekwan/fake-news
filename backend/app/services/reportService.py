import firestore_model
from firebase_admin import firestore
from ..database import db
from .articleService import get_article, articles_ref

reports_ref = db.collection('reports')

def get_all_reports():
    '''
    Gets all reports from the database with their unique report id
    @return dictionary form of all Report instances with a new report_id field
    '''
    reports = []

    # for each report in the db
    for doc in reports_ref.stream():
        # get the report in dict form
        report = doc.to_dict()

        # get the unique report id
        doc_ref_gen = reports_ref.where(
            u'url', u'==', report['url']).where(
                u'tag', u'==', report['tag']).where(
                    u'comment', u'==', report['comment']).limit(1).stream()
        doc_ref = next(doc_ref_gen, None)
        report_ref = doc_ref.reference.id

        # add report id to the dictionary, add report to list
        report['report_id'] = report_ref
        reports.append(report)

    return reports


def add_report(report):
    '''
    Adds a new report to the database if it doesn't already exist
    @param report -- the report to be added
    '''

    # TODO: (steph) what else to check for equivalence before deciding it is a duplicate?
        # check if comment is the same?
    # TODO: (steph) dont use user_id field to decide if duplicate

    # Check for duplicate; if there is a duplicate, keep the old entry
    #existing = get_report_by_user_id(report['user_id'])
    #print("\nexisting: ", existing)
    #if existing != 'No such report':
    #    return "Report already exists in database"
    #elif existing['comment'] == report['comment']:
    #    return "Report with the same comment already exists"

    # check if the report's url also exists in the article db
    # if doesn't exist, invalid report
    corresp_article = get_article(report['url'])    # dict
    #print("\ncorresp_article: ", corresp_article)
    if corresp_article == 'No such article':
        return "Article with corresponding url does not exist"

    # Get reference to corresp_article
    doc_ref_gen = articles_ref.where(u'url', u'==', report['url']).limit(1).stream()
    doc_ref = next(doc_ref_gen, None)
    article_ref = doc_ref.reference

    # Add report to report database
    (timestamp, report_doc_ref) = reports_ref.add(report)

    # Add unique report id to the Reports array in corresponding article
    corresp_article['reports'].append(report_doc_ref.id)
    articles_ref.document(article_ref.id).set(corresp_article)

    return report

def get_report_by_user_id(user_id):
    '''
    Finds the multiple reports that matches the user_id
    @param user_id -- the reportID to search for
    '''

    # Get a multiple report that matches the user_id
    docs = reports_ref.where(u'user_id', u'==', user_id).stream()

    # document referenced does not exist
    if not docs:
        return 'No such reports'

    reports = []
    for doc in docs:
        reports.append(doc.to_dict())

    return reports

def get_report_by_report_id(report_id):
    '''
    Finds the single report that matches the report_id
    @param report_id -- the reportID to search for
    '''

    # Get a single report that matches the report_id
    doc_ref = reports_ref.document(report_id).get()

    print(f'Document data: {doc_ref.to_dict()}')

    return doc_ref.to_dict()
