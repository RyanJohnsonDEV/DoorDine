import './MealsSummary.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

async function getKitchenDetails(
  params,
  setKitchenName,
  setKitchenDescription,
  setLoading
) {
  try {
    setLoading(true);
    const response = await fetch(
      `https://food-delivery-app-68dae-default-rtdb.firebaseio.com/Restaurants/${params.id}.json`
    );
    const data = await response.json();
    setLoading(false);
    setKitchenName(data.name);
    setKitchenDescription(data.description);
  } catch {
    setLoading(false);
    setKitchenName('Error');
    setKitchenDescription('');
  }
}

function MealsSummary(props) {
  const params = useParams();
  const { setKitchen } = props;
  const [kitchenName, setKichenName] = useState();
  const [kitchenDescription, setKichenDescription] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setKitchen(params.id);
    getKitchenDetails(params, setKichenName, setKichenDescription, setLoading);
  }, [setKitchen, params]);

  return (
    <section className="summary">
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      <h2>{kitchenName}</h2>
      <p>{kitchenDescription}</p>
    </section>
  );
}

export default MealsSummary;
