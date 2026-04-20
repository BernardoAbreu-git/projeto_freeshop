import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Erro na API", err));
  }, []);

  if (loading) return <div className="text-center mt-8">Carregando produtos...</div>;

  return (
    <div className="home-container">
      <div className="product-grid">
        {products.map(product => (
          <Card 
            key={product.id}
            title={<span className="product-title-text">{product.title}</span>}
            subTitle={<span className="product-price-text">R$ {product.price.toFixed(2)}</span>}
            header={<img alt={product.title} src={product.image} className="product-card-img" />}
            className="product-card shadow-1"
          >
            <div className="flex flex-column gap-2">
              <Button 
                label="Ver Detalhes" 
                icon="pi pi-search"
                className="p-button-outlined p-button-info w-full"
                onClick={() => navigate(`/products/${product.id}`)} 
              />
              <Button 
                label="Adicionar" 
                icon="pi pi-shopping-cart"
                className="p-button-primary w-full" 
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}