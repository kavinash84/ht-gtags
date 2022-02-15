import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import Section from "hometown-components-dev/lib/SectionHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";

import Text from "hometown-components-dev/lib/TextHtV1";

import { getCartListSKU } from "selectors/cart";

import { addToCart } from "redux/modules/cart";
import "../ProductDetails/PdpModal/Slider.css";

import SlickSlider from "../SlickSlider";

const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");

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
    slidesToShow: length >= 2 ? 2 : length,
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
    render() {
        const { btProds, } = this.state;
        const { boughtTogether } = this.props;
        return (
            <React.Fragment>
                {btProds && Array.isArray(btProds) && btProds.length > 1 ?
                    (
                        <Section style={{
                            paddingBottom: "",
                            width: "100%",
                            margin: "auto"
                        }} >

                            <Div
                                className="carousel-one"
                                style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
                            >
                                <SlickSlider

                                    settings={adjustSlides((btProds && btProds.length) || 0)}
                                >
                                    {boughtTogether && boughtTogether.length
                                        ? boughtTogether.map((prod, index) => (
                                            <Link to={prod.link}>
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

                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            height: "250px",
                                                            display: "flex"
                                                        }}
                                                    >
                                                        <Img
                                                            src={prod.image}
                                                            alt="BT!"
                                                            height="100%"

                                                            m="auto"
                                                            style={{ border: "2px solid #FAF4F2", width: "auto" }}
                                                        />
                                                    </div>




                                                    <Text
                                                        ta="left"
                                                        fontSize="20px"
                                                        mt="12px"
                                                        mb="5px"
                                                        style={{ height: "40px", fontWeight: "bold" }}
                                                        lineHeight="1.3rem"
                                                    >
                                                        {prod.name.split('').length > 50 ? `${prod.name.slice(0, 50)}....` : prod.name}
                                                    </Text>


                                                    <Text
                                                        color="#F47020"
                                                        ta="left"
                                                        fontSize="20px"
                                                        mt="0px"
                                                        mb="3px"
                                                        style={{ height: "30px", fontWeight: 600 }}
                                                        lineHeight="1.3rem"
                                                    >
                                                        {prod.pricing_details.coupon_code
                                                            ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                                                            : `Price: ₹${prod.pricing_details.special_price}`}
                                                    </Text>




                                                </Div>
                                            </Link>
                                        ))
                                        : null}
                                </SlickSlider>
                            </Div>

                        </Section>
                    ) : null}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaughtTogether);
