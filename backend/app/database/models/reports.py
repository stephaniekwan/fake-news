'''
Model of Reports database
'''
from config import db

# imports to use cloud firestore similar to NDB structure
import firestore_model
from firestore_model import Model
from dataclasses import dataclass, field

@dataclass
class Report(Model):
    report_id: str
    url: str
    tag: str
    comment: str    # limit it to a certain length?