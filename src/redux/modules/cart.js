import {
  ADDTOCARTCOMBINED as ADDTOCARTCOMBINED_API,
  ADDTOCART as ADDTOCART_API,
  SYNCCART as SYNCCART_API,
  CHECKCART as CHECKCART_API
} from "helpers/apiUrls";
import { PINCODE } from "../../helpers/Constants";

const LOAD_CART = "cart/LOAD_CART";
const LOAD_CART_SUCCESS = "cart/LOAD_CART_SUCCESS";
const LOAD_CART_FAIL = "cart/LOAD_CART_FAIL";
const ADD_TO_CART = "cart/ADD_TO_CART";
const ADD_TO_CART_SUCCESS = "cart/ADD_TO_CART_SUCCESS";
const ADD_TO_CART_FAIL = "cart/ADD_TO_CART_FAIL";
const ADD_TO_CART_COMBINED = "cart/ADD_TO_CART_COMBINED";
const ADD_TO_CART_COMBINED_SUCCESS = "cart/ADD_TO_CART_COMBINED_SUCCESS";
const ADD_TO_CART_COMBINED_FAIL = "cart/ADD_TO_CART_COMBINED_FAIL";
const UPDATE_CART = "cart/UPDATE_CART";
const UPDATE_CART_SUCCESS = "cart/UPDATE_CART_SUCCESS";
const UPDATE_CART_FAIL = "cart/UPDATE_CART_FAIL";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const REMOVE_FROM_CART_SUCCESS = "cart/REMOVE_FROM_CART_SUCCESS";
const REMOVE_FROM_CART_FAIL = "cart/REMOVE_FROM_CART_FAIL";
const SYNCING_CART = "cart/SYNCING_CART";
const SYNCING_CART_SUCCESS = "cart/SYNCING_CART_SUCCESS";
const SYNCING_CART_FAIL = "cart/SYNCING_CART_FAIL";
const CHECKCART = "cart/CHECKCART";
const CHECKCART_SUCCESS = "cart/CHECKCART_SUCCESS";
const CHECKCART_FAIL = "cart/CHECKCART_FAIL";
const RESET_CART_CHECK = "cart/RESET_CART_CHECK";
const SET_CURRENT_KEY = "cart/SET_CURRENT_KEY";
const SET_QUANTITY_FLAG = "cart/SET_QUANTITY_FLAG";

const UPDATE_CART_SUMMARY_AFTER_COUPON =
  "cart/UPDATE_CART_SUMMARY_AFTER_COUPON";

const CLEAR_CART = "cart/CLEAR_CART";

const TOGGLE_COUPON_LIST = "cart/TOGGLE_COUPON_LIST";
const HIDE_COUPON_LIST = "cart/HIDE_COUPON_LIST";

const formatCartData = data => {
  if (Array.isArray(data)) {
    let arr = data.map(item => {
      if (item.product_info.packageId) {
        return item;
      } else {
        return {
          ...item,
          product_info: {
            ...item.product_info,
            stock: item.stock,
            image: item.image,
            unit_price: parseInt(item.product_info.price),
            net_price: parseInt(item.product_info.special_price)
          }
        };
      }
    });
    return arr;
  }
  return [];
};

const checkForPackages = cartData => {
  if (Array.isArray(cartData.packages)) {
    return cartData.cart;
  } else if (cartData.packages && Object.keys(cartData.packages).length === 0) {
    return cartData.cart;
  } else {
    let arrayOfObj = Object.values(cartData.packages).map(item => {
      return {
        configurable_sku: "",
        created_at: "",
        fk_customer: null,
        id_customer_cart: item.id_customer_cart,
        is_bogo: 0,
        is_display: 1,
        product_info: {
          assembly_service: false,
          cart_rule_discount: item.cart_rule_discount,
          cart_rule_display_names: [],
          category_details: [],
          color: "",
          color_family: "",
          coupon_discount: item.coupon_discount,
          delivery_time_text: item.delivery_time_text,
          demo_product: false,
          discount: item.discount,
          gift_wrap: 0,
          giftimageset: "",
          image: `${item.images[0]}.jpg`,
          is_available: item.is_available,
          is_deliverable: item.is_deliverable,
          is_freebie: "",
          max_display_stock: "",
          name: item.packageName,
          net_price: item.subTotal,
          offer_message: "",
          packageId: item.packageId,
          product_id: item.packageId,
          shipping_time_text: item.shipping_time_text,
          special_price: item.specialPrice,
          stock: item.stock,
          unit_price: item.unit_price,
          url: ""
        },
        qty: 1,
        session_id: "",
        shipping_charges: 0,
        simple_sku: "",
        simpleSkus: item.simpleSkus,
        updated_at: ""
      };
    });
    return [...cartData.cart, ...arrayOfObj];
  }
};

const formatPackageItems = packageData => {
  if (Array.isArray(packageData.packageItems)) {
    return [];
  } else if (
    packageData.packageItems &&
    Object.keys(packageData.packageItems).length === 0
  ) {
    return [];
  } else {
    let arrayOfObj = Object.values(packageData.packageItems);
    return arrayOfObj;
  }
};

const getCurrentPackage = data => {
  if (Array.isArray(data.packages)) {
    return "";
  } else if (data.packages && Object.keys(data.packages).length === 0) {
    return "";
  } else {
    let arrayOfObj = Object.keys(data.packages);
    return arrayOfObj[0];
  }
};

const initialState = {
  loading: false,
  initialLoading: false,
  data: [],
  summary: {},
  packageItems: [],
  currentPackage: "",
  demo_landing_page_url: "",
  loaded: false,
  addedToCart: false,
  cartUpdated: false,
  cartSynced: false,
  checkingCart: false,
  cartChecked: false,
  key: "",
  couponlistToggle: false,
  quantityChange: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        loading: true,
        initialLoading: true
      };
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result)
            : [],
        summary:
          action.result && "summary" in action.result
            ? action.result.summary
            : {},
        demo_landing_page_url:
          action.result && "demo_landing_page_url" in action.result
            ? action.result.demo_landing_page_url
            : "",
        loading: false,
        loaded: true,
        initialLoading: false,
        currentPackage: getCurrentPackage(action.result),
        packageItems: formatPackageItems(action.result),
        couponlistToggle: false
      };
    case LOAD_CART_FAIL:
      return {
        ...state,
        loading: false,
        initialLoading: false,
        loaded: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        addingToCart: true,
        addedToCart: false
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        quantityChange: false,
        couponlistToggle: false,
        // data:
        //   action.result && "cart" in action.result
        //     ? formatCartData(action.result.cart.cart)
        //     : [],
        data:
          action.result && "cart" in action.result
            ? formatCartData(
                checkForPackages({
                  ...action.result.cart,
                  packages: action.result.packages,
                  packageItems: action.result.packageItems
                })
              )
            : [],
        summary:
          action.result && "cart" in action.result
            ? action.result.cart.summary
            : {}
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        addingToCart: false,
        addedToCart: false,
        error: action.error
      };
    case ADD_TO_CART_COMBINED:
      return {
        ...state,
        addingToCart: true,
        addedToCart: false
      };
    case ADD_TO_CART_COMBINED_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        couponlistToggle: false,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result)
            : [],
        packageItems: formatPackageItems(action.result),
        summary:
          action.result && "cart" in action.result ? action.result.summary : {}
      };
    case ADD_TO_CART_COMBINED_FAIL:
      return {
        ...state,
        addingToCart: false,
        addedToCart: false,
        error: action.error
      };
    case UPDATE_CART:
      return {
        ...state,
        cartUpdating: true,
        error: null
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        quantityChange: false,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result.cart)
            : [],
        summary:
          action.result && "cart" in action.result
            ? action.result.cart.summary
            : {},
        packageItems: formatPackageItems(action.result.cart),
        couponlistToggle: false
      };
    case UPDATE_CART_FAIL:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: false,
        error: action.error
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartUpdating: true,
        cartUpdated: false,
        error: null
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result.cart)
            : [],
        summary:
          action.result && "cart" in action.result
            ? action.result.cart.summary
            : {},
        packageItems: formatPackageItems(action.result.cart),
        currentPackage: getCurrentPackage(action.result.cart),
        couponlistToggle: false
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: false,
        error: action.error
      };
    case SYNCING_CART:
      return {
        ...state,
        cartSyncing: true
      };
    case SYNCING_CART_SUCCESS:
      return {
        ...state,
        cartSyncing: false,
        cartSynced: true,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result)
            : [],
        packageItems: formatPackageItems(action.result),
        summary:
          action.result && "summary" in action.result
            ? action.result.summary
            : {}
      };
    case SYNCING_CART_FAIL:
      return {
        ...state,
        cartSyncing: false,
        cartSynced: false,
        error: action.error
      };
    case CHECKCART:
      return {
        ...state,
        checkingCart: true
      };
    case CHECKCART_SUCCESS:
      return {
        ...state,
        checkingCart: false,
        cartCheckData: action.result,
        checkCart: false,
        cartChecked: action.result.success
      };
    case CHECKCART_FAIL:
      return {
        ...state,
        checkingCart: false,
        cartChecked: false
      };
    case RESET_CART_CHECK:
      return {
        ...state,
        cartChecked: false
      };
    case UPDATE_CART_SUMMARY_AFTER_COUPON:
      return {
        ...state,
        summary: action.summary
      };
    case SET_CURRENT_KEY:
      return {
        ...state,
        key: action.payLoad
      };
    case TOGGLE_COUPON_LIST:
      return {
        ...state,
        couponlistToggle: !state.couponlistToggle
      };
    case HIDE_COUPON_LIST:
      return {
        ...state,
        couponlistToggle: false
      };
    case SET_QUANTITY_FLAG:
      return {
        ...state,
        quantityChange: action.value
      };
    case CLEAR_CART:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export const isLoaded = globalState =>
  globalState.cart && globalState.cart.loaded;

const setCurrentKey = key => ({
  type: SET_CURRENT_KEY,
  payLoad: key
});
const setAppAuth = ({ client }) => async response => {
  const { csrfToken, session } = response;
  if (csrfToken && session) {
    await client.setCSRFToken(csrfToken);
    await client.setSessionId(session);
  }
};
export const loadCart = (session, pincode) => ({
  types: [LOAD_CART, LOAD_CART_SUCCESS, LOAD_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(
        `${ADDTOCART_API}/${session}/${pincode}`
      );
      await setAppAuth({ client })(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const addToCart = (
  key,
  sku,
  simpleSku,
  session,
  pincode,
  configId,
  quantity = 1
) => dispatch => {
  dispatch(setCurrentKey(key));
  return dispatch({
    types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = {
          configurable_sku: sku,
          simple_sku: simpleSku,
          session_id: session,
          pincode,
          qty: quantity
        };
        const response = await client.post(ADDTOCART_API, postData);
        // console.log('response check', response);
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId,
    key,
    sku,
    simpleSku,
    pincode
  });
};

export const addToCartCombined = (
  setId,
  skus,
  sessionId,
  pincode,
  configId,
  uniqueSetName
) => dispatch => {
  dispatch(setCurrentKey(setId));
  return dispatch({
    types: [
      ADD_TO_CART_COMBINED,
      ADD_TO_CART_COMBINED_SUCCESS,
      ADD_TO_CART_COMBINED_FAIL
    ],
    promise: async ({ client }) => {
      try {
        const postData = {
          set_id: setId,
          skus,
          session_id: sessionId,
          pincode
        };
        const response = await client.post(ADDTOCARTCOMBINED_API, postData);
        response.uniqueSetName = uniqueSetName;
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId
  });
};

export const updateCart = (
  cartId,
  sku,
  simpleSku,
  session,
  pincode,
  configId,
  qty
) => dispatch => {
  dispatch(setCurrentKey(cartId));
  return dispatch({
    types: [UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = {
          configurable_sku: sku,
          simple_sku: simpleSku,
          session_id: session,
          pincode,
          qty
        };
        const response = await client.put(ADDTOCART_API, postData);
        response.updateType = qty === 1 ? "add" : "remove";
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId,
    qty
  });
};

export const removeFromCart = (
  cartId,
  session,
  pincode = PINCODE,
  qty = "",
  configId = ""
) => dispatch => {
  dispatch(setCurrentKey(configId));
  return dispatch({
    types: [REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL],
    promise: async ({ client }) => {
      try {
        console.log(cartId, "cart cat");
        const response = await client.delete(`${ADDTOCART_API}/${pincode}`, {
          data: cartId
        });

        return response;
      } catch (error) {
        throw error;
      }
    },
    qty,
    configId
  });
};

export const synCart = (sessionId, pincode = PINCODE) => ({
  types: [SYNCING_CART, SYNCING_CART_SUCCESS, SYNCING_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.put(
        `${SYNCCART_API}/${sessionId}/${pincode}`,
        {}
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const checkCart = sessionId => ({
  types: [CHECKCART, CHECKCART_SUCCESS, CHECKCART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${CHECKCART_API}`, {
        session_id: sessionId
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const updateCartSummary = summary => ({
  type: UPDATE_CART_SUMMARY_AFTER_COUPON,
  summary
});

export const resetCheck = () => ({
  type: RESET_CART_CHECK
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const toggleCouponList = () => ({
  type: TOGGLE_COUPON_LIST
});
export const hideCouponList = () => ({
  type: HIDE_COUPON_LIST
});
export const setQuantityFlag = value => ({
  type: SET_QUANTITY_FLAG,
  value
});
