import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Novo from './Novo';
import VerCronograma from './VerCronograma';

function App({output_ia}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Novo />}></Route>
                <Route path='/vercronograma' element={<VerCronograma cronograma_output = {output_ia}></VerCronograma>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
