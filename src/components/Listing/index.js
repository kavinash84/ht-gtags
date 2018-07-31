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
import TitleBar from 'components/TitleBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleWishList } from 'redux/modules/wishlist';
import { clearAllFilters } from 'redux/modules/products';
import { formFilterLink2 } from 'utils/helper';
import Dropdown from '../Filters/Filters';
import SortByFilters from '../Filters/SortByFilters';
import AddToCart from '../AddToCart';
import AppliedFilters from '../Filters/AppliedFilters';
import { LOGIN_URL } from '../../helpers/Constants';

const sortByList = require('data/sortby');

const getProductImage = url => {
  const pp = `${url.split('/').slice(-1)}`;
  return url.replace(pp, '1-product_500.jpg');
};

const onClick = (list, dispatcher, isUserLoggedIn, history) => sku => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku);
  return history.push(LOGIN_URL);
};

const isInWishList = (list, id) => list.includes(id);

const styles = require('./Listing.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ wishlistToggle: toggleWishList }, dispatch);

class Listing extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    openQuickView: false,
    quickViewSku: '',
    simpleSku: ''
  };
  onOpenQuickViewModal = (sku, simpleSku) => {
    this.setState({
      openQuickView: true,
      quickViewSku: sku,
      simpleSku
    });
  };
  onCloseQuickViewModal = () => {
    this.setState({ openQuickView: false });
  };

  setFilter = (key, name, value, selected) => e => {
    e.preventDefault();
    const { history, categoryquery } = this.props;
    const [, b64] = history.location.search.split('?filters=');
    const link = formFilterLink2(key, name, b64, categoryquery, value, selected);
    history.push(link);
  };

  clearFilters = () => {
    const { category, pincode } = this.props;
    const { dispatch } = this.context.store;
    dispatch(clearAllFilters(category, pincode));
  };

  render() {
    const {
      wishlistToggle,
      products,
      categoryName,
      productCount,
      wishList,
      wishListData,
      wishlistLoading,
      wishlistKey,
      filters,
      history,
      isLoggedIn,
      metaResults,
      appliedFilters,
      sortBy
      // categoryquery
    } = this.props;
    return (
      <Div type="block">
        <TitleBar title={categoryName} productCount={productCount} />
        <Section pt="1rem" mb="0">
          <Container pr="0" pl="0">
            <div className={styles.filterBar}>
              <Row display="block" mr="0" ml="0">
                <Div col="9">
                  <Label display="inline-block">Filter By</Label>
                  {filters.map((item, index) => (
                    <Dropdown
                      key={String(index)}
                      checkbox
                      title={item.name === 'Main Material' ? 'Material' : item.name}
                      onclick={this.setFilter}
                      data={item.attributes}
                      history={history}
                    />
                  ))}
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
                <Label fontWeight="600" display="inline-block">
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
                    key={item.id}
                    name={item.data.name}
                    price={item.netprice}
                    cutprice={item.cutprice}
                    saving={item.saving}
                    image={getProductImage(item.images[0].path)}
                    sku={item.data.sku}
                    simple_sku={item.simples}
                    onClick={onClick(wishListData, wishlistToggle, isLoggedIn, history)}
                    onOpenQuickViewModal={() => {
                      this.onOpenQuickViewModal(item.data.sku, Object.keys(item.data.simples)[0]);
                    }}
                    isWishList={isInWishList(wishList, item.data.sku)}
                    wishlistKey={wishlistKey}
                    wishlistLoading={wishlistLoading}
                    rating={item.data.reviews.rating.toFixed(1)}
                    reviewsCount={item.data.reviews.count}
                    savingAmount={item.data.max_price - item.data.max_special_price}
                    deliveredBy={item.data.delivery_details[0].value}
                    colors={metaResults[index].data.color_group_count.split(' ')[0]}
                  />
                  <Div mt="0" p="0.25rem 0.125rem 0.5rem">
                    <AddToCart simpleSku={Object.keys(item.data.simples)[0]} sku={item.data.sku} itemId={item.id} />
                  </Div>
                </div>
              ))}
              <ResponsiveModal
                onCloseModal={this.onCloseQuickViewModal}
                open={this.state.openQuickView}
                classNames={{ modal: styles.quickViewModal }}
              >
                <QuickView
                  onCloseModal={this.onCloseQuickViewModal}
                  sku={this.state.quickViewSku}
                  simpleSku={this.state.simpleSku}
                  products={products}
                />
              </ResponsiveModal>
            </Row>
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
  category: '',
  filters: [],
  appliedFilters: [],
  pincode: '',
  metaResults: [],
  wishlistKey: '',
  wishlistLoading: false,
  isLoggedIn: false,
  categoryquery: ''
};

Listing.propTypes = {
  wishlistToggle: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  categoryName: PropTypes.string,
  productCount: PropTypes.string,
  category: PropTypes.string,
  filters: PropTypes.array,
  sortBy: PropTypes.string.isRequired,
  appliedFilters: PropTypes.array,
  history: PropTypes.object.isRequired,
  wishlistLoading: PropTypes.bool,
  pincode: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  metaResults: PropTypes.array,
  wishlistKey: PropTypes.string,
  categoryquery: PropTypes.string
};

export default connect(
  null,
  mapDispatchToProps
)(Listing);
