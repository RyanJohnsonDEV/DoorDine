import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../Store/CartContext';
import Cart from '../Cart/Cart';
import Header from '../Layout/Header';
import Meals from '../Meals/Meals';
import Reviews from '../Restaurants/Reviews';
import './Ordering.css';

function Ordering() {
  const [newCart, updateCart] = useState([]);
  const [cartisShown, updateCartIsShown] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const params = useParams();

  async function getKitchenDetails() {
    try {
      const response = await fetch(
        `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${params.id}.json`
      );
      const data = await response.json();
      setRestaurantData(data);
    } catch {
      setRestaurantData('Error');
    }
  }

  useEffect(() => {
    getKitchenDetails();
  }, []);

  function setCart(cart) {
    updateCart([...cart]);
  }

  function addAmt(id) {
    const cartAdd = [...newCart];
    cartAdd.forEach((food) => {
      if (food.id === id) {
        food.amount += 1;
        updateCart([...cartAdd]);
      }
    });
  }

  function subtractAmt(id) {
    const cartSubtract = [...newCart];
    cartSubtract.forEach((food) => {
      if (food.id === id) {
        if (food.amount !== 0) {
          food.amount -= 1;
          updateCart([...cartSubtract]);
        }
      }
    });
  }

  function showCart() {
    updateCartIsShown(true);
  }

  function closeCart() {
    updateCartIsShown(false);
  }

  function clearCart() {
    updateCart([]);
  }

  return (
    <CartContext.Provider value={newCart}>
      <div className="ordering">
        {cartisShown && (
          <Cart
            closeCart={closeCart}
            addAmt={addAmt}
            subtractAmt={subtractAmt}
            clearCart={clearCart}
          />
        )}
        <Header showCart={showCart} data={restaurantData} />
        <Meals cart={setCart} />
        <Reviews data={restaurantData} />
      </div>
    </CartContext.Provider>
  );
}

export default Ordering;
