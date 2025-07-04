import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Novo from './NovoCronograma/NovoCronograma';
import VerCronograma from './VerCronograma/VerCronograma';
import TelaLogin from "./TelaLogin/TelaLogin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Novo />} />
                <Route path='/vercronograma' element={<VerCronograma />} />
                <Route path='/TelaLogin' element={<TelaLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
