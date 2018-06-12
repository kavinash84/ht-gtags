import React from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Product from 'hometown-components/lib/Product';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux/modules/wishlist';

// import ProductItems from '../../data/RecentlyViewedProducts.js';
const getProductImage = url => {
  const pp = `${url.split('/').slice(-1)}`;
  return url.replace(pp, '1-product_500.jpg');
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const onClick = dispatcher => sku => e => {
  e.preventDefault();
  dispatcher(sku);
};

const isInWishList = (list, id) => list.includes(id);

const styles = require('./Listing.scss');

const Listing = ({
  toggleWishList, products, categoryName, productCount, wishList
}) => (
  <Div type="block">
    <Section mb="0.3125rem" p="1rem 0.5rem" bg="primary">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Heading
            fontWeight="300"
            fontSize="1.25rem"
            color="white"
            mb="0px"
            mt="0px"
            className="searchTitle"
            ls="1.2px"
          >
            {categoryName} ({productCount})
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section pt="1.25rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
      <Container pr="0" pl="0">
        {products.map(item => (
          <div className={styles.productWrapper}>
            <Product
              key={item.id}
              name={item.data.name}
              price={item.netprice}
              cutprice={item.cutprice}
              saving={item.saving}
              image={getProductImage(item.images[0].path)}
              sku={item.data.sku}
              onClick={onClick(toggleWishList)}
              isWishList={isInWishList(wishList, item.data.sku)}
              rating={item.data.reviews.rating.toFixed(1)}
              reviewsCount={item.data.reviews.count}
              savingAmount={item.data.max_price - item.data.max_special_price}
            />
          </div>
        ))}
      </Container>
    </Section>
  </Div>
);

Listing.defaultProps = {
  wishList: [],
  categoryName: '',
  productCount: ''
};

Listing.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  wishList: PropTypes.array,
  categoryName: PropTypes.string,
  productCount: PropTypes.string
};

export default connect(null, mapDispatchToProps)(Listing);
