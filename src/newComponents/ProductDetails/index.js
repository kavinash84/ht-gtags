import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * Modules / Utils / Reducers
 */
import { addReview, toggleReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { getCombinedBuy } from 'redux/modules/combinedbuy';
import { addToCartCombined } from 'redux/modules/cart';

import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi, getVideoID, formatProductURL } from 'utils/helper';
import { productPageTitle, productMetaDescription, productMetaKeywords } from 'utils/seo';

import { groupedAttributes as getgroupedAttributes, getBreadCrumbs, getSimpleSku } from 'selectors/product';
import { getSKUList } from 'selectors/wishlist';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';

/**
 * Page Components
 */
import AddReview from 'hometown-components-dev/lib/ReviewsHtV1/WriteReview';
import ColorOption from 'hometown-components-dev/lib/ProductDetailsHtV1/ColorOption';
import CombinedBuy from 'newComponents/CombinedBuy';
import EmiModal from 'containers/EmiModal/EmiModal';
import LoginModal from 'containers/Login/LoginForm';
import ProductDesc from 'hometown-components-dev/lib/ProductDetailsHtV1/ProductDesc';
import ProductCarousel from 'newComponents/ProductCarousel';
import ResponsiveModal from 'components/Modal';
import Reviews from 'hometown-components-dev/lib/ReviewsHtV1';
import ServiceDetails from 'hometown-components-dev/lib/ProductDetailsHtV1/ServiceDetails';
// import ShareBar from 'newComponents/ShareBar';
import Specs from 'hometown-components-dev/lib/ProductDetailsHtV1/Specs';
import TitlePrice from 'hometown-components-dev/lib/ProductDetailsHtV1/TitlePrice';
import WishListButton from 'hometown-components-dev/lib/WishlistButtonHtV1';
import AddToCart from '../AddToCart';
import BreadCrumb from './BreadCrumb';
import BuyNow from '../BuyNow';
import Pincode from './Pincode';
import ProductDetailsCarousel from './Carousel';
import Video from './Video';

const styles = require('./ProductDetails.scss');

const { SITE_URL } = process.env;

const onClickWishList = (
  sku,
  list,
  dispatcher,
  isUserLoggedIn,
  onOpenLoginModal,
  addToWaitList,
  simpleSku,
  selectedPincode
) => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku, simpleSku, selectedPincode);
  addToWaitList(sku, simpleSku, selectedPincode);
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
const getProductsList = products => {
  const items = [];
  products.forEach(item => {
    const { set_qty: qty = 0 } = item;
    for (let i = 0; i < qty; i += 1) {
      items.push(item);
    }
  });
  return items;
};

const mapStateToProps = ({
  app: { sessionId },
  productdetails,
  pincode,
  reviews,
  colorproducts,
  relatedproducts,
  emioptions,
  wishlist,
  userLogin,
  combinedbuy
}) => ({
  session: sessionId,
  product: productdetails.productDescription,
  reviews,
  pincode,
  combinedbuy: combinedbuy.results,
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
  breadcrumbs: getBreadCrumbs(productdetails),
  simpleSku: getSimpleSku(productdetails)
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
    showmore: true,
    showmorecolorproducts: true
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    const {
      simpleSku,
      pincode: { selectedPincode }
    } = this.props;
    dispatch(getCombinedBuy(simpleSku, selectedPincode));
  }
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
  handleCombinedBuy = (item, pincode, session) => {
    const { id_catalog_buildyourset: setId, skus } = item;
    const { selectedPincode } = pincode;
    const simpleSKUS = skus.map(val => ({ simple_sku: val.sku, qty: Number(val.qty) }));
    // set_id, skus, session_id, pincode
    // console.log(name);
    // console.log(skus);
    const { dispatch } = this.context.store;
    dispatch(addToCartCombined(setId, simpleSKUS, session, selectedPincode));
  };
  toggleShowMoreColorProducts = () => {
    this.setState({
      showmorecolorproducts: !this.state.showmorecolorproducts
    });
  };

  render() {
    const {
      product,
      pincode,
      session,
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
      combinedbuy,
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
    const checkSpecialPrice = Number(specialPrice) || Number(price);
    const { adding, added } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const offerImageRedirect = simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore, showmorecolorproducts } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
    const { main_material: material, color, category_type: productType } = gattributes;
    const productURL = `${SITE_URL}${formatProductURL(name, sku)}`;
    const productDescription = productMetaDescription(name, productType, material, color);

    return (
      <Box py={30}>
        <Helmet>
          <title>{productPageTitle(name)}</title>
          <meta name="keywords" content={productMetaKeywords(productType, material)} />
          <meta name="description" content={productDescription} />
          <meta property="og:url" content={productURL} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={name} />
          <meta property="og:description" content={productDescription} />
          <meta property="og:image" content={images && images.length > 0 && `${images[0].url}.jpg`} />
          <script type="application/ld+json">
            {`
                {
                  "@context" : "http://schema.org",
                  "@type" : "Product",
                  "url": "${productURL || ''}",
                  "name" : "${name || ''}",
                  "image" : ${images && images.length && images[0].url ? `["${images[0].url}.jpg"]` : []},
                  "description" : "${productDescription}",
                  "sku": "${sku || ''}",
                  "brand" : {
                    "@type" : "Brand",
                    "name" : "HomeTown",
                    "logo" : "https://www.hometown.in/media/cms/icon/10f08290963c2827c55880f5f82bcc5b.png"
                  },
                  "offers" : {
                    "@type" : "Offer",
                    "url": "${productURL || ''}",
                    "priceCurrency": "INR",
                    "price": "${checkSpecialPrice || ''}",
                    "availability": "https://schema.org/InStock"
                  }
                }
              `}
          </script>
        </Helmet>
        <Container>
          <Row mb={30}>
            <Col>
              <BreadCrumb breadcrumbs={breadcrumbs} />
            </Col>
          </Row>
          <Row>
            {/* Left Column */}
            <Col width={[1, 1, 7 / 12]}>
              {/* Product Slider */}
              {images && <ProductDetailsCarousel data={images} title={meta.name} />}

              {/* Wishlist Button */}
              <WishListButton
                onClick={onClickWishList(
                  sku,
                  wishListData,
                  wishlistToggle,
                  isLoggedIn,
                  this.handleLoginModal,
                  addToWaitList,
                  simpleSku,
                  pincode.selectedPincode
                )}
                isWishList={isInWishList(wishList, sku)}
                wishlistLoading={isInWishList(loadingList, sku)}
              />
            </Col>
            {/* Right Column */}
            <Col width={[1, 1, 5 / 12]}>
              <div id="portal" className="portal" />
              {/* Product title and price */}
              <TitlePrice
                name={name}
                price={formatAmount(price)}
                discPrice={formatAmount(checkSpecialPrice)}
                savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice) || '')}
                savingsPercentage={calculateDiscount(price, checkSpecialPrice)}
                ratings={rating}
                count={count}
                marginTop="1rem"
                onClickReviews={this.onClickReviews}
              />
              {/* Product Share */}
              {/* <ShareBar title={name} url={productURL} mt={10} /> */}

              {/* Color Options */}
              <Box py={30}>
                {colorproducts.length > 0 && (
                  <Fragment>
                    <Heading fontSize="1em" color="textDark" fontFamily="medium" mb={15}>
                      Color Options
                    </Heading>
                    <ColorOption
                      data={colorproducts}
                      showmorecolorproducts={showmorecolorproducts}
                      toggleShowMoreColorProducts={this.toggleShowMoreColorProducts}
                    />
                  </Fragment>
                )}
              </Box>

              {/* Pincode and EMI options */}
              <ServiceDetails
                deliverBy={
                  (deliveryInfo && deliveryInfo[0] && deliveryInfo[0].value) ||
                  (deliveryDetails[0] && deliveryDetails[0] && deliveryDetails[0].value) ||
                  ''
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

              {/* Offers */}
              <Box>
                {combinedbuy.length ? (
                  <Button className={styles.seeAllCombine} btnType="link" p={0} fontSize="1rem" color="#f98d29">
                    <a href="#combined_buy_offers">
                      {`See ${combinedbuy.length} Combined ${combinedbuy.length > 1 ? 'Offers' : 'Offer'}`}
                    </a>
                  </Button>
                ) : (
                  ''
                )}
                {offerImage && offerImageRedirect && (
                  <a target="_blank" rel="noopener noreferrer" href={offerImageRedirect}>
                    <Image src={offerImage} alt="" width="100%" mt={0} marginBottom="0.625rem" />
                  </a>
                )}
                {offerImage && !offerImageRedirect && (
                  <Image src={offerImage} alt="" width="100%" mt={0} marginBottom="0.625rem" />
                )}
              </Box>

              {/* Add to cart and Buy now buttons */}
              <Row>
                <Col variant="col-6">
                  <AddToCart
                    simpleSku={simpleSku}
                    sku={sku}
                    itemId={sku}
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                </Col>
                <Col variant="col-6">
                  <BuyNow
                    simpleSku={simpleSku}
                    sku={sku}
                    size="block"
                    btnType="primary"
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                </Col>
              </Row>

              <Row>
                {/* Description */}
                {description && (
                  <ProductDesc desc={description || ''} showmore={showmore} toggleShowMore={this.toggleShowMore} />
                )}

                {/* Specifications */}
                <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />

                {/* Video */}
                {groupedattributes && groupedattributes.youtubeid && (
                  <Row>
                    <Col variant="col-12">
                      <Video id={getVideoID(groupedattributes.youtubeid)} />
                    </Col>
                  </Row>
                )}

                {/* Review List and Add review */}
                <Box ref={this.reviewsRef}>
                  <Reviews variant="col-12" reviewItems={reviews.data} pr="2.5rem" />
                  <AddReview
                    variant="col-8"
                    catalogId={groupedattributes.id_catalog_config}
                    loaded
                    onClickSubmit={this.addReview}
                    adding={adding}
                    added={added}
                    toggleReview={toggleReviewBox}
                  />
                </Box>
              </Row>
            </Col>
          </Row>

          {/* Combined Offers */}
          <Row>
            <Col variant="col-12">
              {combinedbuy.length > 0 && (
                <Section mb={0}>
                  <Row id="combined_buy_offers">
                    <Container pr="0" pl="0" className={styles.combinedProductsWrapper}>
                      <Heading
                        textAlign="left"
                        fontSize="20px"
                        marginTop="0 !important"
                        marginBottom="5px !important"
                        color="primary"
                        fontFamily="light"
                      >
                        Combined Offers
                      </Heading>
                    </Container>
                  </Row>
                  {combinedbuy.map((item, index) => (
                    <Row key={String(index)} display="block" pt={0} mt={0} mb={0}>
                      <CombinedBuy
                        pb={32}
                        title={item.name}
                        item={item}
                        data={getProductsList(item.products || [])}
                        length={item.products.length}
                        price={item.total_price}
                        setDiscount={item.discount ? Number(item.discount) : 0}
                        discountedPrice={item.total_price_after_discount}
                        handleCombinedBuy={() => this.handleCombinedBuy(item, pincode, session)}
                      />
                    </Row>
                  ))}
                </Section>
              )}

              {/* Related Products List */}
              {relatedproductsList.length > 0 && (
                <Row display="block" paddingTop="0.5rem" marginTop="2.5rem" mb={0} mr={0}>
                  <ProductCarousel
                    paddingTop="2.5rem"
                    title="Related Products"
                    data={relatedproductsList}
                    length={relatedproductsList.length}
                  />
                </Row>
              )}

              {/* Login modal */}
              <ResponsiveModal
                classNames={{ modal: 'loginModal' }}
                onCloseModal={this.handleLoginModal}
                open={this.state.openLogin}
              >
                <LoginModal />
              </ResponsiveModal>
            </Col>
          </Row>
        </Container>
      </Box>
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
  loadingList: [],
  combinedbuy: [],
  simpleSku: '',
  session: ''
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
  loadingList: PropTypes.array,
  simpleSku: PropTypes.string,
  combinedbuy: PropTypes.array,
  session: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
