from pydantic import BaseModel

class User(BaseModel):
    upime: str
    geslo: str
    enaslov: str    