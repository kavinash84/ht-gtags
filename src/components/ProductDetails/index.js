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
import { calculateLowestEmi, getVideoID, formatProductURL } from 'utils/helper';
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
import CombinedBuy from 'components/CombinedBuy';
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
import ReviewFilter from './ReviewFilter';

/**
 * Images / Icons
 */
const freeShippingIcon = require('../../../static/free-shipping.svg');
const warrentyIcon = require('../../../static/warrenty.svg');
const emiIcon = require('../../../static/emi.svg');
const fbIcon = require('../../../static/fb-pdp.svg');
const email = require('../../../static/email-pdp.svg');
const pinIcon = require('../../../static/pinterest-pdp.svg');

/**
 * styles
 */
const styles = require('./productIndex.scss');

const qtyOptions = sku => {
  console.log('qtyOptions', sku);
  if (sku.meta) {
    let qty = sku.meta.quantity;
    const options = [];
    if (qty > 5) qty = 5;

    for (let i = 1; i <= qty; i += 1) {
      options.push({ value: i, label: i });
    }
    // console.log('QtyOption', options, qty);
    return options;
  }
};

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
  <Col minWidth="auto">
    <Button
      variant="link"
      fontWeight={500}
      fontSize={16}
      py={20}
      color={props.active && '#fa6400'}
      textTransform="uppercase"
      sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
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

const getSelectedColor = colors => {
  let activeColorName = '';
  colors.forEach(color => {
    if (color.activeColor === true) {
      activeColorName = color.meta.color_family;
    }
  });
  return activeColorName;
};

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
      showmorecolorproductsCount: 5,
      activeSpec: 'description',
      activeDescription: null,
      showReviews: 2,
      productQty: { value: 1, label: '1' },
      reviewDataSet: [],
      selectedFilter: null,
      filterChanged: false,
      colorProducts: []
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
    const { colorproducts } = this.props;
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
    if (nextProps.colorproducts !== colorproducts) {
      this.addProductToColorProduct(nextProps.colorproducts);
    }
  }
  onFilterChange = Filter => {
    const { reviews } = this.props;
    const filterdData = [];
    reviews.data.forEach(review => {
      review.options.forEach(options => {
        if (Filter.value === '1-Star' && options.option_value === '1') {
          filterdData.push(review);
        } else if (Filter.value === '2-Star' && options.option_value === '2') {
          filterdData.push(review);
        } else if (Filter.value === '3-Star' && options.option_value === '3') {
          filterdData.push(review);
        } else if (Filter.value === '4-Star' && options.option_value === '4') {
          filterdData.push(review);
        } else if (Filter.value === '5-Star' && options.option_value === '5') {
          filterdData.push(review);
        } else if (Filter.value === 'All-ratings') {
          filterdData.push(review);
        }
      });
    });
    this.setState({
      filterChanged: true,
      selectedFilter: Filter,
      reviewDataSet: filterdData
    });
  };
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
  addProductToColorProduct = colorProducts => {
    const { product } = this.props;
    colorProducts = colorProducts.map(arr => ({ ...arr, activeColor: false }));
    colorProducts.push({ ...product, activeColor: true });
    this.setState({ colorProducts }, () => console.log(colorProducts, 'colorProducts'));
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
    const { colorProducts } = this.state;
    const { showmorecolorproductsCount } = this.state;
    this.setState({
      showmorecolorproducts: !this.state.showmorecolorproducts,
      showmorecolorproductsCount: showmorecolorproductsCount > 5 ? 5 : showmorecolorproductsCount + colorProducts.length
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
  mmToInchConvert = value => Math.round(value / 25.4);

  renderAttributes = items => {
    items.map((item, i) =>
      Object.keys(item).map(key => (
        <DescriptionButton
          key={String(i)}
          onClick={e => {
            e.preventDefault();
            this.setState({ activeSpec: i });
          }}
          active={i === this.state.activeSpec}
        >
          {key}
        </DescriptionButton>
      )));
  };
  render() {
    const {
      product,
      pincode,
      session,
      reviews,
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
    const {
      activeSpec,
      showReviews,
      productQty,
      colorProducts,
      selectedFilter,
      filterChanged,
      activeDescription,
      reviewDataSet,
      showmorecolorproductsCount
    } = this.state;
    console.log(colorProducts, 'colorProducts');
    const {
      meta,
      images,
      simples,
      attributes,
      pricing_details: pricingDetails,
      delivery_details: deliveryDetails,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes,
      reviews: { count, rating }
    } = product;
    const { brand: ProductBrand } = meta;
    const {
      color: ProductColor,
      description,
      main_material: productMainMaterial,
      return: returnAndCancel,
      product_height: height,
      product_width: width,
      product_depth: depth,
      care_label: careLabel,
      product_warranty: productWarranty,

      family_name: familyName,
      product_depth: productDepth,
      product_height: productHeight,
      product_weight: productWeight,
      product_width: productWidth,
      sku_supplier_config: skuSupplierConfig
    } = attributes;
    const simpleSku = Object.keys(simples)[0];
    const {
 name, price, special_price: specialPrice, offer_details: offerDetails
} = meta;
    const { coupon_code: couponCode, offer_price: couponOfferPrice } = offerDetails;
    const {
      offer_price: offerPrice,
      retail_discount: retailDiscount,
      total_savings: totalSavings,
      limited_time_coupon_discount: limitedTimeCouponDiscount,
      total_discount_percentage: totalDiscountPercentage,
      mrp: maxPrice
    } = pricingDetails;

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
          <Row mb={15}>
            <Col>
              <BreadCrumb breadcrumbs={breadcrumbs} />
            </Col>
          </Row>
          <Row mb={40}>
            {/* Left Column */}
            <Col width={[1, 6 / 12, 6 / 12, 7 / 12]} pr={40}>
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
            <Col width={[1, 6 / 12, 6 / 12, 5 / 12]}>
              <div id="portal" className="portal" />
              {/* Product title and price */}
              <TitlePrice
                name={name}
                price={offerPrice}
                discPrice={formatAmount(checkSpecialPrice)}
                maxPrice={maxPrice}
                couponCode={couponCode}
                couponOfferPrice={couponOfferPrice}
                totalDiscountPercentage={totalDiscountPercentage}
                retailDiscount={retailDiscount}
                totalSavings={totalSavings}
                limitedTimeCouponDiscount={limitedTimeCouponDiscount}
                ratings={rating}
                count={count}
                marginTop="1rem"
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
              {!!weightedRating && reviewsData.length ? (
                <ReviewDisplay
                  ratings={weightedRating}
                  reviews={reviewsData.length}
                  count={5}
                  pb={20}
                  justifyContent="flex-start"
                  sx={{ borderBottom: 'none' }}
                >
                  <Box>
                    <a
                      variant="linkPrimary"
                      href="#review-section"
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
              ) : (
                <Box pb={20}>
                  <a
                    variant="linkPrimary"
                    href="#review-section"
                    sx={{
                      borderLeft: 'primary'
                    }}
                    style={{ color: '#f15a22' }}
                  >
                    Write a Review
                  </a>
                </Box>
              )}

              {/* Color Options */}
              {colorProducts.length > 0 && (
                <Box pb={15}>
                  <Heading fontSize="1em" color="textDark" fontFamily="medium" mb={15}>
                    {/* TODO: @nikhil replace static color */}
                    Color Options: {getSelectedColor(colorProducts)}
                  </Heading>
                  <ColorOption
                    data={colorProducts}
                    showmorecolorproducts={showmorecolorproducts}
                    toggleShowMoreColorProducts={this.toggleShowMoreColorProducts}
                    currentlySelectedProductSku={product.sku}
                    showmorecolorproductsCount={showmorecolorproductsCount}
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
                  options={qtyOptions(simples[simpleSku])}
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
                <Box mb={20} mt={10}>
                  {combinedbuy.length ? (
                    <Button variant="link" fontFamily="medium" fontSize={18}>
                      <a href="#combined_buy_offers" style={{ color: '#F15A22' }}>
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
                borderBottom: 'dividerBold',
                overflow: 'auto',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start'
              }}
            >
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'description', activeDescription: description });
                }}
                active={activeSpec === 'description'}
              >
                DESCRIPTION
              </DescriptionButton>
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'details', activeDescription: description });
                }}
                active={activeSpec === 'details'}
              >
                DETAILS
              </DescriptionButton>
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'care', activeDescription: careLabel });
                }}
                active={activeSpec === 'care'}
              >
                PRODUCT CARE INSTRUCTIONS
              </DescriptionButton>
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'warranty', activeDescription: productWarranty });
                }}
                active={activeSpec === 'warranty'}
              >
                SERVICE ASSURANCE / WARRANTY
              </DescriptionButton>
              <DescriptionButton
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activeSpec: 'return', activeDescription: returnAndCancel });
                }}
                active={activeSpec === 'return'}
              >
                RETURN / CANCELLATION
              </DescriptionButton>
              {this.renderAttributes(groupedAttributes)}
            </Row>

            {/* Description */}
            {activeSpec === 'details' ? (
              <Box px="10%">
                <Row>
                  <Col>
                    <Row>
                      <Col>Brand</Col>
                      <Col>{ProductBrand}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>Family Name</Col>
                      <Col>{familyName}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>Colour</Col>
                      <Col>{ProductColor}</Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>Depth (mm)</Col>
                      <Col>{productDepth}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>Width (mm)</Col>
                      <Col>{productWidth}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>Height (mm)</Col>
                      <Col>{productHeight}</Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>Product Weight</Col>
                      <Col>{productWeight}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>Product main Material</Col>
                      <Col>{productMainMaterial}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>SKU</Col>
                      <Col>{skuSupplierConfig}</Col>
                    </Row>
                  </Col>
                </Row>
              </Box>
            ) : (
              <Box px="10%">
                {description && (
                  <ProductDesc
                    desc={activeDescription || ''}
                    showmore={showmore}
                    toggleShowMore={this.toggleShowMore}
                  />
                )}
              </Box>
            )}

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
            <Row mb={40} width={['80%', '80%', '60%']} justifyContent="space-between" mx="auto" flexWrap="nowrap">
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
                  <Image src={`${images[2].url}-zoom.jpg`} alt="" />
                </Box>
                <Box>
                  <Row
                    variant="row.contentCenter"
                    mx={0}
                    sx={{
                      borderTop: 'dividerBold',
                      borderBottom: 'dividerBold',
                      padding: '20px 0',
                      marginTop: '30px',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <span className={styles.overolDimension}>
                      Overall Dimension <span className={styles.dimensionUnit}>(Inches)</span>
                    </span>
                    <span className={styles.dimensionSpans}>{width && `Width : ${this.mmToInchConvert(width)}" `}</span>
                    <span className={styles.dimensionSpans}>{depth && `Depth : ${this.mmToInchConvert(depth)}" `}</span>
                    <span className={styles.dimensionSpans}>
                      {height && `Height : ${this.mmToInchConvert(height)}" `}
                    </span>
                  </Row>
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
            <Box id="review-section" pt={30} className={styles.reviewSection}>
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
              {reviewsData.length > 0 && (
                <Box mb={30}>
                  <ReviewFilter selectedFilterProp={selectedFilter} onFilterChange={this.onFilterChange} />
                </Box>
              )}
              <Reviews
                variant="col-12"
                reviewItems={filterChanged ? reviewDataSet : reviews.data}
                showReviews={showReviews}
                showMoreReviews={this.showMoreReviews}
              />
            </Box>
          </Box>
          {/* Combined Offers */}
          {combinedbuy.length > 0 && (
            <Box id="combined_buy_offers" pt={36}>
              <Box textAlign="center" mb={20}>
                <Heading variant="heading.regular">Combined Offers</Heading>
              </Box>
              {combinedbuy.map((item, index) => (
                <Row key={String(index)} mx={0}>
                  <CombinedBuy
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
          )}

          {/* Related Products List */}
          {relatedproductsList.length > 0 && (
            <Row py={36}>
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
            <Box py={32} px={32}>
              <LoginModal />
            </Box>
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
  skuItem: {},
  session: ''
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
  skuItem: PropTypes.object,
  session: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
