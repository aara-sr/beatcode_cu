from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database URL - using SQLite for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./beatcode.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)
    # Run migrations
    try:
        from migrations.add_remaining_time import migrate
        migrate()
    except Exception as e:
        print(f"Migration error (can be ignored if columns exist): {e}")
    
    # Add AI feedback columns
    try:
        engine.execute('ALTER TABLE matches ADD COLUMN ai_score_p1 FLOAT')
        engine.execute('ALTER TABLE matches ADD COLUMN ai_score_p2 FLOAT')
        engine.execute('ALTER TABLE matches ADD COLUMN feedback_p1 TEXT')
        engine.execute('ALTER TABLE matches ADD COLUMN feedback_p2 TEXT')
    except Exception as e:
        print(f"AI feedback migration error (can be ignored if columns exist): {e}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
