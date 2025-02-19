import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user } = useSelector((state: RootState) => state.auth); // Get user from Redux
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">ezshop</Link>
      
      <form className="navbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul className="navbar__links">
        <li><Link to="/products">Products</Link></li>
        <li className="cart-link">
          <Link to="/cart" className="cart-icon-wrapper">
            <FaShoppingCart className="cart-icon" />
            {cartItems.length > 0 && (
              <span className="cart-counter">{cartItems.length}</span>
            )}
          </Link>
        </li>
        {user ? (
          <li>
            <span>Welcome, {user.username}</span> {/* Display username */}
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;