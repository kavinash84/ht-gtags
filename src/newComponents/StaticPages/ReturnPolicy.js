import React from 'react';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Title from '../Title';

const styles = require('./StaticPages.scss');

const TextRegular = props => <Text lineHeight={1.5} color="rgba(0,0,0,0.7)" mb="1rem" {...props} />;

const ReturnPolicy = () => (
  <Container pt={[40, 40, 40, 60]}>
    <Title title="Return Policy" />
    <Box className={styles.staticPageWrapper}>
      {/* eslint-disable */}
      <Row ml="0" mr="0">
        <Box>
          <TextRegular>
            We are committed to ensuring your satisfaction with any product you have ordered from us. Once the order is
            dispatched from our warehouse will not be refunded/ cancelled unless it has non-repairable manufacturing
            damages
          </TextRegular>
        </Box>
        <Box>
          <Heading fontFamily="700" fontSize="1rem" color="text">
            Product damaged or defective:
          </Heading>
          <TextRegular>
            In the unlikely event that any product you have ordered from us is not received in good condition, is
            damaged or defective, or if product delivered is different from what you had ordered, you must
            notwithstanding your warranty rights, immediately lodge a complaint with HomeTown on its Customer care help
            line at 18002100004, and refuse to accept the delivery. You must also contact us immediately, so that, we
            may assert our rights, if any, vis-a-vis the shipping agent. Hidden defects must again not withstanding any
            warranty rights be reported to us immediately on detection, so that any warranty claims against upstream
            suppliers can be asserted. You may return the product unused, and in the same (unused) condition as you have
            received it, in its original packaging along with original contents (with all accessories of polythene /
            charger / carton box / Manual, and such other contents depending on the product ordered), labels or relevant
            seal, for a refund or an exchange, within 48hrs from the date on which these goods are delivered. Should you
            decide to exercise your right to return purchased products, HomeTown will not accept returned products that
            are returned without the relevant label or seal or that have been altered from their original status or
            damaged.
          </TextRegular>
          <ul>
            <li>
              <TextRegular>
                Please do not accept delivery of any item if you notice any apparent damage or deep damage. Please
                contact customer care if you open the packaging and discover that the item is damaged.
              </TextRegular>
            </li>
            <li>
              <TextRegular>
                Products damaged while being used do not qualify for a refund or replacement. (Product warranty to be
                taken up with respective brand/HT service center to be highlighted)
              </TextRegular>
            </li>
            <li>
              <TextRegular>
                If the product was not received in good condition we may repair/replace the product under warranty
                terms, however in case we are unable to replace the damaged/defective product we may initiate other or
                offer alternate product with mutual consent on returning old product. Replacement of product may depend
                upon the availability of the product.
              </TextRegular>
            </li>
            <li>
              <TextRegular>
                In the event you return any product which is delivered to you in damaged/defective condition, we will
                also refund the shipping charges if applicable to that item.
              </TextRegular>
            </li>
            <li>
              <TextRegular>
                Note: Products that have been assembled and/or installed cannot be returned or replaced, in case any
                manufacturing defect, the product will be repaired under normal warranty terms.
              </TextRegular>
            </li>
          </ul>
        </Box>
        <Box>
          <Heading fontFamily="700" fontSize="1rem" color="text">
            Return it through Courier Collection:
          </Heading>
          <TextRegular>
            You may contact our Customer Care within 48hrs of having received the product and request a return/exchange
            (As per the policy mentioned above).We shall arrange for the products to be collected from the delivery
            address through courier and shall process the return/exchange subject to receipt of the products at our end
            in unused condition and in its original packaging along with the invoice, failing which return/ exchange or
            refund may not be possible.
          </TextRegular>
          <TextRegular>
            For returns through courier collection; you will be given a docket number at the time of collecting the
            products, which is to be retained for future reference.
          </TextRegular>
          <TextRegular>
            In the event that the return does not comply with the return policy of the HomeTown, you will not be
            entitled to any replacement or refund of the sums already paid to HomeTown and HomeTown reserves the right
            to withhold the sums already received.
          </TextRegular>
        </Box>
        <Box>
          <Heading fontFamily="700" fontSize="1rem" color="text">
            How will you be refunded?
          </Heading>
          <TextRegular>
            We will refund the money once we are in receipt of the product in its original nature/condition. The refund
            shall be in the way the payment was made. If the payment was by Credit Card or Net-Banking, we will refund
            the Credit Card or Net-Banking account. If the payment mode was Cheque, we will send you a cheque. Cheques
            will be sent only to the billing address of the customer making the payment.
          </TextRegular>
          <TextRegular>
            The refund process will be initiated once we have received the product(s), in proper and original nature.
            Typically refunds are processed in less than 10 working days but in case of payments by Cheque, it may take
            a few extra days for the cheque to be delivered to your billing address, and for the funds to be credited to
            your account, once you deposit the cheque.
          </TextRegular>
          <TextRegular>
            Please note that we shall not be responsible for any delays in credit to the Cardholder's credit card
            account as that is managed by the Cardholder's issuing bank.
          </TextRegular>
          <TextRegular>
            Email us at <a href="mailto:care@hometown.in">care@hometown.in</a> or call our contact center at 18002100004
            in case of any assistance.
          </TextRegular>
        </Box>
      </Row>
    </Box>
  </Container>
);

export default ReturnPolicy;
