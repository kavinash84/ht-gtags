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

const mapStateToProps = ({ paymentstatus }) => ({
  cartProducts: paymentstatus.data.cart_products,
  subTotal: paymentstatus.data.sub_total_amount,
  discount: paymentstatus.data.discount_coupon_value,
  totalAmount: paymentstatus.data.net_order_amount,
  shippingCharges: paymentstatus.data.shipping_charges,
  setDiscount: paymentstatus.data.set_discount
});
class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount = () => {
    this.groupSimilarProducts();
  };
  groupSimilarProducts = () => {
    const { cartProducts } = this.props;
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
    const {
 subTotal, discount, totalAmount, shippingCharges, setDiscount
} = this.props;
    const { products } = this.state;
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
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
                <Row py={20} mx={0} alignItems="center" sx={{ position: 'relative', borderBottom: 'light' }}>
                  <Box variant="col-2" pl={0}>
                    <Link to={formatProductURL(product.name, product.confSku)}>
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
                      <Link to={formatProductURL(product.name, product.confSku)}>
                        <Heading color="heading" fontSize={16} lineHeight={1.4}>
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
                  {setDiscount && (
                    <Flex mb={20} justifyContent="space-between">
                      <Text>Combo Discount : </Text>
                      <Text>Rs {formatAmount(Math.abs(setDiscount))}</Text>
                    </Flex>
                  )}
                  <Row m="0" py="1em" sx={{ borderTop: 'divider' }}>
                    <Box variant="col-6" p="0">
                      <Text color="menuItem" fontSize={18} fontFamily="medium">
                        Total Price :
                      </Text>
                    </Box>
                    <Box variant="col-6" p="0" textAlign="right">
                      <Text color="menuItem" fontSize={18} fontFamily="medium">
                        Rs {formatAmount(totalAmount)}
                      </Text>
                    </Box>
                  </Row>
                </Box>
              </Row>
            </Box>
          </Container>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
PaymentSuccess.defaultProps = {
  subTotal: 0,
  totalAmount: 0,
  discount: 0,
  shippingCharges: 0,
  setDiscount: 0
};

PaymentSuccess.propTypes = {
  cartProducts: PropTypes.array.isRequired,
  subTotal: PropTypes.number,
  totalAmount: PropTypes.number,
  discount: PropTypes.number,
  shippingCharges: PropTypes.number,
  setDiscount: PropTypes.number
};

export default connect(mapStateToProps, null)(PaymentSuccess);
