from flask import Flask, request
from models import Session, Base, engine, User, Movie, Review

# When the app starts, check if the tables are there
# Don't delete anything, just add any missing ones
# Creates all tables from the classes in models.py
Base.metadata.create_all(engine)

app = Flask(__name__)

@app.route("/")
def main_route():
    return "Welcome to the Movie Review API!"

@app.route("/status")
def status_route():
    return {"message": "Server is up"}

# ------- USER ROUTES -------
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
    return new_user.to_dict()

# Get all users
@app.route("/users", methods=["GET"])
def list_users_route():
    session = Session()

    # Ask the db for all users
    users = session.query(User).all()

    # Convert users to list of dictionaries
    users_list = []
    for u in users:
        users_list.append(u.to_dict())

    # Send back the list as JSON
    return users_list

# Get 1 user by id
@app.route("/users/<int:userId>", methods=["GET"])
def get_user_by_id(userId):
    session = Session()
    user = session.query(User).filter_by(id=userId).first()
    if not user:
        return {"error": "User not found"}, 404
    response = user.to_dict()
    return response

# Update a user by id
@app.route("/users/<int:userId>", methods=["PUT"])
def update_user_by_id(userId):
    # Get JSON data from the request
    data = request.get_json()

    # Open a session to talk to the db
    session = Session()

    # Try to find the user
    user = session.query(User).filter_by(id=userId).first()
    if not user:
        return {"error": "User not found"}, 404

    # Update fields if provided
    if "username" in data:
        user.username = data["username"]
    if "email" in data:
        user.email = data["email"]
    if "password" in data:
        user.password = data["password"]

    # Save changes
    session.commit()

    # Return updated user as JSON
    response = user.to_dict()
    return response

# ------- MOVIE ROUTES -------
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
    return new_movie.to_dict()

# Get all movies
@app.route("/movies", methods=["GET"])
def list_movies_route():
    session = Session()

    # Ask the db for all movies
    movies = session.query(Movie).all()

    # Convert movies to list of dictionaries
    movies_list = []
    for m in movies:
        movies_list.append(m.to_dict())

    # Send back the list as JSON
    return movies_list

# Delete a movie by id
@app.route("/movies/<int:movieId>", methods=["DELETE"])
def delete_movie_route(movieId):
    # Open a session to talk to the db
    session = Session()

    # Try to find the movie with this id
    movie = session.query(Movie).filter_by(id=movieId).first()
    if not movie:
        return {"error": "Movie not found"}

    # Delete the movie and save changes
    session.delete(movie)
    session.commit()

    # Return the deleted movie as JSON
    response = movie.to_dict()
    return response

# ------- REVIEW ROUTES -------
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

    # Create a new Review object
    new_review = Review(
        user_id=user_id,
        movie_id=movie_id,
        comment=comment,
        rating=rating
    )

    session.add(new_review)
    session.commit()

    # Send back the new review as JSON
    return new_review.to_dict()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
