import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './FormsCadastro.css';

// Falta ajustar a integração ainda, apenas está com o exemplo da integração de outra tela só para não dar erro
const FormsCadastro = () => {

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

      <form onSubmit={handleSubmit(onSubmit)} className="flex-col">

        <div className="Inputs-Cadastro flex flex-col">
        
          <label>Nome</label>
          <input placeholder="Digite aqui"{...register('name')} />
        
        </div>

        <div className="Inputs-Cadastro flex flex-col">
        
          <label>E-mail</label>
          <input placeholder="Digite aqui"{...register('email')} />
        
        </div>


        <div className="Inputs-Cadastro flex flex-col">

          <label>Senha</label>
          <input type="password" placeholder="Digite aqui"{...register('password')} />

        </div>

        <div className="Inputs-Cadastro flex flex-col mb-4">

          <label>Confirme sua senha</label>
          <input type="password" placeholder="Digite aqui"{...register('password')} />

        </div>

        <div className="flex flex-col gap-1 items-center">

          <button className="botao" type="submit">Cadastrar</button>

          <button className="text-blue-500 text-sm hover:text-blue-800 hover:underline" onClick={handleVerCronograma}>Já possui uma conta? Faça login agora</button>
        
        </div>

      </form>
    </div>
  );
};

export default FormsCadastro;