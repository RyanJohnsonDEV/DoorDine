import { createContext } from 'react';

const AddressContext = createContext([
  {
    address: '',
    selectedRestaurantName: '',
  },
]);

export default AddressContext;
