import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Button from 'hometown-components/lib/Buttons';
import TitlePrice from 'hometown-components/lib/ProductDetails/TitlePrice';
import ColorOption from 'hometown-components/lib/ProductDetails/ColorOption';
import ServiceDetails from 'hometown-components/lib/ProductDetails/ServiceDetails';
import ProductDesc from 'hometown-components/lib/ProductDetails/ProductDesc';
import Specs from 'hometown-components/lib/ProductDetails/Specs';
import Reviews from 'hometown-components/lib/Reviews';
import AddReview from 'hometown-components/lib/Reviews/WriteReview';
import Theme from 'hometown-components/lib/Theme';
import { addReview } from 'redux/modules/reviews';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings } from 'utils/helper';
import ProductDetailsCarousel from './Carousel';
import BreadCrumb from './BreadCrumb';
// import ProductsCarousel from 'components/ProductCarousel';
// import { CART_URL } from 'helpers/Constants';
import Pincode from './Pincode';
import AddToCart from '../AddToCart';

import prodDetails from '../../data/ProductDetails';

const styles = require('./ProductDetails.scss');

@connect(({ productdetails, pincode, reviews }) => ({
  product: productdetails.productDescription,
  reviews,
  pincode
}))
class ProductDetails extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  addReview = (sku, data) => e => {
    e.preventDefault();
    const { dispatch } = this.context.store;
    dispatch(addReview(sku, data));
  };

  render() {
    const { product, pincode, reviews } = this.props;
    const {
      meta,
      images,
      simples,
      delivery_details: deliveryDetails,
      attributes,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes
    } = product;
    const { category_details: categoryDetails } = meta;
    const simpleSku = Object.keys(simples)[0];
    const shipping = simples[simpleSku].groupedattributes.product_shipping_cost;
    const { price, special_price: specialPrice } = meta;
    const checkSpecialPrice = specialPrice || price;
    return (
      <Div type="block">
        <Section p="0" pt="1.25rem" mb="0">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0.625rem" mb="0.625rem" mr="0" ml="0">
              <Div>
                <BreadCrumb categoryDetails={categoryDetails} />
              </Div>
            </Row>
            <Row display="block" mt="0.625rem" mb="0" mr="0">
              <Div col="9" className={styles.titleWrapper}>
                <TitlePrice
                  name={meta.name}
                  price={formatAmount(price)}
                  discPrice={formatAmount(checkSpecialPrice)}
                  savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice) || '')}
                  savingsPercentage={calculateDiscount(price, checkSpecialPrice)}
                />
                <Row
                  display="block"
                  mt="1.25rem"
                  mb="0.625rem"
                  mr="0.9375rem"
                  ml="0.9375rem"
                  className={styles.variationWrapper}
                >
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
              </Div>
              <Div col="3" ta="right">
                <AddToCart simpleSku={simpleSku} sku={sku} itemId={sku} size="block" />
                <Div mt="1rem">
                  <Button
                    width="100%"
                    color={Theme.colors.primary}
                    btnType="custom"
                    border="1px solid"
                    bc={Theme.colors.primary}
                    bg="transparent"
                    size="block"
                    fontSize="0.857rem"
                    height="40px"
                    className={styles.addToWishlist}
                  >
                    ADD TO WISHLIST
                  </Button>
                </Div>
              </Div>
            </Row>
            <ProductDetailsCarousel data={images} title={meta.name} />
          </Container>
        </Section>
        <Section p="0" pl="0.5rem" pr="0.5rem" pb="1.5rem" mb="0" mt="1.5rem">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
              <Div col="9" pr="2rem">
                <ProductDesc desc={attributes.description} />
                <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />
                <Reviews col="6" reviewItems={reviews.data} pr="2.5rem" />
                <AddReview col="8" sku={groupedattributes.id_catalog_config} onClickSubmit={this.addReview} />
              </Div>
              <Div col="3">
                <ServiceDetails
                  deliverBy={deliveryDetails[0].value}
                  emiStarting="xyz"
                  shipping={shipping}
                  pincode={pincode.selectedPincode}
                >
                  <Pincode />
                </ServiceDetails>
              </Div>
            </Row>
            <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
              {/* <ProductSlider productSliderTitle="Related Products" colSize={20} />
      <ProductSlider productSliderTitle="Frequently Bought Together" colSize={20} /> */}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}
ProductDetails.defaultProps = {
  product: {},
  pincode: {},
  reviews: {}
};
ProductDetails.propTypes = {
  product: PropTypes.object,
  pincode: PropTypes.object,
  reviews: PropTypes.object
};
export default ProductDetails;
