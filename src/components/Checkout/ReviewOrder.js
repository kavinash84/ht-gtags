import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import PaymentMethod from 'hometown-components/lib/PaymentMethod';
import ProductQuantityCounter from '../ProductQuantityCounter';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';

export default class ReviewOrder extends Component {
  render() {
    return (
      <Div type="block">
        <MenuCheckout page="review" />
        <Section display="flex" pt="1.25rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="2.5rem" pt="1.5rem">
                <Row display="block" mr="0" ml="0" mb="1rem">
                  <Div col="5" pr="2rem">
                    <ShippedTo
                      name="Saurabh Suman"
                      address="A-503, Mayfair Hillcrest, Near Pop Tates, Vikhroli"
                      city="Mumbai"
                      pincode="400076"
                      state="Maharashtra"
                    />
                  </Div>
                  <Div col="4">
                    <PaymentMethod />
                  </Div>
                </Row>
                <Row type="block" m="0">
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
                        <tr>
                          <td>
                            <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                          </td>
                          <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                          <td>Delivered by 12 Jan</td>
                          <td>
                            <ProductQuantityCounter skuId="1234" />
                          </td>
                          <td>Rs 49,900</td>
                          <td>
                            <Button fontSize="1rem" fontFamily="SFPDLight" color="#ae8873" btnType="link">
                              x
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                          </td>
                          <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                          <td>Delivered by 12 Jan</td>
                          <td>
                            <ProductQuantityCounter skuId="1234" />
                          </td>
                          <td>Rs 49,900</td>
                          <td>
                            <Button fontSize="1rem" fontFamily="SFPDLight" color="#ae8873" btnType="link">
                              x
                            </Button>
                          </td>
                        </tr>
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
  }
}