import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadStores, isLoaded as isStoresLoaded } from "redux/modules/stores";
import { loadReviewsBanneres } from "redux/modules/reviews";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadReviewsBanneres()).catch(error => console.log(error));
    // if (!gotData(getState(), 'modularkitchen')) {
    //   await dispatch(getData(`${STATIC_BLOCK_API}/modular_kitchen_react`, 'modularkitchen'));
    // }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const Review = HomeTownLoader({
  loader: () =>
    import("./ReviewContainer" /* webpackChunkName: 'ModularKitchenMicro' */)
});

export default provideHooks(hooks)(Review);
