import { useForm } from 'react-hook-form';
import './FormsNovoCronograma.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FazerFormulario = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [cronograma, setCronograma] = useState(null);

  const onSubmit = async (data) => {
    // Transformar os dados para corresponder ao modelo EstudoInput
    const formattedData = {
      segunda: data.segunda?.horario || '',
      terca: data.terca?.horario || '',
      quarta: data.quarta?.horario || '',
      quinta: data.quinta?.horario || '',
      sexta: data.sexta?.horario || '',
      sabado: data.sabado?.horario || '',
      domingo: data.domingo?.horario || '',
      disciplinas: data.materia || '', // Renomeia materia para disciplinas
      observacoes: Object.values(data)
        .filter((value) => value.observacoes)
        .map((value) => value.observacoes)
        .join('; ') || 'Nenhuma observação', // Combina observações dos dias
    };

    try {
      const response = await fetch('http://localhost:8000/gerar-cronograma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const respostaApi = await response.json();
        setCronograma(respostaApi.cronograma);
        // Armazena os dados formatados para passar para VerCronograma
        localStorage.setItem('estudoData', JSON.stringify(formattedData));
      } else {
        const erro = await response.json();
        console.error('Erro ao enviar dados para o backend:', erro);
        alert(`Erro ao gerar cronograma: ${erro.detail || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao gerar cronograma. Tente novamente.');
    }
  };

  const handleVerCronograma = () => {
    if (cronograma) {
      const estudoData = JSON.parse(localStorage.getItem('estudoData') || '{}');
      navigate('/vercronograma', { state: { cronograma_output: cronograma, estudoData } });
    } else {
      alert('Por favor, gere um cronograma primeiro.');
    }
  };

  const diasDaSemana = [
    { nome: 'Segunda-feira', chave: 'segunda' },
    { nome: 'Terça-feira', chave: 'terca' },
    { nome: 'Quarta-feira', chave: 'quarta' },
    { nome: 'Quinta-feira', chave: 'quinta' },
    { nome: 'Sexta-feira', chave: 'sexta' },
    { nome: 'Sábado', chave: 'sabado' },
    { nome: 'Domingo', chave: 'domingo' },
  ];

  return (
    <section className="Caixa">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="Grid-dias">
          {diasDaSemana.map((dia) => (
            <details key={dia.chave} className="Caixa-dia">
              <summary>{dia.nome}</summary>

              <div className="Caixa-input">
                <label>Horário disponível:</label>
                <input
                  placeholder="Ex: 14h às 16h"
                  {...register(`${dia.chave}.horario`)}
                />
              </div>

              <div className="Caixa-input">
                <label>Observações:</label>
                <textarea
                  placeholder="Ex: foco em revisão, evitar tarde..."
                  {...register(`${dia.chave}.observacoes`)}
                />
              </div>
            </details>
          ))}
        </section>

        <fieldset className="Caixa-input">
          <label>Matéria para estudar na semana:</label>
          <input
            placeholder="Ex: Matemática"
            {...register('materia')}
          />
        </fieldset>

        <footer className="Caixa-botoes">
          <button className="botao" type="submit">
            Confirmar
          </button>

          <button
            className="botao"
            type="button"
            onClick={handleVerCronograma}
            disabled={!cronograma}
          >
            Ver Cronograma
          </button>
        </footer>
      </form>
    </section>
  );
};

export default FazerFormulario;