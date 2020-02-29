import React from 'react';

/* ====== Components ====== */
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';

/* ====== Page Components ====== */
import Title from 'newComponents/Title';
import UspItem from './UspItem';

const usp1Icon = require('../../../static/usp-1.svg');
const usp2Icon = require('../../../static/usp-2.svg');
const usp3Icon = require('../../../static/usp-3.svg');
const usp4Icon = require('../../../static/usp-4.svg');
const usp5Icon = require('../../../static/usp-5.svg');
const usp6Icon = require('../../../static/usp-6.svg');

const Usp = () => (
  <Section variant="section.primary">
    <Container>
      <Row justifyContent="center">
        <Title title="WHAT MAKES US UNIQUE" />
      </Row>
      <Row>
        <UspItem src={usp1Icon}>
          Free Delivery <br />
          Above Rs.499
        </UspItem>
        <UspItem src={usp2Icon}>
          Assured <br />
          Quality
        </UspItem>
        <UspItem src={usp3Icon}>
          Easy <br />
          Finance
        </UspItem>
        <UspItem src={usp4Icon}>
          1 Year <br />
          Warranty*
        </UspItem>
        <UspItem src={usp5Icon}>
          Free Assembly <br />
          within 48 Hours
        </UspItem>
        <UspItem src={usp6Icon}>
          Lifetime <br />
          Service
        </UspItem>
      </Row>
    </Container>
  </Section>
);

export default Usp;
