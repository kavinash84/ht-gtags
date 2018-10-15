import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import Footer from 'components/Footer';
import { Label } from 'hometown-components/lib/Label';
import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError
} from 'redux/modules/paymentoptions';
// import BankCard from './BankCard';
// import CardForm from './CardForm';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';
import { validatePaymentDetails } from '../../utils/validation';
import BankCard from './BankCard';
import CardForm from './CardForm';
import Emi from './Emi';
import PaymentMethods from '../PaymentMethods/';

const styles = require('./Checkout.scss');

const nextStep = history => e => {
  e.preventDefault();
  history.push('/checkout/review-order');
};

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const mapStateToProps = ({
  app,
  paymentoptions,
  cart: { checkingCart, cartChecked, summary },
  app: { sessionId }
}) => ({
  selectedGateway: paymentoptions.selectedGateway,
  isFormValid: paymentoptions.isFormValid,
  paymentDetails: paymentoptions.paymentMethodDetails,
  checkingCart,
  cartChecked,
  summary,
  sessionId,
  error: paymentoptions.error,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  session: app.sessionId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails,
      validateForm: checkPaymentDetails,
      submitDetails: submitPaymentDetails,
      setError: setValidationError
    },
    dispatch
  );
@withRouter
class PaymentOptions extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const {
      data,
      selectedGateway,
      toggleGateway,
      setPaymentDetails,
      summary,
      submitting,
      history,
      session,
      paymentDetails
    } = this.props;
    const [netBankingData] = data.filter(bank => bank.paymentType === 'NetBanking');
    const [WalletData] = data.filter(bank => bank.paymentType === 'Wallet');
    return (
      <Div type="block">
        <MenuCheckout history={history} page="payment" />
        <Section display="flex" pt="1.25rem" pb="3.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="1rem">
                <Row display="block" mr="0" ml="0">
                  <Div col="12" bg="#969696">
                    <Heading fontSize="1rem" ls="1px" mb="0.625rem" color="white" p="10px 20px" pb="10px">
                      Select Payment Method
                    </Heading>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0" mt="5px">
                  <Div col="3">
                    {data.map(paymentType =>
                      CommonPayments(paymentType.paymentType, toggleGateway, selectedGateway, session))}
                  </Div>
                  <Div col="9">
                    <div className={styles.paymentFormOptions}>
                      {selectedGateway === 'CreditCard' && (
                        <Div col="12">
                          <CardForm
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="3rem 2rem"
                          />
                        </Div>
                      )}
                      {selectedGateway === 'DebitCard' && (
                        <Div col="12">
                          <CardForm
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="3rem 2rem"
                          />
                        </Div>
                      )}
                      {selectedGateway === 'NetBanking' && (
                        <Div col="12" className={styles.paymentBlock} p="3rem 2rem">
                          <Div col="12" mb="1rem">
                            <Label htmlFor="bankOptions1" color="textLight">
                              Choose From Preferred Bank
                            </Label>
                          </Div>
                          <BankCard
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            name="HDFB"
                            detailkey="bankCode"
                            img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif"
                            currentSelection={paymentDetails.NetBanking.bankCode}
                          />
                          <BankCard
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            name="ICIB"
                            detailkey="bankCode"
                            img="https://static.hometown.in/media/cms/BankLOGO/icici.gif"
                            currentSelection={paymentDetails.NetBanking.bankCode}
                          />
                          <BankCard
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            name="AXIB"
                            detailkey="bankCode"
                            img="https://static.hometown.in/media/cms/BankLOGO/axis.gif"
                            currentSelection={paymentDetails.NetBanking.bankCode}
                          />
                          <BankCard
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            name="SBIB"
                            detailkey="bankCode"
                            img="https://static.hometown.in/media/cms/BankLOGO/sbi.gif"
                            currentSelection={paymentDetails.NetBanking.bankCode}
                          />
                          <Div col="12" mt="1rem">
                            <select
                              className={`${styles.dropDown} ${styles.selectBank}`}
                              name="bankCode"
                              onChange={onChangeDetails(setPaymentDetails, selectedGateway)}
                              value={paymentDetails.NetBanking.bankCode}
                            >
                              <option>Select Bank</option>
                              {netBankingData &&
                                netBankingData.netBankingBanks &&
                                Object.keys(netBankingData.netBankingBanks).map((k, i) => (
                                  <option value={k} key={k}>
                                    {Object.values(netBankingData.netBankingBanks)[i]}
                                  </option>
                                ))}
                            </select>
                          </Div>
                        </Div>
                      )}
                      {selectedGateway === 'Emi' && (
                        <Emi
                          selectedGateway={selectedGateway}
                          setPaymentDetails={setPaymentDetails}
                          currentSelection={paymentDetails.Emi.emiBank}
                        />
                      )}
                      {WalletData &&
                        selectedGateway === 'Wallet' && (
                        <Div col="12" className={styles.paymentBlock} p="3rem 2rem">
                          <Div col="12" mb="1rem">
                            <Label htmlFor="bankOptions1" color="textLight">
                                Select From your preferred Wallet
                            </Label>
                          </Div>

                          {WalletData.isPaytmWalletEnable && (
                            <BankCard
                              setPaymentDetails={setPaymentDetails}
                              gateway={selectedGateway}
                              name="Paytm"
                              detailkey="walletName"
                              currentSelection={paymentDetails.Wallet.walletName}
                              img="https://static.hometown.in/images/local_v2/onestepcheckout/logo/paytm.jpg"
                            />
                          )}
                          {WalletData.isPayuWalletEnable && (
                            <BankCard
                              setPaymentDetails={setPaymentDetails}
                              gateway={selectedGateway}
                              name="Payu"
                              detailkey="walletName"
                              currentSelection={paymentDetails.Wallet.walletName}
                              img="https://static.hometown.in/images/local_v2/onestepcheckout/logo/payu.jpg"
                            />
                          )}
                          {WalletData.isMobikwikWalletEnable && (
                            <BankCard
                              setPaymentDetails={setPaymentDetails}
                              gateway={selectedGateway}
                              name="Mobikwik"
                              detailkey="walletName"
                              currentSelection={paymentDetails.Wallet.walletName}
                              img="https://static.hometown.in/images/local_v2/onestepcheckout/logo/mobikwik.jpg"
                            />
                          )}
                        </Div>
                      )}
                    </div>
                  </Div>
                </Row>
              </Div>
              <Div col="3">
                <OrderSummary
                  itemsTotal={summary.items}
                  savings={summary.savings}
                  shipping={summary.shipping_charges}
                  totalCart={summary.total}
                  onClick={() => null}
                  discount={summary.coupon_discount}
                  itemsCount={summary.items_count}
                  hidebutton
                />
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Button
                      size="block"
                      btnType="primary"
                      fontFamily="regular"
                      height="42px"
                      fontSize="1.125rem"
                      lh="1"
                      borderRadius="0"
                      onClick={nextStep(history)}
                      disabled={validatePaymentDetails(paymentDetails) || submitting}
                    >
                      {submitting ? 'Please wait...' : 'Continue'}
                    </Button>
                  </Div>
                </Row>
                <PaymentMethods />
              </Div>
            </Row>
          </Container>
        </Section>
        <Footer />
      </Div>
    );
  }
}

PaymentOptions.defaultProps = {
  selectedGateway: 'creditcard',
  data: [],
  summary: null,
  submitting: false,
  session: '',
  history: {}
};

PaymentOptions.propTypes = {
  selectedGateway: PropTypes.string,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  summary: PropTypes.object,
  history: PropTypes.object,
  session: PropTypes.string,
  paymentDetails: PropTypes.object.isRequired,
  submitting: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptions);
