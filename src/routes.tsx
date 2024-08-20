import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produto from './pages/Produto'
import PaginaDeExemplo from './pages/PaginaDeExemplo'

export const Rotas = () => {
    
    return(
        <BrowserRouter>
            <Routes>

                <Route 
                    path='/'
                    element={<Login />}
                />
                <Route 
                    path='/dashboard'
                    element={<Dashboard />}
                />
                <Route 
                    path='/produto/:id'
                    element={<Produto />}
                />
                <Route
                    path='/exemplo'
                    element={<PaginaDeExemplo />}
                />

            </Routes>
        </BrowserRouter>
    )
}