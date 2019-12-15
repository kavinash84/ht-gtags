import React from 'react';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
// import { Shimmer, BackgroundMasker } from 'hometown-components-dev/lib/Shimmer';

const ListingShimmer = () => (
  <SectionHtV1 pt={16} mb={0}>
    <ContainerHtV1 pr={0} pl={0}>
      <RowHtV1 display="block" mr={0} ml={0} pr={0}>
        <BoxHtV1 col="7">
          <BoxHtV1 height="600px" width="100%" variant="shimmer">
            <BoxHtV1 bg="#fff" position="absolute" width="5px" height="600px" left="8.33%" />
            <BoxHtV1 bg="#fff" position="absolute" width="8.33%" height="5px" top="55px" />
            <BoxHtV1 bg="#fff" position="absolute" width="8.33%" height="5px" top="calc(55px + 5px + 55px)" />
            <BoxHtV1
              bg="#fff"
              position="absolute"
              width="8.33%"
              height="5px"
              top="calc(55px + 5px + 55px + 5px + 55px)"
            />
            <BoxHtV1
              bg="#fff"
              position="absolute"
              width="8.33%"
              height="5px"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
            <BoxHtV1
              width="8.33%"
              height="5px"
              bg="#fff"
              position="absolute"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
            <BoxHtV1
              width="8.33%"
              height="5px"
              bg="#fff"
              position="absolute"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
            <BoxHtV1
              width="8.33%"
              height="5px"
              bg="#fff"
              position="absolute"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
          </BoxHtV1>
        </BoxHtV1>
        <BoxHtV1 col="5">
          <BoxHtV1 height="170px" mb={30} width="100%" variant="shimmer">
            <BoxHtV1 width="0.625rem" height="279px" left="0" />
            <BoxHtV1 width="calc(100%)" height="0.625rem" right="0" top="calc(25px)" />
            <BoxHtV1 width="calc(100%)" height="0.625rem" right="0" top="calc(25px + 40px + 0.625rem)" />
            <BoxHtV1
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem)"
            />
            <BoxHtV1
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem + 24px + 0.625rem)"
            />
            <BoxHtV1 width="100px" height="25px" right="0" top="0" />
            <BoxHtV1 width="40%" height="35px" right="0" bottom="0" />
          </BoxHtV1>
          <BoxHtV1 height="170px" width="100%" mb="30px" variant="shimmer">
            <BoxHtV1 width="0.625rem" height="279px" left="0" />
            <BoxHtV1 width="calc(100%)" height="0.625rem" right="0" top="calc(25px)" />
            <BoxHtV1 width="calc(100%)" height="0.625rem" right="0" top="calc(25px + 40px + 0.625rem)" />
            <BoxHtV1 width="15px" height="45px" left="50%" top="calc(25px + 50px + 0.625rem)" />
            <BoxHtV1
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem)"
            />
            <BoxHtV1
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem + 24px + 0.625rem)"
            />
            <BoxHtV1 width="100px" height="25px" right="0" top="0" />
            <BoxHtV1 width="40%" height="35px" right="0" bottom="0" />
          </BoxHtV1>
        </BoxHtV1>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default ListingShimmer;
