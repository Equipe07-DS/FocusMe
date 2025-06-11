import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Novo from './Novo';
import VerCronograma from './VerCronograma';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Novo />} />
                <Route path='/vercronograma' element={<VerCronograma />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
