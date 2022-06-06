import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
// import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const Cancellation = () => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    {/* <TitleBar title="Cancellation" /> */}
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      <BoxHtV1 className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <RowHtV1 ml="0" mr="0">
          <BoxHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              We make every effort to fulfill all the orders placed. However, please note that there may be certain
              orders that HomeTown is unable to process; and reserve the rights to cancel or reject the acceptance of
              such order and decision of HomeTown in this respect shall be final and binding on the customer. The
              reasons include limitations on quantities available for purchase, inaccuracies or errors in product,
              pricing and stock information, problems identified by our credit, fraud avoidance department or due to
              certain unforeseen reasons.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              Our Customer Care Team will communicate to you if all or any portion of your order is cancelled. If your
              order is cancelled after your credit card has been charged, the said amount will be reversed back in your
              Card Account.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              <b>The various Types of Cancellations would be</b>
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text" lineHeight="1.7">
              Cancellation by the Customer
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.3">
              Cancellation by the Customer shall be valid only if made within 24 hours of placing the order.
            </TextHtV1>
            <TextHtV1 lineHeight="1.5">
              * We are not taking any cancellation request for the Homeware products(Home Furnishings , Home Décor,
              Tableware, Kitchenware, luggage, electronics(large & small appliances) ) once order placed.
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text" lineHeight="1.7">
              Cancellation on Non-Receipt of Payment
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              In case where the payment shall be made through CHEQUE/FINANCE/EMI, the delivery of the product shall be
              initiated only upon the realization of the cheque clearance from finance/agent. In case the cheque
              bounces, the Order will be Cancelled by HomeTown.
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text" lineHeight="1.7">
              Cancellation by HomeTown
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              In the event that a product is listed at an incorrect price or with incorrect information due to an system
              error product information/Pricing , HomeTown shall have the right, at our sole discretion, to refuse or
              cancel any orders placed for that product.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              HomeTown reserves the right to cancel any order with due intimation to the concerned person, under
              situations where HomeTown is not able to meet the requirement of the order placed. As a part of these
              additional security measures, HomeTown might request customers to provide relevant supporting documents
              (Identity proof, Address Proof etc). In case the requested documents are not shared with us, HomeTown . in
              reserves the right to cancel the order entirely with due intimation to the concerned person.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              In the event that a product is ordered is not serviceable to customers location (pin code) and an order
              gets placed due to system errors , HomeTown shall have the right, at our sole discretion, to refuse or
              cancel any orders placed for that product.
            </TextHtV1>
          </BoxHtV1>
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="1rem" color="text" lineHeight="1.7">
              Refunds
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              If the payment was by Credit Card or Net-Banking, we will refund in the same Credit Card or Net-Banking
              account. If the mode of payment was Cheque , we shall send you a Cheque of the refund amount Cheque shall
              only be sent to the billing address of the customer making the payment.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              Typically refunds are processed in less than 10 working days. In case of payments by Cheque; it may take
              more time for the Cheque to be delivered to your billing address, and for the funds to be credited to your
              account after you deposit the Cheque.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              Please note that we shall not be responsible for any delays in credit to the Cardholder's credit card
              account as that is managed by the Cardholder's issuing bank. In case of any delay, it shall be upto to the
              customer to take it up with their respective credit card bank with the reference of HomeTown refund
              process reference.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              Email us at <a href="mailto:care@hometown.in">care@hometown.in</a> or call our contact center at
              08069252525 in case of any assistance.
            </TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      </BoxHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default Cancellation;
