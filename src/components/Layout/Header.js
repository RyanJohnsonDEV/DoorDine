import './Header.css';
import HeaderCartButton from './HeaderCartButton';
import { Link } from 'react-router-dom';

function Header(props) {
  const image = props.data.image;

  function showCart() {
    props.showCart();
  }

  return (
    <>
      <header className="header">
        <Link to={'/'} className="logo">
          <h1>
            <i className="fa-solid fa-utensils"></i> DoorDine
          </h1>
        </Link>
        <HeaderCartButton showCart={showCart} />
      </header>
      <div className="main-image">
        <img src={image} alt={props.data.name} />
      </div>
    </>
  );
}

export default Header;
