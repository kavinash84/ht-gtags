const SELECT_FOR_DEMO = 'selectForDemo/SELECT_FOR_DEMO';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_FOR_DEMO:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}

export const addToSelectForDemo = data => ({
  type: SELECT_FOR_DEMO,
  data
});
