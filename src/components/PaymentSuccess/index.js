import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import { formatAmount } from 'utils/formatters';
import TitleBar from '../TitleBar';

const PaymentSuccessIcon = require('../../../static/success.svg');

const mapStateToProps = ({ paymentstatus: { data, loaded } }) => ({
  isLoaded: loaded,
  ...data
});

/* eslint-disable camelcase */
const PaymentSuccess = ({
  order_id,
  order_date,
  shipping_address,
  cart_products,
  sub_total_amount,
  shipping_charges,
  discount_coupon_value,
  net_order_amount,
  isLoaded
}) => {
  if (isLoaded) {
    return (
      <Div type="block">
        <TitleBar title="Payment Success" />
        <Container type="container" pr="0" pl="0">
          <Section bg="sectionBgDark" display="block" mt="3rem" p="1.5rem" pt="1.5rem" pb="1.5rem" mb="0" height="auto">
            <Row display="block" mr="0" ml="0">
              <Div col="12">
                <Img width="4.5rem" mr="1rem" float="left" src={PaymentSuccessIcon} alt="Test" />
                <Heading mt="0">Thank you for placing your order.</Heading>
                <Text fontSize="1rem" mb="0">
                  Your order number is <b>{order_id}</b> placed on &nbsp;
                  <b>{order_date}</b>. You will shortly receive an e-mailand SMS confirming your order.
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
                  name={`${shipping_address.first_name}${shipping_address.last_name}`}
                  address={shipping_address.address1}
                  city={shipping_address.city}
                  pincode={shipping_address.postcode}
                  state={shipping_address.state}
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
                    <table className="ordersTable">
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
                              <img className="thumb" src={product.image_url} alt={product.name} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.delivery_text}</td>
                            <td>{product.qty}</td>
                            <td align="right">Rs. {formatAmount(product.total_price)}</td>
                          </tr>
                        ))}
                        <tr align="right">
                          <td colSpan="5">
                            Sub-Total Amount: Rs. <b>{formatAmount(sub_total_amount)}</b>
                          </td>
                        </tr>
                        <tr align="right">
                          <td colSpan="5">
                            Shipping Charges: Rs. <b>{formatAmount(shipping_charges)}</b>
                          </td>
                        </tr>
                        <tr align="right">
                          <td colSpan="5">
                            Discount / Coupon Value: Rs. <b>{formatAmount(discount_coupon_value)}</b>
                          </td>
                        </tr>
                        <tr align="right">
                          <td colSpan="5">Net Order Amount: {formatAmount(net_order_amount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Div>
                </Row>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
  return <div>Unable to check Payment Status at the moment !</div>;
};

PaymentSuccess.defaultProps = {
  isLoaded: false,
  order_date: '',
  shipping_address: {},
  sub_total_amount: 0,
  shipping_charges: 0,
  discount_coupon_value: 0,
  net_order_amount: 0,
  cart_products: []
};

PaymentSuccess.propTypes = {
  order_id: PropTypes.string.isRequired,
  order_date: PropTypes.string,
  shipping_address: PropTypes.object,
  cart_products: PropTypes.array,
  sub_total_amount: PropTypes.number,
  shipping_charges: PropTypes.number,
  discount_coupon_value: PropTypes.number,
  net_order_amount: PropTypes.number,
  isLoaded: PropTypes.bool
};

export default connect(mapStateToProps, null)(PaymentSuccess);
