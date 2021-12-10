import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { loadStores, isLoaded as isStoresLoaded } from "redux/modules/stores";
import { loadmodularkitchenNewData } from "redux/modules/modularkitchen";

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadmodularkitchenNewData()).catch(error =>
      console.log(error)
    );
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

const ModularKitchenNew = HomeTownLoader({
  loader: () =>
    import("./ModularKitchenNew" /* webpackChunkName: 'HomeInterior' */)
});

export default provideHooks(hooks)(ModularKitchenNew);
