import { useNavigate } from "react-router-dom";
import styles from './Barra.module.css';


const Barra = () => {
    const navigate = useNavigate();
    const handleLogo = () => {
        navigate('/TelaLogin');
    };
    
    return (
        <nav className={`${styles.Barra}`}>
            <div>
                <button className={`${styles.botao_logo}`} onClick={handleLogo}>
                    <img src="/Logo-fundo-transparente.png" alt="Logo do FocusMe em fundo transparente" className={`${styles.logo}`}/>
                </button>
                
            </div>
            <ul className="flex flex-row gap-10 pointer">
                <li className={`${styles.caixa_botoes}`}>
                    <a href="/inicio" className={`${styles.texto_botoes}`}>Inicio</a>
                </li>
                <li className={`${styles.caixa_botoes}`}>
                    <a href="/novocronograma" className={`${styles.texto_botoes}`}>Cronograma</a>
                </li>
                <li className={`${styles.caixa_botoes}`}><a href="" className={`${styles.texto_botoes}`}>Chat</a></li>
                <li className={`${styles.caixa_botoes}`}><a href="" className={`${styles.texto_botoes}`}>Perfil</a></li>
            </ul>
        </nav>
    )
}

export default Barra;
