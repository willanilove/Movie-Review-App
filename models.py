from sqlalchemy import create_engine, ForeignKey, DateTime, func
from sqlalchemy.orm import declarative_base, mapped_column, Mapped, sessionmaker, relationship
from datetime import datetime

engine = create_engine("sqlite:///database.db", echo=True)

# Starting point for all models
Base = declarative_base()

# Session lets us talk to the db
Session = sessionmaker(bind=engine)

# ------- USER MODEL -------
class User(Base):
    __tablename__ = "users"

    # id is the main column for users
    # It’s the unique number for each user
    id: Mapped[int] = mapped_column(primary_key=True)

    # Username & email must be filled in
    # They have to be unique so no duplicates
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)

    # Password is required
    # Don’t set it as unique b/c 2 users could choose the same password
    password: Mapped[str] = mapped_column(nullable=False)

    # Relationship: 1 user can have many posts
    # Connects the User table to the Post table
    posts: Mapped[list["Post"]] = relationship("Post", back_populates="creator")

    # to_dict turns a User into a dict
    # handy when sending data back as JSON
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password,
        }

# ------- POST MODEL -------
class Post(Base):
    __tablename__ = "posts"

    # id is the primary key for posts.
    id: Mapped[int] = mapped_column(primary_key=True)

    # Title & content are required fields for each post.
    title: Mapped[str] = mapped_column(nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)

    # user_id links the post to a user
    # It points to the id column in the users table
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    # created_at = time when post is made
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship: each post belongs to 1 user
    creator: Mapped["User"] = relationship("User", back_populates="posts")

    # Helper method: makes it easy to turn a Post object into a dict
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "user_id": self.user_id,
            "created_at": self.created_at,
        }

# ------- MOVIE MODEL -------
class Movie(Base):
    __tablename__ = "movies"

    # id is the unique identifier for each movie
    id: Mapped[int] = mapped_column(primary_key=True)

    # Title is required & must be unique
    title: Mapped[str] = mapped_column(nullable=False, unique=True)

    # Poster_url stores the image link for the movie poster
    poster_url: Mapped[str] = mapped_column(nullable=False)

    # Short summary of the movie
    description: Mapped[str] = mapped_column(nullable=False)

    # Helper method: turns a Movie object into a dict
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "poster_url": self.poster_url,
            "description": self.description,
        }

# ------- REVIEW MODEL -------
class Review(Base):
    __tablename__ = "reviews"

    # id is the unique identifier for each review
    id: Mapped[int] = mapped_column(primary_key=True)

    # user_id links the review to a user
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    # movie_id links the review to a movie
    movie_id: Mapped[int] = mapped_column(ForeignKey("movies.id"), nullable=False)

    # comment is the text of the review
    comment: Mapped[str] = mapped_column(nullable=False)

    # rating is the star rating (1–5)
    rating: Mapped[int] = mapped_column(nullable=False)

    # created_at = time when review is made
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship: each review belongs to 1 user & 1 movie
    user = relationship("User")
    movie = relationship("Movie")

    # Helper method: turns a Review object into a dict
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "comment": self.comment,
            "rating": self.rating,
            "created_at": self.created_at,
        }

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    print("Database and tables created.")
