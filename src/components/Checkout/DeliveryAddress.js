import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';
import LoginModal from 'containers/Login/LoginForm';
import Footer from 'components/Footer';
import { sendDeliveryAddress, resetGuestRegisterFlag } from 'redux/modules/checkout';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import { notifSend } from 'redux/modules/notifs';
import { isBlank } from 'js-utility-functions';
import MenuCheckout from './MenuCheckout';
import AddressForm from './AddressForm';
import OrderSummary from './OrderSummary';
import PaymentMethods from '../PaymentMethods/';

// import { getNotDelivered } from 'selectors/cart';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./DeliveryAddress.scss');

const formValdiator = (props, data, formType) => {
  const {
    fullName,
    fullNameFeedBackError,
    email,
    emailFeedBackError,
    phone,
    phoneFeedBackError,
    address,
    addressFeedBackError,
    city,
    pincode,
    pincodeFeedBackError,
    state
  } = data;
  const {
    setNameError, setPhoneError, setEmailError, setAddressError, setPincodeError
  } = props;
  const fullNameError = isBlank(fullName) || fullNameFeedBackError;
  const emailError = isBlank(email) || emailFeedBackError;
  const phoneError = isBlank(phone) || phoneFeedBackError;
  const pincodeError = isBlank(pincode) || pincodeFeedBackError;
  const addressError = isBlank(address) || addressFeedBackError;
  if (fullNameError || emailError || pincodeError || phoneError || addressError) {
    setNameError(formType, fullNameError);
    setEmailError(formType, emailError);
    setPincodeError(formType, pincodeError);
    setPhoneError(formType, phoneError);
    setAddressError(formType, addressError);
    return {
      error: true,
      data: null
    };
  }
  return {
    error: false,
    data: {
      fullName,
      phone,
      email,
      pincode,
      address,
      city,
      state
    }
  };
};
const mapStateToProps = ({
  userLogin, app, checkout, myaddress, address, profile, cart
}) => ({
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId,
  nextstep: checkout.nextstep,
  loading: checkout.loading,
  addresses: myaddress.data,
  currentaddressindex: address.shipping.index,
  shippingIsBilling: address.shippingIsBilling,
  userEmail: profile.data.email,
  address,
  cart,
  summary: cart.summary
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);
@withRouter
class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    openLogin: false,
    addressform: false
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    const { cart, history } = this.props;
    const {
      nextstep, isLoggedIn, onChangeEmail, userEmail
    } = this.props;
    if (isLoggedIn) {
      onChangeEmail('shipping', userEmail);
      onChangeEmail('billing', userEmail);
    }
    // if (addresses.length > 0) {
    //   this.handleClick(0);
    // }
    if (nextstep.success) {
      dispatch(resetGuestRegisterFlag());
    }
    if (!cart.cartCheckData) {
      history.push('/checkout/cart');
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      isLoggedIn, nextstep, clearShippingAddress, onChangeEmail, userEmail
    } = this.props;

    if (isLoggedIn && nextProps.userEmail !== userEmail) {
      onChangeEmail('shipping', nextProps.userEmail);
      onChangeEmail('billing', nextProps.userEmail);
    }
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== isLoggedIn) {
      this.setState({
        openLogin: false
      });
      clearShippingAddress();
    }
    // if (nextProps.addresses.length > 0 && nextProps.addresses.length !== this.props.addresses.length) {
    //   this.handleClick(0);
    // }
    if (nextProps.nextstep.success && nextProps.nextstep.success !== nextstep.success) {
      const { history } = this.props;
      history.push('/checkout/payment-options');
    }
  }
  onOpenLoginModal = () => {
    const { history, location } = this.props;
    history.push(`?redirect=${location.pathname}`);
    this.setState({ openLogin: true });
  };
  onCloseLoginModal = () => {
    const { history } = this.props;
    history.goBack();
    this.setState({ openLogin: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      address: { shipping, billing, shippingIsBilling }
    } = this.props;
    const { dispatch } = this.context.store;
    const { isLoggedIn } = this.props;
    const { addressform } = this.state;
    if (shippingIsBilling) {
      const shippingForm = formValdiator(this.props, shipping, 'shipping');
      if (shippingForm.error) {
        const message =
          isLoggedIn && !addressform
            ? 'Please Add new Address  /  Select delivery Address '
            : 'Please Fill All Details Correctly !';
        dispatch(notifSend({
          type: 'warning',
          msg: message,
          dismissAfter: 2000
        }));
      } else {
        const { sessionId } = this.props;
        dispatch(sendDeliveryAddress(
          sessionId,
          {
            shippingIsBilling,
            shippingAddress: shippingForm.data,
            billingAddress: shippingForm.data
          },
          isLoggedIn
        ));
      }
    } else {
      const shippingForm = formValdiator(this.props, shipping, 'shipping');
      const billingForm = formValdiator(this.props, billing, 'billing');
      if (shippingForm.error || billingForm.error) {
        dispatch(notifSend({
          type: 'warning',
          msg: 'Fill All Details Correctly',
          dismissAfter: 2000
        }));
      } else {
        const { sessionId } = this.props;
        dispatch(sendDeliveryAddress(sessionId, {
          shippingIsBilling,
          shippingAddress: shippingForm.data,
          billingAddress: billingForm.data
        }));
      }
    }
  };

  toggleBillingForm = () => {
    const { toggleShippingIsBilling } = this.props;
    toggleShippingIsBilling();
  };
  handleClick = index => {
    const { addresses, setAddress, loadPincodeDetails } = this.props;
    this.setState({
      addressform: false
    });
    setAddress('shipping', addresses[index], index);
    loadPincodeDetails('shipping', addresses[index].pincode);
  };
  toggleAddAddress = e => {
    const { setAddress, isLoggedIn, userEmail } = this.props;
    e.preventDefault();
    this.setState({
      addressform: !this.state.addressform
    });
    const data = {
      full_name: '',
      email: isLoggedIn ? userEmail : '',
      pincode: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      index: null
    };
    setAddress('shipping', data, null);
  };
  render() {
    const {
      isLoggedIn, history, loading, addresses, currentaddressindex
    } = this.props;
    const { shippingIsBilling, userEmail, summary } = this.props;
    const { addressform } = this.state;
    return (
      <Div type="block">
        <MenuCheckout page="delivery" history={history} />
        <Section display="flex" pt="2.25rem" pb="2rem" mb="1rem" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Div col="9" mt="0" pr="1rem">
              {!isLoggedIn && (
                <Div col="12" className={styles.isLoggedIn}>
                  <Label fontSize="1rem" mt="0" mb="0" color="textLight">
                    Already have an account?
                  </Label>
                  <Button
                    btnType="link"
                    fontFamily="regular"
                    height="18px"
                    mt="-5px"
                    fontSize="1rem"
                    p="0 0.625rem"
                    color={Theme.colors.primary}
                    onClick={this.onOpenLoginModal}
                    lh="1"
                  >
                    Login
                  </Button>
                  <ResponsiveModal
                    classNames={{ modal: 'loginModal' }}
                    onCloseModal={this.onCloseLoginModal}
                    open={this.state.openLogin}
                  >
                    <LoginModal />
                  </ResponsiveModal>
                </Div>
              )}
              {isLoggedIn && (
                <div>
                  <Row display="block" mr="0" ml="0">
                    <Div col="12">
                      <Label fontSize="1.125rem" mb="0.875rem">
                        Select Shipping Address
                      </Label>
                    </Div>
                  </Row>

                  <Row display="block" mr="0" ml="0">
                    {addresses.map((item, index) => (
                      <Div className={styles.addressBlock} col="6" pr="0.625rem" key={item.id_customer_address}>
                        <button
                          className={`${styles.addressBtn} ${index === currentaddressindex ? styles.active : null}`}
                          onClick={() => this.handleClick(index)}
                        >
                          <b>{item.full_name}</b>
                          <br />
                          {item.address}
                          <br />
                          {item.city}, {item.pincode}
                          <br />
                          {item.state}
                          <br />
                        </button>
                      </Div>
                    ))}

                    <Div col="6" pr="0.625rem">
                      <button className={styles.addAddressBtn} onClick={this.toggleAddAddress}>
                        <img src={addIcon} alt="Add another address" />
                        <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                          {addresses.length > 0 ? 'Add another address' : 'Add Address'}
                        </Text>
                      </button>
                    </Div>
                  </Row>
                </div>
              )}
              <Div col="12" mt="0">
                <form onSubmit={this.handleSubmit}>
                  <Row display="block" mr="0" ml="0">
                    {(addressform || !isLoggedIn) && (
                      <Div col="6" pr="2rem" mt="1rem">
                        <Label fontSize="1.125rem" mb="0.875rem">
                          Shipping Address
                        </Label>
                        <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                      </Div>
                    )}
                    <Div col="6" pr="2rem" mt="1.5rem">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id="checkbox"
                          checked={!shippingIsBilling}
                          onChange={this.toggleBillingForm}
                        />
                        {/* eslint-disable */}
                        <label htmlFor="checkbox" />
                        {/* eslint-enable */}
                      </div>
                      <Label fontSize="0.875em" mt="0" mb="0" ml="0.625rem" htmlFor="checkbox">
                        Different Billing Address ?
                      </Label>
                      {!shippingIsBilling && (
                        <Div col="12" mt="11px">
                          <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                        </Div>
                      )}
                    </Div>
                  </Row>
                  <Row display="block" mr="0" ml="0">
                    <Div col="5" mt="1.5rem">
                      <Button
                        type="submit"
                        size="block"
                        btnType="primary"
                        fontFamily="regular"
                        height="42px"
                        mt="0.5rem"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Save and Continue'}
                      </Button>
                    </Div>
                  </Row>
                </form>
              </Div>
            </Div>
            <Div col="3" mt="0" pl="0.625rem">
              <OrderSummary
                itemsTotal={summary.items}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                onClick={() => null}
                itemsCount={summary.items_count}
                hidebutton
              />
              <PaymentMethods />
            </Div>
          </Container>
        </Section>
        <Footer />
      </Div>
    );
  }
}
DeliveryAddress.defaultProps = {
  history: {},
  location: {},
  addresses: [],
  currentaddressindex: -1,
  userEmail: '',
  summary: null
};
DeliveryAddress.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.object,
  addresses: PropTypes.array,
  nextstep: PropTypes.bool.isRequired,
  location: PropTypes.object,
  currentaddressindex: PropTypes.number,
  address: PropTypes.object.isRequired,
  shippingIsBilling: PropTypes.bool.isRequired,
  setAddress: PropTypes.func.isRequired,
  clearShippingAddress: PropTypes.func.isRequired,
  toggleShippingIsBilling: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  loadPincodeDetails: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  summary: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddress);
