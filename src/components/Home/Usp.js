import React from 'react';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';

const styles = require('./Usp.scss');
const usp1Icon = require('../../../static/usp-1.png');
const usp2Icon = require('../../../static/usp-2.png');
const usp3Icon = require('../../../static/usp-3.png');
const usp4Icon = require('../../../static/usp-4.png');
const usp5Icon = require('../../../static/usp-5.png');
const usp6Icon = require('../../../static/usp-6.png');

const Usp = () => (
  <Section p="1rem" mt="0" mb="0rem" top="-15px">
    <Row>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img
          src={usp1Icon}
          height="45px"
          width="auto"
          m="auto"
          alt="Free Delivery"
          display="inline-block"
          va="bottom"
        />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          Free Delivery <br />Above Rs.499
        </Heading>
      </Div>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img
          src={usp2Icon}
          height="45px"
          width="auto"
          m="auto"
          alt="Assured Quality"
          display="inline-block"
          va="bottom"
        />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          Assured <br />Quality
        </Heading>
      </Div>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img src={usp3Icon} height="45px" width="auto" m="auto" alt="Easy Finance" display="inline-block" va="bottom" />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          Easy <br />Finance
        </Heading>
      </Div>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img
          src={usp4Icon}
          height="45px"
          width="auto"
          m="auto"
          alt="1 Year Warranty*"
          display="inline-block"
          va="bottom"
        />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          1 Year <br />Warranty*
        </Heading>
      </Div>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img
          src={usp5Icon}
          height="45px"
          width="auto"
          m="auto"
          alt="Free Assembly"
          display="inline-block"
          va="bottom"
        />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          Free Assembly <br />within 48 Hours
        </Heading>
      </Div>
      <Div display="flexEqual" ta="center" className={styles.uspImg}>
        <Img
          src={usp6Icon}
          height="45px"
          width="auto"
          m="auto"
          alt="Free Service Support"
          display="inline-block"
          va="bottom"
        />
        <Heading
          ta="left"
          color="uspTitle"
          fontSize="0.75rem"
          fontFamily="light"
          lh="1.4"
          mb="0"
          display="inline-block"
          tt="uppercase"
          mt="0"
        >
          Lifetime <br />Service
        </Heading>
      </Div>
    </Row>
  </Section>
);

export default Usp;
