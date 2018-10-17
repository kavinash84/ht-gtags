import fs from 'fs';
import path from 'path';
import qs from 'qs';
import Url from 'url';
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
import { getChunks, waitChunks } from 'utils/chunks';
import asyncMatchRoutes from 'utils/asyncMatchRoutes';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ReduxAsyncConnect, Provider } from 'components';
import axios from 'axios';
import getCookie from 'utils/cookies';
import { redirectionHelper } from 'utils/helper';
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from 'helpers/Constants';

const WHITELIST_TO_REDIRECT = new Set([
  'localhost',
  'hometown.in',
  'www.hometown.in',
  'stage.hometown.in',
  'beta.hometown.in'
]);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let chunksPath;
if (process.env.NODE_ENV === 'development') {
  chunksPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json');
} else {
  const ver = require('../version.json').version;
  chunksPath = path.join(__dirname, '..', 'static', 'dist', ver, 'loadable-chunks.json');
}

process.on('unhandledRejection', error => console.error(error));

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);

app.get('/', (req, res, next) => {
  const { redirect } = req.query;
  if (redirect) {
    const targetUrl = Url.parse(redirect);
    console.log('req.hostname: [%s]', req.hostname);
    console.log('url.host: [%s]', targetUrl.host);
    if (!WHITELIST_TO_REDIRECT.has(targetUrl.host)) {
      return next(new Error('Open redirect attack detected'));
    }
  }
  return next();
});

/* set Headers */
app.get('/dist/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.setHeader('Expires', new Date(Date.now() + 864000000).toUTCString());
  next();
});

app
  .use(morgan('dev', { skip: req => req.originalUrl.indexOf('/ws') !== -1 }))
  .use(cookieParser())
  .use(compression())
  .use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  .use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json')))
  .use('/service-worker.js', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'static', 'dist', 'service-worker.js')))
  .use('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'robots.txt')))
  .use('/sitemap.html', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'sitemap.html')))
  .use('/maintenance.html', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'maintenance.html')));

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-store');
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
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  return next();
});

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* check cookie for testing */
/* app.use('/', async (req, res, next) => {
  try {
    const cookies = getCookie(req.header('cookie'), 'TEST_HT');
    console.log(cookies);
    if (cookies) {
      return next();
    }
    return res.redirect(301, '/maintenance.html');
  } catch (error) {
    console.log(error);
  }
}); */

app.use('/checkout/finish/payment/', async (req, res) => {
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

/* Blanket Redirection for old urls Color Products */
app.get(/\/color-/, (req, res) => {
  const { url } = req;
  const [redirect] = url.split('/color-');
  return res.redirect(301, redirect || '/');
});

/* Redirection from urls */
app.get(/\/(.*)-(\d+).html/, async (req, res, next) => {
  const data = require('./data/pdp-urls.json');
  if (data && data[req.path.toLowerCase()]) {
    const redirect = data[req.path.toLowerCase()];
    return res.redirect(301, redirect || '/');
  }
  return next();
});

/* eslint-disable max-len */
/* Category url redirection */
app.get(
  /^\/(all-products|furniture|home-decor|homefurnishings|tableware|kitchenware|home-improvement|clearance-sale-offer|clearance_sale|design|design-inspiration|gifts|appliances|lighting|solidwood|test_bed|exclusive|invisible|luggage-bags)\//,
  async (req, res, next) => {
    const data = require('./data/category-urls.json');
    const requestURL = redirectionHelper(req.path);
    if (data && data[requestURL.toLowerCase()]) {
      const redirect = data[requestURL.toLowerCase()];
      return res.redirect(301, redirect || '/');
    }
    return next();
  }
);

/* eslint-disable max-len */
/* static pages redirection */
app.get(/^\/(.*)\/$/, async (req, res, next) => {
  const data = require('./data/static-urls.json');
  const requestURL = redirectionHelper(req.path);
  if (data && data[requestURL.toLowerCase()]) {
    const redirect = data[requestURL.toLowerCase()];
    return res.redirect(301, redirect || '/');
  }
  return next();
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
        default: 28800
      }
    }),
    stateReconciler: (inboundState, originalState) => originalState,
    whitelist: ['app', 'userLogin', 'pincode']
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
    const context = {};
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

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const locationState = store.getState().router.location;
    if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(locationState.pathname + locationState.search)) {
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
    console.log(mountError);
    console.error('MOUNT ERROR:', pretty.render(mountError));
    // res.status(500);
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
