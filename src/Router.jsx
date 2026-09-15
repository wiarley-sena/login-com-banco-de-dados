import {BrowserRouter, Routes, Route}  from 'react-router-dom'

import  Login  from "./pages/Login/Login";
import  ListaUsuarios  from "./pages/ListaUsuarios/ListaUsuarios";

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element = { <Login/>}/>
                <Route path = '/usuarios' element = { <ListaUsuarios />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default RoutesApp;