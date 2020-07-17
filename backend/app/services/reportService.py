import firestore_model
from firebase_admin import firestore
from ..database import db
from .articleService import get_article, articles_ref

reports_ref = db.collection('reports')

def get_all_reports():
    '''
    Gets all reports from the database
    @return all Report instances
    '''
    reports = [doc.to_dict() for doc in reports_ref.stream()]
    return reports


def add_report(report):
    '''
    Adds a new report to the database if it doesn't already exist
    @param report -- the report to be added
    '''
    # This works without model (Dennis)
    # Question: do we need to use model or not?

    # TODO: (steph) what else to check for equivalence before deciding it is a duplicate?
        # check if comment is the same?
    # TODO: (steph) dont use user_id field to decide if duplicate

    # Check for duplicate; if there is a duplicate, keep the old entry
    existing = get_report(report['user_id'])
    #print("\nexisting: ", existing)
    if existing != 'No such report':
        return "Report already exists in database"
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

def get_report(report_id):
    '''
    Finds the single report that matches the report_id
    @param report_id -- the reportID to search for
    '''
    # TODO: (steph) allow this method to also check if report_id matches the unique id?
        # either way, need a better way to look for a report than user_id field


    # Get a single report that matches the report_id
    doc_ref_gen = reports_ref.where(u'user_id', u'==', report_id).limit(1).stream()

    # Get the document snapshot of the doc_ref_gen generator
    doc_ref = next(doc_ref_gen, None)

    # document referenced does not exist
    if not doc_ref:
        return 'No such report'

    # Get the data in the document by accessing it using its reference
    doc = doc_ref.reference.get()

    print(f'Document data: {doc.to_dict()}')

    return doc.to_dict()
