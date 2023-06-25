import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
import { useState } from 'react';

function Meals(props) {
  function setCart(cart) {
    props.cart(cart);
  }

  const [kitchenName, setKitchenName] = useState(null);

  function setKitchen(name) {
    setKitchenName(name);
  }

  return (
    <>
      <MealsSummary setKitchen={setKitchen} />
      <AvailableMeals setCart={setCart} kitchenName={kitchenName} />
    </>
  );
}

export default Meals;
