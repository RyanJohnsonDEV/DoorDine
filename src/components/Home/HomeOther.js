import store from '../../assets/store.png';
import driver from '../../assets/driver.png';
import app from '../../assets/app.png';
import InfoBlockSmall from './InfoBlockSmall';
import './HomeOther.css';

const infoBlockSmallDetails = [
  {
    img: driver,
    title: 'Join the Team',
    description:
      "As a delivery driver, you'll make reliable money—working anytime, anywhere.",
    link: '/',
    linkTitle: 'Start earning →',
  },
  {
    img: store,
    title: 'Become a Partner',
    description:
      'Grow your business and reach new customers by partnering with us.',
    link: '/',
    linkTitle: 'Sign up your store →',
  },
  {
    img: app,
    title: 'Try the App',
    description:
      'Experience the best your neighborhood has to offer, all in one app.',
    link: '/',
    linkTitle: 'Get the app →',
  },
];

const homeOtherContents = infoBlockSmallDetails.map((block) => {
  return (
    <div className="home-other-container" key={block.title}>
      <div className="block-small">
        <InfoBlockSmall
          img={block.img}
          title={block.title}
          description={block.description}
          link={block.link}
          linkTitle={block.linkTitle}
        />
      </div>
    </div>
  );
});

function HomeOther() {
  return (
    <>
      <div className="info-block-small">{homeOtherContents}</div>
    </>
  );
}

export default HomeOther;
