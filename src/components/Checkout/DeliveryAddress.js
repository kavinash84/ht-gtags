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
const BackIcon = require('../../../static/cart/back.svg');
const CloseIcon = require('../../../static/cart/close.svg');
const addIcon = require('../../../static/cart/addAddressicon.svg');
/**
 * Components
 */
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
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
// const addIcon = require('../../../static/increase.svg');
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
  addNewAddress: address.addNewAddress,
  showAddAddress: checkout.showAddAddress,
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
      isLoggedIn, nextstep, clearShippingAddress, onChangeEmail, userEmail, couponlistToggle, cart, AddNewAddress, showAddAddress
    } = this.props;
    const { dispatch } = this.context.store;
    if (nextProps.nextstep !== nextstep && nextProps.paymentData) {
      const { paymentData = {} } = nextProps;
      dispatch(
        load({
          paymentData,
          cart
        })
      );
    }
    if (isLoggedIn && nextProps.userEmail !== userEmail) {
      onChangeEmail('shipping', nextProps.userEmail);
      onChangeEmail('billing', nextProps.userEmail);
    }
    if (nextProps.isLoggedIn !== isLoggedIn) {
      clearShippingAddress();
    }
    if (nextProps.nextstep.success && nextProps.nextstep.success !== nextstep.success) {
      const { history } = this.props;
      history.push('/checkout/payment-options');
    }
    if (nextProps.showAddAddress !== showAddAddress) {
      if (!showAddAddress) {
        console.log('called...1');
        dispatch(AddNewAddress(false));
      }
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
    // const { addressform } = this.state;
    const fullNameError = isBlank(fullName) || fullNameFeedBackError;
    const emailError = isBlank(email) || emailFeedBackError;
    const phoneError = isBlank(phone) || phoneFeedBackError;
    const pincodeError = isBlank(pincode) || pincodeFeedBackError;
    // const addressError1 = isBlank(address1) || address1FeedBackError1;
    // // addressform ? validateAddress(address1, 'address1').error || address1FeedBackError1 : false;
    // const addressError2 = addressform ? validateAddress(address2, 'address2').error || addressFeedBackError2 : false;
    // const addressError3 = addressform ? validateAddress(address3, 'address3').error || addressFeedBackError3 : false;
    const addressError1 = validateAddress(address1, 'address1').error || address1FeedBackError1;
    const addressError2 = validateAddress(address2, 'address2').error || addressFeedBackError2;
    const addressError3 = validateAddress(address3, 'address3').error || addressFeedBackError3;
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
        const { sessionId, AddNewAddress } = this.props;
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
        const { sessionId, AddNewAddress } = this.props;
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
      addressform: false
    });
    setAddress('shipping', addresses[index], index);
    loadPincodeDetails('shipping', addresses[index].pincode);
  };

  isAddressSelected = () => {
    const { dispatch } = this.context.store;
    dispatch(
      notifSend({
        type: 'warning',
        msg: 'Please Add new Address  /  Select delivery Address ',
        dismissAfter: 2000
      })
    );
  };
  toggleAddAddress = e => {
    const { setAddress, isLoggedIn, userEmail, AddNewAddress } = this.props;
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
    AddNewAddress(!this.state.addressform);
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
      results,
      addNewAddress
    } = this.props;
    const { addressform } = this.state;
    return (
      <Container my={[60, 60, 60]} px={[24, 24, 0]}>



        <Row>
          <Col variant="col-12" >
            {/* For logged in */}
            {!isLoggedIn && (
              <Box className={styles.isLoggedIn}>
                <div style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}>
                  <Button style={{
                    height: "50px",
                    width: "200px",
                    border: '1px solid #F47020',
                    borderRadius: '4px',
                    padding: '20px 45px',
                    background: 'white',
                    color: '#F47020',
                    fontSize: '14px'
                  }}
                    onClick={this.handleLoginModal} ml={10}>
                    Login
                </Button>
                </div>

                <ResponsiveModal
                  classNames={{ modal: 'loginModal' }}
                  onCloseModal={this.handleLoginModal}
                  open={this.state.openLogin}
                >
                  <Box px={24} py={20}>
                    <LoginModal />
                  </Box>
                </ResponsiveModal>
              </Box>
            )}
            {isLoggedIn && !addNewAddress && (
              <Div col="12" pb="0.625rem">
                <button className={styles.addAddressBtn} onClick={this.toggleAddAddress}>
                  <Text color="rgb(0,0,0)" ta="left" mt="0" mb="0" >
                    <img className={styles.addAddressBtnIcon} src={addIcon} alt="Add New Address" />
                    {addresses.length > 0 ? 'Add New Address' : 'Add Address'}
                  </Text>
                </button>
              </Div>
            )}
            {addNewAddress && (

              <Div className={styles.addNewAddressHeader}>
                <Button bg="transparent" border="none" onClick={this.toggleAddAddress} p="0">
                  {' '}
                  <img src={BackIcon} alt="Close" /> <span>Add New Address</span>
                </Button>

                <Button bg="transparent" border="none" onClick={this.toggleAddAddress} p="0">
                  {' '}
                  <img src={CloseIcon} alt="Close" />{' '}
                </Button>
              </Div>
            )}
            {/* For not logged in */}
            {isLoggedIn && !addNewAddress && (
              <Box>
                <Row mx={0} mb={20}>
                  <Heading variant="heading.medium">My Saved Address</Heading>
                </Row>
                <Row mx={-10}>
                  {addresses.map((item, index) => (
                    <Col variant="col-12" px={10} mb={20} key={item.id_customer_address}>
                      <button className={`${styles.addressBtn}`} onClick={() => this.handleClick(index)}>
                        <div className={styles.customCheckbox}>
                          <div style={{ marginTop: "10px" }}>
                            {index === currentaddressindex ? (
                              <div className={styles.checked}>
                                <div className={styles.filled} />
                              </div>
                            ) : (
                                <div className={styles.unchecked}></div>
                              )}
                          </div>
                          <div className={styles.checkboxLabel}> {item.full_name} </div>
                        </div>
                        <div style={{ marginLeft: "30px", color: "#999999" }}>
                          {item.address1}
                          {item.address1}
                          {item.address2}
                          {item.address2}
                          {item.address3}
                          {item.address3}
                          <br />
                          {item.city}, {item.pincode}
                          <br />
                          {item.state}
                          <br />
                          {item.gst || ''}
                        </div>
                      </button>
                    </Col>
                  ))}


                </Row>
              </Box>
            )}

            {/* Address Form */}
            <form onSubmit={this.handleSubmit}>
              {(addressform || !isLoggedIn) && (
                <Div style={{ background: '#FFFFFF' }} pl="15px" pr="15px">
                  {!isLoggedIn && (
                    <Div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#323131' }}>
                      Or Continue As Guest
                    </Div>
                  )}
                  <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                </Div>
              )}

              <Row display="block" mr="0" ml="0" mt="1rem" mb="2.5rem">
                <Div col="12" mb="10x" style={{ marginBottom: '15px' }} pl="15px" pr="15px">

                  <div display="inline-block">
                    <label className={styles.checkbox_container} htmlFor="checkbox">
                      Billing Address Same As Shipping Address
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={shippingIsBilling}
                        onChange={this.toggleBillingForm}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                  </div>

                </Div>
                <div style={{ padding: '5px', width: '100%', background: '#f7f7f7', marginTop: '35px' }} />
                {!shippingIsBilling && (
                  <Row display="block" mr="0" ml="0" mt="1.5rem" mb="0" pl="15px" pr="15px" width="100%">
                    <Div col="12">
                      <Div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#323131' }}>
                        Add Billing Address
                      </Div>
                    </Div>
                    <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                  </Row>
                )}
              </Row>
            </form>

          </Col>

        </Row>
        <Div className={styles.deliverBtnWrapper}>
          <button
            style={{
              border: '1px solid #F47020',
              borderRadius: '4px',
              padding: '15px 35px',
              background: 'white',
              color: '#F47020',
              fontSize: '14px'
            }}
            // disabled={loading || this.checkParams()}
            disabled={loading}
            onClick={
              isLoggedIn && !addNewAddress && (currentaddressindex === -1 || currentaddressindex === null)
                ? this.isAddressSelected
                : this.handleSubmit
            }
          >
            {loading ? 'Loading...' : 'Save and Continue'}
          </button>
        </Div>

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
