import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadCategory, setCategory, isLoaded } from "redux/modules/category";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { category } = params;
    await dispatch(setCategory(category));
    // if (!isLoaded(getState(), category)) {
    await dispatch(loadCategory(category)).catch(error => console.log(error));
    // }
  }
};
const Category = HomeTownLoader({
  loader: () => import("./Category" /* webpackChunkName: 'Category' */)
});

export default provideHooks(hooks)(Category);
