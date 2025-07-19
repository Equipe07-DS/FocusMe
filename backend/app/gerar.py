from openai import OpenAI
import datetime
<<<<<<< HEAD

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="API-KEY",
=======
from dotenv import load_dotenv
import os

load_dotenv() 


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("api_key")
>>>>>>> 8279488 (atualização com testes)
)

def gerar_resposta(messages):
    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost",
                "X-Title": "Assistente de Estudo",
            },
            model="google/gemini-2.0-flash-001",
            messages=messages,
            max_tokens=1500
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Erro ao gerar a resposta: {str(e)}"
