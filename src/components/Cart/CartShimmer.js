import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import { Shimmer, BackgroundMasker } from 'hometown-components-dev/lib/Shimmer';

const CartShimmer = () => (
  <BoxHtV1 type="block">
    <SectionHtV1 marginBottom="0.3125rem" p={0}>
      <Shimmer height="7.25rem" />
    </SectionHtV1>
    <SectionHtV1 paddingTop="1rem" mb="0" paddingBottom="5rem">
      <ContainerHtV1 pr={0} pl={0}>
        <RowHtV1 display="block" mr={0} ml={0} pr={0}>
          <BoxHtV1 col="9">
            <Shimmer height="1.8125rem">
              <BackgroundMasker width="0.625rem" height="1.8125rem" left="350px" />
              <BackgroundMasker width="0.625rem" height="1.8125rem" left="calc(350px + 0.625rem + 280px)" />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="calc(350px + 0.625rem + 280px + 0.625rem + 100px)"
              />
            </Shimmer>
            <Shimmer height="1rem">
              <BackgroundMasker width="100%" height="1rem" left="0" />
            </Shimmer>
            <Shimmer height="60px">
              <BackgroundMasker width="0.625rem" height="60px" left="60px" />
              <BackgroundMasker width="0.625rem" height="60px" left="350px" />
              <BackgroundMasker width="0.625rem" height="60px" left="350px" />
              <BackgroundMasker width="0.625rem" height="60px" left="calc(350px + 0.625rem + 280px)" />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="calc(350px + 0.625rem + 280px + 0.625rem + 100px)"
              />
              <BackgroundMasker width="150px" height="30px" top="30px" left="calc(190px + 0.625rem)" />
              <BackgroundMasker width="280px" height="5px" top="27px" left="calc(60px + 0.625rem)" />
              <BackgroundMasker width="150px" height="30px" top="30px" left="calc(130px + 0.625rem + 350px)" />
              <BackgroundMasker width="280px" height="5px" top="27px" left="calc(350px + 0.625rem)" />
              <BackgroundMasker width="280px" height="35px" top="27px" left="calc(350px + 0.625rem + 240px)" />
            </Shimmer>
            <Shimmer height="0.625rem">
              <BackgroundMasker width="100%" height="0.625rem" left="0" />
            </Shimmer>
            <Shimmer height="60px">
              <BackgroundMasker width="0.625rem" height="60px" left="60px" />
              <BackgroundMasker width="0.625rem" height="60px" left="350px" />
              <BackgroundMasker width="0.625rem" height="60px" left="350px" />
              <BackgroundMasker width="0.625rem" height="60px" left="calc(350px + 0.625rem + 280px)" />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="calc(350px + 0.625rem + 280px + 0.625rem + 100px)"
              />
              <BackgroundMasker width="150px" height="30px" top="30px" left="calc(190px + 0.625rem)" />
              <BackgroundMasker width="280px" height="5px" top="27px" left="calc(60px + 0.625rem)" />
              <BackgroundMasker width="150px" height="30px" top="30px" left="calc(130px + 0.625rem + 350px)" />
              <BackgroundMasker width="280px" height="5px" top="27px" left="calc(350px + 0.625rem)" />
              <BackgroundMasker width="280px" height="35px" top="27px" left="calc(350px + 0.625rem + 240px)" />
            </Shimmer>
          </BoxHtV1>
          <BoxHtV1 col="3" textAlign="right" pl={16}>
            <Shimmer height="20rem">
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="180px" />
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="calc(180px + 100px)" />
            </Shimmer>
          </BoxHtV1>
        </RowHtV1>
      </ContainerHtV1>
    </SectionHtV1>
  </BoxHtV1>
);

export default CartShimmer;
