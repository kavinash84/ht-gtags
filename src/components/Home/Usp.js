import React from 'react';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
// import Span from 'hometown-components/lib/Span';

const styles = require('./Usp.scss');
const usp1Icon = require('../../../static/usp-1.png');
const usp2Icon = require('../../../static/usp-2.png');
const usp3Icon = require('../../../static/usp-3.png');
const usp4Icon = require('../../../static/usp-4.png');
const usp5Icon = require('../../../static/usp-5.png');
const usp6Icon = require('../../../static/usp-6.png');

const Usp = () => (
  <Div>
    <Container pr="0" pl="0">
      <Section p="1rem 1rem" mt="2rem" mb="2rem" bg="bg">
        <Row>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp1Icon} height="60px" width="auto" m="auto" alt="Free Delivery" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              Free Delivery
            </Heading>
            <Text ta="center" color="#7c7c7b" fontSize="0.75rem" fontFamily="light" mb="0" mt="0">
              Assured
            </Text>
          </Div>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp2Icon} height="60px" width="auto" m="auto" alt="Assured Quality" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              Assured Quality
            </Heading>
          </Div>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp3Icon} height="60px" width="auto" m="auto" alt="Easy Finance" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              Easy Finance
            </Heading>
          </Div>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp4Icon} height="60px" width="auto" m="auto" alt="1 Year Warranty*" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              1 Year Warranty*
            </Heading>
          </Div>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp5Icon} height="60px" width="auto" m="auto" alt="Free Assembly" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              Free Assembly
            </Heading>
            <Text ta="center" color="#7c7c7b" fontSize="0.75rem" fontFamily="light" mb="0" mt="0">
              within 48 Hours
            </Text>
          </Div>
          <Div display="flexEqual" ta="center" className={styles.uspImg}>
            <Img src={usp6Icon} height="60px" width="auto" m="auto" alt="Free Service Support" />
            <Heading ta="center" color="uspTitle" fontSize="1rem" fontFamily="light" mb="0">
              Free Service <br /> Support
            </Heading>
          </Div>
        </Row>
      </Section>
    </Container>
  </Div>
);

export default Usp;
