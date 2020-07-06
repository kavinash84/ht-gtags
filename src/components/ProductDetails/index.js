import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import Select from 'react-select';

/**
 * Modules / Utils / Reducers
 */
import { addReview, toggleReview } from 'redux/modules/reviews';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { getCombinedBuy } from 'redux/modules/combinedbuy';
import { addToCartCombined, setQuantityFlag } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import { calculateDiscount, calculateSavings, calculateLowestEmi, getVideoID, formatProductURL } from 'utils/helper';
import { productPageTitle, productMetaDescription, productMetaKeywords } from 'utils/seo';
import { groupedAttributes as getgroupedAttributes, getBreadCrumbs, getSimpleSku } from 'selectors/product';
import { getCartSKU } from 'selectors/cart';
import { getSKUList } from 'selectors/wishlist';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

/**
 * Page Components
 */
import AddReview from 'hometown-components-dev/lib/ReviewsHtV1/WriteReview';
import ColorOption from 'hometown-components-dev/lib/ProductDetailsHtV1/ColorOption';
// import CombinedBuy from 'components/CombinedBuy';
import ProductDesc from 'hometown-components-dev/lib/ProductDetailsHtV1/ProductDesc';
import ProductCarousel from 'components/ProductCarousel';
import ResponsiveModal from 'components/Modal';
import Reviews from 'hometown-components-dev/lib/ReviewsHtV1';
import ReviewDisplay from 'hometown-components-dev/lib/ReviewsHtV1/ReviewDisplay';
import ServiceDetails from 'hometown-components-dev/lib/ProductDetailsHtV1/ServiceDetails';
import EmiOptions from 'hometown-components-dev/lib/ProductDetailsHtV1/EmiOptions';
// import ShareBar from 'components/ShareBar';
import Specs from 'hometown-components-dev/lib/ProductDetailsHtV1/Specs';
import TitlePrice from 'hometown-components-dev/lib/ProductDetailsHtV1/TitlePrice';
import WishListButton from 'hometown-components-dev/lib/WishlistButtonHtV1';
import LoginModal from 'containers/Login/LoginForm';
import AddToCart from '../AddToCart';
import BreadCrumb from './BreadCrumb';
import BuyNow from '../BuyNow';
import EmiModal from '../EmiModal';
import Pincode from './Pincode';
import ProductDetailsCarousel from './Carousel';
import Video from './Video';

/**
 * Images / Icons
 */
const freeShippingIcon = require('../../../static/free-shipping.svg');
const warrentyIcon = require('../../../static/warrenty.svg');
const emiIcon = require('../../../static/emi.svg');
const fbIcon = require('../../../static/fb-pdp.svg');
const email = require('../../../static/email-pdp.svg');
const pinIcon = require('../../../static/pinterest-pdp.svg');

const qtyOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' }
];

const customStyles = {
  control: () => ({
    width: '75px',
    display: 'flex',
    borderRadius: '2px',
    border: '1px solid rgba(0, 0, 0, 0.25)'
  })
};

/**
 * Common Components
 */
const DescriptionButton = props => (
  <Col>
    <Button
      variant="link"
      fontWeight={500}
      fontSize={16}
      py={20}
      color={props.active && '#fa6400'}
      textTransform="uppercase"
      sx={{ textTransform: 'uppercase' }}
      {...props}
    />
  </Col>
);

const SocialButton = props => <Button variant="link" mr={15} {...props} />;

const UspCol = ({ src, text, ...props }) => (
  <Col {...props}>
    <Image src={src} alt={text} height={70} />
    <Text variant="primary.medium" pt={15} fontFamily="medium">
      {text}
    </Text>
  </Col>
);

UspCol.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const CompleteTheLookCol = ({ src, ...props }) => (
  <Col width={1 / 3} my={16} {...props}>
    <Image src={src} alt="" />
  </Col>
);

CompleteTheLookCol.propTypes = {
  src: PropTypes.string.isRequired
};

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
      toggleReviewBox: toggleReview,
      updateQuantityFlag: setQuantityFlag
    },
    dispatch
  );

// const getProductsList = products => {
//   const items = [];
//   products.forEach(item => {
//     const { set_qty: qty = 0 } = item;
//     for (let i = 0; i < qty; i += 1) {
//       items.push(item);
//     }
//   });
//   return items;
// };

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
  combinedbuy,
  cart
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
  simpleSku: getSimpleSku(productdetails),
  quantityChange: cart.quantityChange,
  skuItem: getCartSKU(cart, productdetails.productDescription.sku)
});

class ProductDetails extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.reviewsRef = React.createRef();
    this.state = {
      openLogin: false,
      showmore: true,
      showmorecolorproducts: true,
      activeSpec: 'description',
      showReviews: 2,
      productQty: { value: 1, label: '1' }
    };
  }
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
  getWeightedAverageRatings = () => {
    const {
      reviews: { data = [] }
    } = this.props;
    let ans = 0;
    if (data.length) {
      const newData = data.reduce((m, obj) => {
        const item = obj.options && obj.options.length ? obj.options[0] : {};
        const rating = item.option_value ? Number(item.option_value) : 0;
        if (rating && rating <= 5) {
          m[rating] = m[rating] ? m[rating] + 1 : 1;
        }
        return m;
      }, {});
      let total = 0;
      let weight = 0;
      Object.keys(newData).forEach(k => {
        total += newData[k];
        weight += Number(k) * newData[k];
      });
      ans = total && weight ? (weight / total).toFixed(1) : 0;
    }
    return Number(ans);
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
  showMoreReviews = () => {
    const { showReviews } = this.state;
    this.setState({ showReviews: showReviews + 4 });
  };
  handleSelectQty = qty => {
    this.setState({ productQty: { value: qty, label: qty } }, () => {
      const { updateQuantityFlag } = this.props;
      updateQuantityFlag(true);
    });
  };
  renderAttributes = items =>
    items.map((item, i) =>
      Object.keys(item).map(key => (
        <DescriptionButton
          onClick={e => {
            e.preventDefault();
            this.setState({ activeSpec: i });
          }}
          active={i === this.state.activeSpec}
        >
          {key}
        </DescriptionButton>
      )));
  render() {
    const {
      product,
      pincode,
      // session,
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
      loadingList,
      quantityChange,
      skuItem
    } = this.props;
    const { activeSpec, showReviews, productQty } = this.state;
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
    const {
 description, product_height: height, product_width: width, product_depth: depth
} = attributes;
    const simpleSku = Object.keys(simples)[0];
    const { name, price, special_price: specialPrice } = meta;
    const checkSpecialPrice = Number(specialPrice) || Number(price);
    const { adding, added, data: reviewsData = [] } = reviews;
    // const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    // const offerImageRedirect = simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore, showmorecolorproducts } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
    const { main_material: material, color, category_type: productType } = gattributes;
    const productURL = `${SITE_URL}${formatProductURL(name, sku)}`;
    const productDescription = productMetaDescription(name, productType, material, color);
    const weightedRating = this.getWeightedAverageRatings();
    return (
      <Box pt={30}>
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
                  "name" : "${name.replace(/['"]+/g, '')}",
                  "image" : ${images && images.length && images[0].url ? `["${images[0].url}.jpg"]` : []},
                  "description" : "${productDescription.replace(/['"]+/g, '')}",
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
          <Row mb={70}>
            {/* Left Column */}
            <Col width={[1, 1, 7 / 12]} pr={40}>
              <Box sx={{ position: 'relative' }}>
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
              </Box>
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
                mb={8}
                onClickReviews={this.onClickReviews}
              />

              {/* Product Share */}
              {/* <ShareBar title={name} url={productURL} mt={10} /> */}

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
              </ServiceDetails>

              {/* Reviews */}
              {!!weightedRating && reviewsData.length && (
                <ReviewDisplay
                  ratings={weightedRating}
                  reviews={reviewsData.length}
                  count={5}
                  pb={30}
                  justifyContent="flex-start"
                  sx={{ borderBottom: 'none' }}
                >
                  <Box pl={4}>
                    <a
                      variant="linkPrimary"
                      href="#review-section"
                      pl={10}
                      ml={10}
                      sx={{
                        borderLeft: 'primary'
                      }}
                      style={{ color: '#f15a22' }}
                    >
                      | Write a Review
                    </a>
                  </Box>
                </ReviewDisplay>
              )}

              {/* Color Options */}
              {colorproducts.length > 0 && (
                <Box pb={30}>
                  <Heading fontSize="1em" color="textDark" fontFamily="medium" mb={15}>
                    Color Options
                  </Heading>
                  <ColorOption
                    data={colorproducts}
                    showmorecolorproducts={showmorecolorproducts}
                    toggleShowMoreColorProducts={this.toggleShowMoreColorProducts}
                  />
                </Box>
              )}

              {/* Quantity */}
              <Flex alignItems="center">
                <Text fontFamily="regular" mr={10}>
                  Qty.
                </Text>
                <Select
                  placeholder=""
                  options={qtyOptions}
                  value={productQty}
                  defaultValue={1}
                  styles={customStyles}
                  onChange={({ value }) => {
                    this.handleSelectQty(value);
                  }}
                />
              </Flex>

              {/* EMI Options */}
              <EmiOptions
                emiStarting={formatAmount(calculateLowestEmi(emidata, price))}
                isEmiAvailable={isEmiAvailable}
              >
                <EmiModal price={formatAmount(checkSpecialPrice)} data={emidata} key="emi" />
              </EmiOptions>

              {/* Offers */}
              {
                <Box mb={30}>
                  {combinedbuy.length ? (
                    <Button variant="link" fontFamily="medium" fontSize={18}>
                      <a href="#combined_buy_offers">
                        {`See ${combinedbuy.length} Combined ${combinedbuy.length > 1 ? 'Offers' : 'Offer'}`}
                      </a>
                    </Button>
                  ) : (
                    ''
                  )}
                  {/*
                {offerImage && offerImageRedirect && (
                  <a rel="noopener noreferrer" href={offerImageRedirect}>
                    <Image src={offerImage} alt="" width="100%" />
                  </a>
                )}
                {offerImage && !offerImageRedirect && <Image src={offerImage} alt="" width="100%" />}
                */}
                </Box>
              }

              {/* Add to cart and Buy now buttons */}
              <Row mx={-10}>
                <Col variant="col-6" px={10}>
                  <AddToCart
                    skuItem={skuItem}
                    quantityChange={quantityChange}
                    quantity={productQty.value || 1}
                    simpleSku={simpleSku}
                    sku={sku}
                    itemId={sku}
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                </Col>
                <Col variant="col-6" px={10}>
                  <BuyNow
                    quantity={productQty.value || 1}
                    simpleSku={simpleSku}
                    sku={sku}
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                </Col>
              </Row>

              {/* Share on social media */}
              <Row mt={30} mx={0}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.facebook.com/sharer.php?u=${productURL}`}
                >
                  <SocialButton>
                    <Image src={fbIcon} alt="Facebook" />
                  </SocialButton>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://pinterest.com/pin/create/button/?url=${productURL}&description=${name}`}
                >
                  <SocialButton>
                    <Image src={pinIcon} alt="Pinterest" />
                  </SocialButton>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:?subject=${productPageTitle(name)}&body=${productURL}`}
                >
                  <SocialButton>
                    <Image src={email} alt="Mail" />
                  </SocialButton>
                </a>
              </Row>
            </Col>
          </Row>
          <Box>
            <Row
              variant="row.contentCenter"
              mx={0}
              sx={{
                borderTop: 'dividerBold',
                borderBottom: 'dividerBold'
              }}
            >
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'description' });
                }}
                active={activeSpec === 'description'}
              >
                DESCRIPTION
              </DescriptionButton>
              {this.renderAttributes(groupedAttributes)}
            </Row>

            {/* Description */}
            <Box sx={activeSpec !== 'description' ? { display: 'none' } : {}} px="10%">
              {description && (
                <ProductDesc desc={description || ''} showmore={showmore} toggleShowMore={this.toggleShowMore} />
              )}
            </Box>

            {/* Specifications */}
            <Specs activeSpec={activeSpec} specs={groupedAttributes} pincode={pincode.selectedPincode} />

            {/* Video */}
            {groupedattributes && groupedattributes.youtubeid && (
              <Row my={30}>
                <Col variant="col-12">
                  <Video id={getVideoID(groupedattributes.youtubeid)} />
                </Col>
              </Row>
            )}

            {/* Usps */}
            <Row mb={40} width="60%" justifyContent="space-between" mx="auto">
              <UspCol src={freeShippingIcon} text="Free Shipping" />
              <UspCol src={emiIcon} text="EMI Options" />
              <UspCol src={warrentyIcon} text="1 Year Warranty" />
            </Row>

            {/* DIMENSIONS */}
            {(height || width || depth) && (
              <Box py={20} sx={{ borderTop: 'dividerLight' }}>
                <Box textAlign="center" mb={30}>
                  <Text variant="regular" fontSize={16} pb={5}>
                    DIMENSIONS
                  </Text>
                  <Heading variant="heading.regular">Will it fit in your room?</Heading>
                </Box>
                <Box p={15} textAlign="center" sx={{ border: 'dividerLight' }}>
                  <Image src="https://www.hometown.in/media/product/89/2453/3-zoom.jpg" alt="" />
                </Box>
                <Box mt={36}>
                  <Text
                    variant="regular"
                    fontSize={16}
                    pb={20}
                    pt={20}
                    sx={{ borderTop: 'divider', borderBottom: 'divider' }}
                  >
                    {`
                    Overall Dimension (inches) :
                    ${width && `Width : ${width} `}
                    ${depth && `Depth : ${depth} `} 
                    ${height && `Height : ${height} `}
                  `}
                  </Text>
                </Box>
              </Box>
            )}

            {/* Complete the look */}
            <Box py={20}>
              <Box textAlign="center" mb={20}>
                <Heading variant="heading.regular">Complete the look</Heading>
              </Box>
              <Row textAlign="center" flexWrap="wrap">
                <CompleteTheLookCol src="https://www.hometown.in/media/cms/banner/cabinet.png" />
                <CompleteTheLookCol src="https://www.hometown.in/media/cms/banner/chair.png" />
                <CompleteTheLookCol src="https://www.hometown.in/media/cms/banner/curtain.png" />
                <CompleteTheLookCol src="https://www.hometown.in/media/cms/banner/painting.png" />
                <CompleteTheLookCol
                  width="190px"
                  height="190px"
                  marginTop="53px"
                  marginRight="104px"
                  marginLeft="93px"
                  src="https://www.hometown.in/media/cms/banner/pillow.png"
                />
                <CompleteTheLookCol src="https://www.hometown.in/media/cms/banner/table.png" />
              </Row>
            </Box>

            {/* Review List and Add review */}
            {!!reviewsData.length && (
              <Box id="review-section" pt={30}>
                <Box textAlign="center" mb={30}>
                  <Heading variant="heading.regular">Reviews</Heading>
                </Box>
                <AddReview
                  ratings={weightedRating}
                  reviews={reviewsData.length}
                  count={5}
                  variant="col-8"
                  catalogId={groupedattributes.id_catalog_config}
                  loaded
                  onClickSubmit={this.addReview}
                  adding={adding}
                  added={added}
                  toggleReview={toggleReviewBox}
                />
                <Reviews
                  variant="col-12"
                  reviewItems={reviews.data}
                  showReviews={showReviews}
                  showMoreReviews={this.showMoreReviews}
                />
              </Box>
            )}
          </Box>

          {/* Combined Offers */}
          {/* {combinedbuy.length > 0 && (
            <Box>
              <Row id="combined_buy_offers">
                <Container>
                  <Heading variant="heading.medium">Combined Offers</Heading>
                </Container>
              </Row>
              {combinedbuy.map((item, index) => (
                <Row key={String(index)}>
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
            </Box>
          )} */}

          {/* Related Products List */}
          {relatedproductsList.length > 0 && (
            <Row py={20}>
              <ProductCarousel
                paddingTop="2.5rem"
                title="Recommended for you"
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
  quantityChange: false,
  skuItem: {}
  // session: ''
};
DescriptionButton.propTypes = {
  // eslint-disable-next-line react/require-default-props
  active: PropTypes.string
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
  updateQuantityFlag: PropTypes.func.isRequired,
  deliveryDateLoading: PropTypes.bool,
  breadcrumbs: PropTypes.array.isRequired,
  gattributes: PropTypes.object.isRequired,
  loadingList: PropTypes.array,
  simpleSku: PropTypes.string,
  combinedbuy: PropTypes.array,
  quantityChange: PropTypes.bool,
  skuItem: PropTypes.object
  // session: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
