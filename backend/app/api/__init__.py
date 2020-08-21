from .reportRouter import report_blueprint
from .articleRouter import article_blueprint
from .modelRouter import model_blueprint

# Export API blueprints here
__all__ = ["report_blueprint", "article_blueprint", "model_blueprint"]
