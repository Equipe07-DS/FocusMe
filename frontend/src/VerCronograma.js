import './VerCronograma.css';
import { useLocation } from 'react-router-dom';

function VerCronograma() {
    const location = useLocation();
    const { cronograma_output } = location.state; 

    return (
        <div className="Quadro-branco">
            <h1 className='Título'>Seu cronograma de estudos personalizado</h1>

            <div className='Quadro-cronograma'>
                <pre>
                    <p className='Texto-cronograma'>{cronograma_output}</p>
                </pre>
            </div>
        </div>
    );
}

export default VerCronograma;
