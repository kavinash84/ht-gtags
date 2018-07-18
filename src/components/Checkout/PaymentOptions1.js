import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import CardForm from './CardForm';
import BankCard from './BankCard';
import MenuCheckout from './MenuCheckout';
import OrderSummary from './OrderSummary';

const styles = require('./Checkout.scss');

export default class PaymentOptions extends Component {
  render() {
    return (
      <Div type="block">
        <MenuCheckout page="payment" />
        <Section display="flex" pt="1.25rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="2rem" pl="2rem">
            <Row display="block" mr="0" ml="0">
              <Div col="9" pr="7rem">
                <Row display="block" mr="0" ml="0">
                  <Div col="12">
                    <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
                      Choose a payment method
                    </Heading>
                    <Text fontSize="0.875em" mb="0.625rem" color="rgba(0, 0, 0, 0.5)">
                      Don’t worry, you’ll be able to review everything in the next step before placing the order
                    </Text>
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0" mt="5px">
                  <Div col="12">
                    <input type="radio" name="paymentOptions" id="paymentCC" />
                    <Label for="paymentCC" pl="1rem" color="textLight" ml="0.9375rem">
                      Credit Card
                    </Label>
                  </Div>
                  <Div col="12" mt="0.625rem" pl="1.75rem">
                    <CardForm />
                  </Div>

                  <Div col="12" mt="1.5rem">
                    <input type="radio" name="paymentOptions" id="paymentDC" />
                    <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
                      Debit Card
                    </Label>
                  </Div>
                  <Div col="12" mt="0.625rem" pl="1.75rem">
                    <CardForm />
                  </Div>

                  <Div col="12" mt="1.5rem">
                    <input type="radio" name="paymentOptions" id="paymentDC" />
                    <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
                      Internet Banking
                    </Label>
                  </Div>
                  <Div col="12" mt="0.625rem" pl="1.75rem">
                    <Div className={styles.paymentBlock}>
                      <Div col="12" mb="1rem">
                        <Label for="bankOptions1" pl="1rem" color="textLight">
                          Choose From Preferred Bank
                        </Label>
                      </Div>

                      <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/citi.gif" />
                      <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif" />
                      <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/hsbc.gif" />
                      <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/icici.gif" />

                      <Div col="12" mt="1rem">
                        <select className={`${styles.dropDown} ${styles.selectBank}`}>
                          <option>Select Bank</option>
                          <option>01</option>
                          <option>02</option>
                          <option>03</option>
                        </select>
                      </Div>
                    </Div>
                  </Div>

                  <Div col="12" mt="1.5rem">
                    <input type="radio" name="paymentOptions" id="paymentDC" />
                    <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
                      EMI
                    </Label>
                  </Div>
                  <Div col="12" mt="0.625rem" pl="1.75rem">
                    <Div className={styles.paymentBlock}>
                      <Div col="12" mb="1rem">
                        <Label for="bankOptions1" pl="1rem" color="textLight">
                          Choose From Preferred Bank
                        </Label>
                      </Div>

                      <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/citi.gif" />
                      <BankCard name="hdfc" img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif" />
                      <BankCard name="hsbc" img="https://static.hometown.in/media/cms/BankLOGO/hsbc.gif" />
                      <BankCard name="icici" img="https://static.hometown.in/media/cms/BankLOGO/icici.gif" />
                      <Div col="12" mb="1rem" mt="1rem">
                        <table border="1" className={`table table-border ${styles.emiTable}`}>
                          <tr>
                            <th />
                            <th>Tenure</th>
                            <th>Annual Interest Rate</th>
                            <th>EMI Interest</th>
                            <th>Total Cost</th>
                            <th>Monthly Instalments</th>
                          </tr>
                          <tr>
                            <td align="center">
                              <input type="radio" name="emi" />
                            </td>
                            <td>3 Months</td>
                            <td>13%</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                          </tr>
                          <tr>
                            <td align="center">
                              <input type="radio" name="emi" />
                            </td>
                            <td>3 Months</td>
                            <td>13%</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                          </tr>
                          <tr>
                            <td align="center">
                              <input type="radio" name="emi" />
                            </td>
                            <td>3 Months</td>
                            <td>13%</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                            <td>Rs.13,00</td>
                          </tr>
                        </table>
                      </Div>
                      <Div col="12" mb="1rem" mt="1rem">
                        <CardForm />
                      </Div>
                    </Div>
                  </Div>

                  <Div col="12" mt="1.5rem">
                    <input type="radio" name="paymentOptions" id="paymentDC" />
                    <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
                      Wallet
                    </Label>
                  </Div>
                  <Div col="12" mt="0.625rem" pl="1.75rem" mb="0.625rem">
                    <Div className={styles.paymentBlock}>
                      <Div col="12" mb="1rem">
                        <Label for="bankOptions1" pl="1rem" color="textLight">
                          Select From your preferred Wallet
                        </Label>
                      </Div>

                      <BankCard
                        name="payu"
                        img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/payu.jpg"
                      />
                      <BankCard
                        name="mobikwik"
                        img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/mobikwik.jpg"
                      />
                    </Div>
                  </Div>
                </Row>

                <Row display="block" mr="0" ml="0">
                  <Div col="4">
                    <Button
                      size="block"
                      btnType="primary"
                      fontWeight="regular"
                      height="42px"
                      mt="1.5rem"
                      fontSize="0.875rem"
                      lh="2"
                    >
                      NEXT : REVIEW BEFORE PAYMENT
                    </Button>
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
