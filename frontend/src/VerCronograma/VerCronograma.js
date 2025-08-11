import './VerCronograma.css';
import Barra from '../componentes/Barra/Barra';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const API_URL = "https://back-fa7w.onrender.com";

function VerCronograma() {
    const navigate = useNavigate();
    const handleNovo = () => {
        navigate('/novocronograma');
    };

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
            .trim();

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
                const res = await fetch(`${API_URL}/cronogramas/ultimo?user_id=${user_id}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        setError('Nenhum cronograma encontrado. Crie um novo cronograma.');
                    } else {
                        throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
                    }
                } else {
                    const data = await res.json();

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

                        linhas.forEach(linha => {
                            const matchDia = linha.match(/^\*+\s*([A-Za-zÀ-ú]+)\*+\s*:/i);

                            if (matchDia) {
                                const nomeDia = matchDia[1];
                                const diaNormalizado = normalizarDia(nomeDia);
                                if (diaNormalizado) {
                                    diaAtual = diaNormalizado;
                                }
                            } else if (diaAtual) {
                                const matchTarefa = linha.match(/^(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2}):\s*(.+)$/);
                                if (matchTarefa) {
                                    const [, inicio, fim, descricao] = matchTarefa;
                                    const horario = `${inicio} - ${fim}`;
                                    cronogramaOrganizado[diaAtual].push({ horario, descricao: descricao.trim() });
                                }
                            }
                        });

                        setCronogramaDias(cronogramaOrganizado);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Erro ao carregar o cronograma:', err);
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
                <button
                    className="Botao"
                    type="button"
                    onClick={handleNovo}
                >
                    Criar novo cronograma
                </button>
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
                <div className='novocronograma'>
                    <p className="Texto-cronograma">Deseja criar um novo cronograma do zero?</p>
                    <p className="Texto-cronograma_aviso">Cuidado! Essa ação é irreversível e substituirá seu cronograma atual pelo novo.</p>
                    <button
                        className="Botao"
                        type="submit"
                        onClick={handleNovo}
                    >
                        Criar novo cronograma
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerCronograma;