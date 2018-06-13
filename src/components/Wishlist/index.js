import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/wishlist';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Product from 'hometown-components/lib/Product';
import Section from 'hometown-components/lib/Section';

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

const Wishlist = ({ list, toggleWishList, wishList }) => (
  <Div type="block">
    <Section p="0" pt="1.25rem" mb="0">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        {list.map(item => (
          <div className={styles.wishlistWrapper}>
            <Product
              key={item.product_info.id}
              name={item.product_info.data.name}
              price={item.product_info.netprice}
              cutprice={item.product_info.cutprice}
              saving={item.product_info.saving}
              image={getProductImage(item.product_info.images[0].path)}
              sku={item.product_info.data.sku}
              onClick={onClick(list, toggleWishList)}
              isWishList={isInWishList(wishList, item.product_info.data.sku)}
              rating={item.product_info.data.reviews.rating.toFixed(1)}
              reviewsCount={item.product_info.data.reviews.count}
              savingAmount={item.product_info.data.max_price - item.product_info.data.max_special_price}
            />
          </div>
        ))}
      </Container>
    </Section>
  </Div>
);
Wishlist.defaultProps = {
  wishList: [],
  list: []
};

Wishlist.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  list: PropTypes.array
};

export default connect(null, mapDispatchToProps)(Wishlist);
