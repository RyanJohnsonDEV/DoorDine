import './MainHeader.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AddressContext from '../../Store/AddressContext';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import AddRestaurantForm from '../Restaurants/AddRestaurantForm';

function MainHeader(props) {
  const addressContext = useContext(AddressContext);
  const [addRestaurantModalIsOpen, setAddRestaurantModalIsOpen] = useState();

  function openAddRestaurant() {
    setAddRestaurantModalIsOpen(true);
  }

  function closeAddRestaurant() {
    setAddRestaurantModalIsOpen(false);
  }

  function updateRestaurantList() {
    props.updateRestaurantList();
  }

  return (
    <>
      {addRestaurantModalIsOpen && (
        <Modal closeModal={closeAddRestaurant}>
          <Card>
            <AddRestaurantForm
              closeModal={closeAddRestaurant}
              refreshRestaurants={updateRestaurantList}
            />
          </Card>
        </Modal>
      )}
      <header className="header">
        <Link to={'/'} className="logo">
          <h1>
            <i className="fa-solid fa-utensils"></i> DoorDine
          </h1>
        </Link>
        <div className="header-address">
          {addressContext.address.trim() !== '' && (
            <h3>Ordering to: {addressContext.address}</h3>
          )}
        </div>
        <button className="add-restaurant-button" onClick={openAddRestaurant}>
          Add New Restaurant
        </button>
      </header>
      <header className="header-address-bar">
        {addressContext.address.trim() !== '' && (
          <h3>Ordering to: {addressContext.address}</h3>
        )}
      </header>
    </>
  );
}

export default MainHeader;
