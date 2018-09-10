// Validators
import { isEmpty, pincode as pincodeIsValid, validateMobile } from 'utils/validation';

const emailIsValid = value => !isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const TOGGLE_SHIPPING_IS_BILING = 'deliveryaddress/TOGGLE_SHIPPING_IS_BILING';

const SET_NAME = 'deliveryaddress/SET_NAME';
const SET_CITY = 'deliveryaddress/SET_CITY';
const SET_EMAIL = 'deliveryaddress/SET_EMAIL';
const SET_ADDRESS = 'deliveryaddress/SET_ADDRESS';
const SET_STATE = 'deliveryaddress/SET_STATE';
const SET_PHONE = 'deliveryaddress/SET_PHONE';
const SET_PINCODE = 'deliveryaddress/SET_PINCODE';

const SET_NAME_ERROR = 'deliveryaddress/SET_NAME_ERROR';
const SET_PINCODE_ERROR = 'deliveryaddress/SET_PINCODE_ERROR';
const SET_PHONE_ERROR = 'deliveryaddress/SET_PHONE_ERROR';
const SET_ADDRESS_ERROR = 'deliveryaddress/SET_ADDRESS_ERROR';
const SET_CITY_ERROR = 'deliveryaddress/SET_CITY_ERROR';
const SET_STATE_ERROR = 'deliveryaddress/SET_STATE_ERROR';
const SET_EMAIL_ERROR = 'deliveryaddress/SET_EMAIL_ERROR';

const SET_ADDRESS_DETAILS = 'deliveryaddress/SET_ADDRESS_DETAILS';

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
    address: '',
    addressFeedBackError: false,
    addressFeedBackMessage: 'Address Cannot be Left Empty !',
    city: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City cannot be Empty',
    pincode: '',
    pincodeFeedBackError: false,
    pincodeFeedBackMessage: 'Pincode is Invalid !',
    state: '',
    stateFeedBackError: false,
    stateFeedBackMessage: 'State cannot be Empty',
    index: 0
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
    address: '',
    addressFeedBackError: false,
    addressFeedBackMessage: 'Address Cannot be Left Empty !',
    city: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City cannot be Empty',
    pincode: '',
    pincodeFeedBackError: false,
    pincodeFeedBackMessage: 'Pincode is Invalid !',
    state: '',
    stateFeedBackError: false,
    stateFeedBackMessage: 'State cannot be Empty'
    // error: true,
    // formData: null
  },
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
          fullNameFeedBackError: isEmpty(action.name)
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
    case SET_ADDRESS:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          address: action.address,
          addressFeedBackError: isEmpty(action.address)
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
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          phone: action.phone,
          phoneFeedBackError: !validateMobile(action.phone)
        }
      };
    case SET_PINCODE:
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
    case SET_ADDRESS_ERROR:
      return {
        ...state,
        [action.formType]: {
          ...state[action.formType],
          addressFeedBackError: action.payLoad
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
          address: action.data.address,
          addressFeedBackError: false,
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
          city: (action.result.pincode_details[0] && action.result.pincode_details[0].city) || '',
          state: (action.result.pincode_details[0] && action.result.pincode_details[0].state) || '',
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
        shippingIsBilling: !state.shippingIsBilling
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
export const onChangeAddress = (formType, address) => ({
  type: SET_ADDRESS,
  formType,
  address
});
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
export const onChangePhone = (formType, phone) => ({
  type: SET_PHONE,
  formType,
  phone
});
export const onChangeEmail = (formType, email) => ({
  type: SET_EMAIL,
  formType,
  email
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
export const setAddressError = (formType, payLoad) => ({
  type: SET_ADDRESS_ERROR,
  formType,
  payLoad
});

// Pincodes Methods

export const load = (formType, query) => ({
  types: [LOAD_PINCODE, LOAD_PINCODE_SUCCESS, LOAD_PINCODE_FAIL],
  promise: ({ client }) => client.get(`tesla/locations/pincode/${query}`),
  formType
});
export const loadPincodeDetails = (formType, pincode) => ({
  types: [LOAD_PINCODE_DETAILS, LOAD_PINCODE_DETAILS_SUCCESS, LOAD_PINCODE_DETAILS_FAIL],
  promise: ({ client }) => client.get(`tesla/session/${pincode}`),
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

export const clearShippingAddress = formType => ({
  type: CLEAR_SHIPPING,
  formType
});

export const clearAddresses = () => ({
  type: CLEAR_ADDRESS
});
