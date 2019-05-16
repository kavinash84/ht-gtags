import { MY_ADDRESS as MY_ADDRESS_API } from 'helpers/apiUrls';

const LOAD = 'myaddress/LOAD';
const LOAD_SUCCESS = 'myaddress/LOAD_SUCCESS';
const LOAD_FAIL = 'myaddress/LOAD_FAIL';

const UPDATE_ADDRESS = 'myaddress/UPDATE_ADDRESS';
const UPDATE_ADDRESS_SUCCESS = 'myaddress/UPDATE_ADDRESS_SUCCESS';
const UPDATE_ADDRESS_FAIL = 'myaddress/UPDATE_ADDRESS_FAIL';

const ADD_ADDRESS = 'myaddress/ADD_ADDRESS';
const ADD_ADDRESS_SUCCESS = 'myaddress/ADD_ADDRESS_SUCCESS';
const ADD_ADDRESS_FAIL = 'myaddress/ADD_ADDRESS_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  toggleForm: false,
  updated: false
};

const removeAddress = (id, data) => data.filter(item => parseInt(item.id_customer_address, 10) !== parseInt(id, 10));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
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
    case UPDATE_ADDRESS:
      return {
        ...state,
        loading: true,
        loaded: false,
        updated: false
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        updated: true,
        data: [...removeAddress(action.result.id_customer_address, state.data), action.result]
      };
    case UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ADD_ADDRESS:
      return {
        ...state,
        loading: true,
        loaded: false,
        updated: false
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        updated: true,
        data: [...state.data, action.result]
      };
    case ADD_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const loadMyAddress = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(MY_ADDRESS_API)
});

export const updateAddress = data => ({
  types: [UPDATE_ADDRESS, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const {
        addressId, name, address, pincode, phone, email, isBilling, isShipping, gst
      } = data;
      const postData = {
        full_name: name,
        address,
        is_billing: isBilling || false,
        is_shipping: isShipping || false,
        pincode,
        email,
        mobile: phone,
        gst
      };
      return await client.put(`${MY_ADDRESS_API}/${addressId}`, postData);
    } catch (error) {
      throw error;
    }
  }
});

export const addAddress = data => ({
  types: [ADD_ADDRESS, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAIL],
  promise: async ({ client }) => {
    const {
      name, address, pincode, phone, email, isBilling, isShipping, gst
    } = data;
    try {
      /* eslint-disable max-len */
      const postData = {
        full_name: name,
        address,
        is_billing: isBilling || false,
        is_shipping: isShipping || false,
        pincode,
        email,
        mobile: phone,
        gst
      };
      return await client.post(MY_ADDRESS_API, postData);
    } catch (error) {
      throw error;
    }
  }
});
