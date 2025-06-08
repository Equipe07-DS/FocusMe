import './App.css';



function App(cronograma_output) {
  return (

    <div className="Quadro-branco">
      
      <h1 className='Título'>Seu cronograma de estudos personalizado</h1>

      <div className='Quadro-cronograma'>

        {/* Esse pre faz com que o texto seja apresentado na formatação original dele */}
        <pre>
          <p className='Texto-cronograma'>{cronograma_output}</p>
        </pre>
        
      </div>
    </div>
  );
}

export default App;
