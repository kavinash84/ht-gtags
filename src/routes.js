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
  DeliveryAddress,
  PaymentOptions,
  ReviewOrder,
  Stores,
  CartEmpty,
  ProductNotFound,
  NotFound
} from 'containers';
import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import Profile from 'containers/Profile';
import Pincode from 'components/Pincode';
import SimpleSlider from 'components/SlickSlider';

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserLoggedIn'
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: '/',
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
      { path: '/menu', exact: true, component: Menu },
      { path: '/slick', exact: true, component: SimpleSlider },
      { path: '/login', exact: true, component: Login },
      { path: '/signup', exact: true, component: isNotAuthenticated(Signup) },
      { path: '/forgot-password', exact: true, component: isAuthenticated(ForgotPassword) },
      { path: '/reset-password', exact: true, component: ResetPassword },
      { path: '/listing', exact: true, component: Listing },
      { path: '/wishlist', exact: true, component: isAuthenticated(Wishlist) },
      { path: '/cart', exact: true, component: Cart },
      { path: '/my-orders', exact: true, component: isAuthenticated(MyOrder) },
      { path: '/order-details', exact: true, component: OrderDetails },
      { path: '/order-summary', exact: true, component: OrderSummary },
      { path: '/profile', exact: true, component: isAuthenticated(Profile) },
      { path: '/update-password', exact: true, component: UpdatePassword },
      { path: '/payment', exact: true, component: Payment },
      { path: '/counter', exact: true, component: TestCounter },
      { path: '/product-details', exact: true, component: ProductDetails },
      { path: '/delivery-address', exact: true, component: DeliveryAddress },
      { path: '/payment-options', exact: true, component: PaymentOptions },
      { path: '/review-order', exact: true, component: ReviewOrder },
      { path: '/search', exact: false, component: Listing },
      { path: '/pincode', exact: true, component: Pincode },
      { path: '/stores', exact: true, component: Stores },
      { path: '/product-not-found', exact: true, component: ProductNotFound },
      { path: '/cart-empty', exact: true, component: CartEmpty },
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
