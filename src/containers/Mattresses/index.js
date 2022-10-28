import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { getMattressesData } from "redux/modules/mattresses";

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(getMattressesData());
  }
};

const Matresses = HomeTownLoader({
  loader: () => import("./MattressesContainer" /* webpackChunkName: comboOffer' */)
});

export default provideHooks(hooks)(Matresses);
