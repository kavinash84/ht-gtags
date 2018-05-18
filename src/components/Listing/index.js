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
import { getProducts } from 'selectors/products';
import { getWishList } from 'selectors/wishlist';
import * as actionCreators from 'redux/modules/wishlist';

// import ProductItems from '../../data/RecentlyViewedProducts.js';

const mapStateToProps = state => ({
  products: getProducts(state),
  wishList: getWishList(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const onClick = dispatcher => sku => e => {
  e.preventDefault();
  dispatcher(sku);
};

const isInWishList = (list, id) => list.includes(id);

const Listing = ({ toggleWishList, products, wishList }) => (
  <Div type="block">
    <Section mb="0.3125rem" p="1rem 0.5rem" bg="primary">
      <Container pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Heading
            fontFamily="SFPDLight"
            fontSize="1.25rem"
            color="white"
            mb="0px"
            mt="0px"
            className="searchTitle"
            ls="1.2px"
          >
            Showing results for “One Seater Sofas”
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section pt="1.25rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
      <Container pr="0" pl="0">
        {products.map(item => (
          <Product
            key={item.id}
            itemData={item}
            onClick={onClick(toggleWishList)}
            isWishList={isInWishList(wishList, item.sku_id)}
            rating
            col="4"
          />
        ))}
      </Container>
    </Section>
  </Div>
);

Listing.defaultProps = {
  wishList: []
};

Listing.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  wishList: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
