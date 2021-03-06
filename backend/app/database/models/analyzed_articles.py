'''
Model of Analyzed Articles database
'''
from .. import db
from datetime import datetime
from typing import List
from .reports import Report

# imports to use cloud firestore similar to NDB structure
import firestore_model
from firestore_model import Model
from dataclasses import dataclass, field

@dataclass
class Analyzed_Article(Model):
    url: str
    domain: str
    title: str
    rating: float
    risk_level: int
    timestamp: datetime
    reports: List[Report]

# Analyzed_Article.save()