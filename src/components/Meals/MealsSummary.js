import './MealsSummary.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

async function getKitchenDetails(
  params,
  setKitchenName,
  setKitchenDescription
) {
  try {
    const response = await fetch(
      `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${params.id}.json`
    );
    const data = await response.json();
    setKitchenName(data.name);
    setKitchenDescription(data.description);
  } catch {
    setKitchenName('Error');
    setKitchenDescription('');
  }
}

function MealsSummary(props) {
  const params = useParams();
  const { setKitchen } = props;
  const [kitchenName, setKichenName] = useState();
  const [kitchenDescription, setKichenDescription] = useState();

  useEffect(() => {
    setKitchen(params.id);
    getKitchenDetails(params, setKichenName, setKichenDescription);
  }, [setKitchen, params]);

  return (
    <section className="summary">
      <h2>{kitchenName}</h2>
      <p>{kitchenDescription}</p>
    </section>
  );
}

export default MealsSummary;
