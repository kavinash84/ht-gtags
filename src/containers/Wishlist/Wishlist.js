import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from 'components/Wishlist';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Empty from 'hometown-components-dev/lib/Empty';
import Img from 'hometown-components-dev/lib/Img';
import Section from 'hometown-components-dev/lib/Section';
import MyMenu from 'components/MyMenu';
import MenuFooter from 'containers/MenuFooter';
import { getSKUList, getWishList } from '../../selectors/wishlist';

const WishListIcon = require('../../../static/wishlist-empty.jpg');

@connect(({ wishlist }) => ({
  wishlistData: getWishList(wishlist),
  wishListedSKUs: getSKUList(wishlist),
  wishlistKey: wishlist.key,
  loadingList: wishlist.loadingList
}))
export default class WishlistContainer extends Component {
  static propTypes = {
    wishlistData: PropTypes.array,
    loadingList: PropTypes.array,
    wishListedSKUs: PropTypes.array.isRequired
  };
  static defaultProps = {
    wishlistData: [],
    loadingList: []
  };
  render() {
    const { wishlistData, wishListedSKUs, loadingList } = this.props;
    console.log(wishlistData, '@#$%^&*&^%$#@#$%^&*');
    return (
      <Box>
        <MenuFooter pageTitle="Wishlist">
          <MyMenu page="wishlist" />
          {wishlistData && wishlistData.length ? (
            <Wishlist list={wishlistData} wishList={wishListedSKUs} loadingList={loadingList} />
          ) : (
            <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Empty
                title="No wishlisted products yet !!"
                subTitle="Add items to it"
                btnName="Continue Shopping"
                url="/"
                bg="#fafafa"
              >
                <Img src={WishListIcon} width="initial" m="auto" alt="No items yet !!" />
              </Empty>
            </Section>
          )}
        </MenuFooter>
      </Box>
    );
  }
}
