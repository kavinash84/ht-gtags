const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
const LOAD_REVIEW_SUCCESS = 'reviews/LOAD_REVIEW_SUCCESS';
const LOAD_REVIEW_FAIL = 'reviews/LOAD_REVIEW_FAIL';

const ADD_REVIEW = 'reviews/ADD_REVIEW';
const ADD_REVIEW_SUCCESS = 'reviews/ADD_REVIEW_SUCCESS';
const ADD_REVIEW_FAIL = 'reviews/ADD_REVIEW_FAIL';
const TOGGLE_REVIEW = 'reviews/TOGGLE_REVIEW';

const initialState = {
  data: [],
  adding: false,
  added: false,
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
    default:
      return state;
  }
}

export const loadReview = sku => ({
  types: [LOAD_REVIEW, LOAD_REVIEW_SUCCESS, LOAD_REVIEW_FAIL],
  promise: ({ client }) => client.get(`tesla/ratings/${sku}`)
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
