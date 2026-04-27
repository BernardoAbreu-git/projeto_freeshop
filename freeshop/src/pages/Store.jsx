import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './Store.css';

export default function Store() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null); 

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const index = cart.findIndex(item => item.id === product.id);
    
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

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
    <div className="store-container">
      
      <Toast ref={toast} />
    <Button 
  icon="pi pi-shopping-cart" 
  onClick={() => navigate('/cart')} 
  className="p-button-rounded"
  badgeClassName="p-badge-danger"
  style={{
    backgroundColor: '#985ce2',
    border: 'none',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000
  }}
/>

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
                onClick={() => {
                  addToCart(product);
                  toast.current.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `${product.title} foi adicionado ao carrinho!`,
                    life: 3000
                  });
                }} 
              />

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}