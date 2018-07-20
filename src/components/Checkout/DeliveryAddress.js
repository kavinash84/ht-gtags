import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import { sendDeliveryAddress } from 'redux/modules/checkout';
import MenuCheckout from './MenuCheckout';
import ShippingForm from './ShippingForm';
// import BillingForm from './BillingForm';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./DeliveryAddress.scss');

const mapStateToProps = ({ userLogin, app }) => ({
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId
});

class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    shippingIsBilling: true
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

  render() {
    const { isLoggedIn } = this.props;
    // const { shippingIsBilling } = this.state;
    return (
      <Div type="block">
        <MenuCheckout />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
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

              <button type="submit ">NEXT PAYMENT OPTIONS</button>
            </form>

            {isLoggedIn ? (
              <div>
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Label fontSize="0.875em" mb="0.875rem">
                      SELECT BILLING ADDRESS
                    </Label>
                  </Div>
                  <Div col="4" pr="0.625rem">
                    <button className={`${styles.addressBtn} ${styles.active}`}>
                      Saurabh Suman<br />
                      A-503, Mayfair Hillcrest, Near Pop Tates,<br />
                      Vikhroli, Mumbai, 400076<br />
                      Maharashtra<br />
                    </button>
                  </Div>
                  <Div col="4">
                    <button className={styles.addressBtn}>
                      Saurabh Suman<br />
                      A-503, Mayfair Hillcrest, Near Pop Tates,<br />
                      Vikhroli, Mumbai, 400076<br />
                      Maharashtra<br />
                    </button>
                  </Div>
                  <Div col="2">
                    <button className={styles.addAddressBtn}>
                      <img src={addIcon} alt="Add another address" />
                      <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                        Add another address
                      </Text>
                    </button>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="3">
                    <Button size="block" btnType="primary" fontWeight="regular" height="42px" mt="1.5rem">
                      Next : Payment Options
                    </Button>
                  </Div>
                </Row>
              </div>
            ) : (
              <div>LOGIN BUTTON</div>
            )}
          </Container>
        </Section>
      </Div>
    );
  }
}

DeliveryAddress.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(DeliveryAddress);
