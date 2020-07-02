import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * modules / selectors / helpers
 */
import { sendDeliveryAddress, resetGuestRegisterFlag } from 'redux/modules/checkout';
import { loadCoupons } from 'redux/modules/coupon';
import { load } from 'redux/modules/paymentoptions';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import { notifSend } from 'redux/modules/notifs';
import { isBlank } from 'js-utility-functions';
import { validateAddress } from 'utils/validation';

/**
 * Components
 */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Select from 'hometown-components-dev/lib/Select';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import { getCartList } from 'selectors/cart';
/**
 * Page Components
 */
import ResponsiveModal from 'components/Modal';
import LoginModal from 'containers/Login/LoginForm';
import AddressForm from './AddressForm';
import OrderSummary from './OrderSummary';
import PaymentMethods from '../PaymentMethods';

/**
 * Icons
 */
const addIcon = require('../../../static/increase.svg');
const styles = require('./DeliveryAddress.scss');

const mapStateToProps = ({
 userLogin, app, checkout, myaddress, address, profile, cart
}) => ({
  results: getCartList(cart),
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId,
  nextstep: checkout.nextstep,
  paymentData: checkout.paymentData,
  loading: checkout.loading,
  addresses: myaddress.data,
  currentaddressindex: address.shipping.index,
  shippingIsBilling: address.shippingIsBilling,
  userEmail: profile.data.email,
  address,
  cart,
  summary: cart.summary,
  couponlistToggle: cart.couponlistToggle
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);
@withRouter
class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    openLogin: false,
    addressform: false,
    addressSelected: false
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
 isLoggedIn, nextstep, clearShippingAddress, onChangeEmail, userEmail, couponlistToggle
} = this.props;
    const { dispatch } = this.context.store;
    if (nextProps.nextstep !== nextstep && nextProps.paymentData) {
      console.log(nextProps.paymentData);
      const { paymentData = {} } = nextProps;
      dispatch(load({
          paymentData
        }));
    }
    if (isLoggedIn && nextProps.userEmail !== userEmail) {
      onChangeEmail('shipping', nextProps.userEmail);
      onChangeEmail('billing', nextProps.userEmail);
    }
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== isLoggedIn) {
      this.setState({
        openLogin: false
      });
      clearShippingAddress();
      if (couponlistToggle) {
        dispatch(loadCoupons());
      }
    }
    // if (nextProps.addresses.length > 0 && nextProps.addresses.length !== this.props.addresses.length) {
    //   this.handleClick(0);
    // }
    if (nextProps.nextstep.success && nextProps.nextstep.success !== nextstep.success) {
      const { history } = this.props;
      history.push('/checkout/payment-options');
    }
  }
  checkParams = () => {
    const {
      address: {
        billing: {
          addressFeedBackError1: Badd1,
          addressFeedBackError2: Badd2,
          addressFeedBackError3: Badd3,
          cityFeedBackError: Bcity,
          emailFeedBackError: Bemail,
          fullNameFeedBackError: Bname,
          gstFeedBackError: Bgst,
          phoneFeedBackError: Bphone,
          pincodeFeedBackError: Bpincode,
          stateFeedBackError: Bstate
        },
        shipping: {
          addressFeedBackError1: Sadd1,
          addressFeedBackError2: Sadd2,
          addressFeedBackError3: Sadd3,
          cityFeedBackError: Scity,
          emailFeedBackError: Semail,
          fullNameFeedBackError: Sname,
          gstFeedBackError: Sgst,
          phoneFeedBackError: Sphone,
          pincodeFeedBackError: Spincode,
          stateFeedBackError: Sstate
        }
      }
    } = this.props;
    const check =
      Badd1 ||
      Badd2 ||
      Badd3 ||
      Bcity ||
      Bemail ||
      Bname ||
      Bgst ||
      Bphone ||
      Bpincode ||
      Bstate ||
      Sadd1 ||
      Sadd2 ||
      Sadd3 ||
      Scity ||
      Semail ||
      Sname ||
      Sgst ||
      Sphone ||
      Spincode ||
      Sstate;
    return check;
  };
  formValdiator = (props, data, formType) => {
    const {
      fullName,
      fullNameFeedBackError,
      email,
      emailFeedBackError,
      phone,
      phoneFeedBackError,
      address1,
      address1FeedBackError1,
      address2,
      addressFeedBackError2,
      address3,
      addressFeedBackError3,
      city,
      pincode,
      pincodeFeedBackError,
      state,
      gst
    } = data;
    const {
      setNameError,
      setPhoneError,
      setEmailError,
      setAddressError1,
      setAddressError2,
      setAddressError3,
      setPincodeError
    } = props;
    const { addressform } = this.state;
    const fullNameError = isBlank(fullName) || fullNameFeedBackError;
    const emailError = isBlank(email) || emailFeedBackError;
    const phoneError = isBlank(phone) || phoneFeedBackError;
    const pincodeError = isBlank(pincode) || pincodeFeedBackError;
    const addressError1 = addressform ? validateAddress(address1, 'address1').error || address1FeedBackError1 : false;
    const addressError2 = addressform ? validateAddress(address2, 'address2').error || addressFeedBackError2 : false;
    const addressError3 = addressform ? validateAddress(address3, 'address3').error || addressFeedBackError3 : false;
    if (fullNameError || emailError || pincodeError || phoneError || addressError1 || addressError2 || addressError3) {
      setNameError(formType, fullNameError);
      setEmailError(formType, emailError);
      setPincodeError(formType, pincodeError);
      setPhoneError(formType, phoneError);
      setAddressError1(formType, addressError1);
      setAddressError2(formType, addressError2);
      setAddressError3(formType, addressError3);
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
        address1,
        address2,
        address3,
        city,
        state,
        gst
      }
    };
  };
  handleLoginModal = () => {
    this.setState({ openLogin: !this.state.openLogin });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      address: { shipping, billing, shippingIsBilling },
      cart: {
        summary: { total: cartTotal }
      }
    } = this.props;
    const { dispatch } = this.context.store;
    const { isLoggedIn } = this.props;
    const { addressform } = this.state;
    if (shippingIsBilling) {
      const shippingForm = this.formValdiator(this.props, shipping, 'shipping');
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
              billingAddress: shippingForm.data,
              cartTotal
            },
            isLoggedIn
          ));
      }
    } else {
      const shippingForm = this.formValdiator(this.props, shipping, 'shipping');
      const billingForm = this.formValdiator(this.props, billing, 'billing');
      if (shippingForm.error || billingForm.error) {
        dispatch(notifSend({
            type: 'warning',
            msg: 'Fill All Details Correctly',
            dismissAfter: 2000
          }));
      } else {
        const { sessionId } = this.props;
        dispatch(sendDeliveryAddress(
            sessionId,
            {
              shippingIsBilling,
              shippingAddress: shippingForm.data,
              billingAddress: billingForm.data,
              cartTotal
            },
            isLoggedIn
          ));
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
      addressform: false,
      addressSelected: true
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
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      index: null
    };
    setAddress('shipping', data, null);
  };
  render() {
    const {
      isLoggedIn,
      history,
      loading,
      addresses,
      currentaddressindex,
      shippingIsBilling,
      userEmail,
      summary,
      results
    } = this.props;
    const { addressform, addressSelected } = this.state;
    return (
      <Container my={60} px={0}>
        <Row>
          <Col variant="col-8">
            {/* For logged in */}
            {!isLoggedIn && (
              <Box col="12" className={styles.isLoggedIn}>
                <Label fontSize="1rem" mt="0" mb="0" color="textLight">
                  Already have an account?
                </Label>
                <Button variant="linkPrimary" fontSize={16} onClick={this.handleLoginModal} ml={10}>
                  Login
                </Button>
                <ResponsiveModal
                  classNames={{ modal: 'loginModal' }}
                  onCloseModal={this.handleLoginModal}
                  open={this.state.openLogin}
                >
                  <LoginModal />
                </ResponsiveModal>
              </Box>
            )}

            {/* For not logged in */}
            {isLoggedIn && (
              <Box>
                <Row mr="0" ml="0" mb={20}>
                  <Box>
                    <Heading variant="heading.medium">Confirm Address</Heading>
                  </Box>
                </Row>
                <Row mx={-10}>
                  {addresses.map((item, index) => (
                    <Col variant="col-6" px={10} mb={20} key={item.id_customer_address}>
                      <Card
                        variant="link"
                        textAlign="left"
                        px={15}
                        py={15}
                        height="100%"
                        lineHeight={1.25}
                        className={`${index === currentaddressindex ? styles.active : styles.deliveryAddress}`}
                        onClick={() => this.handleClick(index)}
                        sx={{
                          border: 'secondary',
                          borderRadius: 3
                        }}
                      >
                        <Text>
                          <b>{item.full_name}</b>
                          <br />
                          {item.address1}
                          {item.address2 && <br />}
                          {item.address2}
                          {item.address3 && <br />}
                          {item.address3}
                          <br />
                          {item.city}, {item.pincode}
                          <br />
                          {item.state}
                          <br />
                          {item.gst || ''}
                        </Text>
                      </Card>
                    </Col>
                  ))}

                  <Col variant="col-12">
                    <Button variant="link" onClick={this.toggleAddAddress} display="flex" alignItems="center">
                      <Image src={addIcon} alt="Add new address" mr={10} />
                      <Text variant="small">Add new address</Text>
                    </Button>
                  </Col>
                </Row>
              </Box>
            )}

            {/* Address Form */}
            <form onSubmit={this.handleSubmit}>
              <Row display="block" mr="0" ml="0">
                {(addressform || !isLoggedIn) && (
                  <Box variant="col-12" px={0} mt="1rem">
                    <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                  </Box>
                )}
                <Box mt={15} width={1}>
                  <Flex px={15} py={15} alignItems="center" sx={{ border: 'secondary' }}>
                    <Box className="checkbox" mr={10}>
                      <Box
                        as="input"
                        type="checkbox"
                        id="checkbox"
                        checked={!shippingIsBilling}
                        onChange={this.toggleBillingForm}
                      />
                      {/* eslint-disable */}
                      <Label htmlFor="checkbox" />
                      {/* eslint-enable */}
                    </Box>
                    <Text variant="link" fontSize={14} htmlFor="checkbox" onClick={this.toggleBillingForm}>
                      <p className={styles.difBillingAddress}> Different Billing Address ?</p>
                    </Text>
                  </Flex>

                  {/* Billing Address */}
                  {!shippingIsBilling && (
                    <Box>
                      <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                    </Box>
                  )}
                </Box>
              </Row>
              <Row justifyContent="flex-end" mt={20}>
                <Col textAlign="right">
                  <Text pb={15} fontSize={14}>
                    *Required
                  </Text>
                  <Button type="submit" disabled={loading || this.checkParams()}>
                    {loading ? 'Loading...' : 'Save and Continue'}
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>

          {/* Order Summary */}
          <Col variant="col-4">
            <Box bg="sidebar" px={40} py={30}>
              <OrderSummary
                history={history}
                results={results}
                itemsTotal={summary.items}
                setDiscount={summary.combined_set_discount}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                itemsCount={summary.items_count}
                discount={summary.coupon_discount}
                coupon={summary.coupon}
              />
              <PaymentMethods />
            </Box>
          </Col>
        </Row>
      </Container>
    );
  }
}
DeliveryAddress.defaultProps = {
  history: {},
  // location: {},
  addresses: [],
  currentaddressindex: -1,
  userEmail: '',
  summary: null,
  couponlistToggle: false,
  results: []
};
DeliveryAddress.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.object,
  addresses: PropTypes.array,
  nextstep: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  paymentData: PropTypes.object.isRequired,
  // location: PropTypes.object,
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
  summary: PropTypes.object,
  couponlistToggle: PropTypes.bool,
  results: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
