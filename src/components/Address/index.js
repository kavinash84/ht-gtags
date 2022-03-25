import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import FormInput from "hometown-components-dev/lib/FormsHtV1/FormInputHtV1";

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./Address.scss');

export default class Address extends Component {
  render() {
    const {
      email,
      phone,
      fullName,
      pincode,
      address,
      onChangeEmail,
      onChangePhone,
      onChangePin,
      onChangeAddress,
      onChangeFullName,
      emailFeedBackError,
      emailFeedBackMessage,
      phoneFeedBackError,
      phoneFeedBackMessage,
      pinFeedBackError,
      pinFeedBackMessage,
      addressFeedBackError,
      addressFeedBackMessage,
      fullNameFeedBackError,
      fullNameFeedBackMessage,
      onSubmitProfile
    } = this.props;
    return (
      <Div type="block" mb="2rem">
        <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
                Select a delivery address
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section
          pt="1.25rem"
          mb="0"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          height="calc(100vh - 152px)"
          of="auto"
          display="flex"
        >
          <Container type="container" pr="0" pl="0">
            <form onSubmit={onSubmitProfile}>
              <Row display="block" mr="0" ml="0">
                <Div col="12" pb="0.625rem">
                  <button className={`${styles.addressBtn} ${styles.active}`}>
                    Saurabh Suman
                    <br />
                    A-503, Mayfair Hillcrest, Near Pop Tates,
                    <br />
                    Vikhroli, Mumbai, 400076
                    <br />
                    Maharashtra
                    <br />
                  </button>
                </Div>
                <Div col="12" pb="0.625rem">
                  <button className={styles.addressBtn}>
                    Saurabh Suman
                    <br />
                    A-503, Mayfair Hillcrest, Near Pop Tates,
                    <br />
                    Vikhroli, Mumbai, 400076
                    <br />
                    Maharashtra
                    <br />
                  </button>
                </Div>
                <Div col="12" pb="0.625rem">
                  <button className={styles.addAddressBtn}>
                    <Text color="rgba(0, 0, 0, 0.6)" ta="center" mt="0" mb="0">
                      <img className={styles.addAddressBtnIcon} src={addIcon} alt="Add another address" />
                      Add another address
                    </Text>
                  </button>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Div col="12">
                  <FormInput
                    label="Full Name *"
                    type="text"
                    placeholder=""
                    onChange={onChangeFullName}
                    value={fullName}
                    feedBackError={fullNameFeedBackError}
                    feedBackMessage={fullNameFeedBackMessage}
                  />
                  <FormInput
                    label="Street Address *"
                    type="text"
                    placeholder=""
                    onChange={onChangeAddress}
                    value={address}
                    feedBackError={addressFeedBackError}
                    feedBackMessage={addressFeedBackMessage}
                  />
                  <FormInput
                    label="Phone *"
                    type="text"
                    placeholder=""
                    onChange={onChangePhone}
                    value={phone}
                    feedBackError={phoneFeedBackError}
                    feedBackMessage={phoneFeedBackMessage}
                  />
                  <FormInput
                    label="PIN Code *"
                    type="text"
                    placeholder=""
                    onChange={onChangePin}
                    value={pincode}
                    feedBackError={pinFeedBackError}
                    feedBackMessage={pinFeedBackMessage}
                  />
                  <FormInput
                    label="Email ID *"
                    type="text"
                    placeholder=""
                    onChange={onChangeEmail}
                    value={email}
                    feedBackError={emailFeedBackError}
                    feedBackMessage={emailFeedBackMessage}
                  />
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Button size="block" btnType="primary" fontFamily="regular" height="42px" mt="1rem" mb="1.5rem">
                    Save
                  </Button>
                </Div>
              </Row>
            </form>
          </Container>
        </Section>
        <Div className={styles.deliverBtnWrapper}>
          <Button size="block" btnType="primary" fontFamily="regular" p="0.625rem .75rem" fontSize="0.875rem">
            DELIVER TO THIS ADDRESS
          </Button>
        </Div>
      </Div>
    );
  }
}

Address.defaultProps = {
  email: '',
  phone: '',
  fullName: '',
  pincode: '',
  address: '',
  emailFeedBackError: false,
  emailFeedBackMessage: '',
  phoneFeedBackError: false,
  phoneFeedBackMessage: '',
  pinFeedBackError: false,
  pinFeedBackMessage: '',
  addressFeedBackError: false,
  addressFeedBackMessage: '',
  fullNameFeedBackError: false,
  fullNameFeedBackMessage: '',
  onChangeEmail: () => { },
  onChangePhone: () => { },
  onChangeFullName: () => { },
  onChangeAddress: () => { },
  onSubmitProfile: () => { },
  onChangePin: () => { }
};

Address.propTypes = {
  onChangeEmail: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeFullName: PropTypes.func,
  onSubmitProfile: PropTypes.func,
  onChangePin: PropTypes.func,
  onChangeAddress: PropTypes.func,
  email: PropTypes.string,
  phone: PropTypes.string,
  fullName: PropTypes.string,
  pincode: PropTypes.string,
  address: PropTypes.string,
  emailFeedBackError: PropTypes.bool,
  emailFeedBackMessage: PropTypes.string,
  phoneFeedBackError: PropTypes.bool,
  phoneFeedBackMessage: PropTypes.string,
  pinFeedBackError: PropTypes.bool,
  pinFeedBackMessage: PropTypes.string,
  addressFeedBackError: PropTypes.bool,
  addressFeedBackMessage: PropTypes.string,
  fullNameFeedBackError: PropTypes.bool,
  fullNameFeedBackMessage: PropTypes.string
};
