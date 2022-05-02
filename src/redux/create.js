import {
  createStore as _createStore,
  applyMiddleware,
  compose,
  combineReducers
} from "redux";
import { routerMiddleware } from "react-router-redux";
import {
  createPersistoid,
  persistCombineReducers,
  REGISTER
} from "redux-persist";
import thunkMiddleware from "./middleware/thunkMiddleware";
import clientMiddleware from "./middleware/clientMiddleware";
import gaMiddleware from "./middleware/gaMiddleware";
import admitadMiddleware from "./middleware/admitadMiddleware";
import userMiddleware from "./middleware/userMiddleware";
import paymentsMiddleware from "./middleware/paymentsMiddleware";
import notifyMiddleware from "./middleware/notifyMiddleware";
import webEngageMiddleware from "./middleware/webEngageMiddleware";
import createReducers from "./reducer";
import { resetReferrer } from "./modules/analytics";

function combine(reducers, persistConfig) {
  if (persistConfig) {
    return persistCombineReducers(persistConfig, reducers);
  }
  return combineReducers(reducers);
}

export function inject(store, reducers, persistConfig) {
  Object.entries(reducers).forEach(([name, reducer]) => {
    if (store.asyncReducers[name]) return;
    store.asyncReducers[name] = reducer.__esModule ? reducer.default : reducer;
  });

  store.replaceReducer(
    combine(createReducers(store.asyncReducers), persistConfig)
  );
}

function getNoopReducers(reducers, data) {
  if (!data) return {};
  return Object.keys(data).reduce(
    (prev, next) =>
      reducers[next] ? prev : { ...prev, [next]: (state = {}) => state },
    {}
  );
}

export default function createStore({ history, data, helpers, persistConfig }) {
  if (data && data.app && data.app.csrfToken) {
    /* add csrf token */
    const csrfToken = data.app.csrfToken || "";
    const session = data.app.sessionId || "";
    helpers.client.setCSRFToken(csrfToken);
    helpers.client.setSessionId(session);
  }
  if (data && data.userLogin) {
    /* Check userAuthentication */
    const authToken =
      (data.userLogin.isLoggedIn && data.userLogin.accessToken) || "";
    if (data && data.userLogin.meta) {
      const {
        userLogin: { meta }
      } = data;
      const [xId] = Object.keys(meta).filter(key => key !== "customerId");
      helpers.client.setCustomerInfo("customerId", meta.customerId);
      helpers.client.setXId(xId, meta[xId]);
    }
    helpers.client.setJwtToken(authToken);
  }

  const middleware = [
    thunkMiddleware(),
    clientMiddleware(helpers),
    routerMiddleware(history),
    gaMiddleware(),
    userMiddleware(),
    paymentsMiddleware(),
    notifyMiddleware(),
    admitadMiddleware(),
    webEngageMiddleware()
  ];

  if (__CLIENT__ && __DEVELOPMENT__) {
    const logger = require("redux-logger").createLogger({
      collapsed: true
    });
    middleware.push(logger.__esModule ? logger.default : logger);
  }

  const enhancers = [applyMiddleware(...middleware)];

  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require("redux-devtools");
    const DevTools = require("../containers/DevTools/DevTools");

    Array.prototype.push.apply(enhancers, [
      window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]);
  }

  const finalCreateStore = compose(...enhancers)(_createStore);
  const reducers = createReducers();
  const noopReducers = getNoopReducers(reducers, data);
  const store = finalCreateStore(
    combine({ ...noopReducers, ...reducers }, persistConfig),
    data
  );

  store.asyncReducers = {};
  store.inject = _reducers => inject(store, _reducers, persistConfig);

  if (persistConfig) {
    const persistoid = createPersistoid(persistConfig);
    store.subscribe(() => {
      persistoid.update(store.getState());
    });
    store.dispatch({ type: REGISTER });
    store.dispatch(resetReferrer());
  }

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept("./reducer", () => {
      let reducer = require("./reducer");
      reducer = combine(
        (reducer.__esModule ? reducer.default : reducer)(store.asyncReducers),
        persistConfig
      );
      store.replaceReducer(reducer);
    });
  }

  return store;
}
