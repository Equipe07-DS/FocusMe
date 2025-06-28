import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './FormsLogin.css';

// Falta ajustar a integração ainda, apenas está com o exemplo da integração de outra tela só para não dar erro
const FormsLogin = () => {

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
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Div dos componentes do email */}
        <div className="Inputs-Login w-full flex flex-col mb-2">
        
          <label>E-mail</label>
          <input placeholder="Digite aqui"{...register('email')} />
        
        </div>


        {/* Div dos componentes da senha */}
        <div className="Inputs-Login w-full flex flex-col mb-14">

          <label>Senha</label>
          <input type="password" placeholder="Digite aqui"{...register('password')} />
        </div>


        <div className="flex flex-col gap-1 items-center">

          <button className="botao" type="submit">Entrar</button>

          <button className="text-blue-500 text-sm hover:text-blue-800 hover:underline" onClick={handleVerCronograma}>Primeira vez por aqui? Faça seu cadastro</button>
        
        </div>

      </form>
    </div>
  );
};

export default FormsLogin;
