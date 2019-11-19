import React from 'react';

/* ====== Components ====== */
import ColHtV1 from 'hometown-components/lib/ColHtV1';
import ContainerHtV1 from 'hometown-components/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components/lib/RowHtV1';
import SectionHtV1 from 'hometown-components/lib/SectionHtV1';

/* ====== Page Components ====== */
import UspItem from 'newComponents/Home/UspItem';
import Title from 'newComponents/Title';

const usp1Icon = require('../../../static/usp-1.svg');
const usp2Icon = require('../../../static/usp-2.svg');
const usp3Icon = require('../../../static/usp-3.svg');
const usp4Icon = require('../../../static/usp-4.svg');
const usp5Icon = require('../../../static/usp-5.svg');
const usp6Icon = require('../../../static/usp-6.svg');

const Usp = () => (
  <SectionHtV1 variant="section.primary">
    <ContainerHtV1>
      <RowHtV1>
        <ColHtV1>
          <Title title="WHAT MAKES US UNIQUE" />
        </ColHtV1>
      </RowHtV1>
      <RowHtV1>
        <UspItem src={usp1Icon}>
          Free Delivery <br />Above Rs.499
        </UspItem>
        <UspItem src={usp2Icon}>
          Assured <br />Quality
        </UspItem>
        <UspItem src={usp3Icon}>
          Easy <br />Finance
        </UspItem>
        <UspItem src={usp4Icon}>
          1 Year <br />Warranty*
        </UspItem>
        <UspItem src={usp5Icon}>
          Free Assembly <br />within 48 Hours
        </UspItem>
        <UspItem src={usp6Icon}>
          Lifetime <br />Service
        </UspItem>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default Usp;
