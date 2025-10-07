import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  restaurants: [],
  menuItems: [],
  wishlist: [],
  cart: [],
  loading: false
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.payload };
    
    case 'SET_MENU_ITEMS':
      return { ...state, menuItems: action.payload };
    
    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
      if (existingWishlistItem) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(item => item.id !== action.payload) 
      };
    
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload) 
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    // Add this case to your existing reducer
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};