import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from 'components/Wishlist';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import MyMenu from 'components/MyMenu';
import { getSKUList } from '../../selectors/wishlist';

const WishListIcon = require('../../../static/wishlist-empty.jpg');

@connect(({ wishlist }) => ({
  wishlist,
  wishListedSKUs: getSKUList(wishlist),
  wishlistKey: wishlist.key
}))
export default class WishlistContainer extends Component {
  static propTypes = {
    wishlist: PropTypes.object,
    wishlistKey: PropTypes.string,
    wishListedSKUs: PropTypes.array.isRequired
  };
  static defaultProps = {
    wishlist: {},
    wishlistKey: ''
  };
  render() {
    const {
      wishlist: { data },
      wishListedSKUs,
      wishlistKey
    } = this.props;
    return (
      <Div>
        <Menu />
        <MyMenu page="wishlist" />
        {data && data.length ? (
          <Container type="container" pr="0" pl="0">
            <Wishlist list={data} wishList={wishListedSKUs} wishlistKey={wishlistKey} />
          </Container>
        ) : (
          <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
            <Empty title="No items yet !!" subTitle="Add items to it" btnName="Continue Shopping" url="/" bg="#fafafa">
              <Img src={WishListIcon} width="initial" m="auto" alt="No items yet !!" />
            </Empty>
          </Section>
        )}
        <Footer />
      </Div>
    );
  }
}
