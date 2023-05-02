from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine("sqlite:///projektdatabase.db")

Base = declarative_base()

class User(Base):
    __tablename__ = "uporabnik"
    id = Column(Integer, primary_key=True)
    upime = Column(String(20), nullable=False)
    geslo = Column(String(30), nullable=False)
    enaslov = Column(String(30), nullable=False)

class Map(Base):
    __tablename__ = "pot"
    id = Column(Integer, primary_key=True)
    uporabnik = Column(Integer, nullable=False)
    filename = Column(String(37), nullable=False)