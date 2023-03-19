from typing import Union

from fastapi import FastAPI

from database import engine, Base, User
import schemas
from sqlalchemy.orm import Session

Base.metadata.create_all(engine)

app = FastAPI()


@app.get("/")
def read_root():
    return "TODO app"

#todo: HTTP status kode
@app.get("/user/{uname, pword}")
def authenticate_user(uname: str, pword: str):
    session = Session(bind=engine, expire_on_commit=False)
    q = session.query(User).filter(User.upime == uname)
    
    if q.first() == None:
        ret = 0
    else:
        if q.first().geslo == pword:
            ret = q.first().id
        else:
            ret = 0
    
    session.close()
    return ret

#todo: HTTP status kode
@app.get("map/list{id}")
def get_all_maps(token: str):
    return "Get all maps from user"

#todo: HTTP status kode
@app.get("map/{id}")
def get_map(id: int):
    return "Get map file"

#todo: pred ustvarjanjem preveri, ali uporabnik že obstaja, in vrni napako če ja
#todo: HTTP status kode
@app.post("/user/add") 
def add_user(user: schemas.User):
    session = Session(bind=engine, expire_on_commit=False)
    q = session.query(User).filter(User.upime == user.upime)

    if q.first() == None:
        userDB = User(upime = user.upime, geslo=user.geslo, enaslov=user.enaslov)
        session.add(userDB)
        session.commit()
        id = userDB.id
    else:
        id = 0
    
    session.close()
    return id

#todo: HTTP status kode
#@app.post("/map/add")
#def add_map(todo: schemas.ToDo):
#    return token
#

#todo: HTTP status kode
@app.put("/update/user/{id}")
def update_user(id:int, field:str, newval:str):
    session = Session(bind=engine, expire_on_commit=False)
    
    if field == 'upime':
        q = session.query(User).filter(User.upime == newval)

        if q.first() is not None:
            session.close()
            return 0
    
    user = session.query(User).get(id)

    if user:
        setattr(user, field, newval)
        session.commit()
    
    session.close()
    return 1

#todo: HTTP status kode
@app.delete("/user/delete/{id}")
def delete_user(id:int):
    session = Session(bind=engine, expire_on_commit=False)
    user = session.query(User).get(id)
    
    if user:
        session.delete(user)
        session.commit()

    session.close()
    return "Delete user"

#todo: HTTP status kode
@app.delete("/map/delete/{id}")
def delete_map(token:str):
    return "Delete map"

