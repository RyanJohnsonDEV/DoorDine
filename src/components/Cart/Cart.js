import { useContext } from 'react';
import CartContext from '../../Store/CartContext';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import './Cart.css';
import CheckoutForm from './CheckoutForm';

function Cart(props) {
  const cart = useContext(CartContext);
  let total = cart.reduce((currentTotal, item) => {
    return Math.round((item.price * item.amount + currentTotal) * 100) / 100;
  }, 0);

  function addAmount(item) {
    cart.forEach((food) => {
      if (food.id === item.id) {
        props.addAmt(item.id);
      }
    });
  }

  function subtractAmount(item) {
    cart.forEach((food) => {
      if (food.id === item.id) {
        props.subtractAmt(item.id);
      }
    });
  }

  const cartItems = cart.map((item, index) => {
    return (
      <div className="cart-item" key={item.id}>
        <div className="cart-item-info">
          <h3 className="cart-item-title">{item.name}</h3>
          <div className="item-actions">
            <div className="item-buttons">
              <button className="add-item" onClick={() => addAmount(item)}>
                +
              </button>
              <button
                className="subtract-item"
                onClick={() => subtractAmount(item)}
              >
                -
              </button>
            </div>
          </div>
          <p>
            <span className="item-amount">{item.amount}x</span>$
            <span className="item-price">
              {(Math.round(item.price * item.amount * 100) / 100).toFixed(2)}
            </span>
          </p>
        </div>
        {index !== cart.length - 1 && <hr className="hr" />}
      </div>
    );
  });

  return (
    <Modal closeModal={props.closeCart}>
      <Card className="cart-modal">
        <div className="cart-card">
          <button className="close-button" onClick={props.closeCart}>
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </button>
          <div className="cart">
            <div className="cart-items">{cartItems}</div>
            {cartItems.length === 0 && <p>No items in cart.</p>}
            <div className="total">
              <h3>Total</h3>
              <p>${total.toFixed(2)}</p>
            </div>
            <CheckoutForm clearCart={props.clearCart} />
          </div>
        </div>
      </Card>
    </Modal>
  );
}

export default Cart;
