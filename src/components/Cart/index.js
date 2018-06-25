import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
// import ProductQuantityCounter from '../ProductQuantityCounter';
import OrderSummary from '../Checkout/OrderSummary';

const Cart = ({ results }) => (
  <Div type="block">
    <Section display="flex" pt="1.25rem" pb="2.5rem" mb="0" height="auto">
      <Container type="container" pr="2rem" pl="2rem">
        <Row display="block" mr="0" ml="0">
          <Div col="9" pr="2.5rem" pt="1.5rem">
            <Row type="block" m="0" mb="1.5rem" mt="1.5rem">
              <Div col="12">
                <table className="ordersTable">
                  <tbody>
                    <tr>
                      <th colSpan="2">Product</th>
                      <th>Delivery</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                      <th />
                    </tr>
                    {results.map(item => (
                      <tr key={item.id_customer_cart}>
                        <td>
                          <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                        </td>
                        <td>{item.product_info.data.name}</td>
                        <td>{item.product_info.data.delivery_details[0].value}</td>
                        <td>{item.qty}</td>
                        <td>{item.product_info.netprice}</td>
                        <td>
                          <Button fontSize="1rem" fontWeight="300" color="#ae8873" btnType="link">
                            x
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Div>
            </Row>
          </Div>
          <OrderSummary />
        </Row>
      </Container>
    </Section>
  </Div>
);

Cart.propTypes = {
  results: PropTypes.array
};

Cart.defaultProps = {
  results: []
};

export default Cart;
