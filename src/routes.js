import { App, NotFound } from "containers";
import { routerActions } from "react-router-redux";
import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

/* Category */
import Category from "containers/Category";

/* Home */
import Home from "containers/Home";

/* store */
import Stores from "containers/Stores";
import StoreLocator from "containers/StoreLocator";

/* auth */
import Login from "containers/Login";
import Signup from "containers/Signup";
import ForgotPassword from "containers/ForgotPassword";
import ResetPassword from "containers/ResetPassword";

/* products */
import Listing from "containers/Listing";
import ProductDetails from "containers/ProductDetails";
import Cart from "containers/Cart";

/* services */
import ModularKitchen from "containers/ModularKitchenMicro";
import PlanYourKitchenNew from "containers/PlanYourKitchenNew";
import ModularKitchenNew from "containers/ModularKitchenNew";
import DesignBuild from "containers/DesignBuild";
import HomeInterior from "containers/HomeInterior";
import ModularWardrobe from "containers/ModularWardrobe";
import BulkOrder from "containers/BulkOrder";
import Brand from "containers/Brand";
import HtExclusive from "containers/HtExclusive";
import ContactUs from "containers/ContactUs";
import Feedback from "containers/Feedback";
import FeedbackMailer from "containers/FeedbackMailer";
import ServiceRequest from "containers/ServiceRequest";
import CaseRequest from "containers/CaseRequest";
import ServiceSignUpContainer from "components/ServiceSignUp";
import Gifting from "containers/Gifting";

/* user */
import Profile from "containers/Profile";
// import MyHomeWallet from "containers/MyHomeWallet";
import MyOrder from "containers/MyOrder";
import OrderAndReturns from "containers/OrderAndReturns";
import MyAddress from "containers/MyAddress";
import MyCases from "containers/MyCases";
import MyDashBoard from "containers/MyDashBoard";
import Coupons from "containers/Coupons";
import SavedCards from "containers/SavedCards";
import Wishlist from "containers/Wishlist";
import TrackOrder from "containers/TrackOrder";

//packages

import PackageCatalog from "./containers/PackageCatalog";
import oneLacPackage from "./containers/oneLacPackage";

// Thank you pages
import ThankyouMk from "./containers/ThankyouMk";
import ThankyouDb from "./containers/ThankyouDb";
import ThankYouEo from "./containers/ThankYouEo";

/* checkout */
import DeliveryAddress from "containers/DeliveryAddress";
import PaymentOptions from "containers/PaymentOptions";
// import ReviewOrder from 'containers/ReviewOrder';
import PaymentSuccess from "containers/PaymentSuccess";
import PaymentFailure from "containers/PaymentFailure";

/* static pages */
import ReturnPolicy from "containers/ReturnPolicy";
import PrivacyPolicy from "containers/PrivacyPolicy";
import FAQ from "containers/Faq";
import Cancellation from "containers/Cancellation";
import Grievance from "containers/Grievance";
import Terms from "containers/Terms";
import WhoWeAre from "containers/WhoWeAre";
import LoaderShimmer from "containers/Loader/LoaderShimmer";
import Promotions from "containers/Promotions";
import Gratification from "containers/Gratification";

// Landing Pages
import WeddingCampaign from "containers/WeddingCampaign";
import ComboOffer from "containers/ComboOffer";

// brand pageoffset
import Spaces from "./containers/Spaces";

// Smartsters
import Smartsters from "./containers/Smartsters";

// campaign
// import Announcement from 'containers/Announcement';
import Campaigns from "containers/Campaigns";
import FlipBokContainer from "containers/FlipBookContainer";

import { categoryRoutes, listingRoutes } from "helpers/Constants";
import Review from "./containers/Review";
import WriteReview from "./containers/WriteReview";
import NewHomepage from "./components/NewHomepage";
import WarrantyPage from "./containers/warranty";
import ExchangeOffer from "./containers/Exchange-offer";
import BlogsContainer from "./containers/BlogsContainer";
import BlogContainer from "./containers/BlogContainer";
import Mattresses from "./containers/Mattresses";
import ThankyouScreen from "./containers/Campaigns/ThankYouScreen";

const createRegex = data => data.join("|");

const locationHelper = locationHelperBuilder({});

const isAuthenticated = connectedReduxRedirect({
  redirectPath: "/login",
  authenticatedSelector: state => state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: "UserLoggedIn"
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/profile",
  authenticatedSelector: state => !state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: false
});

/* eslint-disable max-len */
const routes = [
  {
    component: App,
    routes: [
      { path: "/", exact: true, component: Home },
      { path: "/login", exact: true, component: isNotAuthenticated(Login) },
      { path: "/signup", exact: true, component: isNotAuthenticated(Signup) },
      {
        path: "/forgot-password/verify/reset/:hash",
        exact: true,
        component: isNotAuthenticated(ResetPassword)
      },
      {
        path: "/forgot-password",
        exact: true,
        component: isNotAuthenticated(ForgotPassword)
      },
      { path: "/wishlist", exact: true, component: isAuthenticated(Wishlist) },
      { path: "/checkout/cart", exact: true, component: Cart },
      { path: "/my-orders", exact: true, component: isAuthenticated(MyOrder) },
      {
        path: "/order-returns",
        exact: true,
        component: isAuthenticated(OrderAndReturns)
      },
      {
        path: "/my-address",
        exact: true,
        component: isAuthenticated(MyAddress)
      },
      { path: "/my-cases", exact: true, component: isAuthenticated(MyCases) },
      { path: "/profile", exact: true, component: isAuthenticated(Profile) },
      // {
      //   path: "/my-hometown-wallet",
      //   exact: true,
      //   component: isAuthenticated(MyHomeWallet)
      // },
      {
        path: "/my-dashboard",
        exact: true,
        component: isAuthenticated(MyDashBoard)
      },
      { path: "/coupons", exact: true, component: isAuthenticated(Coupons) },
      {
        path: "/saved-cards",
        exact: true,
        component: isAuthenticated(SavedCards)
      },
      {
        path: "/:productname?/sku/:skuId",
        exact: true,
        component: ProductDetails
      },
      {
        path: "/checkout/delivery-address",
        exact: true,
        component: DeliveryAddress
      },
      {
        path: "/checkout/payment-options",
        exact: true,
        component: PaymentOptions
      },
      { path: "/flipBook", exact: true, component: FlipBokContainer },
      // { path: '/checkout/review-order', exact: true, component: ReviewOrder },
      { path: "/search", exact: false, component: Listing },
      { path: "/return-policy", exact: true, component: ReturnPolicy },
      { path: "/privacy-policy", exact: true, component: PrivacyPolicy },
      { path: "/cancellation", exact: true, component: Cancellation },
      { path: "/terms-and-conditions", exact: true, component: Terms },
      { path: "/faq", exact: true, component: FAQ },
      { path: "/who-we-are", exact: true, component: WhoWeAre },
      { path: "/store/:city/:storeName", exact: true, component: Stores },
      { path: "/track-order/:orderno?", exact: true, component: TrackOrder },
      { path: "/store-locator", exact: true, component: StoreLocator },
      { path: "/contact-us", exact: true, component: ContactUs },
      { path: "/feedback", exact: true, component: Feedback },
      { path: "/feedback-mailer/:id", exact: true, component: FeedbackMailer },
      { path: "/service-request", exact: true, component: ServiceRequest },
      { path: "/case-request", exact: true, component: CaseRequest },
      { path: "/grievance", exact: true, component: Grievance },
      { path: "/modular-kitchens", exact: true, component: ModularKitchenNew },
      {
        path: "/plan-your-kitchen",
        exact: true,
        component: PlanYourKitchenNew
      },
      { path: "/make-space-for-new", exact: true, component: NewHomepage },
      { path: "/design-build", exact: true, component: DesignBuild },
      { path: "/home-interior", exact: true, component: HomeInterior },
      { path: "/modular-wardrobe", exact: true, component: ModularWardrobe },
      { path: "/payment-success", exact: true, component: PaymentSuccess },
      {
        path: "/payment-failed/:orderId?",
        exact: true,
        component: PaymentFailure
      },
      { path: "/bulk-order", exact: true, component: BulkOrder },
      { path: "/brand/laura-ashley", exact: true, component: Brand },
      { path: "/brand/ht-exclusive", exact: true, component: HtExclusive },
      {
        path: "/service-signup",
        exact: true,
        component: ServiceSignUpContainer
      },
      { path: "/loader-shimmer", exact: true, component: LoaderShimmer },
      { path: "/promotions", exact: true, component: Promotions },
      {
        path: "/gratification",
        exact: true,
        component: isAuthenticated(Gratification)
      },
      { path: "/wedding-campaign", exact: true, component: WeddingCampaign },
      { path: "/combo-offer", exact: true, component: ComboOffer },
      { path: "/reviews", exact: true, component: Review },
      { path: "/writeReview", exact: true, component: WriteReview },
      // { path: '/announcement', exact: true, component: Announcement }
      { path: "/offer/:type", exact: true, component: Campaigns },
      {
        path: `/:category(${createRegex(categoryRoutes)})`,
        exact: true,
        component: Category
      },
      {
        path: `/:category(${createRegex(
          listingRoutes
        )})/:subcategory1?/:subcategory2?/:subcategory3?/:subcategory4?/:subcategory5?`,
        exact: true,
        component: Listing
      },
      { path: "/gifting", exact: true, component: Gifting },
      { path: "/reviews", exact: true, component: Review },
      { path: "/writeReview", exact: true, component: WriteReview },
      { path: "/spaces", exact: true, component: Spaces },
      { path: "/warranty", exact: true, component: WarrantyPage },
      { path: "/exchange-offers", exact: true, component: ExchangeOffer },
      { path: "/packages", exact: true, component: oneLacPackage },
      {
        path: "/package-catalog/:packageid",
        exact: true,
        component: PackageCatalog
      },
      { path: "/blog", exact: true, component: BlogsContainer },
      { path: "/blog/:key", exact: true, component: BlogContainer },
      { path: "/mattresses", exact: true, component: Mattresses },
      { path: "/smartsters", exact: true, component: Smartsters },
      { path: "/thankyou-mk", exact: true, component: ThankyouMk },
      { path: "/thankyou-db", exact: true, component: ThankyouDb },
      { path: "/thank-you-eo", exact: true, component: ThankYouEo },
      { path: "/thank-you", exact: true, component: ThankyouScreen },

      { component: NotFound }
    ]
  }
];

export default routes;
