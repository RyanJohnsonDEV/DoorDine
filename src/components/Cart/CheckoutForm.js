import './CheckoutForm.css';
import useInput from '../../hooks/use-input';
import { useContext, useState } from 'react';
import CartContext from '../../Store/CartContext';

function CheckoutForm(props) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useContext(CartContext);
  const nameHandler = useInput((value) => value.trim() !== '');
  const addressHandler = useInput((value) => value.trim() !== '');
  const cityHandler = useInput((value) => value.trim() !== '');
  const stateHandler = useInput(
    (value) => value.trim() !== '' && value.trim().length >= 2
  );
  const zipHandler = useInput(
    (value) => value.trim() !== '' && value.trim().length >= 5
  );
  const cardHandler = useInput(
    (value) => value.trim() !== '' && value.trim().length >= 15
  );
  const dateHandler = useInput((value) => value.trim() !== '');
  const cvvHandler = useInput(
    (value) => value.trim() !== '' && value.trim().length >= 3
  );

  function submitHandler(event) {
    event.preventDefault();

    nameHandler.setTouched(true);
    addressHandler.setTouched(true);
    cityHandler.setTouched(true);
    stateHandler.setTouched(true);
    zipHandler.setTouched(true);
    cardHandler.setTouched(true);
    dateHandler.setTouched(true);
    cvvHandler.setTouched(true);
    if (
      nameHandler.isValid &&
      addressHandler.isValid &&
      cityHandler.isValid &&
      stateHandler.isValid &&
      zipHandler.isValid &&
      cardHandler.isValid &&
      dateHandler.isValid &&
      cvvHandler.isValid
    ) {
      if (cart.length === 0) {
        setError('Cart is empty');
      } else {
        const order = [
          {
            order: cart,
            name: nameHandler.value,
            address: addressHandler.value,
            city: cityHandler.value,
            state: stateHandler.value,
            zip: zipHandler.value,
            cardNum: cardHandler.value,
            date: dateHandler.value,
            cvv: cvvHandler.value,
          },
        ];
        sendOrder(order);
        console.log(cart, [
          nameHandler.value,
          addressHandler.value,
          cityHandler.value,
          stateHandler.value,
          zipHandler.value,
          cardHandler.value,
          dateHandler.value,
          cvvHandler.value,
        ]);
      }
    }
  }

  async function sendOrder(order) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Orders.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(...order),
        }
      );

      const result = await response.json();
      console.log('Success:', result);
      setIsLoading(false);
      props.clearCart();
      nameHandler.reset();
      addressHandler.reset();
      cityHandler.reset();
      stateHandler.reset();
      zipHandler.reset();
      cardHandler.reset();
      dateHandler.reset();
      cvvHandler.reset();
      setSuccess(true);
      setError('');
    } catch (error) {
      console.error('Error:', error.toString());
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="orderForm">
        <div>
          <p className="label">Your Name</p>
          <input
            type="text"
            className={`nameInput ${nameHandler.error && 'invalid'}`}
            onChange={nameHandler.inputChangeHandler}
            onBlur={nameHandler.onBlurHandler}
            value={nameHandler.value}
          ></input>
          {nameHandler.error && (
            <p className="error-text">Please complete this field.</p>
          )}
        </div>
        <hr className="formHR" />
        <div className="addressGroup">
          <div className="addressInput">
            <p className="label">Billing Address</p>
            <input
              type="text"
              className={`addressInput ${addressHandler.error && 'invalid'}`}
              onChange={addressHandler.inputChangeHandler}
              onBlur={addressHandler.onBlurHandler}
              value={addressHandler.value}
            ></input>
            {addressHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
          <div className="cityInput">
            <p className="label">City</p>
            <input
              type="text"
              className={`cityInput ${cityHandler.error && 'invalid'}`}
              onChange={cityHandler.inputChangeHandler}
              onBlur={cityHandler.onBlurHandler}
              value={cityHandler.value}
            ></input>
            {cityHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
          <div className="stateInput">
            <p className="label">State</p>
            <input
              type="text"
              maxLength={2}
              className={`stateInput ${stateHandler.error && 'invalid'}`}
              onChange={stateHandler.inputChangeHandler}
              onBlur={stateHandler.onBlurHandler}
              value={stateHandler.value}
            ></input>
            {stateHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
          <div className="zipInput">
            <p className="label">Zip Code</p>
            <input
              type="text"
              maxLength={9}
              className={`zipInput ${zipHandler.error && 'invalid'}`}
              onChange={zipHandler.inputChangeHandler}
              onBlur={zipHandler.onBlurHandler}
              value={zipHandler.value}
            ></input>
            {zipHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
        </div>
        <hr className="formHR" />
        <div className="cardGroup">
          <div className="cardNumber">
            <p className="label">Card Number</p>
            <input
              type="text"
              maxLength={16}
              className={`cardInput ${cardHandler.error && 'invalid'}`}
              onChange={cardHandler.inputChangeHandler}
              onBlur={cardHandler.onBlurHandler}
              value={cardHandler.value}
            ></input>
            {cardHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
          <div className="expDate">
            <p className="label">Exp Date</p>
            <input
              type="date"
              className={`dateInput ${dateHandler.error && 'invalid'}`}
              onChange={dateHandler.inputChangeHandler}
              onBlur={dateHandler.onBlurHandler}
              value={dateHandler.value}
            ></input>
            {dateHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
          <div>
            <p className="label">CVV</p>
            <input
              type="text"
              maxLength={3}
              className={`cvvNumber ${cvvHandler.error && 'invalid'}`}
              onChange={cvvHandler.inputChangeHandler}
              onBlur={cvvHandler.onBlurHandler}
              value={cvvHandler.value}
            ></input>
            {cvvHandler.error && (
              <p className="error-text">Please complete this field.</p>
            )}
          </div>
        </div>
      </div>
      <div className="actions">
        <button type="button" onClick={() => props.clearCart()}>
          Clear Cart
        </button>
        <button type="submit">Checkout</button>
        {success && !isLoading && <p className="success">Order Submitted!</p>}
        {isLoading && <p>Sending Order...</p>}
        {error !== '' && <p className="error-text">{error}</p>}
      </div>
    </form>
  );
}

export default CheckoutForm;
