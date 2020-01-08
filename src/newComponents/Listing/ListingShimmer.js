import React from 'react';
import Container from 'hometown-components-dev/lib/Container';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Section from 'hometown-components-dev/lib/Section';
import { Shimmer, BackgroundMasker } from 'hometown-components-dev/lib/Shimmer';

const ListingShimmer = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0">
      <Shimmer height="114px" />
    </Section>
    <Section pt="1rem" mb="0">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0" pr="0">
          <Div col="9">
            <Shimmer height="3.9375rem" />
          </Div>
          <Div col="3" ta="right" pl="1rem">
            <Shimmer height="3.9375rem" />
          </Div>
        </Row>
      </Container>
    </Section>
    <Section pt="0.3125rem" pb="0.3125rem" mb="0.625rem">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Shimmer height="1.8125rem">
              <BackgroundMasker width="0.625rem" height="1.8125rem" left="100px" />
              <BackgroundMasker width="0.625rem" height="1.8125rem" left="calc(100px + 20px + 100px)" />
              <BackgroundMasker width="0.625rem" height="1.8125rem" left="calc(100px + 20px + 100px + 20px + 100px)" />
              <BackgroundMasker
                width="100%"
                height="1.8125rem"
                left="calc(100px + 20px + 100px + 20px + 100px + 20px + 100px)"
              />
            </Shimmer>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section pt="1rem" mb="0">
      <Container pr="0" pl="0">
        <Row display="block" mr="-15px" ml="-15px">
          <Shimmer height="24.375rem" mb="30px">
            <BackgroundMasker width="15px" height="24.375rem" left="0" />
            <BackgroundMasker width="30px" height="24.375rem" left="calc(15px + 270px)" />
            <BackgroundMasker width="30px" height="24.375rem" left="calc(15px + 270px + 30px + 270px)" />
            <BackgroundMasker width="30px" height="24.375rem" right="calc(15px + 270px)" />
            <BackgroundMasker width="15px" height="24.375rem" right="0" />

            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 0.625em)" />
            <BackgroundMasker width="40px" height="1.925em" left="calc(210px + 35px)" top="calc(270px + 1.225em)" />
            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 2.5em + 0.625em)" />
            <BackgroundMasker width="65px" height="1.825em" left="calc(170px + 50px)" top="calc(270px + 3.7em)" />
            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 300px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 300px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 300px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 300px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 300px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 300px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 600px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 600px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 600px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 600px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 600px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 600px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 900px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 900px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 900px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 900px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 900px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 900px)" bottom="0" />
          </Shimmer>
          <Shimmer height="24.375rem" mb="30px">
            <BackgroundMasker width="15px" height="24.375rem" left="0" />
            <BackgroundMasker width="30px" height="24.375rem" left="calc(15px + 270px)" />
            <BackgroundMasker width="30px" height="24.375rem" left="calc(15px + 270px + 30px + 270px)" />
            <BackgroundMasker width="30px" height="24.375rem" right="calc(15px + 270px)" />
            <BackgroundMasker width="15px" height="24.375rem" right="0" />

            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 0.625em)" />
            <BackgroundMasker width="40px" height="1.925em" left="calc(210px + 35px)" top="calc(270px + 1.225em)" />
            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 2.5em + 0.625em)" />
            <BackgroundMasker width="65px" height="1.825em" left="calc(170px + 50px)" top="calc(270px + 3.7em)" />
            <BackgroundMasker width="270px" height="0.625em" left="15px" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 300px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 300px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 300px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 300px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 300px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 300px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 600px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 600px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 600px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 600px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 600px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 600px)" bottom="0" />

            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 900px)" top="calc(270px + 0.625em)" />
            <BackgroundMasker
              width="40px"
              height="1.925em"
              left="calc(210px + 35px + 900px)"
              top="calc(270px + 1.225em)"
            />
            <BackgroundMasker
              width="270px"
              height="0.625em"
              left="calc(15px + 900px)"
              top="calc(270px + 2.5em + 0.625em)"
            />
            <BackgroundMasker
              width="65px"
              height="1.825em"
              left="calc(170px + 50px + 900px)"
              top="calc(270px + 3.7em)"
            />
            <BackgroundMasker width="270px" height="0.625em" left="calc(15px + 900px)" top="calc(270px + 5.5rem)" />
            <BackgroundMasker width="100px" height="1.725em" left="calc(170px + 15px + 900px)" bottom="0" />
          </Shimmer>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default ListingShimmer;
