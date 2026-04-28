import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Erro ao carregar produto!");
      });
  }, [id]);

  const addToCart = () => {
    toast.success(`${product.title} adicionado ao carrinho!`, {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark", 
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  if (!product) return <div className="loading">Carregando...</div>;

  return (
    <div className="product-container">
      <ToastContainer /> 
      
      <div className="product-image-side">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h2>{product.title}</h2>
        <p className="product-price">R$ {product.price.toFixed(2)}</p>
        
        <div className="product-description-container">
          <strong>Descrição:</strong>
          <p className="product-description">{product.description}</p>
        </div>

        <button className="buy-button" onClick={addToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}