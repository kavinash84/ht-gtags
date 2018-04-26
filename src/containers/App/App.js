import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { load as loadBanners, isLoaded as isBannersLoaded } from 'redux/modules/banners';
import { load as loadStyles, isLoaded as isStylesLoaded } from 'redux/modules/shopByStyle';
import { load as loadOccasions, isLoaded as isOccasionsLoaded } from 'redux/modules/shopByOccasion';
import { load as loadRooms, isLoaded as isRoomsLoaded } from 'redux/modules/shopByRoom';
// import { load as loadStyles } from 'redux/modules/shopByStyle';
import config from 'config';
import Theme from 'hometown-components/lib/Theme';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isBannersLoaded(getState())) {
      await dispatch(loadBanners()).catch(() => null);
    }
    if (!isStylesLoaded(getState())) {
      await dispatch(loadStyles()).catch(error => console.log(error));
    }
    if (!isOccasionsLoaded(getState())) {
      await dispatch(loadOccasions()).catch(error => console.log(error));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isRoomsLoaded(getState())) {
      dispatch(loadRooms()).catch(error => console.log(error));
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
