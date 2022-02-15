import React from "react";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import SpecList from "./SpecList";

const Specs = ({ specs }) => (
  <Section mb="0rem" p="0" mt="0rem">
    <Container type="container" pr="0rem" pl="0rem">
      {specs.map((spec, index) => (
        <SpecList list={spec} key={String(index)} />
      ))}
    </Container>
  </Section>
);

export default Specs;
