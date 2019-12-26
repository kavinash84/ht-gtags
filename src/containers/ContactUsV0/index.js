import HomeTownLoader from 'containers/Loader';

const ContactUs = HomeTownLoader({
  loader: () => import('./ContactUs' /* webpackChunkName: 'ContactUs' */)
});

export default ContactUs;
