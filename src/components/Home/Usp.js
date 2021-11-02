import React from 'react';

/* ====== Components ====== */
// import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';

/* ====== Page Components ====== */
import UspItem from 'components/Home/UspItem';
import Title from 'components/Title';

const usp1Icon = require('../../../static/usp-1.svg');
const usp2Icon = require('../../../static/usp-2.svg');
const usp3Icon = require('../../../static/usp-3.svg');
const usp4Icon = require('../../../static/usp-4.svg');
const usp5Icon = require('../../../static/usp-5.svg');
const usp6Icon = require('../../../static/usp-6.svg');

const Usp = () => (
  <SectionHtV1 variant="section.primary">
    <ContainerHtV1>
      <RowHtV1 justifyContent="center">
        <Title title="WHAT MAKES US UNIQUE" />
      </RowHtV1>
      <RowHtV1 justifyContent="space-around">
        <UspItem src={usp1Icon}>
          Free Delivery <br />
          Above Rs.999
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
          Upto <br />3 years warranty*
        </UspItem>
        <UspItem src={usp5Icon}>
          Free Assembly <br />
          within 48 Hours
        </UspItem>
        <UspItem src={usp6Icon}>
          Lifetime <br />
          Service
        </UspItem>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default Usp;
