import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import Home from './pages/Home';
import Auth from './pages/Auth'; 
import RotaProtegida from './components/RotaProtegida';
import Cart from './pages/Cart';
import 'primeicons/primeicons.css';

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
      
        <Route path="/" element={<Auth />} />
        
        
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        
      
        <Route path="/products/:id" element={<div className="p-5 text-center"><h1>Detalhes do Produto</h1><p>Em breve...</p></div>} />
        <Route path="/cart" element={<Cart />} />
        
        <Route 
          path="/dashboard" 
          element={
            <RotaProtegida>
              <div className="p-5 text-center">
                <h1 style={{color: '#bb86fc'}}>Dashboard Protegida</h1>
                <p>Apenas usuários logados veem isso.</p>
              </div>
            </RotaProtegida>
          } 
        />

      
        <Route path="*" element={
          <div className="flex align-items-center justify-content-center" style={{height: '100vh', background: '#121212', color: 'white'}}>
            <h1>404 - Caminho incorreto</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}