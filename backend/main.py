from flask_script import Manager
from livereload import Server

from app import create_app
import os

# Create development app
# To Do (Opt to change dev environments in .env file)
application = create_app()
manager = Manager(application)

@manager.command
def run():
    application.run(host='0.0.0.0')
    # Works for local host and server
    # Server IP: IP = 132.249.238.69; local host: 127.0.0.1
    # app.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    server = Server(manager.run())
    server.serve()
