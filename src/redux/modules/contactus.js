const SERVICE_REQUEST = 'contactus/SERVICE_REQUEST';
const SERVICE_REQUEST_SUCCESS = 'contactus/SERVICE_REQUEST_SUCCESS';
const SERVICE_REQUEST_FAIL = 'contactus/SERVICE_REQUEST_FAIL';

const FEEDBACK = 'contactus/FEEDBACK';
const FEEDBACK_SUCCESS = 'contactus/FEEDBACK_SUCCESS';
const FEEDBACK_FAIL = 'contactus/FEEDBACK_FAIL';

const initialState = {
  loading: false,
  loaded: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SERVICE_REQUEST_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        loaded: true
        // data: action.result
      };
    case SERVICE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case FEEDBACK:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false
      };
    case FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    default:
      return state;
  }
}

export const submitFeedBack = data => ({
  types: [FEEDBACK, FEEDBACK_SUCCESS, FEEDBACK_FAIL],
  promise: async ({ client }) => {
    try {
      const {
        firstName,
        lastName,
        phone,
        order,
        email,
        store,
        city,
        review,
        aftersale,
        delivery,
        instore,
        fitment
      } = data;
      const services = {
        aftersale,
        delivery,
        instore,
        fitment
      };
      const postData = {
        firstName,
        lastName,
        email,
        store,
        city,
        review,
        services,
        mobile: phone,
        orderNumber: order
      };
      return await client.post('tesla/contact-us', postData);
    } catch (error) {
      throw error;
    }
  }
});

export const submitServiceRequest = data => ({
  types: [FEEDBACK, FEEDBACK_SUCCESS, FEEDBACK_FAIL],
  promise: async ({ client }) => {
    try {
      const {
        firstName,
        lastName,
        phone,
        order,
        email,
        store,
        city,
        review,
        aftersale,
        delivery,
        instore,
        fitment
      } = data;
      const services = {
        aftersale,
        delivery,
        instore,
        fitment
      };
      const postData = {
        firstName,
        lastName,
        email,
        store,
        city,
        review,
        services,
        mobile: phone,
        orderNumber: order
      };
      return await client.post('tesla/contact-us', postData);
    } catch (error) {
      throw error;
    }
  }
});
