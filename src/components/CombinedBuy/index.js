import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import HeadingH4 from 'hometown-components/lib/HeadingH4';
import { Label } from 'hometown-components/lib/Label';
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import ProductCarouselItem from './ProductCarouselItem';

const styles = require('./Slider.scss');

const ProductCarousel = ({
  data, title, length, pt, pb, height, handleCombinedBuy, price, discountedPrice
}) => (
  <Section p="0" pt={pt} pb={pb} mt="0" mb="0" display="flex" className="prodCarousel">
    <Container pr="0" pl="0" className={styles.combinedProductsWrapper}>
      <Row>
        <Div>
          <HeadingH4 fontSize="1.25rem" color="text" fontWeight="500" ta="center" mb="1rem">
            {title}
          </HeadingH4>
        </Div>
      </Row>
      <Row>
        {data.map((item, index) => (
          <Fragment>
            <Div col="3" className={styles.combineItemWrapper} key={String(index)}>
              <Row>
                <ProductCarouselItem
                  name={item.meta.name}
                  discPrice={item.meta.max_special_price && formatAmount(item.meta.max_special_price)}
                  price={formatAmount(item.meta.price)}
                  saving={item.meta.max_saving_percentage}
                  percentage={item.meta.max_saving_percentage}
                  rating={item.reviews && item.reviews.rating}
                  reviewsCount={item.reviews && item.reviews.count}
                  image={`${item.image}-product_500.jpg`}
                  url={`${formatProductURL(item.meta.name, item.meta.sku)}`}
                  height={length <= 3 ? height : '245px'}
                />
                <Div col="1" alignSelf="center" ta="center">
                  <Label color="plusIcon" fontSize="2rem">
                    +
                  </Label>
                </Div>
              </Row>
            </Div>
          </Fragment>
        ))}
      </Row>
      <Row mr="0" ml="0" className={styles.combineBottom} pt="15px">
        <Div col="12" alignSelf="center">
          <Label mb="0" color="textExtraLight">
            1 Item <br />
            <Span fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
              1,000
            </Span>
          </Label>
          <Label mb="0" color="black" fontSize="1rem" ml="1rem" mr="1rem">
            +
          </Label>
          <Label mb="0" color="textExtraLight">
            2 Item <br />
            <Span fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
              1,000
            </Span>
          </Label>
          <Label mb="0" color="black" fontSize="1rem" ml="1rem" mr="1rem">
            +
          </Label>
          <Label mb="0" color="textExtraLight">
            3 Item <br />
            <Span fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
              1,000
            </Span>
          </Label>
          <Label mb="0" color="black" fontSize="1rem" ml="1rem" mr="1rem">
            =
          </Label>
          <Label mb="0" mr="1rem" fontSize="1.25rem" color="textExtraLight">
            Total<br />
            <Span ml="0px" color="rgba(0,0,0,0.8)" fontSize="1.25rem">
              {formatAmount(discountedPrice)}
            </Span>
            <Span ml="10px" color="rgba(0,0,0,0.5)" fontSize="0.875rem">
              <s>{formatAmount(price)}</s>
            </Span>
          </Label>
          <Button btnType="primary" onClick={handleCombinedBuy}>
            ADD 3 ITEMS TO CART
          </Button>
        </Div>
      </Row>
    </Container>
  </Section>
);

ProductCarousel.defaultProps = {
  data: [],
  title: '',
  length: 3,
  pt: '0',
  pb: '0',
  height: '245px'
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  length: PropTypes.number,
  pt: PropTypes.string,
  pb: PropTypes.string,
  height: PropTypes.string,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
  handleCombinedBuy: PropTypes.func.isRequired
};

export default ProductCarousel;
