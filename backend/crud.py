from sqlalchemy.orm import Session
from .database import Reserve, EndangeredSpecies


# Create a new reserve
def create_reserve(db: Session, reserve_name: str, location: str):
    db_reserve = Reserve(reserve_name=reserve_name, location=location)
    db.add(db_reserve)
    db.commit()
    db.refresh(db_reserve)
    return db_reserve


# Get all reserves
def get_reserves(db: Session):
    return db.query(Reserve).all()


# Create a new endangered species record
def create_endangered_species(db: Session, reserve_id: int, animals: str, plants: str, insects: str):
    db_species = EndangeredSpecies(reserve_id=reserve_id, animals=animals, plants=plants, insects=insects)
    db.add(db_species)
    db.commit()
    db.refresh(db_species)
    return db_species


# Get endangered species by reserve ID
def get_endangered_species_by_reserve(db: Session, reserve_id: int):
    return db.query(EndangeredSpecies).filter(EndangeredSpecies.reserve_id == reserve_id).first()


# Update a reserve's information
def update_reserve(db: Session, reserve_id: int, reserve_name: str, location: str):
    db_reserve = db.query(Reserve).filter(Reserve.reserve_id == reserve_id).first()
    if not db_reserve:
        return None
    db_reserve.reserve_name = reserve_name
    db_reserve.location = location
    db.commit()
    db.refresh(db_reserve)
    return db_reserve


# Update endangered species information
def update_endangered_species(db: Session, reserve_id: int, animals: str, plants: str, insects: str):
    db_species = db.query(EndangeredSpecies).filter(EndangeredSpecies.reserve_id == reserve_id).first()
    if not db_species:
        return None
    db_species.animals = animals
    db_species.plants = plants
    db_species.insects = insects
    db.commit()
    db.refresh(db_species)
    return db_species


# Delete a reserve
def delete_reserve(db: Session, reserve_id: int):
    db_reserve = db.query(Reserve).filter(Reserve.reserve_id == reserve_id).first()
    if not db_reserve:
        raise ValueError("Reserve not found")
    db.delete(db_reserve)
    db.commit()


# Delete endangered species by reserve ID
def delete_endangered_species(db: Session, reserve_id: int):
    db_species = db.query(EndangeredSpecies).filter(EndangeredSpecies.reserve_id == reserve_id).first()
    if not db_species:
        raise ValueError("Species not found")
    db.delete(db_species)
    db.commit()
def get_all_species(db: Session):
    try:
        return db.query(EndangeredSpecies).all()  # Assuming you are querying the EndangeredSpecies model
    except Exception as e:
        raise Exception(f"Error fetching species: {e}")
