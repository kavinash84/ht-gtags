import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { wrapDispatch } from 'multireducer';
import { loadCategories, loadMainMenu, loadBanners, isLoaded as isSectionLoaded } from 'redux/modules/homepage';
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
