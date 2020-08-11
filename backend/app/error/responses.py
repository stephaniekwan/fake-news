def sendError(status, message):
    return {
        "error": {
            "status": status,
            "message": message
        }
    }
