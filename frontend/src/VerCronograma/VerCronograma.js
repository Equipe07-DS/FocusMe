import './VerCronograma.css';
import Barra from '../componentes/Barra/Barra';
import { useEffect, useState } from 'react';

function VerCronograma() {
  const [cronogramaDias, setCronogramaDias] = useState({
    'Segunda-feira': [],
    'Terça-feira': [],
    'Quarta-feira': [],
    'Quinta-feira': [],
    'Sexta-feira': [],
    'Sábado': [],
    'Domingo': []
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizarDia = (dia) => {
    const diasMap = {
      'segunda': 'Segunda-feira',
      'terça': 'Terça-feira',
      'terca': 'Terça-feira',
      'quarta': 'Quarta-feira',
      'quinta': 'Quinta-feira',
      'sexta': 'Sexta-feira',
      'sabado': 'Sábado',
      'sábado': 'Sábado',
      'domingo': 'Domingo'
    };

    const chave = dia.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '')
      .split('-')[0];

    return diasMap[chave];
  };

  useEffect(() => {
    const fetchUltimoCronograma = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/cronogramas/ultimo?user_id=${user_id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Nenhum cronograma encontrado. Crie um novo cronograma.');
          } else {
            throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
          }
        } else {
          const data = await res.json();
          console.log('Resposta completa da API:', data);

          if (!data.descricao || data.descricao.trim() === '') {
            setError('O cronograma está vazio. Crie um novo cronograma.');
          } else {
            const linhas = data.descricao
              .split('\n')
              .map(linha => linha.trim())
              .filter(linha => linha);

            const cronogramaOrganizado = {
              'Segunda-feira': [],
              'Terça-feira': [],
              'Quarta-feira': [],
              'Quinta-feira': [],
              'Sexta-feira': [],
              'Sábado': [],
              'Domingo': []
            };

            let diaAtual = null;

            linhas.forEach((linha, index) => {
              const matchDia = linha.match(/^\*+\s*\**\s*([A-Za-zÀ-ú-]+)-?feira\s*:?/i);
              if (matchDia) {
                const diaNormalizado = normalizarDia(matchDia[1]);
                if (cronogramaOrganizado[diaNormalizado]) {
                  diaAtual = diaNormalizado;
                }
                return;
              }

              const matchTarefa = linha.match(/^\*+\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2}):\s*(.+)$/);
              if (matchTarefa && diaAtual) {
                const [, inicio, fim, descricao] = matchTarefa;
                const horario = `${inicio} - ${fim}`;
                cronogramaOrganizado[diaAtual].push({ horario, descricao });
              }
            });

            console.log('Cronograma organizado:', cronogramaOrganizado);
            setCronogramaDias(cronogramaOrganizado);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Erro detalhado:', err.message);
        setError(`Erro ao carregar o cronograma: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUltimoCronograma();
  }, []);

  if (loading) {
    return (
      <div className="cronograma-container">
        <h1 className="Título">Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cronograma-container">
        <h1 className="Título">Erro</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="cronograma-container">
      <Barra></Barra>
      <div className='quadro'>
      <div className="bg-[#004E7E] px-10 w-full flex flex-col items-center justify-center rounded-3xl mb-6 py-2">
          <h1 className="text-white font-bold text-3xl align-top mb-2">Seu cronograma de estudos personalizado</h1>
        </div>
      <div className='conteinerdias'>
      {Object.entries(cronogramaDias).map(([dia, tarefas]) => (
        <div key={dia} className="Caixa-dia">
          <h2 className="Título">{dia}</h2>
          <div className='Caixa-input'>
              {tarefas.length > 0 ? (
                <ul className="Texto-cronograma">
                  {tarefas.map((tarefa, index) => (
                    <li key={index}>
                      📌 {tarefa.horario}: {tarefa.descricao}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="Texto-cronograma">Nenhuma tarefa para este dia.</p>
              )}
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}

export default VerCronograma;
