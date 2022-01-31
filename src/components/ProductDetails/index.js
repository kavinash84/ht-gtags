import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Helmet from "react-helmet";
import Select from "react-select";
import ReactStars from "react-stars";
import { withRouter } from "react-router";
import LazyLoad from "react-lazyload";
import SlickSlider from "../SlickSlider";

/**
 * Modules / Utils / Reducers
 */
import { addReview, toggleReview } from "redux/modules/reviews";
import { toggleWishList, wishListWaitList } from "redux/modules/wishlist";
import { setProductPosition } from "redux/modules/productdetails";
import { getCombinedBuy } from "redux/modules/combinedbuy";
import { addToCartCombined, setQuantityFlag } from "redux/modules/cart";
import { formatAmount } from "utils/formatters";
import { EMI_THRESHOLD } from "helpers/Constants";
import {
  calculateLowestEmi,
  getVideoID,
  formatProductURL,
  calculateTotalSavings,
  calculateDiscount,
  calculateSavings
} from "utils/helper";
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
import Div from "hometown-components-dev/lib/BoxHtV1";
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
import Section from "hometown-components-dev/lib/SectionHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";

/**
 * Page Components
 */
// import Section from 'hometown-components-dev/lib/SectionHtV1';
// import UnbxdRecentlyViewed from 'components/UnbxdRecentlyViewed/UnbxdRecentlyViewed';
// import AddReview from 'hometown-components-dev/lib/ReviewsHtV1/WriteReview';
import ColorOption from "./ColorOption";
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
import TitlePrice from "./TitlePrice";
import HeadingTitlePrice from "./HeadingTitlePrice"
import WishListButton from "hometown-components-dev/lib/WishlistButtonHtV1";
// import Section from 'hometown-components-dev/lib/SectionHtV1';
// import UnbxdRecentlyViewed from 'components/UnbxdRecentlyViewed/UnbxdRecentlyViewed';
import LoginModal from "containers/Login/LoginForm";
import AddToCart from "./pdpAddToCart";
import BreadCrumb from "./BreadCrumb";
import BuyNow from "./pdpBuyNow";
import ShareBar from "./pdpShareBar";
import EmiModal from "../EmiModal";
import EmiOptions from "./EmiOptions";
import Pincode from "./Pincode";
import ProductDetailsCarousel from "./Carousel";
import Video from "./Video";
import ReviewFilter from "./ReviewFilter";
// import UnbxdCompleteTheLook from './UnbxdCompleteTheLook';
import FreebieProduct from "./FreebieProduct";
import Stripes from "./PdpStripe";
const ShareIcon = require("../../../static/pdp-icons/share.png");
import demoIcon from "../../../static/play-button.svg";
import { BackgroundMasker } from "hometown-components-dev/lib/Shimmer";
import PdpModal from "./PdpModal/PdpModal";
import Specs from "./Specs/specs";
// import BaughtTogether from "./boughtTogether";

/**
 * Images / Icons
 */
const freeShippingIcon = require("../../../static/free-shipping.svg");
const warrentyIcon = require("../../../static/warrenty.svg");
const emiIcon = require("../../../static/emi.svg");
const WishlistIcon = require("../../../static/pdp-icons/wishlist.png");
const WishlistIconSelect = require("../../../static/pdp-icons/wishlistSelect.png");
const fbIcon = require("../../../static/fb-pdp.svg");
const email = require("../../../static/email-pdp.svg");
const pinIcon = require("../../../static/pinterest-pdp.svg");
const DownArrow = require("../../../static/pdp-icons/down-arrow.svg");

/**
 * styles
 */

const styles = require("./productIndex.scss");
const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: false,
  arrows: false
});
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
  // financeOption: productdetails.financeOptions.items.text,
  reviews,
  pincode,
  combinedbuy: combinedbuy.results,
  deliveryDateLoading: productdetails.deliveryDateLoading,
  boughtTogether: productdetails.boughtTogether,
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
  state = {
    displayShareBar: false,
    btProds: [this.props.product.meta, ...this.props.boughtTogether],
    btProdQty: {
      commonQty: 0
    },
    prodQty: 1
  };
  updatebtProdQty = () => {
    const { btProds } = this.state;
    btProds.forEach((prod, index) => {
      this.setState(prevState => {
        let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
        if (index === 0 || index === 1) {
          btProdQty[`${prod.sku}`] = 1;
        } else {
          btProdQty[`${prod.sku}`] = 0;
        }
        return { btProdQty };
      });
    });
  };
  updatebtTotal = (val, i) => {
    const {
      product: {
        pricing_details: { coupon_code: couponCode }
      },
      product
    } = this.props;
    const { btProdQty, prodQty, btProds } = this.state;
    btProds.forEach((prod, index) => {
      if (btProdQty[`${prod.sku}`] && index === i) {
        if (val === "inc") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal + Number(prod.special_price)
            });
          }
        } else if (val === "dec") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal - Number(prod.special_price)
            });
          }
        }
      } else if (!btProdQty[`${prod.sku}`] && index === i) {
        if (val === "inc") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(product.pricing_details.offer_price)) *
                btProdQty[`${prod.sku}`]
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(prod.pricing_details.offer_price)) *
                btProdQty[`${prod.sku}`]
            });
          } else {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(prod.special_price) * btProdQty[`${prod.sku}`]
            });
          }
        } else if (val === "dec") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(product.pricing_details.offer_price)) *
                (btProdQty[`${prod.sku}`] + 1)
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(prod.pricing_details.offer_price)) *
                (btProdQty[`${prod.sku}`] + 1)
            });
          } else {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(prod.special_price) * (btProdQty[`${prod.sku}`] + 1)
            });
          }
        }
      }
    });
  };

  constructor(props) {
    super(props);
    // this.reviewsRef = React.createRef();
    this.state = {
      open: false,
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
      openVideo: false,
      showReviews: false
    };
    this.reviewRef = React.createRef();
  }

  onOpenPdpModal = () => {
    this.setState({ open: true });
  };
  onClosePdpModal = () => {
    this.setState({ open: false });
  };

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
  handleShareBar = () => {
    this.setState({
      displayShareBar: !this.state.displayShareBar
    });
  };
  handleQty = value => {
    const { prodQty } = this.state;
    if (value === 'increment' && prodQty < 6) {
      this.setState(
        {
          prodQty: this.state.prodQty + 1
        },
        () => this.updatebtTotal('inc', 'no index')
      );
    } else if (value === 'decrement' && prodQty > 1) {
      this.setState(
        {
          prodQty: this.state.prodQty - 1
        },
        () => this.updatebtTotal('dec', 'no index')
      );
    }
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
  getOfferDetails = (offerDetails, price, specialPrice) => {
    const {
      offer_price: offerPrice = 0,
      coupon_code: couponCode = ""
    } = offerDetails;
    const finalPrice = Number(specialPrice) || Number(price);
    const priceToShow = offerPrice ? finalPrice - Number(offerPrice) : 0;
    const couponBasePrice = Number(finalPrice);
    const couponValue = offerPrice / couponBasePrice;
    const couponPercentageValue = Math.round(couponValue * 100);
    return {
      offerPrice: formatAmount(priceToShow),
      couponCode,
      offerAmount: offerPrice,
      couponPercentageValue
    };
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
  setbtTotal = () => {
    const { btProds } = this.state;
    const {
      boughtTogether,
      product,
      product: {
        pricing_details: { coupon_code: couponCode }
      }
    } = this.props;
    if (btProds.length > 1 && boughtTogether !== "Method Not Allowed") {
      if (couponCode) {
        if (btProds[1].pricing_details.coupon_code) {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              Number(formatPrice(btProds[1].pricing_details.offer_price))
          });
        } else {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              (Number(formatPrice(btProds[1].pricing_details.special_price))
                ? Number(formatPrice(btProds[1].pricing_details.special_price))
                : Number(formatPrice(btProds[1].pricing_details.mrp)))
          });
        }
      } else {
        this.setState({
          btTotal:
            (Number(formatPrice(product.pricing_details.special_price))
              ? Number(formatPrice(product.pricing_details.special_price))
              : Number(formatPrice(product.pricing_details.mrp))) +
            (Number(formatPrice(btProds[1].pricing_details.special_price))
              ? Number(formatPrice(btProds[1].pricing_details.special_price))
              : Number(formatPrice(btProds[1].pricing_details.mrp)))
        });
      }
    }
  };

  buySet = e => {
    e.preventDefault();
    const { session, pincode, product, btAddToCart } = this.props;
    const { simples, meta, sku } = product;
    const { config_id: configId } = meta;
    const simpleSku = Object.keys(simples)[0];
    const { btProds, btProdQty, prodQty } = this.state;
    const pin = pincode.selectedPincode ? pincode.selectedPincode : PINCODE;
    // btAddToCart(sku, sku, simpleSku, session, pin, configId, prodQty);
    btProds.forEach((prod, index) => {
      if (index === 0) {
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(
            prod.sku,
            prod.sku,
            simpleSku,
            session,
            pin,
            prod.configId,
            btProdQty[`${prod.sku}`]
          );
        }
      } else {
        const simpleSKU = Object.keys(prod.simples)[0];
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(
            prod.sku,
            prod.sku,
            simpleSKU,
            session,
            pin,
            prod.configId,
            btProdQty[`${prod.sku}`]
          );
        }
      }
    });
  };
  render() {
    const {
      product,
      pincode,
      session,
      reviews,
      relatedproductsList,
      boughtTogether,
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
      bflMinAmount,
      financeOption
    } = this.props;
    console.log("yass-salman", this.props);
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
      special_price: specialPrice,
      offer_details: offerDetails = {},
      config_id: configId,
      shipping_charge: shippingCharge,
      warranty_period: warrantyPeriod = 0,
      fk_catalog_supplier: fkCatalogSupplier = null,
      categories
    } = meta;

    const {
      offer_discount_percentage: offerDiscountPercentage,
      coupon_code: couponCode,
      offer_price: offerPrice,
      retail_discount: retailDiscount,
      total_savings: totalSavings,
      limited_time_coupon_discount: limitedTimeCouponDiscount,
      total_discount_percentage: totalDiscountPercentage,
      mrp: maxPrice,
      discount_type: discountType
    } = pricingDetails;
    const {
      prodDetail,
      displayBTModal,
      displayShareBar,
      prodQty,
      btProdQty,
      btTotal,
      btProds
    } = this.state;
    const checkSpecialPrice = Number(specialPrice) || Number(price);
    const isEmiAvailable = Number(checkSpecialPrice) >= EMI_THRESHOLD;
    // const checkSpecialPrice = Number(specialPriceEmi) || Number(price);
    // const { adding, added, data: reviewsData = [] } = reviews;
    const { data: reviewsData = [] } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const offerImageRedirect =
      simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore, showmorecolorproducts } = this.state;
    // const isEmiAvailable = Number(checkSpecialPrice) >= 3000;
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
                  "image" : ${images && images.length && images[0].url
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
                </Box>
              </Col>
              {/* Right Column */}
              <Col width={[1, 6 / 12, 6 / 12, 5 / 12]}>
                <div id="portal" className="portal" />

                {/* Product title  */}
                <HeadingTitlePrice
                  name={name}
                  brand={brand}
                />

                {/* color option */}
                <Row
                  display="block"
                  mt="0"
                  mb="0"
                  mr="1rem"
                  ml="1rem"
                  style={{ width: "100%" }}
                >
                  <div style={{ width: "50%" }}>
                    <Section mt="10px" mb="0.3125rem" p="0">
                      {colorProducts.length > 0 && (
                        <Box pb={15}>
                          {/* <Heading
                            fontSize="1em"
                            color="textDark"
                            fontFamily="medium"
                            fontWeight="normal"
                            mb={15}
                          >
                            Color Options: {getSelectedColor(colorProducts)}
                          </Heading> */}
                          <ColorOption
                            data={colorProducts}
                            showmorecolorproducts={showmorecolorproducts}
                            toggleShowMoreColorProducts={
                              this.toggleShowMoreColorProducts
                            }
                            currentlySelectedProductSku={product.sku}
                            showmorecolorproductsCount={
                              showmorecolorproductsCount
                            }
                          />
                        </Box>
                      )}
                    </Section>
                  </div>
                  {boughtTogether && boughtTogether.length ? (
                    <div style={{ width: "50%", marginTop: "20px" }}>
                      <button
                        style={{
                          width: "90%",
                          padding: " 10px",
                          color: "#323131",
                          fontSize: "18px",
                          border: "1px solid #707070",
                          backgroundColor: "#fff"
                        }}
                        onClick={this.onOpenPdpModal}
                      >
                        More options
                        <Image src={DownArrow} style={{ marginLeft: "10px" }} />
                      </button>
                      <ResponsiveModal
                        classNames={{ modal: "pdpmodal" }}
                        onCloseModal={this.onClosePdpModal}
                        open={this.state.open}
                      >
                        <PdpModal />
                      </ResponsiveModal>
                    </div>
                  ) : null}
                  <TitlePrice

                    price={formatAmount(price)}
                    offerDetails={this.getOfferDetails(offerDetails, price, specialPrice)}
                    discPrice={formatAmount(checkSpecialPrice)}
                    savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice || '', offerPrice))}
                    savingTotal={calculateTotalSavings(price, checkSpecialPrice || '')}
                    savingsPercentage={calculateDiscount(price, checkSpecialPrice, offerPrice)}
                    ratings={rating}
                    count={count}
                    onClickReviews={this.onClickReviews}
                  />
                  {/* Product price */}
                  {/* <TitlePrice
                    price={formatAmount(price)}
                    offerDetails={this.getOfferDetails(
                      offerDetails,
                      price,
                      specialPrice
                    )}
                    discPrice={formatAmount(checkSpecialPrice)}
                    savingsRs={formatAmount(
                      calculateSavings(
                        price,
                        checkSpecialPrice || "",
                        offerPrice
                      )
                    )}
                    savingTotal={calculateTotalSavings(
                      price,
                      checkSpecialPrice || ""
                    )}
                    savingsPercentage={calculateDiscount(
                      price,
                      checkSpecialPrice,
                      offerPrice
                    )}
                    ratings={rating}
                    count={count}
                    onClickReviews={this.onClickReviews}
                  /> */}
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
                            {`See ${combinedbuy.length} Combined ${combinedbuy.length > 1 ? "Offers" : "Offer"
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
                </Row>

                {/* emi cards */}
                {/* <LazyLoad height={150}>
                  <Div mt="5px">
                    <EmiOptions data={financeOption} />
                  </Div>
                </LazyLoad> */}
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
                  // emiStarting={formatAmount(calculateLowestEmi(emidata, price))}
                  shipping={checkSpecialPrice}
                  // isEmiAvailable={isEmiAvailable}
                  pincode={pincode.selectedPincode}
                  loading={deliveryDateLoading}
                  shippingCharge={meta.shipping_charge}
                >
                  <Pincode key="pincode" />
                </ServiceDetails>
                {/* Add to cart and Buy now buttons */}
                <Div>
                  <Row
                    ml="0rem"
                    mr="0rem"
                    mb="0rem"
                    justifyContent="space-between"
                    style={{
                      marginBottom: "30px",
                      width: "100%",
                      zIndex: "1000",
                      backgroundColor: "white"
                    }}
                  >
                    <BuyNow
                      quantity={productQty.value || 1}
                      simpleSku={simpleSku}
                      sku={sku}
                      size="block"
                      btnType="primary"
                      isSoldOut={
                        !(
                          simples[simpleSku].meta.quantity &&
                          parseInt(simples[simpleSku].meta.quantity, 10) > 0
                        )
                      }
                    />
                    <Row
                      ml="0px"
                      mr="0px"
                      height="45px"
                      style={{ width: "30%" }}
                      justifyContent="flex-end"
                    >
                      <Row
                        ml="0px"
                        mr="0px"
                        justifyContent="center"
                        style={{
                          alignItems: "center",
                          width: "80%",
                          border: "1px solid #E9916B",
                          borderRadius: "5px"
                        }}
                      >
                        <Button
                          backgroundColor="#fff"
                          color="#000"
                          width="30%"
                          pl="0.5rem"
                          pr="0.5rem"
                          style={{ border: "none" }}
                          onClick={() => this.handleQty("decrement")}
                        >
                          -
                        </Button>
                        <Div style={{ width: "30%", textAlign: "center" }}>
                          {prodQty}
                        </Div>
                        <Button
                          backgroundColor="#fff"
                          color="#000"
                          width="30%"
                          pl="0.5rem"
                          pr="0.5rem"
                          style={{ border: "none" }}
                          onClick={() => this.handleQty("increment")}
                        >
                          +
                        </Button>
                      </Row>
                    </Row>
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
                    {/* <WishListButton
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
                    /> */}
                    <Row
                      ml="0px"
                      mr="0px"
                      style={{ width: "30%" }}
                      justifyContent="flex-end"
                    >
                      <Row
                        ml="0px"
                        mr="0px"
                        justifyContent="center"
                        backgroundColor="#fff"
                        style={{
                          alignItems: "center",
                          width: "80%",
                          border: "1px solid #515151",
                          borderRadius: "5px"
                        }}
                      >
                        <button
                          style={{
                            padding: "0",
                            border: "none",
                            backgroundColor: "#ffffff"
                          }}
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
                        // isWishList={isInWishList(wishList, sku)}
                        // wishlistLoading={isInWishList(loadingList, sku)}
                        >
                          <Img
                            src={
                              isInWishList(wishList, sku)
                                ? WishlistIconSelect
                                : WishlistIcon
                            }
                            alt="wishlist icon"
                            width="24px"
                          />
                        </button>
                      </Row>
                    </Row>
                  </Row>
                </Div>
                {/* share product */}
                <Div>
                  <Div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "30px"
                    }}
                  >
                    <Img
                      src={ShareIcon}
                      height="22px"
                      width="auto"
                      style={{ display: "inline-block" }}
                    />
                    <Text ml="0.5rem" onClick={this.handleShareBar}>
                      Share this product
                    </Text>
                  </Div>
                  {displayShareBar ? (
                    <ShareBar title={name} url={productURL} mt="10px" />
                  ) : null}
                </Div>
                <div>
                  <Specs
                    specs={groupedAttributes}
                    prodDetail={true}
                    pincode={pincode.selectedPincode}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#f5f5f5",
                      width: "100%",
                      color: "rgba(0,0,0,0.6)",
                      border: "1px solid #d4d4d4",
                      borderBottom: !this.state.showReviews
                        ? "1px solid #d4d4d4"
                        : "none",
                      padding: "15px 20px",
                      cursor: "pointer",
                      fontSize: " 0.875rem"
                    }}
                    onClick={() => {
                      this.setState({ showReviews: !this.state.showReviews });
                    }}
                  >
                    <h4>Reviews</h4>
                    <span>{this.state.showReviews ? "-" : "+"}</span>
                  </div>
                  {this.state.showReviews ? (
                    <div
                      style={{
                        background: "#f5f5f5",
                        width: "100%",
                        border: "1px solid #d4d4d4",
                        borderTop: "none",
                        padding: "0px 20px 15px"
                      }}
                    >
                      <Box
                        id="review-section"
                        pt={30}
                        className={styles.reviewSection}
                      >
                        <div ref={this.reviewRef}>
                          <Box width={1}>
                            <form onSubmit={this.handleSubmit}>
                              <Box>
                                <h6
                                  style={{
                                    color: "rgba(0,0,0,0.6)",
                                    margin: "0px 0px 10px"
                                  }}
                                >
                                  Write a Review
                                </h6>
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
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center"
                                    }}
                                  >
                                    <Label mr={10}>Rating</Label>
                                    <ReactStars
                                      count={5}
                                      onChange={this.ratingChanged}
                                      size={20}
                                      value={this.state.rating}
                                      half={false}
                                      color2="#ffd700"
                                    />
                                  </div>
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
                                </div>
                              </Box>
                            </form>
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
                            </ReviewDisplay>
                          </Box>
                        </div>
                        <Reviews
                          variant="col-12"
                          reviewItems={
                            filterChanged ? reviewDataSet : reviews.data
                          }
                          showReviews={showReviews}
                          showMoreReviews={this.showMoreReviews}
                        />
                      </Box>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
            {/* bought together */}
            <LazyLoad height={150}>
              <Section>
                <h2 style={{ color: "#222222", textAlign: "center" }}>
                  Bought Together
                </h2>
                {/* <BaughtTogether data={[]} /> */}
                {!boughtTogether.error_message ? (
                  <Section>
                    <Div>
                      <SlickSlider
                        className="mainSlider"
                        settings={adjustSlides(8)}
                      >
                        {btProds && btProds.length
                          ? btProds.map((prod, index) => (
                            <Div
                              key={index}
                              style={{
                                position: "relative",
                                borderRadius: "5px",
                                height: "auto"
                              }}
                              p="10px"
                              bg="white"
                            >
                              {index === 0 ? (
                                <div
                                  style={{
                                    position: "relative",
                                    height: "250px",
                                    display: "flex"
                                  }}
                                >
                                  <Img
                                    src={`${product.image}.jpg`}
                                    alt="BT!"
                                    height="100%"
                                    width="auto%"
                                    m="auto"
                                    style={{ border: "2px solid #FAF4F2" }}
                                  />
                                </div>
                              ) : prod.image ? (
                                <div
                                  style={{
                                    position: "relative",
                                    height: "250px",
                                    display: "flex"
                                  }}
                                >
                                  <Link to={prod.link}>
                                    <Img
                                      src={prod.image}
                                      alt="BT!"
                                      height="100%"
                                      width="auto%"
                                      m="auto"
                                      style={{ border: "2px solid #FAF4F2" }}
                                    />
                                  </Link>
                                </div>
                              ) : null}

                              {prod.name ? (
                                <Text
                                  ta="left"
                                  fontSize="12px"
                                  mt="12px"
                                  mb="3px"
                                  style={{
                                    height: "40px",
                                    fontWeight: "bold"
                                  }}
                                  lineHeight="1.3rem"
                                >
                                  {prod.name.split("").length > 50
                                    ? `${prod.name.slice(0, 50)}....`
                                    : prod.name}
                                </Text>
                              ) : null}
                              {index !== 0 ? (
                                <Text
                                  ta="left"
                                  fontSize="12px"
                                  mt="0px"
                                  mb="3px"
                                  style={{
                                    height: "30px",
                                    fontWeight: "bold"
                                  }}
                                  lineHeight="1.3rem"
                                >
                                  {prod.pricing_details.coupon_code
                                    ? `Offer Price: ₹ ${prod.pricing_details.offer_price}`
                                    : prod.pricing_details.special_price !==
                                      "0"
                                      ? `Price: ₹ ${prod.pricing_details.special_price}`
                                      : `Price: ₹ ${prod.pricing_details.mrp}`}
                                </Text>
                              ) : (
                                  <Text
                                    ta="left"
                                    fontSize="12px"
                                    mt="0px"
                                    mb="3px"
                                    style={{
                                      height: "30px",
                                      fontWeight: "bold"
                                    }}
                                    lineHeight="1.3rem"
                                  >
                                    {couponCode
                                      ? `Offer Price: ₹ ${offerPrice}`
                                      : csp !== "0"
                                        ? `Price: ₹ ${csp}`
                                        : `Price: ₹ ${mrp}`}
                                  </Text>
                                )}
                              <Row
                                ml="0px"
                                mr="0px"
                                style={{ width: "100%" }}
                                justifyContent="flex-start"
                              >
                                <Row
                                  ml="0px"
                                  mr="0px"
                                  justifyContent="center"
                                  style={{
                                    alignItems: "center",
                                    width: "50%",
                                    border: "1px solid #E9916B",
                                    borderRadius: "5px"
                                  }}
                                >
                                  <Button
                                    width="30%"
                                    pl="0.5rem"
                                    pr="0.5rem"
                                    style={{ border: "none" }}
                                    onClick={() => {
                                      if (index === 0) {
                                        if (
                                          this.state.btProdQty[
                                          `${prod.sku}`
                                          ] > 1
                                        ) {
                                          this.setState(
                                            prevState => {
                                              // btProdQty : btProdQty[`${prod.name}`] += 1
                                              let btProdQty = Object.assign(
                                                {},
                                                prevState.btProdQty
                                              ); //creating copy of state variable btProdQty
                                              btProdQty[`${prod.sku}`] -= 1;
                                              return { btProdQty };
                                            },
                                            () => {
                                              this.updatebtTotal(
                                                "dec",
                                                index
                                              );
                                            }
                                          );
                                        }
                                      } else {
                                        if (
                                          this.state.btProdQty[
                                          `${prod.sku}`
                                          ] > 0
                                        ) {
                                          this.setState(
                                            prevState => {
                                              // btProdQty : btProdQty[`${prod.name}`] += 1
                                              let btProdQty = Object.assign(
                                                {},
                                                prevState.btProdQty
                                              ); //creating copy of state variable btProdQty
                                              btProdQty[`${prod.sku}`] -= 1;
                                              return { btProdQty };
                                            },
                                            () => {
                                              this.updatebtTotal(
                                                "dec",
                                                index
                                              );
                                            }
                                          );
                                        }
                                      }
                                    }}
                                  >
                                    -
                                    </Button>
                                  <Div
                                    style={{
                                      width: "30%",
                                      textAlign: "center"
                                    }}
                                  >
                                    {btProdQty[`${prod.sku}`]
                                      ? btProdQty[`${prod.sku}`]
                                      : btProdQty.commonQty}
                                  </Div>
                                  <Button
                                    width="30%"
                                    pl="0.5rem"
                                    pr="0.5rem"
                                    style={{ border: "none" }}
                                    onClick={() => {
                                      if (
                                        this.state.btProdQty[`${prod.sku}`] <
                                        5
                                      ) {
                                        this.setState(
                                          prevState => {
                                            // btProdQty : btProdQty[`${prod.name}`] += 1
                                            let btProdQty = Object.assign(
                                              {},
                                              prevState.btProdQty
                                            ); //creating copy of state variable btProdQty
                                            btProdQty[`${prod.sku}`] += 1;
                                            return { btProdQty };
                                          },
                                          () => {
                                            this.updatebtTotal("inc", index);
                                          }
                                        );
                                      }
                                    }}
                                  >
                                    +
                                    </Button>
                                </Row>
                                <Div
                                  ml="1rem"
                                  style={{
                                    width: "40%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                  }}
                                >
                                  {index === 0 ? (
                                    <Img
                                      src={cartIcon}
                                      alt="Cart icon"
                                      height="20px"
                                      style={{ width: "auto" }}
                                      onClick={() =>
                                        this.props.btAddToCart(
                                          prod.sku,
                                          prod.sku,
                                          simpleSku,
                                          session,
                                          pincode.selectedPincode,
                                          prod.configId,
                                          btProdQty[`${prod.sku}`]
                                        )
                                      }
                                    />
                                  ) : (
                                      <Img
                                        src={cartIcon}
                                        alt="Cart icon"
                                        height="20px"
                                        style={{ width: "auto" }}
                                        onClick={() =>
                                          this.props.btAddToCart(
                                            prod.sku,
                                            prod.sku,
                                            Object.keys(prod.simples)[0],
                                            session,
                                            pincode.selectedPincode,
                                            prod.configId,
                                            btProdQty[`${prod.sku}`]
                                          )
                                        }
                                      />
                                    )}
                                </Div>
                              </Row>
                            </Div>
                          ))
                          : null}
                      </SlickSlider>
                    </Div>
                    {/* <Div>
                      <Text
                        ta="center"
                        mb="0px"
                        fontSize="14px"
                        color="#222222"
                        style={{ fontWeight: "bold" }}
                      >
                        Total Price: ₹ {formatAmount(btTotal)}
                      </Text>
                      {couponCode ? (
                        <Text ta="center" mt="0px" fontSize="14px">
                          Price inclusive of Extra {offerDiscountPercentage}%
                          Use Code:{" "}
                          <Span fontSize="14px" color="#E9916B" tt="uppercase">
                            {couponCode}
                          </Span>
                        </Text>
                      ) : null}
                      {!checkStatus ? (
                        <Button
                          style={{
                            backgroundColor: "#E9916B",
                            borderRadius: "5px",
                            color: "white",
                            width: "40%",
                            display: "block"
                          }}
                          m="auto"
                          mt="1rem"
                          onClick={this.buySet}
                        >
                          {addLoading ? "Adding.." : "Buy Set"}
                        </Button>
                      ) : (
                        <Link to="/checkout/cart">
                          <Button
                            style={{
                              backgroundColor: "#E9916B",
                              borderRadius: "5px",
                              color: "white",
                              width: "40%",
                              display: "block"
                            }}
                            m="auto"
                            mt="1rem"
                            // onClick={this.buySet}
                          >
                            Go to Cart
                          </Button>
                        </Link>
                      )}
                    </Div> */}
                  </Section>
                ) : null}
              </Section>
            </LazyLoad>
            {displayBTModal && !boughtTogether.error_message ? (
              <Section
                pl="0px"
                pr="0px"
                style={{
                  position: "fixed",
                  height: "100vh",
                  width: "100%",
                  top: "0px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: "1"
                }}
              >
                <Div
                  style={{
                    position: "absolute",
                    bottom: "0px",
                    height: "50vh",
                    backgroundColor: "white",
                    borderRadius: "5px 5px 0px 0px",
                    overflowY: "auto"
                  }}
                >
                  <Row
                    mt="1rem"
                    mr="0px"
                    ml="0px"
                    mb="1rem"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Div style={{ width: "50%" }}>
                      <Heading ta="center" color="#323131" fontSize="1rem">
                        More Options
                      </Heading>
                    </Div>
                    <Div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Img
                        src={CloseIcon}
                        onClick={() => this.handleBTModel(false)}
                        alt="close button"
                        height="20px"
                      />
                    </Div>
                  </Row>
                  {boughtTogether && boughtTogether.length
                    ? boughtTogether.map((prod, index) => (
                      <Link to={prod.link}>
                        <Div
                          key={index}
                          pl="1rem"
                          pr="1rem"
                          mb="1rem"
                          style={{ height: "100px" }}
                        >
                          <Row
                            justifyContent="space-between"
                            ml="0px"
                            mr="0px"
                            style={{ height: "100px" }}
                          >
                            <Div style={{ width: "40%", height: "100%" }}>
                              <Img
                                src={prod.image}
                                alt="BT1"
                                m="auto"
                                style={{ height: "100%", width: "auto" }}
                              />
                            </Div>
                            <Div style={{ width: "50%" }}>
                              <Heading
                                fontSize="12px"
                                color="#323131"
                                style={{ whiteSpace: "normal" }}
                              >
                                {prod.name.split("").length > 50
                                  ? `${prod.name.slice(0, 50)}....`
                                  : prod.name}
                              </Heading>
                              <Text fontSize="12px" color="#F47020" mt="0px">
                                {prod.pricing_details.coupon_code
                                  ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                                  : `Price: ₹${prod.pricing_details.special_price}`}
                                {/* Offer Price: ₹{prod.special_price} */}
                              </Text>
                            </Div>
                          </Row>
                        </Div>
                      </Link>
                    ))
                    : null}
                </Div>
              </Section>
            ) : null}
            {/* Complete the look */}
            {/* <UnbxdCompleteTheLook configId={configId} /> */}
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
