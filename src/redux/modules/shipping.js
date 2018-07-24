// Validators
import { validateMobile } from 'js-utility-functions';
import { isEmpty, pincode as pincodeIsValid } from 'utils/validation';

const emailIsValid = value => !isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const ON_CHANGE_CITY = 'shipping/ON_CHANGE_CITY';
const ON_CHANGE_ADDRESS = 'shipping/ON_CHANGE_ADDRESS';
const ON_CHANGE_NAME = 'shipping/ON_CHANGE_NAME';
const ON_CHANGE_STATE = 'shipping/ON_CHANGE_STATE';
const ON_CHANGE_PINCODE = 'shipping/ON_CHANGE_PINCODE';
const ON_CHANGE_PHONE = 'shipping/ON_CHANGE_PHONE';
const ON_CHANGE_EMAIL = 'shipping/ON_CHANGE_EMAIL';

const SET_NAME_ERROR = 'shipping/SET_NAME_ERROR';
const SET_PINCODE_ERROR = 'shipping/SET_PINCODE_ERROR';
const SET_PHONE_ERROR = 'shipping/SET_PHONE_ERROR';
const SET_ADDRESS_ERROR = 'shipping/SET_ADDRESS_ERROR';
const SET_CITY_ERROR = 'shipping/SET_CITY_ERROR';
const SET_STATE_ERROR = 'shipping/SET_STATE_ERROR';
const SET_EMAIL_ERROR = 'shipping/SET_EMAIL_ERROR';

const SET_ADDRESS = 'shipping/SET_ADDRESS';

// Pincode Methods
const LOAD_PINCODE = 'shipping/LOAD_PINCODE';
const LOAD_PINCODE_SUCCESS = 'shipping/LOAD_PINCODE_SUCCESS';
const LOAD_PINCODE_FAIL = 'shipping/LOAD_PINCODE_FAIL';
const SET_PINCODE_QUERY = 'shipping/SET_PINCODE_QUERY';
const SET_SELECTED_PINCODE = 'shipping/SET_SELECTED_PINCODE';

const LOAD_PINCODE_DETAILS = 'shipping/LOAD_PINCODE_DETAILS';
const LOAD_PINCODE_DETAILS_SUCCESS = 'shipping/LOAD_PINCODE_DETAILS_SUCCESS';
const LOAD_PINCODE_DETAILS_FAIL = 'shipping/LOAD_PINCODE_DETAILS_FAIL';

const initialState = {
  // Form State
  fullName: '',
  fullNameFeedBackError: false,
  fullNameFeedBackMessage: 'Name Cannot be Left Empty !',
  email: '',
  emailFeedBackError: false,
  emailFeedBackMessage: 'Email is Not Valid  !',
  phone: '',
  phoneFeedBackError: false,
  phoneFeedBackMessage: 'Phone is Not Valid !',
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

  // Pincode state
  loading: false,
  loaded: false,
  results: [],
  showResults: false,
  selectedPincode: '',
  pincodeDetails: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ON_CHANGE_NAME:
      return {
        ...state,
        fullName: action.name,
        fullNameFeedBackError: isEmpty(action.name)
      };
    case ON_CHANGE_EMAIL:
      return {
        ...state,
        email: action.email,
        emailFeedBackError: !emailIsValid(action.email)
      };
    case ON_CHANGE_CITY:
      return {
        ...state,
        city: action.city,
        cityFeedBackError: isEmpty(action.city)
      };
    case ON_CHANGE_ADDRESS:
      return {
        ...state,
        address: action.address,
        addressFeedBackError: isEmpty(action.address)
      };
    case ON_CHANGE_STATE:
      return {
        ...state,
        state: action.state,
        stateFeedBackError: isEmpty(action.state)
      };
    case ON_CHANGE_PHONE:
      return {
        ...state,
        phone: action.phone,
        phoneFeedBackError: validateMobile(action.phone).error
      };
    case ON_CHANGE_PINCODE:
      return {
        ...state,
        pincode: action.pincode,
        pincodeFeedBackError: isEmpty(action.pincode) || pincodeIsValid(action.pincode)
      };

    // Errors
    case SET_NAME_ERROR:
      return {
        ...state,
        fullNameFeedBackError: action.payLoad
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailFeedBackError: action.payLoad
      };
    case SET_CITY_ERROR:
      return {
        ...state,
        cityFeedBackError: action.payLoad
      };
    case SET_ADDRESS_ERROR:
      return {
        ...state,
        addressFeedBackError: action.payLoad
      };
    case SET_STATE_ERROR:
      return {
        ...state,
        stateFeedBackError: action.payLoad
      };
    case SET_PHONE_ERROR:
      return {
        ...state,
        phoneFeedBackError: action.payLoad
      };
    case SET_ADDRESS:
      return {
        ...state,
        fullName: action.data.full_name,
        pincode: action.data.pincode,
        email: action.data.email,
        phone: action.data.mobile,
        address: action.data.address,
        city: action.data.city,
        state: action.data.state
      };
    case SET_PINCODE_ERROR:
      return {
        ...state,
        pincodeFeedBackError: action.payLoad
      };
    // Pincode Methods
    case LOAD_PINCODE:
      return {
        ...state,
        loading: true
      };
    case LOAD_PINCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        showResults: true,
        results: 'metadata' in action.result ? action.result.metadata.suggestions : []
      };
    case LOAD_PINCODE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_PINCODE_DETAILS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PINCODE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        city: action.result.pincode_details[0].city,
        state: action.result.pincode_details[0].state,
        pincodeDetails: action.result.pincode_details || []
      };
    case LOAD_PINCODE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_PINCODE_QUERY:
      return {
        ...state,
        loading: action.query.length >= 2,
        loaded: false,
        pincode: action.query
      };
    case SET_SELECTED_PINCODE:
      return {
        ...state,
        pincode: action.pincode,
        cityFeedBackError: false,
        pincodeFeedBackError: false,
        stateFeedBackError: false,
        results: [],
        showResults: false
      };
    default:
      return state;
  }
}

export const onChangeCity = city => ({
  type: ON_CHANGE_CITY,
  city
});

export const onChangeAddress = address => ({
  type: ON_CHANGE_ADDRESS,
  address
});

export const onChangeFullName = name => ({
  type: ON_CHANGE_NAME,
  name
});

export const onChangePincode = pincode => ({
  type: ON_CHANGE_PINCODE,
  pincode
});

export const onChangeState = state => ({
  type: ON_CHANGE_STATE,
  state
});
export const onChangePhone = phone => ({
  type: ON_CHANGE_PHONE,
  phone
});
export const onChangeEmail = email => ({
  type: ON_CHANGE_EMAIL,
  email
});

// Sets Error
export const setPhoneError = payLoad => ({
  type: SET_PHONE_ERROR,
  payLoad
});
export const setEmailError = payLoad => ({
  type: SET_EMAIL_ERROR,
  payLoad
});
export const setNameError = payLoad => ({
  type: SET_NAME_ERROR,
  payLoad
});
export const setPincodeError = payLoad => ({
  type: SET_PINCODE_ERROR,
  payLoad
});
export const setStateError = payLoad => ({
  type: SET_STATE_ERROR,
  payLoad
});
export const setCityError = payLoad => ({
  type: SET_CITY_ERROR,
  payLoad
});
export const setAddressError = payLoad => ({
  type: SET_ADDRESS_ERROR,
  payLoad
});

// Pincodes Methods

export const load = query => ({
  types: [LOAD_PINCODE, LOAD_PINCODE_SUCCESS, LOAD_PINCODE_FAIL],
  promise: ({ client }) => client.get(`tesla/locations/pincode/${query}`)
});
export const loadPincodeDetails = pincode => ({
  types: [LOAD_PINCODE_DETAILS, LOAD_PINCODE_DETAILS_SUCCESS, LOAD_PINCODE_DETAILS_FAIL],
  promise: ({ client }) => client.get(`tesla/session/${pincode}`)
});
export const setPincodeQuery = query => ({
  type: SET_PINCODE_QUERY,
  query
});
export const setPincode = pincode => ({
  type: SET_SELECTED_PINCODE,
  pincode
});
export const setAddress = data => ({
  type: SET_ADDRESS,
  data
});
