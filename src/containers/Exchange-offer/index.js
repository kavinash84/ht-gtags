import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
// import { loadModKitchenData } from 'redux/modules/modularkitchen';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    // await dispatch(loadModKitchenData()).catch(error => console.log(error));
  }
};

const ExchangeOffer = HomeTownLoader({
  loader: () =>
    import("./exhangeOfferContainer" /* webpackChunkName: 'ExchangeOffer' */)
});

export default provideHooks(hooks)(ExchangeOffer);
