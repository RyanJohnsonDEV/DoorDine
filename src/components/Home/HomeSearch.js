import './HomeSearch.css';
import image from '../../assets/searchBanner.png';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useContext, useEffect } from 'react';
import AddressContext from '../../Store/AddressContext';

function HomeSearch(props) {
  const inputRef = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const address = useContext(AddressContext);
  console.log(address.address);

  function inputSubmit() {
    if (address.address === '') {
      let text = '';
      try {
        text = inputRef.current.value;
      } catch (error) {
        console.log(error);
      }

      if (text !== '') {
        setError('');
        props.setAddress(text);
        window.localStorage.setItem('address', text);
        navigate('/Restaurants');
      } else {
        setError('Please enter a valid address');
      }
    } else {
      navigate('/Restaurants');
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    document.documentElement.style.backgroundColor = 'white';
  }, []);

  function clearAddress() {
    props.setAddress('');
    window.localStorage.removeItem('address');
  }

  function keyDownHandler(event) {
    if (event.key === 'Enter') {
      inputSubmit();
    }
  }

  return (
    <div className="home-header">
      <div className="header-container">
        <div>
          <h1 className="header-title">Order delicious food to your door</h1>
        </div>
        <div className="input-container">
          {address.address === '' && (
            <div className="inputAndButton">
              <input
                type="text"
                placeholder="Enter delivery address"
                className="address-input"
                onKeyDown={keyDownHandler}
                ref={inputRef}
              />

              <button className="address-button" onClick={inputSubmit}>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
          {address.address !== '' && (
            <div className="address-container">
              <div className="addressAndButton">
                <p>Selected Address: {address.address}</p>
                <button className="submit-button" onClick={inputSubmit}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <p className="change-address" onClick={clearAddress}>
                Change address?
              </p>
            </div>
          )}
        </div>
        {error !== '' && <p className="home-error-text">{error}</p>}
      </div>
      <img src={image} alt="" className="search-bg" draggable={false} />
    </div>
  );
}

export default HomeSearch;
