import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    removeFromWishlist(item.id);
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="wishlist empty-state">
        <div className="container">
          <div className="empty-content">
            <i className="fas fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add some delicious items to your wishlist</p>
            <Link to="/menu" className="btn btn-primary">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{state.wishlist.length} items in wishlist</p>
        </div>

        <div className="wishlist-grid">
          {state.wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} />
              <div className="item-info">
                <h3>{item.title}</h3>
                <p className="price">${item.price}</p>
                <div className="item-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;