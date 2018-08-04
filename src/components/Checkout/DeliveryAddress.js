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
import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';
import LoginModal from 'components/Login/LoginModal';
import Footer from 'components/Footer';
import { sendDeliveryAddress } from 'redux/modules/checkout';
import { setAddress } from 'redux/modules/shipping';
import MenuCheckout from './MenuCheckout';
import ShippingForm from './ShippingForm';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./DeliveryAddress.scss');

const mapStateToProps = ({
  userLogin, app, checkout, myaddress
}) => ({
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId,
  nextstep: checkout.nextstep,
  loading: checkout.loading,
  addresses: myaddress.data
});
@withRouter
class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    shippingIsBilling: true,
    openLogin: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
    if (nextProps.nextstep.success) {
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
    history.getBack();
    this.setState({ openLogin: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.shippingIsBilling) {
      const shippingForm = this.shipping_form.validateForm();
      if (shippingForm.error) {
        alert('Please Fill All Details Correctly !');
      } else {
        const { dispatch } = this.context.store;
        const { sessionId } = this.props;
        dispatch(sendDeliveryAddress(sessionId, {
          shippingIsBilling: this.state.shippingIsBilling,
          shippingAddress: shippingForm.data,
          billingAddress: shippingForm.data
        }));
      }
    } else {
      const shippingForm = this.shipping_form.validateForm();
      const billingForm = this.billing_form.validateForm();
      if (shippingForm.error || billingForm.error) {
        alert('Please Fill All Details Correctly !');
      } else {
        const { dispatch } = this.context.store;
        const { sessionId } = this.props;
        dispatch(sendDeliveryAddress(sessionId, {
          shippingIsBilling: this.state.shippingIsBilling,
          shippingAddress: shippingForm.data,
          billingAddress: billingForm.data
        }));
      }
    }
  };

  toggleBillingForm = () => {
    this.setState(prevState => ({
      shippingIsBilling: !prevState.shippingIsBilling
    }));
  };
  handleClick = index => {
    const { dispatch } = this.context.store;
    const { addresses } = this.props;
    dispatch(setAddress(addresses[index]));
  };

  render() {
    const {
      isLoggedIn, history, loading, addresses
    } = this.props;
    // const { shippingIsBilling } = this.state;
    return (
      <Div type="block">
        <MenuCheckout history={history} />
        <Section display="flex" pt="1.25rem" mb="1rem" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              {isLoggedIn && (
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Label fontSize="0.875em" mb="0.875rem">
                      SELECT BILLING ADDRESS
                    </Label>
                  </Div>
                  {addresses.map((item, index) => (
                    <Div col="4" pr="0.625rem">
                      <button className={`${styles.addressBtn}`} onClick={() => this.handleClick(index)}>
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
                    <button className={styles.addAddressBtn}>
                      <img src={addIcon} alt="Add another address" />
                      <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                        Add another address
                      </Text>
                    </button>
                  </Div>
                </Row>
              )}
              <Div col="5" mt="0">
                <form onSubmit={this.handleSubmit}>
                  <ShippingForm
                    ref={shippingform => {
                      if (shippingform) {
                        this.shipping_form = shippingform.getWrappedInstance();
                      }
                    }}
                  />
                  {/* <input type="checkbox" value={shippingIsBilling} onChange={this.toggleBillingForm} /> */}
                  {/* <Label>Different Billing Address ?</Label> */}

                  {/* <BillingForm
                ref={billingform => {
                  if (billingform) {
                    console.log(billingform);
                    this.biling_form = billingform.getWrappedInstance();
                    console.log(this.billing_form); // Don't know why it is undefined !
                  }
                }}
                /> */}
                  <Div col="6">
                    <Button
                      type="submit"
                      size="block"
                      btnType="primary"
                      fontWeight="regular"
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
                    fontWeight="regular"
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
            </Row>
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
  addresses: []
};
DeliveryAddress.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.object,
  addresses: PropTypes.object,
  nextstep: PropTypes.bool.isRequired,
  location: PropTypes.object
};
export default connect(mapStateToProps, null, null, { withRef: true })(DeliveryAddress);
