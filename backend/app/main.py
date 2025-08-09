from math import inf
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
import unicodedata
from fastapi import Query

from database.models import User, Cronograma
from database.schemas import UserSchema
from database.database import Base, engine, get_session
from gerar import gerar_resposta

# ===== Inicialização =====
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ===== Modelos Pydantic =====
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

class LoginInput(BaseModel):
    email: str
    senha: str

class CronogramaInput(BaseModel):
    nome: str
    descricao: str
    user_id: int



def normalizar(texto):
    return ''.join(
        c for c in unicodedata.normalize('NFD', texto.lower())
        if unicodedata.category(c) != 'Mn'
    )

def obter_contexto_cronograma():
    # Exemplo fixo de contexto
    return (
        "Cronograma atual:\n"
        "Segunda: Matemática das 08:00 às 10:00\n"
        "Terça: Português das 09:00 às 11:00\n"
        "Quarta: Física das 08:00 às 10:00\n"
        "Quinta: Química das 10:00 às 12:00\n"
        "Sexta: História das 14:00 às 16:00\n"
        "Sábado: Redação das 09:00 às 11:00\n"
        "Domingo: Livre\n\n"
    )

# ===== Endpoints =====
@app.get("/cronogramas/ultimo")
def get_ultimo_cronograma(user_id: int = Query(...), db: Session = Depends(get_session)):
    cronograma = db.query(Cronograma).filter(Cronograma.user_id == user_id).order_by(Cronograma.id.desc()).first()
    if not cronograma:
        raise HTTPException(status_code=404, detail="Nenhum cronograma encontrado")
    return {
        "id": cronograma.id,
        "nome": cronograma.nome,
        "descricao": cronograma.descricao 
    }


@app.post("/cadastro")
def cadastro(info: UserInfo, db: Session = Depends(get_session)):
    if info.senha != info.confirmacao:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senhas diferentes")

    if db.query(User).filter(User.email == info.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email já cadastrado")

    if db.query(User).filter(User.nome == info.nome).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome já cadastrado")

    novo_usuario = User(nome=info.nome, email=info.email, senha=info.senha)
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return {"email": novo_usuario.email, "mensagem": "Cadastro bem-sucedido"}

@app.post("/login")
def login(info: LoginInput, db: Session = Depends(get_session)):
    usuario = db.query(User).filter(User.email == info.email).first()
    if not usuario or usuario.senha != info.senha:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou senha incorretos")

    return {"id": usuario.id, "email": usuario.email, "mensagem": "Login bem-sucedido"}

@app.post("/gerar-cronograma")
def gerar_cronograma(estudo: EstudoInput):
    mensagem = f"""
    O usuário tem os seguintes horários disponíveis para estudar:
    Segunda: {estudo.segunda}
    Terça: {estudo.terca}
    Quarta: {estudo.quarta}
    Quinta: {estudo.quinta}
    Sexta: {estudo.sexta}
    Sábado: {estudo.sabado}
    Domingo: {estudo.domingo}

    Disciplinas: {estudo.disciplinas}
    Observações: {estudo.observacoes}

    Crie um cronograma personalizado distribuindo as disciplinas equilibradamente e incluindo pausas de 10 minutos entre os estudos.
    Retorne apenas o cronograma formatado, sem comentários ou instruções adcionais.
    """
    resposta = gerar_resposta([{"role": "user", "content": mensagem}])
    return {"cronograma": resposta}

@app.post("/salvar-cronograma")
def salvar_cronograma(cronograma: CronogramaInput, db: Session = Depends(get_session)):
    usuario = db.query(User).filter(User.id == cronograma.user_id).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    novo_cronograma = Cronograma(
        nome=cronograma.nome,
        descricao=cronograma.descricao,
        user_id=cronograma.user_id
    )
    db.add(novo_cronograma)
    db.commit()
    db.refresh(novo_cronograma)

    return {"id": novo_cronograma.id, "nome": novo_cronograma.nome, "mensagem": "Cronograma salvo com sucesso"}

@app.get("/cronogramas/{user_id}")
def listar_cronogramas(user_id: int, db: Session = Depends(get_session)):
    usuario = db.query(User).filter(User.id == user_id).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    cronogramas = db.query(Cronograma).filter(Cronograma.user_id == user_id).all()
    return [{"id": c.id, "nome": c.nome, "descricao": c.descricao} for c in cronogramas]

class ChatInput(BaseModel):
    mensagem: str
    cronograma_inicial: str  # Novo campo

def normalizar(texto):
    return ''.join(
        c for c in unicodedata.normalize('NFD', texto.lower())
        if unicodedata.category(c) != 'Mn'
    )



@app.post("/chat")
def conversar(chat_input: ChatInput):
    mensagem = chat_input.mensagem
    cronograma = chat_input.cronograma_inicial or ""
    mensagem_normalizada = normalizar(mensagem)

    palavras_chave = [
        "cronograma", "horario", "disciplinas", "estudo", "pomodoro",
        "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo",
        "alterar", "modificar", "atualizar", "trocar", "ajustar"
    ]

    if not any(p in mensagem_normalizada for p in palavras_chave):
        return {"resposta": "Eu não sou feito para responder isso."}

    mensagem_completa = (
        f"Cronograma atual:\n{cronograma.strip()}\n\n"
        f"Instrução: Modifique o cronograma acima aplicando exatamente as alterações solicitadas, "
        f"substituindo disciplinas ou horários conforme indicado. Mantenha a técnica Pomodoro (25 minutos de estudo e pausas). "
        f"Se a solicitação for vaga (ex.: apenas 'altere para Biologia'), substitua todas as disciplinas do cronograma por Biologia, "
        f"mantendo os mesmos horários. Retorne apenas o cronograma atualizado, formatado claramente.\n\n"
        f"Solicitação do usuário: {mensagem}"
    )

    resposta_ia = gerar_resposta([{"role": "user", "content": mensagem_completa}])
    return {"resposta": resposta_ia}
@app.get("/")
def read_root():
    return {"status": "online", "message": "API está funcionando!"}
