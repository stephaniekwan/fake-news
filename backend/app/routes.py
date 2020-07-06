from app import app

@app.route('/')
def index():
    return 'Welcome to S T O N K S! :^)<br><br><img src="https://i.imgur.com/dGP6ALv.png">'