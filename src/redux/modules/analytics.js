const BANNER_IMPRESSION = 'mainSlider/BANNER_IMPRESSION';
const BANNER_CLICK = 'mainSlider/BANNER_CLICK';

const initialState = {
  bannerSlides: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BANNER_IMPRESSION:
      return {
        ...state,
        bannerSlides: [...state.bannerSlides, action.payload]
      };
    default:
      return state;
  }
};

export const triggerImpression = payload => (dispatch, getState) => {
  const { analytics: { bannerSlides } } = getState();
  if (!bannerSlides.includes(payload)) {
    dispatch({
      type: BANNER_IMPRESSION,
      payload
    });
  }
};

export const triggerClick = payload => ({
  type: BANNER_CLICK,
  payload
});
