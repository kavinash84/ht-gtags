import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { loadExchangeOffer } from "redux/modules/designbuild";

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadExchangeOffer());
  }
};

const ExchangeOffer = HomeTownLoader({
  loader: () =>
    import("./exhangeOfferContainer" /* webpackChunkName: 'ExchangeOffer' */)
});

export default provideHooks(hooks)(ExchangeOffer);
