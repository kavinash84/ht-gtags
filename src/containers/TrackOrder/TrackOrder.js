import React from 'react';
import PropTypes from 'prop-types';
import MenuFooter from 'containers/MenuFooter';
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
        <MenuFooter
          pageTitle="Track Order - Hometown.in"
          seoDescription="Tracking the order that you placed with us?
            All you need to have is your order number.
             Visit our track order page at Hometown to know about your orders today!"
        >
          <div>
            <TrackOrderContainer
              status={this.state.status}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              loading={false}
              orderId={this.state.orderId}
            />
          </div>
        </MenuFooter>
      </div>
    );
  }
}

export default TrackOrder;
