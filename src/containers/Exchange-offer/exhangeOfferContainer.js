import React, { Component } from "react";
import ExchangeOffers from "components/ExchangeOffers/LandingPage";
import PropTypes from "prop-types";
// import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
// import OtherMenuFooter from 'containers/OtherMenuFooter';

// @connect(({ modularkitchen }) => ({
//   modularkitchen
// }))
export default class ExchangeOfferContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  render() {
    // console.log(this.props.modularkitchen);
    const { history } = this.props;
    return (
      <div className="wrapper">
        <ExchangeOffers history={history} />
      </div>
    );
  }
}
