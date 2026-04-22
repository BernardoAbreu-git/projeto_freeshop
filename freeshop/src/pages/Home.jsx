import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <section className="hero-banner">
                <div className="hero-content">
                    <h1>Ofertas do dia e frete grátis</h1>
                    <p>Confira as melhores promoções de eletrônicos e moda.</p>
                    <Button 
                        label="Ir para a Loja" 
                        icon="pi pi-shopping-bag" 
                        className="p-button-warning p-button-raised"
                        onClick={() => navigate('/store')} 
                    />
                </div>
            </section>

            <div className="categories-bar shadow-1">
                <div className="category-item"><i className="pi pi-mobile"></i><span>Tecnologia</span></div>
                <div className="category-item"><i className="pi pi-home"></i><span>Hogar</span></div>
                <div className="category-item"><i className="pi pi-car"></i><span>Veículos</span></div>
                <div className="category-item"><i className="pi pi-heart"></i><span>Moda</span></div>
            </div>

            <section className="featured-section">
                <h3>Inspirado no último que você viu</h3>
                <div className="featured-placeholder">
                    <p>Aqui você pode listar alguns produtos em destaque...</p>
                    <Button label="Ver todos os produtos" link onClick={() => navigate('/store')} />
                </div>
            </section>
        </div>
    );
}