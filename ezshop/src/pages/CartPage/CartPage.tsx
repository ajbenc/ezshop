import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import './CartPage.scss';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">
        <FaShoppingBag className="cart-icon" /> Your Cart
      </h1>
      
      <div className="cart-page__items">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="cart-item"
            >
              <div className="cart-item__info">
                <h3 className="cart-item__title">{item.title}</h3>
                <p className="cart-item__price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item__controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                    className="cart-item__quantity"
                  />
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="cart-item__remove"
                  onClick={() => handleRemoveFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="cart-page__summary">
        <div className="total-section">
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="cart-page__checkout" onClick={handleClearCart}>
            <FaShoppingBag /> Check Out Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;