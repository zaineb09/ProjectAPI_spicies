from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

DATABASE_URL = "sqlite:///example.db"

Base = declarative_base()

# User model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    reserve_id = Column(Integer, ForeignKey('reserves.reserve_id'), nullable=False)

    # Relationship to Reserve
    reserve = relationship("Reserve", back_populates="users")


# Reserve model
class Reserve(Base):
    __tablename__ = 'reserves'

    reserve_id = Column(Integer, primary_key=True, autoincrement=True)
    reserve_name = Column(String, nullable=False)
    location = Column(String, nullable=False)

    # Relationship to User
    users = relationship("User", back_populates="reserve")


# EndangeredSpecies model
class EndangeredSpecies(Base):
    __tablename__ = 'endangered_species'

    reserve_id = Column(Integer, ForeignKey('reserves.reserve_id'), primary_key=True)
    animals = Column(String)
    plants = Column(String)
    insects = Column(String)


# Create SQLite engine
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
