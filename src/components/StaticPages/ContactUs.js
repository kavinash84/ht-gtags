import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Section from 'hometown-components/lib/Section';

const styles = require('./StaticPages.scss');

const ContactUs = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          <Div>
            <Heading fontFamily="700" fontSize="0.875rem" color="text">
              In case of any queries or information, just to reach out to us. We are happy to hear from you.
            </Heading>
            <Heading fontFamily="700" fontSize="0.875rem" color="text">
              Corporate Address:
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Praxis Home Retail Limited (“PHRL”),
              <br />
              iThink Techno Campus,
              <br />
              Jolly Board Tower D, Ground Floor,
              <br />
              Kanjurmarg (East), Mumbai 400042
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Phone number: <a href="tel:18002100004">18002100004</a> (10 AM - 8 PM)
              <br />
              Email: <a href="mailto:care@hometown.in">care@hometown.in</a>
            </Text>
          </Div>
        </Row>
      </Div>
    </Container>
  </Section>
);

export default ContactUs;
