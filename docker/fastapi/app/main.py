from typing import Union

from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base, User, Map
import app.schemas as schemas
from sqlalchemy.orm import Session

import aiofiles
import aiofiles.os

import requests, json
import time

Base.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.get("/map/list{id}")
def get_all_maps(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    mapall = session.query(Map).filter(Map.uporabnik == id).all()
    session.close()

    return mapall

#todo: HTTP status kode
@app.get("/map/{id}")
async def get_map(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    file = session.query(Map).get(id)
    session.close()

    headers = {'Content-Disposition': 'attachment; filename='+file.filename}
    return FileResponse("files/" + file.filename, headers=headers)

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
@app.post("/map/add")
async def add_map(id: int, request:Request):
    file = await request.body()
    filename = str(time.time()) + str(id) 
    tohash = str(time.time()) + str(id)
    
    headers = {"Content-Type": "application/json"}
    response = requests.post('http://openfaas:8080/function/filenamegenerator', data=json.dumps(tohash), headers=headers)
    filename = response.text.strip() + ".json"

    out_file = open("files/" + filename , 'w')
    out_file.write(file.decode("utf-8"))  # async write
    out_file.close()

    session = Session(bind=engine, expire_on_commit=False)  
    mapDB = Map(uporabnik = id, filename = filename)     
    session.add(mapDB)
    session.commit() 

    return {"filename": filename}


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
async def delete_map(id:str):
    session = Session(bind=engine, expire_on_commit=False) 
    map = session.query(Map).get(id)

    if map:
        await aiofiles.os.remove("files/" + map.filename) 
        session.delete(map)
        session.commit()

    return "Delete map" 

