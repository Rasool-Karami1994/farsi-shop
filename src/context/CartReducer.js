const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // console.log(state, action);
      const cartProducts = [...state.cart];
      const index = cartProducts.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index < 0) {
        cartProducts.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedCart = { ...cartProducts[index] };
        updatedCart.quantity++;
        cartProducts[index] = updatedCart;
      }
      // console.log(state);

      return {
        ...state,
        cart: cartProducts,
        total: state.total + action.payload.offPrice,
      };
    }

    case "REDUCE_QUANTITY": {
      const cartProducts = [...state.cart];
      const index = cartProducts.findIndex(
        (item) => item.name === action.payload.name
      );
      const updatedCart = { ...cartProducts[index] };
      if (updatedCart.quantity === 1) {
        const filteredCart = cartProducts.filter(
          (item) => item.name !== action.payload.name
        );
        return {
          ...state,
          cart: filteredCart,
          total: state.total - action.payload.offPrice,
        };
      } else {
        updatedCart.quantity--;
        cartProducts[index] = updatedCart;
        return {
          ...state,
          cart: cartProducts,
          total: state.total - action.payload.offPrice,
        };
      }
    }
    case "REMOVE_CART_ITEM": {
      const cartProducts = [...state.cart];
      const filteredCart = cartProducts.filter(
        (item) => item.name !== action.payload.name
      );
      return {
        ...state,
        cart: filteredCart,
        total: state.total - action.payload.offPrice,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
