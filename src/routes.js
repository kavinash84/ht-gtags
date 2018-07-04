import {
  App,
  Home,
  Listing,
  MyOrder,
  OrderDetails,
  OrderSummary,
  UpdatePassword,
  Payment,
  ProductDetails,
  DeliveryAddress,
  PaymentOptions,
  ReviewOrder,
  NotFound
} from 'containers';
import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import Profile from 'containers/Profile';
import Category from 'containers/Category/Category';
import Wishlist from 'containers/Wishlist';
import Cart from 'containers/Cart';

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserLoggedIn'
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/profile',
  authenticatedSelector: state => !state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
});

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/category/:category', exact: true, component: Category },
      { path: '/login', exact: true, component: isNotAuthenticated(Login) },
      { path: '/signup', exact: true, component: isNotAuthenticated(Signup) },
      { path: '/forgot-password/verify/reset/:hash', exact: true, component: ResetPassword },
      { path: '/forgot-password', exact: true, component: isNotAuthenticated(ForgotPassword) },
      { path: '/wishlist', exact: true, component: isAuthenticated(Wishlist) },
      { path: '/cart', exact: true, component: Cart },
      { path: '/my-orders', exact: true, component: isAuthenticated(MyOrder) },
      { path: '/order-details', exact: true, component: OrderDetails },
      { path: '/order-summary', exact: true, component: OrderSummary },
      { path: '/profile', exact: true, component: isAuthenticated(Profile) },
      { path: '/update-password', exact: true, component: UpdatePassword },
      { path: '/payment', exact: true, component: Payment },
      { path: '/product-details/:skuId', exact: true, component: ProductDetails },
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
