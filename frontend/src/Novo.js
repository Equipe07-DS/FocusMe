import FazerFormulario from './componentes/FazerFormulario';
import './Novo.css';

function Novo() {
  return (
    <div className="Quadro-b">
      <div className='Caixa-titulo'>
        <h1 className='Tit'>Crie seu cronograma de estudos personalizado</h1>
      </div>
      <div className='Formulario'>
        <FazerFormulario />
      </div>
    </div>
  );
}

export default Novo;
