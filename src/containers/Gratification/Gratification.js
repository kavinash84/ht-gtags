import React from 'react';
import { Link } from 'react-router-dom';

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
import GratificationBody from 'newComponents/Gratification';

const Gratification = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />

      {/* Container */}
      <Container pt={60}>
        <Box variant="col-10" mx="auto">
          <Box sx={{ boxShadow: 'profile', border: 'light' }}>
            <GratificationBody subTitle="Your order has been placed successfully." />
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
          <Row py={20} mx={0} alignItems="center" sx={{ position: 'relative', borderBottom: 'light' }}>
            <Box variant="col-2" pl={0}>
              <Link to="/">
                <Image
                  width={1}
                  src="https://static.hometown.in/media/product/15/1053/1-top_sel_160.jpg"
                  alt=""
                  sx={{ boxShadow: 'productThumb' }}
                />
              </Link>
            </Box>
            <Box variant="col-4" pl={15}>
              <Link to="/">
                <Box mb="10px">
                  <Heading color="heading" fontSize={16} lineHeight={1.4}>
                    Love To Travel Golden Masonjars Set Of 2 T & P Glass Mason
                  </Heading>
                </Box>
                <Box mb="15px">
                  <Text color="#575757">Orange,Pink & Gold</Text>
                </Box>
              </Link>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                10/10/2019
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                1
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                ₹ 299
              </Label>
            </Box>
          </Row>
          <Row py={20} mx={0} alignItems="center" sx={{ position: 'relative', borderBottom: 'light' }}>
            <Box variant="col-2" pl={0}>
              <Link to="/">
                <Image
                  width={1}
                  src="https://static.hometown.in/media/product/15/1053/1-top_sel_160.jpg"
                  alt=""
                  sx={{ boxShadow: 'productThumb' }}
                />
              </Link>
            </Box>
            <Box variant="col-4" pl={15}>
              <Link to="/">
                <Box mb="10px">
                  <Heading color="heading" fontSize={16} lineHeight={1.4}>
                    Love To Travel Golden Masonjars Set Of 2 T & P Glass Mason
                  </Heading>
                </Box>
                <Box mb="15px">
                  <Text color="#575757">Orange,Pink & Gold</Text>
                </Box>
              </Link>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                10/10/2019
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                1
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                ₹ 299
              </Label>
            </Box>
          </Row>
          <Row py={20} mx={0} alignItems="center" sx={{ position: 'relative', borderBottom: 'light' }}>
            <Box variant="col-2" pl={0}>
              <Link to="/">
                <Image
                  width={1}
                  src="https://static.hometown.in/media/product/15/1053/1-top_sel_160.jpg"
                  alt=""
                  sx={{ boxShadow: 'productThumb' }}
                />
              </Link>
            </Box>
            <Box variant="col-4" pl={15}>
              <Link to="/">
                <Box mb="10px">
                  <Heading color="heading" fontSize={16} lineHeight={1.4}>
                    Love To Travel Golden Masonjars Set Of 2 T & P Glass Mason
                  </Heading>
                </Box>
                <Box mb="15px">
                  <Text color="#575757">Orange,Pink & Gold</Text>
                </Box>
              </Link>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                10/10/2019
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                1
              </Label>
            </Box>
            <Box variant="col-2">
              <Label color="heading" fontSize={18}>
                ₹ 299
              </Label>
            </Box>
          </Row>
          <Row>
            <Box variant="col-2" />
            <Box variant="col-9" pt={20} pb={20}>
              <Flex mb={20} justifyContent="space-between">
                <Text>Subtotal : </Text>
                <Text>Rs. 1000</Text>
              </Flex>
              <Flex mb={20} justifyContent="space-between">
                <Text>Savings : </Text>
                <Text>Rs. 400</Text>
              </Flex>
              <Flex mb={20} justifyContent="space-between">
                <Text>Discount : </Text>
                <Text>Rs. 300</Text>
              </Flex>
              <Row m="0" py="1em" sx={{ borderTop: 'divider' }}>
                <Box variant="col-6" p="0">
                  <Text color="menuItem" fontSize={18} fontFamily="medium">
                    Total Price :
                  </Text>
                </Box>
                <Box variant="col-6" p="0" textAlign="right">
                  <Text color="menuItem" fontSize={18} fontFamily="medium">
                    Rs. 3000
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

export default Gratification;
