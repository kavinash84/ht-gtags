const SEND_DELIVERY_ADDRESS = 'checkout/SEND_DELIVERY_ADDRESS';
const SEND_DELIVERY_ADDRESS_SUCCESS = 'checkout/SEND_DELIVERY_ADDRESS_SUCCESS';
const SEND_DELIVERY_ADDRESS_FAIL = 'checkout/SEND_DELIVERY_ADDRESS_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  nextstep: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_DELIVERY_ADDRESS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    case SEND_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nextstep: action.result,
        error: false
      };
    case SEND_DELIVERY_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        nextstep: false,
        error: 'Some Error Occured'
      };
    default:
      return state;
  }
}

export const sendDeliveryAddress = (sessionId, data) => ({
  types: [SEND_DELIVERY_ADDRESS, SEND_DELIVERY_ADDRESS_SUCCESS, SEND_DELIVERY_ADDRESS_FAIL],
  promise: async ({ client }) => {
    try {
      const { shippingAddress, billingAddress, shippingIsBilling } = data;
      const postData = {
        session_id: sessionId,
        email: shippingAddress.email,
        fullname: shippingAddress.fullName,
        mobile: shippingAddress.phone,
        shipping_info: {
          email: shippingAddress.email,
          fullname: shippingAddress.fullName,
          mobile: shippingAddress.phone,
          pincode: shippingAddress.pincode,
          address: shippingAddress.address
        },
        is_billing_address_same: shippingIsBilling,
        billing_info: {
          email: billingAddress.email,
          fullname: billingAddress.fullName,
          mobile: billingAddress.phone,
          pincode: billingAddress.pincode,
          address: billingAddress.address
        }
      };
      console.log(postData);
      return client.post('/tesla/checkout/customer-registration', postData);
    } catch (error) {
      throw error;
    }
  }
});
