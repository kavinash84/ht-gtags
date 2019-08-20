import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from 'components/PaymentSuccess';
import MenuFooter from 'containers/MenuFooter';
import { connect } from 'react-redux';
import Oops from 'components/PaymentSuccess/Oops';

@connect(({ paymentstatus: { data, loaded, error }, userLogin: { isLoggedIn } }) => ({
  data,
  loaded,
  error,
  isLoggedIn
}))
export default class PaymentSuccessContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    data: {},
    error: '',
    loaded: false,
    isLoggedIn: false
  };
  componentDidMount() {
    const {
      error, data, history, isLoggedIn
    } = this.props;
    const { error_message = '' } = data; //eslint-disable-line
    if (error_message.indexOf('Order Success details not found') >= 0) {
      if (isLoggedIn) {
        return history.push('/my-orders');
      }
      return history.push('/');
    }
    if (data === 'An internal server error occurred' || data.error_message === 'details not found') {
      if (isLoggedIn) {
        return history.push('/my-orders');
      }
      return history.push('/');
    }
    if (error === '') {
      const { dispatch } = this.context.store;
      dispatch({
        type: 'PUSH_TO_DATALAYER'
      });
    }
  }
  render() {
    const { data, error, loaded } = this.props;
    return (
      <MenuFooter pageTitle="Payment Success">
        {data !== 'An internal server error occurred' ? (
          <PaymentSuccess data={data} error={error} loaded={loaded} />
        ) : (
          <Oops />
        )}
      </MenuFooter>
    );
  }
}
