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
                                    cronogramaOrganizado[diaAtual
