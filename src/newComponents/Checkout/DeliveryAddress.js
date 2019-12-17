import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';
import ResponsiveModal from 'newComponents/Modal';
import LoginModal from 'containers/Login/LoginForm';
// import Footer from 'components/Footer';
import { sendDeliveryAddress, resetGuestRegisterFlag } from 'redux/modules/checkout';
import { loadCoupons } from 'redux/modules/coupon';
import { load } from 'redux/modules/paymentoptions';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import { notifSend } from 'redux/modules/notifs';
import { isBlank } from 'js-utility-functions';
import { validateAddress } from 'utils/validation';
import MenuCheckout from './MenuCheckout';
import AddressForm from './AddressForm';
import OrderSummary from './OrderSummary';
import PaymentMethods from '../PaymentMethods/';

// import { getNotDelivered } from 'selectors/cart';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./DeliveryAddress.scss');

const mapStateToProps = ({
 userLogin, app, checkout, myaddress, address, profile, cart
}) => ({
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
      summary
    } = this.props;
    const { addressform } = this.state;
    return (
      <BoxHtV1 type="block">
        <MenuCheckout page="delivery" history={history} />
        <SectionHtV1 display="flex" pt="2.25rem" pb="2rem" mb="1rem" height="auto">
          <ContainerHtV1 type="container" pr="2rem" pl="2rem">
            <BoxHtV1 col="9" mt="0" pr="1rem">
              {!isLoggedIn && (
                <BoxHtV1 col="12" className={styles.isLoggedIn}>
                  <LabelHtV1 fontSize="1rem" mt="0" mb="0" color="textLight">
                    Already have an account?
                  </LabelHtV1>
                  <ButtonHtV1
                    btnType="link"
                    fontFamily="regular"
                    height="18px"
                    mt="-5px"
                    fontSize="1rem"
                    p="0 0.625rem"
                    color="#f98d29"
                    onClick={this.handleLoginModal}
                    lh="1"
                  >
                    Login
                  </ButtonHtV1>
                  <ResponsiveModal
                    classNames={{ modal: 'loginModal' }}
                    onCloseModal={this.handleLoginModal}
                    open={this.state.openLogin}
                  >
                    <LoginModal />
                  </ResponsiveModal>
                </BoxHtV1>
              )}
              {isLoggedIn && (
                <BoxHtV1>
                  <RowHtV1 display="block" mr="0" ml="0">
                    <BoxHtV1 col="12">
                      <LabelHtV1 fontSize="1.125rem" mb="0.875rem">
                        Select Shipping Address
                      </LabelHtV1>
                    </BoxHtV1>
                  </RowHtV1>

                  <RowHtV1 display="block" mr="0" ml="0">
                    {addresses.map((item, index) => (
                      <BoxHtV1 className={styles.addressBlock} col="4" pr="0.625rem" key={item.id_customer_address}>
                        <ButtonHtV1
                          className={`${styles.addressBtn} ${index === currentaddressindex ? styles.active : null}`}
                          onClick={() => this.handleClick(index)}
                        >
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
                          <br />
                          {item.gst || ''}
                          <br />
                        </ButtonHtV1>
                      </BoxHtV1>
                    ))}

                    <BoxHtV1 col="4" pr="0.625rem">
                      <ButtonHtV1 className={styles.addAddressBtn} onClick={this.toggleAddAddress}>
                        <ImageHtV1 src={addIcon} alt="Add another address" />
                        <TextHtV1 color="rgba(0, 0, 0, 0.6)" ta="center">
                          {addresses.length > 0 ? 'Add another address' : 'Add Address'}
                        </TextHtV1>
                      </ButtonHtV1>
                    </BoxHtV1>
                  </RowHtV1>
                </BoxHtV1>
              )}
              <BoxHtV1 col="12" mt="0">
                <form onSubmit={this.handleSubmit}>
                  <RowHtV1 display="block" mr="0" ml="0">
                    {(addressform || !isLoggedIn) && (
                      <BoxHtV1 col="12" pr="0" mt="1rem">
                        <LabelHtV1 fontSize="1.125rem" mb="0.875rem">
                          Shipping Address
                        </LabelHtV1>
                        <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                      </BoxHtV1>
                    )}
                    <BoxHtV1 col="12" pr="0" mt="1.5rem">
                      <BoxHtV1 className="checkbox">
                        <InputFieldHtV1
                          type="checkbox"
                          id="checkbox"
                          checked={!shippingIsBilling}
                          onChange={this.toggleBillingForm}
                        />
                        {/* eslint-disable */}
                        <LabelHtV1 htmlFor="checkbox" />
                        {/* eslint-enable */}
                      </BoxHtV1>
                      <LabelHtV1 fontSize="0.875em" mt="0" mb="0" ml="0.625rem" htmlFor="checkbox">
                        Different Billing Address ?
                      </LabelHtV1>
                      {!shippingIsBilling && (
                        <BoxHtV1 col="12" mt="11px">
                          <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                        </BoxHtV1>
                      )}
                    </BoxHtV1>
                  </RowHtV1>
                  <RowHtV1 display="block" mr="0" ml="0">
                    <BoxHtV1 col="5" mt="1.5rem">
                      <ButtonHtV1
                        type="submit"
                        size="block"
                        btnType="primary"
                        fontFamily="regular"
                        height="42px"
                        mt="0.5rem"
                        disabled={loading || this.checkParams()}
                        fontSize="1.125rem"
                      >
                        {loading ? 'Loading...' : 'Save and Continue'}
                      </ButtonHtV1>
                    </BoxHtV1>
                  </RowHtV1>
                </form>
              </BoxHtV1>
            </BoxHtV1>
            <BoxHtV1 col="3" mt="0" pl="0.625rem">
              <OrderSummary
                itemsTotal={summary.items}
                setDiscount={summary.combined_set_discount}
                savings={summary.savings}
                shipping={summary.shipping_charges}
                totalCart={summary.total}
                onClick={() => null}
                itemsCount={summary.items_count}
                discount={summary.coupon_discount}
                hidebutton
              />
              <PaymentMethods />
            </BoxHtV1>
          </ContainerHtV1>
        </SectionHtV1>
        {/* <Footer /> */}
      </BoxHtV1>
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
  couponlistToggle: false
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
  couponlistToggle: PropTypes.bool
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
