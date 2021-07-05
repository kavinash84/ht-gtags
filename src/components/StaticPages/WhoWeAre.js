import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';

import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
// import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const WhoWeAre = () => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    <ContainerHtV1 type="containerHtV1" pr="0.5rem" pl="0.5rem">
      <BoxHtV1 className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        <RowHtV1 ml="0" mr="0">
          <BoxHtV1>
            <HeadingHtV1 as="h1" mb="1em">Who We Are</HeadingHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              Over the past 10 years, HomeTown has been bringing the latest designs & fashion to Indian homes. HomeTown
              offers the widest and best in class range in furniture, home furnishings & decor, modular kitchens, home
              improvement and more. Part of the Future Group, HomeTown brings an enjoyable and hassle-free homemaking
              experience to all its valuable customers with varying lifestyles and preferences.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              We promise to facilitate our customers with a unique and personalized shopping experience. Our commitment
              to quality and timeless designs has helped us evolve over the years and it indeed fills us with pride to
              be the first choice of many.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              With a great spread that appeals to the globe-trotting, trendy yet very much Indian homemaker, HomeTown is
              known to attract an array of lifestyle seeking customers. Being recognized as India’s biggest store in
              homemaking, renovation and decor, our products are exclusively designed while keeping durability and
              comfort at priority.The key differentiator between Home Town and others is the Design and Build offering
              of end-to-end interior decoration services, to customers who are interested in renovating & upgrading
              their homes.
            </TextHtV1>
            <TextHtV1 color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem" lineHeight="1.5">
              From classy sofas to chic dining sets to kitchen essentials and artifacts, we offer everything to beautify
              your living space. Since 2006, we’ve grown to over 40 stores across 22 cities. Keeping pace with the
              tech-savvy world, we have maintained a strong web presence with prompt online services.
            </TextHtV1>
          </BoxHtV1>
        </RowHtV1>
      </BoxHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default WhoWeAre;
