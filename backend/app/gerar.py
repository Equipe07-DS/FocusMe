from openai import OpenAI
import datetime

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="API-KEY",
)

def gerar_resposta(messages):
    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost",
                "X-Title": "Assistente de Estudo",
            },
            model="mistralai/mistral-7b-instruct:free",
            messages=messages,
            max_tokens=1500
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Erro ao gerar a resposta: {str(e)}"
