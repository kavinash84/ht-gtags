import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentPending from 'components/PaymentPending';
import MenuFooter from 'containers/MenuFooter';
import { connect } from 'react-redux';

// Constants
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from 'helpers/Constants';

@connect(({ app: { orderId }, paymentstatus: { data, loaded, error }, userLogin: { isLoggedIn } }) => ({
  orderId,
  data,
  loaded,
  error,
  isLoggedIn
}))
export default class PaymentPendingContainer extends Component {
  static propTypes = {
    orderId: PropTypes.number,
    data: PropTypes.object,
    error: PropTypes.string,
    // isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    orderId: '',
    data: {},
    error: ''
    // isLoggedIn: false
  };

  componentDidMount() {
    const {
 error, orderId, data, history
} = this.props;
    console.log('Component did mount inside pending payment', this.props);

    if (data) {
      const paymentStatus = data[orderId].payment_status;

      console.log(data[orderId].payment_status);
      if (error === '' && paymentStatus === 'failed') {
        history.push(PAYMENT_FAILURE);
      } else if (error === '' && paymentStatus === 'success') {
        history.push(PAYMENT_SUCCESS);
      }
    } else {
      history.push('/');
    }
  }
  render() {
    const {
      match: {
        params: { orderId }
      }
    } = this.props;
    return (
      <MenuFooter pageTitle="Payment Pending">
        <PaymentPending orderId={orderId} />
      </MenuFooter>
    );
  }
}

PaymentPendingContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
