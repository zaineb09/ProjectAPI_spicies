from backend.database import SessionLocal
from backend.database import Reserve, EndangeredSpecies, User

# Helper function to authenticate the user
def authenticate_user(username, password):
    """
    Authenticate a user by checking the username and password in the database.

    Args:
        username (str): The user's username.
        password (str): The user's password.

    Returns:
        User object if authentication is successful, None otherwise.
    """
    session = SessionLocal()
    try:
        user = session.query(User).filter_by(username=username, password=password).first()
        return user
    except Exception as e:
        print(f"Error during authentication: {e}")
        return None
    finally:
        session.close()


# Login page logic
def login_page():
    """
    Simulates a login page that prompts the user for credentials and grants access.
    """
    print("Welcome to the Reserve Management System")
    username = input("Enter your username: ")
    password = input("Enter your password: ")

    user = authenticate_user(username, password)
    if user:
        print(f"Login successful! Welcome, {user.username}.")
        print(f"Accessing data for Reserve ID: {user.reserve_id}")
        access_reserve_data(user.reserve_id)
    else:
        print("Invalid username or password.")
        return login_page()  # Retry login


# Access reserve data logic
def access_reserve_data(reserve_id):
    """
    Fetches and displays data about a specific reserve and its endangered species.

    Args:
        reserve_id (int): The ID of the reserve to fetch data for.
    """
    session = SessionLocal()
    try:
        reserve = session.query(Reserve).filter_by(reserve_id=reserve_id).first()
        endangered_species = session.query(EndangeredSpecies).filter_by(reserve_id=reserve_id).first()

        if reserve:
            print(f"Reserve Name: {reserve.reserve_name}")
            print(f"Location: {reserve.location}")

            if endangered_species:
                print(f"Animals: {endangered_species.animals}")
                print(f"Plants: {endangered_species.plants}")
                print(f"Insects: {endangered_species.insects}")
            else:
                print("No endangered species data found for this reserve.")
        else:
            print("Reserve not found.")
    finally:
        session.close()
