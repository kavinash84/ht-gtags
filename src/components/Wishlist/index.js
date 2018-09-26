import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/wishlist';
import Product from 'hometown-components/lib/Product';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import ResponsiveModal from 'components/Modal';
import Div from 'hometown-components/lib/Div';
import QuickView from 'components/QuickView/QuickView';
import { setProductPosition } from 'redux/modules/productdetails';
import { formatProductURL } from 'utils/helper';
import AddToCart from '../AddToCart';

const getProductImage = url => {
  const pp = `${url.split('/').slice(-1)}`;
  return url.replace(pp, '1-product_500.jpg');
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators, productPosition: setProductPosition }, dispatch);

const onClick = (list, dispatcher) => sku => e => {
  e.preventDefault();
  dispatcher(list, sku);
};

const isInWishList = (list, id) => list.includes(id);

const styles = require('./Wishlist.scss');

const sanitizeWishList = list => list.map(item => item.product_info);

class Wishlist extends React.Component {
  state = {
    openQuickView: false,
    quickViewSku: '',
    simpleSku: ''
  };
  onOpenQuickViewModal = (sku, simpleSku, soldOut, rating) => {
    this.setState({
      openQuickView: true,
      quickViewSku: sku,
      simpleSku,
      soldOut,
      rating
    });
  };
  onCloseQuickViewModal = () => {
    this.setState({ openQuickView: false });
  };

  render() {
    const {
      list, toggleWishList, wishList, loadingList, productPosition
    } = this.props;
    const { quickViewSku, openQuickView, simpleSku } = this.state;
    return (
      <Section display="flex" p="0" pt="2.5rem" mb="0">
        <Container type="container" pr="0" pl="0">
          {list.map(item => (
            <div key={item.product_info.id} className={styles.wishlistWrapper}>
              <Product
                key={item.product_info.id}
                name={item.product_info.data.name}
                price={item.product_info.netprice}
                cutprice={item.product_info.cutprice}
                saving={item.product_info.saving}
                image={getProductImage(item.product_info.images[0].path)}
                sku={item.product_info.data.sku}
                onClick={onClick(list, toggleWishList)}
                onOpenQuickViewModal={() => {
                  this.onOpenQuickViewModal(
                    item.product_info.data.sku,
                    Object.keys(item.product_info.data.simples)[0],
                    item.product_info.soldout,
                    item.product_info.data.reviews.rating.toFixed(1)
                  );
                }}
                isWishList={isInWishList(wishList, item.product_info.data.sku)}
                skuLoading={isInWishList(loadingList, item.product_info.data.sku)}
                rating={item.product_info.data.reviews.rating.toFixed(1)}
                reviewsCount={item.product_info.data.reviews.count}
                savingAmount={item.product_info.data.max_price - item.product_info.data.max_special_price}
                setProductPosition={productPosition}
                productURL={formatProductURL(item.product_info.data.name, item.product_info.data.sku)}
              />
              <Div mt="0" p="0.25rem 0.125rem 0.5rem">
                <AddToCart
                  simpleSku={Object.keys(item.product_info.data.simples)[0]}
                  sku={item.product_info.data.sku}
                  itemId={item.product_info.id}
                  isSoldOut={item.product_info.data.soldout}
                />
              </Div>
            </div>
          ))}
          {list && (
            <ResponsiveModal onCloseModal={this.onCloseQuickViewModal} open={openQuickView}>
              <QuickView
                onCloseModal={this.onCloseQuickViewModal}
                sku={quickViewSku}
                simpleSku={simpleSku}
                products={sanitizeWishList(list)}
                soldOut={this.state.soldOut}
                // deliveredBy={this.state.deliveredBy}
                rating={this.state.rating}
              />
            </ResponsiveModal>
          )}
        </Container>
      </Section>
    );
  }
}
Wishlist.defaultProps = {
  wishList: [],
  list: [],
  loadingList: []
};

Wishlist.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  productPosition: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  list: PropTypes.array,
  loadingList: PropTypes.array
};

export default connect(
  null,
  mapDispatchToProps
)(Wishlist);
