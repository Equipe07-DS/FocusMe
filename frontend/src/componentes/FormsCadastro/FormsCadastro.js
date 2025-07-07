import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './FormsCadastro.module.css';

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

  const handleCadastrar = () => {
    navigate('/novocronograma');
  };

  const handleFazerLogin = () => {
    navigate('/TelaLogin');
  };
  
  return (
    <div>

      <form className={`${styles.FormCadastro} flex-col `} onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col">
        
          <label className={`${styles.LabelCadastro}`} >Nome</label>
          <input className={`${styles.InputsCadastro}`}  placeholder="Digite aqui"{...register('name')} />
        
        </div>

        <div className=" flex flex-col">
        
          <label className={`${styles.LabelCadastro}`}>E-mail</label>
          <input className={`${styles.InputsCadastro}`}  placeholder="Digite aqui"{...register('email')} />
        
        </div>


        <div className=" flex flex-col">

          <label className={`${styles.LabelCadastro}`}>Senha</label>
          <input className={`${styles.InputsCadastro}`}  type="password" placeholder="Digite aqui"{...register('password')} />

        </div>

        <div className=" flex flex-col mb-4">

          <label className={`${styles.LabelCadastro}`}>Confirme sua senha</label>
          <input className={`${styles.InputsCadastro}`}  type="password" placeholder="Digite aqui"{...register('password')} />

        </div>

        <div className="flex flex-col gap-1 items-center">

          <button className={`${styles.Botao}`} onClick={handleCadastrar} type="submit">Cadastrar</button>

          <button className="text-blue-500 text-sm hover:text-blue-800 hover:underline" onClick={handleFazerLogin}>Já possui uma conta? Faça login agora</button>
        
        </div>

      </form>
    </div>
  );
};

export default FormsCadastro;
