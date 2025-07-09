from math import inf
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from gerar import gerar_resposta
import datetime
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.models import User
from database.models import User  
from database.schemas import UserSchema  
from database.database import Base, engine, get_session  


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EstudoInput(BaseModel):
    segunda: str
    terca: str
    quarta: str
    quinta: str
    sexta: str
    sabado: str
    domingo: str
    disciplinas: str
    observacoes: str

class UserInfo(BaseModel):
    nome: str
    email: str
    senha: str
    confirmacao: str

@app.post("/gerar-cronograma")
def gerar_cronograma(estudo: EstudoInput):
    mensagem_inicial = f"""
    O usuário tem os seguintes horários disponíveis para estudar:
    Segunda: {estudo.segunda}
    Terça: {estudo.terca}
    Quarta: {estudo.quarta}
    Quinta: {estudo.quinta}
    Sexta: {estudo.sexta}
    Sábado: {estudo.sabado}
    Domingo: {estudo.domingo}

    As disciplinas são: {estudo.disciplinas}
    Observações: {estudo.observacoes}

    Crie um cronograma de estudos personalizado, aproveitando os horários indicados,
    usando a técnica Pomodoro (25 minutos de estudo e pausas),
    e distribua as disciplinas equilibradamente.

    Comece agora às {datetime.datetime.now().strftime('%H:%M')}.
    Retorne apenas o cronograma formatado, fácil de entender.
    """

    messages = [{"role": "user", "content": mensagem_inicial}]
    resposta = gerar_resposta(messages)
    return {"cronograma": resposta}


Base.metadata.create_all(bind=engine)

@app.post("/cadastro")
def cadastro(info: UserInfo, db: Session = Depends(get_session)):
    if info.senha != info.confirmacao:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senhas diferentes")

    user_email = db.query(User).filter(User.email == info.email).first()
    if user_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email já cadastrado")

    user_nome = db.query(User).filter(User.nome == info.nome).first()
    if user_nome:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome já cadastrado")

    novo_usuario = User(
        nome=info.nome,
        email=info.email,
        senha=info.senha
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return {"email": novo_usuario.email, "mensagem": "Cadastro bem-sucedido"}