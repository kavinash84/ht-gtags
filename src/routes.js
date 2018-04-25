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
  Login,
  Signup,
  Listing,
  Wishlist,
  Cart,
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
      { path: '/login', exact: true, component: Login },
      { path: '/sign-up', exact: true, component: Signup },
      { path: '/listing', exact: true, component: Listing },
      { path: '/wishlist', exact: true, component: Wishlist },
      { path: '/cart', exact: true, component: Cart },
      { component: NotFound }
    ]
  }
];

export default routes;
