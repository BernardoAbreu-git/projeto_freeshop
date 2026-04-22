import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('Visitante');

    useEffect(() => {
        const storedName = localStorage.getItem('user_name');
        if (storedName) setUserName(storedName);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); 
    };

    return (
        <div className="home-container">
            
            <header className="home-header">
                <span className="logo">FAKE-STORE</span>
                <div className="user-info">
                    <span>Olá, <strong>{userName}</strong></span>
                    <Button icon="pi pi-sign-out" className="p-button-rounded p-button-text" onClick={handleLogout} />
                </div>
            </header>

            <section className="hero-banner">
                <div className="hero-content">
                    <h1>Ofertas para você, {userName}!</h1>
                    <p>Frete grátis em toda a seção de tecnologia.</p>
                    <Button label="Ver Loja" className="p-button-warning" onClick={() => navigate('/store')} />
                </div>
            </section>
            
            
        </div>
    );
}