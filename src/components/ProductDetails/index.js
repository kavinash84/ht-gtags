import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import TitlePrice from 'hometown-components/lib/ProductDetails/TitlePrice';

const ProductDetails = () => (
  <Div type="block">
    <TitlePrice />

    <Section pt="1.25rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
      <Container type="container" pr="0.5rem" pl="0.5rem" />
    </Section>
  </Div>
);

export default ProductDetails;
