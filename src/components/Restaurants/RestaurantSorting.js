import { useState, useEffect, useRef } from 'react';
import './RestaurantSorting.css';

let selectedPrices = [];

function RestaurantSorting(props) {
  const [showingReviewsDialog, setShowingReviewsDialog] = useState(false);
  const [showingPriceDialog, setShowingPriceDialog] = useState();
  const [reviewError, setReviewError] = useState(false);
  const minReviewsRef = useRef();
  const maxReviewsRef = useRef();

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (document.getElementById('price-card')) {
        if (!document.getElementById('price-card').contains(e.target)) {
          if (
            !document
              .getElementById('price-button-container')
              .contains(e.target)
          ) {
            setShowingPriceDialog(false);
          }
        }
      }
      if (document.getElementById('reviews-card')) {
        if (!document.getElementById('reviews-card').contains(e.target)) {
          if (!document.getElementById('reviews-button').contains(e.target)) {
            setShowingReviewsDialog(false);
          }
        }
      }
    });
  }, []);

  const toggleReviews = () => {
    setShowingPriceDialog(false);
    setShowingReviewsDialog(!showingReviewsDialog);
  };
  const togglePrice = () => {
    setShowingReviewsDialog(false);
    setShowingPriceDialog(!showingPriceDialog);
  };

  function updatePrice(price) {
    const priceElement = price.target;
    if (priceElement.className === 'price-option selected') {
      priceElement.className = 'price-option';

      selectedPrices.splice(
        selectedPrices.indexOf(priceElement.textContent),
        1
      );
    } else {
      priceElement.className = 'price-option selected';
      selectedPrices = [...selectedPrices, priceElement.textContent];
    }

    props.priceSort(selectedPrices);
  }

  function countDecimals(value) {
    if (Number(value) === Math.floor(value)) {
      console.log('test');
      return 0;
    } else {
      return String(value).split('.')[1].length || 0;
    }
  }

  function checkNumber(event) {
    if (event.target.value > 5) {
      event.target.value = 5;
    }
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (countDecimals(event.target.value) > 2) {
      event.target.value = Number(event.target.value).toFixed(2);
    }
  }

  function updateReviewSorting() {
    setReviewError(false);
    if (minReviewsRef.current.value > maxReviewsRef.current.value) {
      setReviewError(true);
    } else {
      const reviewsObject = {
        min: minReviewsRef.current.value,
        max: maxReviewsRef.current.value,
      };

      props.reviewSort(reviewsObject);
    }
  }

  return (
    <div className="sorting-container">
      <h2>Sort: </h2>
      <div className="sorting-buttons">
        <div className="sort-button-container">
          <button id="reviews-button" onClick={toggleReviews}>
            Reviews <i className="fa-solid fa-angle-down"></i>
          </button>
          {showingReviewsDialog && (
            <div id="reviews-card" className="sorting-card">
              <h2>Reviews</h2>
              <div className="review-sorting">
                <h3>Min:</h3>
                <input
                  type="number"
                  onChange={checkNumber}
                  ref={minReviewsRef}
                  defaultValue={props.currentReviews.min}
                />
                <h3>Max:</h3>
                <input
                  type="number"
                  onChange={checkNumber}
                  ref={maxReviewsRef}
                  defaultValue={props.currentReviews.max}
                />
              </div>
              {reviewError && (
                <p className="error-text">
                  Minimum cannot be larger than Maximum
                </p>
              )}
              <button
                style={{ justifyContent: 'center' }}
                onClick={updateReviewSorting}
                className="review-apply-button"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div id="price-button-container" className="sort-button-container">
          <button onClick={togglePrice}>
            Price <i className="fa-solid fa-angle-down"></i>
          </button>

          {showingPriceDialog && (
            <div id="price-card" className="sorting-card">
              <h2>Price</h2>

              <div className="prices-list">
                <div
                  className={`price-option ${
                    props.currentPriceSorting.includes('$') && 'selected'
                  }`}
                  onClick={updatePrice}
                >
                  $
                </div>
                <div
                  className={`price-option ${
                    props.currentPriceSorting.includes('$$') && 'selected'
                  }`}
                  onClick={updatePrice}
                >
                  $$
                </div>
                <div
                  className={`price-option ${
                    props.currentPriceSorting.includes('$$$') && 'selected'
                  }`}
                  onClick={updatePrice}
                >
                  $$$
                </div>
                <div
                  className={`price-option ${
                    props.currentPriceSorting.includes('$$$$') && 'selected'
                  }`}
                  onClick={updatePrice}
                >
                  $$$$
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantSorting;
