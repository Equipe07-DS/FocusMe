<<<<<<< HEAD
import sys
sys.path.insert(1, '/path/to/application/app/folder')  #adicionar caminho pra pasta do projeto

from behave import given, when, then
from backend.app.main import gerar_cronograma, EstudoInput
=======
import requests
from behave import given, when, then
>>>>>>> feat/BackendTelaCadastro

@given('o servidor da API está rodando em "{url}"')
def step_given_api_url(context, url):
    context.url = url + "/gerar-cronograma"

@when('eu envio um JSON válido com horários e disciplinas')
def step_when_envio_json(context):
<<<<<<< HEAD
    context.estudo = EstudoInput()
    context.estudo.segunda = '13:00 - 17:00'
    context.estudo.terca = '10:00 - 18:00'
    context.estudo.quarta = '9:00 - 12:00'
    context.estudo.quinta = '10:00 - 15:00'
    context.estudo.sexta = '15:00 - 18:00'
    context.estudo.sabado = '13:00 - 15:00'
    context.estudo.domingo = '13:00 - 15:00'
    context.estudo.disciplinas = 'matemática, biologia, português'

    context.response = gerar_cronograma(context.estudo)

@then('todos os campos do cronograma devem estar presentes na resposta')
def step_then_tem_cronograma(context):
    resposta = context.response.lower()
    assert 'cronograma' in resposta
    assert 'segunda' in resposta
    assert 'terça' in resposta
    assert 'quinta' in resposta
    assert 'sexta' in resposta
    assert 'sábado' in resposta
    assert 'domingo' in resposta
    assert 'matemática' in resposta
    assert 'biologia' in resposta
    assert 'português' in resposta
=======
    context.payload = {
        "segunda": "08:00-10:00",
        "terca": "10:00-12:00",
        "quarta": "14:00-16:00",
        "quinta": "16:00-18:00",
        "sexta": "08:00-10:00",
        "sabado": "Livre",
        "domingo": "Livre",
        "disciplinas": "Matemática, Física, Química",
        "observacoes": "Tenho mais dificuldade em Física."
    }
    context.response = requests.post(context.url, json=context.payload)

@then('a resposta deve conter status 200')
def step_then_status_code(context):
    assert context.response.status_code == 200

@then('o campo "cronograma" deve estar presente na resposta')
def step_then_tem_cronograma(context):
    json_data = context.response.json()
    assert "cronograma" in json_data
    assert isinstance(json_data["cronograma"], str)
    assert len(json_data["cronograma"]) > 0
>>>>>>> feat/BackendTelaCadastro
