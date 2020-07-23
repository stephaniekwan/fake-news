
## Backend API for Fake News

### Required Dependecies
1. Python 3 & pip: [Link](https://www.python.org/downloads/).


### Build Instructions:
1. Create Python virtual environment so pip installs aren't global. [Explanation + Installation guide](https://docs.python.org/3/tutorial/venv.html).
   1. Name your virtual environment as `venv`--on the tutorial, run this command `python3 -m venv venv`, instead of `python3 -m venv tutorial-env`
   2. Don't forget to install all the necessary packages with `pip install -r requirements.txt`
2. Follow this [tutorial](https://firebase.google.com/docs/admin/setup?authuser=1#initialize-sdk) to generate a private key file for your service account.
3. Add the json key to `/backend` your folder, then rename it as `firebase-private-key.json`.
4. Create a .env file to be able to connect to the database.
   1. Do cp .env.example .env to rename the example file.
   2. Copy the .env configuration from below.
5. Run  `python -u ./main.py run` from your `backend` folder.
### Example .env file
```
FLASK_APP=main.py
FLASK_ENV=development
```
### File System Structure:
- /app - the main project folder containing everything
- /app/database - database setup and models, seeds may come here later
- /app/database/models - create and export new models here
- /app/__init__.py - connect Flask blueprints here
- /app/api - contains controllers for routes and Flask blueprints
- /app/services - contains services that perform necessary logic between API and database


### Notes:
- If you pip install any packages, make sure to type pip freeze > requirements.txt to save dependencies
