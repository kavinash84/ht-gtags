import { HOME_BLOGS, BLOGS_CAT, SINGLE_BLOG } from "helpers/apiUrls";

const LOAD_BLOG_HOME = "blogs/LOAD_BLOG_HOME";
const LOAD_BLOG_HOME_SUCCESS = "blogs/LOAD_BLOG_HOME_SUCCESS";
const LOAD_BLOG_HOME_FAILURE = "blogs/LOAD_BLOG_HOME_FAILURE";

const LOAD_BLOGS_CAT = "blogs/LOAD_BLOGS_CAT";
const LOAD_BLOGS_CAT_SUCCESS = "blogs/LOAD_BLOGS_CAT_SUCCESS";
const LOAD_BLOGS_CAT_FAILURE = "blogs/LOAD_BLOGS_CAT_FAILURE";

const LOAD_SINGLE_BLOG = "blogs/LOAD_SINGLE_BLOG";
const LOAD_SINGLE_BLOG_SUCCESS = "blogs/LOAD_SINGLE_BLOG_SUCCESS";
const LOAD_SINGLE_BLOG_FAILURE = "blogs/LOAD_SINGLE_BLOG_FAILURE";

const initialState = {
  loading: false,
  loaded: false,
  homeData: { category_list: [], banner_list: [] },
  currentCatData: "",
  currentPostData: "",
  error: false,
  errorMessage: ""
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_BLOG_HOME:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    case LOAD_BLOG_HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        homeData: action.result
      };
    case LOAD_BLOG_HOME_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorMessage: action.error.error_message
      };

    case LOAD_BLOGS_CAT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    case LOAD_BLOGS_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentCatData: action.result
      };
    case LOAD_BLOGS_CAT_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        currentCatData: "",
        errorMessage: action.error.error_message
      };

    case LOAD_SINGLE_BLOG:
      return {
        ...state,
        loading: true,
        loaded: false,
        currentPostData: "",
        error: false
      };
    case LOAD_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentPostData: action.result
      };
    case LOAD_SINGLE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        currentPostData: "",
        errorMessage: action.error.error_message
      };
    default:
      return state;
  }
}

export const getBlogsHomeData = () => ({
  types: [LOAD_BLOG_HOME, LOAD_BLOG_HOME_SUCCESS, LOAD_BLOG_HOME_FAILURE],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.get(HOME_BLOGS);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const getBlogsCatData = cat => ({
  types: [LOAD_BLOGS_CAT, LOAD_BLOGS_CAT_SUCCESS, LOAD_BLOG_HOME_FAILURE],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.get(`${BLOGS_CAT}/${cat}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const getBlogData = blog => ({
  types: [LOAD_SINGLE_BLOG, LOAD_SINGLE_BLOG_SUCCESS, LOAD_SINGLE_BLOG_FAILURE],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.get(`${SINGLE_BLOG}/${blog}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
