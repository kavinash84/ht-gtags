// import { PAYMENT_STATUS as PAYMENT_STATUS_API } from 'helpers/apiUrls';
import { PAYMENT_FINISH_URL, PAYMENT_SUCCESS_URL } from "helpers/apiUrls";

const LOAD = "paymentstatus/LOAD";
const LOAD_SUCCESS = "paymentstatus/LOAD_SUCCESS";
const LOAD_FAIL = "paymentstatus/LOAD_FAIL";

const initialState = {
  loading: false,
  loaded: false,
  data: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: (action.result && action.result.error_message) || ""
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  console.log(
    "Is loaded",
    globalState.paymentstatus,
    globalState.paymentstatus.loaded
  );
  return globalState.paymentstatus && globalState.paymentstatus.loaded;
}

// export const load = sessionId => ({
export const loadPaymentFinish = orderId => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      // const response = await client.get(`${PAYMENT_STATUS_API}/${sessionId}`);
      console.log("loadPaymentFinish function api");
      const response = await client.get(
        `${PAYMENT_FINISH_URL}?orderNo=${orderId}`
      );
      console.log("Response from api", response);
      return response;
    } catch (error) {
      console.log("error in loadPaymentFinish", error);
      return error;
    }
  }
});

export const loadPaymentSuccess = sessionId => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      console.log("loadPaymentSuccess function api");
      const response = await client.get(`${PAYMENT_SUCCESS_URL}/${sessionId}`);
      console.log("Response from api", response);
      return response;
    } catch (error) {
      console.log("error in loadPaymentSuccess", error);
      return error;
    }
  }
});
