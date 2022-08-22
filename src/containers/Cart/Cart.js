/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import CartBreadCumb from "components/Cart/breadDumb";

/**
 * Modules / Selectors
 */
import { resetCheck } from "redux/modules/cart";
import { getCartList, getStockOutProducts } from "selectors/cart";
import { togglePopUp } from "redux/modules/webtochat";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Body from "hometown-components-dev/lib/BodyHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";

/**
 * Page Components
 */
import Cart from "components/Cart";
import Footer from "components/Footer";
import Header from "components/Header";
import CartShimmer from "components/Cart/CartShimmer";
import PinCode from "components/PinCode";
import ResponsiveModal from "components/Modal";
import Notifications from "components/Notifications";
import EmptyNew from "./EmptyNew";
import UnbxdRecommendedForYou from "../../components/Unbxd/unbxdRecommendedForYou";
import { WEViewCart } from "../../redux/modules/cart";
import HappyToHelp from "../../components/Cart/HappyToHelp";

/**
 * Icons / Images
 */
const wheeling_cart = require("../../../static/cart/wheeling_cart.svg");
const PincodeModalIcon = require("../../../static/map-placeholder.svg");
const BajajFinance = require("../../../static/bajaj-finance.png");

const HdfcLogo = "https://static.hometown.in/media/cms/BankLOGO/hdfc.gif";

const demoProductsBanner = cart =>
  cart.some(({ product_info: { demo_product: demoProduct } }) => demoProduct);

const BflPopMessage = () => (
  <Box>
    <Flex justifyContent="center">
      <Flex mr={20}>
        <img height={30} src={BajajFinance} alt="baja-finance" />
      </Flex>
      <Flex>
        <img height={30} src={HdfcLogo} alt="hdfc" />
      </Flex>
    </Flex>
    <Heading
      textAlign="center"
      fontSize="1.1rem"
      lineHeight="1.55"
      mb="0.625rem"
      mt="0.625rem"
      color="rgba(51, 51, 51, 0.85)"
      fontFamily="light"
    >
      You are eligible for a zero-down payment No Cost EMI from Bajaj Finance if
      you have a <strong>Bajaj Finance EMI Card</strong>.
    </Heading>
    <Heading
      textAlign="center"
      fontSize="1.1rem"
      lineHeight="1.55"
      mb="0.625rem"
      mt="0.625rem"
      color="rgba(51, 51, 51, 0.85)"
      fontFamily="light"
    >
      You are also eligible for an interest free EMI for 3 months if you have a{" "}
      <strong>HDFC Credit/Debit Card</strong>.
    </Heading>
  </Box>
);

const HdfcPopMessage = () => (
  <Box>
    <Flex justifyContent="center">
      <img height={30} src={HdfcLogo} alt="hfdc" />
    </Flex>
    <Heading
      textAlign="center"
      fontSize="1.1rem"
      lineHeight="1.55"
      mb="0.625rem"
      mt="0.625rem"
      color="rgba(51, 51, 51, 0.85)"
      fontFamily="light"
    >
      You are also eligible for an interest free EMI for 3 months if you have a{" "}
      <strong>HDFC Credit/Debit Card</strong>.
    </Heading>
  </Box>
);

@connect(
  ({
    cart,
    cart: {
      cartChecked,
      summary,
      error,
      loading,
      loaded,
      initialLoading,
      contact
    },
    webtochat: { dismiss, cartTimeout },
    paymentoptions
  }) => ({
    results: getCartList(cart),
    outOfStockList: getStockOutProducts(cart),
    isCartChecked: cartChecked,
    summary,
    contact,
    error,
    initialLoading,
    loading,
    loaded,
    dismiss,
    cartTimeout,
    bflMinAmount: paymentoptions.bflMinAmount
  }),
  {
    resetCheckKey: resetCheck,
    toggleWebToChat: togglePopUp
  }
)
export default class CartContainer extends Component {
  static propTypes = {
    results: PropTypes.array,
    summary: PropTypes.object,
    contact: PropTypes.object,
    isCartChecked: PropTypes.bool,
    outOfStockList: PropTypes.array,
    history: PropTypes.object.isRequired,
    resetCheckKey: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    initialLoading: PropTypes.bool,
    dismiss: PropTypes.bool,
    cartTimeout: PropTypes.number.isRequired,
    toggleWebToChat: PropTypes.func.isRequired,
    bflMinAmount: PropTypes.number.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    results: [],
    summary: null,
    contact: null,
    isCartChecked: false,
    outOfStockList: [],
    loading: false,
    initialLoading: false,
    // loaded: false,
    dismiss: false
  };
  state = {
    popUpTimeoutId: null,
    responsiveModalContent: null,
    open: false,
    emiPopUpShown: false
  };

  componentDidMount() {
    const {
      cartTimeout,
      summary: { total }
    } = this.props;
    window.scroll(0, 0);
    const popUpTimeoutId = setTimeout(this.webToChat, cartTimeout);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ popUpTimeoutId });
    // this.checkForEmiEligibility(total);
    const { dispatch } = this.context.store;
    const { results } = this.props;
    if (results && results.length) {
      dispatch(WEViewCart());
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      isCartChecked,
      history,
      resetCheckKey,
      summary: { total },
      contact
    } = this.props;
    const {
      summary: { total: nextPropsTotal }
    } = nextProps;
    if (!isCartChecked && nextProps.isCartChecked) {
      const { dispatch } = this.context.store;
      dispatch(resetCheckKey());
      return history.push("/checkout/delivery-address");
    }
    // if (total !== nextPropsTotal) {
    //   this.checkForEmiEligibility(nextPropsTotal);
    // }
  }
  componentWillUnmount() {
    const { toggleWebToChat } = this.props;
    const { popUpTimeoutId } = this.state;
    clearTimeout(popUpTimeoutId);
    toggleWebToChat(false);
  }

  // checkForEmiEligibility = total => {
  //   const { emiPopUpShown } = this.state;

  //   if (total >= 20000 && !emiPopUpShown) {
  //     this.setState({
  //       open: true,
  //       responsiveModalContent: 'emiModal',
  //       emiPopUpShown: true
  //     });
  //   }
  // };

  handleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      open: !this.state.open
    });
  };

  handlePincodeModal = e => {
    const { open } = this.state;
    if (e) {
      e.preventDefault();
    }
    this.setState({
      open: !this.state.open,
      responsiveModalContent: open ? null : "pincodeModal"
    });
  };

  // handleEmiModal = e => {
  //   const { open } = this.state;
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   this.setState({
  //     open: !open,
  //     responsiveModalContent: open ? null : 'emiModal'
  //   });
  // };
  webToChat = () => {
    // const { dispatch } = this.context.store;
    const { toggleWebToChat, dismiss } = this.props;

    const {
      embedded_svc: {
        liveAgentAPI: { inviteButton: { isAvailable } = {} } = {}
      }
    } = window;
    if (isAvailable && !dismiss) toggleWebToChat(true);
  };
  render() {
    const {
      results,
      summary,
      contact,
      summary: { total },
      loading,
      initialLoading,
      outOfStockList,
      bflMinAmount
    } = this.props;
    const { responsiveModalContent, open, emiPopUpShown } = this.state;
    const modalClass = emiPopUpShown ? "noCostEmiModal" : "pincodeModal";

    return (
      <Wrapper>
        <Helmet title="Cart - HomeTown.in">
          <script type="text/javascript">
            {`
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '1024172491523922');
             fbq('track', 'add to cart');                         
            `}
          </script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-845903914"
          ></script>
          <script type="text/javascript">
            {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
           
             gtag('config', 'AW-845903914');
            `}
          </script>
        </Helmet>
        <Body>
          {/* Header */}
          {/* <Header /> */}

          {/* {loading && !loaded && <CartShimmer />} */}
          {initialLoading ? (
            <div
              style={{
                height: "calc(100vh - 60px)",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: 600
              }}
            >
              Please Wait...
            </div>
          ) : results && results.length === 0 ? (
            <div>
              <CartBreadCumb />
              <Section
                display="flex"
                padding="0.625rem"
                paddingTop="1.25rem"
                mb={0}
              >
                <EmptyNew
                  title="Your Cart is Empty!"
                  subTitle="Looks like you haven’t made your choice yet."
                  btnName="Shop Now"
                  url="/"
                  subTitleWidth="43%"
                  p="10"
                >
                  <Image
                    src={wheeling_cart}
                    width="initial"
                    m="auto"
                    alt="Sorry no results found"
                  />
                </EmptyNew>
              </Section>
              <div style={{ marginTop: "80px" }}>
                <HappyToHelp data={contact} />
              </div>
            </div>
          ) : null}
          {!loading && results && results.length !== 0 ? (
            <Box className="asdfgh">
              {/* {outOfStockList && outOfStockList.length > 0 && (
                <Notifications
                  msg="One or more items in your cart are out of stock. Please remove to continue"
                  type="error"
                />
              )} */}
              <Cart
                demoProductsBanner={demoProductsBanner(results)}
                results={results}
                summary={summary}
                outOfStockList={outOfStockList}
                handlePincodeModal={this.handlePincodeModal}
              />
              <Section>
                {/* Unbxd recommended for you */}
                <UnbxdRecommendedForYou />
              </Section>
            </Box>
          ) : (
            loading && <CartShimmer />
          )}

          {/* Pincode Modal */}
          <ResponsiveModal
            classNames={{ modal: modalClass }}
            onCloseModal={this.handleModal}
            open={open}
          >
            {responsiveModalContent === "pincodeModal" ? (
              <Box>
                <Image
                  width="100px"
                  m="auto"
                  mb="1.5rem"
                  src={PincodeModalIcon}
                  alt="Pincode"
                />
                <Heading
                  ellipsis={false}
                  color="rgba(0.0.0.0.8)"
                  textAlign="center"
                  fontSize="1.375rem"
                  mb="1rem"
                  fontFamily="light"
                >
                  Please enter your Pincode to serve you better
                </Heading>
                <PinCode
                  color="#f2f2f2"
                  onCloseModal={this.handlePincodeModal}
                />
              </Box>
            ) : null}
          </ResponsiveModal>
          {/* {responsiveModalContent === 'emiModal' ? (
              <Box> */}
          {/* {total > bflMinAmount ? <BflPopMessage /> : <HdfcPopMessage />} */}
          {/* <HdfcPopMessage /> */}
          {/* </Box>
            ) : null} */}

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
