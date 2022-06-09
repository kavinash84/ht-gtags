import React from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import { Link } from 'react-router-dom';
import Image from 'hometown-components-dev/lib/ImageHtV1'; 
const LogoIcon = require("../../../static/logo.png");
const midline = require("../../../static/cart/midline.svg")

const styles = require('./CB.scss');
class CartBreadCumb extends React.Component {
  state = {
    currentRoute: '/checkout/cart'
  };
  componentDidMount() {
    const location = window.location.pathname;
    this.setState({ currentRoute: location });
  }
  render() {
    const { currentRoute } = this.state;
    return (
      <Div className={styles.CBContainer}>
      <div>
      <Link to="/">
            <Image
              src={LogoIcon}
              alt="logo"
              style={{ width: "150px", cursor: "pointer", marginTop: "5px" }}
            />
          </Link>
      </div>
        <div className={styles.CBContainerInnner}>
          <div className={currentRoute === '/checkout/cart' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>1</div>
            <div className={styles.text}>Shopping Cart</div>
            <img src={midline} alt="midline"/>
          </div>
          <div className={currentRoute === '/checkout/delivery-address' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>2</div>
            <div className={styles.text}>Address</div>
            <img src={midline} alt="midline"/>
          </div>
          <div className={currentRoute === '/checkout/payment-options' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>3</div>
            <div className={styles.text}>Payment</div>
          </div>
        </div>
      </Div>
    );
  }
}

export default CartBreadCumb;
