import { useForm } from "react-hook-form";
import './FazerFormulario.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FazerFormulario.css";

const FazerFormulario = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [cronograma, setCronograma] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:8000/gerar-cronograma", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const respostaApi = await response.json();
                setCronograma(respostaApi.cronograma); 
            } else {
                console.error('Erro ao enviar dados para o backend');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleVerCronograma = () => {
        if (cronograma) {
            navigate('/vercronograma', { state: { cronograma_output: cronograma } });
        } else {
            alert('Por favor, gere um cronograma primeiro.');
        }
    };

    return (
        <div className="Caixa">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Caixa-input">
                    <label>Segunda-feira (horário):</label>
                    <input {...register('segunda')} />
                </div>

                <div className="Caixa-input">
                    <label>Terça-feira (horário):</label>
                    <input {...register('terca')} />
                </div>

                <div className="Caixa-input">
                    <label>Quarta-feira (horário):</label>
                    <input {...register('quarta')} />
                </div>

                <div className="Caixa-input">
                    <label>Quinta-feira (horário):</label>
                    <input {...register('quinta')} />
                </div>

                <div className="Caixa-input">
                    <label>Sexta-feira (horário):</label>
                    <input {...register('sexta')} />
                </div>

                <div className="Caixa-input">
                    <label>Sábado (horário):</label>
                    <input {...register('sabado')} />
                </div>

                <div className="Caixa-input">
                    <label>Domingo (horário):</label>
                    <input {...register('domingo')} />
                </div>

                <div className="Caixa-input">
                    <label>Disciplinas (separadas por vírgula):</label>
                    <input {...register('disciplinas')} />
                </div>

                <div className="Caixa-input">
                    <label>Observações:</label>
                    <textarea {...register('observacoes')} />
                </div>

                <div className="Caixa-botao">
                    <button className="botao" type="submit">Gerar cronograma</button>
                </div>
            </form>

            <div className="Caixa-botao" style={{ marginTop: '20px' }}>
                <button className="botao" onClick={handleVerCronograma}>Ver Cronograma</button>
            </div>
        </div>
    );
};

export default FazerFormulario;
