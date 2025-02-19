import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import toast from 'react-hot-toast';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      //quantity: 1
    }));
    
    // Show success notification
    toast.success(`${product.title} added to cart!`, {
      position: 'bottom-right',
      className: 'cart-toast'
    });

    // Visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
        </div>
        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="product-rating">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </div>
          )}
        </div>
      </Link>
      
      <motion.button
        className={`product-card__button ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdded}
        whileTap={{ scale: 0.95 }}
        animate={isAdded ? { backgroundColor: "#4CAF50" } : {}}
      >
        {isAdded ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ✓ Added!
          </motion.span>
        ) : (
          'Add to Cart'
        )}
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;