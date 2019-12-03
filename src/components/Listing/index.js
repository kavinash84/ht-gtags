import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Product from 'hometown-components/lib/Product';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';
import QuickView from 'components/QuickView/QuickView';
import LoginModal from 'containers/Login/LoginForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setFilter } from 'redux/modules/products';
import { setProductPosition } from 'redux/modules/productdetails';
import { formFilterLink2, formatProductURL } from 'utils/helper';
import { formatAmount } from 'utils/formatters';
import TitleBar from './TitleBar';
import Dropdown from '../Filters/Filters';
import SortByFilters from '../Filters/SortByFilters';
import AddToCart from '../AddToCart';
import AppliedFilters from '../Filters/AppliedFilters';
import ScrollToTop from '../ScrollToTop';
import BreadCrumb from './BreadCrumb';
import CategoryBar from './CategoryBar';

const sortByList = require('data/sortby');

const getProductImage = images => {
  const image = images && images.length > 0 && (images.filter(i => i.main === '1')[0] || images[0]);
  if (!image || !image.path) return '';
  return `${image.path && image.path.split('-')[0]}-catalog_255.jpg`;
};

const onClickWishList = (
  list,
  dispatcher,
  isUserLoggedIn,
  history,
  onOpenLoginModal,
  addToWaitList,
  selectedPincode
) => (sku, simpleSku) => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku, simpleSku, selectedPincode);
  addToWaitList(sku, simpleSku, selectedPincode);
  return onOpenLoginModal();
};

const isInWishList = (list, id) => list.includes(id);

const styles = require('./Listing.scss');

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      wishlistToggle: toggleWishList,
      productPosition: setProductPosition,
      addToWaitList: wishListWaitList
    },
    dispatch
  );

class Listing extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    openQuickView: false,
    quickViewSku: '',
    simpleSku: '',
    openLogin: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
  }
  onOpenQuickViewModal = (sku, simpleSku, soldOut, deliveredBy, rating) => {
    this.setState({
      openQuickView: true,
      quickViewSku: sku,
      simpleSku,
      soldOut,
      deliveredBy,
      rating
    });
  };
  onCloseQuickViewModal = () => {
    this.setState({ openQuickView: false });
  };

  setFilter = (key, name, value, selected) => e => {
    e.preventDefault();
    const { history, categoryquery } = this.props;
    let searchquery;
    [, searchquery] = history.location.search.split('q=');
    if (searchquery) {
      [searchquery] = searchquery.split('filters=');
      [searchquery] = searchquery.split('&');
    }
    const [, b64] = history.location.search.split('filters=');

    const link = formFilterLink2(key, name, b64, categoryquery, value, selected, searchquery);
    history.push(link);
  };
  handleLoginModal = () => {
    this.setState({ openLogin: !this.state.openLogin });
  };

  clearFilters = () => {
    const { history, categoryquery } = this.props;
    let link;
    if (history.location.pathname === '/search/') {
      let [, searchQuery] = history.location.search.split('q=');
      [searchQuery] = searchQuery.split('&filters');
      link = formFilterLink2(searchQuery, 'resetsearch', '', categoryquery);
      return history.push(link);
    }
    const { dispatch } = this.context.store;
    dispatch(setFilter('clearAll'));
    link = formFilterLink2('key', 'reset', '', categoryquery);
    history.push(link);
  };
  render() {
    const {
      wishlistToggle,
      productPosition,
      products,
      categoryName,
      productCount,
      wishList,
      wishListData,
      loadingList,
      filters,
      history,
      isLoggedIn,
      metaResults,
      appliedFilters,
      sortBy,
      addToWaitList,
      breadCrumbs,
      categoryBar,
      selectedPincode
    } = this.props;
    const uniqueFilters = {};
    return (
      <Div type="block">
        <TitleBar title={categoryName} productCount={productCount}>
          <BreadCrumb categoryDetails={breadCrumbs} />
        </TitleBar>
        <CategoryBar pathname={history.location.pathname} categoryBar={categoryBar} />
        <Section pt="1rem" mb="0">
          <Container pr="0" pl="0">
            <div className={styles.filterBar}>
              <Row display="block" mr="0" ml="0">
                <Div col="9">
                  <Label display="inline-block">Filter By</Label>
                  {filters.map((item, index) => {
                    const filterName = item.name || '';
                    if (!uniqueFilters[filterName]) {
                      uniqueFilters[filterName] = true;
                      return (
                        <Dropdown
                          key={String(index)}
                          checkbox
                          title={item.name === 'Product main material' ? 'Material' : item.name}
                          onclick={this.setFilter}
                          data={item.attributes}
                          history={history}
                        />
                      );
                    }
                    return '';
                  })}
                </Div>
                <Div col="3" ta="right">
                  <Label>Sort By</Label>
                  <SortByFilters display="rtl" title={sortBy} onclick={this.setFilter} data={sortByList} />
                </Div>
              </Row>
            </div>
          </Container>
        </Section>
        <Section pt="0.3125rem" pb="0.3125rem" mb="0">
          <Container pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              <Div col="12">
                <Label fontFamily="medium" display="inline-block">
                  Applied Filters
                </Label>
                <AppliedFilters data={appliedFilters} onClickClearFilter={this.clearFilters} />
              </Div>
            </Row>
          </Container>
        </Section>
        <Section pt="1rem" mb="0">
          <Container pr="0" pl="0">
            <Row display="block" mr="-15px" ml="-15px">
              {products.map((item, index) => (
                <div className={styles.productWrapper} key={item.id}>
                  <Product
                    position={index}
                    key={item.id}
                    name={item.data.name}
                    price={parseInt(item.netprice, 10) ? item.netprice : item.cutprice}
                    cutprice={item.cutprice}
                    saving={item.saving}
                    moneyBackOffer={item.data.money_back_offer}
                    comboOffer={item.data.combo_offer}
                    /* eslint-disable max-len */
                    image={getProductImage(item.images)}
                    sku={item.data.sku}
                    simpleSku={Object.keys(item.data.simples)[0]}
                    onClick={onClickWishList(
                      wishListData,
                      wishlistToggle,
                      isLoggedIn,
                      history,
                      this.handleLoginModal,
                      addToWaitList,
                      selectedPincode
                    )}
                    onOpenQuickViewModal={() => {
                      this.onOpenQuickViewModal(
                        item.data.sku,
                        Object.keys(item.data.simples)[0],
                        item.soldout,
                        item.data.delivery_details && item.data.delivery_details[0].value,
                        item.data.reviews.rating.toFixed(1)
                      );
                    }}
                    isWishList={isInWishList(wishList, item.data.sku)}
                    skuLoading={isInWishList(loadingList, item.data.sku)}
                    rating={item.data.reviews.rating.toFixed(1)}
                    reviewsCount={item.data.reviews.count}
                    savingAmount={
                      item.data.max_special_price
                        ? formatAmount(Number(item.data.max_price) - Number(item.data.max_special_price))
                        : 0
                    }
                    deliveredBy={item.data.delivery_details && item.data.delivery_details[0].value}
                    colors={
                      metaResults[index].data.color_group_count.split(' ') &&
                      metaResults[index].data.color_group_count.split(' ')[0]
                    }
                    setProductPosition={productPosition}
                    productURL={formatProductURL(item.data.name, item.data.sku)}
                    pincode={selectedPincode}
                  />
                  <Div mt="0" p="12px 0.125rem 0.5rem 0.125rem">
                    <AddToCart
                      simpleSku={Object.keys(item.data.simples)[0]}
                      sku={item.data.sku}
                      itemId={item.id}
                      isSoldOut={item.soldout}
                      btnType="btnOutline"
                      btnColor="transparent"
                      ta="left"
                      fontSize="12px"
                    />
                  </Div>
                </div>
              ))}
              <ResponsiveModal
                onCloseModal={this.onCloseQuickViewModal}
                open={this.state.openQuickView}
                classNames={{ overlay: styles.customModal, modal: styles.quickViewModal }}
              >
                <QuickView
                  onCloseModal={this.onCloseQuickViewModal}
                  sku={this.state.quickViewSku}
                  simpleSku={this.state.simpleSku}
                  products={products}
                  soldOut={this.state.soldOut}
                  deliveredBy={this.state.deliveredBy}
                  rating={this.state.rating}
                />
              </ResponsiveModal>
              <ScrollToTop />
            </Row>
            <ResponsiveModal
              classNames={{ modal: 'loginModal' }}
              onCloseModal={this.handleLoginModal}
              open={this.state.openLogin}
            >
              <LoginModal />
            </ResponsiveModal>
          </Container>
        </Section>
      </Div>
    );
  }
}

Listing.defaultProps = {
  wishList: [],
  wishListData: [],
  categoryName: '',
  productCount: '',
  // category: '',
  filters: [],
  appliedFilters: [],
  // pincode: '',
  metaResults: [],
  loadingList: [],
  isLoggedIn: false,
  categoryquery: '',
  categoryBar: []
};

Listing.propTypes = {
  wishlistToggle: PropTypes.func.isRequired,
  productPosition: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  categoryName: PropTypes.string,
  productCount: PropTypes.string,
  filters: PropTypes.array,
  sortBy: PropTypes.string.isRequired,
  appliedFilters: PropTypes.array,
  history: PropTypes.object.isRequired,
  loadingList: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  metaResults: PropTypes.array,
  categoryquery: PropTypes.string,
  addToWaitList: PropTypes.func.isRequired,
  breadCrumbs: PropTypes.array.isRequired,
  categoryBar: PropTypes.array,
  selectedPincode: PropTypes.string.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Listing);
