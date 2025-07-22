import { useForm } from "react-hook-form";
import './FormsNovoCronograma.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FazerFormulario = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

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
                
                navigate('/chat', { 
                    state: { 
                        prompt: data,
                        cronogramaGerado: respostaApi.cronograma
                    } 
                });

            } else {
                console.error('Erro ao enviar dados para o backend');
                alert('Houve um erro ao gerar o cronograma. Tente novamente.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
            setIsLoading(false);
        }
    };

    return (
        <div className="Caixa">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Dias">
                    <div className="Grid-dias">
                        <div className="Caixa-input">
                            <label>Segunda-feira (horário):</label>
                            <input placeholder="Digite aqui" {...register('segunda')} />
                        </div>
                        <div className="Caixa-input">
                            <label>Terça-feira (horário):</label>
                            <input placeholder="Digite aqui" {...register('terca')} />
                        </div>
                        <div className="Caixa-input">
                            <label>Quarta-feira (horário):</label>
                            <input placeholder="Digite aqui" {...register('quarta')} />
                        </div>
                        <div className="Caixa-input">
                            <label>Quinta-feira (horário):</label>
                            <input placeholder="Digite aqui" {...register('quinta')} />
                        </div>
                        <div className="Caixa-input">
                            <label>Sexta-feira (horário):</label>
                            <input placeholder="Digite aqui" {...register('sexta')} />
                        </div>
                        <div className="Caixa-input">
                            <label>Sábado (horário):</label>
                            <input placeholder="Digite aqui" {...register('sabado')} />
                        </div>
                    </div>
                    <div className="Caixa-Domingo">
                        <div className="Caixa-input">
                            <label>Domingo (horário):</label>
                            <input placeholder="Digite aqui" {...register('domingo')} />
                        </div>
                    </div>
                </div>
                <div className="Caixa-input">
                    <label>Disciplinas (separadas por vírgula):</label>
                    <input placeholder="Digite aqui" {...register('disciplinas')} />
                </div>
                <div className="Caixa-input">
                    <label>Observações:</label>
                    <textarea placeholder="Digite aqui" {...register('observacoes')} />
                </div>
                
                <div className="Caixa-botoes-centralizado">
                    <button className="botao" type="submit" disabled={isLoading}>
                        {isLoading ? 'Gerando...' : 'Gerar Cronograma no Chat'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FazerFormulario;