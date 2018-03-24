import { App, Home, HomeSlider, ShopByOccasion, NotFound } from 'containers';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/home-slider', exact: true, component: HomeSlider },
      { path: '/shop-by-occasion', exact: true, component: ShopByOccasion },
      { component: NotFound }
    ]
  }
];

export default routes;
