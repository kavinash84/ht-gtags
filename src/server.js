import fs from 'fs';
import path from 'path';
import qs from 'qs';
import bodyParser from 'body-parser';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import PrettyError from 'pretty-error';
import http from 'http';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import createMemoryHistory from 'history/createMemoryHistory';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { trigger } from 'redial';
import { getStoredState } from 'redux-persist';
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage';
import Cookies from 'cookies';
import config from 'config';
import createStore from 'redux/create';
import apiClient from 'helpers/apiClient';
import Html from 'helpers/Html';
import routes from 'routes';
import getChunks, { waitChunks } from 'utils/getChunks';
import asyncMatchRoutes from 'utils/asyncMatchRoutes';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ReduxAsyncConnect, Provider } from 'components';
import axios from 'axios';
import getCookie from 'utils/cookies';
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from './helpers/Constants';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const chunksPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json');

process.on('unhandledRejection', error => console.error(error));

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);

/* serving compressed files from server */

const setJSCompression = (req, res, next) => {
  if (!(req.url.indexOf('service-worker.js') > 1)) {
    if (req.url.indexOf('?_sw-precache') > 1) {
      const swUrl = req.url.split('?_sw');
      req.url = `${swUrl[0]}.gz`;
    } else {
      req.url = `${req.url}.gz`;
    }
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
  }
  next();
};

const setCssCompression = (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
};

app
  .use(morgan('dev', { skip: req => req.originalUrl.indexOf('/ws') !== -1 }))
  .use(cookieParser())
  .use(compression())
  .use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  .use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json')))
  .get('*.js', setJSCompression)
  .get('*.css', setCssCompression);

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  return next();
});

app.use('/dist/dlls/:dllName.js', (req, res, next) => {
  fs.access(
    path.join(__dirname, '..', 'static', 'dist', 'dlls', `${req.params.dllName}.js`),
    fs.constants.R_OK,
    err => (err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : next())
  );
});

app.use(express.static(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});

// parsing the request bodys
app.use(bodyParser());
app.use(bodyParser.json());
app.use('/checkout/finish/payment/', async (req, res) => {
  console.log(process.env.PAYMENT_URL);
  console.log(req.body);
  // const test = getCookie(req.header('cookie'), 'persist:root');
  console.log(req.header('cookie'));
  console.log('xxxxx');
  console.log(req.header('Cookie'));
  try {
    const cookies = getCookie(req.header('cookie'), 'persist:root');
    const session = JSON.parse(JSON.parse(cookies).app).sessionId;
    const data = req.body;
    const options = {
      url: process.env.PAYMENT_URL,
      method: 'POST',
      headers: {
        Cookie: `PHPSESSID=${session}; path=/; domain=.hometown.in`,
        ContentType: 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    };
    const response = await axios(options);
    if (response && response.data && response.data.status === 'success') return res.redirect(PAYMENT_SUCCESS);
    if (response && response.data) {
      return res.redirect(`${PAYMENT_FAILURE}/?order=${response.data.order_id}`);
    }
  } catch (error) {
    console.log(error);
    return res.redirect(PAYMENT_FAILURE);
  }
});

app.use(async (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const providers = {
    client: apiClient(req)
  };
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res));

  const persistConfig = {
    key: 'root',
    storage: new CookieStorage(cookieJar, {
      expiration: {
        default: 30 * 86400
      }
    }),
    stateReconciler: (inboundState, originalState) => originalState,
    whitelist: ['app', 'userLogin', 'pincode', 'shipping']
  };

  let preloadedState;
  try {
    preloadedState = await getStoredState(persistConfig);
  } catch (e) {
    preloadedState = {};
  }

  const store = createStore({
    history,
    helpers: providers,
    data: preloadedState
  });

  function hydrate() {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={webpackIsomorphicTools.assets()} store={store} />).pipe(res);
  }

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  try {
    const { components, match, params } = await asyncMatchRoutes(routes, req.path);
    await trigger('fetch', components, {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    });
    const sheet = new ServerStyleSheet();
    const modules = [];
    const component = (
      <StyleSheetManager sheet={sheet.instance}>
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store} {...providers}>
            <ConnectedRouter history={history}>
              <ReduxAsyncConnect routes={routes} store={store} helpers={providers}>
                {renderRoutes(routes)}
              </ReduxAsyncConnect>
            </ConnectedRouter>
          </Provider>
        </Loadable.Capture>
      </StyleSheetManager>
    );
    const content = ReactDOM.renderToString(component);

    const locationState = store.getState().router.location;
    if (req.originalUrl !== locationState.pathname + locationState.search) {
      return res.redirect(301, locationState.pathname);
    }
    const styleTags = sheet.getStyleElement();
    const bundles = getBundles(getChunks(), modules);
    const html = (
      <Html
        styleTags={styleTags}
        assets={webpackIsomorphicTools.assets()}
        bundles={bundles}
        content={content}
        store={store}
      />
    );

    res.status(200).send(`<!doctype html>${ReactDOM.renderToString(html)}`);
  } catch (mountError) {
    console.error('MOUNT ERROR:', pretty.render(mountError));
    res.status(500);
    hydrate();
  }
});

(async () => {
  if (config.port) {
    try {
      await Loadable.preloadAll();
      await waitChunks(chunksPath);
    } catch (error) {
      console.log('Server preload error:', error);
    }

    server.listen(config.port, err => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> ✅  %s is Running...', config.app.title);
      console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
  } else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
  }
})();
