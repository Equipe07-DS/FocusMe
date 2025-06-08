import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Usando `texto` (texto entre crases) para manter formatação
let output_ia = `Cronograma de Estudos - Semana Intensiva de Revisão para Provas

Para alcançar um bom desempenho nas provas finais, é fundamental seguir um cronograma bem estruturado. A seguir, está um plano de estudos para uma semana de revisão intensiva, com foco nas principais disciplinas:

Segunda-feira
08:00 - 09:30: Matemática - Revisão de álgebra e funções
10:00 - 11:30: Física - Cinemática e leis de Newton
14:00 - 15:30: Português - Interpretação de texto e gramática
16:00 - 17:30: Redação - Estrutura do texto dissertativo

Terça-feira
08:00 - 09:30: Matemática - Geometria analítica
10:00 - 11:30: Física - Trabalho, energia e potência
14:00 - 15:30: Química - Ligações químicas e reações
16:00 - 17:30: Redação - Prática com temas anteriores

Quarta-feira
08:00 - 09:30: Biologia - Genética
10:00 - 11:30: História - Brasil colônia e Império
14:00 - 15:30: Geografia - Geopolítica e economia global
16:00 - 17:30: Matemática - Exercícios de revisão

Quinta-feira
08:00 - 09:30: Física - Revisão geral
10:00 - 11:30: Química - Soluções e cálculos estequiométricos
14:00 - 15:30: Português - Literatura e figuras de linguagem
16:00 - 17:30: Simulado geral (tempo cronometrado)

Sexta-feira
08:00 - 10:00: Correção do simulado
10:30 - 12:00: Dúvidas e reforço nos pontos fracos
14:00 - 16:00: Leitura leve e descanso mental`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {App (output_ia)}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
