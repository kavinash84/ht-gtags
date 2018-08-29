const SET_NAME = 'billing/SET_NAME';

const initialState = {
  shipping: {
    name: ''
  },
  billing: {
    name: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        [action.formType]: {
          ...state.formType,
          name: action.name
        }
      };
    default:
      return state;
  }
}

export const onChangeName = (formType, name) => ({
  type: SET_NAME,
  formType,
  name
});
