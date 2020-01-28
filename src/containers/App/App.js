import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { wrapDispatch } from 'multireducer';
import { loadCategories, loadMainMenu, loadBanners, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { generateSession, isLoaded as isSessionSet } from 'redux/modules/app';
import { loginUserAfterSignUp, login } from 'redux/modules/login';
import { loadWishlist, isLoaded as isWishListLoaded } from 'redux/modules/wishlist';
import { loadUserProfile, isLoaded as isProfileLoaded } from 'redux/modules/profile';
import { loadCart, isLoaded as isCartLoaded } from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';
import config from 'config';
import Cookie from 'js-cookie';
import * as notifActions from 'redux/modules/notifs';
import Notifs from 'components/Notifs';
import { isKeyExists } from 'utils/helper';

/* ====== Components ====== */
import Alert from 'hometown-components-dev/lib/Alert';
import ThemeProvider from 'hometown-components-dev/lib/ThemeProviderHtV1';

const styles = require('./App.scss');

const { SITE_URL } = process.env;
const SITE_URL_MOBILE = 'https://m.hometown.in';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      pincode: { selectedPincode },
      app: { sessionId, csrfToken }
    } = getState();
    const defaultPincode = selectedPincode === '' ? PINCODE : selectedPincode;
    if (!isSessionSet(getState()) || !sessionId || !csrfToken) {
      await dispatch(generateSession(defaultPincode));
    }
    if (!isSectionLoaded(getState(), 'menu')) {
      await wrapDispatch(dispatch, 'menu')(loadMainMenu());
    }
    if (!isSectionLoaded(getState(), 'banners')) {
      await wrapDispatch(dispatch, 'banners')(loadBanners()).catch(error => console.log(error));
    }
    if (!isSectionLoaded(getState(), 'categories')) {
      await wrapDispatch(dispatch, 'categories')(loadCategories()).catch(error => console.log(error));
    }
    if (getState().userLogin.isLoggedIn && !isProfileLoaded(getState())) {
      await dispatch(loadUserProfile()).catch(error => console.log(error));
    }
    if (sessionId && !isCartLoaded(getState())) {
      await dispatch(loadCart(sessionId, defaultPincode)).catch(error => console.log(error));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    const {
      userLogin: { isLoggedIn, loggingOut }
    } = getState();
    // if (!isSectionLoaded(getState(), 'categories')) {
    //   wrapDispatch(dispatch, 'categories')(loadCategories()).catch(error => error);
    // }
    if (isLoggedIn && !loggingOut && !isWishListLoaded(getState())) {
      dispatch(loadWishlist());
    }
    if (isLoggedIn && !loggingOut && !isProfileLoaded(getState())) {
      dispatch(loadUserProfile()).catch(error => console.log(error));
    }
  }
})
@withRouter
@connect(
  state => ({
    login: state.userLogin,
    signUp: state.userSignUp,
    pincode: state.pincode,
    app: state.app,
    notifs: state.notifs,
    profile: state.profile
  }),
  {
    pushState: push,
    loginUser: loginUserAfterSignUp,
    ...notifActions
  }
)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    pushState: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    pincode: PropTypes.shape({
      selectedPincode: PropTypes.string
    }),
    signUp: PropTypes.shape({
      response: PropTypes.object,
      loaded: PropTypes.bool
    }),
    login: PropTypes.shape({
      accessToken: PropTypes.string,
      refreshToken: PropTypes.string,
      isLoggedIn: PropTypes.bool
    }),
    app: PropTypes.shape({
      sessionId: PropTypes.string
    }).isRequired,
    notifs: PropTypes.shape({
      global: PropTypes.array
    }).isRequired,
    notifSend: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    login: {
      isLoggedIn: false
    },
    signUp: {
      loaded: false
    },
    pincode: {
      selectedPincode: ''
    }
  };

  componentDidMount() {
    const {
      login: { isLoggedIn }
    } = this.props;
    const { dispatch } = this.context.store;
    /* get cookie of glogin for pop up */
    const gCookie = Cookie.get('Glogin');
    const gCookieVal = gCookie ? Number(gCookie) : 0;
    if (gCookieVal === 0 && !isLoggedIn && isKeyExists(window.navigator, 'credentials.get')) {
      navigator.credentials
        .get({
          password: true
        })
        .then(
          user => {
            if (user) {
              const { id, password, type } = user;
              if (type === 'password' && id && password) {
                const data = {
                  email: id,
                  password
                };
                dispatch(login(data));
              }
            }
            Cookie.set('Glogin', 1, { expires: 1 });
          },
          error => console.log(error)
        );
    }
    /* Split Test Cookie */
    Cookie.set('split_test', 'A', { expires: 365 });
  }
  componentWillReceiveProps(nextProps) {
    if (window && window.embedded_svc) {
      const { profile } = nextProps;
      const { data = {} } = profile;
      const { email = '' } = data;
      // window.userEmail = email;
      window.embedded_svc.settings.prepopulatedPrechatFields = {
        Email: email
      };
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  checkIfSlash = path => {
    let url = path;
    if (path.length && path[path.length - 1] === '/') {
      url = path.slice(0, path.length - 1);
    }
    return url;
  };
  render() {
    const { location, route, notifs } = this.props;
    const pathname = (location && location.pathname) || '/';
    const url = this.checkIfSlash(pathname);
    return (
      <ThemeProvider>
        {process.env.NODE_ENV !== 'development' && (
          <Helmet {...config.app.head}>
            <link rel="alternate" media="only screen and (max-width:640px)" href={`${SITE_URL_MOBILE}${url}`} />
            <link rel="canonical" href={`${SITE_URL}${url}`} />
            <script type="text/javascript">
              {`
                  var dataLayer = [];
                  (function(w, d, s, l, i) {
                      w[l] = w[l] || [];
                      w[l].push({
                          'gtm.start': new Date().getTime(),
                          event: 'gtm.js'
                      });
                      var f = d.getElementsByTagName(s)[0],
                          j = d.createElement(s),
                          dl = l != 'dataLayer' ? '&l=' + l : '';
                      j.async = true;
                      j.src =
                          'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                      f.parentNode.insertBefore(j, f);
                  })(window, document, 'script', 'dataLayer', 'GTM-T5VV7MZ');
                `}
            </script>
            <script type="text/javascript">
              {`
                  var google_tag_params={
                      ecomm_pagetype: '',
                      ecomm_prodid: [],
                      ecomm_totalvalue: '',
                    };
                  `}
            </script>
          </Helmet>
        )}
        <main className={styles.appContent}>
          <div className="container">
            <Notifs namespace="global" NotifComponent={props => <Alert {...props} show={notifs.global.length} />} />
          </div>
          {renderRoutes(route.routes)}
        </main>
      </ThemeProvider>
    );
  }
}
