const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const REDUCE_QUANTITY = 'cart/REDUCE_QUANTITY';

const initialState = {
  cartList: []
};

const manageCart = (items, id, quantity) => {
  const index = items.findIndex(item => item.sku === id);
  if (index >= 0) {
    const itemCount = items.find(item => item.sku === id);
    const { count } = itemCount;
    return [...items.slice(0, index), { sku: id, count: count + quantity }, ...items.slice(index + 1, items.length)];
  }
  return [
    ...items,
    {
      sku: id,
      count: quantity
    }
  ];
};

const removeItemFromCart = (items, id) => items.filter(item => item.sku !== id);

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartList: manageCart(state.cartList, action.payLoad, 1)
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartList: removeItemFromCart(state.cartList, action.payLoad)
      };
    case REDUCE_QUANTITY:
      return {
        ...state,
        cartList: manageCart(state.cartList, action.payLoad, -1)
      };
    default:
      return state;
  }
}

export const addToCart = id => ({
  type: ADD_TO_CART,
  payLoad: id
});

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payLoad: id
});

export const reduceQuantity = id => ({
  type: REDUCE_QUANTITY,
  payLoad: id
});
