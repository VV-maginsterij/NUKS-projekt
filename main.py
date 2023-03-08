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

@app.get("/user/{uname, pword}")
def authenticate_user(uname: str, pword: str):
    session = Session(bind=engine, expire_on_commit=False)
    q = session.query(User).filter(User.upime==uname)
    if q.geslo == pword:
        return q.id
    return 0

@app.get("map/list{token}")
def get_all_maps(token: str):
    return "Get all maps from user"

@app.get("map/{id}")
def get_map(id: int):
    return "Get map file"

@app.post("/user/add") 
def add_user(user: schemas.User):

    session = Session(bind=engine, expire_on_commit=False)
    userDB = User(upime = user.upime, geslo=user.geslo, enaslov=user.enaslov)
    session.add(userDB)
    session.commit()
    id = userDB.id
    session.close()
    return id


#@app.post("/map/add")
#def add_map(todo: schemas.ToDo):
#    return token
#

@app.put("/update/user/{id}")
def update_user(id:int, field:str, newval:str):
    session = Session(bind=engine, expire_on_commit=False)
    q = session.query(User).filter(User.id==id)

    
    return "Update user data"

@app.delete("/user/delete/{id}")
def delete_user(id:int):
    session = Session(bind=engine, expire_on_commit=False)
    session.query(User).filter(User.id==id).delete()
    session.commit()
    session.close()
    return "Delete user"

@app.delete("/map/delete/{token}")
def delete_map(token:str):
    return "Delete user"

