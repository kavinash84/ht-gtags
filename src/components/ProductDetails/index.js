import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import HeadingH6 from 'hometown-components/lib/HeadingH6';
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
import LoginModal from 'containers/Login/LoginForm';
import ShareBar from 'components/ShareBar';
import { addReview, toggleReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi, getVideoID, formatProductURL } from 'utils/helper';
import { getSKUList } from 'selectors/wishlist';
import { groupedAttributes as getgroupedAttributes, getBreadCrumbs } from 'selectors/product';

import { productPageTitle, productMetaDescription, productMetaKeywords } from 'utils/seo';
import ProductDetailsCarousel from './Carousel';
import BreadCrumb from './BreadCrumb';
import Pincode from './Pincode';
import AddToCart from '../AddToCart';
import BuyNow from '../BuyNow';
import Video from './Video';

const styles = require('./ProductDetails.scss');

const { SITE_URL } = process.env;

const onClickWishList = (sku, list, dispatcher, isUserLoggedIn, onOpenLoginModal, addToWaitList, simpleSku) => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku, simpleSku);
  addToWaitList(sku, simpleSku);
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
  loadingList: wishlist.loadingList,
  gattributes: getgroupedAttributes(productdetails),
  breadcrumbs: getBreadCrumbs(productdetails)
});

class ProductDetails extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.reviewsRef = React.createRef();
  }
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
  onClickReviews = () => {
    try {
      const { top } = this.reviewsRef.current.getBoundingClientRect();
      window.scroll({
        top: Number(top - 60),
        behavior: 'smooth'
      });
    } catch (e) {
      window.scroll(0, this.reviewsRef.current.offsetTop);
    }
  };
  handleLoginModal = () => {
    this.setState({ openLogin: !this.state.openLogin });
  };
  addReview = (sku, data) => {
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
      wishlistToggle,
      addToWaitList,
      toggleReviewBox,
      deliveryDateLoading,
      gattributes,
      breadcrumbs,
      loadingList
    } = this.props;
    const {
      meta,
      images,
      simples,
      attributes,
      delivery_details: deliveryDetails,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes,
      reviews: { count, rating }
    } = product;
    const { description } = attributes;
    const simpleSku = Object.keys(simples)[0];
    const { name, price, special_price: specialPrice } = meta;
    const checkSpecialPrice = specialPrice || price;
    const { adding, added } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const offerImageRedirect = simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
    const { main_material: material, color, category_type: productType } = gattributes;
    const productURL = `${SITE_URL}${formatProductURL(name, sku)}`;
    return (
      <Div type="block">
        <Section p="0" pb="2rem" mb="0" className={styles.pdpWrapper}>
          <Helmet>
            <title>{productPageTitle(name)}</title>
            <meta name="keywords" content={productMetaKeywords(productType, material)} />
            <meta name="description" content={productMetaDescription(name, productType, material, color)} />
            <meta property="og:url" content={productURL} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={name} />
            <meta property="og:description" content={name} />
            <meta property="og:image" content={images && images.length > 0 && `${images[0].url}.jpg`} />
          </Helmet>
          <Container type="container" pr="0" pl="0">
            <Row display="block" mt="0" mb="0" mr="0" ml="0">
              <Div>
                <Div col="7" pt="1.5rem" pr="1rem" className={styles.pdpLeftWrapper}>
                  <Div col="12" className={styles.breadCrumbWrapper} mb="1rem">
                    <BreadCrumb breadcrumbs={breadcrumbs} />
                  </Div>
                  <Div col="12">{images && <ProductDetailsCarousel data={images} title={meta.name} />}</Div>
                </Div>
                <Div col="5" pt="1.5rem" pl="0.3125rem" pr="0.3125rem" pb="1rem" className={styles.pdpRightWrapper}>
                  <div id="portal" className="portal" />
                  <Div className={styles.titleWrapper}>
                    <Div col="11" mt="0">
                      <TitlePrice
                        name={name}
                        price={formatAmount(price)}
                        discPrice={formatAmount(checkSpecialPrice)}
                        savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice) || '')}
                        savingsPercentage={calculateDiscount(price, checkSpecialPrice)}
                        ratings={rating}
                        count={count}
                        mt="1rem"
                        onClickReviews={this.onClickReviews}
                      />
                      <ShareBar title={name} url={productURL} mt="10px" />
                    </Div>
                    <Div col="1" mt="0">
                      <WishlistBtn
                        onClick={onClickWishList(
                          sku,
                          wishListData,
                          wishlistToggle,
                          isLoggedIn,
                          this.handleLoginModal,
                          addToWaitList,
                          simpleSku
                        )}
                        isWishList={isInWishList(wishList, sku)}
                        wishlistLoading={isInWishList(loadingList, sku)}
                      />
                    </Div>
                    <Row display="block" mb="0" mr="0.9375rem" ml="0.9375rem" className={styles.variationWrapper}>
                      {colorproducts.length > 0 && (
                        <Section mb="0.3125rem" p="0" mt="1.25rem">
                          <Row display="block" mr="0" ml="0">
                            <HeadingH6 fontSize="1em" color="textDark" mb="0.625rem" mt="0px" fontFamily="medium">
                              Color Options
                            </HeadingH6>
                          </Row>
                          <ColorOption data={colorproducts} />
                        </Section>
                      )}
                    </Row>
                  </Div>
                  <Row display="block" mt="0.3125rem" mb="0" mr="0.9375rem" ml="0.9375rem">
                    <ServiceDetails
                      deliverBy={
                        (deliveryInfo && deliveryInfo[0].value) || (deliveryDetails[0] && deliveryDetails[0].value)
                      }
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
                  {offerImage &&
                    offerImageRedirect && (
                    <Row display="block" mt="0" mb="0" mr="0.9375rem" ml="0.9375rem">
                      <Div col="12" mt="0" pr="0.3125rem">
                        <a target="_blank" rel="noopener noreferrer" href={offerImageRedirect}>
                          <Img src={offerImage} alt="" width="100%" mt="0" mb="0.625rem" />
                        </a>
                      </Div>
                    </Row>
                  )}
                  {offerImage &&
                    !offerImageRedirect && (
                    <Row display="block" mt="0" mb="0" mr="0.9375rem" ml="0.9375rem">
                      <Div col="12" mt="0" pr="0.3125rem">
                        <Img src={offerImage} alt="" width="100%" mt="0" mb="0.625rem" />
                      </Div>
                    </Row>
                  )}
                  <Row display="block" mt="0.625rem" mb="0.625rem" mr="0.9375rem" ml="0.9375rem">
                    <Div col="6" mt="0" pr="0.3125rem">
                      <AddToCart
                        simpleSku={simpleSku}
                        sku={sku}
                        itemId={sku}
                        size="block"
                        btnType="custom"
                        btnColor="#515151"
                        height="50px"
                        isSoldOut={
                          !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                        }
                      />
                    </Div>
                    <Div col="6" mt="0" pr="0.3125rem">
                      <BuyNow
                        simpleSku={simpleSku}
                        sku={sku}
                        size="block"
                        btnType="primary"
                        isSoldOut={
                          !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                        }
                      />
                    </Div>
                  </Row>
                  <Row display="block" mt="0" mb="0.625rem" mr="0.9375rem" ml="0.9375rem" />
                  <Row display="block" mt="1.25rem" mb="0" mr="0" ml="0">
                    {description && (
                      <ProductDesc desc={description || ''} showmore={showmore} toggleShowMore={this.toggleShowMore} />
                    )}
                    {/* <button onClick={this.toggleShowMore}></button> */}
                    <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />
                    {groupedattributes &&
                      groupedattributes.youtubeid && (
                      <Row display="block" mt="0" mb="0" mr="0.9375rem" ml="0.9375rem">
                        <Div col="12" mt="0" pr="0.3125rem">
                          <Video id={getVideoID(groupedattributes.youtubeid)} />
                        </Div>
                      </Row>
                    )}
                    <div ref={this.reviewsRef}>
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
                    </div>
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
          onCloseModal={this.handleLoginModal}
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
  deliveryDateLoading: false,
  loadingList: []
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
  wishlistToggle: PropTypes.func.isRequired,
  addToWaitList: PropTypes.func.isRequired,
  toggleReviewBox: PropTypes.func.isRequired,
  deliveryDateLoading: PropTypes.bool,
  breadcrumbs: PropTypes.array.isRequired,
  gattributes: PropTypes.object.isRequired,
  loadingList: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
