from openai import OpenAI
import datetime

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
)

def gerar_resposta(messages):
    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost",
                "X-Title": "Assistente de Estudo",
            },
            model="google/gemini-2.0-flash-001",
            messages=messages
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Erro ao gerar a resposta: {str(e)}"
