import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadStores, isLoaded as isStoresLoaded } from "redux/modules/stores";
import { loadPackages } from "redux/modules/lackpackages";
import { PINCODE } from "helpers/Constants";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId },
      pincode: { selectedPincode }
    } = getState();
    if (sessionId) {
      const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
      await dispatch(loadPackages(pincode)).catch(error => console.log(error));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const OneLacPackage = HomeTownLoader({
  loader: () =>
    import(
      "./OneLacPackageContainer" /* webpackChunkName: 'ModularKitchenMicro' */
    )
});

export default provideHooks(hooks)(OneLacPackage);
