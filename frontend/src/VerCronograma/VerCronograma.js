import './VerCronograma.css';
import Barra from '../componentes/Barra/Barra';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
const API_URL = "https://back-fa7w.onrender.com";

function VerCronograma() {
  const [cronogramaDias, setCronogramaDias] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUltimoCronograma = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/cronogramas/ultimo?user_id=${user_id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Nenhum cronograma encontrado. Crie um novo cronograma.');
          } else {
            throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setCronogramaDias(data);
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
                  <li key={`${dia}-${index}`}>
                    {tarefa.horario && <>📌 {tarefa.horario}: </>}
                    {tarefa.descricao}
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
      <div className='novocronograma'>
        <p className="Texto-cronograma">Deseja criar um novo cronograma do zero?</p>
        <p className="Texto-cronograma_aviso">Cuidado! Essa ação é irreversível e substituirá segu cronograma atual pelo novo.</p>
        <button
          className="Botao"
          type="submit"
          onSubmit={handleNovo}
        >
        Criar novo cronograma
        </button>
      </div>
      </div>
    </div>
  );
}

export default VerCronograma;
