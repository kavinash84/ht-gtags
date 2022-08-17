import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import {
  loadProductDescription,
  gaTrack as productLoadGaTrack,
  getfinanceOptions
} from "redux/modules/productdetails";
import { setRecentlyViewed } from "redux/modules/recentlyviewed";
import { loadReview } from "redux/modules/reviews";
import { PINCODE } from "../../helpers/Constants";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const {
      productdetails: { currentsku },
      pincode: { selectedPincode }
    } = getState();
    const pincode = selectedPincode || PINCODE;
    dispatch(getfinanceOptions());
    if (currentsku !== params.skuId) {
      await dispatch(loadProductDescription(params.skuId, pincode));
    }
  },
  defer: ({ store: { dispatch, getState }, params }) => {
    const {
      productdetails: { productDescription }
    } = getState();
    if (productDescription && !productDescription.error_message) {
      dispatch(loadReview(params.skuId));
      dispatch(setRecentlyViewed(params.skuId));
    }
  },
  done: ({ store: { dispatch } }) => dispatch(productLoadGaTrack())
};

const ProductDetails = HomeTownLoader({
  loader: () =>
    import("./ProductDetails" /* webpackChunkName: 'ProductDetails' */)
});

export default provideHooks(hooks)(ProductDetails);
