import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';

const OfferBanner = () => (
  <Section mt="1.5rem" mb="0.5rem">
    <Container pr="0" pl="0">
      <Row ml="0.3125rem" mr="0.3125rem">
        <Div>
          <Link to="/">
            <Img src="https://www.hometown.in/media/cms/hometownv2/compressed/clearance-mid-banner.jpg" alt="" />
          </Link>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default OfferBanner;
