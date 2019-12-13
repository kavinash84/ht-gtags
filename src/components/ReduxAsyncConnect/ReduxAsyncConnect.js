import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';
import { trigger } from 'redial';
import NProgress from 'nprogress';
import asyncMatchRoutes from 'utils/asyncMatchRoutes';

@withRouter
export default class ReduxAsyncConnect extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    store: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    helpers: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    previousLocation: null
  };

  componentWillMount() {
    NProgress.configure({ trickleSpeed: 200 });
  }
  componentDidMount() {
    const {
      store: { dispatch }
    } = this.props;
    dispatch({
      type: 'TRACK_PAGEVIEW'
    });
  }
  async componentWillReceiveProps(nextProps) {
    const {
 history, location, routes, store, helpers
} = this.props;
    const nextLocation = `${nextProps.location.pathname}${nextProps.location.search}`;
    const lastLocation = `${location.pathname}${location.search}`;

    if (nextLocation.trim() !== lastLocation.trim()) {
      // save the location so we can render the old screen
      NProgress.start();
      this.setState({ previousLocation: location });

      // load data while the old screen remains
      const { components, match, params } = await asyncMatchRoutes(routes, nextProps.location.pathname);
      const triggerLocals = {
        ...helpers,
        store,
        match,
        params,
        history,
        location: nextProps.location
      };

      await trigger('fetch', components, triggerLocals);
      if (__CLIENT__) {
        await trigger('defer', components, triggerLocals);
        trigger('done', components, triggerLocals);
      }
      // clear previousLocation so the next screen renders
      this.setState({ previousLocation: null });
      NProgress.done();
      if (!NProgress.status) {
        const { dispatch } = store;
        setTimeout(
          () =>
            dispatch({
              type: 'TRACK_PAGEVIEW'
            }),
          0
        );
      }
    }
  }
  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return <Route location={previousLocation || location} render={() => children} />;
  }
}
