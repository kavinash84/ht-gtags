import { App, Home, HomeSlider, NotFound } from 'containers';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/home-slider', exact: true, component: HomeSlider },
      { component: NotFound }
    ]
  }
];

export default routes;
