import React, { Component, Fragment } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCardType, verifyEasyEmi } from 'redux/modules/paymentoptions';
import { getEasyEmiConfig } from 'selectors/payments';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { getCartSummary } from 'selectors/cart';

const styles = require('./Checkout.scss');

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
      <Div className={styles.paymentBlock} p={padding}>
        {/* eslint-disable */}
        <Div col="8" pr="1rem" className={styles.cardFieldWrapper}>
          Bajaj Finance Easy Emi
        </Div>
        {/* card form */}
        <Div col="12" m="1rem" />
        <Fragment>
          {((easyEmiVerifyResponse !== undefined &&
            easyEmiVerifyResponse !== null &&
            easyEmiVerifyResponse.RSPCODE !== undefined &&
            easyEmiVerifyResponse.RSPCODE.toString() !== '0') ||
            (!easyEmiProcessed && !easyEmiVerified)) && (
            <Fragment>
              <Div col="8" pr="1rem" className={styles.cardFieldWrapper}>
                <FormInput
                  label="STEP 1 of 2"
                  type="text"
                  placeholder="Enter Card Number"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={onChangeDetails(setPaymentDetails, gateway, sessionId, easyEmiConfig)}
                  onBlur={onGetCardType(getCardType, sessionId, gateway)}
                />
                {cardType === 'visa' && <Img src={visaIcon} alt="visaCard" />}
                {cardType === 'mast' && <Img src={mastercardIcon} alt="Master Card" />}
                {cardType === 'maestro' && <Img src={maestroIcon} alt="Maestro" />}
                {cardType === 'amex' && <Img src={aeIcon} alt="Amex" />}
                {cardType === 'discover' && <Img src={discoverIcon} alt="Discover Card" />}
                {cardType === 'diners' && <Img src={dcIcon} alt="Diners Club" />}
                {cardType === 'other' && <Img src={cardIcon} alt="Others" />}
              </Div>
              {/* card form error */}
              {((easyEmiVerifyError !== undefined && easyEmiVerifyError !== null) ||
                (easyEmiVerifyResponse !== undefined &&
                  easyEmiVerifyResponse !== null &&
                  easyEmiVerifyResponse.RSPCODE !== undefined &&
                  easyEmiVerifyResponse.RSPCODE.toString() !== '0')) && (
                <Div col="12" mb="0" p="0" mt="-20px">
                  <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                    {easyEmiVerifyResponse.ERRDESC}
                  </Text>
                </Div>
              )}
              <Div col="8" mt="1rem">
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
              </Div>
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
                <Div col="6" pr="1rem" className={styles.cardFieldWrapper}>
                  <FormInput
                    label="STEP 2 of 2"
                    type="text"
                    placeholder="Enter OTP number"
                    name="easyemi_otp_code"
                    value={otp}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Div>
                {easyEmiProcessing && (
                  <Div col="12" mb="0" p="0" mt="-10px">
                    <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                      {'Please wait verifying OTP.....'}
                    </Text>
                  </Div>
                )}
                {((easyEmiProcessError !== undefined && easyEmiProcessError !== null) ||
                  (easyEmiProcessResponse !== undefined &&
                    easyEmiProcessResponse !== null &&
                    easyEmiProcessResponse.RSPCODE !== undefined &&
                    easyEmiProcessResponse.RSPCODE.toString() !== '0')) && (
                  <Div col="12" mb="0" p="0" mt="-10px">
                    <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                      {easyEmiProcessResponse.ERRDESC}
                    </Text>
                  </Div>
                )}
                {/* otp form error */}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE !== undefined &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  submitting && (
                    <Div col="12" mb="0" p="0">
                      <Text mt="0" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        <Fragment>
                          OTP verification successfull. <br />
                          Please wait while we are processing your order......
                        </Fragment>
                      </Text>
                    </Div>
                  )}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE !== undefined &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  !submitting && (
                    <Div col="12" mb="0" p="0">
                      <Text mt="0" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        <Fragment>Thank you. Your Order has been placed....</Fragment>
                      </Text>
                    </Div>
                  )}
                {Object.keys(easyEmiConfig).length > 0 && (
                  <Div col="12" mb="0" p="0" mt="2rem">
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
                  </Div>
                )}
                <Div col="12" mb="0" p="0">
                  <Text mt="1rem" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                    {/* eslint-disable */}
                    {`* Processing Fees of Rs. ${easyEmiConfig.processingFees} will be added in First EMI Installment.`}
                    {/* eslint-disable */}
                  </Text>
                </Div>
              </Fragment>
            )}
        </Fragment>
        <Div col="12" mb="0" p="0" className={styles.easyEmiImpNote}>
          <Text mt="1rem" fontSize="0.875rem" color="#969696">
            {'* Only Bajaj Finance Easy Emi Cards are accepted.'}
          </Text>
        </Div>
      </Div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);
