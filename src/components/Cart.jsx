// src/components/Cart.js
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useApp();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.1; // 10% tax
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateTax();
  };

  const handleCheckout = () => {
    // Show payment success
    setShowPaymentSuccess(true);
    // Clear cart after 3 seconds using SET_CART action
    setTimeout(() => {
      setShowPaymentSuccess(false);
      // Clear the cart using SET_CART action
      dispatch({ type: 'SET_CART', payload: [] });
    }, 3000);
  };

  if (showPaymentSuccess) {
    return (
      <div className="payment-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your order. Your food will be delivered soon.</p>
            <p>Order ID: #{(Math.random() * 1000000).toFixed(0)}</p>
            <Link to="/menu" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (state.cart.length === 0) {
    return (
      <div className="cart empty-state">
        <div className="container">
          <div className="empty-content">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to your cart</p>
            <Link to="/menu" className="btn btn-primary">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1>My Cart</h1>
          <p>{state.cart.length} items in cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {state.cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="price">${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateFinalTotal().toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              <i className="fas fa-credit-card"></i>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;