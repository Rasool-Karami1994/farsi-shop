import React, { useContext, createContext, useReducer } from "react";
import CartReducer from "./CartReducer";
const CartContext = createContext();
const CartContextDispatcher = createContext();
const CartProvider = ({ children }) => {
  const initialValue = {
    cart: [],
    total: 0,
  };

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || false;
  //   initialValue.cart = cart;
  // }, []);
  // useEffect(() => {
  //   const cart = JSON.stringify(initialValue.cart);
  //   localStorage.setItem(cart);
  // }, [initialValue.cart]);

  const [cart, dispatch] = useReducer(CartReducer, initialValue);
  console.log(cart);
  return (
    <CartContext.Provider value={cart}>
      <CartContextDispatcher.Provider value={dispatch}>
        {children}
      </CartContextDispatcher.Provider>
    </CartContext.Provider>
  );
};
export const useCartContext = () => useContext(CartContext);
export const useCartContextActions = () => {
  return useContext(CartContextDispatcher);
};

export default CartProvider;
