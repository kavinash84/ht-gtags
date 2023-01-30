import React, { Component } from 'react';
import ExchangeOffers from 'components/ExchangeOffers/LandingPage';
import PropTypes from 'prop-types';
// import { notifSend } from 'redux/modules/notifs';
export default class ExchangeOfferContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {}

  render() {
    const { history } = this.props;
    return (
      <div className="wrapper">
        <ExchangeOffers history={history} />
      </div>
    );
  }
}
