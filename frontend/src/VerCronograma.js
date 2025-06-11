import './VerCronograma.css';

function VerCronograma({cronograma_output}) {
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