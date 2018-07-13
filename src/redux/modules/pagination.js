const SET_CURRENT_PAGE = 'pagination/SET_CURRENT_PAGE';
const RESET_CURRENT_PAGE = 'pagination/RESET_CURRENT_PAGE';

const initialState = {
  page: 1
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      console.log(action);
      return {
        ...state,
        page: action.page
      };
    case RESET_CURRENT_PAGE:
      return {
        ...state,
        page: 1
      };
    default:
      return state;
  }
}
export const resetPagination = () => ({
  type: RESET_CURRENT_PAGE
});

export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  page
});
