import FormsCadastro from "../componentes/FormsCadastro/FormsCadastro";
import styles from "./TelaCadastro.module.css";


export default function TelaCadastro(){

  return(
    
    // Div geral da página
    <div className="w-screen h-screen flex flex-row bg-[#004E7E]">

      {/* Div geral da logo, fundo azul e mensagem*/}
      <div className="bg-[#004E7E] w-5/12 h-full flex flex-col justify-center items-center ">

        <img src="/Logo-fundo-transparente.png" alt="Logo do FocusMe em fundo transparente" className={`${styles.LogoTransparente}`} />
        <h1 className={`${styles.TextoLogo} text-white font-medium opacity-90 text-center mt-5 `} >
          Bem-vindo ao FocusMe, aqui você pode criar um cronograma semanal de estudos personalizável em instantes!
        </h1>

      </div>


      {/* Div geral campos de resposta, fundo branco*/}
      <div className=" bg-white w-7/12 h-full rounded-l-3xl px-20 py-14 flex-col">
        
        <h1 className="flex justify-center text-[#004E7E] font-bold text-4xl">Olá, registre-se</h1>
        <h1 className="flex justify-center text-[#004E7E] font-bold text-4xl mb-7">para começar!</h1>
      
        <FormsCadastro/>

      </div>

    </div>
  )

}
