from flask import Flask, request, jsonify
from models import Session, Base, engine, User

# When the app starts, check if the tables are there
# It won’t delete anything, just adds any missing ones
# Creates all tables from the classes in models.py
Base.metadata.create_all(engine)

app = Flask(__name__)

@app.route("/")
def main_route():
    return "Welcome to the Movie Review API!"

@app.route("/status")
def status_route():
    return {"message": "Server is up"}, 200

# Create a new user
# Needs JSON with username, email & password
@app.route("/users", methods=["POST"])
def create_user_route():
    # Get JSON data from the request
    data = request.get_json()

    # Pull out each field one at a time
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Make sure all required fields are filled in:
    if not username:
        return {"error": "username is required"}, 400
    if not email:
        return {"error": "email is required"}, 400
    if not password:
        return {"error": "password is required"}, 400

    # Open a session to talk to the db
    session = Session()
    
    existing_user = session.query(User).filter_by(username=email).first()
    if existing_user:
        return {"error": "email already exists"}, 409

    try:
        # Create a new User object with the provided data
        new_user = User(
            username=username,
            email=email,
            password=password
        )

        # Add the user to the session
        session.add(new_user)

        # Save the new user to the db
        session.commit()

        # Send back the new user as JSON
        return jsonify(new_user.to_dict()), 201

    except Exception as e:
        # If something fails, undo the changes
        session.rollback()
        return {"error": str(e)}, 500

    finally:
        # Close the session
        session.close()

# Get all users
@app.route("/users", methods=["GET"])
def list_users_route():
    session = Session()

    try:
        # Ask the db for all users
        users = session.query(User).all()

        # Convert users to list of dictionaries
        users_list = []
        for u in users:
            users_list.append(u.to_dict())

        # Send back the list as JSON
        return jsonify(users_list), 200

    # If ANY error happens inside the try block, this code will run
    except Exception as error:
        # Convert the error into a string so it can be shown in JSON
        error_message = str(error)

        # Build a dict with the error message
        response = {
            "error": error_message
        }

        return response, 500

    finally:
        # Always close the session
        session.close()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
