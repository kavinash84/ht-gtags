import HomeTownLoader from 'containers/Loader';

const WebToChat = HomeTownLoader({
  loader: () => import('./WebToChat' /* webpackChunkName: 'WebToChat' */)
});

export default WebToChat;
