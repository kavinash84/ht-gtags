import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { Shimmer, BackgroundMasker } from 'hometown-components/lib/Shimmer';

const ListingShimmer = () => (
  <Section pt="1rem" mb="0">
    <Container pr="0" pl="0">
      <Row display="block" mr="0" ml="0" pr="0">
        <Div col="7">
          <Shimmer height="600px">
            <BackgroundMasker width="5px" height="600px" left="8.33%" />
            <BackgroundMasker width="8.33%" height="5px" top="55px" />
            <BackgroundMasker width="8.33%" height="5px" top="calc(55px + 5px + 55px)" />
            <BackgroundMasker width="8.33%" height="5px" top="calc(55px + 5px + 55px + 5px + 55px)" />
            <BackgroundMasker width="8.33%" height="5px" top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px)" />
            <BackgroundMasker
              width="8.33%"
              height="5px"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
            <BackgroundMasker
              width="8.33%"
              height="5px"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
            <BackgroundMasker
              width="8.33%"
              height="5px"
              top="calc(55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px + 5px + 55px)"
            />
          </Shimmer>
        </Div>
        <Div col="5">
          <Shimmer height="170px" mb="30px">
            <BackgroundMasker width="0.625rem" height="279px" left="0" />
            <BackgroundMasker width="calc(100%)" height="0.625rem" right="0" top="calc(25px)" />
            <BackgroundMasker width="calc(100%)" height="0.625rem" right="0" top="calc(25px + 40px + 0.625rem)" />
            <BackgroundMasker
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem)"
            />
            <BackgroundMasker
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem + 24px + 0.625rem)"
            />
            <BackgroundMasker width="100px" height="25px" right="0" top="0" />
            <BackgroundMasker width="40%" height="35px" right="0" bottom="0" />
          </Shimmer>
          <Shimmer height="170px" mb="30px">
            <BackgroundMasker width="0.625rem" height="279px" left="0" />
            <BackgroundMasker width="calc(100%)" height="0.625rem" right="0" top="calc(25px)" />
            <BackgroundMasker width="calc(100%)" height="0.625rem" right="0" top="calc(25px + 40px + 0.625rem)" />
            <BackgroundMasker width="15px" height="45px" left="50%" top="calc(25px + 50px + 0.625rem)" />
            <BackgroundMasker
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem)"
            />
            <BackgroundMasker
              width="calc(100%)"
              height="0.625rem"
              right="0"
              top="calc(25px + 40px + 0.625rem + 44px + 0.625rem + 24px + 0.625rem)"
            />
            <BackgroundMasker width="100px" height="25px" right="0" top="0" />
            <BackgroundMasker width="40%" height="35px" right="0" bottom="0" />
          </Shimmer>
        </Div>
      </Row>
    </Container>
  </Section>
);

export default ListingShimmer;
