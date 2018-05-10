const TOGGLE_WISHLIST = 'wishList/TOGGLE_WISHLIST';

const initialState = {
  data: []
};

const checkWishList = (items, id) => {
  const list = items.includes(id);
  if (list) {
    return items.filter(item => item !== id);
  }
  return [...items, id];
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_WISHLIST:
      return {
        ...state,
        data: checkWishList(state.data, action.payLoad)
      };
    default:
      return state;
  }
}

export const toggleWishList = id => ({
  type: TOGGLE_WISHLIST,
  payLoad: id
});
