import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
// import { load as loadInfo } from 'redux/modules/info';
import { load as loadStyles } from 'redux/modules/shopByStyle';
import { load as loadOccasions } from 'redux/modules/shopByOccasion';
import { load as loadRooms } from 'redux/modules/shopByRoom';
// import { load as loadStyles } from 'redux/modules/shopByStyle';
import config from 'config';
import Theme from 'hometown-components/lib/Theme';

@provideHooks({
  fetch: async ({ store: { dispatch } }) => {
    // await dispatch(loadInfo()).catch(() => null);
    await dispatch(loadStyles()).catch(error => console.log(error));
    await dispatch(loadOccasions()).catch(error => console.log(error));
    await dispatch(loadRooms()).catch(error => console.log(error));
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
