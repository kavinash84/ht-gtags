import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import ProductCarouselItem from './ProductCarouselItem';
import AddToCartCombined from '../AddToCartCombined';

const styles = require('./Slider.scss');

const ProductCarousel = ({
 data, item, length, pt, pb, height, price, discountedPrice, setDiscount
}) => (
  <SectionHtV1 p={0} pt={pt} pb={pb} mt={0} mb={0} display="flex" className="prodCarousel">
    <ContainerHtV1 pr={0} pl={0} className={styles.combinedProductsWrapper}>
      <RowHtV1>
        {data.map((skuItem, index) => (
          <BoxHtV1 col="3" className={styles.combineItemWrapper} key={`${skuItem.meta.sku}_${String(index)}`}>
            <RowHtV1 key={String(index)}>
              <ProductCarouselItem
                name={skuItem.meta.name}
                discPrice={skuItem.meta.max_special_price && formatAmount(skuItem.meta.max_special_price)}
                price={formatAmount(skuItem.meta.price)}
                saving={skuItem.meta.max_saving_percentage}
                percentage={skuItem.meta.max_saving_percentage}
                rating={skuItem.reviews && skuItem.reviews.rating}
                reviewsCount={skuItem.reviews && skuItem.reviews.count}
                image={`${skuItem.image}-product_500.jpg`}
                url={`${formatProductURL(skuItem.meta.name, skuItem.meta.sku)}`}
                height={length <= 3 ? height : '245px'}
              />
              <BoxHtV1 col="1" alignSelf="center" textAlign="center" sx={{ position: 'absolute', width: '51%' }}>
                <LabelHtV1 color="plusIcon" fontSize="2rem">
                  {index < data.length - 1 ? '+' : ''}
                </LabelHtV1>
              </BoxHtV1>
            </RowHtV1>
          </BoxHtV1>
        ))}
      </RowHtV1>
      <RowHtV1 mr={0} ml={0} className={styles.combineBottom} pt={10}>
        <BoxHtV1 col="12" alignSelf="center" display="flex">
          {data.map((skuItem, index) => (
            <Fragment key={String(index)}>
              <BoxHtV1 width="25%">
                <LabelHtV1 mb={0} color="textExtraLight">
                  {`${index + 1} Item`} <br />
                  <BoxHtV1 fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
                    {skuItem.meta.max_special_price
                      ? formatAmount(skuItem.meta.max_special_price)
                      : formatAmount(skuItem.meta.max_price)}
                  </BoxHtV1>
                </LabelHtV1>
                <LabelHtV1 mb={0} color="black" fontSize="1rem" margin="-16px 84px 0" sx={{ position: 'absolute' }}>
                  {index < data.length - 1 ? '+' : ''}
                </LabelHtV1>
              </BoxHtV1>
            </Fragment>
          ))}
          {setDiscount && setDiscount > 0 ? (
            <Fragment>
              <LabelHtV1 mb={1} color="black" fontSize="1rem" ml={16} mr={16}>
                -
              </LabelHtV1>
              <LabelHtV1 mb={0} color="textExtraLight">
                Combo Discount <br />
                <BoxHtV1 fontSize="1.125rem" mt={5} display="block" color="rgba(0,0,0,0.8)">
                  {formatAmount(setDiscount)}
                </BoxHtV1>
              </LabelHtV1>
              <LabelHtV1 mb={0} color="black" fontSize="1rem" ml={16} mr={16}>
                =
              </LabelHtV1>
            </Fragment>
          ) : (
            '='
          )}
          <LabelHtV1 mb={0} mr={16} fontSize="1.25rem" color="textExtraLight">
            Total
            <br />
            <BoxHtV1 ml={0} color="rgba(0,0,0,0.8)" fontSize="1.25rem">
              {discountedPrice ? formatAmount(discountedPrice) : ''}
            </BoxHtV1>
            <BoxHtV1 ml={10} color="rgba(0,0,0,0.5)" fontSize="0.875rem">
              <s>{price ? formatAmount(price) : ''}</s>
            </BoxHtV1>
          </LabelHtV1>
          <LabelHtV1 mt={0} mb={0} verticalAlign="bottom" ml={16}>
            <AddToCartCombined
              skusData={item}
              products={data}
              size="block"
              btnType="primary"
              btnColor="#515151"
              height="50px"
              fontSize="14px"
              isSoldOut={false}
            />
          </LabelHtV1>
        </BoxHtV1>
      </RowHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

ProductCarousel.defaultProps = {
  data: [],
  item: {},
  length: 3,
  pt: '0',
  pb: '0',
  height: '245px',
  discountedPrice: 0,
  setDiscount: 0
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  item: PropTypes.object,
  length: PropTypes.number,
  pt: PropTypes.string,
  pb: PropTypes.string,
  height: PropTypes.string,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
  setDiscount: PropTypes.number
};

export default ProductCarousel;
