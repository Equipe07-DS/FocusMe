from math import inf
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from gerar import gerar_resposta
import datetime

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

@app.post("/cadastro")
def cadastro(info: UserInfo):
    nome = info.nome
    email = info.email
    senha = info.senha
    confirmacao = info.confirmacao

    if senha != confirmacao:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Senhas Diferentes")
    else:
        #Handle Infos...
        return {"email": email, "mensagem": "Cadastro bem-sucedido"}