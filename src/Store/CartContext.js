import { createContext } from 'react';

const CartContext = createContext([]);

export default CartContext;

// {
//     items: [],
//     totalAmount: 0,
//     addProduct: (item) => {},
//     removeProduct: (id) => {},
//     clearCart: () => {},
//   }
