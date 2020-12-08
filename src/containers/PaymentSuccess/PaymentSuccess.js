import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import ThankYou from 'newComponents/ThankYou';

/**
 * Modules / Utils / Reducers
 */
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';

const mapStateToProps = ({ paymentstatus: { data, loaded, error } }) => ({
  data,
  loaded,
  error
});
class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount = () => {
    console.log('Inside component did mount of payment success', this.props);
    const { history, data, error } = this.props;
    if (!data) history.push('/');

    if (data && error === '') {
      const { dispatch } = this.context.store;
      this.groupSimilarProducts();
      dispatch({
        type: 'PUSH_TO_DATALAYER'
      });
    }
  };
  groupSimilarProducts = () => {
    const {
      data: { cart_products: cartProducts }
    } = this.props;
    let products = [];
    cartProducts.forEach(arr => {
      if (products[arr.sku] && products[arr.sku].sku === arr.sku) {
        products[arr.sku].qty += 1;
      } else {
        products[arr.sku] = {
          sku: arr.sku,
          confSku: arr.details.groupedattributes.sku,
          name: arr.name,
          image: arr.details.image,
          deliveryTime: arr.delivery_text,
          qty: arr.qty,
          price: arr.price,
          color: arr.color
        };
      }
    });
    products = Object.values(products);
    this.setState({ products });
  };
  render() {
    if (this.props.data) {
      const {
        data,
        data: {
          sub_total_amount: subTotal,
          discount_coupon_value: discount,
          net_order_amount: totalAmount,
          shipping_charges: shippingCharges,
          set_discount: setDiscount
        } = ''
      } = this.props;
      const { products } = this.state;
      return (
        <Wrapper>
          <Body>
            {/* Header */}
            <Header />

            {/* Container */}
            {data ? (
              <Container pt={60}>
                <Box variant="col-10" mx="auto">
                  <Box sx={{ boxShadow: 'profile', border: 'light' }}>
                    <ThankYou />
                  </Box>
                  <Row mx={0} mb={40} mt={60} justifyContent="center">
                    <Text fontFamily="medium" fontSize={28}>
                      Here’s what you ordered
                    </Text>
                  </Row>

                  <Row sx={{ borderBottom: 'heading' }} mx={0} pb={5}>
                    <Box variant="col-6" pl={0}>
                      <Text fontSize={16}>Product Details</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Est. Delivery</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Qty.</Text>
                    </Box>
                    <Box variant="col-2">
                      <Text fontSize={16}>Price</Text>
                    </Box>
                  </Row>
                  {products.map(product => (
                    <Row
                      py={20}
                      mx={0}
                      alignItems="center"
                      sx={{ position: 'relative', borderBottom: 'light' }}
                    >
                      <Box variant="col-2" pl={0}>
                        <Link
                          to={formatProductURL(product.name, product.confSku)}
                        >
                          <Image
                            width={1}
                            src={`${product.image}-top_sel_160.jpg`}
                            alt=""
                            sx={{ boxShadow: 'productThumb' }}
                          />
                        </Link>
                      </Box>
                      <Box variant="col-4" pl={15}>
                        {/* <Link to="/"> */}
                        <Box mb="10px">
                          <Link
                            to={formatProductURL(product.name, product.confSku)}
                          >
                            <Heading
                              color="heading"
                              fontSize={16}
                              lineHeight={1.4}
                            >
                              {product.name}
                            </Heading>
                          </Link>
                        </Box>
                        <Box mb="15px">
                          <Text color="#575757">{product.color}</Text>
                        </Box>
                        {/* </Link> */}
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          {product.deliveryTime.split('Delivered by ')[1]}
                        </Label>
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          {product.qty}
                        </Label>
                      </Box>
                      <Box variant="col-2">
                        <Label color="heading" fontSize={18}>
                          ₹ {formatAmount(product.price)}
                        </Label>
                      </Box>
                    </Row>
                  ))}
                  <Row>
                    <Box variant="col-2" />
                    <Box variant="col-9" pt={20} pb={20}>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Subtotal : </Text>
                        <Text>Rs {formatAmount(subTotal)}</Text>
                      </Flex>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Shipping charges : </Text>
                        <Text>Rs {formatAmount(shippingCharges)}</Text>
                      </Flex>
                      <Flex mb={20} justifyContent="space-between">
                        <Text>Discount : </Text>
                        <Text>Rs {formatAmount(discount)}</Text>
                      </Flex>
                      {setDiscount ? (
                        <Flex mb={20} justifyContent="space-between">
                          <Text>Combo Discount : </Text>
                          <Text>Rs {formatAmount(Math.abs(setDiscount))}</Text>
                        </Flex>
                      ) : null}
                      <Row m="0" py="1em" sx={{ borderTop: 'divider' }}>
                        <Box variant="col-6" p="0">
                          <Text
                            color="menuItem"
                            fontSize={18}
                            fontFamily="medium"
                          >
                            Total Price :
                          </Text>
                        </Box>
                        <Box variant="col-6" p="0" textAlign="right">
                          <Text
                            color="menuItem"
                            fontSize={18}
                            fontFamily="medium"
                          >
                            Rs {formatAmount(totalAmount)}
                          </Text>
                        </Box>
                      </Row>
                    </Box>
                  </Row>
                </Box>
              </Container>
            ) : null}
            {/* Footer */}
            <Footer />
          </Body>
        </Wrapper>
      );
    }
    return null;
  }
}
PaymentSuccess.defaultProps = {
  data: '',
  error: '',
  loaded: false
};

PaymentSuccess.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
  loaded: PropTypes.bool,
  history: PropTypes.object.isRequired
};
PaymentSuccess.contextTypes = {
  store: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(PaymentSuccess);
