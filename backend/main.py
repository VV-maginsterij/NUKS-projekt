from typing import Union

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse

from database import engine, Base, User, Map
import schemas
from sqlalchemy.orm import Session

import aiofiles
import aiofiles.os

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

    return FileResponse("files/" + file.filename)

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
async def add_map(id: int, file: UploadFile):

    async with aiofiles.open("files/" + file.filename, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write

        session = Session(bind=engine, expire_on_commit=False)  
        mapDB = Map(uporabnik = id, filename = file.filename)     
        session.add(mapDB)
        session.commit() 

    return {"filename": file.filename}


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

