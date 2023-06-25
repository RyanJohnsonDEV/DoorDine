import { Link } from 'react-router-dom';
import './InfoBlockSmall.css';

function InfoBlockSmall(props) {
  return (
    <div className="info-block">
      <img src={props.img} alt={props.alt} />

      <h1>{props.title}</h1>
      <p className="info-block-desc">{props.description}</p>
      <Link to={props.link} className="info-block-link">
        {props.linkTitle}
      </Link>
    </div>
  );
}

export default InfoBlockSmall;
