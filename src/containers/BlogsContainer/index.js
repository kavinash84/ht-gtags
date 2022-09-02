import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { getBlogsHomeData } from "../../redux/modules/blogs";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId }
    } = getState();
    if (sessionId) {
      await dispatch(getBlogsHomeData()).catch(error => console.log(error));
    }
  }
};

const BlogsContainer = HomeTownLoader({
  loader: () => import("./Blogs")
});

export default provideHooks(hooks)(BlogsContainer);
