import {
  App,
  Home,
  HomeSlider,
  RecommendedForYou,
  TopSellingProducts,
  RecentlyViewedProducts,
  Menu,
  Login,
  Signup,
  Listing,
  Wishlist,
  Cart,
  Profile,
  UpdatePassword,
  Payment,
  NotFound
} from 'containers';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/home-slider', exact: true, component: HomeSlider },
      { path: '/recommended-for-you', exact: true, component: RecommendedForYou },
      { path: '/top-selling-products', exact: true, component: TopSellingProducts },
      { path: '/recently-viewed-products', exact: true, component: RecentlyViewedProducts },
      { path: '/menu', exact: true, component: Menu },
      { path: '/login', exact: true, component: Login },
      { path: '/signup', exact: true, component: Signup },
      { path: '/listing', exact: true, component: Listing },
      { path: '/wishlist', exact: true, component: Wishlist },
      { path: '/cart', exact: true, component: Cart },
      { path: '/profile', exact: true, component: Profile },
      { path: '/update-password', exact: true, component: UpdatePassword },
      { path: '/payment', exact: true, component: Payment },
      { component: NotFound }
    ]
  }
];

export default routes;
