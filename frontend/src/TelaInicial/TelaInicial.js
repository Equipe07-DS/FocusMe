import Barra from "../componentes/Barra/Barra";
import styles from "./TelaInicial.module.css";


export default function TelaInicial(){

    return(

        <div className="bg-[#5A9AC4] w-screen h-screen">
            <Barra/>
            <div className="flex flex-wrap justify-center items-center">
                <div className={`${styles.conteudo}`}>
                    <div className={`${styles.Quadro}`}>
                        <h1 className={`${styles.titulo}`}>Bem vindo(a)</h1>
                        <p className={`${styles.texto}`}>  Você pode consultar seu cronograma semanal na aba cronograma, conversar com nosso assistente virtual, Fabio, para alterar seu cronograma na aba de chat e ver suas informações de perfil na aba de perfil. Boa joranda de estudos! </p>
                        <p className={`${styles.texto}`}>Atividades do dia:</p>
                        <div className={`${styles.Quadro_dia}`}>
                            <p className={`${styles.texto_dia}`}>==Cronograma do dia==</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
