import os
import time
import schedule
import dropbox
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DROPBOX_TOKEN = os.getenv("DROPBOX_T")  
LOCAL_DB_PATH = "./focusdatabase.db"   


def baixar_banco():
    """Baixa o banco de dados do Dropbox para o local"""
    dbx = dropbox.Dropbox(DROPBOX_TOKEN)
    try:
        print("📥 Baixando banco do Dropbox...")
        metadata, res = dbx.files_download(DROPBOX_DB_PATH)
        with open(LOCAL_DB_PATH, "wb") as f:
            f.write(res.content)
        print("✅ Banco atualizado localmente.")
    except dropbox.exceptions.ApiError:
        print("⚠️ Banco não encontrado no Dropbox, será criado localmente.")

def subir_banco():
    """Envia o banco local para o Dropbox"""
    dbx = dropbox.Dropbox(DROPBOX_TOKEN)
    if os.path.exists(LOCAL_DB_PATH):
        with open(LOCAL_DB_PATH, "rb") as f:
            print("📤 Enviando banco para o Dropbox...")
            dbx.files_upload(f.read(), DROPBOX_DB_PATH, mode=dropbox.files.WriteMode("overwrite"))
            print("✅ Banco enviado com sucesso.")
    else:
        print("⚠️ Banco local não encontrado.")


DATABASE_URL = f"sqlite:///{LOCAL_DB_PATH}"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

