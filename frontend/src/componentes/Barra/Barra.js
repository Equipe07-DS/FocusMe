import { useNavigate } from "react-router-dom";
import styles from './Barra.module.css';


const Barra = () => {
  return (
        <nav>
            <div>
                <button>
                    <img src="/Logo-fundo-transparente.png" alt="Logo do FocusMe em fundo transparente"/>
                </button>
                
            </div>
            <ul>
                <li>
                    <a href="/inicio">Inicio</a>
                </li>
                <li>
                    <a href="/novocronograma">Cronograma</a>
                </li>
                <li><a href="">Chat</a></li>
                <li><a href="">Perfil</a></li>
            </ul>
        </nav>
    )
}

export default Barra;
