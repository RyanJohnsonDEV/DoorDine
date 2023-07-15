import MainHeader from '../components/Layout/MainHeader';
import HomeSearch from '../components/Home/HomeSearch';
import HomeOther from '../components/Home/HomeOther';
import HomeMoreDetails from '../components/Home/HomeMoreDetails';
import Footer from '../components/Layout/Footer';
import { useEffect } from 'react';
import './Home.css';

function Home(props) {
  function setAddress(address) {
    props.address(address);
  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div>
      <MainHeader updateRestaurantList={() => {}} />
      <main className="home-main">
        <HomeSearch setAddress={setAddress} />
        <HomeOther />
        <HomeMoreDetails />
        <Footer />
      </main>
    </div>
  );
}

export default Home;
