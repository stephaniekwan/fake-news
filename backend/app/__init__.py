# from app import routes
from flask import Flask

def create_app():
    # Setup app development configuration
    app = Flask(__name__)

    # Disable strict slashes.
    # See here for more info: https://github.com/pallets/flask/issues/1783
    app.url_map.strict_slashes = False

    # Import all API blueprints from the __init__.py file
    import app.api as api

    app.register_blueprint(api.report_blueprint)
    return app
