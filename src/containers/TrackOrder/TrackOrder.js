import React from 'react';
import Menu from 'containers/MenuNew/index';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import TrackOrderContainer from 'components/TrackOrder/TrackOrder';
import { trackOrder } from 'redux/modules/trackorder';

class TrackOrder extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    status: false,
    orderId: ''
  };
  handleSubmit = e => {
    const { dispatch } = this.context.store;
    e.preventDefault();
    this.setState({
      status: true
    });
    dispatch(trackOrder(this.state.orderId));
  };
  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      orderId: value
    });
  };

  render() {
    return (
      <div>
        <Menu />
        <div>
          <TrackOrderContainer
            status={this.state.status}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            loading={false}
            orderId={this.state.orderId}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default TrackOrder;
