import { Link, useNavigate } from "react-router-dom";
import styles from './TelaPrincipal.module.css';

export default function TelaPrincipal(){

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
        <div className={`${styles.conteudo}`}>
            <div>
                <img src="/Logo-fundo-transparente.png" alt="Logo do FocusMe em fundo transparente" className="w:70vw h:auto"/>
                <h2 className={`${styles.texto_subtitulo}`}>O seu cronograma de estudos personalizado que se ajusta à sua rotina!</h2>
            </div>
            <div className={`${styles.paragrafo}`}>
                <p className={`${styles.texto_paragrafo}`}> Ainda não possui uma conta?</p>
                <Link to="/cadastro" className={`${styles.texto_link}`}>Clique aqui</Link>
                <p className={`${styles.texto_paragrafo}`}>para se cadastrar e ficar um passo mais perto de realizar suas metas!</p>
            </div>
        </div>
    </div>
  )

}
