import './HomeMoreDetails.css';
import eatingGroup1 from '../../assets/eatingGroup1.jpg';
import eatingGroup2 from '../../assets/eatingGroup2.jpg';
import { Link } from 'react-router-dom';

function HomeMoreDetails() {
  return (
    <div className="home-more-info">
      <div className="home-info-block">
        <div className="home-info-text">
          <h1>
            It’s all here.
            <br />
            All in one place.
          </h1>
          <p>
            Discover local, on-demand delivery or Pickup from restaurants,
            nearby grocery and convenience stores, and more.
          </p>
          <Link to={'/'}>
            <button>Get The App</button>
          </Link>
        </div>
        <img src={eatingGroup1} alt="People eating food" />
      </div>
      <div className="home-info-block2">
        <img src={eatingGroup2} alt="People eating food" />
        <div className="home-info-text second-info">
          <h1>Every Flavor Welcome</h1>
          <p>
            From your neighborhood sushi spot to the burger and fries you crave,
            choose from over 300,000 local and national favorites across the
            U.S., Canada and Australia.
          </p>
          <Link to={'Restaurants'}>
            {' '}
            <button>Find Restaurants</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeMoreDetails;
