import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadStores, isLoaded as isStoresLoaded } from "redux/modules/stores";
import { loadCart } from "redux/modules/cart";
import { loadPackageCatalog } from "redux/modules/lackpackages";
import { PINCODE } from "helpers/Constants";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const {
      app: { sessionId },
      pincode: { selectedPincode },
      lackpackages: { currentPackage, package_catalog }
    } = getState();
    if (sessionId) {
      const { packageid } = params;
      const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
      if (currentPackage !== packageid) {
        await dispatch(loadPackageCatalog(pincode, packageid)).catch(error =>
          console.log(error)
        );
      }
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const PackageCatalog = HomeTownLoader({
  loader: () =>
    import(
      "./PackageCatlogContainer" /* webpackChunkName: 'ModularKitchenMicro' */
    )
});

export default provideHooks(hooks)(PackageCatalog);
