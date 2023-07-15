import MainHeader from '../components/Layout/MainHeader';
import { useEffect, useState } from 'react';
import Restaurant from '../components/Restaurants/Restaurant';
import defaultFood from '../assets/defaultFood.jpg';
import './SelectRestaurant.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import RestaurantSorting from '../components/Restaurants/RestaurantSorting';

async function getRestaurants(
  setRestaurants,
  priceSorting,
  reviewSorting,
  setLoading
) {
  setLoading(true);
  const response = await fetch(
    'https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants.json'
  );
  const data = [...(await response.json())];

  function filterRestaurants(restaurant) {
    let foodPrice = 0;
    let count = 0;
    let priceAverageString = '';

    restaurant.meals.forEach((food) => {
      foodPrice += Number(food.price);
      count++;
    });

    const average = foodPrice / count;
    if (average < 11) {
      priceAverageString = '$';
    } else if (average > 11 && average < 16) {
      priceAverageString = '$$';
    } else if (average > 16 && average < 25) {
      priceAverageString = '$$$';
    } else {
      priceAverageString = '$$$';
    }
    if (priceSorting.length === 0) {
      return restaurant;
    } else {
      return priceSorting.includes(priceAverageString);
    }
  }

  function filterReviews(restaurant) {
    const reviews = Object.values(restaurant.reviews);
    let reviewScoreTotal = 0;
    let count = 0;
    let reviewAverage = 0;

    if (reviews.length > 0) {
      reviews.forEach((review) => {
        reviewScoreTotal += review.rating;
        count++;
      });
      reviewAverage = reviewScoreTotal / count;
    }

    return (
      reviewAverage >= reviewSorting.min && reviewAverage <= reviewSorting.max
    );
  }
  setLoading(false);
  setRestaurants(data.filter(filterRestaurants).filter(filterReviews));
}

function SelectRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [priceSorting, setPriceSorting] = useState([]);
  const [reviewSorting, setReviewSorting] = useState({ min: 0, max: 5 });
  const [restaurantContent, setRestaurantContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRestaurants(setRestaurants, priceSorting, reviewSorting, setLoading);

    document.body.style.backgroundColor = 'var(--main-bg-color)';
    document.documentElement.style.backgroundColor = 'var(--main-bg-color)';
  }, [priceSorting, reviewSorting]);

  useEffect(() => {
    setRestaurantContent(
      restaurants.map((restaurant, index) => {
        return (
          <Link
            to={`${restaurant.id}`}
            className="restaurant-listing"
            key={index}
          >
            <Restaurant
              title={restaurant.name}
              img={restaurant.image !== '' ? restaurant.image : defaultFood}
              food={restaurant.meals}
              reviews={restaurant.reviews}
              tags={restaurant.tags}
            />
          </Link>
        );
      })
    );
  }, [restaurants]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  function updatePriceSorting(prices) {
    setPriceSorting([...prices]);
  }
  function updateReviewSorting(reviews) {
    setReviewSorting(reviews);
  }

  function fetchRestaurantsFromProps() {
    getRestaurants(setRestaurants, priceSorting, reviewSorting);
  }

  return (
    <>
      <div>
        <MainHeader updateRestaurantList={fetchRestaurantsFromProps} />
        <RestaurantSorting
          priceSort={updatePriceSorting}
          currentPriceSorting={priceSorting}
          reviewSort={updateReviewSorting}
          currentReviews={reviewSorting}
        />
        {loading && <p className="loading-meals-text">Loading...</p>}
        <div className="restaurant-list">{restaurantContent}</div>
        <Footer />
      </div>
    </>
  );
}

export default SelectRestaurant;
