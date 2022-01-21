import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadProductDescription, gaTrack as productLoadGaTrack, loadBoughtTogether } from 'redux/modules/productdetails';
import { loadColorProducts } from 'redux/modules/colorproducts';
import { load as loadRelatedProducts } from 'redux/modules/relatedproducts';
import { loadEmiOptions } from 'redux/modules/emioptions';
import { setRecentlyViewed } from 'redux/modules/recentlyviewed';
import { loadReview } from 'redux/modules/reviews';
import { PINCODE } from '../../helpers/Constants';

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const {
      productdetails: { currentsku },
      pincode: { selectedPincode }
    } = getState();
    const pincode = selectedPincode || PINCODE;
    if (currentsku !== params.skuId) {
      await dispatch(loadProductDescription(params.skuId, pincode));
      await dispatch(loadBoughtTogether(params.skuId));
    }
  },
  defer: ({ store: { dispatch, getState }, params }) => {
    const {
      pincode: { selectedPincode },
      productdetails: { productDescription }
    } = getState();
    if (productDescription && !productDescription.error_message) {
      const pincode = selectedPincode || PINCODE;
      dispatch(loadReview(params.skuId));
      dispatch(loadColorProducts(params.skuId, pincode));
      dispatch(loadRelatedProducts(params.skuId, pincode));
      dispatch(setRecentlyViewed(params.skuId));
      dispatch(loadEmiOptions(params.skuId, pincode));
    }
  },
  done: ({ store: { dispatch } }) => dispatch(productLoadGaTrack())
};

const ProductDetails = HomeTownLoader({
  loader: () => import('./ProductDetails' /* webpackChunkName: 'ProductDetails' */)
});

export default provideHooks(hooks)(ProductDetails);
