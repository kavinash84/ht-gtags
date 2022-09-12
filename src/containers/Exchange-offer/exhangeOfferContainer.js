import React, { Component } from "react";
import ExchangeOffers from "components/ExchangeOffers/LandingPage";
import PropTypes from "prop-types";
import { notifSend } from "redux/modules/notifs";
// import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
// import OtherMenuFooter from 'containers/OtherMenuFooter';

// @connect(({ modularkitchen }) => ({
//   modularkitchen
// }))
export default class ExchangeOfferContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    // const { history } = this.props;
    // const { dispatch } = this.context.store;
    // history.push("/");
    // dispatch(
    //   notifSend({
    //     type: "warning",
    //     msg: "This offer has been expired.",
    //     dismissAfter: 4000
    //   })
    // );
  }

  render() {
    const { history } = this.props;
    return (
      <div className="wrapper">
        <ExchangeOffers history={history} />
      </div>
    );
  }
}
