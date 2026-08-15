import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base, engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    nickname = Column(String(50), default="Friend")
    avatar = Column(String(50), default="Puppy")
    stars = Column(Integer, default=0)
    quiz_count = Column(Integer, default=0)
    streak = Column(Integer, default=1)
    last_login_date = Column(String(30), default="")
    challenge_completed_date = Column(String(30), default="")
    unlocked_items = Column(Text, default="[]") # JSON array string

    user = relationship("User", back_populates="profile")

# Automatically create tables in SQLite DB via SQLAlchemy engine
Base.metadata.create_all(bind=engine)
