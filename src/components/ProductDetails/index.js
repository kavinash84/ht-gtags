import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Helmet from "react-helmet";
import Select from "react-select";
import ReactStars from "react-stars";
import { withRouter } from "react-router";

/**
 * Modules / Utils / Reducers
 */
import { addReview, toggleReview } from "redux/modules/reviews";
import { toggleWishList, wishListWaitList } from "redux/modules/wishlist";
import { setProductPosition } from "redux/modules/productdetails";
import { getCombinedBuy } from "redux/modules/combinedbuy";
import { addToCartCombined, setQuantityFlag } from "redux/modules/cart";
import { formatAmount } from "utils/formatters";
import { calculateLowestEmi, getVideoID, formatProductURL } from "utils/helper";
import {
  productPageTitle,
  productMetaDescription,
  productMetaKeywords
} from "utils/seo";
import {
  groupedAttributes as getgroupedAttributes,
  getBreadCrumbs,
  getSimpleSku
} from "selectors/product";
import { getCartSKU } from "selectors/cart";
import { getSKUList } from "selectors/wishlist";
import { togglePopUp } from "redux/modules/webtochat";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";
import FormInput from "hometown-components-dev/lib/FormsHtV1/FormInputHtV1";
/**
 * Page Components
 */
// import Section from 'hometown-components-dev/lib/SectionHtV1';
// import UnbxdRecentlyViewed from 'components/UnbxdRecentlyViewed/UnbxdRecentlyViewed';
// import AddReview from 'hometown-components-dev/lib/ReviewsHtV1/WriteReview';
import ColorOption from "hometown-components-dev/lib/ProductDetailsHtV1/ColorOption";
import CombinedBuy from "components/CombinedBuy";
import ProductDesc from "hometown-components-dev/lib/ProductDetailsHtV1/ProductDesc";
import ProductCarousel from "components/ProductCarousel";
import ResponsiveModal from "components/Modal";
import ResponsiveVideoModal from "components/Modal/ResponsiveVideoModal";
import Reviews from "hometown-components-dev/lib/ReviewsHtV1";
import ReviewDisplay from "hometown-components-dev/lib/ReviewsHtV1/ReviewDisplay";
import ServiceDetails from "hometown-components-dev/lib/ProductDetailsHtV1/ServiceDetails";
// import EmiOptions from 'hometown-components-dev/lib/ProductDetailsHtV1/EmiOptions';
// import ShareBar from 'components/ShareBar';
import Specs from "hometown-components-dev/lib/ProductDetailsHtV1/Specs";
import TitlePrice from "hometown-components-dev/lib/ProductDetailsHtV1/TitlePrice";
import WishListButton from "hometown-components-dev/lib/WishlistButtonHtV1";
// import Section from 'hometown-components-dev/lib/SectionHtV1';
// import UnbxdRecentlyViewed from 'components/UnbxdRecentlyViewed/UnbxdRecentlyViewed';

import LoginModal from "containers/Login/LoginForm";
import AddToCart from "../AddToCart";
import BreadCrumb from "./BreadCrumb";
import BuyNow from "../BuyNow";
import EmiModal from "../EmiModal";
import Pincode from "./Pincode";
import ProductDetailsCarousel from "./Carousel";
import Video from "./Video";
import ReviewFilter from "./ReviewFilter";
// import UnbxdCompleteTheLook from './UnbxdCompleteTheLook';
import FreebieProduct from "./FreebieProduct";
import Stripes from "./PdpStripe";

import demoIcon from "../../../static/play-button.svg";

/**
 * Images / Icons
 */
const freeShippingIcon = require("../../../static/free-shipping.svg");
const warrentyIcon = require("../../../static/warrenty.svg");
const emiIcon = require("../../../static/emi.svg");
const fbIcon = require("../../../static/fb-pdp.svg");
const email = require("../../../static/email-pdp.svg");
const pinIcon = require("../../../static/pinterest-pdp.svg");

/**
 * styles
 */
const styles = require("./productIndex.scss");

const qtyOptions = sku => {
  if (sku.meta) {
    let qty = sku.meta.quantity;
    const options = [];
    if (qty > 5) qty = 5;

    for (let i = 1; i <= qty; i += 1) {
      options.push({ value: i, label: i });
    }
    return options;
  }
};

const customStyles = {
  control: () => ({
    width: "75px",
    display: "flex",
    borderRadius: "2px",
    border: "1px solid rgba(0, 0, 0, 0.25)"
  })
};

/**
 * Common Components
 */
const DescriptionButton = props => (
  <Col minWidth="auto">
    <div id={`${props.tab}`}>
      <Button
        variant="link"
        fontWeight={500}
        fontSize={16}
        py={20}
        color={props.active && "#fa6400"}
        textTransform="uppercase"
        sx={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
        {...props}
      />
    </div>
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
      updateQuantityFlag: setQuantityFlag,
      toggleWebToChat: togglePopUp
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
  cart,
  webtochat: { dismiss, pdpTimeout },
  paymentoptions
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
  skuItem: getCartSKU(cart, productdetails.productDescription.sku),
  dismiss,
  pdpTimeout,
  bflMinAmount: paymentoptions.bflMinAmount
});

const getSelectedColor = colors => {
  let activeColorName = "";
  colors.forEach(color => {
    if (color.activeColor === true) {
      activeColorName = color.meta.color_family;
    }
  });
  return activeColorName;
};

@withRouter
class ProductDetails extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    // this.reviewsRef = React.createRef();
    this.state = {
      openLogin: false,
      showmore: true,
      showmorecolorproducts: true,
      showmorecolorproductsCount: 5,
      activeSpec: "description",
      activeDescription: null,
      showReviews: 2,
      productQty: { value: 1, label: "1" },
      reviewDataSet: [],
      selectedFilter: null,
      filterChanged: false,
      colorProducts: [],
      isFurniture: false,
      popUpTimeoutId: null,
      name: "",
      rating: 0,
      review: "",
      nameError: false,
      nameErrorMessage: "Name cannot be left Blank",
      reviewError: false,
      reviewErrorMessage: "Review cannot be left Blank",
      addreview: false,
      openVideo: false
    };
    this.reviewRef = React.createRef();
  }
  componentDidMount() {
    const { dispatch } = this.context.store;
    const {
      // product,
      simpleSku,
      pincode: { selectedPincode },
      pdpTimeout
    } = this.props;

    // this.setDescriptionActive(product);
    this.hashLinkScroll();

    dispatch(getCombinedBuy(simpleSku, selectedPincode));
    const popUpTimeoutId = setTimeout(this.webToChat, pdpTimeout);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ popUpTimeoutId });
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
    this.isFurnitureTrue();
  }
  componentWillUnmount() {
    const { toggleWebToChat } = this.props;
    const { popUpTimeoutId } = this.state;
    clearTimeout(popUpTimeoutId);
    toggleWebToChat(false);
  }
  onFilterChange = Filter => {
    const { reviews } = this.props;
    const filterdData = [];
    reviews.data.forEach(review => {
      review.options.forEach(options => {
        if (Filter.value === "1-Star" && options.option_value === "1") {
          filterdData.push(review);
        } else if (Filter.value === "2-Star" && options.option_value === "2") {
          filterdData.push(review);
        } else if (Filter.value === "3-Star" && options.option_value === "3") {
          filterdData.push(review);
        } else if (Filter.value === "4-Star" && options.option_value === "4") {
          filterdData.push(review);
        } else if (Filter.value === "5-Star" && options.option_value === "5") {
          filterdData.push(review);
        } else if (Filter.value === "All-ratings") {
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
        behavior: "smooth"
      });
    } catch (e) {
      // window.scroll(0, this.reviewsRef.current.offsetTop);
    }
  };
  // setDescriptionActive = product => {
  //   const {
  //     attributes: { description }
  //   } = product;
  //   this.setState({ activeDescription: description });
  // };
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
  webToChat = () => {
    // const { dispatch } = this.context.store;
    const { toggleWebToChat, dismiss } = this.props;

    const {
      embedded_svc: {
        liveAgentAPI: { inviteButton: { isAvailable } = {} } = {}
      }
    } = window;
    if (isAvailable && !dismiss) toggleWebToChat(true);
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
    if (colorProducts.length > 0) {
      colorProducts = colorProducts.map(arr => ({
        ...arr,
        activeColor: false
      }));
      colorProducts.push({ ...product, activeColor: true });
      this.setState({ colorProducts });
    }
  };
  toggleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };
  handleCombinedBuy = (item, pincode, session) => {
    const { id_catalog_buildyourset: setId, skus } = item;
    const { selectedPincode } = pincode;
    const simpleSKUS = skus.map(val => ({
      simple_sku: val.sku,
      qty: Number(val.qty)
    }));
    // set_id, skus, session_id, pincode
    const { dispatch } = this.context.store;
    dispatch(addToCartCombined(setId, simpleSKUS, session, selectedPincode));
  };
  toggleShowMoreColorProducts = () => {
    const { colorProducts } = this.state;
    const { showmorecolorproductsCount } = this.state;
    this.setState({
      showmorecolorproducts: !this.state.showmorecolorproducts,
      showmorecolorproductsCount:
        showmorecolorproductsCount > 5
          ? 5
          : showmorecolorproductsCount + colorProducts.length
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

  isFurnitureTrue() {
    this.props.product.meta.category_details.forEach(cat => {
      if (cat.id === "131") {
        this.setState({ isFurniture: true });
      }
    });
  }

  toggleAddReview = e => {
    e.preventDefault();
    this.setState(
      {
        rating: 0,
        addreview: !this.state.addreview
      },
      () => {
        if (this.state.addreview) {
          this.reviewRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
          // this.reviewRef.current.focus();
        }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      product: {
        groupedattributes: { id_catalog_config: catalogId }
      }
    } = this.props;
    const { name, review, rating } = this.state;
    const nameError = !(name.length > 0);
    const reviewError = !(review.length > 0);
    if (nameError || reviewError) {
      return this.setState({
        nameError,
        reviewError
      });
    }
    this.setState({
      addreview: !this.state.addreview,
      name: "",
      review: ""
    });

    this.addReview(catalogId, { name, rating, review });
  };

  ratingChanged = newRating => {
    this.setState({
      rating: Number(newRating)
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Error`]: false
    });
  };

  hashLinkScroll = () => {
    const { hash } = window.location;
    const {
      product: {
        attributes: {
          return: returnAndCancel,
          product_warranty: productWarranty,
          care_label: careLabel,
          description
        }
      }
    } = this.props;
    let id = hash.replace("#", "");
    const tabElement = {
      "return-and-cancellation": {
        tableName: "return",
        tabComponent: returnAndCancel
      },
      "service-assurance-warranty": {
        tableName: "warranty",
        tabComponent: productWarranty
      },

      "product-care-instructions": {
        tableName: "care",
        tabComponent: careLabel
      },
      details: {
        tableName: "details",
        tabComponent: description
      },
      description: {
        tableName: "description",
        tabComponent: description
      }
    };
    if (hash !== "" && tabElement[`${id}`]) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element)
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });
      }, 3000);
      console.log(id, tabElement[`${id}`], "id for tabElement");
      this.setState({
        activeSpec: tabElement[`${id}`].tableName,
        activeDescription: tabElement[`${id}`].tabComponent
      });
    } else {
      id = "description";
      this.setState({
        activeSpec: tabElement[`${id}`].tableName,
        activeDescription: tabElement[`${id}`].tabComponent
      });
    }
  };

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
      ))
    );
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
      // toggleReviewBox,
      deliveryDateLoading,
      gattributes,
      breadcrumbs,
      combinedbuy,
      loadingList,
      quantityChange,
      skuItem,
      bflMinAmount
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
      showmorecolorproductsCount,
      addreview,
      nameError,
      nameErrorMessage,
      reviewError,
      reviewErrorMessage,
      // name,
      review
    } = this.state;
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
      reviews: { count, rating },
      bogo_bundle: bogoBundle,
      free_visit: freeVisit = "no",
      free_installation: freeInstallation = "no"
    } = product;
    // const { brand: ProductBrand } = meta;
    const {
      // color: ProductColor,
      description,
      demo_product: demoProduct = {},
      // main_material: productMainMaterial,
      return: returnAndCancel,
      product_height: height,
      product_width: width,
      product_depth: depth,
      care_label: careLabel,
      product_warranty: productWarranty

      // family_name: familyName,
      // product_depth: productDepth,
      // product_height: productHeight,
      // product_weight: productWeight,
      // product_width: productWidth,
      // sku_supplier_config: skuSupplierConfig
    } = attributes;
    const simpleSku = Object.keys(simples)[0];
    const {
      name,
      brand,
      price,
      ht_wallet_cashback = null,
      special_price: specialPriceEmi,
      config_id: configId,
      dimension_image: dimensionImage,
      warranty_period: warrantyPeriod = 0,
      fk_catalog_supplier: fkCatalogSupplier = null,
      categories
    } = meta;
    const {
      offer_discount_percentage: offerDiscountPercentage,
      coupon_code: couponCode,
      offer_price: offerPrice,
      special_price: specialPrice,
      retail_discount: retailDiscount,
      total_savings: totalSavings,
      limited_time_coupon_discount: limitedTimeCouponDiscount,
      total_discount_percentage: totalDiscountPercentage,
      mrp: maxPrice,
      discount_type: discountType
    } = pricingDetails;

    const checkSpecialPrice = Number(specialPriceEmi) || Number(price);
    // const { adding, added, data: reviewsData = [] } = reviews;
    const { data: reviewsData = [] } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const offerImageRedirect =
      simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore, showmorecolorproducts } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
    const {
      main_material: material,
      color,
      category_type: productType
    } = gattributes;
    const productURL = `${SITE_URL}${formatProductURL(name, sku)}`;
    const productDescription = productMetaDescription(
      name,
      productType,
      material,
      color
    );
    const weightedRating = this.getWeightedAverageRatings();
    const isFurnitureStripe = categories.split("|").includes("131");
    const uspWarranty = `${warrantyPeriod} Warranty`;
    return (
      <div>
        <Box pt={30}>
          <Helmet>
            <title>{productPageTitle(name)}</title>
            <meta
              name="keywords"
              content={productMetaKeywords(productType, material)}
            />
            <meta name="description" content={productDescription} />
            <meta property="og:url" content={productURL} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={name} />
            <meta property="og:description" content={productDescription} />
            <meta
              property="og:image"
              content={images && images.length > 0 && `${images[0].url}.jpg`}
            />
            <script type="application/ld+json">
              {`
                {
                  "@context" : "http://schema.org",
                  "@type" : "Product",
                  "url": "${productURL || ""}",
                  "name" : "${name.replace(/['"]+/g, "")}",
                  "image" : ${
                    images && images.length && images[0].url
                      ? `["${images[0].url}.jpg"]`
                      : []
                  },
                  "description" : "${productDescription.replace(/['"]+/g, "")}",
                  "sku": "${sku || ""}",
                  "brand" : {
                    "@type" : "Brand",
                    "name" : "HomeTown",
                    "logo" : "https://www.hometown.in/media/cms/icon/10f08290963c2827c55880f5f82bcc5b.png"
                  },
                  "offers" : {
                    "@type" : "Offer",
                    "url": "${productURL || ""}",
                    "priceCurrency": "INR",
                    "price": "${checkSpecialPrice || ""}",
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
                <Box sx={{ position: "relative" }}>
                  {/* Product Slider */}
                  {images && (
                    <ProductDetailsCarousel data={images} title={meta.name} />
                  )}

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
                  brand={brand}
                  couponCode={couponCode}
                  discountType={discountType}
                  offerDiscountPercentage={offerDiscountPercentage}
                  limitedTimeCouponDiscount={limitedTimeCouponDiscount}
                  maxPrice={maxPrice}
                  offerPrice={offerPrice}
                  totalSavings={totalSavings}
                  specialPrice={specialPrice}
                  totalDiscountPercentage={totalDiscountPercentage}
                  retailDiscount={retailDiscount}
                  ratings={rating}
                  count={count}
                  marginTop="1rem"
                  onClickReviews={this.onClickReviews}
                />

                {/* PDP Strip Icons */}
                <Stripes
                  emi={formatAmount(calculateLowestEmi(emidata, price))}
                  isEmiAvailable={isEmiAvailable}
                  warrantyPeriod={warrantyPeriod}
                  fkCatalogSupplier={fkCatalogSupplier}
                  brand={brand}
                  freeVisit={freeVisit}
                  freeInstallation={freeInstallation}
                  isFurnitureStripe={isFurnitureStripe}
                >
                  <EmiModal
                    price={formatAmount(checkSpecialPrice)}
                    data={emidata}
                    key="emi"
                    specialPrice={checkSpecialPrice}
                    bflMinAmount={bflMinAmount}
                  />
                </Stripes>
                {/* discount text */}
                <div ht_wallet_cashback={ht_wallet_cashback}>
                  {ht_wallet_cashback ? (
                    <div
                      style={{
                        color: "#E9916B",
                        fontSize: "16px",
                        paddingTop: "15px"
                      }}
                    >
                      Extra 10% HT wallet cashback
                    </div>
                  ) : null}
                </div>
                {/* Pincode */}
                <ServiceDetails
                  deliverBy={
                    (deliveryInfo &&
                      deliveryInfo[0] &&
                      deliveryInfo[0].value) ||
                    (deliveryDetails[0] &&
                      deliveryDetails[0] &&
                      deliveryDetails[0].value) ||
                    ""
                  }
                  emiStarting={formatAmount(calculateLowestEmi(emidata, price))}
                  shipping={checkSpecialPrice}
                  isEmiAvailable={isEmiAvailable}
                  pincode={pincode.selectedPincode}
                  loading={deliveryDateLoading}
                  shippingCharge={meta.shipping_charge}
                >
                  <Pincode key="pincode" />
                </ServiceDetails>

                {/* Reviews */}
                {!!weightedRating && reviewsData.length ? (
                  <div style={{ display: "flex" }}>
                    <ReviewDisplay
                      pr="5px"
                      ratings={weightedRating}
                      reviews={reviewsData.length}
                      count={5}
                      pb={20}
                      justifyContent="flex-start"
                      sx={{ borderBottom: "none" }}
                    />
                    <a
                      variant="linkPrimary"
                      href="#review-section"
                      style={{
                        cursor: "default"
                      }}
                    >
                      <Label
                        mr={5}
                        color="primary"
                        fontFamilly="medium"
                        fontSize={14}
                        sx={{ cursor: "pointer" }}
                      >
                        {`Review${reviewsData.length !== 1 ? "s " : " "} `}
                      </Label>
                    </a>
                    <Box>
                      <a
                        variant="linkPrimary"
                        href="#review-section"
                        onClick={this.toggleAddReview}
                        ml={10}
                        sx={{
                          borderLeft: "primary"
                        }}
                        style={{
                          color: "#f15a22",
                          fontSize: "14px"
                        }}
                      >
                        {" |"} Write a Review
                      </a>
                    </Box>
                  </div>
                ) : (
                  <Box pb={20}>
                    <a
                      variant="linkPrimary"
                      href="#review-section"
                      onClick={this.toggleAddReview}
                      sx={{
                        borderLeft: "primary"
                      }}
                      style={{ color: "#f15a22" }}
                    >
                      Write a Review
                    </a>
                  </Box>
                )}

                {/* Color Options */}
                {colorProducts.length > 0 && (
                  <Box pb={15}>
                    <Heading
                      fontSize="1em"
                      color="textDark"
                      fontFamily="medium"
                      fontWeight="normal"
                      mb={15}
                    >
                      Color Options: {getSelectedColor(colorProducts)}
                    </Heading>
                    <ColorOption
                      data={colorProducts}
                      showmorecolorproducts={showmorecolorproducts}
                      toggleShowMoreColorProducts={
                        this.toggleShowMoreColorProducts
                      }
                      currentlySelectedProductSku={product.sku}
                      showmorecolorproductsCount={showmorecolorproductsCount}
                    />
                  </Box>
                )}
                {bogoBundle && bogoBundle.name && (
                  <Row
                    display="block"
                    mb="0"
                    mr="0.9375rem"
                    ml="0.9375rem"
                    className={styles.freebieProduct}
                  >
                    <FreebieProduct bogoBundle={bogoBundle} />
                  </Row>
                )}

                {/* Quantity */}
                <Flex alignItems="center">
                  <Text fontFamily="regular" mr={10}>
                    Qty.
                  </Text>
                  <Select
                    placeholder=""
                    options={qtyOptions(simples[simpleSku])}
                    value={
                      qtyOptions(simples[simpleSku]).length > 0
                        ? productQty
                        : { value: 0, label: "0" }
                    }
                    defaultValue={1}
                    styles={customStyles}
                    isDisabled={
                      !(
                        simples[simpleSku].meta.quantity &&
                        parseInt(simples[simpleSku].meta.quantity, 10) > 0
                      )
                    }
                    onChange={({ value }) => {
                      this.handleSelectQty(value);
                    }}
                  />
                </Flex>
                {/* Offers */}
                {
                  <Box mb={20} mt={10}>
                    {combinedbuy.length ? (
                      <Button
                        variant="link"
                        fontFamily="medium"
                        fontSize={18}
                        mb={15}
                      >
                        <a
                          href="#combined_buy_offers"
                          style={{ color: "#F15A22" }}
                        >
                          {`See ${combinedbuy.length} Combined ${
                            combinedbuy.length > 1 ? "Offers" : "Offer"
                          }`}
                        </a>
                      </Button>
                    ) : (
                      ""
                    )}

                    {offerImage && offerImageRedirect && (
                      <a rel="noopener noreferrer" href={offerImageRedirect}>
                        <Image src={offerImage} alt="" width="100%" />
                      </a>
                    )}
                    {offerImage && !offerImageRedirect && (
                      <Image src={offerImage} alt="" width="100%" />
                    )}
                  </Box>
                }
                {demoProduct === "1" ? (
                  <Row ml="0" mr="0" mb="15px" mt="-10px" alignItems="center">
                    <Image
                      src={demoIcon}
                      alt="Schedule you virtual live demo"
                      width="24px"
                      mr="10px"
                    />
                    <Text fontSize="14px" color="secondary" display="contents">
                      Available for demo on the Cart page
                    </Text>
                  </Row>
                ) : null}

                {/* Add to cart and Buy now buttons */}
                <Row mx={-10}>
                  <Col variant="col-6" px={10}>
                    <AddToCart
                      skuItem={skuItem}
                      quantityChange={quantityChange}
                      quantity={productQty.value || 1}
                      simpleSku={simpleSku}
                      sku={sku}
                      configId={configId}
                      itemId={sku}
                      isSoldOut={
                        !(
                          simples[simpleSku].meta.quantity &&
                          parseInt(simples[simpleSku].meta.quantity, 10) > 0
                        )
                      }
                    />
                  </Col>
                  <Col variant="col-6" px={10}>
                    <BuyNow
                      quantity={productQty.value || 1}
                      simpleSku={simpleSku}
                      sku={sku}
                      isSoldOut={
                        !(
                          simples[simpleSku].meta.quantity &&
                          parseInt(simples[simpleSku].meta.quantity, 10) > 0
                        )
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
                    href={`mailto:?subject=${productPageTitle(
                      name
                    )}&body=${productURL}`}
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
                  borderTop: "dividerBold",
                  borderBottom: "dividerBold",
                  overflow: "auto",
                  flexWrap: "nowrap",
                  justifyContent: "flex-start"
                }}
              >
                <DescriptionButton
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      activeSpec: "description",
                      activeDescription: description
                    });
                  }}
                  active={activeSpec === "description"}
                  tab={"description"}
                >
                  DESCRIPTION
                </DescriptionButton>
                <DescriptionButton
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      activeSpec: "details",
                      activeDescription: description
                    });
                  }}
                  active={activeSpec === "details"}
                  tab={"details"}
                >
                  DETAILS
                </DescriptionButton>
                {careLabel && (
                  <DescriptionButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        activeSpec: "care",
                        activeDescription: careLabel
                      });
                    }}
                    active={activeSpec === "care"}
                    tab={"product-care-instructions"}
                  >
                    PRODUCT CARE INSTRUCTIONS
                  </DescriptionButton>
                )}
                {productWarranty && (
                  <DescriptionButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        activeSpec: "warranty",
                        activeDescription: productWarranty
                      });
                    }}
                    active={activeSpec === "warranty"}
                    tab={"service-assurance-warranty"}
                  >
                    SERVICE ASSURANCE / WARRANTY
                  </DescriptionButton>
                )}
                {returnAndCancel && (
                  <DescriptionButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        activeSpec: "return",
                        activeDescription: returnAndCancel
                      });
                    }}
                    active={activeSpec === "return"}
                    tab={"return-and-cancellation"}
                  >
                    RETURN / CANCELLATION
                  </DescriptionButton>
                )}

                {this.renderAttributes(groupedAttributes)}
              </Row>

              {activeSpec === "details" ? (
                <Box
                  px="5%"
                  py="2%"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                  }}
                >
                  {groupedAttributes[0].Details.map(detail => {
                    // if (detail.label !== 'Note' && detail.label !== "What's in the box?") {
                    if (detail.label !== "Note" && detail.value) {
                      return (
                        <Row width="33%" pb={10}>
                          <Col
                            width={150}
                            fontWeight="bold"
                            fontSize={14}
                            lineHeight={1.4}
                          >
                            {detail.label}
                          </Col>
                          {detail.label !== "What's in the box?" ? (
                            <Col
                              width="calc(100% - 150px)"
                              fontSize={14}
                              lineHeight={1.25}
                            >
                              {detail.value}
                            </Col>
                          ) : (
                            <Col
                              mt="5px"
                              mb="5px"
                              itemProp="description"
                              fontSize="0.875rem"
                              dangerouslySetInnerHTML={{ __html: detail.value }}
                              lh="1.6"
                              color="rgba(0, 0, 0, 0.65)"
                              fontFamily="light"
                            />
                          )}
                        </Row>
                      );
                    }
                    return null;
                  })}
                </Box>
              ) : (
                <Box px="10%">
                  {description && (
                    <ProductDesc
                      desc={activeDescription || ""}
                      showmore={showmore}
                      toggleShowMore={this.toggleShowMore}
                    />
                  )}
                </Box>
              )}

              {/* Specifications */}
              <Specs
                activeSpec={activeSpec}
                specs={groupedAttributes}
                pincode={pincode.selectedPincode}
              />
              {/* Video */}
              {groupedattributes && groupedattributes.youtubeid && (
                // <Row my={30}>
                //   <Col variant="col-12">
                //     <Video id={getVideoID(groupedattributes.youtubeid)} />
                //   </Col>
                // </Row>
                <div style={{ display: "flex" }}>
                  <Button
                    onClick={() => this.setState({ openVideo: true })}
                    my={8}
                    sx={{
                      width: "60%",
                      margin: "auto"
                    }}
                  >
                    Watch video
                  </Button>
                </div>
              )}
              {/* Usps */}
              <Row
                my={40}
                width={["80%", "80%", "60%"]}
                justifyContent="space-between"
                mx="auto"
                flexWrap="nowrap"
              >
                {!meta.shipping_charge && (
                  <div style={{ margin: "auto" }}>
                    <UspCol src={freeShippingIcon} text="Free Shipping" />
                  </div>
                )}
                {isEmiAvailable && (
                  <div style={{ margin: "auto" }}>
                    <UspCol src={emiIcon} text="EMI Options" />
                  </div>
                )}
                {warrantyPeriod && warrantyPeriod !== "None" ? (
                  <div style={{ margin: "auto" }}>
                    <UspCol src={warrentyIcon} text={uspWarranty} />
                  </div>
                ) : null}
              </Row>

              {/* DIMENSIONS */}
              {/* { isFurnitureTrue()} */}
              {this.state.isFurniture && (height || width || depth) && (
                <Box py={20} sx={{ borderTop: "dividerLight" }}>
                  <Box textAlign="center" mb={30}>
                    <Text variant="regular" fontSize={16} pb={5}>
                      DIMENSIONS
                    </Text>
                    <Heading variant="heading.regular">
                      Will it fit in your room?
                    </Heading>
                  </Box>
                  <Box
                    p={15}
                    textAlign="center"
                    sx={{ border: "dividerLight" }}
                  >
                    {images && images.length > 2 ? (
                      <Image
                        src={
                          dimensionImage
                            ? `${dimensionImage}-zoom.jpg`
                            : `${images[2].url}-zoom.jpg`
                        }
                        alt=""
                      />
                    ) : (
                      <Image src={`${images[0].url}-zoom.jpg`} alt="" />
                    )}
                  </Box>
                  <Box>
                    <Row
                      variant="row.contentCenter"
                      mx={0}
                      sx={{
                        borderTop: "dividerBold",
                        borderBottom: "dividerBold",
                        padding: "20px 0",
                        marginTop: "30px",
                        justifyContent: "flex-start"
                      }}
                    >
                      <span className={styles.overolDimension}>
                        Overall Dimension{" "}
                        <span className={styles.dimensionUnit}>(Inches)</span>
                      </span>
                      <span className={styles.dimensionSpans}>
                        {width && `Width : ${this.mmToInchConvert(width)}" `}
                      </span>
                      <span className={styles.dimensionSpans}>
                        {depth && `Depth : ${this.mmToInchConvert(depth)}" `}
                      </span>
                      <span className={styles.dimensionSpans}>
                        {height && `Height : ${this.mmToInchConvert(height)}" `}
                      </span>
                    </Row>
                  </Box>
                </Box>
              )}

              {/* Complete the look */}
              {/* <UnbxdCompleteTheLook configId={configId} /> */}

              {/* Review List and Add review */}
              <Box id="review-section" pt={30} className={styles.reviewSection}>
                <Box textAlign="center" mb={30}>
                  <Heading variant="heading.regular">Reviews</Heading>
                </Box>
                {/* <AddReview
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
                addNewReview={addNewReview}
              >
                {reviewsData.length > 0 && (
                  <ReviewFilter selectedFilterProp={selectedFilter} onFilterChange={this.onFilterChange} />
                )}
              </AddReview> */}
                <div ref={this.reviewRef}>
                  <Box width={1}>
                    <ReviewDisplay
                      ratings={weightedRating}
                      reviews={reviewsData.length}
                      count={5}
                    >
                      {/* {children} */}
                      {reviewsData.length > 0 && (
                        <ReviewFilter
                          selectedFilterProp={selectedFilter}
                          onFilterChange={this.onFilterChange}
                        />
                      )}
                      <Button
                        display={["none", "block"]}
                        onClick={this.toggleAddReview}
                      >
                        Write a Review
                      </Button>
                    </ReviewDisplay>
                    {addreview && (
                      <form onSubmit={this.handleSubmit}>
                        <Box width={[1, 1, 5 / 12]}>
                          <Row alignItems="center" mx={0} mb={15}>
                            <Label mr={10}>Rating</Label>
                            <ReactStars
                              count={5}
                              onChange={this.ratingChanged}
                              size={20}
                              value={this.state.rating}
                              half={false}
                              color2="#ffd700"
                            />
                          </Row>
                          <Box>
                            <FormInput
                              label="Name"
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              feedBackError={nameError}
                              feedBackMessage={nameErrorMessage}
                              onChange={this.handleChange}
                              // ref={(nameInp) => this.myInp = nameInp}
                            />
                          </Box>
                          <Box marginBottom="0.3125rem">
                            <FormInput
                              type="textarea"
                              label="Review"
                              name="review"
                              placeholder="Review"
                              value={review}
                              feedBackError={reviewError}
                              feedBackMessage={reviewErrorMessage}
                              onChange={this.handleChange}
                              rows="3"
                              height={80}
                            />
                          </Box>
                          <Box>
                            <Button
                              type="submit"
                              btnType="primary"
                              size="large"
                              fontFamily="regular"
                              fontSize="0.875em"
                              height="42px"
                              lh="2"
                            >
                              SUBMIT
                            </Button>
                          </Box>
                        </Box>
                      </form>
                    )}
                  </Box>
                </div>
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
              <Box id="combined_buy_offers" pt={48}>
                <Box textAlign="center" mb={20}>
                  <Heading variant="heading.regular" sx={{ fontWeight: 400 }}>
                    Combined Offers
                  </Heading>
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
                      handleCombinedBuy={() =>
                        this.handleCombinedBuy(item, pincode, session)
                      }
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
                  title="RECOMMENDED FOR YOU"
                  data={relatedproductsList}
                  length={relatedproductsList.length}
                />
              </Row>
            )}

            {/* Unbxd Recently Viewed */}
            {/* <Section>
            <UnbxdRecentlyViewed />
          </Section> */}

            {/* Login modal */}
            <ResponsiveModal
              classNames={{ modal: "loginModal" }}
              onCloseModal={this.handleLoginModal}
              open={this.state.openLogin}
            >
              <Box py={32} px={32}>
                <LoginModal />
              </Box>
            </ResponsiveModal>
          </Container>
        </Box>
        <ResponsiveVideoModal
          classNames={{ modal: "videoModal" }}
          open={this.state.openVideo}
          onCloseModal={() => this.setState({ openVideo: false })}
        >
          <Row width="100%" height="100%" py={60}>
            <Col variant="col-12" px={40}>
              <Video id={getVideoID(groupedattributes.youtubeid)} />
            </Col>
          </Row>
        </ResponsiveVideoModal>
      </div>
    );
  }
}

ProductDetails.defaultProps = {
  dismiss: false,
  product: {},
  pincode: {},
  reviews: {},
  colorproducts: [],
  relatedproductsList: [],
  deliveryInfo: "",
  emidata: [],
  wishList: [],
  wishListData: [],
  deliveryDateLoading: false,
  loadingList: [],
  combinedbuy: [],
  simpleSku: "",
  quantityChange: false,
  skuItem: {},
  session: ""
  // catalogId: '',
  // onClickSubmit: () => {}
};
DescriptionButton.defaultProps = {
  tab: ""
};

DescriptionButton.propTypes = {
  // eslint-disable-next-line react/require-default-props
  active: PropTypes.string,
  tab: PropTypes.string
};
ProductDetails.propTypes = {
  toggleWebToChat: PropTypes.func.isRequired,
  dismiss: PropTypes.bool,
  pdpTimeout: PropTypes.number.isRequired,
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
  // toggleReviewBox: PropTypes.func.isRequired,
  updateQuantityFlag: PropTypes.func.isRequired,
  deliveryDateLoading: PropTypes.bool,
  breadcrumbs: PropTypes.array.isRequired,
  gattributes: PropTypes.object.isRequired,
  loadingList: PropTypes.array,
  simpleSku: PropTypes.string,
  combinedbuy: PropTypes.array,
  quantityChange: PropTypes.bool,
  skuItem: PropTypes.object,
  session: PropTypes.string,
  bflMinAmount: PropTypes.number.isRequired
  // onClickSubmit: PropTypes.func,
  // catalogId: PropTypes.any
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
