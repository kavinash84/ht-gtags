import React from 'react';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';

const styles = require('./HashTags.scss');

const HashTags = () => (
  <Container pr="0" pl="0">
    <Section p="3.5rem 20%" mt="3rem" mb="1rem" className={styles.hashTags} bg="hashTags">
      <Row>
        <Div>
          <Text ta="center" color="rgba(255, 255, 255, 0.75)" fontSize="1.8em" fontFamily="SFPDLight" mb="0" mt="0">
            Shop by #hashtags
          </Text>
          <Text ta="center" color="rgba(255, 255, 255, 0.75)" fontSize="1em" fontFamily="SFPDLight" mb="2rem" mt="0">
            Exploring products couldn’t be easier than this
          </Text>
        </Div>
      </Row>
      <Row>
        <Div ta="center">
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # modernsofas
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # premium
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # diwalispecial
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # minimalist
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # party
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # ethnic
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # pearlwhite
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # designermade
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # kidsfriendly
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # utility
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # tech
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # unique
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # teakwood
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # MDFWood
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # synthetic
          </Span>
          <Span p="5px 10px" fontFamily="SFPDLight" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
            # handmade
          </Span>
        </Div>
      </Row>
    </Section>
  </Container>
);

export default HashTags;
