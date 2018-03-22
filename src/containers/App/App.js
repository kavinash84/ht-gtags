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
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <div className={styles.cssnext}>HomeTown Base Running !!</div>
        <div className={styles.autoprefixer} />
        <section className={styles.row}>
          <div className={styles.quarter}>1</div>
          <div className={styles.half}>2</div>
          <div className={styles.quarter}>3</div>
        </section>
      </div>
    );
  }
}
