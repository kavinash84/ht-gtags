import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { wrapDispatch } from 'multireducer';
import {
  loadCategories,
  loadMainMenu,
  loadBanners,
  loadFooter,
  isLoaded as isSectionLoaded
} from 'redux/modules/homepage';
import { generateSession, isLoaded as isSessionSet } from 'redux/modules/app';
import { loginUserAfterSignUp } from 'redux/modules/login';
import { loadWishlist, isLoaded as isWishListLoaded } from 'redux/modules/wishlist';
import { loadUserProfile, isLoaded as isProfileLoaded } from 'redux/modules/profile';
import { loadCart, isLoaded as isCartLoaded, synCart } from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';
import config from 'config';
import Theme from 'hometown-components/lib/Theme';
import Alert from 'hometown-components/lib/Alert';
import * as notifActions from 'redux/modules/notifs';
import Notifs from '../../components/Notifs';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const { pincode: { selectedPincode }, app: { sessionId, csrfToken } } = getState();
    const defaultPincode = selectedPincode === '' ? PINCODE : selectedPincode;
    if (!isSessionSet(getState()) || !sessionId || !csrfToken) {
      await dispatch(generateSession(defaultPincode)).catch(error => console.log(error));
    }
    if (!isSectionLoaded(getState(), 'menu')) {
      await wrapDispatch(dispatch, 'menu')(loadMainMenu());
    }
    if (!isSectionLoaded(getState(), 'banners')) {
      await wrapDispatch(dispatch, 'banners')(loadBanners()).catch(error => error);
    }
    if (!isSectionLoaded(getState(), 'categories')) {
      await wrapDispatch(dispatch, 'categories')(loadCategories()).catch(error => error);
    }
    if (sessionId && !isCartLoaded(getState())) {
      await dispatch(loadCart(sessionId, defaultPincode)).catch(error => error);
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    const { userLogin: { isLoggedIn } } = getState();
    if (isLoggedIn && !isWishListLoaded(getState())) {
      dispatch(loadWishlist()).catch(error => console.log(error));
    }
    if (isLoggedIn && !isProfileLoaded(getState())) {
      dispatch(loadUserProfile()).catch(error => console.log(error));
    }
    if (!isSectionLoaded(getState(), 'footer')) {
      wrapDispatch(dispatch, 'footer')(loadFooter()).catch(error => console.log(error));
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
    notifs: state.notifs
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
    notifSend: PropTypes.func.isRequired
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
    /* Need to implement auto login when user has saved credentials to chrome */
    // if (window && window.naviagtor) {
    //   navigator.credentials.get({
    //     password: true,
    //   }).then(user => console.log(user));
    // }
    // this.props.notifSend({
    //   msg: 'Welcome to HomeTown.in',
    //   type: 'success',
    //   dismissAfter: 2000
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.context.store;
    const { login: { isLoggedIn }, pincode: { selectedPincode }, app: { sessionId } } = this.props;
    const pincode = selectedPincode === '' ? PINCODE : '';
    if (nextProps.signUp && nextProps.signUp.loaded) {
      const { signUp } = nextProps;
      if (!isLoggedIn && signUp.response.signup_complete) {
        const { signUp: { response }, loginUser } = nextProps;
        if (response.signup_complete) {
          dispatch(loginUser(response.token));
          dispatch(synCart(sessionId, pincode));
        }
      }
    }
    if (!isLoggedIn && nextProps.login.isLoggedIn) {
      dispatch(synCart(sessionId, pincode));
      const query = new URLSearchParams(this.props.location.search);
      this.props.pushState(query.get('redirect') || '/');
    } else if (this.props.login && !nextProps.login) {
      this.props.pushState('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const styles = require('./App.scss');
    const { location, route, notifs } = this.props;
    const pathname = (location && location.pathname) || '/';
    return (
      <ThemeProvider theme={Theme}>
        <div className={styles.app}>
          <Helmet {...config.app.head}>
            <link
              rel="alternate"
              media="only screen and (max-width:640px)"
              href={`https://www.hometown.in${pathname}`}
            />
            <link rel="canonical" href={`https://www.hometown.in${pathname}`} />
          </Helmet>
          <main className={styles.appContent}>
            {notifs.global && (
              <div className="container">
                <Notifs
                  className={styles.notifs}
                  namespace="global"
                  NotifComponent={props => <Alert {...props} show />}
                />
              </div>
            )}
            {renderRoutes(route.routes)}
          </main>
        </div>
      </ThemeProvider>
    );
  }
}
