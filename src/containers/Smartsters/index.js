import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadSmartstersData } from "../../redux/modules/smartsters";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadSmartstersData()).catch(error => console.log(error));
  }
};

const Smartsters = HomeTownLoader({
  loader: () => import("./Smartsters" /* webpackChunkName: 'Smartsters' */)
});

export default provideHooks(hooks)(Smartsters);
