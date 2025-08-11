from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./focusdatabase.db"  

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

Base = declarative_base()
try:
    Base.metadata.create_all(bind=engine)
    print("Tabelas do banco de dados criadas ou já existentes.")
except Exception as e:
    print(f"Erro ao criar as tabelas do banco de dados: {e}")


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
