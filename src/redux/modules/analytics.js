const BANNER_IMPRESSION = 'mainSlider/BANNER_IMPRESSION';
const BANNER_CLICK = 'mainSlider/BANNER_CLICK';
const IS_FIRST_HIT = 'referrerReset/IS_FIRST_HIT';

const initialState = {
  bannerSlides: [],
  isFirstHit: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BANNER_IMPRESSION:
      return {
        ...state,
        bannerSlides: [...state.bannerSlides, action.payload]
      };
    case IS_FIRST_HIT:
      return {
        ...state,
        isFirstHit: state.isFirstHit + 1
      };
    default:
      return state;
  }
};

export const triggerImpression = payload => (dispatch, getState) => {
  const {
    analytics: { bannerSlides }
  } = getState();
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

export const resetReferrer = () => ({
  type: IS_FIRST_HIT
});
