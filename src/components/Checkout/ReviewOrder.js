import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import PaymentMethod from 'hometown-components/lib/PaymentMethod';
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
                <Row display="block" mr="0" ml="0">
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
                          <th colSpan="2">PRODUCT</th>
                          <th>Delivery Status</th>
                          <th>Carrier</th>
                          <th>Tracking ID</th>
                          <th>Tracking Link</th>
                        </tr>
                        <tr>
                          <td>
                            <img src="http://via.placeholder.com/75x75" alt="" />
                          </td>
                          <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                          <td>Dispatched at 2:35 PM, 16 Jan</td>
                          <td>Bluedart</td>
                          <td>AG567TG</td>
                          <td>
                            <Button fontSize="0.875rem" fontFamily="SFPDLight" color="#ae8873" btnType="link">
                              Track Now
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="http://via.placeholder.com/75x75" alt="" />
                          </td>
                          <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                          <td>Dispatched at 2:35 PM, 16 Jan</td>
                          <td>Bluedart</td>
                          <td>AG567TG</td>
                          <td>
                            <Button fontSize="0.875rem" fontFamily="SFPDLight" color="#ae8873" btnType="link">
                              Track Now
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img src="http://via.placeholder.com/75x75" alt="" />
                          </td>
                          <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                          <td>Dispatched at 2:35 PM, 16 Jan</td>
                          <td>Bluedart</td>
                          <td>AG567TG</td>
                          <td>
                            <Button fontSize="0.875rem" fontFamily="SFPDLight" color="#ae8873" btnType="link">
                              Track Now
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
