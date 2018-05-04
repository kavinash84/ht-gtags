import React from 'react';
// import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import TitlePrice from 'hometown-components/lib/ProductDetails/TitlePrice';
import ColorOption from 'hometown-components/lib/ProductDetails/ColorOption';
import ServiceDetails from 'hometown-components/lib/ProductDetails/ServiceDetails';
import ProductDesc from 'hometown-components/lib/ProductDetails/ProductDesc';
import Specs from 'hometown-components/lib/ProductDetails/Specs';
import Reviews from 'hometown-components/lib/Reviews';
import ProductDetailsSlider from 'components/ProductDetailsSlider';
import ProductSlider from 'components/ProductSlider';
// import { CART_URL } from 'helpers/Constants';
import AddToCart from './AddtoCart';

import prodDetails from '../../data/ProductDetails';

const styles = require('./ProductDetails.scss');

const ProductDetails = () => (
  <Div type="block">
    <Section p="0" pt="1.25rem" mb="0">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        <TitlePrice prodDetails={prodDetails} />
        <ProductDetailsSlider imageList={prodDetails.images} />
        <Row display="block" mt="0.625rem" mb="0.625rem" mr="0" ml="0">
          <Div col="6">
            <ColorOption colors={prodDetails.colors} />
          </Div>
          <Div col="6">
            <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontFamily="SFPDMedium">
              Size Options
            </Heading>
            <select className={styles.sizeDD}>
              <option>1 Seater</option>
              <option>2 Seater</option>
              <option>3 Seater</option>
            </select>
          </Div>
        </Row>
      </Container>
    </Section>
    <Section
      p="0"
      pl="0.5rem"
      pr="0.5rem"
      pb="5rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
    >
      <Container type="container" pr="0" pl="0">
        <ServiceDetails deliverBy={prodDetails.deliver_by} emiStarting={prodDetails.emi_starting} />
        <ProductDesc desc={prodDetails.description} />
        <Specs specs={prodDetails.specs} />
        <Reviews reviewItems={prodDetails.reviews} />
        <ProductSlider productSliderTitle="Similar Products" />
      </Container>
    </Section>
    <AddToCart skuId="1234" />
  </Div>
);

export default ProductDetails;
