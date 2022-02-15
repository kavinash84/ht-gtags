import { REVIEWBANNERES } from "../../helpers/apiUrls";

const LOAD_REVIEW = "reviews/LOAD_REVIEW";
const LOAD_REVIEW_SUCCESS = "reviews/LOAD_REVIEW_SUCCESS";
const LOAD_REVIEW_FAIL = "reviews/LOAD_REVIEW_FAIL";

const LOAD_REVIEWS_LIST = "reviews/LOAD_REVIEWS_LIST";
const LOAD_REVIEW_LIST_SUCCESS = "reviews/LOAD_REVIEW_LIST_SUCCESS";
const LOAD_REVIEW_LIST_FAIL = "reviews/LOAD_REVIEW_LIST_FAIL";

const ADD_CUSTOMER_REVIEW = "reviews/ADD_CUSTOMER_REVIEW";
const ADD_CUSTOMER_REVIEW_SUCCESS = "reviews/ADD_CUSTOMER_REVIEW_SUCCESS";
const ADD_CUSTOMER_REVIEW_FAIL = "reviews/ADD_CUSTOMER_REVIEW_FAIL";

const ADD_REVIEW = "reviews/ADD_REVIEW";
const ADD_REVIEW_SUCCESS = "reviews/ADD_REVIEW_SUCCESS";
const ADD_REVIEW_FAIL = "reviews/ADD_REVIEW_FAIL";
const TOGGLE_REVIEW = "reviews/TOGGLE_REVIEW";

const GET_PRODUCTSFOR_REVIEW = "reviews/GET_PRODUCTSFOR_REVIEW";
const GET_PRODUCTSFOR_REVIEW_SUCCESS = "reviews/GET_PRODUCTSFOR_REVIEW_SUCCESS";
const GET_PRODUCTSFOR_REVIEW_FAIL = "reviews/GET_PRODUCTSFOR_REVIEW_FAIL";

const LOAD_REVIEW_BANNERES = "reviews/LOAD_REVIEW_BANNERES";
const LOAD_REVIEW_BANNERES_SUCCESS = "reviews/LOAD_REVIEW_BANNERES_SUCCESS";
const LOAD_REVIEW_BANNERES_FAIL = "reviews/LOAD_REVIEW_BANNERES_FAIL";

const TOGGLE_PAGE_NO = "reviews/TOGGLE_PAGE_NO";

const initialState = {
  data: [],
  reviewsList: [],
  pageNo: null,
  productsToBeReviewed: [],
  cmsData: {},
  endOfList: false,
  adding: false,
  added: false,
  reviewAdded: false,
  error: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REVIEW:
      return {
        ...state,
        loading: true
      };
    case LOAD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case TOGGLE_PAGE_NO:
      return {
        ...state,
        pageNo: action.result
      };
    case ADD_REVIEW:
      return {
        ...state,
        adding: true,
        added: false,
        error: false
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        adding: false,
        added: true,
        error: false
      };
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        adding: false,
        added: false,
        error: true,
        errorMessage: action.error_message
      };
    case TOGGLE_REVIEW:
      return {
        ...state,
        added: !state.added
      };
    case LOAD_REVIEWS_LIST:
      return {
        ...state,
        loading: true
      };
    case LOAD_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        reviewsList:
          state.pageNo === 1
            ? action.result.reviews
            : [...state.reviewsList, ...action.result.reviews],
        endOfList: action.result.isLastPage
        // endOfList: Array.isArray(action.result)
        //   ? !(action.result.length < 7)
        //     ? false
        //     : true
        //   : true
      };
    case LOAD_REVIEW_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_CUSTOMER_REVIEW:
      return {
        ...state,
        loading: true,
        reviewAdded: false
      };
    case ADD_CUSTOMER_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productsToBeReviewed: [],
        reviewAdded: true
      };
    case ADD_CUSTOMER_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        reviewAdded: false
      };
    case GET_PRODUCTSFOR_REVIEW:
      return {
        ...state,
        productsLoader: true
      };
    case GET_PRODUCTSFOR_REVIEW_SUCCESS:
      return {
        ...state,
        productsLoader: false,
        productsToBeReviewed: action.result
      };
    case GET_PRODUCTSFOR_REVIEW_FAIL:
      return {
        ...state,
        productsLoader: false,
        // productsToBeReviewed:
        //   Array.isArray(action.result) && action.result.length
        //     ? action.result
        //     : [],
        error: action.error
      };
    case LOAD_REVIEW_BANNERES:
      return {
        ...state
      };
    case LOAD_REVIEW_BANNERES_SUCCESS:
      return {
        ...state,
        cmsData: action.result
      };
    case LOAD_REVIEW_BANNERES_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export const loadReview = sku => ({
  types: [LOAD_REVIEW, LOAD_REVIEW_SUCCESS, LOAD_REVIEW_FAIL],
  promise: ({ client }) => client.get(`tesla/ratings/${sku}`)
});

export const loadReviewsList = data => ({
  types: [LOAD_REVIEWS_LIST, LOAD_REVIEW_LIST_SUCCESS, LOAD_REVIEW_LIST_FAIL],
  promise: ({ client }) => client.get(`tesla/ratings/reviews?${data}`)
});

export const loadProductsListForReview = data => ({
  types: [
    GET_PRODUCTSFOR_REVIEW,
    GET_PRODUCTSFOR_REVIEW_SUCCESS,
    GET_PRODUCTSFOR_REVIEW_FAIL
  ],
  promise: ({ client }) =>
    client.get(`tesla/orders/get-orders-by-mobile?mobile=${data}`)
});

export const toggleReview = () => ({
  type: TOGGLE_REVIEW
});
export const addReview = (sku, data) => ({
  types: [ADD_REVIEW, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        name: data.name,
        rating: parseInt(data.rating, 10),
        review: data.review
      };
      const response = await client.post(`tesla/ratings/${sku}`, postData);

      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const addCustomerReview = (sku, data) => ({
  types: [
    ADD_CUSTOMER_REVIEW,
    ADD_CUSTOMER_REVIEW_SUCCESS,
    ADD_CUSTOMER_REVIEW_FAIL
  ],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.post(
        `tesla/ratings/add-review-new/${sku}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const togglePageNumber = result => ({
  type: TOGGLE_PAGE_NO,
  result
});

export const loadReviewsBanneres = () => ({
  types: [
    LOAD_REVIEW_BANNERES,
    LOAD_REVIEW_BANNERES_SUCCESS,
    LOAD_REVIEW_BANNERES_FAIL
  ],
  promise: ({ client }) => client.get(REVIEWBANNERES)
});
