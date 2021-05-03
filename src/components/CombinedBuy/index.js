import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import Product from './Product';
import AddToCartCombined from '../AddToCartCombined';

const styles = require('./Slider.scss');

const ProductCarousel = ({
 data, item, pt, pb, price, discountedPrice, setDiscount
}) => (
  <Section p={0} pt={pt} pb={pb} mt={0} mb={0} display="flex" className="prodCarousel">
    <Container pr={0} pl={0} className={styles.combinedProductsWrapper}>
      <Row>
        {data.map((skuItem, index) => (
          <Box width={300} className={styles.combineItemWrapper} key={`${skuItem.meta.sku}_${String(index)}`}>
            <Row key={String(index)} alignItems="center" justifyContent="center" sx={{ flexWrap: 'nowrap' }}>
              <Product
                name={skuItem.meta.name}
                discPrice={skuItem.meta.max_special_price && formatAmount(skuItem.meta.max_special_price)}
                price={formatAmount(skuItem.meta.price)}
                saving={skuItem.meta.max_saving_percentage}
                percentage={skuItem.meta.max_saving_percentage}
                rating={skuItem.reviews && skuItem.reviews.rating}
                reviewsCount={skuItem.reviews && skuItem.reviews.count}
                image={`${skuItem.image}-product_500.jpg`}
                url={`${formatProductURL(skuItem.meta.name, skuItem.meta.sku)}`}
              />
              {index < data.length - 1 && (
                <Box>
                  <Label color="plusIcon" fontSize={32}>
                    +
                  </Label>
                </Box>
              )}
            </Row>
          </Box>
        ))}
      </Row>
      <Row mr={0} ml={0} className={styles.combineBottom} pt={10}>
        <Box alignSelf="center" display="flex">
          {data.map((skuItem, index) => (
            <Flex width={150} key={String(index)} justifyContent="space-around" alignItems="flex-end">
              <Box>
                <Label mb={0} color="textExtraLight">
                  {`${index + 1} Item`} <br />
                  <Box fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
                    {skuItem.meta.max_special_price
                      ? formatAmount(skuItem.meta.max_special_price)
                      : formatAmount(skuItem.meta.max_price)}
                  </Box>
                </Label>
              </Box>
              {index < data.length - 1 && (
                <Label color="black" fontSize={16}>
                  +
                </Label>
              )}
            </Flex>
          ))}
          {setDiscount && setDiscount > 0 && (
            <Flex width={150} justifyContent="space-around" alignItems="flex-end">
              <Label color="black" fontSize={16}>
                -
              </Label>
              <Label mb={0} color="textExtraLight">
                Combo Discount <br />
                <Box fontSize="1.125rem" mt={5} display="block" color="rgba(0,0,0,0.8)">
                  {formatAmount(setDiscount)}
                </Box>
              </Label>
            </Flex>
          )}
          <Flex width={180} justifyContent="space-around" alignItems="flex-end" ml={15}>
            <Label color="black" fontSize={16}>
              =
            </Label>
            <Label mb={0} ml={16} fontSize={20} color="textExtraLight">
              Total
              <Box ml={0} mt={3} color="rgba(0,0,0,0.8)" fontSize={20}>
                {discountedPrice ? formatAmount(discountedPrice) : ''}
                <Box display="inline" mr={28} ml={10} color="rgba(0,0,0,0.5)" fontSize={16}>
                  <s>{price ? formatAmount(price) : ''}</s>
                </Box>
              </Box>
            </Label>
          </Flex>
          <Label my={0} ml={16}>
            <AddToCartCombined skusData={item} products={data} isSoldOut={false} />
          </Label>
        </Box>
      </Row>
    </Container>
  </Section>
);

ProductCarousel.defaultProps = {
  data: [],
  item: {},
  length: 3,
  pt: '0',
  pb: '0',
  discountedPrice: 0,
  setDiscount: 0
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  item: PropTypes.object,
  length: PropTypes.number,
  pt: PropTypes.string,
  pb: PropTypes.string,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
  setDiscount: PropTypes.number
};

export default ProductCarousel;
