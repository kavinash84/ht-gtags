import { App, Home, NotFound } from 'containers';

const routes = [
  {
    component: App,
    routes: [{ path: '/', exact: true, component: Home }, { component: NotFound }]
  }
];

export default routes;
