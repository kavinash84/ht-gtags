import { POST_FEEDBACK as POST_FEEDBACK_API, GET_FEEDBACK_FORM as GET_FEEDBACK_FORM_API } from 'helpers/apiUrls';

const GET_FEEDBACK_FORM = 'feedback/GET_FEEDBACK_FORM';
const GET_FEEDBACK_FORM_SUCCESS = 'feedback/GET_FEEDBACK_FORM_SUCCESS';
const GET_FEEDBACK_FORM_FAILURE = 'feedback/GET_FEEDBACK_FORM_FAILURE';

const SET_FEEDBACK_FORM = 'feedback/SET_FEEDBACK_FORM';
const SET_FEEDBACK_FORM_SUCCESS = 'feedback/SET_FEEDBACK_FORM_SUCCESS';
const SET_FEEDBACK_FORM_FAILURE = 'feedback/SET_FEEDBACK_FORM_FAILURE';

const initialState = {
  loaded: false,
  data: null,
  formSubmit: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_FEEDBACK_FORM:
      return {
        ...state,
        loading: true
      };
    case GET_FEEDBACK_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case GET_FEEDBACK_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_FEEDBACK_FORM:
      return {
        ...state,
        loading: true,
        formSubmit: false
      };
    case SET_FEEDBACK_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        formSubmit: true,
        error: '',
        errorMessage: ''
      };
    case SET_FEEDBACK_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        passwordUpdated: false,
        formSubmit: false,
        error: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

export const getFeedbackForm = id => ({
  types: [GET_FEEDBACK_FORM, GET_FEEDBACK_FORM_SUCCESS, GET_FEEDBACK_FORM_FAILURE],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${GET_FEEDBACK_FORM_API}?order=${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const setFeedbackForm = formdata => ({
  types: [SET_FEEDBACK_FORM, SET_FEEDBACK_FORM_SUCCESS, SET_FEEDBACK_FORM_FAILURE],
  promise: async ({ client }) => {
    try {
      const response = await client.post(POST_FEEDBACK_API, formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
