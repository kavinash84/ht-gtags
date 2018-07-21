import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { Shimmer, BackgroundMasker } from 'hometown-components/lib/Shimmer';

const ListingShimmer = () => (
  <Div type="block">
    <Section pt="1rem" mb="0">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0" pr="0">
          <Div col="9">
            <Shimmer height="215px">
              <BackgroundMasker width="calc(100% - 0.625rem)" height="1.8125rem" left="120px" />
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="calc(1.8125rem)" />
              <BackgroundMasker width="45%" height="28px" right="0" top="calc(1.8125rem + 0.625rem)" />
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="calc(1.8125rem + 0.625rem + 28px)" />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="100px"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem)"
              />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="250px"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem)"
              />
              <BackgroundMasker
                width="0.625rem"
                height="1.8125rem"
                left="420px"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem)"
              />
              <BackgroundMasker
                width="calc(100% - 0.625rem * 3)"
                height="1.8125rem"
                left="calc(100px + 250px)"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem)"
              />
              <BackgroundMasker
                width="100%"
                height="0.625rem"
                left="0"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem + 1.8125rem)"
              />
              <BackgroundMasker
                width="200px"
                height="0.625rem"
                left="0"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem + 1.8125rem + 2.5rem)"
              />
              <BackgroundMasker
                width="calc(100% - 200px)"
                height="calc(215px - (1.8125rem + 0.625rem + 28px + 0.625rem + 1.8125rem + 0.625rem))"
                left="200px"
                top="calc(1.8125rem + 0.625rem + 28px + 0.625rem + 1.8125rem + 0.625rem)"
              />
              <BackgroundMasker width="calc(100% - 85px)" height="60px" left="85px" bottom="0" />
            </Shimmer>
          </Div>
          <Div col="3" ta="right" pl="1rem">
            <Shimmer height="215px">
              <BackgroundMasker width="100%" height="1rem" left="0" top="80px" />
              <BackgroundMasker width="100%" height="1rem" left="0" top="calc(80px + 1rem + 40px)" />
              <BackgroundMasker width="100%" height="1.5rem" left="0" top="calc(80px + 1rem + 40px + 1rem + 40px)" />
            </Shimmer>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section pt="1rem" mb="0">
      <Container pr="0" pl="0">
        <Row display="block" mr="-15px" ml="-15px">
          <Shimmer height="279px" mb="30px">
            <BackgroundMasker width="15px" height="279px" left="0" />
            <BackgroundMasker width="30px" height="279px" left="calc(15px + 270px)" />
            <BackgroundMasker width="30px" height="279px" left="calc(15px + 270px + 30px + 270px)" />
            <BackgroundMasker width="30px" height="279px" right="calc(15px + 270px)" />
            <BackgroundMasker width="15px" height="279px" right="0" />
          </Shimmer>
          <Div col="9" pl="15px">
            <Shimmer height="279px" mb="30px">
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="2.5rem" />
              <BackgroundMasker width="calc(100% - 200px)" height="2.5rem" right="0" />
              <BackgroundMasker width="100%" height="4rem" left="0" top="calc(2.5rem + 4.5rem)" />
              <BackgroundMasker
                width="calc(100% - 100px)"
                height="1.5rem"
                right="0"
                top="calc(2.5rem + 4.5rem + 4rem)"
              />
              <BackgroundMasker
                width="calc(100%)"
                height="0.625rem"
                right="0"
                top="calc(2.5rem + 4.5rem + 4rem + 1.45rem)"
              />
            </Shimmer>
          </Div>
          <Div col="3" pr="15px">
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
              <BackgroundMasker width="40%" height="30px" right="0" bottom="10px" />
            </Shimmer>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default ListingShimmer;
