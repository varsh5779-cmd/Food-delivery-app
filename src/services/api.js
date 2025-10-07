// src/services/api.js
export const foodAPI = {
  getMenuItems: async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strArea + ' - ' + meal.strCategory,
      price: (Math.random() * 10 + 5).toFixed(2),
      rating: (Math.random() * 2 + 3).toFixed(1),
      image: meal.strMealThumb
    }));
  }
};
