import Barra from "../componentes/Barra/Barra";
import styles from "./TelaInicial.module.css";


export default function TelaInicial(){

    return(

        <div className="bg-[#5A9AC4] w-screen h-screen">
            <Barra/>
            <div className="flex flex-wrap justify-center items-center">
                <div className={`${styles.Quadro}`}>
                    <h1 className={`${styles.titulo}`}>Bem vindo(a)</h1>
                </div>
            </div>
            
        </div>
    )

}
