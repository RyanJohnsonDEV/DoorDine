import './Restaurant.css';
import { useState, useEffect } from 'react';

function Restaurant(props) {
  const [priceAverage, setPriceAverage] = useState();
  const reviews = Object.values(props.reviews);
  const tags = Object.keys(props.tags).reduce((acc, curr) => `${acc}, ` + curr);
  const [reviewsAverage, setReviewsAverage] = useState();
  let reviewScoreTotal = 0;
  let count = 0;

  function getReviewAverage() {
    if (reviews) {
      reviews.forEach((review) => {
        reviewScoreTotal += review.rating;
        count++;
      });
      setReviewsAverage(reviewScoreTotal / count);
    }
  }

  function getPriceAverage() {
    let foodPriceTotal = 0;
    let count = 0;

    props.food.forEach((food) => {
      foodPriceTotal += Number(food.price);
      count++;
    });

    const average = foodPriceTotal / count;
    console.log(average);

    if (average < 11) {
      setPriceAverage('$');
    } else if (average > 11 && average < 16) {
      setPriceAverage('$$');
    } else if (average > 16 && average < 25) {
      setPriceAverage('$$$');
    } else {
      setPriceAverage('$$$');
    }
  }

  useEffect(() => {
    getPriceAverage();
    getReviewAverage();
  }, [props]);

  return (
    <>
      <div className="restaurant-container">
        <img src={props.img} alt="" className="restaurant-image" />
        <div>
          <h2>{props.title}</h2>
          <div className="restaurant-description">
            <p>
              {priceAverage} • {tags}
            </p>
            {props.reviews !== '' ? (
              <p>
                {reviewsAverage && reviewsAverage.toFixed(2)}★ (
                {reviews && reviews.length} review
                {reviews.length && 's'})
              </p>
            ) : (
              'No reviews available'
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurant;
