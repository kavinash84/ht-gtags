import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import Search from 'components/Search';
import ResponsiveModal from 'components/Modal';
import Pincode from 'components/Pincode';
import { HOME_URL } from 'helpers/Constants';

const LogoIcon = require('../../../static/logo.png');
const CartIcon = require('../../../static/cart-icon.svg');
const MapIcon = require('../../../static/map-icon.svg');
const PhoneIcon = require('../../../static/phone-icon.svg');
const FavIcon = require('../../../static/fav-icon.svg');

@connect(({ pincode }) => ({
  selectedPincode: pincode.selectedPincode
}))
export default class MenuSidebar extends Component {
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const styles = require('./TopBar.scss');
    const { selectedPincode } = this.props;
    return (
      <div>
        <div className={styles.hamburger}>
          <Div col="2">
            <div className={styles.logoWrapper}>
              <Link to={HOME_URL}>
                <Img src={LogoIcon} alt="Hometown" />
              </Link>
            </div>
          </Div>
          <Div col="5">
            <Search />
          </Div>
          <Div col="5" ta="right" pt="0.625rem">
            <button onClick={this.onOpenModal}>
              <Img src={MapIcon} alt="Hometown" height="26px" mr="0.625rem" float="left" />
              <Span fontSize="0.875rem">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Span>
            </button>
            <ResponsiveModal onCloseModal={this.onCloseModal} open={this.state.open}>
              <Pincode />
            </ResponsiveModal>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={PhoneIcon} alt="Hometown" height="26px" mr="0.625rem" float="left" />
              <Span fontSize="0.875em">1800-210-0004</Span>
            </Link>
            <Button p="0" m className={styles.heartBtn} ml="1.25rem">
              <Img src={FavIcon} alt="Wishlist" height="26px" mr="0.625rem" float="left" />
              <span className={styles.count}>0</span>
            </Button>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={CartIcon} alt="Hometown" height="26px" />
              <span className={styles.count}>0</span>
            </Link>
          </Div>
        </div>
      </div>
    );
  }
}

MenuSidebar.defaultProps = {
  selectedPincode: ''
};

MenuSidebar.propTypes = {
  selectedPincode: PropTypes.string
};
