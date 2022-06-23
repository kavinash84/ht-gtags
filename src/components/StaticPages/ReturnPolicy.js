import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
// import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const ReturnPolicy = () => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    {/* <TitleBar title="Return Policy" /> */}
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem" lineHeight="1.7">
      <BoxHtV1 className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <RowHtV1 ml="0" mr="0">
          <BoxHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We are committed to ensuring your satisfaction with any product you have ordered from us. Once the order
              is dispatched from our warehouse will not be refunded/ cancelled unless it has non-repairable
              manufacturing damages
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text">
              Product damaged or defective:
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              In the unlikely event that any product you have ordered from us is not received in good condition, is
              damaged or defective, or if product delivered is different from what you had ordered, you must
              notwithstanding your warranty rights, immediately lodge a complaint with HomeTown on its Customer care
              help line at 08069252525, and refuse to accept the delivery. You must also contact us immediately, so
              that, we may assert our rights, if any, vis-a-vis the shipping agent. Hidden defects must again not
              withstanding any warranty rights be reported to us immediately on detection, so that any warranty claims
              against upstream suppliers can be asserted. You may return the product unused, and in the same (unused)
              condition as you have received it, in its original packaging along with original contents (with all
              accessories of polythene / charger / carton box / Manual, and such other contents depending on the product
              ordered), labels or relevant seal, for a refund or an exchange, within 48hrs from the date on which these
              goods are delivered. Should you decide to exercise your right to return purchased products, HomeTown will
              not accept returned products that are returned without the relevant label or seal or that have been
              altered from their original status or damaged.
            </TextHtV1>
            <ul>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  Please do not accept delivery of any item if you notice any apparent damage or deep damage. Please
                  contact customer care if you open the packaging and discover that the item is damaged.
                </TextHtV1>
              </li>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  Products damaged while being used do not qualify for a refund or replacement. (Product warranty to be
                  taken up with respective brand/HT service center to be highlighted)
                </TextHtV1>
              </li>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  If the product was not received in good condition we may repair/replace the product under warranty
                  terms, however in case we are unable to replace the damaged/defective product we may initiate other or
                  offer alternate product with mutual consent on returning old product. Replacement of product may
                  depend upon the availability of the product.
                </TextHtV1>
              </li>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  In the event you return any product which is delivered to you in damaged/defective condition, we will
                  also refund the shipping charges if applicable to that item.
                </TextHtV1>
              </li>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  In case of Damage or Missing Item for the ordered product in Category like Decor, Home Furnishing,
                  Tableware, Kitchenware & Luggage Customer has to raised a Ticket within 15 days from the product
                  delivered. Post that Time Period no ticket or complaints will be entertained from HomeTown Team.
                </TextHtV1>
              </li>
              <li>
                <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  Note: Products that have been assembled and/or installed cannot be returned or replaced, in case any
                  manufacturing defect, the product will be repaired under normal warranty terms.
                </TextHtV1>
              </li>
            </ul>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text">
              Return it through Courier Collection:
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You may contact our Customer Care within 48hrs of having received the product and request a
              return/exchange (As per the policy mentioned above).We shall arrange for the products to be collected from
              the delivery address through courier and shall process the return/exchange subject to receipt of the
              products at our end in unused condition and in its original packaging along with the invoice, failing
              which return/ exchange or refund may not be possible.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              For returns through courier collection; you will be given a docket number at the time of collecting the
              products, which is to be retained for future reference.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              In the event that the return does not comply with the return policy of the HomeTown, you will not be
              entitled to any replacement or refund of the sums already paid to HomeTown and HomeTown reserves the right
              to withhold the sums already received.
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text">
              How will you be refunded?
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We will refund the money once we are in receipt of the product in its original nature/condition. The
              refund shall be in the way the payment was made. If the payment was by Credit Card or Net-Banking, we will
              refund the Credit Card or Net-Banking account. If the payment mode was Cheque, we will send you a cheque.
              Cheques will be sent only to the billing address of the customer making the payment.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              The refund process will be initiated once we have received the product(s), in proper and original nature.
              Typically refunds are processed in less than 10 working days but in case of payments by Cheque, it may
              take a few extra days for the cheque to be delivered to your billing address, and for the funds to be
              credited to your account, once you deposit the cheque.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Please note that we shall not be responsible for any delays in credit to the Cardholder's credit card
              account as that is managed by the Cardholder's issuing bank.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Email us at <a href="mailto:care@hometown.in">care@hometown.in</a> or call our contact center at
              08069252525 in case of any assistance.
            </TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      </BoxHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default ReturnPolicy;
