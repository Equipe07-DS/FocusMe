import os
import time
import schedule
import dropbox
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DROPBOX_TOKEN = "sl.u.AF5LG_cEe9L6kW3omx5TDXgq8FvsJwRR882-BAJXLhk-_FEHPpNbG-DXm8POKKcr0zpz25laixa6vlDHmYFord1MNkH44qDyqQx_PQSXqP9oJBVl6aMsREkAeCXlMzg7fct91bCVq_6JnF2Wka72OlxSe31UUdWAgDkcytOl0gPmP691X2FydqHhs5Ik2-hmXvWeGXIW4xpF8nXTBH_ItAzA5WKvaCWQxytT-7wQxX8-7We4h_Cp4UPG8VBKJfN3CMuxCeQeSo3zFjTD2J1FwpEiGF0OQBiTCQQ_l58AC6OiXDnAzvSV4O4q9fdsjS1vxT0_pAtlAkzlnj3s5Q1Rm_t4W5SNhJxRJMRzHMlR-upnNZduGvuo0weh65YcySK2ucwYnbG9FHXRWOcSUID82tcpLldpzAVO06ziZd3evDhGRa3swsrDZLE376JUpRSAcgz-Sj1_5zzLLxrCvKPPYiuOAQAXBGxzOb0CFrsI2Si3xpCrRSRMzKqGqXfQVuV3rT0_VSEeMjwlC8-i2ADTdL3ZgWHaTNSyZJIXMVIbYFUaG13DccbqJ9w_LbYEi51A4PjDG5qKSM4wHrrbXL9qYA29kczfaLp_H7kaPEcmoz7aiY6uzvT_HXOFLx3z4ejMvv8yCsLHgqVt4Doa8uimWSqmKGUvfOkdQuZnz0nHoN4HJ8v3j9ISxuckETzGbshv4sJYCMUbE2hPrYYf4AyzPgWvaGKdXpCURIfESACO1Ca_ga-nRUDRxLt93yUPQTDFMOv_ZoqsXZMQ5dnnw4ebcE1NftA7ce9KIvE8E8urrUJszDQRkW3TeMvqPVjiPnuTj2ElEMYWM_9ory7H0z2c76ZdIkLxyTE6NrB_FnD8HtchSFzLP8HT9rOCXz34TWMtb-1u5bHINsDRyybBXnTYI0-laptqa-K9lg03po6saCC79in9RetV2d2e6houBN04fR6BFNuwgWcuRYC_975USdK38iyV28-RG9BNxpcjp7IlEXjJ8GkxFWVKa9afdDe4dvDuiPzu0RC8IPWweX0COJyN1YIoQszGj5520IKN7KvSA88Q2osH27KYP3L_Pf6HOw83DaXL0Zdsv9utxtrSwDTRTfDhurg53ki3eYXYfGUEQYvMXdZjIUhLbyTASK4R08HyzFdA2UFXWlk4WuMAzuu8GG0nxkhqe6l2c3yGHlXRGqMcrc3FBTGWd6ei7iWY42eH7Bu-WOCe7XlrNojMV-nNiYuJHociVW7CNqWCk8UESL55zE5EtN6vBcsjn5nAVC6QdJb2td1Ja9di7fwLemjBb7omPe1Yj6RmiKitK-GJhUco-LXjb8JvVsjENt_hFYriOjt8QpuSrvSCN0tMqfQC0xLx-8YtXM8GCLfHn_O1wYyX8vKQyX3YuzXKC9XPN5xHqZI8cEebjPX8CNtG6Lb6qs-XUJw_Zj1Txp5n16v38j8eRtcdiwL-Byg2iEkxdxo"  
DROPBOX_DB_PATH = "/focusdatabase.db"  
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

