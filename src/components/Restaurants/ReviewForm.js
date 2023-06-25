import './ReviewForm.css';
import { useRef, useState } from 'react';
import useInput from '../../hooks/use-input';

function ReviewForm(props) {
  const [starClicked, setStarClicked] = useState();
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const titleRef = useRef();
  const bodyRef = useRef();
  const titleHandler = useInput((value) => value.trim() !== '');
  const bodyHandler = useInput((value) => value.trim() !== '');

  function submitForm(event) {
    event.preventDefault();
    titleHandler.setTouched(true);
    bodyHandler.setTouched(true);
    if (rating === 0) {
      setRatingError(true);
    } else {
      setRatingError(false);
    }
    if (titleHandler.isValid && bodyHandler.isValid && rating > 0) {
      props.submitReview({
        title: titleHandler.value,
        rating: Number(rating),
        body: bodyHandler.value,
      });
      titleHandler.reset();
      bodyHandler.reset();
    }
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="form-contents">
          <button className="close-button" onClick={props.closeCart}>
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </button>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              style={{ font: 'inherit', fontSize: '14px' }}
              ref={titleRef}
              className={`review-title ${titleHandler.error && 'invalid'}`}
              onChange={titleHandler.inputChangeHandler}
              onBlur={titleHandler.onBlurHandler}
              value={titleHandler.value}
            />
            {titleHandler.error && (
              <p className="error-text" style={{ marginTop: 0 }}>
                Please complete this field.
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="title">Rating</label>
            <div className="rating-group">
              <div className="form-group-stars">
                <span
                  className={starClicked === 5 && 'checked'}
                  onClick={() => {
                    setStarClicked(5);
                    setRating(5);
                  }}
                ></span>
                <span
                  className={starClicked === 4 && 'checked'}
                  onClick={() => {
                    setStarClicked(4);
                    setRating(4);
                  }}
                ></span>
                <span
                  className={starClicked === 3 && 'checked'}
                  onClick={() => {
                    setStarClicked(3);
                    setRating(3);
                  }}
                ></span>
                <span
                  className={starClicked === 2 && 'checked'}
                  onClick={() => {
                    setStarClicked(2);
                    setRating(2);
                  }}
                ></span>
                <span
                  className={starClicked === 1 && 'checked'}
                  onClick={() => {
                    setStarClicked(1);
                    setRating(1);
                  }}
                ></span>
              </div>
            </div>
            {ratingError && (
              <p className="error-text" style={{ marginTop: 0 }}>
                Please select a rating.
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="title">Review</label>
            <textarea
              rows="5"
              placeholder="Enter review.."
              ref={bodyRef}
              style={{ font: 'inherit', fontSize: '14px' }}
              className={`review-title ${bodyHandler.error && 'invalid'}`}
              onChange={bodyHandler.inputChangeHandler}
              onBlur={bodyHandler.onBlurHandler}
              value={bodyHandler.value}
            />
            {bodyHandler.error && (
              <p className="error-text" style={{ marginTop: 0 }}>
                Please complete this field.
              </p>
            )}
          </div>
        </div>
        <div>
          <button className="submit-review">Submit Review</button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
