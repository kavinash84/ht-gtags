import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getSKUList } from 'selectors/wishlist';
import { getCartListSKU } from 'selectors/cart';
import { storesList as getStaticData } from 'selectors/homepage';
import { setReloadListing } from 'redux/modules/products';

import Box from 'hometown-components-dev/lib/BoxHtV1';
import ListingContainer from 'components/Listing';
import BestOfferBanners from 'components/Listing/BestOfferBanners';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SeoContent from 'components/SeoContent';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import {
  getProducts,
  getCategoryName,
  getProductCount,
  getFilters,
  getAppliedFilters,
  getSEOInfo,
  getl4
} from 'selectors/products';
import { SITE_URL } from 'helpers/Constants';
import CANONICALS from 'data/canonical';
// import { listingBestOffers, listingBestOffersPath } from 'data/best-offers';

const btnStyle = {
  backgroundColor: 'transparent',
  padding: '0px',
  margin: '0px',
  outline: 'none',
  border: 'none'
};

@connect(state => ({
  loading: state.products.loading,
  loaded: state.products.loaded,
  shimmer: state.products.shimmer,
  category: state.products.query,
  page: state.loadmore.page,
  filters: getFilters(state),
  appliedFilters: getAppliedFilters(state),
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  loadingList: state.wishlist.loadingList,
  pincode: state.pincode.selectedPincode,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  isLoggedIn: state.userLogin.isLoggedIn,
  metadata: state.products.list,
  sortBy: state.products.filters.sortBy,
  categoryquery: state.products.category,
  seoInfo: getSEOInfo(state),
  breadCrumbs: state.products.categoryDetails,
  currentPage: state.pagination.page,
  categoryBar: getl4(state),
  selectedPincode: state.pincode.selectedPincode,
  sessionId: state.app.sessionId,
  cartSKUs: getCartListSKU(state.cart),
  reloadListing: state.products.reloadListing,
  offer: state.offer,
  bannerData: getStaticData(state.listingbanners)
}))
@withRouter
export default class Listing extends Component {
  static propTypes = {
    // loading: PropTypes.bool,
    // loaded: PropTypes.bool,
    // shimmer: PropTypes.bool,
    products: PropTypes.array,
    metadata: PropTypes.array,
    category: PropTypes.string,
    categoryName: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array,
    loadingList: PropTypes.array,
    filters: PropTypes.array,
    appliedFilters: PropTypes.array,
    history: PropTypes.object.isRequired,
    pincode: PropTypes.string,
    sortBy: PropTypes.string,
    categoryquery: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
    seoInfo: PropTypes.object,
    breadCrumbs: PropTypes.array,
    currentPage: PropTypes.number,
    categoryBar: PropTypes.array,
    selectedPincode: PropTypes.string,
    sessionId: PropTypes.string.isRequired,
    cartSKUs: PropTypes.array,
    reloadListing: PropTypes.bool,
    offer: PropTypes.object,
    bannerData: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    // loading: false,
    // loaded: true,
    // shimmer: false,
    products: [],
    categoryName: '',
    category: '',
    productCount: '',
    wishListedSKUs: [],
    wishListData: [],
    loadingList: [],
    filters: [],
    appliedFilters: [],
    metadata: null,
    pincode: '',
    sortBy: '',
    isLoggedIn: false,
    seoInfo: {},
    breadCrumbs: [],
    currentPage: 1,
    categoryBar: [],
    selectedPincode: '',
    cartSKUs: [],
    reloadListing: false,
    offer: {},
    bannerData: {}
  };

  constructor(props) {
    super(props);
    this.listingRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pincode !== this.props.pincode) {
      const { dispatch } = this.context.store;
      const { history } = this.props;
      const {
        location: { search, pathname }
      } = history;
      dispatch(setReloadListing(true));
      history.push(`${pathname}${search}`);
    }
  }

  scrollDown = () => {
    this.listingRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  renderOffers = offer => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%'
      }}
    >
      <Col
        // width={[1 / 2, 1 / 2, 1 / 4]}
        // width="30%"
        textAlign="center"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderRight: 'whiteMedium'
        }}
      >
        {/* <Text variant="textLight" color="white">
            {item.offer.name || ''}
          </Text> */}
        <a href={offer.offer.link}>
          <Box variant="textLight" color="white" py={2}>
            {(offer.offer.name && offer.offer.name.split('|')[0]) || ''}
          </Box>
          <Heading variant="heading.medium" color="white" py={2}>
            {(offer.offer.name && offer.offer.name.split('|')[1]) || ''}
          </Heading>
        </a>
        {/* <Heading fontSize={16} color="white">
            {item.extra_offer.name || ''}
          </Heading> */}
      </Col>
      <Col
        // width={[1 / 2, 1 / 2, 1 / 4]}
        // width="30%"
        textAlign="center"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          borderRight: 'whiteMedium'
        }}
      >
        {/* <Text variant="textLight" color="white">
            {item.offer.name || ''}
          </Text> */}
        <Box variant="textLight" color="white" py={2}>
          {(offer.coupon.name && offer.coupon.name.split('|')[0]) || ''}
        </Box>
        {offer.coupon.name.split('|')[1] && (
          <Heading variant="heading.medium" color="white" py={2}>
            Upto {offer.coupon.name.split('|')[1] || ''}
          </Heading>
        )}
        <Heading variant="heading.medium" color="white" py={2}>
          Coupon Code: {(offer.coupon.code && offer.coupon.code) || ''}
        </Heading>
        {/* <Heading fontSize={16} color="white">
            {item.extra_offer.name || ''}
          </Heading> */}
      </Col>
      <Col
        // width={[1 / 2, 1 / 2, 1 / 4]}
        // width="30%"
        textAlign="center"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        {/* <Text variant="textLight" color="white">
            {item.offer.name || ''}
          </Text> */}
        <a href={offer.extra_offer.link}>
          <Heading variant="heading.medium" color="white" py={2}>
            {offer.extra_offer.name || ''}
          </Heading>
        </a>
        {/* <Heading fontSize={16} color="white">
            {item.extra_offer.name || ''}
          </Heading> */}
      </Col>
    </div>
    // )
  );

  render() {
    const {
      // loading,
      // loaded,
      // shimmer,
      products,
      categoryName,
      category,
      filters,
      productCount,
      isLoggedIn,
      pincode,
      history,
      wishListedSKUs,
      wishListData,
      loadingList,
      metadata,
      appliedFilters,
      sortBy,
      categoryquery,
      seoInfo,
      breadCrumbs,
      currentPage,
      categoryBar,
      selectedPincode,
      sessionId,
      cartSKUs,
      reloadListing,
      offer,
      bannerData
    } = this.props;
    let page;
    const {
      location: { search, pathname }
    } = history;
    if (search !== '') {
      [, page] = search.replace('?', '').split('page=');
    } else page = currentPage;
    const previousPage = !page || Number(page) === 1 ? '' : `?page=${page - 1}`;
    const NextPage = !page ? '?page=2' : `?page=${Number(page) + 1}`;
    // const showBestOffers = listingBestOffersPath.some(arr => arr === pathname);
    // let banners = [];
    // if (showBestOffers) banners = listingBestOffers[0][pathname].images;
    // console.log('listingBestOffers[pathname]', listingBestOffers[0][pathname]);
    /* eslint-disable react/no-danger */
    return (
      <Wrapper>
        <Helmet>
          <title>{seoInfo && seoInfo.page_title}</title>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
          {CANONICALS[pathname] && <link rel="canonical" href={`${SITE_URL}${CANONICALS[pathname]}`} />}
          {previousPage !== '' && Number(page) !== 2 && (
            <link rel="prev" href={`${SITE_URL}${pathname}${previousPage}`} />
          )}
          {Number(page) === 2 && <link rel="prev" href={`${SITE_URL}${pathname}`} />}
          {productCount / 32 / Number(page) > 1 && <link rel="next" href={`${SITE_URL}${pathname}${NextPage}`} />}
        </Helmet>
        <Body>
          <Header />
          {/* Offer banner */}
          {offer && offer.data && offer.data.coupon && !offer.data.error && (
            <Box bg="heading" pt={30} pb={20}>
              <Container>
                <Row justifyContent="center">{this.renderOffers(offer.data || [])}</Row>
              </Container>
            </Box>
          )}

          {/* Listing page best offer banners */}
          <Box sx={btnStyle} onClick={() => this.scrollDown(bannerData)}>
            <BestOfferBanners bannerData={bannerData} history={history} />
          </Box>
          <Box>
            <div ref={this.listingRef}>
              <ListingContainer
                wishList={wishListedSKUs}
                wishListData={wishListData}
                products={products}
                categoryName={categoryName}
                productCount={productCount}
                category={category}
                filters={filters}
                sortBy={sortBy}
                appliedFilters={appliedFilters}
                history={history}
                pincode={pincode}
                isLoggedIn={isLoggedIn}
                loadingList={loadingList}
                metaResults={metadata}
                categoryquery={categoryquery}
                breadCrumbs={breadCrumbs}
                categoryBar={categoryBar}
                selectedPincode={selectedPincode}
                sessionId={sessionId}
                cartSKUs={cartSKUs}
                reloadListing={reloadListing}
                setReloadListing={setReloadListing}
                bannerData={bannerData}
              />
            </div>
            {seoInfo && seoInfo.seo_text && (
              <SeoContent>
                <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
              </SeoContent>
            )}
          </Box>
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
