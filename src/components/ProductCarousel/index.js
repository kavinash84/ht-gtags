import React from 'react';
import PropTypes from 'prop-types';
import ProductCarouselContainer from 'hometown-components/lib/ProductCarousel';
import Title from 'components/Title';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';

// const styles = require('./ProductCarousel.scss');

const ProductCarousel = ({
  data, categoryName, subTitle, colSize
}) => (
  <Section p="0" pt="2.5rem" mb="0">
    <Container pr="0" pl="0">
      <Title title={categoryName} subTitle={subTitle} />
      <ProductCarouselContainer colSize={colSize} itemData={data} />
    </Container>
  </Section>
);

ProductCarousel.defaultProps = {
  data: [],
  categoryName: '',
  subTitle: '',
  colSize: '100%'
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string,
  colSize: PropTypes.string
};

export default ProductCarousel;
