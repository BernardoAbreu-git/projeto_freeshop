import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RotaProtegida from './components/RotaProtegida';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/products/:id" element={<div>Detalhes (Em breve)</div>} />
        <Route path="/cart" element={<div>Carrinho (Em breve)</div>} />
        
        <Route 
          path="/dashboard" 
          element={
            <RotaProtegida>
              <div>Dashboard Protegida</div>
            </RotaProtegida>
          } 
        />

        <Route path="*" element={<h1>404 - Não encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  );
}