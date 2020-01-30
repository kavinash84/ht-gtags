import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import { Label } from 'hometown-components/lib/Label';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

import Footer from 'components/Footer';

import { formatAmount } from 'utils/formatters';
import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError,
  resetEasyEmiState
} from 'redux/modules/paymentoptions';
import { getCartList, getNotDelivered, getStockOutProducts } from 'selectors/cart';

// import BankCard from './BankCard';
// import CardForm from './CardForm';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';
import { validatePaymentDetails } from '../../utils/validation';
import BankCard from './BankCard';
import CardForm from './CardForm';
import CardFormEasyEmi from './CardFormEasyEmi';
import Emi from './Emi';
import PaymentMethods from '../PaymentMethods/';
import PaymentForm from './PaymentForm';
import UpiForm from './UpiForm';

const styles = require('./Checkout.scss');
const cartStyles = require('../Cart/Cart.scss');

// const nextStep = history => e => {
//   e.preventDefault();
//   history.push('/checkout/review-order');
// };

const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');

const nextStep = (dispatcher, sessionId, paymentData, cardType) => e => {
  e.preventDefault();
  dispatcher(sessionId, paymentData, cardType);
};

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

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
      paymentDetails,
      results,
      outOfStockList,
      paymentFormData,
      cardType,
      submitDetails,
      undelivered,
      resetEasyEmi,
      submitted,
      error
    } = this.props;
    const [netBankingData] = data.filter(bank => bank.paymentType === 'NetBanking');
    const [WalletData] = data.filter(bank => bank.paymentType === 'Wallet');
    const isProductOutofStock = sku => outOfStockList.includes(sku);
    return (
      <Div type="block">
        <MenuCheckout history={history} page="payment" />
        <Section display="flex" pt="1.25rem" pb="3.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="1rem">
                <Section display="flex" p="0" pt="0" pb="1.5rem" mb="0" height="auto">
                  <Container type="container" pr="0" pl="0">
                    <Row display="block" mr="0" ml="0">
                      <Div col="12" pr="0" pt="0">
                        {results.map((item, index) => (
                          <div key={String(index)}>
                            {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                              <Row
                                className={cartStyles.cartItem}
                                type="block"
                                m="0"
                                mb="0"
                                mt="0"
                                key={item.id_customer_cart}
                              >
                                <Div className="td" col="2" pr="0.625rem">
                                  <ImageShimmer src={item.product_info.image} height="131px">
                                    {imageURL => <Img src={imageURL} alt="" />}
                                  </ImageShimmer>
                                </Div>
                                <Div className="td" col="6" pr="2rem" pl="0.3125rem">
                                  <Div mb="10px">
                                    <Label color="text" mt="0">
                                      {item.product_info.name}
                                    </Label>
                                  </Div>
                                  <Div>
                                    <Img
                                      width="initial"
                                      height="20px"
                                      mr="0.625rem"
                                      mt="3px"
                                      float="left"
                                      src={calendarImage}
                                    />
                                    <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                                      Delivery Details
                                    </Text>
                                    <Text
                                      color={
                                        item.product_info.delivery_time_text.indexOf('Sorry') === -1 ? 'green' : 'red'
                                      }
                                      fontSize="0.875rem"
                                      mt="0"
                                    >
                                      {item.product_info.delivery_time_text}
                                    </Text>
                                  </Div>
                                  {item.product_info.assembly_service && (
                                    <Div color="uspTitle" fontSize="0.75rem">
                                      <Img
                                        width="initial"
                                        height="20px"
                                        mr="0.625rem"
                                        mt="4px"
                                        mb="50px"
                                        float="left"
                                        src={assemblyIcon}
                                      />
                                      <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                                        Assembly
                                      </Text>
                                      <Text fontSize="0.875rem" mt="0" mb="0">
                                        Offered By Hometown
                                      </Text>
                                      <Text fontSize="0.875rem" mt="0">
                                        <Button
                                          className={cartStyles.popoverBtn}
                                          fontSize="0.875rem"
                                          color="#3cc0dc"
                                          btnType="link"
                                          p="0"
                                        >
                                          Details
                                        </Button>
                                        <div className={cartStyles.popover}>
                                          <Text fontSize="0.875rem" mt="0" mb="0" ta="center">
                                            Assembly will be done within 48hrs of Delivery & applicable within
                                            serviceable limits
                                          </Text>
                                        </div>
                                      </Text>
                                    </Div>
                                  )}
                                </Div>
                                <Div className="td" col="3" pr="0.625rem">
                                  Quantity: {item.qty}
                                  <br />
                                  {item.product_info.unit_price !== item.product_info.special_price &&
                                    item.product_info.special_price !== 0 && (
                                    <Label color="black" fontSize="0.875rem" mt="0.625rem">
                                      <s>Rs. {formatAmount(item.product_info.unit_price)}</s>
                                    </Label>
                                  )}
                                  <br />
                                  <Label color="primary" fontSize="1.25rem" mt="0">
                                    Rs.{' '}
                                    {item.product_info.special_price === 0
                                      ? formatAmount(item.product_info.unit_price)
                                      : formatAmount(item.product_info.special_price)}
                                  </Label>
                                </Div>
                                <div className={cartStyles.loadingCart}>
                                  <h4>
                                    {/* eslint-disable*/}
                                    {isProductOutofStock(item.configurable_sku)
                                      ? 'This product is out of stock please remove before proceed.'
                                      : "Sorry, this product isn't deliverable to selected pincode."}
                                    <br />
                                    {/* eslint-enable */}
                                    <Link to="/checkout/delivery-address">
                                      <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                                        Edit Address
                                      </Label>
                                    </Link>
                                    <Link to="/checkout/cart">
                                      <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                                        / Edit Cart
                                      </Label>
                                    </Link>
                                  </h4>
                                </div>
                              </Row>
                            )}
                          </div>
                        ))}
                      </Div>
                    </Row>
                  </Container>
                </Section>
                <Row display="block" mr="0" ml="0">
                  <Div col="12" bg="#969696">
                    <Heading
                      fontSize="1rem"
                      ls="1px"
                      mt="0.3125rem"
                      mb="0.3125rem"
                      color="white"
                      p="10px 20px"
                      pb="10px"
                    >
                      Select Payment Method
                    </Heading>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0" mt="5px">
                  <Div col="3">
                    {data.map((paymentType, index) => (
                      <div key={String(`${paymentType}${index}`)}>
                        {CommonPayments(paymentType.paymentType, toggleGateway, selectedGateway, session, resetEasyEmi)}
                      </div>
                    ))}
                    {CommonPayments('Upi', toggleGateway, selectedGateway, session, resetEasyEmi)}
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
                              <option value="">Select Bank</option>
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
                      {selectedGateway === 'EasyEmi' && (
                        <Div col="12">
                          <CardFormEasyEmi
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="3rem 2rem"
                          />
                        </Div>
                      )}
                      {WalletData && selectedGateway === 'Wallet' && (
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
                      {/* UPI Form */}
                      {selectedGateway === 'Upi' && (
                        <Div col="12">
                          <UpiForm
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="3rem 2rem"
                          />
                        </Div>
                      )}
                    </div>
                  </Div>
                </Row>
              </Div>
              <Div col="3">
                <OrderSummary
                  itemsTotal={summary.items}
                  setDiscount={summary.combined_set_discount}
                  savings={summary.savings}
                  shipping={summary.shipping_charges}
                  totalCart={summary.total}
                  onClick={() => null}
                  discount={summary.coupon_discount}
                  itemsCount={summary.items_count}
                  hidebutton
                  hidecoupon
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
                      // onClick={nextStep(history)}
                      onClick={nextStep(submitDetails, session, paymentDetails, cardType)}
                      disabled={
                        validatePaymentDetails(paymentDetails) ||
                        undelivered.length > 0 ||
                        outOfStockList.length > 0 ||
                        submitting ||
                        (submitted && error === null)
                      }
                    >
                      {submitting ? 'Please wait...' : 'Place Order'}
                    </Button>
                  </Div>
                </Row>
                <PaymentMethods />
              </Div>
            </Row>
          </Container>
        </Section>
        <Footer />
        {paymentFormData && <PaymentForm />}
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
  history: {},
  results: [],
  outOfStockList: [],
  paymentFormData: {},
  cardType: 'other',
  undelivered: [],
  submitted: false,
  error: null
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
  submitting: PropTypes.bool,
  results: PropTypes.array,
  outOfStockList: PropTypes.array,
  paymentFormData: PropTypes.object,
  cardType: PropTypes.string,
  undelivered: PropTypes.array,
  submitDetails: PropTypes.func.isRequired,
  resetEasyEmi: PropTypes.func.isRequired,
  submitted: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])
};

const mapStateToProps = ({
  app,
  paymentoptions,
  cart: { checkingCart, cartChecked, summary },
  app: { sessionId },
  cart
}) => ({
  selectedGateway: paymentoptions.selectedGateway,
  isFormValid: paymentoptions.isFormValid,
  paymentDetails: paymentoptions.paymentMethodDetails,
  error: paymentoptions.error,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  session: app.sessionId,
  paymentFormData: paymentoptions.formData,
  cardType: paymentoptions.cardType,
  results: getCartList(cart),
  outOfStockList: getStockOutProducts(cart),
  undelivered: getNotDelivered(cart),
  checkingCart,
  cartChecked,
  summary,
  sessionId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails,
      validateForm: checkPaymentDetails,
      submitDetails: submitPaymentDetails,
      setError: setValidationError,
      resetEasyEmi: resetEasyEmiState
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptions);
