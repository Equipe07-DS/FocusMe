import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './FormsLogin.module.css';

const FormsLogin = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);

  const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const respostaApi = await response.json();
      console.log(respostaApi);  // Verifique o que é retornado

      localStorage.setItem("user_id", respostaApi.id); // Salva o user_id no localStorage

      setLoginStatus("sucesso");
      navigate('/novocronograma');
    } else {
      const errorData = await response.json();
      setLoginStatus(errorData.detail || "Erro ao logar.");
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    setLoginStatus("Erro na comunicação com o servidor.");
  }
};


  const handleFazerCadastro = () => {
    navigate('/TelaCadastro');
  };

  const email = watch('email');
  const senha = watch('senha');
  const camposPreenchidos = email && senha;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.FormLogin}`}>

        <div className={`${styles.CaixaInputsLogin} w-full flex flex-col mb-2`}>
          <label className={`${styles.LabelLogin}`}>E-mail</label>
          <input
            className={`${styles.InputsLogin}`}
            placeholder="Digite aqui"
            {...register('email', { required: true })}
          />
        </div>

        <div className={`${styles.CaixaInputsLogin} w-full flex flex-col mb-14`}>
          <label className={`${styles.LabelLogin}`}>Senha</label>
          <input
            className={`${styles.InputsLogin}`}
            type="senha"
            placeholder="Digite aqui"
            {...register('senha', { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <button
            className={`${styles.Botao}`}
            type="submit"
            disabled={!camposPreenchidos}
            style={{ opacity: camposPreenchidos ? 1 : 0.5 }}
          >
            Entrar
          </button>

          <button
            type="button"
            className="text-blue-500 text-sm hover:text-blue-800 hover:underline"
            onClick={handleFazerCadastro}
          >
            Primeira vez por aqui? Faça seu cadastro
          </button>

          {loginStatus && (
            <p style={{ marginTop: '10px', color: loginStatus === 'sucesso' ? 'green' : 'red' }}>
              {loginStatus === 'sucesso' ? 'Login bem-sucedido!' : loginStatus}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormsLogin;
