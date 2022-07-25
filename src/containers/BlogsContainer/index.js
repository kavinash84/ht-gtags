import HomeTownLoader from 'containers/Loader';

const BlogsContainer = HomeTownLoader({
  loader: () => import('./Blogs')
});

export default BlogsContainer;
