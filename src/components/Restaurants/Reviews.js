import './Reviews.css';
import { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import ReviewForm from './ReviewForm';
import { useParams } from 'react-router-dom';

function Reviews(props) {
  const [reviews, setReviews] = useState();
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const params = useParams();

  console.log(reviews);

  function openReviews() {
    setReviewModalIsOpen(true);
  }

  function closeReviews() {
    setReviewModalIsOpen(false);
  }

  useEffect(() => {
    setReviews(
      props.data.reviews && Object.values(props.data.reviews).reverse()
    );
  }, [props.data.reviews]);

  async function submitReview(review) {
    console.log(JSON.stringify(review));
    await fetch(
      `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${params.id}/reviews.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(review),
      }
    );
    const response = await fetch(
      `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${params.id}/reviews.json`
    );
    const data = await response.json();
    setReviews(Object.values(data).reverse());
    closeReviews();
  }

  return (
    <>
      {reviewModalIsOpen && (
        <Modal closeModal={closeReviews}>
          <Card>
            <ReviewForm closeCart={closeReviews} submitReview={submitReview} />
          </Card>
        </Modal>
      )}
      <div className="reviews-container">
        <h1>Ratings & Reviews ({reviews ? reviews.length : '0'})</h1>
        <div className="review-actions">
          <button className="review-button" onClick={openReviews}>
            Submit Review
          </button>
        </div>

        <div className="reviews">
          {!reviews ? (
            <h3
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '4rem',
              }}
            >
              No Reviews
            </h3>
          ) : (
            reviews.map((review) => {
              return (
                <>
                  <div>
                    <h2>"{review.title}"</h2>
                    <p style={{ color: 'gray' }}>
                      {'⭐'.repeat(review.rating)} - {review.rating}/5
                    </p>
                  </div>
                  <p>"{review.body}"</p>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Reviews;
