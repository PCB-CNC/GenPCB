import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Página para mostrar os arquivos dentro do .ZIP e selecionar quais serão convertidos
import { SelectFiles } from './components/selectFiles';

//Página Inicial para droppar o arquivo .ZIP
import { Home } from './components/home';

export function RoutesFront() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/arquivos' element={<SelectFiles/>}></Route>
                <Route path='*' element={<h1>Página Não Encontrada</h1>}></Route>
            </Routes>
        </BrowserRouter>
    );
}