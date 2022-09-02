import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { getBlogData } from "../../redux/modules/blogs";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const {
      app: { sessionId }
    } = getState();
    const { key } = params;
    if (sessionId && key) {
      await dispatch(getBlogData(key)).catch(error => console.log(error));
    }
  }
};

const BlogContainer = HomeTownLoader({
  loader: () => import("./blog")
});

export default provideHooks(hooks)(BlogContainer);
