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
import { formatAmount } from "utils/formatters";

import SlickSlider from "../SlickSlider";

const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");
const formatPrice = price => {
    let newPrice = 0;
    if (price.length > 3 && price !== null) {
        newPrice = Number(price.replace(",", ""));
        return newPrice;
    }
    return Number(price);
};
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
const adjustSlides = length => ({
    slidesToShow: length >= 3 ? 3 : length,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
});

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

class MoreOption extends React.Component {
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

    componentDidUpdate(prevProps) {
        if (prevProps.prodQty !== this.props.prodQty) {
            if (prevProps.prodQty < this.props.prodQty) {
                this.updatebtTotal("inc", "no index");
            } else {
                this.updatebtTotal("dec", "no index");
            }
        }
    }

    render() {

        const { product, addingToCart, stateId, boughtTogether } = this.props;
        // const { sku, pricing_details: pricingDetails } = product;

        // const checkStatus = checkSKUInCart(cartSKUs, sku);
        // const addLoading = addingToCart && stateId === sku;
        return (
            <React.Fragment>

                <Div>
                    <SlickSlider
                        className="mainSlider"
                        settings={adjustSlides}
                    >

                        {boughtTogether && boughtTogether.length
                            ? boughtTogether.map((prod, index) => (
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
                                            <Img src={prod.image} alt="BT1" m="auto" style={{ height: '100%', width: 'auto' }} />
                                        </div>
                                    ) : prod.image ? (
                                        <div
                                            style={{
                                                position: "relative",
                                                height: "250px",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Link to={prod.link}>
                                                <Img src={prod.image}
                                                    alt="BT!"
                                                    height="100%"
                                                    width="auto%"
                                                    m="auto"
                                                    style={{ border: "2px solid #FAF4F2" }} />
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
                                            style={{ height: "30px", fontWeight: 600 }}
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
                                                style={{ height: "30px", fontWeight: 600 }}
                                                lineHeight="1.3rem"
                                            >
                                                {prod.pricing_details.coupon_code
                                                    ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                                                    : `Price: ₹${prod.pricing_details.special_price}`}
                                            </Text>
                                        )}
                                    {/* <Link to={prod.link}>
                                        <Div key={index} pl="1rem" pr="1rem" mb="1rem" style={{ height: '100px' }}>
                                            <div justifyContent="space-between" ml="0px" mr="0px" style={{ height: '100px' }}>
           
                                                <Div style={{ width: '50%' }}>
                                                    <Heading fontSize="12px" color="#323131" style={{ whiteSpace: 'normal' }}>
                                                        {prod.name.split('').length > 50 ? `${prod.name.slice(0, 50)}....` : prod.name}
                                                    </Heading>
                                                    <Text fontSize="12px" color="#F47020" mt="0px">
                                                        {prod.pricing_details.coupon_code
                                                            ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                                                            : `Price: ₹${prod.pricing_details.special_price}`}

                                                    </Text>
                                                </Div>
                                            </div>
                                        </Div>
                                    </Link> */}
                                </Div>
                            ))
                            : null}

                    </SlickSlider>

                </Div>


            </React.Fragment >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreOption);