// src/components/FoodCard.js
import React from 'react';

const FoodCard = ({ item, onAddToWishlist, onAddToCart, isInWishlist }) => {
  return (
    <div className="food-card">
      <div className="food-image">
        <img src={item.image} alt={item.title} />
        <button
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={() => onAddToWishlist(item)}
        >
          <i className={`fas ${isInWishlist ? 'fa-heart' : 'fa-heart'}`}></i>
        </button>
      </div>
      
      <div className="food-info">
        <h3>{item.title}</h3>
        <p className="food-description">{item.description}</p>
        <div className="food-meta">
          <div className="rating">
            <i className="fas fa-star"></i> {item.rating}
          </div>
          <div className="price">${item.price}</div>
        </div>
        
        <div className="food-actions">
          <button
            className="btn btn-primary add-to-cart"
            onClick={() => onAddToCart(item)}
          >
            <i className="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
          <button
            className={`btn wishlist-btn-full ${isInWishlist ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => onAddToWishlist(item)}
          >
            <i className={`fas ${isInWishlist ? 'fa-heart' : 'fa-heart'}`}></i>
            {isInWishlist ? 'In Wishlist' : 'Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;