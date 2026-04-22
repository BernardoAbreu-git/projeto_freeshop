import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const saveAndSync = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        saveAndSync(newCart);
    };

    const changeQty = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        saveAndSync(newCart);
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-page">
            <div className="cart-header-container">
                <Button icon="pi pi-arrow-left" className="p-button-text p-button-plain" onClick={() => navigate('/store')} label="Voltar para a Loja" />
                <h1 className="cart-title">Meu Carrinho</h1>
            </div>

            <div className="cart-content">
                {cartItems.length === 0 ? (
                    <div className="empty-cart-msg">
                        <i className="pi pi-shopping-cart" style={{ fontSize: '4rem', color: '#333' }}></i>
                        <h2>Seu carrinho está vazio</h2>
                        <Button label="Ir as compras" className="p-button-help mt-3" onClick={() => navigate('/store')} />
                    </div>
                ) : (
                    <div className="cart-grid">
                        <div className="items-column">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item-card">
                                    <div className="item-img-bg">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="item-info">
                                        <h4>{item.title}</h4>
                                        <p className="item-price-unit">R$ {item.price.toFixed(2)} / un</p>
                                    </div>
                                    <div className="item-controls">
                                        <div className="qty-box">
                                            <Button icon="pi pi-minus" onClick={() => changeQty(item.id, -1)} className="p-button-rounded p-button-text p-button-sm" />
                                            <span>{item.quantity}</span>
                                            <Button icon="pi pi-plus" onClick={() => changeQty(item.id, 1)} className="p-button-rounded p-button-text p-button-sm" />
                                        </div>
                                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => removeItem(item.id)} />
                                    </div>
                                    <div className="item-subtotal">
                                        R$ {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-column">
                            <div className="summary-card">
                                <h3>Resumo</h3>
                                <div className="summary-line">
                                    <span>Produtos ({cartItems.length}):</span>
                                    <span>R$ {calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="summary-line">
                                    <span>Frete:</span>
                                    <span className="free-text">Grátis</span>
                                </div>
                                <hr />
                                <div className="summary-line total">
                                    <span>Total:</span>
                                    <span>R$ {calculateTotal().toFixed(2)}</span>
                                </div>
                                <Button label="Finalizar Compra" className="p-button-help w-full mt-4" icon="pi pi-check-circle" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}