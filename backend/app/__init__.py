from flask import Flask

# Import all API blueprints from the __init__.py file
import app.api as api


def create_app():
    # Setup app development configuration
    app = Flask(__name__)

    # Disable strict slashes.
    # See here for more info: https://github.com/pallets/flask/issues/1783
    app.url_map.strict_slashes = False

    app.register_blueprint(api.report_blueprint)
    app.register_blueprint(api.article_blueprint)
    app.register_blueprint(api.model_blueprint)

    return app
