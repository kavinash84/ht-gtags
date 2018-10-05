const LOAD_WISHLIST = 'wishList/LOAD_WISHLIST';
const LOAD_WISHLIST_SUCCESS = 'wishList/LOAD_WISHLIST_SUCCESS';
const LOAD_WISHLIST_FAIL = 'wishList/LOAD_WISHLIST_FAIL';
const ADD_TO_WISHLIST = 'wishList/ADD_TO_WISHLIST';
const ADD_TO_WISHLIST_SUCCESS = 'wishList/ADD_TO_WISHLIST_SUCCESS';
const ADD_TO_WISHLIST_FAILURE = 'wishList/ADD_TO_WISHLIST_FAILURE';
const REMOVE_FROM_WISHLIST = 'wishList/REMOVE_FROM_WISHLIST';
const REMOVE_FROM_WISHLIST_SUCCESS = 'wishList/REMOVE_FROM_WISHLIST_SUCCESS';
const REMOVE_FROM_WISHLIST_FAILURE = 'wishList/REMOVE_FROM_WISHLIST_FAILURE';
const CLEAR_WISHLIST = 'wishList/CLEAR_WISHLIST';
const SET_LOADING_SKU = 'wishList/SET_LOADING_SKU';
const REMOVE_LOADING_SKU = 'wishList/REMOVE_LOADING_SKU';
const ADD_TO_WISHLIST_WAITLIST = 'wishlist/ADD_TO_WISHLIST_WAITLIST';

const initialState = {
  data: [],
  loaded: false,
  loadingList: [],
  waitlist: ''
};

const rehyDratedList = (items, id) => items.filter(item => item.wishlist_info.id_customer_wishlist !== Number(id));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_WISHLIST:
      return {
        ...state,
        loading: true
      };
    case LOAD_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        loaded: false,
        loading: true,
        key: action.payLoad
      };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [...state.data, action.result]
      };
    case ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        key: action.payLoad
      };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: rehyDratedList(state.data, action.result.id)
      };
    case REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_LOADING_SKU:
      return {
        ...state,
        loadingList: [...state.loadingList, action.sku]
      };
    case REMOVE_LOADING_SKU:
      return {
        ...state,
        loadingList: (state.loadingList || []).filter(list => list !== action.sku)
      };
    case ADD_TO_WISHLIST_WAITLIST:
      return {
        ...state,
        waitlist: {
          sku: action.sku,
          simpleSku: action.simpleSku
        }
      };
    case CLEAR_WISHLIST:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

const setLoadingState = sku => ({
  type: SET_LOADING_SKU,
  sku
});

const removeLoadingState = sku => ({
  type: REMOVE_LOADING_SKU,
  sku
});

const isSKUWishlisted = (list, skuId) => list.find(sku => sku.wishlist_info.configurable_sku === skuId);

export const isLoaded = globalState => globalState.wishlist && globalState.wishlist.loaded;

export const toggleWishList = (list, sku, simpleSku) => dispatch => {
  const checkList = isSKUWishlisted(list, sku);
  if (checkList) {
    const wishListID = checkList.wishlist_info.id_customer_wishlist;
    dispatch(setLoadingState(sku));
    return dispatch({
      types: [REMOVE_FROM_WISHLIST, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE],
      promise: async ({ client }) => {
        try {
          const response = await client.delete(`tesla/wishlist/${wishListID}`);
          await dispatch(removeLoadingState(sku));
          return response;
        } catch (error) {
          await dispatch(removeLoadingState(sku));
          throw error;
        }
      }
    });
  }
  dispatch(setLoadingState(sku));
  return dispatch({
    types: [ADD_TO_WISHLIST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAILURE],
    promise: async ({ client }) => {
      try {
        const postData = {
          comment: '',
          configurable_sku: sku,
          simple_sku: simpleSku
        };
        const response = await client.post('tesla/wishlist', postData);
        await dispatch(removeLoadingState(sku));
        return response;
      } catch (error) {
        await dispatch(removeLoadingState(sku));
        throw error;
      }
    }
  });
};

export const loadWishlist = () => ({
  types: [LOAD_WISHLIST, LOAD_WISHLIST_SUCCESS, LOAD_WISHLIST_FAIL],
  promise: ({ client }) => client.get('tesla/wishlist')
});

export const clearWishList = () => ({
  type: CLEAR_WISHLIST
});

export const wishListWaitList = (sku, simpleSku) => ({
  type: ADD_TO_WISHLIST_WAITLIST,
  sku,
  simpleSku
});

export const syncWishList = () => async (dispatch, getState) => {
  await dispatch(loadWishlist());
  const { wishlist: { data: list, waitlist: { sku, simpleSku } } } = getState();
  const checkList = isSKUWishlisted(list, sku);
  if (!checkList) {
    dispatch(setLoadingState(sku));
    return dispatch({
      types: [ADD_TO_WISHLIST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAILURE],
      promise: async ({ client }) => {
        try {
          const postData = {
            comment: '',
            configurable_sku: sku,
            simple_sku: simpleSku
          };
          const response = await client.post('tesla/wishlist', postData);
          await dispatch(removeLoadingState(sku));
          return response;
        } catch (error) {
          await dispatch(removeLoadingState(sku));
          throw error;
        }
      }
    });
  }
};
