import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import { getCartListSKU } from "selectors/cart";
import { PINCODE } from "helpers/Constants";
import { addToCart } from "redux/modules/cart";
import SlickSlider from "../SlickSlider";

const cartIcon = require("../../../static/pdp-icons/cart.png");

const checkSKUInCart = (list, sku) => list.includes(sku);

const adjustSlides = length => ({
  slidesToShow: length >= 3 ? 3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: false,
  arrows: false
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, margin: 0, width: "15px", top: "55%" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, margin: 0, width: "15px", top: "55%" }}
      />
    </React.Fragment>
  );
}

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

class BaughtTogether extends React.Component {
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

  updatebtProdQty = () => {
    const { btProds } = this.state;
    btProds.forEach((prod, index) => {
      this.setState(prevState => {
        let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
        if (index === 0 || index === 1) {
          btProdQty[`${prod.sku}`] = 1;
        } else {
          btProdQty[`${prod.sku}`] = 0;
        }
        return { btProdQty };
      });
    });
  };

  updatebtTotal = (val, i) => {
    const {
      product: {
        pricing_details: { coupon_code: couponCode }
      },
      product
    } = this.props;
    const { btProdQty, btProds } = this.state;
    btProds.forEach((prod, index) => {
      if (btProdQty[`${prod.sku}`] && index === i) {
        if (val === "inc") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal + Number(prod.special_price)
            });
          }
        } else if (val === "dec") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal - Number(prod.special_price)
            });
          }
        }
      } else if (!btProdQty[`${prod.sku}`] && index === i) {
        if (val === "inc") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(product.pricing_details.offer_price)) *
                  btProdQty[`${prod.sku}`]
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(formatPrice(prod.pricing_details.offer_price)) *
                  btProdQty[`${prod.sku}`]
            });
          } else {
            this.setState({
              btTotal:
                this.state.btTotal +
                Number(prod.special_price) * btProdQty[`${prod.sku}`]
            });
          }
        } else if (val === "dec") {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(product.pricing_details.offer_price)) *
                  (btProdQty[`${prod.sku}`] + 1)
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(prod.pricing_details.offer_price)) *
                  (btProdQty[`${prod.sku}`] + 1)
            });
          } else {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(prod.special_price) * (btProdQty[`${prod.sku}`] + 1)
            });
          }
        }
      }
    });
  };

  buySet = e => {
    e.preventDefault();
    const { session, pincode, product, btAddToCart } = this.props;
    const { simples } = product;
    const simpleSku = Object.keys(simples)[0];
    const { btProds, btProdQty } = this.state;
    const pin = pincode.selectedPincode ? pincode.selectedPincode : PINCODE;

    btProds.forEach((prod, index) => {
      if (index === 0) {
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(
            prod.sku,
            prod.sku,
            simpleSku,
            session,
            pin,
            prod.configId,
            btProdQty[`${prod.sku}`]
          );
        }
      } else {
        const simpleSKU = Object.keys(prod.simples)[0];
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(
            prod.sku,
            prod.sku,
            simpleSKU,
            session,
            pin,
            prod.configId,
            btProdQty[`${prod.sku}`]
          );
        }
      }
    });
  };

  setbtTotal = () => {
    const { btProds } = this.state;
    const {
      boughtTogether,
      product,
      product: {
        pricing_details: { coupon_code: couponCode }
      }
    } = this.props;
    if (btProds.length > 1 && boughtTogether !== "Method Not Allowed") {
      if (couponCode) {
        if (btProds[1].pricing_details.coupon_code) {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              Number(formatPrice(btProds[1].pricing_details.offer_price))
          });
        } else {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              (Number(formatPrice(btProds[1].pricing_details.special_price))
                ? Number(formatPrice(btProds[1].pricing_details.special_price))
                : Number(formatPrice(btProds[1].pricing_details.mrp)))
          });
        }
      } else {
        this.setState({
          btTotal:
            (Number(formatPrice(product.pricing_details.special_price))
              ? Number(formatPrice(product.pricing_details.special_price))
              : Number(formatPrice(product.pricing_details.mrp))) +
            (Number(formatPrice(btProds[1].pricing_details.special_price))
              ? Number(formatPrice(btProds[1].pricing_details.special_price))
              : Number(formatPrice(btProds[1].pricing_details.mrp)))
        });
      }
    }
  };

  componentDidMount() {
    this.updatebtProdQty();
    this.setbtTotal();
  }

  render() {
    const { btProds, btProdQty, btTotal } = this.state;
    const {
      cartSKUs,
      product,
      addingToCart,
      stateId,
      session,
      pincode
    } = this.props;
    const { sku, simples, pricing_details: pricingDetails } = product;
    const {
      mrp,
      special_price: csp,
      offer_price: offerPrice = 0,
      coupon_code: couponCode,
      offer_discount_percentage: offerDiscountPercentage
    } = pricingDetails;
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === sku;
    const simpleSku = Object.keys(simples)[0];
    return (
      <React.Fragment>
        {btProds && btProds.length ? (
          <Section>
            <Heading color="#222222" ta="center">
              Bought Together
            </Heading>
            <Div>
              <SlickSlider className="mainSlider" settings={adjustSlides(8)}>
                {btProds && btProds.length
                  ? btProds.map((prod, index) => (
                      <Div
                        key={index}
                        style={{
                          position: "relative",
                          borderRadius: "5px",
                          height: "auto"
                        }}
                        p="10px"
                        bg="white"
                      >
                        {index === 0 ? (
                          <div
                            style={{
                              position: "relative",
                              height: "250px",
                              display: "flex"
                            }}
                          >
                            <Img
                              src={`${product.image}.jpg`}
                              alt="BT!"
                              height="100%"
                              width="auto%"
                              m="auto"
                              style={{ border: "2px solid #FAF4F2" }}
                            />
                          </div>
                        ) : prod.image ? (
                          <div
                            style={{
                              position: "relative",
                              height: "250px",
                              display: "flex"
                            }}
                          >
                            <Link to={prod.link}>
                              <Img
                                src={prod.image}
                                alt="BT!"
                                height="100%"
                                width="auto%"
                                m="auto"
                                style={{ border: "2px solid #FAF4F2" }}
                              />
                            </Link>
                          </div>
                        ) : null}
                        {prod.name ? (
                          <Text
                            ta="left"
                            fontSize="12px"
                            mt="12px"
                            mb="3px"
                            style={{ height: "40px", fontWeight: "bold" }}
                            lineHeight="1.3rem"
                          >
                            {prod.name.split("").length > 50
                              ? `${prod.name.slice(0, 50)}....`
                              : prod.name}
                          </Text>
                        ) : null}
                        {index !== 0 ? (
                          <Text
                            ta="left"
                            fontSize="12px"
                            mt="0px"
                            mb="3px"
                            style={{ height: "30px", fontWeight: "bold" }}
                            lineHeight="1.3rem"
                          >
                            {prod.pricing_details.coupon_code
                              ? `Offer Price: ₹ ${prod.pricing_details.offer_price}`
                              : prod.pricing_details.special_price !== "0"
                              ? `Price: ₹ ${prod.pricing_details.special_price}`
                              : `Price: ₹ ${prod.pricing_details.mrp}`}
                          </Text>
                        ) : (
                          <Text
                            ta="left"
                            fontSize="12px"
                            mt="0px"
                            mb="3px"
                            style={{ height: "30px", fontWeight: "bold" }}
                            lineHeight="1.3rem"
                          >
                            {couponCode
                              ? `Offer Price: ₹ ${offerPrice}`
                              : csp !== "0"
                              ? `Price: ₹ ${csp}`
                              : `Price: ₹ ${mrp}`}
                          </Text>
                        )}
                        <Row
                          ml="0px"
                          mr="0px"
                          style={{ width: "100%" }}
                          justifyContent="flex-start"
                        >
                          <Row
                            ml="0px"
                            mr="0px"
                            justifyContent="center"
                            style={{
                              alignItems: "center",
                              width: "50%",
                              border: "1px solid #E9916B",
                              borderRadius: "5px"
                            }}
                          >
                            <Button
                              width="30%"
                              pl="0.5rem"
                              pr="0.5rem"
                              style={{ border: "none" }}
                              onClick={() => {
                                if (index === 0) {
                                  if (this.state.btProdQty[`${prod.sku}`] > 1) {
                                    this.setState(
                                      prevState => {
                                        // btProdQty : btProdQty[`${prod.name}`] += 1
                                        let btProdQty = Object.assign(
                                          {},
                                          prevState.btProdQty
                                        ); //creating copy of state variable btProdQty
                                        btProdQty[`${prod.sku}`] -= 1;
                                        return { btProdQty };
                                      },
                                      () => {
                                        this.updatebtTotal("dec", index);
                                      }
                                    );
                                  }
                                } else {
                                  if (this.state.btProdQty[`${prod.sku}`] > 0) {
                                    this.setState(
                                      prevState => {
                                        // btProdQty : btProdQty[`${prod.name}`] += 1
                                        let btProdQty = Object.assign(
                                          {},
                                          prevState.btProdQty
                                        ); //creating copy of state variable btProdQty
                                        btProdQty[`${prod.sku}`] -= 1;
                                        return { btProdQty };
                                      },
                                      () => {
                                        this.updatebtTotal("dec", index);
                                      }
                                    );
                                  }
                                }
                              }}
                            >
                              -
                            </Button>
                            <Div
                              style={{
                                width: "30%",
                                textAlign: "center"
                              }}
                            >
                              {btProdQty[`${prod.sku}`]
                                ? btProdQty[`${prod.sku}`]
                                : btProdQty.commonQty}
                            </Div>
                            <Button
                              width="30%"
                              pl="0.5rem"
                              pr="0.5rem"
                              style={{ border: "none" }}
                              onClick={() => {
                                if (this.state.btProdQty[`${prod.sku}`] < 5) {
                                  this.setState(
                                    prevState => {
                                      // btProdQty : btProdQty[`${prod.name}`] += 1
                                      let btProdQty = Object.assign(
                                        {},
                                        prevState.btProdQty
                                      ); //creating copy of state variable btProdQty
                                      btProdQty[`${prod.sku}`] += 1;
                                      return { btProdQty };
                                    },
                                    () => {
                                      this.updatebtTotal("inc", index);
                                    }
                                  );
                                }
                              }}
                            >
                              +
                            </Button>
                          </Row>
                          <Div
                            ml="1rem"
                            style={{
                              width: "40%",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center"
                            }}
                          >
                            {index === 0 ? (
                              <Img
                                src={cartIcon}
                                alt="Cart icon"
                                height="20px"
                                style={{ width: "auto" }}
                                onClick={() =>
                                  this.props.btAddToCart(
                                    prod.sku,
                                    prod.sku,
                                    simpleSku,
                                    session,
                                    pincode.selectedPincode,
                                    prod.configId,
                                    btProdQty[`${prod.sku}`]
                                  )
                                }
                              />
                            ) : (
                              <Img
                                src={cartIcon}
                                alt="Cart icon"
                                height="20px"
                                style={{ width: "auto" }}
                                onClick={() =>
                                  this.props.btAddToCart(
                                    prod.sku,
                                    prod.sku,
                                    Object.keys(prod.simples)[0],
                                    session,
                                    pincode.selectedPincode,
                                    prod.configId,
                                    btProdQty[`${prod.sku}`]
                                  )
                                }
                              />
                            )}
                          </Div>
                        </Row>
                      </Div>
                    ))
                  : null}
              </SlickSlider>
            </Div>
            <Div>
              <Text
                ta="center"
                mb="0px"
                fontSize="14px"
                color="#222222"
                style={{ fontWeight: "bold" }}
              >
                Total Price: ₹ {formatAmount(btTotal)}
              </Text>
              {couponCode ? (
                <Text ta="center" mt="0px" fontSize="14px">
                  Price inclusive of Extra {offerDiscountPercentage}% Use Code:{" "}
                  <Span fontSize="14px" color="#E9916B" tt="uppercase">
                    {couponCode}
                  </Span>
                </Text>
              ) : null}
              {!checkStatus ? (
                <Button
                  style={{
                    backgroundColor: "#E9916B",
                    borderRadius: "5px",
                    color: "white",
                    width: "40%",
                    display: "block"
                  }}
                  m="auto"
                  mt="1rem"
                  onClick={this.buySet}
                >
                  {addLoading ? "Adding.." : "Buy Set"}
                </Button>
              ) : (
                <Link to="/checkout/cart">
                  <Button
                    style={{
                      backgroundColor: "#E9916B",
                      borderRadius: "5px",
                      color: "white",
                      width: "40%",
                      display: "block"
                    }}
                    m="auto"
                    mt="1rem"
                  >
                    Go to Cart
                  </Button>
                </Link>
              )}
            </Div>
          </Section>
        ) : null}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaughtTogether);
