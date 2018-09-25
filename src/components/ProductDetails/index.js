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
import TitlePrice from 'hometown-components/lib/ProductDetails/TitlePrice';
import ColorOption from 'hometown-components/lib/ProductDetails/ColorOption';
import ServiceDetails from 'hometown-components/lib/ProductDetails/ServiceDetails';
import ProductDesc from 'hometown-components/lib/ProductDetails/ProductDesc';
import Specs from 'hometown-components/lib/ProductDetails/Specs';
import Reviews from 'hometown-components/lib/Reviews';
import AddReview from 'hometown-components/lib/Reviews/WriteReview';
import Img from 'hometown-components/lib/Img';
import WishlistBtn from 'hometown-components/lib/WishlistBtn';
import ProductCarousel from 'components/ProductCarousel';
import EmiModal from 'containers/EmiModal/EmiModal';
import ResponsiveModal from 'components/Modal';
import LoginModal from 'components/Login/LoginModal';
import { addReview, toggleReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi } from 'utils/helper';
import { getSKUList } from 'selectors/wishlist';

import ProductDetailsCarousel from './Carousel';
import BreadCrumb from './BreadCrumb';
import Pincode from './Pincode';
import AddToCart from '../AddToCart';

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
      addToWaitList: wishListWaitList,
      toggleReviewBox: toggleReview
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
  deliveryDateLoading: productdetails.deliveryDateLoading,
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
    openLogin: false,
    showmore: true
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
  toggleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
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
      toggleReviewBox,
      deliveryDateLoading
    } = this.props;
    const {
      meta,
      images,
      simples,
      attributes,
      delivery_details: deliveryDetails,
      // attributes,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes,
      reviews: { count, rating }
    } = product;
    const { category_details: categoryDetails } = meta;
    const { short_description: shortDescription } = attributes;
    const simpleSku = Object.keys(simples)[0];
    // const shipping = simples[simpleSku].groupedattributes.product_shipping_cost;
    const { price, special_price: specialPrice } = meta;
    const checkSpecialPrice = specialPrice || price;
    const { adding, added } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const { showmore } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
    return (
      <Div type="block">
        <Section p="0" mb="0" className={styles.pdpWrapper}>
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0" mb="0" mr="0" ml="0">
              <Div>
                <Div col="7" pt="1.5rem" pr="1rem" className={styles.pdpLeftWrapper}>
                  <Div col="12" className={styles.breadCrumbWrapper} mb="1rem">
                    <BreadCrumb categoryDetails={categoryDetails} />
                  </Div>
                  <Div col="12">
                    <WishlistBtn
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
                    />
                    <ProductDetailsCarousel data={images} title={meta.name} />
                  </Div>
                  {/* <Div col="10">
                    <div className={styles.imgSliderContainer}>
                      <div className={styles.imageContainer}>
                        <img src="https://www.hometown.in/media/product/78/2253/1.jpg" alt="" />
                      </div>
                    </div>
                  </Div> */}
                </Div>
                <Div col="5" pt="1.5rem" pl="0.3125rem" pr="0.3125rem" pb="1rem" className={styles.pdpRightWrapper}>
                  <div id="portal" className="portal" />
                  <Div className={styles.titleWrapper}>
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
                    <Row display="block" mb="0" mr="0.9375rem" ml="0.9375rem" className={styles.variationWrapper}>
                      {colorproducts.length > 0 && (
                        <Section mb="0.3125rem" p="0" mt="1.25rem">
                          <Row display="block" mr="0" ml="0">
                            <Heading fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontFamily="medium">
                              Color Options
                            </Heading>
                          </Row>
                          <ColorOption data={colorproducts} />
                        </Section>
                      )}
                    </Row>
                  </Div>
                  <Row display="block" mt="0.3125rem" mb="0" mr="0.9375rem" ml="0.9375rem">
                    <ServiceDetails
                      deliverBy={(deliveryInfo && deliveryInfo[0].value) || deliveryDetails[0].value}
                      emiStarting={formatAmount(calculateLowestEmi(emidata, price))}
                      shipping={checkSpecialPrice}
                      isEmiAvailable={isEmiAvailable}
                      pincode={pincode.selectedPincode}
                      loading={deliveryDateLoading}
                    >
                      <Pincode key="pincode" />
                      <EmiModal price={formatAmount(checkSpecialPrice)} data={emidata} key="emi" />
                    </ServiceDetails>
                  </Row>
                  {offerImage && (
                    <Row display="block" mt="0" mb="0" mr="0.9375rem" ml="0.9375rem">
                      <Div col="6" mt="0" pr="0.3125rem">
                        <Img src={offerImage} alt="" width="100%" mt="0" mb="0.625rem" />
                      </Div>
                    </Row>
                  )}
                  <Row display="block" mt="0" mb="0.625rem" mr="0.9375rem" ml="0.9375rem">
                    <Div col="6" mt="0" pr="0.3125rem">
                      <AddToCart
                        simpleSku={simpleSku}
                        sku={sku}
                        itemId={sku}
                        size="block"
                        isSoldOut={
                          !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                        }
                      />
                    </Div>
                  </Row>
                  <Row display="block" mt="0" mb="0.625rem" mr="0.9375rem" ml="0.9375rem" />
                  <Row display="block" mt="1.25rem" mb="0" mr="0" ml="0">
                    {shortDescription && (
                      <ProductDesc
                        desc={shortDescription || ''}
                        showmore={showmore}
                        toggleShowMore={this.toggleShowMore}
                      />
                    )}
                    {/* <button onClick={this.toggleShowMore}></button> */}
                    <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />
                    <Reviews col="12" reviewItems={reviews.data} pr="2.5rem" />
                    <AddReview
                      col="8"
                      catalogId={groupedattributes.id_catalog_config}
                      loaded
                      onClickSubmit={this.addReview}
                      adding={adding}
                      added={added}
                      toggleReview={toggleReviewBox}
                    />
                  </Row>
                </Div>
              </Div>
            </Row>
          </Container>
        </Section>

        {relatedproductsList.length > 0 && (
          <Row display="block" pt="0.5rem" mt="2.5rem" mb="0" mr="0">
            <ProductCarousel
              pb="2.5rem"
              title="Related Products"
              data={relatedproductsList}
              length={relatedproductsList.length}
            />
          </Row>
        )}

        <ResponsiveModal
          classNames={{ modal: 'loginModal' }}
          onCloseModal={this.onCloseLoginModal}
          open={this.state.openLogin}
        >
          <LoginModal />
        </ResponsiveModal>
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
  deliveryDateLoading: false
};
ProductDetails.propTypes = {
  product: PropTypes.object,
  pincode: PropTypes.object,
  reviews: PropTypes.object,
  colorproducts: PropTypes.array,
  relatedproductsList: PropTypes.array,
  deliveryInfo: PropTypes.array,
  emidata: PropTypes.array,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  wishlistToggle: PropTypes.func.isRequired,
  addToWaitList: PropTypes.func.isRequired,
  toggleReviewBox: PropTypes.func.isRequired,
  deliveryDateLoading: PropTypes.bool
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
