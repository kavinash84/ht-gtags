import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { Label } from 'hometown-components/lib/Label';
import MenuCheckout from './MenuCheckout';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./Checkout.scss');

export default class DeliveryAddress extends Component {
  render() {
    const {
      email,
      phone,
      fullName,
      onChangeEmail,
      onChangePhone,
      onChangeFullName,
      emailFeedBackError,
      emailFeedBackMessage,
      phoneFeedBackError,
      phoneFeedBackMessage,
      fullNameFeedBackError,
      fullNameFeedBackMessage,
      onSubmitProfile
    } = this.props;
    return (
      <Div type="block">
        <MenuCheckout />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <form onSubmit={onSubmitProfile}>
              <Row display="block" mr="0" ml="0">
                <Div col="5">
                  <FormInput
                    label="Full Name"
                    type="text"
                    placeholder=""
                    onChange={onChangeFullName}
                    value={fullName}
                    feedBackError={fullNameFeedBackError}
                    feedBackMessage={fullNameFeedBackMessage}
                  />
                  <FormInput
                    label="Email ID"
                    type="text"
                    placeholder=""
                    onChange={onChangeEmail}
                    value={email}
                    feedBackError={emailFeedBackError}
                    feedBackMessage={emailFeedBackMessage}
                  />
                  <FormInput
                    label="Phone"
                    type="text"
                    placeholder=""
                    onChange={onChangePhone}
                    value={phone}
                    feedBackError={phoneFeedBackError}
                    feedBackMessage={phoneFeedBackMessage}
                  />
                </Div>
              </Row>
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
                <Div col="2">
                  <Button size="block" btnType="primary" fontWeight="regular" height="42px" mt="1.5rem">
                    Next : Payment Options
                  </Button>
                </Div>
              </Row>
            </form>
          </Container>
        </Section>
      </Div>
    );
  }
}

DeliveryAddress.defaultProps = {
  email: '',
  phone: '',
  fullName: '',
  emailFeedBackError: false,
  emailFeedBackMessage: '',
  phoneFeedBackError: false,
  phoneFeedBackMessage: '',
  fullNameFeedBackError: false,
  fullNameFeedBackMessage: '',
  onChangeEmail: () => {},
  onChangePhone: () => {},
  onChangeFullName: () => {},
  onSubmitProfile: () => {}
};

DeliveryAddress.propTypes = {
  onChangeEmail: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeFullName: PropTypes.func,
  onSubmitProfile: PropTypes.func,
  email: PropTypes.string,
  phone: PropTypes.string,
  fullName: PropTypes.string,
  emailFeedBackError: PropTypes.bool,
  emailFeedBackMessage: PropTypes.string,
  phoneFeedBackError: PropTypes.bool,
  phoneFeedBackMessage: PropTypes.string,
  fullNameFeedBackError: PropTypes.bool,
  fullNameFeedBackMessage: PropTypes.string
};
