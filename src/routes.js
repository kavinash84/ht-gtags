import {
  App,
  Home,
  Menu,
  Listing,
  Wishlist,
  Cart,
  MyOrder,
  OrderDetails,
  UpdatePassword,
  Payment,
  TestCounter,
  ProductDetails,
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
      { path: '/my-order', exact: true, component: MyOrder },
      { path: '/order-details', exact: true, component: OrderDetails },
      { path: '/profile', exact: true, component: Profile },
      { path: '/update-password', exact: true, component: UpdatePassword },
      { path: '/payment', exact: true, component: Payment },
      { path: '/counter', exact: true, component: TestCounter },
      { path: '/product-details', exact: true, component: ProductDetails },
      { component: NotFound }
    ]
  }
];

export default routes;
