import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import toast from 'react-hot-toast';
import './ProductDetailsPage.scss';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        ...product,
        //quantity: 1
      }));
      
      toast.success(`${product.title} added to cart!`, {
        position: 'bottom-right',
        className: 'cart-toast'
      });
    }
  };

  if (!product) return <div className="loading">Loading product details...</div>;

  return (
    <div className="product-details">
      <div className="product-details__image-container">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-details__image"
          loading="lazy"
        />
      </div>
      <div className="product-details__info">
        <h1 className="product-details__title">{product.title}</h1>
        <p className="product-details__price">${product.price.toFixed(2)}</p>
        <p className="product-details__description">{product.description}</p>
        
        {product.rating && (
          <div className="product-rating">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </div>
        )}

        <button 
          className="product-details__button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;