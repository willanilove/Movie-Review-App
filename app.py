from flask import Flask, request, jsonify
from models import Session, Base, engine, User, Movie, Review

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

    # Check for duplicate username
    existing_username = session.query(User).filter_by(username=username).first()
    if existing_username:
        return {"error": "username already exists"}, 409

    # Check for duplicate email
    existing_email = session.query(User).filter_by(email=email).first()
    if existing_email:
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
        # Always close the session
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

# Create a new movie
# Needs JSON with title, poster_url & description
@app.route("/movies", methods=["POST"])
def create_movie_route():
    # Get JSON data from the request
    data = request.get_json()

    # Pull out each field one at a time
    title = data.get("title")
    poster_url = data.get("poster_url")
    description = data.get("description")

    # Make sure all required fields are filled in
    if not title:
        return {"error": "title is required"}, 400
    if not poster_url:
        return {"error": "poster_url is required"}, 400
    if not description:
        return {"error": "description is required"}, 400

    # Open a session to talk to the db
    session = Session()

    try:
        # Create a new Movie object with the provided data
        new_movie = Movie(
            title=title,
            poster_url=poster_url,
            description=description
        )

        # Add the movie to the session
        session.add(new_movie)

        # Save the new movie to the db
        session.commit()

        # Send back the new movie as JSON
        return jsonify(new_movie.to_dict()), 201

    except Exception as error:
        # Undo the changes so the db stays clean
        session.rollback()

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

# Get all movies
@app.route("/movies", methods=["GET"])
def list_movies_route():
    session = Session()
    try:
        # Ask the db for all movies
        movies = session.query(Movie).all()

        # Convert movies to list of dictionaries
        movies_list = []
        for m in movies:
            movies_list.append(m.to_dict())

        # Send back the list as JSON
        return jsonify(movies_list), 200

    except Exception as error:
        error_message = str(error)
        response = {"error": error_message}
        return response, 500

    finally:
        session.close()
        
        # Create a new review
# Needs JSON with user_id, movie_id, comment & rating
@app.route("/reviews", methods=["POST"])
def create_review_route():
    # Get JSON data from the request
    data = request.get_json()

    user_id = data.get("user_id")
    movie_id = data.get("movie_id")
    comment = data.get("comment")
    rating = data.get("rating")

    # Make sure all required fields are filled in
    if not user_id:
        return {"error": "user_id is required"}, 400
    if not movie_id:
        return {"error": "movie_id is required"}, 400
    if not comment:
        return {"error": "comment is required"}, 400
    if not rating:
        return {"error": "rating is required"}, 400

    session = Session()

    try:
        # Create a new Review object
        new_review = Review(
            user_id=user_id,
            movie_id=movie_id,
            comment=comment,
            rating=rating
        )

        # Add the review to the session
        session.add(new_review)

        # Save the new review to the db
        session.commit()

        # Send back the new review as JSON
        return jsonify(new_review.to_dict()), 201

    except Exception as error:
        # Undo the changes so the db stays clean
        session.rollback()
        return {"error": str(error)}, 500

    finally:
        # Always close the session
        session.close()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
