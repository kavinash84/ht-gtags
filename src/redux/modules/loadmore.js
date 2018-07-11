const LOAD_MORE = 'loadmore/LOAD_MORE';
const RESET_LOAD_MORE = 'loadmore/RESET_LOAD_MORE';
const SET_QUERY = 'loadmore/SET_QUERY';

const initialState = {
  query: '',
  page: 2
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_QUERY: {
      return {
        ...state,
        query: action.payLoad
      };
    }
    case LOAD_MORE: {
      const { page } = state;
      return {
        ...state,
        page: page + 1
      };
    }
    case RESET_LOAD_MORE: {
      return {
        ...state,
        page: 1
      };
    }
    default:
      return state;
  }
}

export const loadMore = () => ({
  type: LOAD_MORE
});

export const resetLoadMore = () => ({
  type: RESET_LOAD_MORE
});

export const setLoadMorQuery = payLoad => ({
  type: SET_QUERY,
  payLoad
});

// export const loadMoreProduct = (category, page, query) => ({
//   types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//   promise: ({ client }) =>
//     client.get(`tesla/products/${category}/?page=${page}&${query}&maxitems=30&pincode=${pincode}&city=${city}`)
// });
