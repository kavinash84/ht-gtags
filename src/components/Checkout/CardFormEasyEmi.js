import React, { Component, Fragment } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCardType, verifyEasyEmi, processEasyEmi } from 'redux/modules/paymentoptions';
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

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const onVerify = (dispatcher, cardNumber, sessionId) => () => {
  dispatcher({ cardNumber }, sessionId);
};

const onProcess = (
  dispatcher,
  cardNumber,
  sessionId,
  otp,
  orderNumber,
  emiCode,
  emiTenure,
  gateway,
  processingFees
) => () => {
  dispatcher(
    {
      cardNumber,
      otp,
      orderNumber,
      emiCode,
      emiTenure
    },
    sessionId,
    gateway,
    processingFees
  );
};

const onGetCardType = (dispatcher, sessionId, gateway) => e => {
  const { value } = e.target;
  dispatcher(value, sessionId, gateway);
};

class CardForm extends Component {
  state = { otp: '' };

  handleChange = e => {
    this.setState({ otp: e.target.value });
  };

  handleBlur = () => {};

  render() {
    // const styles = require('./CardFormEasyEmi.scss');
    const {
      gateway,
      setPaymentDetails,
      details: { cardNumber },
      getCardType,
      cardType,
      sessionId,
      padding,
      verify,
      easyEmiVerifying,
      easyEmiVerifyError,
      easyEmiVerified,
      easyEmiVerifyResponse,
      processEmi,
      easyEmiProcessing,
      easyEmiProcessError,
      easyEmiProcessed,
      easyEmiProcessResponse,
      easyEmiConfig,
      cartSummary
    } = this.props;
    const { otp } = this.state;
    const easyEmiConfigJson =
      easyEmiConfig && Object.keys(easyEmiConfig).length > 0 ? JSON.parse(easyEmiConfig.emiOptions)[0] : {};
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
                  onChange={onChangeDetails(setPaymentDetails, gateway)}
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
                  easyEmiVerifyResponse.RSPCODE.toString() !== '0')) && (
                <Div col="12" mb="0" p="0" mt="-20px">
                  <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                    {easyEmiVerifyResponse.ERRDESC}
                  </Text>
                </Div>
              )}
              <Div col="12" />
              <Div col="12" />
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
            easyEmiVerifyResponse.RSPCODE.toString() === '0' &&
            easyEmiVerified && (
              <Fragment>
                <Div col="6" pr="1rem" className={styles.cardFieldWrapper}>
                  <FormInput
                    label="STEP 2 of 2"
                    type="text"
                    placeholder="Enter OTP number"
                    name="otpNumber"
                    value={otp}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Div>
                {((easyEmiProcessError !== undefined && easyEmiProcessError !== null) ||
                  (easyEmiProcessResponse !== undefined &&
                    easyEmiProcessResponse !== null &&
                    easyEmiProcessResponse.RSPCODE.toString() !== '0')) && (
                  <Div col="12" mb="0" p="0" mt="-10px">
                    <Text mt="1rem" fontSize="0.875rem" color="#dc3545">
                      {easyEmiProcessResponse.ERRDESC}
                    </Text>
                  </Div>
                )}
                <Div col="12" mb="0" p="0">
                  <Div col="6" mb="0" p="0" mt="1rem">
                    {otp !== '' &&
                      !(
                        easyEmiProcessResponse !== undefined &&
                        easyEmiProcessResponse !== null &&
                        easyEmiProcessResponse.RSPCODE.toString() === '0'
                      ) && (
                        <Button
                          size="block"
                          btnType="primary"
                          height="42px"
                          mt="0"
                          fontFamily="Light"
                          fontSize="1.125rem"
                          ls="1px"
                          onClick={onProcess(
                            processEmi,
                            cardNumber,
                            sessionId,
                            otp,
                            easyEmiVerifyResponse.ORDERNO,
                            easyEmiConfigJson.emi_code,
                            easyEmiConfigJson.tenure,
                            gateway,
                            easyEmiConfig.processingFees
                          )}
                          hide={
                            otp !== '' &&
                            !(
                              easyEmiProcessResponse !== undefined &&
                              easyEmiProcessResponse !== null &&
                              easyEmiProcessResponse.RSPCODE.toString() === '0'
                            )
                          }
                          borderRadius="0"
                          disabled={
                            otp === '' ||
                            easyEmiProcessing ||
                            (easyEmiProcessResponse !== undefined &&
                              easyEmiProcessResponse !== null &&
                              easyEmiProcessResponse.RSPCODE.toString() === '0')
                          }
                        >
                          {easyEmiProcessing !== undefined && easyEmiProcessing ? 'Please wait...' : 'SUBMIT'}
                        </Button>
                      )}
                  </Div>
                </Div>
                {/* otp form error */}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed && (
                    <Div col="12" mb="0" p="0">
                      <Text mt="0" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        {easyEmiProcessResponse.status === 'success' ? (
                          <Fragment>
                            OTP verification successfull. <br />
                            Please click on PLACE ORDER to place your order
                          </Fragment>
                        ) : (
                          easyEmiProcessResponse.ERRDESC
                        )}
                      </Text>
                    </Div>
                  )}
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  easyEmiConfig &&
                  Object.keys(easyEmiConfig).length > 0 && (
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
                {easyEmiProcessResponse !== undefined &&
                  easyEmiProcessResponse !== null &&
                  easyEmiProcessResponse.RSPCODE.toString() === '0' &&
                  easyEmiProcessed &&
                  easyEmiConfig && (
                    <Div col="12" mb="0" p="0">
                      <Text mt="1rem" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
                        {/* eslint-disable */}
                        {`* Processing Fees of Rs. ${
                          easyEmiConfig.processingFees
                        } will be added in First EMI Installment.`}
                        {/* eslint-disable */}
                      </Text>
                    </Div>
                  )}
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
  ...ownProps
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCardType: setCardType,
      verify: verifyEasyEmi,
      processEmi: processEasyEmi
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
  easyEmiConfig: {}
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
  processEmi: PropTypes.func.isRequired,
  easyEmiProcessing: PropTypes.bool,
  easyEmiProcessed: PropTypes.bool,
  easyEmiProcessError: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
  ]),
  easyEmiProcessResponse: PropTypes.objectOf(PropTypes.any),
  easyEmiConfig: PropTypes.objectOf(PropTypes.any),
  cartSummary: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);
