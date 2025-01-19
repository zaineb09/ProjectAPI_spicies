from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import SessionLocal, User  # Ensure User is imported from your database module
from fastapi.middleware.cors import CORSMiddleware
from .crud import (
    create_reserve,
    get_reserves,
    get_all_species,
    get_endangered_species_by_reserve,
    update_reserve,
    update_endangered_species,
    delete_reserve,
    delete_endangered_species,
    create_endangered_species,
)
from backend.authentication import login_page

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    login_page()

# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request bodies
class ReserveCreate(BaseModel):
    reserve_name: str
    location: str

class EndangeredSpeciesCreate(BaseModel):
    reserve_id: int  # Add reserve_id
    animals: str
    plants: str
    insects: str

class ReserveUpdate(BaseModel):
    reserve_name: str
    location: str

# User models for Pydantic request validation
class UserCreate(BaseModel):
    username: str
    password: str
    reserve_id: int  # Associated reserve_id

class UserUpdate(BaseModel):
    username: str
    password: str

# Create a new reserve
@app.post("/reserves/")
def create_new_reserve(reserve: ReserveCreate, db: Session = Depends(get_db)):
    try:
        return create_reserve(db, reserve.reserve_name, reserve.location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating reserve: {e}")

# Get all reserves
@app.get("/reserves/")
def get_all_reserves(db: Session = Depends(get_db)):
    return get_reserves(db)

# Get endangered species by reserve ID
@app.get("/reserves/{reserve_id}/species/")
def get_species_by_reserve(reserve_id: int, db: Session = Depends(get_db)):
    species = get_endangered_species_by_reserve(db, reserve_id)
    if not species:
        raise HTTPException(status_code=404, detail="Species not found")
    return species

# Update a reserve
@app.put("/reserves/{reserve_id}")
def update_reserve_data(
    reserve_id: int,
    reserve: ReserveUpdate,  # The request body will be passed as a Pydantic model
    db: Session = Depends(get_db)
):
    updated_reserve = update_reserve(db, reserve_id, reserve.reserve_name, reserve.location)
    if not updated_reserve:
        raise HTTPException(status_code=404, detail="Reserve not found")
    return updated_reserve

@app.get("/species/")  
def get_all_species_data(db: Session = Depends(get_db)):
    try:
        species = get_all_species(db)
        return species
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching all species: {e}")

@app.post("/species/")
def create_new_species(species: EndangeredSpeciesCreate, db: Session = Depends(get_db)):
    try:
        return create_endangered_species(
            db,
            reserve_id=species.reserve_id,  # Make sure to provide reserve_id in the request body
            animals=species.animals,
            plants=species.plants,
            insects=species.insects
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating endangered species: {e}")

# Update endangered species
@app.put("/species/{reserve_id}")
def update_species(
    reserve_id: int,
    species: EndangeredSpeciesCreate,
    db: Session = Depends(get_db)
):
    updated_species = update_endangered_species(
        db, reserve_id, species.animals, species.plants, species.insects
    )
    if not updated_species:
        raise HTTPException(status_code=404, detail="Species not found")
    return updated_species

# Delete a reserve
@app.delete("/reserves/{reserve_id}")
def delete_reserve_data(reserve_id: int, db: Session = Depends(get_db)):
    try:
        delete_reserve(db, reserve_id)
        return {"message": "Reserve deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting reserve: {e}")

# Delete endangered species
@app.delete("/species/{reserve_id}")
def delete_species(reserve_id: int, db: Session = Depends(get_db)):
    try:
        delete_endangered_species(db, reserve_id)
        return {"message": "Endangered species deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting species: {e}")

# Create a new user
@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    new_user = User(username=user.username, password=user.password, reserve_id=user.reserve_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Get all users
@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Update a user
@app.put("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = user.username
    db_user.password = user.password
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete a user
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}
