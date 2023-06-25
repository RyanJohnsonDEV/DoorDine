import './MealItem.css';
import MealItemForm from './MealItemForm';

function MealItem(props) {
  return (
    <div className="meal-item-container">
      <div className="meal-item">
        <h3 className="meal-name">{props.name}</h3>
        <p className="meal-desc">{props.desc}</p>
        <p className="meal-price">${Number(props.price).toFixed(2)}</p>
      </div>
      <div>
        <MealItemForm id={props.id} addItem={props.addItem} />
      </div>
    </div>
  );
}

export default MealItem;
