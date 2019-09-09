import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const Cancellation = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Cancellation" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          <Div>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We make every effort to fulfill all the orders placed. However, please note that there may be certain
              orders that HomeTown is unable to process; and reserve the rights to cancel or reject the acceptance of
              such order and decision of HomeTown in this respect shall be final and binding on the customer. The
              reasons include limitations on quantities available for purchase, inaccuracies or errors in product,
              pricing and stock information, problems identified by our credit, fraud avoidance department or due to
              certain unforeseen reasons.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Our Customer Care Team will communicate to you if all or any portion of your order is cancelled. If your
              order is cancelled after your credit card has been charged, the said amount will be reversed back in your
              Card Account.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              <b>The various Types of Cancellations would be</b>
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="700" fontSize="1rem" color="text">
              Cancellation by the Customer
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Cancellation by the Customer shall be valid only if made within 24 hours of placing the order.
            </Text>
            <Text>
              * We are not taking any cancellation request for the Homeware products(Home Furnishings , Home Décor,
              Tableware and Kitchenware) once order placed.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="700" fontSize="1rem" color="text">
              Cancellation on Non-Receipt of Payment
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              In case where the payment shall be made through CHEQUE/FINANCE/EMI, the delivery of the product shall be
              initiated only upon the realization of the cheque clearance from finance/agent. In case the cheque
              bounces, the Order will be Cancelled by HomeTown.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="700" fontSize="1rem" color="text">
              Cancellation by HomeTown
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              In the event that a product is listed at an incorrect price or with incorrect information due to an system
              error product information/Pricing , HomeTown shall have the right, at our sole discretion, to refuse or
              cancel any orders placed for that product.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown reserves the right to cancel any order with due intimation to the concerned person, under
              situations where HomeTown is not able to meet the requirement of the order placed. As a part of these
              additional security measures, HomeTown might request customers to provide relevant supporting documents
              (Identity proof, Address Proof etc). In case the requested documents are not shared with us, HomeTown . in
              reserves the right to cancel the order entirely with due intimation to the concerned person.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              In the event that a product is ordered is not serviceable to customers location (pin code) and an order
              gets placed due to system errors , HomeTown shall have the right, at our sole discretion, to refuse or
              cancel any orders placed for that product.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="700" fontSize="1rem" color="text">
              Refunds
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              If the payment was by Credit Card or Net-Banking, we will refund in the same Credit Card or Net-Banking
              account. If the mode of payment was Cheque , we shall send you a Cheque of the refund amount Cheque shall
              only be sent to the billing address of the customer making the payment.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Typically refunds are processed in less than 10 working days. In case of payments by Cheque; it may take
              more time for the Cheque to be delivered to your billing address, and for the funds to be credited to your
              account after you deposit the Cheque.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Please note that we shall not be responsible for any delays in credit to the Cardholder's credit card
              account as that is managed by the Cardholder's issuing bank. In case of any delay, it shall be upto to the
              customer to take it up with their respective credit card bank with the reference of HomeTown refund
              process reference.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Email us at <a href="mailto:care@hometown.in">care@hometown.in</a> or call our contact center at
              18002100004 in case of any assistance.
            </Text>
          </Div>
        </Row>
      </Div>
    </Container>
  </Section>
);

export default Cancellation;
