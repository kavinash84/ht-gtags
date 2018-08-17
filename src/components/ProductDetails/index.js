import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import Img from 'hometown-components/lib/Img';
import ProductCarousel from 'components/ProductCarousel';
import EmiModal from 'containers/EmiModal/EmiModal';
import Theme from 'hometown-components/lib/Theme';
import ResponsiveModal from 'components/Modal';
import LoginModal from 'components/Login/LoginModal';
import { addReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi } from 'utils/helper';
import { getSKUList } from 'selectors/wishlist';

import ProductDetailsCarousel from './Carousel';
import BreadCrumb from './BreadCrumb';
// import { CART_URL } from 'helpers/Constants';
import Pincode from './Pincode';
import AddToCart from '../AddToCart';

import prodDetails from '../../data/ProductDetails';

const styles = require('./ProductDetails.scss');

const onClickWishList = (sku, list, dispatcher, isUserLoggedIn, history, onOpenLoginModal, addToWaitList) => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku);
  addToWaitList(sku);
  return onOpenLoginModal();
};
const isInWishList = (list, id) => list.includes(id);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      wishlistToggle: toggleWishList,
      productPosition: setProductPosition,
      addToWaitList: wishListWaitList
    },
    dispatch
  );

const mapStateToProps = ({
  productdetails,
  pincode,
  reviews,
  colorproducts,
  relatedproducts,
  emioptions,
  wishlist,
  userLogin
}) => ({
  product: productdetails.productDescription,
  reviews,
  pincode,
  colorproducts: colorproducts.list,
  relatedproductsList: relatedproducts.data,
  deliveryInfo: productdetails.deliveryDetails,
  emidata: emioptions.data,
  wishList: getSKUList(wishlist),
  wishListData: wishlist.data,
  isLoggedIn: userLogin.isLoggedIn,
  loadingList: wishlist.loadingList
});

class ProductDetails extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    openLogin: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
  }
  onOpenLoginModal = () => {
    const { history } = this.props;
    history.push(`?redirect=${history.location.pathname}`);
    this.setState({ openLogin: true });
  };
  onCloseLoginModal = () => {
    const { history } = this.props;
    history.goBack();
    this.setState({ openLogin: false });
  };
  addReview = (sku, data) => e => {
    e.preventDefault();
    const { dispatch } = this.context.store;
    dispatch(addReview(sku, data));
  };

  render() {
    const {
      product,
      pincode,
      reviews,
      colorproducts,
      relatedproductsList,
      deliveryInfo,
      emidata,
      wishList,
      wishListData,
      isLoggedIn,
      history,
      wishlistToggle,
      addToWaitList,
      loadingList
    } = this.props;
    const {
      meta,
      images,
      simples,
      delivery_details: deliveryDetails,
      attributes,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes,
      reviews: { count, rating }
    } = product;
    const { category_details: categoryDetails } = meta;

    const simpleSku = Object.keys(simples)[0];
    const shipping = simples[simpleSku].groupedattributes.product_shipping_cost;
    const isEmiAvailable = Number(simples[simpleSku].meta.no_emi) === 0;
    const { price, special_price: specialPrice } = meta;
    const checkSpecialPrice = specialPrice || price;
    return (
      <Div type="block">
        <Section p="0" pt="1.25rem" mb="0">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
              <Div col="9" className={styles.titleWrapper}>
                <Div mt="0" mb="0.625rem" pl="1rem" pr="1rem">
                  <BreadCrumb categoryDetails={categoryDetails} />
                </Div>
                <TitlePrice
                  name={meta.name}
                  price={formatAmount(price)}
                  discPrice={formatAmount(checkSpecialPrice)}
                  savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice) || '')}
                  savingsPercentage={calculateDiscount(price, checkSpecialPrice)}
                  ratings={rating}
                  count={count}
                  mt="1rem"
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
                    {colorproducts.length > 0 && (
                      <Section mb="0.3125rem" p="0">
                        <Row display="block" mr="0" ml="0">
                          <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontFamily="medium">
                            Color Options
                          </Heading>
                        </Row>
                        <ColorOption data={colorproducts} colors={prodDetails.colors} />
                      </Section>
                    )}
                  </Div>
                  {/* <Div col="2">
                    <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontFamily="medium">
                      Size Options
                    </Heading>
                    <select className={styles.sizeDD}>
                      <option>1 Seater</option>
                      <option>2 Seater</option>
                      <option>3 Seater</option>
                    </select>
                  </Div> */}
                </Row>
              </Div>
              <Div col="3" ta="right">
                <Img src="http://via.placeholder.com/350x80" alt="" width="100%" mt="0.625rem" mb="1rem" />
                <AddToCart
                  simpleSku={simpleSku}
                  sku={sku}
                  itemId={sku}
                  size="block"
                  quantity={simples[simpleSku].meta.quantity}
                />
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
                    onClick={onClickWishList(
                      sku,
                      wishListData,
                      wishlistToggle,
                      isLoggedIn,
                      history,
                      this.onOpenLoginModal,
                      addToWaitList
                    )}
                    isWishList={isInWishList(wishList, sku)}
                    wishlistLoading={isInWishList(loadingList, sku)}
                  >
                    {isInWishList(wishList, sku) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                  </Button>
                </Div>
              </Div>
            </Row>
            <ProductDetailsCarousel data={images} title={meta.name} />
          </Container>
        </Section>
        <Section p="0" pl="0.5rem" pr="0.5rem" pb="1.5rem" mb="0" mt="1rem">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0.625rem" mb="0.625rem" mr="0">
              <Div col="9" pr="2rem">
                <ProductDesc desc={attributes.description} />
                <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />
                <Reviews col="6" reviewItems={reviews.data} pr="2.5rem" />
                <AddReview col="8" catalogId={groupedattributes.id_catalog_config} onClickSubmit={this.addReview} />
              </Div>
              <Div col="3">
                <ServiceDetails
                  deliverBy={(deliveryInfo && deliveryInfo[0].value) || deliveryDetails[0].value}
                  emiStarting={formatAmount(calculateLowestEmi(emidata, price))}
                  shipping={shipping}
                  isEmiAvailable={isEmiAvailable}
                  pincode={pincode.selectedPincode}
                >
                  <Pincode key="pincode" />
                  <EmiModal price={formatAmount(checkSpecialPrice)} data={emidata} key="emi" />
                </ServiceDetails>
              </Div>
            </Row>
            {relatedproductsList.length > 0 && (
              <Row display="block" mt="2.5rem" mb="0.625rem" mr="0">
                <ProductCarousel
                  title="Related Products"
                  data={relatedproductsList}
                  length={relatedproductsList.length}
                />
              </Row>
            )}
            <ResponsiveModal
              classNames={{ modal: styles.loginModal }}
              onCloseModal={this.onCloseLoginModal}
              open={this.state.openLogin}
            >
              <LoginModal />
            </ResponsiveModal>
          </Container>
        </Section>
      </Div>
    );
  }
}
ProductDetails.defaultProps = {
  product: {},
  pincode: {},
  reviews: {},
  colorproducts: [],
  relatedproductsList: [],
  deliveryInfo: '',
  emidata: [],
  wishList: [],
  wishListData: [],
  loadingList: []
};
ProductDetails.propTypes = {
  product: PropTypes.object,
  pincode: PropTypes.object,
  reviews: PropTypes.object,
  colorproducts: PropTypes.array,
  relatedproductsList: PropTypes.array,
  deliveryInfo: PropTypes.string,
  emidata: PropTypes.array,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  wishlistToggle: PropTypes.func.isRequired,
  loadingList: PropTypes.array,
  addToWaitList: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
