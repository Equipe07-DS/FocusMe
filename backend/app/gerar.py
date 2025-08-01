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
            messages=messages,
            max_tokens=1500
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Erro ao gerar a resposta: {str(e)}"
