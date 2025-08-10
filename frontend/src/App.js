import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Novo from './NovoCronograma/NovoCronograma';
import VerCronograma from './VerCronograma/VerCronograma';
import TelaCadastro from "./TelaCadastro/TelaCadastro";
import TelaLogin from "./TelaLogin/TelaLogin";
import TelaChat from "./TelaChat/TelaChat";
import TelaPrincipal from "./TelaPrincipal/TelaPrincipal"
import TelaInicial from "./TelaInicial/TelaInicial"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TelaPrincipal />} />
                <Route path='/vercronograma' element={<VerCronograma />} />
                <Route path='/novocronograma' element={<Novo />} />
                <Route path='/cadastro' element={<TelaCadastro />} />
                <Route path='/login' element={<TelaLogin />} />
                <Route path='/chat' element={<TelaChat />} />
                <Route path='/inicio' element={<TelaInicial />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
