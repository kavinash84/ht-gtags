import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from 'components/Wishlist';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Empty from 'hometown-components-dev/lib/EmptyHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
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
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />
          {wishlistData && wishlistData.length ? (
            <Wishlist list={wishlistData} wishList={wishListedSKUs} loadingList={loadingList} />
          ) : (
            <SectionHtV1 display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Empty
                title="No wishlisted products yet !!"
                subTitle="Add items to it"
                btnName="Continue Shopping"
                url="/"
                bg="#fafafa"
              >
                <ImageHtV1 src={WishListIcon} width="initial" m="auto" alt="No items yet !!" />
              </Empty>
            </SectionHtV1>
          )}
          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
