const CHANGE_PROD_MODAL = "lackpackages/CHANGE_PROD_MODAL";

const CHANGE_SUDO_CART_MODAL = "lackpackages/CHANGE_SUDO_CART_MODAL";

const SELECT_CAT = "lackpackages/SELECT_CAT";

const SET_REPLACE_INDEX = "lackpackages/SET_REPLACE_INDEX";

const SET_PDP_INDEX = "lackpackages/SET_PDP_INDEX";

const SET_CURRENT_PACKAGE = "lackpackages/SET_CURRENT_PACKAGE";

const SET_SAVE_POST_LOGIN = "lackpackages/SET_SAVE_POST_LOGIN";

const CHANGE_PLP_MODAL = "lackpackages/CHANGE_PLP_MODAL";

const SELECT_SKU_FOR_PLP = "lackpackages/SELECT_SKU_FOR_PLP";

const SET_PDP_FROM_CART = "lackpackages/SET_PDP_FROM_CART";

const LOAD_PACKAGES = "lackpackages/LOAD_PACKAGES";
const LOAD_PACKAGES_SUCCESS = "lackpackages/LOAD_PACKAGES_SUCCESS";
const LOAD_PACKAGES_FAIL = "lackpackages/LOAD_PACKAGES_FAIL";

const LOAD_PACKAGE_SUDOCART = "lackpackages/LOAD_PACKAGE_SUDOCART";

const LOAD_PACKAGE_CATALOG = "lackpackages/LOAD_PACKAGE_CATALOG";
const LOAD_PACKAGE_CATALOG_SUCCESS =
  "lackpackages/LOAD_PACKAGE_CATALOG_SUCCESS";
const LOAD_PACKAGE_CATALOG_FAIL = "lackpackages/LOAD_PACKAGE_CATALOG_FAIL";

const SAVE_PACKAGE_CATALOG = "lackpackages/SAVE_PACKAGE_CATALOG";
const SAVE_PACKAGE_CATALOG_SUCCESS =
  "lackpackages/SAVE_PACKAGE_CATALOG_SUCCESS";
const SAVE_PACKAGE_CATALOG_FAIL = "lackpackages/SAVE_PACKAGE_CATALOG_FAIL";

const PROCEED_PACKAGE_CATALOG = "lackpackages/PROCEED_PACKAGE_CATALOG";
const PROCEED_PACKAGE_CATALOG_SUCCESS =
  "lackpackages/PROCEED_PACKAGE_CATALOG_SUCCESS";
const PROCEED_PACKAGE_CATALOG_FAIL =
  "lackpackages/PROCEED_PACKAGE_CATALOG_FAIL";

const selectCat = (packageCats, data) => {
  let ReplcedData = [...packageCats];
  ReplcedData[data.index].products = data.products;
  return ReplcedData;
};

const formstList = data => {
  let selected = [];
  if (data && data.categories) {
    data.categories.map(item => {
      // const skus = item.value.split(",");
      item.products.map((i, index) => {
        if (i.isSelected) {
          selected = [
            ...selected,
            {
              simple_sku: Object.keys(i.simples)[0],
              qty: 1
            }
          ];
        }
      });
    });
  }
  return selected;
};

const initialState = {
  openProdModal: false,
  savePostLogin: false,
  openSCModal: false,
  openPLPModal: false,
  movetoCart: false,
  proceedLoader: false,
  packages_data: "",
  package_catalog: "",
  oldList: [],
  pdpIndexes: {
    catIndex: "",
    prodIndex: ""
  },
  sudoCart: "",
  updated: false,
  replaceIndex: 0,
  pdpFromCart: "",
  replaceSku: "",
  currentPackage: "",
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_PROD_MODAL:
      return {
        ...state,
        openProdModal: action.result
      };
    case SET_SAVE_POST_LOGIN:
      return {
        ...state,
        savePostLogin: action.result
      };
    case SET_PDP_FROM_CART:
      return {
        ...state,
        pdpFromCart: action.result
      };
    case SELECT_SKU_FOR_PLP:
      return {
        ...state,
        replaceSku: action.result
      };
    case CHANGE_SUDO_CART_MODAL:
      return {
        ...state,
        openSCModal: action.result
      };
    case CHANGE_PLP_MODAL:
      return {
        ...state,
        openPLPModal: action.result
      };
    case LOAD_PACKAGES:
      return {
        ...state,
        loading: true,
        movetoCart: false
      };
    case LOAD_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        packages_data: action.result || ""
      };
    case LOAD_PACKAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOAD_PACKAGE_SUDOCART:
      return {
        ...state,
        loading: true,
        movetoCart: false,
        sudoCart: action.result || ""
      };
    case LOAD_PACKAGE_CATALOG:
      return {
        ...state,
        loading: true,
        movetoCart: false,
        oldList: []
      };
    case LOAD_PACKAGE_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        package_catalog: action.result || "",
        oldList: formstList(action.result || "")
      };
    case LOAD_PACKAGE_CATALOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        oldList: []
      };
    case SELECT_CAT:
      return {
        ...state,
        loading: false,
        package_catalog: {
          ...state.package_catalog,
          categories: selectCat(state.package_catalog.categories, action.result)
        },
        updated: !state.updated
      };
    case SET_REPLACE_INDEX:
      return {
        ...state,
        replaceIndex: Number.isInteger(action.result) ? action.result : ""
      };
    case SET_PDP_INDEX:
      return {
        ...state,
        pdpIndexes: action.result
      };
    case SET_CURRENT_PACKAGE:
      return {
        ...state,
        currentPackage: action.result
      };
    case SAVE_PACKAGE_CATALOG:
      return {
        ...state,
        savePostLogin: false,
        loading: true
      };
    case SAVE_PACKAGE_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        oldList: formstList(state.package_catalog)
        // package_catalog: action.result || ""
      };
    case SAVE_PACKAGE_CATALOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case PROCEED_PACKAGE_CATALOG:
      return {
        ...state,
        proceedLoader: true,
        movetoCart: false
      };
    case PROCEED_PACKAGE_CATALOG_SUCCESS:
      return {
        ...state,
        proceedLoader: false,
        movetoCart: true,
        oldList: formstList(state.package_catalog)
        // package_catalog: action.result || ""
      };
    case PROCEED_PACKAGE_CATALOG_FAIL:
      return {
        ...state,
        proceedLoader: false,
        movetoCart: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const toggleProdModal = result => ({
  type: CHANGE_PROD_MODAL,
  result
});

export const selectSkuForPlp = result => ({
  type: SELECT_SKU_FOR_PLP,
  result
});

export const setPdpFromCart = result => ({
  type: SET_PDP_FROM_CART,
  result
});

export const toggleSavePostLogin = result => ({
  type: SET_SAVE_POST_LOGIN,
  result
});

export const togglePLPModal = result => ({
  type: CHANGE_PLP_MODAL,
  result
});

export const toggleSCModal = result => ({
  type: CHANGE_SUDO_CART_MODAL,
  result
});

export const selectPackageCat = result => ({
  type: SELECT_CAT,
  result
});

export const setReplaceIndex = result => ({
  type: SET_REPLACE_INDEX,
  result
});

export const setPdpIndex = result => ({
  type: SET_PDP_INDEX,
  result
});

export const setCurrentPackage = result => ({
  type: SET_CURRENT_PACKAGE,
  result
});

export const loadPackages = pincode => ({
  types: [LOAD_PACKAGES, LOAD_PACKAGES_SUCCESS, LOAD_PACKAGES_FAIL],
  promise: ({ client }) => client.get(`tesla/packages/get-packages/${pincode}`)
});

export const loadPackageSudoCart = result => ({
  type: LOAD_PACKAGE_SUDOCART,
  result
});

export const loadPackageCatalog = (pincode, id) => ({
  types: [
    LOAD_PACKAGE_CATALOG,
    LOAD_PACKAGE_CATALOG_SUCCESS,
    LOAD_PACKAGE_CATALOG_FAIL
  ],
  promise: ({ client }) =>
    client.get(`tesla/packages/get-package-details/${id}/${pincode}`)
});

export const savePackageCatalog = postData => ({
  types: [
    SAVE_PACKAGE_CATALOG,
    SAVE_PACKAGE_CATALOG_SUCCESS,
    SAVE_PACKAGE_CATALOG_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.post(
        `tesla/cart/add-to-psuedo-cart`,
        postData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const proceedPackageCatalog = postData => ({
  types: [
    PROCEED_PACKAGE_CATALOG,
    PROCEED_PACKAGE_CATALOG_SUCCESS,
    PROCEED_PACKAGE_CATALOG_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.post(
        `tesla/cart/add-to-cart-multi`,
        postData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
});
