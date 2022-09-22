import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";

/**
 * modules / selectors / helpers
 */
import { formatAmount } from "utils/formatters";
import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError,
  resetEasyEmiState
} from "redux/modules/paymentoptions";
import { paymentLoaded } from "redux/modules/app";
import { togglePopUp } from "redux/modules/webtochat";
import {
  getCartList,
  getNotDelivered,
  getStockOutProducts
} from "selectors/cart";
// import { getFuturePayProfile } from "selectors/userprofile";

/**
 * Page Components
 */
import OrderSummary from "./OrderSummary";
import CommonPayments from "./CommonPayments";
import { validatePaymentDetails, validateVPA } from "../../utils/validation";
import BankCard from "./BankCard";
import CardForm from "./CardForm";
import CardFormEasyEmi from "./CardFormEasyEmi";
import Emi from "./Emi";
import EmiZero from "./EmiZero";
import PaymentMethods from "../PaymentMethods/";
import PaymentForm from "./PaymentForm";
import UpiForm from "./UpiForm";

import WalletBalance from "./WalletBalance";
import Notification from "./Notification";

// const styles = require('./Checkout.scss');
const cartStyles = require("../Cart/Cart.scss");

const nextStep = (
  dispatcher,
  paymentload,
  sessionId,
  paymentData,
  cardType,
  isCreditSelected,
  selectedGateway,
  paymentMethodDetails,
  // futurePayRedeemAmount,
  // isPayFromHtWallet,
  total
) => e => {
  e.preventDefault();
  paymentload(false);
  dispatcher(
    sessionId,
    paymentData,
    cardType,
    isCreditSelected,
    selectedGateway,
    paymentMethodDetails,
    // futurePayRedeemAmount,
    // isPayFromHtWallet,
    total
  );
};

const mapStateToProps = ({
  app,
  paymentoptions,
  cart: { checkingCart, cartChecked, summary },
  app: { sessionId },
  cart,
  profile,
  checkout
}) => ({
  // isPayFromHtWallet: paymentoptions.isPayFromHtWallet,
  // futurePayRedeemAmount: paymentoptions.futurePayRedeemAmount,
  selectedGateway: paymentoptions.selectedGateway,
  isCreditSelected: paymentoptions.isCreditSelected,
  paymentMethodDetails: paymentoptions.paymentMethodDetails,
  isFormValid: paymentoptions.isFormValid,
  paymentDetails: paymentoptions.paymentMethodDetails,
  checkingCart,
  cartChecked,
  summary,
  sessionId,
  error: paymentoptions.error,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  cardType: paymentoptions.cardType,
  paymentFormData: paymentoptions.formData,
  session: app.sessionId,
  results: getCartList(cart),
  undelivered: getNotDelivered(cart),
  outOfStockList: getStockOutProducts(cart),
  futurPayProfile: getFuturePayProfile(profile),
  futurePayError: paymentoptions.futurePayRedeemAmountError,
  warningFlag: checkout.nextstep.warningFlag
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails,
      validateForm: checkPaymentDetails,
      submitDetails: submitPaymentDetails,
      paymentLoadedStatus: paymentLoaded,
      setError: setValidationError,
      resetEasyEmi: resetEasyEmiState,
      toggleWebToChat: togglePopUp
    },
    dispatch
  );

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
  state = {
    popUpTimeoutId: null
  };

  componentDidMount() {
    const { paymentTimeout } = this.props;

    const popUpTimeoutId = setTimeout(this.webToChat, paymentTimeout);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ popUpTimeoutId });
  }
  componentWillUnmount() {
    const { toggleWebToChat } = this.props;
    const { popUpTimeoutId } = this.state;
    clearTimeout(popUpTimeoutId);
    toggleWebToChat(false);
  }
  webToChat = () => {
    const { toggleWebToChat, dismiss } = this.props;

    const {
      embedded_svc: {
        liveAgentAPI: { inviteButton: { isAvailable } = {} } = {}
      }
    } = window;
    if (isAvailable && !dismiss) toggleWebToChat(true);
  };
  render() {
    const {
      data,
      // futurePayRedeemAmount,
      // isPayFromHtWallet,
      selectedGateway,
      toggleGateway,
      setPaymentDetails,
      paymentLoadedStatus,
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
      error,
      summary: { total },
      // futurPayProfile,
      isCreditSelected,
      warningFlag
    } = this.props;

    const [netBankingData] = data.filter(
      bank => bank.paymentType === "NetBanking"
    );
    const [WalletData] = data.filter(bank => bank.paymentType === "Wallet");
    const isProductOutofStock = sku => outOfStockList.includes(sku);

    return (
      <Container my={[30, 30, 60]} px={[15, 15, 0]}>
        <Row>
          <Col variant="col-8">
            {/* Product not deliverable */}
            {results.map((item, index) => (
              <Box key={String(index)}>
                {(!item.product_info.is_deliverable ||
                  isProductOutofStock(item.configurable_sku)) && (
                    <Row
                      key={item.id_customer_cart}
                      mb={16}
                      mx={0}
                      alignItems="center"
                      sx={{ position: "relative" }}
                    >
                      <Box variant="col-2" px={0}>
                        <ImageShimmer
                          src={item.product_info.image}
                          height="100%"
                          sx={{
                            boxShadow: "0 1px 2px 0 #0000033"
                          }}
                        >
                          {imageURL => (
                            <Image
                              width={1}
                              src={imageURL}
                              alt=""
                              sx={{
                                boxShadow: "productThumb"
                              }}
                            />
                          )}
                        </ImageShimmer>
                      </Box>
                      <Box variant="col-6" pl={30} pr={0}>
                        <Box mb={10}>
                          <Heading
                            color="heading"
                            fontSize={16}
                            lineHeight={1.4}
                            fontWeight="normal"
                          >
                            {item.product_info.name}
                          </Heading>
                        </Box>
                        {item.product_info.color && (
                          <Box mb={15}>
                            <Text color="#575757">{item.product_info.color}</Text>
                          </Box>
                        )}
                        <Box>
                          <Label color="heading" fontSize={18}>
                            ₹{" "}
                            {item.product_info.special_price === 0
                              ? formatAmount(
                                Number(item.product_info.unit_price) *
                                Number(item.qty)
                              )
                              : formatAmount(
                                Number(item.product_info.special_price) *
                                Number(item.qty)
                              )}
                          </Label>
                        </Box>
                      </Box>
                      <Flex
                        width={1}
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        sx={{
                          position: "absolute",
                          height: "100%",
                          textAlign: "center",
                          background: "rgba(0, 0, 0, 0.7)",
                          padding: 0,
                          zIndex: 1,
                          left: 0,
                          top: 0,
                          boxShadow: "2px 2px 7px 0 rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <Heading color="white" fontSize={20}>
                          {isProductOutofStock(item.configurable_sku)
                            ? "This product is out of stock please remove before proceed."
                            : "Sorry, this product isn't available to selected pincode"}
                        </Heading>
                        <Flex mt={15} justifyContent="center">
                          <Link
                            to="/checkout/delivery-address"
                            sx={{ cursor: "pointer" }}
                          >
                            <Label fontSize={16} color="primary">
                              Edit Address{" "}
                            </Label>
                          </Link>
                          <Box color="primary" mx={5}>
                            /
                          </Box>
                          <Link to="/checkout/cart" sx={{ cursor: "pointer" }}>
                            <Label fontSize={16} color="primary">
                              Edit Cart
                            </Label>
                          </Link>
                        </Flex>
                      </Flex>
                    </Row>
                  )}
              </Box>
            ))}
            <Box mb={20}>
              {/* <Heading variant="heading.medium">Payment Method</Heading> */}
              <WalletBalance />
            </Box>


            {
              warningFlag === 1 ? (
                <Box>
                  <Notification message='You have an Order pending for payment, Please wait for the payment confirmation.' />
                </Box>
              ) : warningFlag === 2 ? (
                <Box>
                  <Notification message='You have already bought some of current cart products in last order.' />
                </Box>
              ) : null
            }
            <Row flexWrap="nowrap" ml={0} mr={0}>
              <Row
                mx={0}
                flexDirection="column"
                maxHeight="360px"
                minWidth={140}
                width={201}
              >
                {data.map((paymentType, index) => (
                  <Col key={String(`${paymentType}${index}`)} px={0}>
                    {CommonPayments(
                      paymentType.paymentType,
                      toggleGateway,
                      selectedGateway,
                      session,
                      resetEasyEmi,
                      // futurePayRedeemAmount,
                      total
                      // isPayFromHtWallet
                    )}
                  </Col>
                ))}
              </Row>
              {/* Payment options form */}
              <Box
                px={40}
                pt={30}
                ml={-1}
                pb={20}
                width="calc(100% - 199px)"
                sx={{ border: "secondary" }}
              >
                {/* UPI Form */}
                {selectedGateway === "Upi" && (
                  <UpiForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="3rem 2rem"
                  />
                )}
                {selectedGateway === "CreditCard" && (
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {selectedGateway === "DebitCard" && (
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {/* {selectedGateway === 'NetBanking' && (
                  <Fragment>
                    <Box pb={20}>
                      <Label>Choose From Preferred Bank</Label>
                    </Box>
                    <Row>
                      <BankCard
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
                    )} */}
                {selectedGateway === "NetBanking" && (
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
                      onChange={onChangeDetails(
                        setPaymentDetails,
                        selectedGateway
                      )}
                      value={paymentDetails.NetBanking.bankCode}
                    >
                      <option value="">Select Bank</option>
                      {netBankingData &&
                        netBankingData.netBankingBanks &&
                        Object.keys(netBankingData.netBankingBanks).map(
                          (k, i) => (
                            <option value={k} key={k}>
                              {Object.values(netBankingData.netBankingBanks)[i]}
                            </option>
                          )
                        )}
                    </Box>
                  </Fragment>
                )}
                {selectedGateway === "Emi" && paymentDetails.Emi && (
                  <Emi
                    selectedGateway={selectedGateway}
                    setPaymentDetails={setPaymentDetails}
                    currentSelection={paymentDetails.Emi.emiBank}
                  />
                )}
                {selectedGateway === "EmiZero" && paymentDetails.EmiZero && (
                  <EmiZero
                    selectedGateway={selectedGateway}
                    setPaymentDetails={setPaymentDetails}
                    currentSelection={paymentDetails.EmiZero.emiBank}
                  />
                )}
                {selectedGateway === "EasyEmi" && (
                  <CardFormEasyEmi
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    padding="2rem 2.5rem 1.5rem"
                  />
                )}
                {WalletData && selectedGateway === "Wallet" && (
                  <Fragment>
                    <Box pb={20}>
                      <Label htmlFor="bankOptions1">
                        Select From your preferred Wallet
                      </Label>
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
            {/* </Box>
            ) : null} */}
          </Col>

          {/* Order Summary */}
          <Col variant="col-4">
            <Box bg="sidebar" px={40} py={30}>
              <Row className={cartStyles.orderSummaryCon}>
                <Box>
                  <OrderSummary
                    history={history}
                    results={results}
                    itemsTotal={summary.items}
                    setDiscount={summary.combined_set_discount}
                    savings={summary.savings}
                    shipping={summary.shipping_charges}
                    totalCart={summary.total}
                    onClick={() => null}
                    discount={summary.coupon_discount}
                    itemsCount={summary.items_count}
                    giftWrapAmount={summary.gift_wrap_amount}
                    coupon={summary.coupon}
                    hidebutton
                    hidecoupon
                  />
                </Box>
                <Box className={cartStyles.orderSummaryOverly} />
              </Row>
              <Box width={1} pb={30}>
                <Button
                  type="default"
                  height={48}
                  fontSize={18}
                  width={1}
                  onClick={nextStep(
                    submitDetails,
                    paymentLoadedStatus,
                    session,
                    paymentDetails,
                    cardType,
                    isCreditSelected,
                    selectedGateway,
                    paymentDetails,
                    // futurePayRedeemAmount,
                    // isPayFromHtWallet,
                    total
                  )}
                  disabled={
                    validateInput(paymentDetails) ||
                    validatePaymentDetails(paymentDetails) ||
                    // futurePayError ||
                    undelivered.length > 0 ||
                    outOfStockList.length > 0 ||
                    submitting ||
                    (submitted && error === null)
                  }
                >
                  {submitting ? "Please wait..." : "Place Order"}
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
  dismiss: false,
  selectedGateway: "creditcard",
  data: [],
  // summary: null,
  submitting: false,
  session: "",
  history: {},
  results: [],
  outOfStockList: [],
  paymentFormData: {},
  cardType: "other",
  undelivered: [],
  submitted: false,
  error: null,
  summary: {},
  warningFlag: ''
};

PaymentOptions.propTypes = {
  toggleWebToChat: PropTypes.func.isRequired,
  dismiss: PropTypes.bool,
  paymentTimeout: PropTypes.number.isRequired,
  selectedGateway: PropTypes.string,
  paymentLoadedStatus: PropTypes.func.isRequired,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  // isPayFromHtWallet: PropTypes.number.isRequired,
  // futurePayRedeemAmount: PropTypes.number.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  // summary: PropTypes.object,
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
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  summary: PropTypes.object,
  // futurPayProfile: PropTypes.object,
  warningFlag: PropTypes.string,
};

// const mapStateToProps = ({
//   app,
//   paymentoptions,
//   cart: { checkingCart, cartChecked, summary },
//   app: { sessionId },
//   webtochat: { paymentTimeout, dismiss },
//   cart
// }) => ({
//   selectedGateway: paymentoptions.selectedGateway,
//   isFormValid: paymentoptions.isFormValid,
//   paymentDetails: paymentoptions.paymentMethodDetails,
//   error: paymentoptions.error,
//   submitting: paymentoptions.submitting,
//   submitted: paymentoptions.submitted,
//   session: app.sessionId,
//   paymentFormData: paymentoptions.formData,
//   cardType: paymentoptions.cardType,
//   results: getCartList(cart),
//   outOfStockList: getStockOutProducts(cart),
//   undelivered: getNotDelivered(cart),
//   checkingCart,
//   cartChecked,
//   summary,
//   sessionId,
//   paymentTimeout,
//   dismiss
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       toggleGateway: setSelectedGateway,
//       setPaymentDetails: setSelectedPaymentDetails,
//       validateForm: checkPaymentDetails,
//       submitDetails: submitPaymentDetails,
//       setError: setValidationError,
//       resetEasyEmi: resetEasyEmiState,
//       paymentLoadedStatus: paymentLoaded,
//       toggleWebToChat: togglePopUp
//     },
//     dispatch
//   );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptions);
