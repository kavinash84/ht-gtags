import {
  App,
  Home,
  Menu,
  Listing,
  Wishlist,
  Cart,
  MyOrder,
  OrderDetails,
  OrderSummary,
  UpdatePassword,
  Payment,
  TestCounter,
  ProductDetails,
  ProductCarousel,
  DeliveryAddress,
  PaymentOptions,
  ReviewOrder,
  NotFound
} from 'containers';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import Profile from 'containers/Profile';

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/menu', exact: true, component: Menu },
      { path: '/login', exact: true, component: Login },
      { path: '/signup', exact: true, component: Signup },
      { path: '/listing', exact: true, component: Listing },
      { path: '/wishlist', exact: true, component: Wishlist },
      { path: '/cart', exact: true, component: Cart },
      { path: '/my-orders', exact: true, component: MyOrder },
      { path: '/order-details', exact: true, component: OrderDetails },
      { path: '/order-summary', exact: true, component: OrderSummary },
      { path: '/profile', exact: true, component: Profile },
      { path: '/update-password', exact: true, component: UpdatePassword },
      { path: '/payment', exact: true, component: Payment },
      { path: '/counter', exact: true, component: TestCounter },
      { path: '/product-details', exact: true, component: ProductDetails },
      { path: '/product-carousel', exact: true, component: ProductCarousel },
      { path: '/delivery-address', exact: true, component: DeliveryAddress },
      { path: '/payment-options', exact: true, component: PaymentOptions },
      { path: '/review-order', exact: true, component: ReviewOrder },
      { path: '/search', exact: false, component: Listing },
      {
        path: '/:category/:subcategory1?/:subcategory2?/:subcategory3?/:subcategory4?/:subcategory5?',
        exact: true,
        component: Listing
      },
      { component: NotFound }
    ]
  }
];

export default routes;
