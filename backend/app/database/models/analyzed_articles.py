'''
Model of Analyzed Articles database
Fields:
    url: string
    domain: string
    rating: double  
    timestamp: string/Date()
    reports: [ array of Reports ]
'''
from config import db
from datetime import datetime

# imports to use cloud firestore similar to NDB structure
import firestore_model
from firestore_model import Model
from dataclasses import dataclass, field

@dataclass
class Analyzed_Articles(Model):
    url: str
    domain: str
    rating: float
    timestamp: datetime
    reports: 