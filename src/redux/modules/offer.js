import { OFFER as OFFER_API } from 'helpers/apiUrls';

const SET_OFFER_STRIP = 'offer/SET_OFFER_STRIP';
const SET_OFFER_STRIP_SUCCESS = 'offer/SET_OFFER_STRIP_SUCCESS';
const SET_OFFER_STRIP_FAILURE = 'offer/SET_OFFER_STRIP_FAILURE';

const initialState = {
  loaded: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_OFFER_STRIP:
      return {
        ...state,
        loaded: false
      };
    case SET_OFFER_STRIP_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.result
      };
    case SET_OFFER_STRIP_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export const getOfferStrip = () => ({
  types: [SET_OFFER_STRIP, SET_OFFER_STRIP_SUCCESS, SET_OFFER_STRIP_FAILURE],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${OFFER_API}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
