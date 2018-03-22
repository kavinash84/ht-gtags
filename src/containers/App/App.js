import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { load as loadInfo } from 'redux/modules/info';
import config from 'config';

@provideHooks({
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadInfo()).catch(() => null);
  }
})
@withRouter
export default class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps() {}

  componentDidUpdate() {}

  render() {
    const styles = require('./App.css');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <div>HomeTown Base Running !!</div>
      </div>
    );
  }
}
