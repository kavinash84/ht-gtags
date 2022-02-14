import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Box from "hometown-components-dev/lib/BoxHtV1";
import PropTypes from "prop-types";
// import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
const styles = require("./Slider.scss");
const arrowForward = require("../../../../static/new-home/newForwardArrow.svg");

import { getCartListSKU } from "selectors/cart";

import { addToCart } from "redux/modules/cart";
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      btAddToCart: addToCart
    },
    dispatch
  );

const mapStateToProps = ({
  app: { sessionId },
  productdetails,
  pincode,
  cart
}) => ({
  session: sessionId,
  pincode,
  boughtTogether: productdetails.boughtTogether,
  product: productdetails.productDescription,
  cartSKUs: getCartListSKU(cart),
  addingToCart: cart.addingToCart,
  stateId: cart.key
});
class DBIteam extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      btProds: [this.props.product.meta, ...this.props.boughtTogether],
      btProdQty: {
        commonQty: 0
      },
      btTotal: 0
    };
  }
  render() {
    const { btProds, } = this.state;
    const { boughtTogether } = this.props;
    return (
      <div>

        {boughtTogether && boughtTogether.length
          ? boughtTogether.map((prod, index) => (
            <Box variant="section.catSliderItem" style={{ padding: "20px 20px" }}>
              <Div
                className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
                style={{
                  // paddingRight: '0px',
                  backgroundColor: "#ffffff",
                  padding: "0px 0px 20px",

                  marginTop: "auto"

                  // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
                }}
              >
                <Link
                  className={styles.link}
                  to={prod.link}
                  onClick={() => {
                    sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
                  }}
                >
                  <div>
                    <img
                      src={prod.image}

                      className={styles.curosalImg}
                      style={{
                        height: "auto",
                        width: "100%",
                        margin: "auto",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <Div className={styles.content4}>
                    <Div
                      style={{
                        fontSize: "18px",
                        textAlign: "left",
                        color: "#323F38"
                      }}
                      className={styles.name}
                    >
                      {prod.name.split('').length > 50 ? `${prod.name.slice(0, 50)}....` : prod.name}
                    </Div>

                    <Heading
                      style={{ textAlign: "left" }}
                      fontSize="12px"
                      fontFamily="regular"
                      fontWeight="bold"
                      color="black"
                      mt="16px"
                      color="#F47020"
                    >
                      {prod.pricing_details.coupon_code
                        ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                        : `Price: ₹${prod.pricing_details.special_price}`}
                    </Heading>
                  </Div>
                </Link>
              </Div>
            </Box>
          ))

          : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DBIteam);

