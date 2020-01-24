import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

/**
 * modules / selectors / helpers
 */
import { setCardType, verifyEasyEmi } from 'redux/modules/paymentoptions';
import { getEasyEmiConfig } from 'selectors/payments';
import { getCartSummary } from 'selectors/cart';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

const styles = require('./Checkout.scss');

/**
 * Icons
 */
const aeIcon = require('../../../static/american-express.svg');
const dcIcon = require('../../../static/diners-club.svg');
const discoverIcon = require('../../../static/discover.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const cardIcon = require('../../../static/cardDefault.svg');

const onChangeDetails = (dispatcher, gateway, sessionId, easyEmiConfig) => e => {
  const { name, value } = e.target;
  let data = {
    [name]: value,
    session: sessionId,
    gateway
  };
  if (easyEmiConfig !== undefined) {
    data = { ...data, easyEmiConfig };
  }
  dispatcher({
    gateway,
    data
  });
};

const onVerify = (dispatcher, cardNumber, sessionId) => () => {
  dispatcher({ cardNumber }, sessionId);
};

const onGetCardType = (dispatcher, sessionId, gateway) => e => {
  const { value } = e.target;
  dispatcher(value, sessionId, gateway);
};

class CardForm extends Component {
  handleChange = e => {
    const { setPaymentDetails, gateway, sessionId } = this.props;
    onChangeDetails(setPaymentDetails, gateway, sessionId)(e);
  };

  handleBlur = () => {};

  render() {
    // const styles = require('./CardFormEasyEmi.scss');
    const {
      gateway,
      setPaymentDetails,
      details: { cardNumber, easyemi_otp_code: otp },
      getCardType,
      cardType,
      sessionId,
      padding,
      verify,
      easyEmiVerifying,
      easyEmiVerifyError,
      easyEmiVerified,
      easyEmiVerifyResponse,
      easyEmiProcessing,
      easyEmiProcessError,
      easyEmiProcessed,
      easyEmiProcessResponse,
      easyEmiConfig,
      cartSummary,
      submitting
    } = this.props;
    return (
      <Box className={styles.paymentBlock} p={padding}>
        {/* eslint-disable */}
        <Box col="8" pr="1rem" className={styles.cardFieldWrapper}>
          Bajaj Finance Easy Emi
        </Box>
        {/* card form */}
        <Box col="12" m="1rem" />
        <Fragment>
          {((easyEmiVerifyResponse !== undefined &&
            easyEmiVerifyResponse !== null &&
            easyEmiVerifyResponse.RSPCODE !== undefined &&
            easyEmiVerifyResponse.RSPCODE.toString() !== '0') ||
            (!easyEmiProcessed && !easyEmiVerified)) && (
            <Fragment>
              <Box col="8" pr="1rem" className={styles.cardFieldWrapper}>
                <FormInput
                  label="STEP 1 of 2"
                  type="text"
                  placeholder="Enter Card Number / Mobile Number"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={onChangeDetails(setPaymentDetails, gateway, sessionId, easyEmiConfig)}
                  onBlur={onGetCardType(getCardType, sessionId, gateway)}
                />
                {cardType === 'visa' && <Image src={visaIcon} alt="visaCard" />}
                {cardType === 'mast' && <Image src={mastercardIcon} alt="Master Card" />}
                {cardType === 'maestro' && <Image src={maestroIcon} alt="Maestro" />}
                {cardType === 'amex' && <Image src={aeIcon} alt="Amex" />}
                {cardType === 'discover' && <Image src={discoverIcon} alt="Discover Card" />}
                {cardType === 'diners' && <Image src={dcIcon} alt="Diners Club" />}
                {cardType === 'other' && <Image src={cardIcon} alt="Others" />}
              </Box>
              {/* card form error */}
              {((easyEmiVerifyError !== undefined && easyEmiVerifyError !== null) ||
                (easyEmiVerifyResponse !== undefined &&
                  easyEmiVerifyResponse !== null &&
                  easyEmiVerifyResponse.RSPCODE !== undefined &&
                  easyEmiVerifyResponse.RSPCODE.toString() !== '0')) && (
                <Box col="12" mb="0" p="0" mt="-20px">
                  <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                    {easyEmiVerifyResponse.ERRDESC}
                  </Text>
                </Box>
              )}
              <Box col="8" mt="1rem">
                {cardNumber !== '' && (
                  <Button
                    size="block"
                    btnType="primary"
                    height="42px"
                    mt="0"
                    fontFamily="Light"
                    fontSize="13px"
                    ls="1px"
                    onClick={onVerify(verify, cardNumber, sessionId)}
                    hide={cardNumber !== ''}
                    borderRadius="0"
                    disabled={cardNumber === '' || easyEmiVerifying}
                  >
                    {easyEmiVerifying !== undefined && easyEmiVerifying ? 'Please wait...' : 'REQUEST FOR OTP'}
                  </Button>
                )}
              </Box>
            </Fragment>
          )}
        </Fragment>
        {/* otp form */}
        <Fragment>
          {easyEmiVerifyResponse !== undefined &&
            easyEmiVerifyResponse !== null &&
            easyEmiVerifyResponse.RSPCODE !== undefined &&
            easyEmiVerifyResponse.RSPCODE.toString() === '0' &&
            easyEmiVerified && (
              <Fragment>
                <Box col="6" pr="1rem" className={styles.cardFieldWrapper}>
                  <FormInput
                    label="STEP 2 of 2"
                    type="text"
                    placeholder="Enter OTP number"
                    name="easyemi_otp_code"
                    value={otp}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Box>
                {easyEmiProcessing && (
                  <Box col="12" mb="0" p="0" mt="-10px">
                    <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                      {'Please wait verifying OTP.....'}
                    </Text>
                  </Box>
                )}
                {((easyEmiProcessError !== undefined && easyEmiProcessError !== null) ||
                  (easyEmiProcessResponse !== undefined &&
                    easyEmiProcessResponse !== null &&
                    easyEmiProcessResponse.RSPCODE !== undefined &&
                    easyEmiProcessResponse.RSPCODE.toString() !== '0')) && (
                  <Box col="12" mb="0" p="0" mt="-10px">
                    <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                      {easyEmiProcessResponse.ERRDESC}
                    </Text>
                  </Box>
                )}
                {/* otp form error */}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE !== undefined &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  submitting && (
                    <Box col="12" mb="0" p="0">
                      <Text mt="0" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        <Fragment>
                          OTP verification successfull. <br />
                          Please wait while we are processing your order......
                        </Fragment>
                      </Text>
                    </Box>
                  )}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE !== undefined &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  !submitting && (
                    <Box col="12" mb="0" p="0">
                      <Text mt="0" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        <Fragment>Thank you. Your Order has been placed....</Fragment>
                      </Text>
                    </Box>
                  )}
                {Object.keys(easyEmiConfig).length > 0 && (
                  <Box col="12" mb="0" p="0" mt="2rem">
                    <table border="1" className={`table table-border ${styles.emiTable}`}>
                      <tbody>
                        <tr>
                          <th>Tenure</th>
                          <th>Annual Interest Rate</th>
                          <th>Emi Interest</th>
                          <th>Instant Cashback</th>
                          <th>Total Cost</th>
                          <th>Monthly Instalments</th>
                        </tr>
                        {JSON.parse(easyEmiConfig.emiOptions).map(option => (
                          <tr key={option.value}>
                            <td>{option.tenure}</td>
                            <td>{option.annual_interest_rate}</td>
                            <td>
                              {/* eslint-disable max-len */}
                              {parseFloat(cartSummary.total * (option.annual_interest_rate / 100)).toFixed()}
                              {/* eslint-disable max-len */}
                            </td>
                            <td>{option.cashback}</td>
                            <td>{cartSummary.total}</td>
                            <td>{`${parseFloat(cartSummary.total / option.tenure).toFixed(2)} *`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                )}
                <Box col="12" mb="0" p="0">
                  <Text mt="1rem" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                    {/* eslint-disable */}
                    {`* Processing Fees of Rs. ${easyEmiConfig.processingFees} will be added in First EMI Installment.`}
                    {/* eslint-disable */}
                  </Text>
                </Box>
              </Fragment>
            )}
        </Fragment>
        <Box col="12" mb="0" p="0" className={styles.easyEmiImpNote}>
          <Text mt="1rem" fontSize="0.875rem" color="#969696">
            {'* Only Bajaj Finance Easy Emi Cards are accepted.'}
          </Text>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({ paymentoptions, app, cart }, ownProps) => ({
  details: paymentoptions.paymentMethodDetails[paymentoptions.selectedGateway],
  sessionId: app.sessionId,
  cardType: paymentoptions.cardType,
  selectedGateway: paymentoptions.selectedGateway,
  easyEmiVerifying: paymentoptions.easyEmiVerifying,
  easyEmiVerified: paymentoptions.easyEmiVerified,
  easyEmiVerifyError: paymentoptions.easyEmiVerifyError,
  easyEmiVerifyResponse: paymentoptions.easyEmiVerifyResponse,
  easyEmiProcessing: paymentoptions.easyEmiProcessing,
  easyEmiProcessed: paymentoptions.easyEmiProcessed,
  easyEmiProcessError: paymentoptions.easyEmiProcessError,
  easyEmiProcessResponse: paymentoptions.easyEmiProcessResponse,
  easyEmiConfig: getEasyEmiConfig(paymentoptions),
  cartSummary: getCartSummary(cart),
  submitting: paymentoptions.submitting,
  ...ownProps
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCardType: setCardType,
      verify: verifyEasyEmi
    },
    dispatch
  );

CardForm.defaultProps = {
  cardType: 'other',
  sessionId: '',
  padding: '3.5rem 2rem',
  easyEmiVerifying: false,
  easyEmiVerified: false,
  easyEmiVerifyError: null,
  easyEmiVerifyResponse: null,
  easyEmiProcessing: false,
  easyEmiProcessed: false,
  easyEmiProcessError: null,
  easyEmiProcessResponse: null,
  easyEmiConfig: {},
  submitting: false
};

CardForm.propTypes = {
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  getCardType: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  cardType: PropTypes.string,
  padding: PropTypes.string,
  verify: PropTypes.func.isRequired,
  easyEmiVerifying: PropTypes.bool,
  easyEmiVerified: PropTypes.bool,
  easyEmiVerifyError: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
  ]),
  easyEmiVerifyResponse: PropTypes.objectOf(PropTypes.any),
  easyEmiProcessing: PropTypes.bool,
  easyEmiProcessed: PropTypes.bool,
  easyEmiProcessError: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
  ]),
  easyEmiProcessResponse: PropTypes.objectOf(PropTypes.any),
  easyEmiConfig: PropTypes.objectOf(PropTypes.any),
  cartSummary: PropTypes.objectOf(PropTypes.any).isRequired,
  submitting: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
