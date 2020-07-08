from app import app

if __name__ == "__main__":
    # Works for local host and server
    # Server IP: IP = 132.249.238.69; local host: 127.0.0.1
    app.run(host='0.0.0.0', port=5000)
