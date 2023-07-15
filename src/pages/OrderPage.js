import Ordering from '../components/Ordering/Ordering';
import Footer from '../components/Layout/Footer';
import { useEffect } from 'react';

function OrderPage() {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <Ordering />
      <Footer />
    </>
  );
}

export default OrderPage;
