import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../../store/authSlice'; // Import login action
import API from '../../services/api';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token
      dispatch(login({
        email: user.email, username: user.username,
        token: ''
      })); // Dispatch login action
      navigate('/'); // Redirect to homepage
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__form">
        <h1 className="login-page__title">Sign In</h1>
        {error && <p className="login-page__error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-page__button">
            Login
          </button>
        </form>
        <p className="login-page__register-link">
          Don’t have an account? <Link to="/register"><strong>Register here</strong></Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;