import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';
import LoginModal from 'components/Login/LoginModal';
import Footer from 'components/Footer';
import { sendDeliveryAddress, resetGuestRegisterFlag } from 'redux/modules/checkout';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import { isBlank } from 'js-utility-functions';
import MenuCheckout from './MenuCheckout';
import AddressForm from './AddressForm';

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
  userLogin, app, checkout, myaddress, address, profile
}) => ({
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId,
  nextstep: checkout.nextstep,
  loading: checkout.loading,
  addresses: myaddress.data,
  currentaddressindex: address.shipping.index,
  shippingIsBilling: address.shippingIsBilling,
  userEmail: profile.data.email,
  address
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
    const {
      addresses, nextstep, setAddress, isLoggedIn, onChangeEmail, userEmail
    } = this.props;
    if (isLoggedIn) {
      onChangeEmail('shipping', userEmail);
      onChangeEmail('billing', userEmail);
    }
    if (addresses.length) {
      setAddress('shipping', addresses[0], 0);
    }
    if (nextstep.success) {
      dispatch(resetGuestRegisterFlag());
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
    if (nextProps.isLoggedIn !== isLoggedIn) {
      this.setState({
        openLogin: false
      });
      clearShippingAddress();
    }
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
    const { isLoggedIn } = this.props;
    if (shippingIsBilling) {
      const shippingForm = formValdiator(this.props, shipping, 'shipping');
      if (shippingForm.error) {
        const message = isLoggedIn ? 'Please select delivery address' : 'Please Fill All Details Correctly !';
        alert(message);
      } else {
        const { dispatch } = this.context.store;
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
        alert('Please Fill All Details Correctly !');
      } else {
        const { dispatch } = this.context.store;
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
    const { addresses, setAddress } = this.props;
    this.setState({
      addressform: false
    });
    setAddress('shipping', addresses[index], index);
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
    const { shippingIsBilling, userEmail } = this.props;
    const { addressform } = this.state;
    return (
      <Div type="block">
        <MenuCheckout page="delivery" history={history} />
        <Section display="flex" pt="1.25rem" mb="1rem" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            {isLoggedIn && (
              <Fragment>
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Label fontSize="1.125rem" mb="0.875rem">
                      SELECT SHIPPING ADDRESS
                    </Label>
                  </Div>
                </Row>

                <Row display="block" mr="0" ml="0">
                  {addresses.map((item, index) => (
                    <Div className={styles.addressBlock} col="4" pr="0.625rem" key={item.id_customer_address}>
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

                  <Div col="2">
                    <button className={styles.addAddressBtn} onClick={this.toggleAddAddress}>
                      <img src={addIcon} alt="Add another address" />
                      <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                        Add another address
                      </Text>
                    </button>
                  </Div>
                </Row>
              </Fragment>
            )}
            <Div col="5" mt="0">
              <form onSubmit={this.handleSubmit}>
                {(addressform || !isLoggedIn) && (
                  <Row display="block" mr="0" ml="0">
                    <Div col="12">
                      <Label fontSize="1.125rem" mb="0.875rem">
                        SHIPPING ADDRESS
                      </Label>
                    </Div>
                    <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                  </Row>
                )}
                <Row display="block" mr="0" ml="0" mt="1rem" mb="0.5rem">
                  <Div col="12">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        value={!shippingIsBilling}
                        onChange={this.toggleBillingForm}
                      />
                      {/* eslint-disable */}
                      <label htmlFor="checkbox" />
                    </div>
                    <Label fontSize="0.875em" mt="0" mb="0" ml="0.625rem" htmlFor="checkbox">
                      Different Billing Address ?
                    </Label>
                  </Div>
                </Row>

                {!shippingIsBilling && (
                  <Row display="block" mr="0" ml="0" mt="1.5rem">
                    <Div col="12">
                      <Label fontSize="1.125rem" mb="0.875rem">
                        Billing ADDRESS
                      </Label>
                    </Div>
                    <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                  </Row>
                )}

                <Div col="6">
                  <Button
                    type="submit"
                    size="block"
                    btnType="primary"
                    fontFamily="regular"
                    height="42px"
                    mt="0.5rem"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Next: Payment Options'}
                  </Button>
                </Div>
              </form>
            </Div>
            {!isLoggedIn && (
              <Div col="3" ml="20%">
                <Label mt="0" mb="0" color="textLight">
                  Have an existing account with hometown?
                </Label>
                <Button
                  btnType="primary"
                  fontFamily="regular"
                  height="42px"
                  mt="0.5rem"
                  fontSize="0.875rem"
                  p="0.375rem 5rem"
                  onClick={this.onOpenLoginModal}
                >
                  LOGIN
                </Button>
                <ResponsiveModal
                  classNames={{ modal: styles.loginModal }}
                  onCloseModal={this.onCloseLoginModal}
                  open={this.state.openLogin}
                >
                  <LoginModal />
                </ResponsiveModal>
              </Div>
            )}
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
  currentaddressindex: 0,
  userEmail: ''
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
  onChangeEmail: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddress);
