import useInput from '../../hooks/use-input';
import { useState } from 'react';
import './AddRestaurantForm.css';

function AddRestaurantForm(props) {
  const [menuItems, setMenuItems] = useState([]);

  //Menu item inputs
  const mealNameInput = useInput((value) => value.trim() !== '');
  const mealPriceInput = useInput((value) => value.trim() !== '');
  const mealDescriptionInput = useInput((value) => value.trim() !== '');

  //The main inputs
  const restaurantNameInput = useInput((value) => value.trim() !== '');
  const restaurantDescriptionInput = useInput((value) => value.trim() !== '');
  const restaurantImageInput = useInput((value) => value.trim() !== '');
  const restaurantTagsInput = useInput((value) => value.trim() !== '');

  async function addRestaurant(event) {
    event.preventDefault();
    restaurantNameInput.setTouched(true);
    restaurantDescriptionInput.setTouched(true);
    restaurantImageInput.setTouched(true);
    restaurantTagsInput.setTouched(true);

    const tags = restaurantTagsInput.value.includes(',')
      ? restaurantTagsInput.value.split(', ')
      : restaurantTagsInput.value.split(' ');
    if (
      restaurantNameInput.isValid &&
      restaurantDescriptionInput.isValid &&
      restaurantImageInput.isValid &&
      restaurantTagsInput.isValid &&
      menuItems.length > 0
    ) {
      const response = await fetch(
        'https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants.json'
      );
      const data = await response.json();
      const restaurant = {
        name: restaurantNameInput.value,
        description: restaurantDescriptionInput.value,
        image: restaurantImageInput.value,
        meals: menuItems,
        id: data.length,
        reviews: '',
        tags: { [tags[0]]: '', [tags[1]]: '' },
      };
      const restaurantList = [...data, restaurant];
      await fetch(
        `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(restaurantList),
        }
      );
      props.refreshRestaurants();
      props.closeModal();
    }
  }

  function addMeal() {
    mealNameInput.setTouched(true);
    mealPriceInput.setTouched(true);
    mealDescriptionInput.setTouched(true);
    if (
      mealNameInput.isValid &&
      mealPriceInput.isValid &&
      mealDescriptionInput.isValid
    ) {
      setMenuItems((prevMenuItems) => [
        ...prevMenuItems,
        {
          name: mealNameInput.value,
          price: mealPriceInput.value,
          description: mealDescriptionInput.value,
          id: prevMenuItems.length + 1,
        },
      ]);
      mealNameInput.reset();
      mealPriceInput.reset();
      mealDescriptionInput.reset();
    }
  }

  return (
    <form onSubmit={addRestaurant} className="add-restaurant-form">
      <div>
        <div className="form-group">
          <label htmlFor="Restaurant Name">Restaurant Name</label>
          <input
            type="text"
            className={`restaurant-name-input ${
              restaurantNameInput.error && 'invalid'
            }`}
            onChange={restaurantNameInput.inputChangeHandler}
            onBlur={restaurantNameInput.onBlurHandler}
            value={restaurantNameInput.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Restaurant Description">Restaurant Description</label>
          <textarea
            rows={3}
            className={`restaurant-description-input ${
              restaurantDescriptionInput.error && 'invalid'
            }`}
            onChange={restaurantDescriptionInput.inputChangeHandler}
            onBlur={restaurantDescriptionInput.onBlurHandler}
            value={restaurantDescriptionInput.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Menu">Menu</label>
          <div className="menu-input-group">
            <input
              type="text"
              placeholder="Name"
              className={`meal-name-input ${mealNameInput.error && 'invalid'}`}
              onChange={mealNameInput.inputChangeHandler}
              value={mealNameInput.value}
            />
            <input
              type="number"
              placeholder="Price"
              className={`meal-price-input ${
                mealPriceInput.error && 'invalid'
              }`}
              onChange={mealPriceInput.inputChangeHandler}
              value={mealPriceInput.value}
            />
            <input
              type="text"
              placeholder="Description"
              className={`meal-description-input ${
                mealDescriptionInput.error && 'invalid'
              }`}
              onChange={mealDescriptionInput.inputChangeHandler}
              value={mealDescriptionInput.value}
            />
            <button type="button" onClick={addMeal}>
              +
            </button>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item, idx) => {
              function removeMeal() {
                setMenuItems((prevMenuItems) =>
                  prevMenuItems.filter((item, index) => index !== idx)
                );
              }

              return (
                <div className="form-menu-item">
                  {item.name} | ${Number(item.price).toFixed(2)}
                  <div className="delete-menu-item" onClick={removeMeal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Restaurant Image URL">Restaurant Image URL</label>
          <input
            type="text"
            className={`restaurant-image-input ${
              restaurantImageInput.error && 'invalid'
            }`}
            onChange={restaurantImageInput.inputChangeHandler}
            onBlur={restaurantImageInput.onBlurHandler}
            value={restaurantImageInput.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Tags">Tags</label>
          <input
            type="text"
            className={`restaurant-tags-input ${
              restaurantTagsInput.error && 'invalid'
            }`}
            onChange={restaurantTagsInput.inputChangeHandler}
            onBlur={restaurantTagsInput.onBlurHandler}
            value={restaurantTagsInput.value}
          />
        </div>
      </div>
      <div className="submit-restaurant-button-container">
        <button className="submit-restaurant-button">Add Restaurant</button>
      </div>
    </form>
  );
}

export default AddRestaurantForm;
