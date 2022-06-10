import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/Div';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/Section';
// import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const ContactUs = () => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    {/* <TitleBar title="Contact Us" /> */}
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      <BoxHtV1 className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <RowHtV1 ml="0" mr="0">
          <BoxHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="0.875rem" color="text">
              In case of any queries or information, just to reach out to us. We are happy to hear from you.
            </HeadingHtV1>
            <HeadingHtV1 fontFamily="700" fontSize="0.875rem" color="text">
              Corporate Address:
            </HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Praxis Home Retail Limited (“PHRL”),
              <br />
              iThink Techno Campus,
              <br />
              Jolly Board Tower D, Ground Floor,
              <br />
              Kanjurmarg (East), Mumbai 400042
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Phone number: <a href="tel:08069252525">08069252525</a> (10 AM - 8 PM)
              <br />
              Email: <a href="mailto:care@hometown.in">care@hometown.in</a>
            </TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      </BoxHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default ContactUs;
