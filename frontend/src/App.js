import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Novo from './NovoCronograma/NovoCronograma';
import VerCronograma from './VerCronograma/VerCronograma';
import TelaCadastro from "./TelaCadastro/TelaCadastro";
import TelaLogin from "./TelaLogin/TelaLogin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TelaLogin />} />
                <Route path='/vercronograma' element={<VerCronograma />} />
                <Route path='/novocronograma' element={<Novo />} />
                <Route path='/cadastro' element={<TelaCadastro />} />
                <Route path='/login' element={<TelaLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
