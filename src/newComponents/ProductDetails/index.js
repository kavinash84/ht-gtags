import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import WrapperHtV1 from 'hometown-components-dev/lib/WrapperHtV1';
import TitlePrice from 'hometown-components-dev/lib/ProductDetailsHtV1/TitlePrice';
import ColorOptionHtV1 from 'hometown-components-dev/lib/ProductDetailsHtV1/ColorOption';
import ServiceDetails from 'hometown-components-dev/lib/ProductDetailsHtV1/ServiceDetails';
import ProductDesc from 'hometown-components-dev/lib/ProductDetailsHtV1/ProductDesc';
import Specs from 'hometown-components-dev/lib/ProductDetailsHtV1/Specs';
import Reviews from 'hometown-components-dev/lib/ReviewsHtV1';
import AddReview from 'hometown-components-dev/lib/ReviewsHtV1/WriteReview';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import WishListButtonHtV1 from 'hometown-components-dev/lib/WishlistButtonHtV1';
import ProductCarousel from 'newComponents/ProductCarousel';
import CombinedBuy from 'newComponents/CombinedBuy';
import EmiModal from 'containers/EmiModal/EmiModal';
// import ResponsiveModal from 'components/Modal';
// import LoginModal from 'containers/Login/LoginForm';
import ShareBar from 'newComponents/ShareBar';
import { addReview, toggleReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi, getVideoID, formatProductURL } from 'utils/helper';
import { getSKUList } from 'selectors/wishlist';
import { groupedAttributes as getgroupedAttributes, getBreadCrumbs, getSimpleSku } from 'selectors/product';
import { getCombinedBuy } from 'redux/modules/combinedbuy';
import { addToCartCombined } from 'redux/modules/cart';
import { productPageTitle, productMetaDescription, productMetaKeywords } from 'utils/seo';
import ProductDetailsCarousel from './Carousel';
import BreadCrumb from './BreadCrumb';
import Pincode from './Pincode';
import AddToCart from '../AddToCart';
import BuyNow from '../BuyNow';
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
      <WrapperHtV1 type="block">
        <SectionHtV1 p="0" pb="2rem" mb="2.5rem" className={styles.pdpWrapper}>
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
          <ContainerHtV1 type="container" pr={0} pl={0}>
            <RowHtV1 display="block" margin="0">
              <BoxHtV1>
                <BoxHtV1 col="7" paddingTop="1.5rem" paddingRight="1rem" className={styles.pdpLeftWrapper}>
                  <BoxHtV1 col="12" className={styles.breadCrumbWrapper} marginBottom="1rem">
                    <BreadCrumb breadcrumbs={breadcrumbs} />
                  </BoxHtV1>
                  <BoxHtV1 col="12">{images && <ProductDetailsCarousel data={images} title={meta.name} />}</BoxHtV1>
                </BoxHtV1>
                <BoxHtV1 col="5" padding="1.5rem  0.3125rem 1rem 0.3125rem " className={styles.pdpRightWrapper}>
                  {/* <div id="portal" className="portal" /> */}
                  <BoxHtV1 className={styles.titleWrapper}>
                    <BoxHtV1 col="11" mt={0}>
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
                      <ShareBar title={name} url={productURL} mt={10} />
                    </BoxHtV1>
                    <BoxHtV1 col="1" mt={0}>
                      <WishListButtonHtV1
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
                    </BoxHtV1>
                    <RowHtV1 display="block" margin="0 0.9375rem 0 0.9375rem" className={styles.variationWrapper}>
                      {colorproducts.length > 0 && (
                        <SectionHtV1 marginBottom="0.3125rem" p={0} marginTop="1.25rem">
                          <RowHtV1 display="block" mr={0} ml={0}>
                            <HeadingHtV1
                              fontSize="1em"
                              color="textDark"
                              marginBottom="0.625rem"
                              mt={0}
                              fontFamily="medium"
                            >
                              Color Options
                            </HeadingHtV1>
                          </RowHtV1>
                          <ColorOptionHtV1
                            data={colorproducts}
                            showmorecolorproducts={showmorecolorproducts}
                            toggleShowMoreColorProducts={this.toggleShowMoreColorProducts}
                          />
                        </SectionHtV1>
                      )}
                    </RowHtV1>
                  </BoxHtV1>
                  <RowHtV1 display="block" margin="0.3125rem 0.9375rem 0 0.9375rem">
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
                  </RowHtV1>
                  {combinedbuy.length ? (
                    <RowHtV1 display="block" margin="-0.625rem 0 1.25rem 0.9375rem">
                      <BoxHtV1 col="12" pl={0} pr={0}>
                        <ButtonHtV1
                          className={styles.seeAllCombine}
                          btnType="link"
                          p={0}
                          fontSize="1rem"
                          color="#f98d29"
                        >
                          <a href="#combined_buy_offers">
                            {`See ${combinedbuy.length} Combined ${combinedbuy.length > 1 ? 'Offers' : 'Offer'}`}
                          </a>
                        </ButtonHtV1>
                      </BoxHtV1>
                    </RowHtV1>
                  ) : (
                    ''
                  )}
                  {offerImage && offerImageRedirect && (
                    <RowHtV1 display="block" margin="0 0.9375rem 0 0.9375rem">
                      <BoxHtV1 col="12" mt={0} paddingRight="0.3125rem">
                        <a target="_blank" rel="noopener noreferrer" href={offerImageRedirect}>
                          <ImageHtV1 src={offerImage} alt="" width="100%" mt={0} marginBottom="0.625rem" />
                        </a>
                      </BoxHtV1>
                    </RowHtV1>
                  )}
                  {offerImage && !offerImageRedirect && (
                    <RowHtV1 display="block" margin="0 0.9375rem 0 0.9375rem">
                      <BoxHtV1 col="12" mt={0} paddingRight="0.3125rem">
                        <ImageHtV1 src={offerImage} alt="" width="100%" mt={0} marginBottom="0.625rem" />
                      </BoxHtV1>
                    </RowHtV1>
                  )}
                  <RowHtV1 display="block" margin="0.625rem 0.9375rem 0.625rem 0.9375rem">
                    <BoxHtV1 col="6" mt={1} paddingRight="0.3125rem">
                      <AddToCart
                        simpleSku={simpleSku}
                        sku={sku}
                        itemId={sku}
                        size="block"
                        btnType="custom"
                        btnColor="#515151"
                        height="50px"
                        fontSize="16px"
                        isSoldOut={
                          !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                        }
                      />
                    </BoxHtV1>
                    <BoxHtV1 col="6" mt={0} paddingRight="0.3125rem">
                      <BuyNow
                        simpleSku={simpleSku}
                        sku={sku}
                        size="block"
                        btnType="primary"
                        isSoldOut={
                          !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                        }
                      />
                    </BoxHtV1>
                  </RowHtV1>
                  <RowHtV1 display="block" margin="0 0.9375rem 0.625rem 0.9375rem" />
                  <RowHtV1 display="block" margin="1.25rem 0 0">
                    {description && (
                      <ProductDesc desc={description || ''} showmore={showmore} toggleShowMore={this.toggleShowMore} />
                    )}
                    <Specs specs={groupedAttributes} pincode={pincode.selectedPincode} />
                    {groupedattributes && groupedattributes.youtubeid && (
                      <RowHtV1 display="block" margin="0 0.9375rem 0">
                        <BoxHtV1 col="12" mt={0} paddingRight="0.3125rem">
                          <Video id={getVideoID(groupedattributes.youtubeid)} />
                        </BoxHtV1>
                      </RowHtV1>
                    )}
                    <BoxHtV1 ref={this.reviewsRef}>
                      <Reviews col="12" reviewItems={reviews.data} paddingRight="2.5rem" />
                      <AddReview
                        col="8"
                        catalogId={groupedattributes.id_catalog_config}
                        loaded
                        onClickSubmit={this.addReview}
                        adding={adding}
                        added={added}
                        toggleReview={toggleReviewBox}
                      />
                    </BoxHtV1>
                  </RowHtV1>
                </BoxHtV1>
              </BoxHtV1>
            </RowHtV1>
          </ContainerHtV1>
        </SectionHtV1>

        {combinedbuy.length > 0 && (
          <SectionHtV1 mb={0}>
            <RowHtV1 id="combined_buy_offers">
              <ContainerHtV1 pr="0" pl="0" className={styles.combinedProductsWrapper}>
                <HeadingHtV1
                  textAlign="left"
                  fontSize="20px"
                  marginTop="0 !important"
                  marginBottom="5px !important"
                  color="primary"
                  fontFamily="light"
                >
                  Combined Offers
                </HeadingHtV1>
              </ContainerHtV1>
            </RowHtV1>
            {combinedbuy.map((item, index) => (
              <RowHtV1 key={String(index)} display="block" pt={0} mt={0} mb={0}>
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
              </RowHtV1>
            ))}
          </SectionHtV1>
        )}

        {relatedproductsList.length > 0 && (
          <RowHtV1 display="block" paddingTop="0.5rem" marginTop="2.5rem" mb={0} mr={0}>
            <ProductCarousel
              paddingTop="2.5rem"
              title="Related Products"
              data={relatedproductsList}
              length={relatedproductsList.length}
            />
          </RowHtV1>
        )}

        {/* <ResponsiveModal
          classNames={{ modal: 'loginModal' }}
          onCloseModal={this.handleLoginModal}
          open={this.state.openLogin}
        >
          <LoginModal />
        </ResponsiveModal> */}
      </WrapperHtV1>
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
