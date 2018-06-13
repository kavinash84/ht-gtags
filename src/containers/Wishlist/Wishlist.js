import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from 'components/Wishlist';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Menu from 'containers/MenuNew/index';
import MyMenu from 'components/MyMenu';
import { getSKUList } from '../../selectors/wishlist';

@connect(({ wishlist }) => ({
  wishlist,
  wishListedSKUs: getSKUList(wishlist)
}))
export default class WishlistContainer extends Component {
  static propTypes = {
    wishlist: PropTypes.object,
    wishListedSKUs: PropTypes.array.isRequired
  };
  static defaultProps = {
    wishlist: {}
  };
  render() {
    const { wishlist: { data }, wishListedSKUs } = this.props;
    return (
      <Div>
        <Menu />
        <MyMenu page="wishlist" />
        <Container type="container" pr="1rem" pl="1rem">
          <Row display="block" mr="0" ml="0" p="2rem 0">
            <Div col="12">
              <Wishlist list={data} wishList={wishListedSKUs} />
            </Div>
          </Row>
        </Container>
      </Div>
    );
  }
}
