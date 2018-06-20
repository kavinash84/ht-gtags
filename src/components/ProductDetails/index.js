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
import ProductDetailsCarousel from './Carousel';
// import ProductsCarousel from 'components/ProductCarousel';
// import { CART_URL } from 'helpers/Constants';
import AddToCart from './AddtoCart';

import prodDetails from '../../data/ProductDetails';

const styles = require('./ProductDetails.scss');

const ProductDetails = () => (
  <Div type="block">
    <Section p="0" pt="1.25rem" mb="0">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
          <Div col="9" className={styles.titleWrapper}>
            <TitlePrice prodDetails={prodDetails} />
          </Div>
          <Div col="3">
            <AddToCart skuId="1234" />
          </Div>
        </Row>
        <Row display="block" mt="1.25rem" mb="0.625rem" mr="0" ml="0" className={styles.variationWrapper}>
          <Div col="2">
            <Section mb="0.3125rem" p="0">
              <Row display="block" mr="0" ml="0">
                <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontWeight="600">
                  Color Options
                </Heading>
              </Row>
              <ColorOption colors={prodDetails.colors} />
            </Section>
          </Div>
          <Div col="2">
            <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontWeight="600">
              Size Options
            </Heading>
            <select className={styles.sizeDD}>
              <option>1 Seater</option>
              <option>2 Seater</option>
              <option>3 Seater</option>
            </select>
          </Div>
        </Row>
        <ProductDetailsCarousel data={prodDetails.images} />
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
        <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
          <Div col="9">
            <ProductDesc desc={prodDetails.description} />
            <Specs specs={prodDetails.specs} />
            <Reviews reviewItems={prodDetails.reviews} />
            {/* <ProductSlider productSliderTitle="Related Products" colSize={20} />
          <ProductSlider productSliderTitle="Frequently Bought Together" colSize={20} /> */}
          </Div>
          <Div col="3">
            <ServiceDetails deliverBy={prodDetails.deliver_by} emiStarting={prodDetails.emi_starting} />
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default ProductDetails;
