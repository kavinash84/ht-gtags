// Validators
import {
  isEmpty,
  pincode as pincodeIsValid,
  validateMobile,
  validateAddress,
  // trimSpecialChar,
  checkSpecialChar
} from 'utils/validation';
import { allowNChar, allowTypeOf, isGSTNumber } from 'utils/helper';
import { PINCODE_INFO } from 'helpers/apiUrls';
import { loadCart } from './cart';
import { setPincodeDetails } from './pincode';
import { setCity } from './app';

const emailIsValid = value => !isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const TOGGLE_SHIPPING_IS_BILING = 'deliveryaddress/TOGGLE_SHIPPING_IS_BILING';

const SET_NAME = 'deliveryaddress/SET_NAME';
const SET_CITY = 'deliveryaddress/SET_CITY';
const SET_EMAIL = 'deliveryaddress/SET_EMAIL';
const SET_ADDRESS1 = 'deliveryaddress/SET_ADDRESS1';
const SET_ADDRESS1_ADDRESS2 = 'delivery/SET_ADDRESS1_ADDRESS2';
const SET_ADDRESS2 = 'deliveryaddress/SET_ADDRESS2';
const SET_ADDRESS2_ADDRESS3 = 'deliveryaddress/SET_ADDRESS2_ADDRESS3';
const SET_ADDRESS3 = 'deliveryaddress/SET_ADDRESS3';
const SET_STATE = 'deliveryaddress/SET_STATE';
const SET_PHONE = 'deliveryaddress/SET_PHONE';
const SET_PINCODE = 'deliveryaddress/SET_PINCODE';
const SET_GST = 'deliveryaddress/SET_GST';

const SET_NAME_ERROR = 'deliveryaddress/SET_NAME_ERROR';
const SET_PINCODE_ERROR = 'deliveryaddress/SET_PINCODE_ERROR';
const SET_PHONE_ERROR = 'deliveryaddress/SET_PHONE_ERROR';
const SET_ADDRESS_ERROR1 = 'deliveryaddress/SET_ADDRESS_ERROR1';
const SET_ADDRESS_ERROR2 = 'deliveryaddress/SET_ADDRESS_ERROR2';
const SET_ADDRESS_ERROR3 = 'deliveryaddress/SET_ADDRESS_ERROR3';
const SET_CITY_ERROR = 'deliveryaddress/SET_CITY_ERROR';
const SET_STATE_ERROR = 'deliveryaddress/SET_STATE_ERROR';
const SET_EMAIL_ERROR = 'deliveryaddress/SET_EMAIL_ERROR';

const SET_ADDRESS_DETAILS = 'deliveryaddress/SET_ADDRESS_DETAILS';
const ADD_NEW_ADDRESS = 'deliveryaddress/ADD_NEW_ADDRESS';

// Pincode Methods
const LOAD_PINCODE = 'deliveryaddress/LOAD_PINCODE';
const LOAD_PINCODE_SUCCESS = 'deliveryaddress/LOAD_PINCODE_SUCCESS';
const LOAD_PINCODE_FAIL = 'deliveryaddress/LOAD_PINCODE_FAIL';
const SET_PINCODE_QUERY = 'deliveryaddress/SET_PINCODE_QUERY';
const SET_SELECTED_PINCODE = 'deliveryaddress/SET_SELECTED_PINCODE';

const LOAD_PINCODE_DETAILS = 'deliveryaddress/LOAD_PINCODE_DETAILS';
const LOAD_PINCODE_DETAILS_SUCCESS = 'deliveryaddress/LOAD_PINCODE_DETAILS_SUCCESS';
const LOAD_PINCODE_DETAILS_FAIL = 'deliveryaddress/LOAD_PINCODE_DETAILS_FAIL';

const CLEAR_SHIPPING = 'deliveryaddress/CLEAR_SHIPPING';
const SUBMIT_FORM = 'deliveryaddress/SUBMIT_FORM';

const CLEAR_ADDRESS = 'deliveryaddress/CLEAR_ADDRESS';

const initialState = {
  shipping: {
    fullName: '',
    fullNameFeedBackError: false,
    fullNameFeedBackMessage: 'Name Cannot be Left Empty !',
    email: '',
    emailFeedBackError: false,
    emailFeedBackMessage: 'Email is Not Valid  !',
    phone: '',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Enter 10 Digits Valid Mobile Number !',
    address1: '',
    addressFeedBackError1: false,
    addressFeedBackMessage1: 'Address line 1 Cannot be Left Empty !',
    address2: '',
    addressFeedBackError2: false,
    addressFeedBackMessage2: 'Address line 2 Cannot be Left Empty !',
    address3: '',
    addressFeedBackError3: false,
    addressFeedBackMessage3: '',
    city: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City cannot be Empty',
    pincode: '',
    pincodeFeedBackError: false,
    pincodeFeedBackMessage: 'Pincode is Invalid !',
    state: '',
    stateFeedBackError: false,
    stateFeedBackMessage: 'State cannot be Empty',
    gst: '',
    gstFeedBackError: false,
    gstFeedBackMessage: 'Please enter correct GST number !',
    index: -1
  },
  billing: {
    fullName: '',
    fullNameFeedBackError: false,
    fullNameFeedBackMessage: 'Name Cannot be Left Empty !',
    email: '',
    emailFeedBackError: false,
    emailFeedBackMessage: 'Email is Not Valid  !',
    phone: '',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Enter 10 Digits Valid Mobile Number !',
    address1: '',
    addressFeedBackError1: false,
    addressFeedBackMessage1: 'Address line 1 Cannot be Left Empty !',
    address2: '',
    addressFeedBackError2: false,
    addressFeedBackMessage2: 'Address 2 Cannot be left Empty !',
    address3: '',
    addressFeedBackError3: false,
    addressFeedBackMessage3: '',
    city: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City cannot be Empty',
    pincode: '',
    pincodeFeedBackError: false,
    pincodeFeedBackMessage: 'Pincode is Invalid !',
    state: '',
    stateFeedBackError: false,
    stateFeedBackMessage: 'State cannot be Empty',
    gst: '',
    gstFeedBackError: false,
    gstFeedBackMessage: 'Please enter correct GST number !'
    // error: true,
    // formData: null
  },
  addNewAddress: false,
  shippingIsBilling: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          fullName: action.name,
          fullNameFeedBackError: isEmpty(action.name) || checkSpecialChar(action.name),
          fullNameFeedBackMessage: checkSpecialChar(action.name)
            ? 'Numbers and special characters are not allowed !'
            : 'Name Cannot be Left Empty!'
        }
      };
    case SET_CITY:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          city: action.city,
          cityFeedBackError: isEmpty(action.city)
        }
      };
    case SET_EMAIL:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          email: action.email,
          emailFeedBackError: !emailIsValid(action.email)
        }
      };
    case ADD_NEW_ADDRESS:
      return {
        ...state,
        addNewAddress: action.data
      };
    case SET_ADDRESS1:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address1: action.address1,
          addressFeedBackError1: isEmpty(action.address1) || validateAddress(action.address1, 'address1').error,
          addressFeedBackMessage1: validateAddress(action.address1, 'address1').errorMessage
        }
      };
    case SET_ADDRESS1_ADDRESS2:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address1: action.address1,
          addressFeedBackError1: validateAddress(action.address1, 'address1').error,
          addressFeedBackMessage1: validateAddress(action.address1, 'address1').errorMessage
          // address2: action.address2,
          // addressFeedBackError2: validateAddress(action.address2, 'address2').error,
          // addressFeedBackMessage2: validateAddress(action.address2, 'address2').errorMessage
        }
      };
    case SET_ADDRESS2:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address2: action.address2,
          addressFeedBackError2: validateAddress(action.address2, 'address2').error,
          addressFeedBackMessage2: validateAddress(action.address2, 'address2').errorMessage
        }
      };
    case SET_ADDRESS2_ADDRESS3:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address2: action.address2,
          addressFeedBackError2: validateAddress(action.address2, 'address2').error,
          addressFeedBackMessage2: validateAddress(action.address2, 'address2').errorMessage
          // address3: action.address3,
          // addressFeedBackError3: validateAddress(action.address3, 'address3').error,
          // addressFeedBackMessage3: validateAddress(action.address3, 'address3').errorMessage
        }
      };
    case SET_ADDRESS3:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address3: action.address3,
          addressFeedBackError3: validateAddress(action.address3, 'address3').error,
          addressFeedBackMessage3: validateAddress(action.address3, 'address3').errorMessage
        }
      };
    case SET_STATE:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          state: action.state,
          stateFeedBackError: isEmpty(action.state)
        }
      };
    case SET_PHONE:
      if (!allowNChar(action.phone, 10) || (!allowTypeOf(action.phone, 'number') && action.phone.length > 0)) {
        return state;
      }
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          phone: action.phone,
          phoneFeedBackError: !validateMobile(action.phone),
          phoneFeedBackMessage:
            action.phone[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number !'
        }
      };
    case SET_GST:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          gst: action.gst,
          gstFeedBackError: action.gst && !isGSTNumber(action.gst),
          gstFeedBackMessage: 'GST Number is not valid'
        }
      };
    case SET_PINCODE:
      if (!allowNChar(action.pincode, 6) || (!allowTypeOf(action.pincode, 'number') && action.pincode.length > 0)) {
        return state;
      }
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          pincode: action.pincode,
          pincodeFeedBackError: isEmpty(action.pincode) || pincodeIsValid(action.pincode),
          city: '',
          state: ''
        }
      };

    // Errors
    case SET_NAME_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          fullNameFeedBackError: action.payLoad
        }
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          emailFeedBackError: action.payLoad
        }
      };
    case SET_CITY_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          cityFeedBackError: action.payLoad
        }
      };
    case SET_ADDRESS_ERROR1:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          addressFeedBackError1: action.payLoad
        }
      };
    case SET_ADDRESS_ERROR2:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          addressFeedBackError2: action.payLoad
        }
      };
    case SET_ADDRESS_ERROR3:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          addressFeedBackError3: action.payLoad
        }
      };
    case SET_STATE_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          stateFeedBackError: action.payLoad
        }
      };
    case SET_PHONE_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          phoneFeedBackError: action.payLoad
        }
      };
    case SET_PINCODE_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          pincodeFeedBackError: action.payLoad
        }
      };

    // ADDRESS FOR LOGGED IN USER
    case SET_ADDRESS_DETAILS:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          fullName: action.data.full_name,
          fullNameFeedBackError: false,
          pincode: action.data.pincode,
          pincodeFeedBackError: false,
          email: action.data.email,
          emailFeedBackError: false,
          phone: action.data.mobile,
          phoneFeedBackError: false,
          address1: action.data.address1,
          addressFeedBackError1: false,
          address2: action.data.address2,
          addressFeedBackError2: false,
          address3: action.data.address3,
          addressFeedBackError3: false,
          city: action.data.city,
          cityFeedBackError: false,
          state: action.data.state,
          stateFeedBackError: false,
          index: action.index,
          address_id: action.data.id_customer_address
        }
      };

    // PINCODE Methods
    case LOAD_PINCODE:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: true
        }
      };
    case LOAD_PINCODE_SUCCESS:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: false,
          loaded: true,
          showResults: true,
          results: 'metadata' in action.result ? action.result.metadata.suggestions : []
        }
      };
    case LOAD_PINCODE_FAIL:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    case LOAD_PINCODE_DETAILS:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: true
        }
      };
    case LOAD_PINCODE_DETAILS_SUCCESS:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: false,
          loaded: true,
          city: action.result.city || '',
          state: action.result.state || '',
          pincodeDetails: action.result.pincode_details || []
        }
      };
    case LOAD_PINCODE_DETAILS_FAIL:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    case SET_PINCODE_QUERY:
      if (!allowNChar(action.query, 6) || (!allowTypeOf(action.query, 'number') && action.query.length > 0)) {
        return state;
      }
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          loading: action.query.length >= 2,
          loaded: false,
          pincode: action.query
        }
      };
    case SET_SELECTED_PINCODE:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          pincode: action.pincode,
          cityFeedBackError: false,
          pincodeFeedBackError: false,
          stateFeedBackError: false,
          results: [],
          showResults: false
        }
      };
    case SUBMIT_FORM:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          invalid: action.error,
          formData: action.data
        }
      };
    case TOGGLE_SHIPPING_IS_BILING:
      return {
        ...state,
        shippingIsBilling: !state.shippingIsBilling,
        billing: !state.shippingIsBilling ? initialState.billing : state.billing
      };

    case CLEAR_SHIPPING:
      return {
        ...state,
        [action.formType]: {
          ...initialState[action.formType]
        }
      };
    case CLEAR_ADDRESS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export const toggleShippingIsBilling = () => ({
  type: TOGGLE_SHIPPING_IS_BILING
});
// Handle Input Changes in Form
export const onChangeFullName = (formType, name) => ({
  type: SET_NAME,
  formType,
  name
});
export const onChangeCity = (formType, city) => ({
  type: SET_CITY,
  formType,
  city
});
export const onChangeAddress2 = (formType, address2) => {
  if (address2.length > 40) {
    const add2Value = address2.slice(0, 41);
    // const add3Value = address2.slice(40);
    // document.getElementById('add3').focus();address2
    return {
      type: SET_ADDRESS2_ADDRESS3,
      formType,
      address2: add2Value
      // address3: add3Value
    };
  }
  return {
    type: SET_ADDRESS2,
    formType,
    address2
  };
};
export const onChangeAddress1 = (formType, address1) => {
  if (address1.length > 40) {
    const add1Value = address1.slice(0, 41);
    // const add2Value = address1.slice(40);
    // document.getElementById('add2').focus();
    return {
      type: SET_ADDRESS1_ADDRESS2,
      formType,
      address1: add1Value
      // address2: add2Value
    };
  }
  return {
    type: SET_ADDRESS1,
    formType,
    address1
  };
};
export const onChangeAddress3 = (formType, address3) => {
  if (address3.length > 40) {
    const add3Value = address3.slice(0, 41);
    // document.getElementById('pincodeId').focus();
    return {
      type: SET_ADDRESS3,
      formType,
      address3: add3Value
    };
  }
  return {
    type: SET_ADDRESS3,
    formType,
    address3
  };
};
export const onChangePincode = (formType, pincode) => ({
  type: SET_PINCODE,
  formType,
  pincode
});
export const onChangeState = (formType, state) => ({
  type: SET_STATE,
  formType,
  state
});
// export const onChangePhone = (formType, phone) => ({
//   type: SET_PHONE,
//   formType,
//   phone
// });
export const onChangePhone = (formType, phone) => {
  let phoneNumber = phone;
  if (phoneNumber.length === 11 && phoneNumber[0] === '0') {
    const i = phoneNumber.length - 10;
    phoneNumber = phoneNumber.substring(i);
  }
  return {
    type: SET_PHONE,
    formType,
    phone: phoneNumber
  };
};
export const onChangeEmail = (formType, email) => ({
  type: SET_EMAIL,
  formType,
  email
});
export const onChangeGST = (formType, gst) => ({
  type: SET_GST,
  formType,
  gst
});
// Set Error
export const setPhoneError = (formType, payLoad) => ({
  type: SET_PHONE_ERROR,
  formType,
  payLoad
});
export const setEmailError = (formType, payLoad) => ({
  type: SET_EMAIL_ERROR,
  formType,
  payLoad
});
export const setNameError = (formType, payLoad) => ({
  type: SET_NAME_ERROR,
  formType,
  payLoad
});
export const setPincodeError = (formType, payLoad) => ({
  type: SET_PINCODE_ERROR,
  formType,
  payLoad
});
export const setStateError = (formType, payLoad) => ({
  type: SET_STATE_ERROR,
  formType,
  payLoad
});
export const setCityError = (formType, payLoad) => ({
  type: SET_CITY_ERROR,
  formType,
  payLoad
});
export const setAddressError1 = (formType, payLoad) => ({
  type: SET_ADDRESS_ERROR1,
  formType,
  payLoad
});
export const setAddressError2 = (formType, payLoad) => ({
  type: SET_ADDRESS_ERROR2,
  formType,
  payLoad
});
export const setAddressError3 = (formType, payLoad) => ({
  type: SET_ADDRESS_ERROR3,
  formType,
  payLoad
});
// Pincodes Methods

export const load = (formType, query) => ({
  types: [LOAD_PINCODE, LOAD_PINCODE_SUCCESS, LOAD_PINCODE_FAIL],
  promise: ({ client }) => client.get(`${PINCODE_INFO}/${query}`),
  formType
});
export const loadPincodeDetails = (formType, pincode) => (dispatch, getState) =>
  dispatch({
    types: [LOAD_PINCODE_DETAILS, LOAD_PINCODE_DETAILS_SUCCESS, LOAD_PINCODE_DETAILS_FAIL],
    promise: async ({ client }) => {
      const response = await client.get(`${PINCODE_INFO}/details/${pincode}`);
      if (formType === 'shipping') {
        dispatch(loadCart(getState().app.sessionId, pincode));
        dispatch(setCity(response));
        dispatch(setPincodeDetails(response, pincode));
      }
      return response;
    },
    formType
  });
export const setPincodeQuery = (formType, query) => ({
  type: SET_PINCODE_QUERY,
  formType,
  query
});
export const setPincode = (formType, pincode) => ({
  type: SET_SELECTED_PINCODE,
  formType,
  pincode
});
export const setAddress = (formType, data, index) => ({
  type: SET_ADDRESS_DETAILS,
  formType,
  data,
  index
});

export const AddNewAddress = data => ({
  type: ADD_NEW_ADDRESS,
  data
});
export const clearShippingAddress = formType => ({
  type: CLEAR_SHIPPING,
  formType
});

export const clearAddresses = () => ({
  type: CLEAR_ADDRESS
});
