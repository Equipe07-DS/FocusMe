import { Link, useNavigate } from "react-router-dom";
import styles from './TelaPrincipal.module.css';

export default function TelaLoginn(){

  return(
    <div className="fundo">
        <div className="">
            <nav className={`${styles.Barra}`}>
                <div>
                    <button className={`${styles.botao_logo}`} >
                        <img src="/Logo-fundo-transparente.png" alt="Logo do FocusMe em fundo transparente" className={`${styles.logo}`}/>
                    </button>
                </div>
                <ul className="flex flex-row gap-10 pointer">
                    <li className={`${styles.caixa_botoes}`}>
                        <Link to="/login" className={`${styles.texto_botoes}`}>Login</Link>
                    </li>
                    <li className={`${styles.caixa_botao_cadastro}`}>
                        <Link to="/cadastro" className={`${styles.texto_botao_cadastro}`}>Cadastre-se</Link>
                    </li>
                </ul>
            </nav>
        </div>
  </div>
