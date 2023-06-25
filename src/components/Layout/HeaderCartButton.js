import CartContext from '../../Store/CartContext';
import './HeaderCartButton.css';
import { useContext, useEffect, useState } from 'react';

function HeaderCartButton(props) {
  const cart = useContext(CartContext);
  const [bump, setBump] = useState('');

  useEffect(() => {
    if (cart.length > 0) {
      setBump('bump');
      setTimeout(() => {
        setBump('');
      }, 300);
    }
  }, [cart]);

  return (
    <CartContext.Consumer>
      {(value) => (
        <button className={`button ${bump}`} onClick={props.showCart}>
          <span className="icon">
            <i className="fa-solid fa-cart-shopping" />
          </span>
          <span className="cart-text">Cart</span>
          <span className="badge">{value.length}</span>
        </button>
      )}
    </CartContext.Consumer>
  );
}

export default HeaderCartButton;
