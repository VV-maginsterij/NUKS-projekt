import hashlib, json

def handle(req):
    """handle a request to the function
    Args:
        req (str): request body
    """
    #json = json.loads(req)
    
    hash = hashlib.md5()
    hash.update(req.encode("UTF-8"))
    md5 = hash.hexdigest()
    return(md5)
