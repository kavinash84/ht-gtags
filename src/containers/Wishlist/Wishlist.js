import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from 'components/Wishlist';
import Menu from 'containers/MenuNew/index';
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
      <div>
        <Menu />
        <Wishlist list={data} wishList={wishListedSKUs} />
      </div>
    );
  }
}
