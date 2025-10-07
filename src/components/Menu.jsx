// src/components/Menu.js
import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { foodAPI } from '../services/api';
import FoodCard from './FoodCard';

const Menu = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const fetchMenuItems = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const menuItems = await foodAPI.getMenuItems();
        dispatch({ type: 'SET_MENU_ITEMS', payload: menuItems });
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchMenuItems();
  }, [dispatch]);

  const addToWishlist = (item) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <div className="menu">
      <div className="container">
        <div className="menu-header">
          <h1>Our Menu</h1>
          <p>Discover our delicious food items</p>
        </div>

        {state.loading ? (
          <div className="loading">Loading menu items...</div>
        ) : (
          <div className="menu-grid">
            {state.menuItems.map(item => (
              <FoodCard
                key={item.id}
                item={item}
                onAddToWishlist={addToWishlist}
                onAddToCart={addToCart}
                isInWishlist={state.wishlist.some(wishItem => wishItem.id === item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;