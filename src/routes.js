import {
  App,
  OrderDetails,
  OrderSummary,
  PaymentOptions,
  ReviewOrder,
  ReturnPolicy,
  PrivacyPolicy,
  Terms,
  WhoWeAre,
  FAQ,
  TrackOrderModal,
  ModularKitchenMicro,
  NotFound
} from 'containers';
import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import Profile from 'containers/Profile';
import Pincode from 'components/Pincode';
import Stores from 'containers/Stores/Stores';
import TrackOrder from 'containers/TrackOrder/TrackOrder';
import Category from 'containers/Category';
import Wishlist from 'containers/Wishlist';
import Cart from 'containers/Cart';
import Home from 'containers/Home';
import StoreLocator from 'containers/StoreLocator/StoreLocator';
import ContactUs from 'containers/ContactUs/';
import Feedback from 'containers/Feedback/';
import ServiceRequest from 'containers/ServiceRequest/';
import Grievance from 'containers/Grievance/';
import PaymentSuccess from 'containers/PaymentSuccess/';
import PaymentFailure from 'containers/PaymentFailure/';
import BulkOrder from 'containers/BulkOrder';
import ServiceSignUpContainer from 'components/ServiceSignUp/';
import Listing from 'containers/Listing';
import ProductDetails from 'containers/ProductDetails';
import ModularKitchen from 'containers/ModularKitchen';
import DesignBuild from 'containers/DesignBuild';
import DeliveryAddress from 'containers/DeliveryAddress';
import Cancellation from 'containers/Cancellation';
import MyOrder from 'containers/MyOrder';
import MyAddress from 'containers/MyAddress';

import { categoryRoutes, listingRoutes } from 'helpers/Constants';

const createRegex = data => data.join('|');

const locationHelper = locationHelperBuilder({});

const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserLoggedIn'
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
  authenticatedSelector: state => !state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false
});

/* eslint-disable max-len */
const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/login', exact: true, component: isNotAuthenticated(Login) },
      { path: '/signup', exact: true, component: isNotAuthenticated(Signup) },
      { path: '/forgot-password/verify/reset/:hash', exact: true, component: isNotAuthenticated(ResetPassword) },
      { path: '/forgot-password', exact: true, component: isNotAuthenticated(ForgotPassword) },
      { path: '/wishlist', exact: true, component: isAuthenticated(Wishlist) },
      { path: '/checkout/cart', exact: true, component: Cart },
      { path: '/my-orders', exact: true, component: isAuthenticated(MyOrder) },
      { path: '/my-address', exact: true, component: isAuthenticated(MyAddress) },
      { path: '/order-details', exact: true, component: OrderDetails },
      { path: '/order-summary', exact: true, component: OrderSummary },
      { path: '/profile', exact: true, component: isAuthenticated(Profile) },
      { path: '/:productname?/sku/:skuId', exact: true, component: ProductDetails },
      { path: '/checkout/delivery-address', exact: true, component: DeliveryAddress },
      { path: '/checkout/payment-options', exact: true, component: PaymentOptions },
      { path: '/checkout/review-order', exact: true, component: ReviewOrder },
      { path: '/search', exact: false, component: Listing },
      { path: '/return-policy', exact: true, component: ReturnPolicy },
      { path: '/privacy-policy', exact: true, component: PrivacyPolicy },
      { path: '/cancellation', exact: true, component: Cancellation },
      { path: '/terms-and-conditions', exact: true, component: Terms },
      { path: '/faq', exact: true, component: FAQ },
      { path: '/who-we-are', exact: true, component: WhoWeAre },
      { path: '/pincode', exact: true, component: Pincode },
      { path: '/store/:city/:storeName', exact: true, component: Stores },
      { path: '/track-order', exact: true, component: TrackOrder },
      { path: '/track-order-modal', exact: true, component: TrackOrderModal },
      { path: '/store-locator', exact: true, component: StoreLocator },
      { path: '/contact-us', exact: true, component: ContactUs },
      { path: '/feedback', exact: true, component: Feedback },
      { path: '/service-request', exact: true, component: ServiceRequest },
      { path: '/grievance', exact: true, component: Grievance },
      { path: '/modular-kitchens', exact: true, component: ModularKitchen },
      { path: '/modular-kitchens-micro', exact: true, component: ModularKitchenMicro },
      { path: '/design-build', exact: true, component: DesignBuild },
      { path: '/payment-success', exact: true, component: PaymentSuccess },
      { path: '/payment-failed/:orderId?', exact: true, component: PaymentFailure },
      { path: '/bulk-order', exact: true, component: BulkOrder },
      { path: '/service-signup', exact: true, component: ServiceSignUpContainer },
      {
        path: `/:category(${createRegex(categoryRoutes)})`,
        exact: true,
        component: Category
      },
      {
        path: `/:category(${createRegex(listingRoutes)})/:subcategory1?/:subcategory2?/:subcategory3?/:subcategory4?/:subcategory5?`,
        exact: true,
        component: Listing
      },
      { component: NotFound, status: 404 }
    ]
  }
];

export default routes;
