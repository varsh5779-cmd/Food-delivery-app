import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { state } = useApp();
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <i className="fas fa-utensils"></i>
            Foodie
          </Link>
        </div>
        
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i>
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}
          >
            <i className="fas fa-utensils"></i>
            Menu
          </Link>
          <Link 
            to="/wishlist" 
            className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
          >
            <i className="fas fa-heart"></i>
            Wishlist
            {state.wishlist.length > 0 && (
              <span className="badge">{state.wishlist.length}</span>
            )}
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            <i className="fas fa-shopping-cart"></i>
            Cart
            {state.cart.length > 0 && (
              <span className="badge">{state.cart.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;