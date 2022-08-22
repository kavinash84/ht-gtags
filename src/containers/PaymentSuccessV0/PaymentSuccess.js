import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import PaymentSuccess from 'newComponents/PaymentSuccess';
import Oops from 'newComponents/PaymentSuccess/Oops';

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
    // isLoggedIn: PropTypes.bool,
    // history: PropTypes.object.isRequired
    history: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    data: {},
    error: '',
    // loaded: false,
    // isLoggedIn: false
    loaded: false,
    isLoggedIn: false
  };
  componentDidMount() {
    const {
 error, data, history, isLoggedIn
} = this.props;
    // const { error_message = "" } = data; //eslint-disable-line
    if (data) {
      // eslint-disable-next-line camelcase
      const { error_message = '' } = data || {};

      // if (error_message.indexOf("Order Success details not found") >= 0) {
      //   if (isLoggedIn) {
      //     return history.push("/my-orders");
      //   }
      //   return history.push("/");
      // }
      // if (
      //   data === "An internal server error occurred" ||
      //   data.error_message === "details not found"
      // ) {
      //   if (isLoggedIn) {
      //     return history.push("/my-orders");
      //   }
      //   return history.push("/");
      // }
      // if (error === "") {
      //   const { dispatch } = this.context.store;
      //   dispatch({
      //     type: "PUSH_TO_DATALAYER"
      //   });
      // }
      // eslint-disable-next-line camelcase
      if (error_message && error_message.indexOf('Order Success details not found') >= 0) {
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

      if (data && error === '') {
        const { dispatch } = this.context.store;
        dispatch({
          type: 'PUSH_TO_DATALAYER'
        });
      }
    } else {
      history.push('/');
    }
  }
  render() {
    const { data, error, loaded } = this.props;
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
          <Container mt={60}>
            {data !== 'An internal server error occurred' ? (
              <PaymentSuccess data={data} error={error} loaded={loaded} />
            ) : (
              <Oops />
            )}
          </Container>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
