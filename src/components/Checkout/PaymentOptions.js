import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * modules / selectors / helpers
 */
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

/**
 * Page Components
 */
import OrderSummary from './OrderSummary';
import CommonPayments from './CommonPayments';
import { validatePaymentDetails, validateVPA } from '../../utils/validation';
import BankCard from './BankCard';
import CardForm from './CardForm';
import CardFormEasyEmi from './CardFormEasyEmi';
import Emi from './Emi';
import PaymentMethods from '../PaymentMethods/';
import PaymentForm from './PaymentForm';
import UpiForm from './UpiForm';

/**
 * Icon
 */
const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');

const cartStyles = require('../Cart/Cart.scss');

// const nextStep = history => e => {
//   e.preventDefault();
//   history.push('/checkout/review-order');
// };

const nextStep = (dispatcher, sessionId, paymentData, cardType) => e => {
  e.preventDefault();
  dispatcher(sessionId, paymentData, cardType);
};

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};
const validateInput = details => {
  if (details.Upi) {
    const {
      Upi: { upi_vpa: vpa }
    } = details;
    return !validateVPA(vpa);
  }
  return false;
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
      // history,
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
      <Container my={60} px={0}>
        <Row>
          <Col variant="col-8">
            {/* Product not deliverable */}
            <Row mr="0" ml="0">
              <Box>
                {results.map((item, index) => (
                  <Box key={String(index)}>
                    {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                      <Row className={cartStyles.cartItem} type="block" m="0" mb="0" mt="0" key={item.id_customer_cart}>
                        <Box className="td" col="2" pr="0.625rem">
                          <ImageShimmer src={item.product_info.image} height="131px">
                            {imageURL => <Image src={imageURL} alt="" />}
                          </ImageShimmer>
                        </Box>
                        <Box className="td" col="6" pr="2rem" pl="0.3125rem">
                          <Box mb="10px">
                            <Label color="text" mt="0">
                              {item.product_info.name}
                            </Label>
                          </Box>
                          <Box>
                            <Image
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
                              color={item.product_info.delivery_time_text.indexOf('Sorry') === -1 ? 'green' : 'red'}
                              fontSize="0.875rem"
                              mt="0"
                            >
                              {item.product_info.delivery_time_text}
                            </Text>
                          </Box>
                          {item.product_info.assembly_service && (
                            <Box color="uspTitle" fontSize="0.75rem">
                              <Image
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
                                <Box className={cartStyles.popover}>
                                  <Text fontSize="0.875rem" mt="0" mb="0" ta="center">
                                    Assembly will be done within 48hrs of Delivery & applicable within serviceable
                                    limits
                                  </Text>
                                </Box>
                              </Text>
                            </Box>
                          )}
                        </Box>
                        <Box className="td" col="3" pr="0.625rem">
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
                        </Box>
                        <Box className={cartStyles.loadingCart}>
                          <Heading>
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
                          </Heading>
                        </Box>
                      </Row>
                    )}
                  </Box>
                ))}
              </Box>
            </Row>
            <Row mr="0" ml="0" mb={20}>
              <Box>
                <Heading variant="heading.medium">Payment Method</Heading>
              </Box>
            </Row>
            <Row sx={{ display: 'flex' }}>
              <Row mx={0} mb={20} justifyContent="space-between" flexDirection="column" maxHeight="360px">
                {data.map((paymentType, index) => (
                  <Col key={String(`${paymentType}${index}`)} px={0}>
                    {CommonPayments(paymentType.paymentType, toggleGateway, selectedGateway, session, resetEasyEmi)}
                  </Col>
                ))}
              </Row>
              {/* Payment options form */}
              <Box px={40} pt={30} ml={-1} pb={20} sx={{ border: 'secondary', maxWidth: '588px' }}>
                {/* UPI Form */}
                {selectedGateway === 'Upi' && (
                  <UpiForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} padding="3rem 2rem" />
                )}
                {selectedGateway === 'CreditCard' && (
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {selectedGateway === 'DebitCard' && (
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {selectedGateway === 'NetBanking' && (
                  <Fragment>
                    <Box pb={20}>
                      <Label>Choose From Preferred Bank</Label>
                    </Box>
                    <Row>
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
                    </Row>
                    <Box
                      as="select"
                      variant="input"
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
                    </Box>
                  </Fragment>
                )}
                {selectedGateway === 'Emi' && (
                  <Emi
                    selectedGateway={selectedGateway}
                    setPaymentDetails={setPaymentDetails}
                    currentSelection={paymentDetails.Emi.emiBank}
                  />
                )}
                {selectedGateway === 'EasyEmi' && (
                  <CardFormEasyEmi
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {WalletData && selectedGateway === 'Wallet' && (
                  <Fragment>
                    <Box pb={20}>
                      <Label htmlFor="bankOptions1">Select From your preferred Wallet</Label>
                    </Box>
                    <Row>
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
                    </Row>
                  </Fragment>
                )}
              </Box>
            </Row>
          </Col>

          {/* Order Summary */}
          <Col variant="col-4">
            <Box bg="sidebar" px={40} py={30}>
              <OrderSummary
                results={results}
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
              <Box width={1} pb={30}>
                <Button
                  height={48}
                  fontSize={18}
                  width={1}
                  onClick={nextStep(submitDetails, session, paymentDetails, cardType)}
                  disabled={
                    validateInput(paymentDetails) ||
                    validatePaymentDetails(paymentDetails) ||
                    undelivered.length > 0 ||
                    outOfStockList.length > 0 ||
                    submitting ||
                    (submitted && error === null)
                  }
                >
                  {submitting ? 'Please wait...' : 'Place Order'}
                </Button>
              </Box>
              <PaymentMethods />
            </Box>
          </Col>
        </Row>
        {paymentFormData && <PaymentForm />}
      </Container>
    );
  }
}

PaymentOptions.defaultProps = {
  selectedGateway: 'creditcard',
  data: [],
  summary: null,
  submitting: false,
  session: '',
  // history: {},
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
  // history: PropTypes.object,
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
