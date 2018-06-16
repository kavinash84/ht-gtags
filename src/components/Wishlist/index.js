import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/wishlist';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Product from 'hometown-components/lib/Product';
import Section from 'hometown-components/lib/Section';
import ResponsiveModal from 'components/Modal';
import QuickView from 'components/QuickView/QuickView';

const getProductImage = url => {
  const pp = `${url.split('/').slice(-1)}`;
  return url.replace(pp, '1-product_500.jpg');
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

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
    quickViewSku: ''
  };
  onOpenQuickViewModal = sku => {
    this.setState({ openQuickView: true, quickViewSku: sku });
  };
  onCloseQuickViewModal = () => {
    this.setState({ openQuickView: false });
  };

  render() {
    const { list, toggleWishList, wishList } = this.props;
    const { quickViewSku, openQuickView } = this.state;
    return (
      <Div type="block">
        <Section p="0" pt="1.25rem" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
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
                    this.onOpenQuickViewModal(item.product_info.data.sku);
                  }}
                  isWishList={isInWishList(wishList, item.product_info.data.sku)}
                  rating={item.product_info.data.reviews.rating.toFixed(1)}
                  reviewsCount={item.product_info.data.reviews.count}
                  savingAmount={item.product_info.data.max_price - item.product_info.data.max_special_price}
                />
              </div>
            ))}
            {list && (
              <ResponsiveModal onCloseModal={this.onCloseQuickViewModal} open={openQuickView}>
                <QuickView
                  onCloseModal={this.onCloseQuickViewModal}
                  sku={quickViewSku}
                  products={sanitizeWishList(list)}
                />
              </ResponsiveModal>
            )}
          </Container>
        </Section>
      </Div>
    );
  }
}
Wishlist.defaultProps = {
  wishList: [],
  list: []
};

Wishlist.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  list: PropTypes.array
};

export default connect(
  null,
  mapDispatchToProps
)(Wishlist);
