import Barra from "../componentes/Barra/Barra";
import styles from "./TelaInicial.module.css";


export default function TelaInicial(){

    return(

        <div className="bg-[#5A9AC4] w-screen h-screen">
            <Barra/>
            <div className="flex flex-wrap justify-center items-center">
                <div className={`${styles.conteudo}`}>
                    <div className={`${styles.Quadro}`}>
                        <h1 className={`${styles.titulo}`}>Bem vindo(a) ao FocusMe!</h1>
                            <p className={`${styles.texto}`}>  Nosso objetivo é te ajudar a organizar seus horários de estudo de forma eficiente e flexível.</p>
                            <p className={`${styles.texto}`}>  Aqui você pode: </p>
                            <p className={`${styles.texto}`}> .Consultar seu cronograma semanal na aba cronograma. </p>
                            <p className={`${styles.texto}`}> .Pedir ao nosso assistente virtual para alterar seu cronograma na aba de chat. </p>
                            <p className={`${styles.texto}`}> Boa jornada de estudos!</p>
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
