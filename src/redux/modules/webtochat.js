const CLOSE_POPUP = 'webToChat/CLOSE_POPUP';
const DISMISS = 'webToChat/DISMISS';

const initialState = {
  visible: false,
  dismiss: false,
  pdpTimeout: 120000,
  paymentTimeout: 120000,
  cartTimeout: 120000
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLOSE_POPUP:
      return {
        ...state,
        visible: action.visible
      };
    case DISMISS: {
      return {
        ...state,
        visible: false,
        dismiss: true
      };
    }
    default:
      return state;
  }
}

export const togglePopUp = value => ({
  type: CLOSE_POPUP,
  visible: value
});

export const dismiss = () => ({
  type: DISMISS,
  dismiss: true
});
