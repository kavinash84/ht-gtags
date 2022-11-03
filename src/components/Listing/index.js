// import Label from 'hometown-components-dev/lib/LabelHtV1';
import ResponsiveModal from "components/Modal";
import LoginModal from "containers/Login/LoginForm";
import Box from "hometown-components-dev/lib/BoxHtV1";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart } from "redux/modules/cart";
import { setPincode, setPincodeFilter } from "redux/modules/pincode";
import { setProductPosition } from "redux/modules/productdetails";
import { toggleWishList, wishListWaitList } from "redux/modules/wishlist";
import { formatProductURL } from "utils/helper";
import { viewSubCategory } from "../../redux/modules/category";
// import ScrollToTop from '../ScrollToTop';
import BreadCrumb from "./BreadCrumb";
import CategoryBar from "./CategoryBar";
import TitleBar from "./TitleBar";
import UnbxdListing from "./UnbxdListing";

// const sortByList = require('data/sortby');

// const getProductImage = images => {
//   const image = images && images.length > 0 && (images.filter(i => i.main === '1')[0] || images[0]);
//   if (!image || !image.path) return '';
//   return `${image.path && image.path.split('-')[0]}-catalog_255.jpg`;
// };

// const onClickWishList = (
//   list,
//   dispatcher,
//   isUserLoggedIn,
//   history,
//   onOpenLoginModal,
//   addToWaitList,
//   selectedPincode
// ) => (sku, simpleSku) => e => {
//   e.preventDefault();
//   if (isUserLoggedIn) return dispatcher(list, sku, simpleSku, selectedPincode);
//   addToWaitList(sku, simpleSku, selectedPincode);
//   return onOpenLoginModal();
// };

// const isInWishList = (list, id) => list.includes(id);

// const styles = require('./Listing.scss');

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      wishlistToggle: toggleWishList,
      productPosition: setProductPosition,
      addToWaitList: wishListWaitList,
      addItemToCart: addToCart,
      setPincodeToStore: setPincode,
      setPincodeFilterToStore: setPincodeFilter
    },
    dispatch
  );

class Listing extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  state = {
    // openQuickView: false,
    // quickViewSku: '',
    // simpleSku: '',
    openLogin: false,
    display: "block",
    openModal: false
  };

  handleModal = () => {
    this.setState({
      openModal: false
    });
  };
  componentWillMount() {
    // const {
    //   history: {
    //     location: { state = {} }
    //   }
    // } = this.props;
    // const query = state.query || '';
    // this.setState({ query });
  }
  componentDidMount() {
    const {
      setPincodeToStore,
      setPincodeFilterToStore,
      breadCrumbs,
      history: {
        location: { pathname, state = {} }
      }
    } = this.props;
    const { dispatch } = this.context.store;
    if (breadCrumbs.length >= 2) {
      dispatch(
        viewSubCategory({
          path: pathname,
          category:
            (breadCrumbs && breadCrumbs.length && breadCrumbs[0].name) || "",
          sub_category:
            (breadCrumbs && breadCrumbs.length && breadCrumbs[1].name) || ""
        })
      );
    }
    if (window && breadCrumbs && pathname.indexOf("search") === -1) {
      let url = "";
      breadCrumbs.forEach((item, i) => {
        if (i === breadCrumbs.length - 1) {
          url += `${item.name}`;
        } else {
          url += `${item.name}>`;
        }
      });
      window.unbxd_category = url || "None";
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        display: "none"
      });
    }
    if (window) {
      window.HT = {};
      window.HT.toggleWishList = this.onClickWishList;
      window.HT.isInWishList = this.isInWishList;
      window.HT.addToCart = this.AddToCartHandler;
      window.HT.isInCart = this.isInCart;
      window.HT.gotoPDP = this.gotoPDP;
      window.HT.gotoCart = this.gotoCart;
      window.HT.setPincode = setPincodeToStore;
      window.HT.setPincodeFilter = setPincodeFilterToStore;
      // window.unbxd_fun();
      if (window.renderListing) {
        window.renderListing(true, state);
      }
    }
    if (window && window.Unbxd && window.Unbxd.experiences) {
      window.Unbxd.experiences = [];
    }
    if (window.unbxd_category === 'Kids') {
      this.setState({
        openModal: true
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
  }
  async componentDidUpdate(prevState) {
    const {
      reloadListing,
      setReloadListing,
      history: {
        location: { pathname, state = {} }
      }
    } = this.props;
    if (reloadListing && window) {
      // This is to prevent calling rendering listing when moving away from listing page
      const { breadCrumbs } = this.props;
      // const { breadCrumbs} = this.state.product.categoryDetails
      if (window && breadCrumbs && pathname.indexOf("search") === -1) {
        let url = "";
        breadCrumbs.forEach((item, i) => {
          if (i === breadCrumbs.length - 1) {
            url += `${item.name}`;
          } else {
            url += `${item.name}>`;
          }
        });
        window.unbxd_category = url || "None";
      } else if (prevState.display !== this.state.display) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          display: "none"
        });
      }
      const { dispatch } = this.context.store;
      await dispatch(setReloadListing(false));
      if (state && state.path) {
        window.renderListing(false, state);
      }
    }
    // if(prevState.display !== this.state.display) {
    //   this.setState({
    //     display: 'none'
    //   })
    // }
    this.props.history.location.action = "";
  }
  // onOpenQuickViewModal = (sku, simpleSku, soldOut, deliveredBy, rating) => {
  //   this.setState({
  //     openQuickView: true,
  //     quickViewSku: sku,
  //     simpleSku,
  //     soldOut,
  //     deliveredBy,
  //     rating
  //   });
  // };
  // onCloseQuickViewModal = () => {
  //   this.setState({ openQuickView: false });
  // };

  // setFilter = (key, name, value, selected) => e => {
  //   e.preventDefault();
  //   const { history, categoryquery } = this.props;
  //   let searchquery;
  //   [, searchquery] = history.location.search.split('q=');
  //   if (searchquery) {
  //     [searchquery] = searchquery.split('filters=');
  //     [searchquery] = searchquery.split('&');
  //   }
  //   const [, b64] = history.location.search.split('filters=');

  //   const link = formFilterLink2(key, name, b64, categoryquery, value, selected, searchquery);
  //   history.push(link);
  // };
  // handleLoginModal = () => {
  //   this.setState({ openLogin: !this.state.openLogin });
  // };

  // clearFilters = () => {
  //   const { history, categoryquery } = this.props;
  //   let link;
  //   if (history.location.pathname === '/search/') {
  //     let [, searchQuery] = history.location.search.split('q=');
  //     [searchQuery] = searchQuery.split('&filters');
  //     link = formFilterLink2(searchQuery, 'resetsearch', '', categoryquery);
  //     return history.push(link);
  //   }
  //   const { dispatch } = this.context.store;
  //   dispatch(setFilter('clearAll'));
  //   link = formFilterLink2('key', 'reset', '', categoryquery);
  //   history.push(link);
  // };
  componentWillUnmount() {
    window.unbxd_category = "";
  }
  onClickWishList = (sku, simpleSku) => {
    // e.preventDefault();
    const {
      wishlistToggle,
      wishListData,
      isLoggedIn,
      addToWaitList,
      selectedPincode
    } = this.props;
    if (isLoggedIn) {
      wishlistToggle(wishListData, sku, simpleSku, selectedPincode)
        .then(() => {
          if (window && !!window.unbxd && !!window.unbxd.toggleWishList) {
            window.unbxd.toggleWishList(sku, simpleSku);
          }
        })
        .catch(() => { });
    } else {
      // if (window && !!window.unbxd && !!window.unbxd.toggleWishList) {
      //   window.unbxd.toggleWishList(sku, simpleSku);
      // }
      addToWaitList(sku, simpleSku, selectedPincode, true);
      this.handleLoginModal();
    }
  };
  handleCategoryClick(event) {
    event.preventDefault();
    const { selectedPincode } = this.props;
    window.HTCATEGORY.navigateToCategory({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search,
      pincode: selectedPincode
    });
  }
  isInWishList = id => {
    const { wishList } = this.props;
    return wishList.includes(id);
  };
  AddToCartHandler = (key, skuId, simpleSku, pincode) => {
    const { addItemToCart, sessionId } = this.props;
    addItemToCart(key, skuId, simpleSku, sessionId, pincode)
      .then(() => {
        if (window && !!window.unbxd && !!window.unbxd.addToCart) {
          window.unbxd.addToCart(key, skuId, simpleSku, pincode);
        }
      })
      .catch(() => {
        console.log("unbxd addToCart callback failed !");
      });
  };
  isInCart = sku => {
    const { cartSKUs } = this.props;
    return cartSKUs.includes(sku);
  };
  gotoPDP = (name, sku) => {
    const { history } = this.props;
    const productURL = formatProductURL(name, sku);
    history.push(productURL);
  };
  gotoCart = () => {
    const { history } = this.props;
    const cartURL = "/checkout/cart";
    history.push(cartURL);
  };
  handleLoginModal = () => {
    this.setState({ openLogin: !this.state.openLogin });
  };
  render() {
    const {
      categoryName,
      productCount,
      breadCrumbs,
      history,
      categoryBar
    } = this.props;
    const { display } = this.state;
    // const uniqueFilters = {};
    return (
      <Box>
        {/* <BestOfferBanners bannerData={bannerData} history={history} /> */}
        <Box>
          {/* <TitleBar
            title={categoryName}
            productCount={productCount}
            display={display}
          > */}

          <BreadCrumb
            categoryDetails={breadCrumbs}
            handleCategoryClick={this.handleCategoryClick}
          />
          <div id="dummy_focusId" />
          {/* </TitleBar> */}
          <div class="unbxd-page-title">
            <div class="unbxd-page-name"></div>
            <div class="unbxd-page-spellcheck"></div>
          </div>
          <CategoryBar
            pathname={history.location.pathname}
            categoryBar={categoryBar}
            handleCategoryClick={this.handleCategoryClick}
            display={display}
          />
          <UnbxdListing />
          <ResponsiveModal
            classNames={{ modal: "loginModal" }}
            onCloseModal={this.handleLoginModal}
            open={this.state.openLogin}
          >
            <Box py={32} px={32}>
              <LoginModal />
            </Box>
          </ResponsiveModal>
        </Box>
        {this.state.openModal ? (
          <ResponsiveModal
            classNames={{ modal: "furntitureModal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <Link to='/offer/smartsters'>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              > */}
              <img
                src='https://www.hometown.in/media/cms/campaignpages/pop-up-banner_2.jpg'
                style={{ width: "100%", height: "auto" }}
              />
              {/* </div> */}
            </Link>
          </ResponsiveModal>
        ) : null}
      </Box>
    );
  }
}

Listing.defaultProps = {
  wishList: [],
  wishListData: [],
  categoryName: "",
  productCount: "",
  // category: '',
  // filters: [],
  // appliedFilters: [],
  // pincode: '',
  // metaResults: [],
  // loadingList: [],
  isLoggedIn: false,
  // categoryquery: '',
  categoryBar: [],
  reloadListing: false
  // display: 'block
};

Listing.propTypes = {
  wishlistToggle: PropTypes.func.isRequired,
  // productPosition: PropTypes.func.isRequired,
  // products: PropTypes.array.isRequired,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  categoryName: PropTypes.string,
  productCount: PropTypes.string,
  // filters: PropTypes.array,
  // sortBy: PropTypes.string.isRequired,
  // appliedFilters: PropTypes.array,
  history: PropTypes.object.isRequired,
  // loadingList: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  // metaResults: PropTypes.array,
  // categoryquery: PropTypes.string,
  addToWaitList: PropTypes.func.isRequired,
  breadCrumbs: PropTypes.array.isRequired,
  categoryBar: PropTypes.array,
  selectedPincode: PropTypes.string.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array.isRequired,
  setPincodeToStore: PropTypes.func.isRequired,
  setPincodeFilterToStore: PropTypes.func.isRequired,
  reloadListing: PropTypes.bool,
  setReloadListing: PropTypes.func.isRequired
  // display: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(Listing);
