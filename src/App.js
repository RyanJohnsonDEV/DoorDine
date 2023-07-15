import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SelectRestaurant from './pages/SelectRestaurant';
import OrderPage from './pages/OrderPage';
import AddressContext from './Store/AddressContext';
import { useState, useEffect } from 'react';

function App() {
  const [address, setAddress] = useState('');
  const [currentRestaurant, setCurrentRestaurant] = useState('');

  function setCurrentAddress(addr) {
    setAddress(addr);
  }

  useEffect(() => {
    if (localStorage.getItem('address')) {
      setAddress(localStorage.getItem('address'));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        { index: true, element: <Home address={setCurrentAddress} /> },
        { path: 'Restaurants', element: <SelectRestaurant /> },
        { path: 'Restaurants/:id', element: <OrderPage /> },
      ],
    },
  ]);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        currentRestaurant,
        setCurrentRestaurant,
      }}
    >
      <RouterProvider router={router} />
    </AddressContext.Provider>
  );
}

export default App;
