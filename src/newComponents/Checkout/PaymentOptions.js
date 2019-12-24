import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';

import Footer from 'newComponents/Footer';

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
      <BoxHtV1>
        <MenuCheckout history={history} page="payment" />
        <SectionHtV1 display="flex" pt="1.25rem" pb="3.5rem" mb="0" height="auto">
          <ContainerHtV1 type="container" pr="2rem" pl="2rem">
            <RowHtV1 display="block" mr="0" ml="0">
              <BoxHtV1 col="9" pr="1rem" width="714px">
                <SectionHtV1 display="flex" p="0" pt="0" margin="0" height="auto">
                  <ContainerHtV1 type="container" pr="0" pl="0">
                    <RowHtV1 display="block" mr="0" ml="0">
                      <BoxHtV1 col="12" pr="0" pt="0">
                        {results.map((item, index) => (
                          <BoxHtV1 key={String(index)}>
                            {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                              <RowHtV1
                                className={cartStyles.cartItem}
                                type="block"
                                m="0"
                                mb="0"
                                mt="0"
                                key={item.id_customer_cart}
                              >
                                <BoxHtV1 className="td" col="2" pr="0.625rem">
                                  <ImageShimmerHtV1 src={item.product_info.image} height="131px">
                                    {imageURL => <ImageHtV1 src={imageURL} alt="" />}
                                  </ImageShimmerHtV1>
                                </BoxHtV1>
                                <BoxHtV1 className="td" col="6" pr="2rem" pl="0.3125rem">
                                  <BoxHtV1 mb="10px">
                                    <LabelHtV1 color="text" mt="0">
                                      {item.product_info.name}
                                    </LabelHtV1>
                                  </BoxHtV1>
                                  <BoxHtV1>
                                    <ImageHtV1
                                      width="initial"
                                      height="20px"
                                      mr="0.625rem"
                                      mt="3px"
                                      float="left"
                                      src={calendarImage}
                                    />
                                    <TextHtV1 color="#575757" fontSize="0.75rem" mt="0" mb="0">
                                      Delivery Details
                                    </TextHtV1>
                                    <TextHtV1
                                      color={
                                        item.product_info.delivery_time_text.indexOf('Sorry') === -1 ? 'green' : 'red'
                                      }
                                      fontSize="0.875rem"
                                      mt="0"
                                    >
                                      {item.product_info.delivery_time_text}
                                    </TextHtV1>
                                  </BoxHtV1>
                                  {item.product_info.assembly_service && (
                                    <BoxHtV1 color="uspTitle" fontSize="0.75rem">
                                      <ImageHtV1
                                        width="initial"
                                        height="20px"
                                        mr="0.625rem"
                                        mt="4px"
                                        mb="50px"
                                        float="left"
                                        src={assemblyIcon}
                                      />
                                      <TextHtV1 color="#575757" fontSize="0.75rem" mt="0" mb="0">
                                        Assembly
                                      </TextHtV1>
                                      <TextHtV1 fontSize="0.875rem" mt="0" mb="0">
                                        Offered By Hometown
                                      </TextHtV1>
                                      <TextHtV1 fontSize="0.875rem" mt="0">
                                        <ButtonHtV1
                                          className={cartStyles.popoverBtn}
                                          fontSize="0.875rem"
                                          color="#3cc0dc"
                                          btnType="link"
                                          p="0"
                                        >
                                          Details
                                        </ButtonHtV1>
                                        <BoxHtV1 className={cartStyles.popover}>
                                          <TextHtV1 fontSize="0.875rem" mt="0" mb="0" ta="center">
                                            Assembly will be done within 48hrs of Delivery & applicable within
                                            serviceable limits
                                          </TextHtV1>
                                        </BoxHtV1>
                                      </TextHtV1>
                                    </BoxHtV1>
                                  )}
                                </BoxHtV1>
                                <BoxHtV1 className="td" col="3" pr="0.625rem">
                                  Quantity: {item.qty}
                                  <br />
                                  {item.product_info.unit_price !== item.product_info.special_price &&
                                    item.product_info.special_price !== 0 && (
                                      <LabelHtV1 color="black" fontSize="0.875rem" mt="0.625rem">
                                        <s>Rs. {formatAmount(item.product_info.unit_price)}</s>
                                      </LabelHtV1>
                                    )}
                                  <br />
                                  <LabelHtV1 color="primary" fontSize="1.25rem" mt="0">
                                    Rs.{' '}
                                    {item.product_info.special_price === 0
                                      ? formatAmount(item.product_info.unit_price)
                                      : formatAmount(item.product_info.special_price)}
                                  </LabelHtV1>
                                </BoxHtV1>
                                <BoxHtV1 className={cartStyles.loadingCart}>
                                  <HeadingHtV1>
                                    {/* eslint-disable*/}
                                    {isProductOutofStock(item.configurable_sku)
                                      ? 'This product is out of stock please remove before proceed.'
                                      : "Sorry, this product isn't deliverable to selected pincode."}
                                    <br />
                                    {/* eslint-enable */}
                                    <Link to="/checkout/delivery-address">
                                      <LabelHtV1
                                        fontSize="1rem"
                                        fontFamily="light"
                                        color="primary"
                                        p="0"
                                        mt="10px"
                                        mb="0"
                                      >
                                        Edit Address
                                      </LabelHtV1>
                                    </Link>
                                    <Link to="/checkout/cart">
                                      <LabelHtV1
                                        fontSize="1rem"
                                        fontFamily="light"
                                        color="primary"
                                        p="0"
                                        mt="10px"
                                        mb="0"
                                      >
                                        / Edit Cart
                                      </LabelHtV1>
                                    </Link>
                                  </HeadingHtV1>
                                </BoxHtV1>
                              </RowHtV1>
                            )}
                          </BoxHtV1>
                        ))}
                      </BoxHtV1>
                    </RowHtV1>
                  </ContainerHtV1>
                </SectionHtV1>
                <RowHtV1 display="block" mr={0} ml={0}>
                  <BoxHtV1 col="12">
                    <HeadingHtV1 pb="10px" variant="formHeading">
                      Payment Method
                    </HeadingHtV1>
                  </BoxHtV1>
                </RowHtV1>
                <RowHtV1 display="block" mr={0} ml={0} mt={5}>
                  <BoxHtV1 col="3" display="flex">
                    {data.map((paymentType, index) => (
                      <BoxHtV1 key={String(`${paymentType}${index}`)}>
                        {CommonPayments(paymentType.paymentType, toggleGateway, selectedGateway, session, resetEasyEmi)}
                      </BoxHtV1>
                    ))}
                  </BoxHtV1>
                  <BoxHtV1 col="9" width="100%" mt={36}>
                    <BoxHtV1 className={styles.paymentFormOptions}>
                      {selectedGateway === 'CreditCard' && (
                        <BoxHtV1 col="12">
                          <CardForm
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="2rem 2.5rem 1.5rem"
                          />
                        </BoxHtV1>
                      )}
                      {selectedGateway === 'DebitCard' && (
                        <BoxHtV1 col="12">
                          <CardForm
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="2rem 2.5rem 1.5rem"
                          />
                        </BoxHtV1>
                      )}
                      {selectedGateway === 'NetBanking' && (
                        <BoxHtV1 col="12" className={styles.paymentBlock} p="2rem 2.5rem 1.5rem">
                          <BoxHtV1 col="12" mb="1rem">
                            <LabelHtV1 htmlFor="bankOptions1" color="textLight">
                              Choose From Preferred Bank
                            </LabelHtV1>
                          </BoxHtV1>
                          <RowHtV1>
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
                          </RowHtV1>
                          <BoxHtV1 col="12" mt="1rem">
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
                          </BoxHtV1>
                        </BoxHtV1>
                      )}
                      {selectedGateway === 'Emi' && (
                        <Emi
                          selectedGateway={selectedGateway}
                          setPaymentDetails={setPaymentDetails}
                          currentSelection={paymentDetails.Emi.emiBank}
                        />
                      )}
                      {selectedGateway === 'EasyEmi' && (
                        <BoxHtV1 col="12">
                          <CardFormEasyEmi
                            setPaymentDetails={setPaymentDetails}
                            gateway={selectedGateway}
                            padding="2rem 2.5rem 1.5rem"
                          />
                        </BoxHtV1>
                      )}
                      {WalletData && selectedGateway === 'Wallet' && (
                        <BoxHtV1 col="12" className={styles.paymentBlock} p="2rem 2.5rem 1.5rem">
                          <BoxHtV1 col="12" mb="1rem">
                            <LabelHtV1 htmlFor="bankOptions1" color="textLight">
                              Select From your preferred Wallet
                            </LabelHtV1>
                          </BoxHtV1>
                          <RowHtV1>
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
                          </RowHtV1>
                        </BoxHtV1>
                      )}
                    </BoxHtV1>
                  </BoxHtV1>
                </RowHtV1>
              </BoxHtV1>
              <BoxHtV1 col="3" width="390px" bg="#f5f5f5">
                <BoxHtV1 variant="col-12" textAlign="center" px="0" mt={20}>
                  <HeadingHtV1
                    color="#1b2125"
                    mt="0"
                    mb="0"
                    fontWeight="700"
                    fontSize="23px"
                    fontFamily="HelveticaNeue"
                  >
                    Order Summary
                  </HeadingHtV1>
                </BoxHtV1>
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
                <RowHtV1 display="block" mr="0" ml="0">
                  <BoxHtV1 col="12">
                    <ButtonHtV1
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
                    </ButtonHtV1>
                  </BoxHtV1>
                </RowHtV1>
                <PaymentMethods />
              </BoxHtV1>
            </RowHtV1>
          </ContainerHtV1>
        </SectionHtV1>
        <Footer />
        {paymentFormData && <PaymentForm />}
      </BoxHtV1>
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
