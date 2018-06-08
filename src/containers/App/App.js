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
import { loadCategories, loadMainMenu, loadBanners, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
import { loginUserAfterSignUp } from 'redux/modules/login';
import config from 'config';
import Theme from 'hometown-components/lib/Theme';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'banners')) {
      await wrapDispatch(dispatch, 'banners')(loadBanners()).catch(() => null);
    }
    if (!isSectionLoaded(getState(), 'categories')) {
      await wrapDispatch(dispatch, 'categories')(loadCategories()).catch(error => console.log(error));
    }
    if (!isSectionLoaded(getState(), 'menu')) {
      await wrapDispatch(dispatch, 'menu')(loadMainMenu()).catch(error => console.log(error));
    }
  }
})
@withRouter
@connect(
  state => ({
    login: state.userLogin,
    signUp: state.userSignUp
  }),
  {
    pushState: push,
    loginUser: loginUserAfterSignUp
  }
)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    pushState: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    signUp: PropTypes.shape({
      response: PropTypes.obj
    }),
    login: PropTypes.shape({
      accessToken: PropTypes.string,
      refreshToken: PropTypes.string,
      isLoggedIn: PropTypes.bool
    })
  };

  static defaultProps = {
    login: {
      isLoggedIn: false
    },
    signUp: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    /* Need to implement auto login when user has saved credentials to chrome */
    // if (window && window.naviagtor) {
    //   navigator.credentials.get({
    //     password: true,
    //   }).then(user => console.log(user));
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { login: { isLoggedIn } } = this.props;
    const { signUp } = nextProps;
    if (!isLoggedIn && signUp.response.signup_complete) {
      const { dispatch } = this.context.store;
      const { signUp: { response }, loginUser } = nextProps;
      if (response.signup_complete) dispatch(loginUser(response.token));
    }
    if (!isLoggedIn && nextProps.login.isLoggedIn) {
      const query = new URLSearchParams(this.props.location.search);
      this.props.pushState(query.get('redirect') || '/');
    } else if (this.props.login && !nextProps.login) {
      this.props.pushState('/');
    }
  }

  render() {
    const styles = require('./App.scss');
    const { route } = this.props;
    return (
      <ThemeProvider theme={Theme}>
        <div className={styles.app}>
          <Helmet {...config.app.head} />
          <main className={styles.appContent}>{renderRoutes(route.routes)}</main>
        </div>
      </ThemeProvider>
    );
  }
}
