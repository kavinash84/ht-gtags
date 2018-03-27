import {
  App,
  Home,
  HomeSlider,
  ShopByOccasion,
  ShopByRoom,
  ShopByStyle,
  RecommendedForYou,
  TopSellingProducts,
  RecentlyViewedProducts,
  Menu,
  NotFound
} from 'containers';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/home-slider', exact: true, component: HomeSlider },
      { path: '/shop-by-occasion', exact: true, component: ShopByOccasion },
      { path: '/shop-by-room', exact: true, component: ShopByRoom },
      { path: '/shop-by-style', exact: true, component: ShopByStyle },
      { path: '/recommended-for-you', exact: true, component: RecommendedForYou },
      { path: '/top-selling-products', exact: true, component: TopSellingProducts },
      { path: '/recently-viewed-products', exact: true, component: RecentlyViewedProducts },
      { path: '/menu', exact: true, component: Menu },
      { component: NotFound }
    ]
  }
];

export default routes;
