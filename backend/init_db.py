from backend.database import Base, engine, User, Reserve, EndangeredSpecies

def init_db():
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database tables created successfully!")
