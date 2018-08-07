import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import Span from 'hometown-components/lib/Span';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import * as actionCreators from 'redux/modules/cart';
import TitleBar from '../TitleBar';

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const mapStateToProps = ({ pincode, cart, app }) => ({
  currentId: cart.key,
  cartChecked: cart.cartChecked,
  checkingCart: cart.checkingCart,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId
});

const PaymentSuccess = () => (
  <Div type="block">
    <TitleBar title="Payment Success" />
    <Section display="block" pt="2rem" pb="0.5rem" mb="0" height="auto">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Heading>Thank you for placing your order</Heading>
            <Text>
              Your order number is. <b>2222</b> placed on
              <Span>01-12-2017</Span>. You will shortly receive an e-mailand SMS confirming your order.
            </Text>
            <Text>When the item(s) are shipped, you will receive an e-mail and SMS with the Courier Tracking ID.</Text>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section display="flex" pt="3rem" pb="2.5rem" mb="0" height="auto">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="2" pr="2.5rem" pt="0">
            <ShippedTo name="ankit Parsana" address="Gujarat" city="Gujarat" pincode="360002" state="Gujarat" />
          </Div>
          <Div col="10" pr="2.5rem" pt="0">
            <Row display="block" mr="0" ml="0" mb="0.3125rem">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="300">
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
                    <tr>
                      <td>
                        <img
                          className="thumb"
                          src="https://www.hometown.in/media/product/90/1253/1-top_sel_160.jpg"
                          alt=""
                        />
                      </td>
                      <td>Fiesta Damask Double Bedsheet Blue</td>
                      <td>Delivered by 15 Aug 2018</td>
                      <td>1</td>
                      <td align="right">Rs. 1000</td>
                    </tr>
                    <tr align="right">
                      <td colSpan="5">
                        Sub-Total Amount: Rs. <b>2222</b>
                      </td>
                    </tr>
                    <tr align="right">
                      <td colSpan="5">
                        Shipping Charges: Rs. <b>2222</b>
                      </td>
                    </tr>
                    <tr align="right">
                      <td colSpan="5">
                        Discount / Coupon Value: Rs. <b>2222</b>
                      </td>
                    </tr>
                    <tr align="right">
                      <td colSpan="5">Net Order Amount: 25</td>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSuccess);
