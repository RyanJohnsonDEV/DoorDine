import Card from '../UI/Card';
import './AvailableMeals.css';
import MealItem from './MealItem';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../Store/CartContext';

let meals = [];
let cartItems;

function AvailableMeals(props) {
  const [mealsList, setMealsList] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const kitchenName = props.kitchenName;
  cartItems = useContext(CartContext);

  async function getMeals() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${kitchenName}/meals.json`
      );
      meals = [...(await response.json())];
      setMealsList(
        meals.map((meal, index) => {
          function addItem(id, amount) {
            function getMeal(meal) {
              return meal.id === id;
            }

            const currentMeal = meals.find(getMeal);
            if (cartItems.find((item) => item.id === id)) {
              cartItems.find((item) => item.id === id).amount += Number(amount);
            } else {
              cartItems.push({
                key: `cart_${id}`,
                id: id,
                amount: Number(amount),
                name: currentMeal.name,
                price: currentMeal.price,
              });
            }
            props.setCart(cartItems);
          }
          return (
            <li key={meal.id}>
              <MealItem
                id={meal.id}
                name={meal.name}
                desc={meal.description}
                price={meal.price}
                addItem={addItem}
              />
              {index !== meals.length - 1 && <hr />}
            </li>
          );
        })
      );
    } catch (error) {
      setError('No restaurant found.');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (kitchenName) {
      getMeals();
    }
  }, [kitchenName]);

  return (
    <section className="meals">
      <Card>
        {loading && (
          <p style={{ color: 'black', textAlign: 'center' }}>Loading...</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="available-meals">{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
