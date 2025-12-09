from sqlalchemy import create_engine, ForeignKey, DateTime, func
from sqlalchemy.orm import declarative_base, mapped_column, Mapped, sessionmaker, relationship
from datetime import datetime

engine = create_engine("sqlite:///database.db", echo=True)

# Starting point for all models
Base = declarative_base()

# Session lets us talk to the db
Session = sessionmaker(bind=engine)

# USER MODEL
class User(Base):
    __tablename__ = "users"

    # id is the main column for users
    # It’s the unique number for each user
    id: Mapped[int] = mapped_column(primary_key=True)

    # Username and email must be filled in
    # They have to be unique so no duplicates
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)

    # Password is required
    # Don’t set it as unique because two users could choose the same password.
    password: Mapped[str] = mapped_column(nullable=False)

    # Relationship: one user can have many posts
    # Connects the User table to the Post table
    posts: Mapped[list["Post"]] = relationship("Post", back_populates="creator")

    # to_dict turns a User into a dictionary
    # handy when sending data back as JSON
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password,
        }

# POST MODEL:
class Post(Base):
    
    __tablename__ = "posts"

    # id is the primary key for posts.
    id: Mapped[int] = mapped_column(primary_key=True)

    # title & content are required fields for each post.
    title: Mapped[str] = mapped_column(nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)

    # user_id links the post to a user
    # it points to the id column in the users table
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    # created_at = time when post is made
    # updated_at = time when post is changed
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    # Relationship: each post belongs to one user
    creator: Mapped["User"] = relationship("User", back_populates="posts")

    # Helper method: makes it easy to turn a Post object into a dict
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }



if __name__ == "__main__":
    Base.metadata.create_all(engine)
    print("Database and tables created.")
