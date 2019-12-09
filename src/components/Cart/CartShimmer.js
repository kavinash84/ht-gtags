import React from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Section from 'hometown-components-dev/lib/Section';
import { Shimmer, BackgroundMasker } from 'hometown-components-dev/lib/Shimmer';

const CartShimmer = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0">
      <Shimmer height="7.25rem" />
    </Section>
    <Section pt="1rem" mb="0" pb="5rem">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0" pr="0">
          <Div col="9">
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
          </Div>
          <Div col="3" ta="right" pl="1rem">
            <Shimmer height="20rem">
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="180px" />
              <BackgroundMasker width="100%" height="0.625rem" left="0" top="calc(180px + 100px)" />
            </Shimmer>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default CartShimmer;
