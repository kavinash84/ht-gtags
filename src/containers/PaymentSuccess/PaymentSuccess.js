import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
// import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
// import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import ThankYou from 'newComponents/ThankYou';

/**
 * Modules / Utils / Reducers /
 */
import { formatAmount } from 'utils/formatters';
import { formatProductURL, allowNChar } from 'utils/helper';
import { paymentLoaded as setPaymentLoadStatus, setEmiPaymentType } from 'redux/modules/app';
import { validatePassword } from 'utils/validation';

import { isBlank } from 'js-utility-functions';
import { setUserPassword } from 'redux/modules/setpassword';

import PixelAnalytics from './PixelAnalytics';

const mapStateToProps = ({
  setpassword,
  paymentstatus: { data, loaded, error },
  userLogin: { isLoggedIn },
  app: { paymentLoaded, customerId }
}) => ({
  response: setpassword,
  data,
  loaded,
  error,
  isLoggedIn,
  paymentLoaded,
  customerId
});

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      password: '',
      passwordError: false,
      passwordErrorMessage: '',
      confirmPassword: '',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
      showSetPassword: true
    };
  }
  componentDidMount = () => {
    const {
 history, data, error, paymentLoaded
} = this.props;
    if (data === 'An internal server error occurred' || paymentLoaded) {
      return history.push('/');
    }

    if (data && error === '') {
      const { dispatch } = this.context.store;
      this.groupSimilarProducts();
      dispatch({
        type: 'PUSH_TO_DATALAYER'
      });
      dispatch(setPaymentLoadStatus(true));
      dispatch(setEmiPaymentType(''));
    }
  };

  componentDidUpdate = prevProps => {
    const { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn && !isLoggedIn) {
      // console.log('redirect check');
      // return history.push('/');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showSetPassword: false
      });
      window.location = '/';
    }
  };

  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value);
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      password: value,
      passwordError: checkError.error,
      passwordErrorMessage: checkError ? checkError.errorMessage : ''
    });
  };

  onChangeConfirmPassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = value !== this.state.password;
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      confirmPassword: value,
      confirmPasswordError: checkError,
      confirmPasswordErrorMessage: checkError ? "Confirm Password doesn't match" : ''
    });
  };

  onSubmitSetPassword = e => {
    // console.log('check set password');
    e.preventDefault();
    const {
      confirmPassword,
      password,
      passwordError,
      confirmPasswordError,
      passwordErrorMessage,
      confirmPasswordErrorMessage
    } = this.state;
    const { customerId } = this.props;
    // console.log('customerId check', customerId);
    // const checkOldPwd = isBlank(oldPwd) || oldPwdError;
    const checkPassword = isBlank(password) || passwordError;
    const checkConfirmPassword = isBlank(confirmPassword) || confirmPasswordError;
    // console.log(
    //   'parameter check',
    //   password,
    //   checkPassword,
    //   passwordError,
    //   confirmPassword,
    //   confirmPasswordError,
    //   checkConfirmPassword,
    //   checkPassword
    // );
    if (password !== confirmPassword) {
      // console.log('password is not same');
      return this.setState({
        confirmPasswordError: true,
        confirmPasswordErrorMessage: "Confirm Password doesn't match"
      });
    }

    if (checkConfirmPassword || checkPassword) {
      // console.log('password is same');
      return this.setState({
        // oldPwdError: checkOldPwd,
        // oldPwdErrorMessage: checkOldPwd ? "Old Password can't be blank" : '',
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? 'Password should be minimum 6 and maximum 15 characters' : '',
        confirmPasswordError: checkConfirmPassword,
        confirmPasswordErrorMessage: checkConfirmPassword ? "Confirm Password doesn't match" : ''
      });
    }
    const { dispatch } = this.context.store;
    // console.log('before dispatch');
    dispatch(setUserPassword({
        password,
        passwordError,
        passwordErrorMessage,
        confirmPassword,
        confirmPasswordError,
        confirmPasswordErrorMessage,
        customerId
      }));
    // console.log('after dispatch');
    // console.log('before set state');
    this.setState({
      password: '',
      // oldPwd: '',
      confirmPassword: ''
    });
    // console.log('after set state');
  };

  groupSimilarProducts = () => {
    const {
      data: { cart_products: cartProducts }
    } = this.props;
    let products = [];
    cartProducts.forEach(arr => {
      if (products[arr.sku] && products[arr.sku].sku === arr.sku) {
        products[arr.sku].qty += 1;
      } else {
        products[arr.sku] = {
          sku: arr.sku,
          confSku: arr.details.groupedattributes.sku,
          name: arr.name,
          image: arr.details.image,
          deliveryTime: arr.delivery_text,
          qty: arr.qty,
          price: arr.price,
          color: arr.color
        };
      }
    });
    products = Object.values(products);
    this.setState({ products });
  };

  render() {
    const {
      data,
      data: {
        order_no: orderNo,
        sub_total_amount: subTotal,
        discount_coupon_value: discount,
        net_order_amount: totalAmount,
        shipping_charges: shippingCharges,
        set_discount: setDiscount
      },
      response,
      isLoggedIn
    } = this.props;
    const {
 loading, loaded, error, errorMessage, passwordUpdated
} = response;
    const {
      password,
      passwordFeedBackError,
      passwordFeedBackMessage,
      confirmPassword,
      confirmPasswordFeedBackError,
      confirmPasswordFeedBackMessage,
      showSetPassword
    } = this.state;
    if (data && orderNo) {
      const { products } = this.state;
      return (
        <Wrapper>
          <Body>
            {/* Header */}
            <Header />

            {/* Container */}
            {data ? (
              <Container pt={60}>
                <Box variant="col-10" mx="auto">
                  <Box
                    sx={{
                      boxShadow: '4px 4px 4px 1px rgba(0, 0, 0, 0.14)',
                      borderRadius: 10,
                      overflow: 'auto',
                      border: 'light'
                    }}
                  >
                    <ThankYou orderNo={orderNo} />
                    {showSetPassword && !isLoggedIn && (
                      <Box sx={{ bg: 'rgb(159 155 146 / 0.25)' }} py={44}>
                        <Box width={2 / 5} mx="auto" sx={{ position: 'relative' }}>
                          <Box
                            sx={{
                              position: 'absolute',
                              left: 'calc(50% - 20px)',
                              top: -44,
                              width: 0,
                              height: 0,
                              borderLeft: '20px solid transparent',
                              borderRight: '20px solid transparent',
                              borderTop: '20px solid #FFF'
                            }}
                          />
                          <Text mb={16} color="label" width={1} fontSize={16} fontFamily="medium">
                            Set password & save your details for future
                          </Text>
                          <form onSubmit={this.onSubmitSetPassword}>
                            <FormInputHtV1
                              // label="Type Password"
                              type="password"
                              placeholder="Type Password"
                              onChange={this.onChangePassword}
                              value={password}
                              feedBackError={passwordFeedBackError}
                              feedBackMessage={passwordFeedBackMessage}
                              variant="inputTransparent"
                              boxProps={{
                                mb: 0
                              }}
                            />
                            <FormInputHtV1
                              // label="Confirm Password"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={this.onChangeConfirmPassword}
                              value={confirmPassword}
                              feedBackError={confirmPasswordFeedBackError}
                              feedBackMessage={confirmPasswordFeedBackMessage}
                              variant="inputTransparent"
                              boxProps={{
                                mb: 0
                              }}
                            />
                            <ButtonHtV1
                              width={1}
                              mt={10}
                              height={44}
                              // disabled={loading || passwordFeedBackError || confirmPasswordFeedBackError}
                            >
                              {response && !loading ? 'SET PASSWORD' : 'Please wait...'}
                            </ButtonHtV1>
                            {response && loaded && passwordUpdated && (
                              <Label
                                type="success"
                                ta="center"
                                fontSize="0.875rem"
                                mt="1rem"
                                display="block"
                                color="#28a745"
                                marginBottom="0"
                                fontfamily="regular"
                              >
                                {' '}
                                Password Updated !{' '}
                              </Label>
                            )}
                            {error && !loaded && (
                              <Box>
                                <Label
                                  type="error"
                                  ta="center"
                                  fontSize="0.875rem"
                                  mt="1rem"
                                  display="block"
                                  color="#dc3545"
                                  marginBottom="0"
                                  fontfamily="regular"
                                >
                                  {errorMessage.new_password && 'Invalid new password !'}
                                  {errorMessage.current_password && 'Invalid Current Password !'}
                                  {errorMessage.repeat_password && 'Confirm password not match !'}
                                  {errorMessage.error_message && 'Something went wrong !'}
                                </Label>
                              </Box>
                            )}
                          </form>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Row mx={0} mb={40} mt={60} justifyContent="center">
                    <Text fontFamily="medium" fontSize={28}>
                      Here’s what you ordered
                    </Text>
                  </Row>

                  <Row sx={{ borderBottom: 'heading' }} mx={0} pb={5}>
                    <Box variant="col-6" pl={0}>
                      <Text fontSize={16}>Product Details</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Est. Delivery</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Qty.</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Price</Text>
                    </Box>
                  </Row>
                  {products.map(product => (
                    <Row py={20} mx={0} alignItems="center" sx={{ position: 'relative', borderBottom: 'light' }}>
                      <Box variant="col-2" pl={0}>
                        <Link to={formatProductURL(product.name, product.confSku)}>
                          <Image
                            width={1}
                            src={`${product.image}-top_sel_160.jpg`}
                            alt=""
                            sx={{ boxShadow: 'productThumb' }}
                          />
                        </Link>
                      </Box>
                      <Box variant="col-4" pl={15}>
                        {/* <Link to="/"> */}
                        <Box mb="10px">
                          <Link to={formatProductURL(product.name, product.confSku)}>
                            <Heading color="heading" fontSize={16} lineHeight={1.4}>
                              {product.name}
                            </Heading>
                          </Link>
                        </Box>
                        <Box mb="15px">
                          <Text color="#575757">{product.color}</Text>
                        </Box>
                        {/* </Link> */}
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          {product.deliveryTime.split('Delivered by ')[1]}
                        </Label>
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          {product.qty}
                        </Label>
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          ₹ {formatAmount(product.price)}
                        </Label>
                      </Box>
                    </Row>
                  ))}
                  <Row>
                    <Box variant="col-2" />
                    <Box variant="col-9" pt={20} pb={20}>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Subtotal : </Text>
                        <Text>Rs {formatAmount(subTotal)}</Text>
                      </Flex>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Shipping charges : </Text>
                        <Text>Rs {formatAmount(shippingCharges)}</Text>
                      </Flex>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Discount : </Text>
                        <Text>Rs {formatAmount(discount)}</Text>
                      </Flex>
                      {setDiscount ? (
                        <Flex mb={20} justifyContent="space-between">
                          <Text>Combo Discount : </Text>
                          <Text>Rs {formatAmount(Math.abs(setDiscount))}</Text>
                        </Flex>
                      ) : null}
                      <Row m="0" py="1em" sx={{ borderTop: 'divider' }}>
                        <Box variant="col-6" p="0">
                          <Text color="menuItem" fontSize={18} fontFamily="medium">
                            Total Price :
                          </Text>
                        </Box>
                        <Box variant="col-6" p="0" textAlign="right">
                          <Text color="menuItem" fontSize={18} fontFamily="medium">
                            Rs {formatAmount(totalAmount)}
                          </Text>
                        </Box>
                      </Row>
                    </Box>
                  </Row>
                </Box>
                <PixelAnalytics transactionId={orderNo} amount={totalAmount} />
              </Container>
            ) : null}
            {/* Footer */}
            <Footer />
          </Body>
        </Wrapper>
      );
    }
    return null;
  }
}
PaymentSuccess.defaultProps = {
  data: '',
  error: '',
  paymentLoaded: false,
  response: {},
  customerId: '',
  isLoggedIn: false
};

PaymentSuccess.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
  history: PropTypes.object.isRequired,
  paymentLoaded: PropTypes.bool,
  response: PropTypes.object,
  customerId: PropTypes.any,
  isLoggedIn: PropTypes.bool
};
PaymentSuccess.contextTypes = {
  store: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(PaymentSuccess);
