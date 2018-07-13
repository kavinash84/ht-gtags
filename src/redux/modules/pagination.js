const RESET_PAGE = 'pagination/RESET_PAGE';
const SET_PAGE = 'pagination/SET_PAGE';
const maxpagestoshow = 5;
const displayPages = Array(maxpagestoshow)
  .fill()
  .map((v, i) => i + 1);

const initialState = {
  page: 1,
  displayPages
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PAGE: {
      return {
        ...state,
        page: action.page
      };
    }
    case RESET_PAGE: {
      return {
        ...state,
        page: 1
      };
    }
    default:
      return state;
  }
}

export const resetPagination = () => ({
  type: RESET_PAGE
});

export const setPage = page => ({
  type: SET_PAGE,
  page
});
