import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { foodAPI } from '../services/api';

const Home = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const fetchRestaurants = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const restaurants = await foodAPI.getRestaurants();
        dispatch({ type: 'SET_RESTAURANTS', payload: restaurants });
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchRestaurants();
  }, [dispatch]);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Craving something delicious?</h1>
            <p>Order food from the best restaurants near you</p>
            <Link to="/menu" className="btn btn-primary">
              Order Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-restaurants">
        <div className="container">
          <h2>Popular Restaurants</h2>
          {state.loading ? (
            <div className="loading">Loading restaurants...</div>
          ) : (
            <div className="restaurant-grid">
              {state.restaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-card">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p className="cuisine">{restaurant.cuisine}</p>
                    <div className="restaurant-meta">
                      <span className="rating">
                        <i className="fas fa-star"></i> {restaurant.rating}
                      </span>
                      <span className="delivery-time">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <i className="fas fa-bolt"></i>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in 30 minutes</p>
            </div>
            <div className="feature">
              <i className="fas fa-shield-alt"></i>
              <h3>Safe Delivery</h3>
              <p>Contactless delivery for your safety</p>
            </div>
            <div className="feature">
              <i className="fas fa-tags"></i>
              <h3>Best Offers</h3>
              <p>Great discounts and offers every day</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;