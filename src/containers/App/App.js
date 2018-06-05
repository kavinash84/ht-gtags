import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { load as loadBanners, isLoaded as isBannersLoaded } from 'redux/modules/banners';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/homepage';
import { load as loadMenu, isLoaded as isMenuLoaded } from 'redux/modules/menu';
// import { load as loadStyles } from 'redux/modules/shopByStyle';
import config from 'config';
import Theme from 'hometown-components/lib/Theme';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isBannersLoaded(getState())) {
      await dispatch(loadBanners()).catch(() => null);
    }
    if (!isCategoriesLoaded(getState())) {
      await dispatch(loadCategories()).catch(error => console.log(error));
    }
    if (!isMenuLoaded(getState())) {
      await dispatch(loadMenu()).catch(error => console.log(error));
    }
  }
})
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {};

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps() {}

  componentDidUpdate() {}

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
