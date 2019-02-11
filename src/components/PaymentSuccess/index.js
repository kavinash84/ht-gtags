import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { formatAmount } from 'utils/formatters';
import TitleBar from '../TitleBar';
import Oops from './Oops';

const styles = require('./PaymentSuccess.scss');
const PaymentSuccessIcon = require('../../../static/success.svg');

/* eslint-disable camelcase */
const PaymentSuccess = ({
  data: {
    order_no,
    order_date,
    shipping_address,
    cart_products,
    sub_total_amount,
    shipping_charges,
    discount_coupon_value,
    net_order_amount,
    set_discount
  },
  loaded,
  error
}) => {
  if (loaded && !error && shipping_address) {
    const {
      first_name, last_name, address1, city, postcode, state
    } = shipping_address;
    return (
      <Div type="block">
        <TitleBar title="Payment Success" />
        <Container type="container" pr="0" pl="0">
          <Section bg="sectionBgDark" display="block" mt="3rem" p="1.5rem" pt="1.5rem" pb="1.5rem" mb="0" height="auto">
            <Row display="block" mr="0" ml="0" m-xs-l="0">
              <Div col="12">
                <Img width="4.5rem" mr="1rem" float="left" src={PaymentSuccessIcon} alt="Test" />
                <Heading mt="0.625rem" mb="0.3125rem">
                  Thank you for placing your order.
                </Heading>
                <Text fontSize="1rem" mb="0" mt="0">
                  Your order number is <b>{order_no}</b> placed on &nbsp;
                  <b>{order_date}</b>. You will shortly receive an e-mail and SMS confirming your order.
                </Text>
              </Div>
            </Row>
          </Section>
        </Container>
        <Section display="flex" pt="3rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              <Div col="3" pr="1.5rem" pt="0">
                <ShippedTo
                  name={`${first_name || ''} ${last_name || ''}`}
                  address={address1}
                  city={city}
                  pincode={postcode}
                  state={state}
                  edit={false}
                />
              </Div>
              <Div col="9" pt="0">
                <Row display="block" mr="0" ml="0" mb="1rem">
                  <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
                    Order Information
                  </Heading>
                </Row>
                <Row type="block" m="0" mb="1.5rem" mt="0">
                  <Div col="12">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th colSpan="2">Product</th>
                          <th>Delivery</th>
                          <th width="100px">Quantity</th>
                          <th align="right">Cost</th>
                        </tr>
                        {cart_products.map((product, index) => (
                          <tr key={String(index)}>
                            <td>
                              <ImageShimmer src={product.image_url} height="60px">
                                {imageURL => <img className="thumb" src={imageURL} alt={product.name} />}
                              </ImageShimmer>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.delivery_text}</td>
                            <td>{product.qty}</td>
                            <td align="right">Rs. {formatAmount(product.total_price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Div>
                </Row>
                <Row type="block" m="0" mb="1.5rem" mt="0">
                  <Div col="8" />
                  <Div col="4" ta="right">
                    <Div className={styles.totalAmountRow}>
                      Sub-Total Amount : Rs. <b>{formatAmount(sub_total_amount)}</b>
                    </Div>
                    <Div className={styles.totalAmountRow}>
                      Shipping Charges : Rs. <b>{formatAmount(shipping_charges)}</b>
                    </Div>
                    <Div className={styles.totalAmountRow}>
                      Discount / Coupon Value : Rs. <b>{formatAmount(discount_coupon_value)}</b>
                    </Div>
                    {set_discount ? (
                      <Div className={styles.totalAmountRow}>
                        Set Discount : Rs. <b>{formatAmount(Math.abs(set_discount))}</b>
                      </Div>
                    ) : (
                      ''
                    )}
                    <Div className={styles.totalAmountRow}>
                      Net Order Amount : Rs. <b>{formatAmount(net_order_amount)}</b>
                    </Div>
                  </Div>
                </Row>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
  return <Oops />;
};

PaymentSuccess.defaultProps = {
  data: {
    order_date: '',
    shipping_address: {
      first_name: '',
      last_name: '',
      address1: '',
      city: '',
      postcode: '',
      state: ''
    },
    sub_total_amount: 0,
    shipping_charges: 0,
    discount_coupon_value: 0,
    net_order_amount: 0,
    cart_products: []
  },
  loaded: false,
  error: ''
};

PaymentSuccess.propTypes = {
  data: PropTypes.shape({
    order_no: PropTypes.string.isRequired,
    order_date: PropTypes.string,
    shipping_address: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string
    }),
    cart_products: PropTypes.array,
    sub_total_amount: PropTypes.number,
    shipping_charges: PropTypes.number,
    discount_coupon_value: PropTypes.number,
    net_order_amount: PropTypes.number
  }),
  loaded: PropTypes.bool,
  error: PropTypes.string
};

export default PaymentSuccess;
