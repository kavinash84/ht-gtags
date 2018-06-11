import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import Search from 'components/Search';
import ResponsiveModal from 'components/Modal';
import Pincode from 'components/Pincode';
import { HOME_URL } from 'helpers/Constants';

const LogoIcon = require('../../../static/logo.png');
const CartIcon = require('../../../static/cart-icon.svg');
const MapIcon = require('../../../static/map-icon.svg');
const PhoneIcon = require('../../../static/phone-icon.svg');
const FavIcon = require('../../../static/fav-icon.svg');
const UserIcon = require('../../../static/user-icon.svg');

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
              <Img src={MapIcon} alt="Hometown" height="24px" mr="0.625rem" float="left" />
              <Span fontSize="0.875rem">{selectedPincode !== '' ? selectedPincode : 'Pincode'}</Span>
            </button>
            <ResponsiveModal
              classNames={{ modal: styles.pincodeModal }}
              onCloseModal={this.onCloseModal}
              open={this.state.open}
            >
              <Pincode onCloseModal={this.onCloseModal} />
            </ResponsiveModal>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={PhoneIcon} alt="Hometown" height="24px" mr="0.625rem" float="left" />
              <Span fontSize="0.875em">1800-210-0004</Span>
            </Link>
            <Button p="0" className={styles.heartBtn} ml="1.25rem">
              <Img src={FavIcon} alt="Wishlist" height="24px" mr="0.625rem" float="left" />
              <span className={styles.count}>0</span>
            </Button>
            <Link className={styles.cart} to={HOME_URL}>
              <Img src={CartIcon} alt="Hometown" height="24px" />
              <span className={styles.count}>0</span>
            </Link>
            <Button p="0" className={styles.heartBtn} ml="1.25rem">
              <Img src={UserIcon} alt="Account" height="24px" mr="0.625rem" float="left" />
            </Button>
            <div className={`${styles.yourAccount}`}>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Label fontWeight="regular" fontSize="1rem" mb="0.75rem" mt="0" color="black">
                    Your Account
                  </Label>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <div className={styles.yourAccountWrapper}>
                  <Div col="6" pr="5px">
                    <Link to={HOME_URL}>Sign Up</Link>
                  </Div>
                  <Div col="6" pl="5px">
                    <Link to={HOME_URL}>Log In</Link>
                  </Div>
                </div>
              </Row>
            </div>
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
