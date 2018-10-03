export const SITE_URL = 'https://hometown.in';

export const HOME_URL = '/';
export const SIGNUP_URL = '/signup';
export const LOGIN_URL = '/login';
export const CART_URL = '/checkout/cart';
export const MY_ORDER_URL = '/my-orders';
export const MY_PROFILE_URL = '/profile';
export const MY_WISHLIST_URL = '/wishlist';
export const MY_ADDRESS_URL = '/my-address';
export const FORGOT_PASSWORD_URL = '/forgot-password';

export const PAYMENT_SUCCESS = '/payment-success';
export const PAYMENT_FAILURE = '/payment-failed';

export const PINCODE = '110001';
/* Configs */
export const clientId = 'rama';
export const clientSecret = 'ramahometown';

/* Routes Config */
export const categoryRoutes = [
  'furniture',
  'home-decor',
  'homefurnishings',
  'home-improvement',
  'kitchenware',
  'tableware',
  'bath'
];

export const listingRoutes = [...categoryRoutes, 'clearance-sale'];
/* eslint-disable max-len */
export const redirectURLs =
  'furniture|home-decor|homefurnishings|tableware|kitchenware|home-improvement|clearance-sale-offer|clearance_sale|design|design-inspiration|gifts|appliances|lighting|solidwood|test_bed|exclusive|invisible|luggage-bags';
