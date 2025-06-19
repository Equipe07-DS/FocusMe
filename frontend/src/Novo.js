import FazerFormulario from './componentes/FazerFormulario';
import './Novo.css';

function Novo() {
  return (
    <div className="Quadro-b">
      <div className='Caixa-titulo'>
        <h1 className='Tit'>Crie seu cronograma de estudos personalizado</h1>
      </div>
      <div className='Formulario'>
        <h2 className='Horarios'>Insira as informações correspondentes a cada campo, quando terminar clique em confirmar e depois em ver cronograma para visualizar seu cronograma de estudos personalizado:</h2>
        <FazerFormulario />
      </div>
    </div>
  );
}

export default Novo;
