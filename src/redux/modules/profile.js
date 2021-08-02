/* eslint-disable max-len */
import { 
  USERPROFILE as USERPROFILE_API, 
  UPDATEPROFILE as UPDATEPROFILE_API, 
  TRANSACTIONHISTORY as TRANSACTION_HISTORY_API,
  FUTUREPAYSTATUS as FUTURE_PAY_STATUS_API,
  LINKFUTUREPAY as LINK_FUTURE_PAY_API } from 'helpers/apiUrls';

const LOAD = 'profile/LOAD';
const LOAD_SUCCESS = 'profile/LOAD_SUCCESS';
const LOAD_FAIL = 'profile/LOAD_FAIL';
const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'profile/UPDATE_PROFILE_FAIL';
const UPDATE_TRANSACTION = "profile/UPDATE_TRANSACTION";
const UPDATE_TRANSACTION_SUCCESS = "profile/UPDATE_TRANSACTION_SUCCESS";
const UPDATE_TRANSACTION_FAIL = "profile/UPDATE_TRANSACTION_FAIL";
const FUTUREPAY_STATUS = 'profile/FUTUREPAY_STATUS';
const FUTUREPAY_STATUS_SUCCESS = 'profile/FUTUREPAY_STATUS_SUCCESS';
const FUTUREPAY_STATUS_FAIL = 'profile/FUTUREPAY_STATUS_FAIL';
const LINK_FUTURE_PAY = 'profile/LINK_FUTURE_PAY';
const LINK_FUTURE_PAY_SUCCESS = 'profile/LINK_FUTURE_PAY_SUCCESS';
const LINK_FUTURE_PAY_FAIL = 'profile/LINK_FUTURE_PAY_FAIL';
const SET_FUTURE_PAY_STATUS = 'profile/SET_FUTURE_PAY_STATUS';
const CLEAR_PROFILE = 'profile/CLEAR_PROFILE';

const initialState = {
  loading: false,
  loaded: false,
  profileUpdated: false,
  data: {},
  transactionHistory: [],
  setFuturePayStatus: false,
  hasMoreTrans: false
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
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        profileUpdated: true
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profileUpdated: false,
        error: action.error
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        loading: true
      };
    // eslint-disable-next-line no-case-declarations
    case UPDATE_TRANSACTION_SUCCESS:
      // TODO - error handling
      // Set clear transaction history
      const hasMoreTrans =
        action.result && 'TransactionHistory' in action.result ? action.result.TransactionHistory.length > 0 : false;
      return {
        ...state,
        loading: false,
        loaded: true,
        // transactionHistory: hasMoreTrans
        //   ? [...state.transactionHistory, ...action.result.TransactionHistory]
        //   : action.result.TransactionHistory,
        transactionHistory:[...state.transactionHistory, ...action.result.TransactionHistory],
        hasMoreTrans
      };
    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        transactionHistoryError: action.error
      };
    case FUTUREPAY_STATUS:
      return {
        ...state,
        loading: true
      };
    case FUTUREPAY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        futurePayStatus: action.result
      };
    case FUTUREPAY_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LINK_FUTURE_PAY:
      return {
        ...state,
        loading: true
      };
    case LINK_FUTURE_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        setFuturePayStatus: false
      };
    case LINK_FUTURE_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SET_FUTURE_PAY_STATUS:
      return {
        ...state,
        setFuturePayStatus: action.status
      };
    case CLEAR_PROFILE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export const updateUserProfile = data => ({
  types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        email: data.email,
        mobile: data.phone,
        full_name: data.fullName,
        gst: data.gst,
        dob: data.dob,
        city: data.city,
        gender: data.gender
      };
      const response = await client.put(UPDATEPROFILE_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const getTransactionHistory = data => ({
  types: [
    UPDATE_TRANSACTION,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const postData = {
        FromDate: data.fromDate,
        ToDate: data.toDate,
        Count: data.count,
        PageNo: data.pageNo
      };
      const response = await client.post(TRANSACTION_HISTORY_API, postData);
      return response;
    } catch (error) {
      console.log("Logged In Profile Reducer catch", error);
      throw error;
    }
  }
});

export const loadUserProfile = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(USERPROFILE_API)
});

export const clearUserProfile = () => ({
  type: CLEAR_PROFILE
});

export const checkFuturePay = () => ({
  types: [FUTUREPAY_STATUS, FUTUREPAY_STATUS_SUCCESS, FUTUREPAY_STATUS_FAIL],
  promise: async ({ client }) => client.get(FUTURE_PAY_STATUS_API)
});

export const setFuturePayStatus = status => ({
  type: SET_FUTURE_PAY_STATUS,
  status
});

export const linkFuturePay = otp => ({
  types: [LINK_FUTURE_PAY, LINK_FUTURE_PAY_SUCCESS, LINK_FUTURE_PAY_FAIL],
  promise: async ({ client }) => client.post(LINK_FUTURE_PAY_API, { OTP: otp })
});