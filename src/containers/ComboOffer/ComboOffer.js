import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/Text';
import Footer from 'components/Footer';
import Header from 'components/Header';

const mainBanner = require('../../../static/campaign/combo-offer-banner.jpg');
const happilyEver = require('../../../static/campaign/Happily-Ever-After.png');
const completeHomePackage = require('../../../static/campaign/complete-home-package.jpg');
const bedRoom = require('../../../static/campaign/Bed-Room.jpg');
const livingRoom = require('../../../static/campaign/Living-Room.jpg');
const modularKitchen = require('../../../static/campaign/Kitchen.jpg');
const livingDiningRoom = require('../../../static/campaign/Living-Dining-Room.jpg');

const ContentSection = ({ description, title }) => (
  <Fragment>
    {(title !== '' || title !== null) && (
      <Heading fontSize="40px" ta="center" color="black" fontFamily="light">
        {title}
      </Heading>
    )}
    <Row justifyContent="center" mb="20px">
      <Box bg="black" col="1" height="1px" />
    </Row>
    {(!description !== '' || description !== null) && (
      <Text fontSize="20px" ta="center">
        {description}
      </Text>
    )}
  </Fragment>
);

ContentSection.defaultProps = {
  title: '',
  description: ''
};

ContentSection.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
};

const TagText = ({ text, url, ...rest }) => (
  <Link to={url}>
    <Text
      fontSize="20px"
      fontFamily="regular"
      color="white"
      pl="10px"
      pr="10px"
      lh="1"
      style={{ borderRight: '2px solid #FFF', textTransform: 'uppercase' }}
      {...rest}
    >
      {text}
    </Text>
  </Link>
);

TagText.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const ComboOffer = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />
      <Box pl="15px" pr="15px">
        <Box mb="-100px">
          <Img src={mainBanner} alt="" />
        </Box>
        <Row pb="30px">
          <Box col="7" ta="center" m="auto">
            <Img src={happilyEver} alt="" height="200px" width="auto" m="auto" />
            {/* eslint-disable max-len */}
            <ContentSection
              title="Product Package Offers"
              description="You’ve found your perfect match – now find the perfect pieces to begin your perfect life together. Celebrate each marriage milestone with dinnerware to host your first party, barware for that 1st anniversary toast and décor you’ll fall in love with over and over again."
            />
          </Box>
        </Row>
        <Row ml="0" mr="0" mb="20px" alignItems="center">
          <Box col="12">
            <Link to="/store-locator">
              <Img width="100%" src={completeHomePackage} />
            </Link>
          </Box>
        </Row>
        <Row ml="-10px" mr="-10px">
          <Box col="6" p="10px">
            <Link to="/store-locator">
              <Img width="100%" src={livingRoom} />
            </Link>
          </Box>
          <Box col="6" p="10px">
            <Link to="/store-locator">
              <Img width="100%" src={bedRoom} />
            </Link>
          </Box>
        </Row>
        <Row ml="-10px" mr="-10px" mb="20px">
          <Box col="6" p="10px">
            <Link to="/store-locator">
              <Img width="100%" src={livingDiningRoom} />
            </Link>
          </Box>
          <Box col="6" p="10px">
            <Link to="/store-locator">
              <Img width="100%" src={modularKitchen} />
            </Link>
          </Box>
        </Row>
        <Row justifyContent="center" bg="#84cac8" pt="10px" pb="10px">
          <TagText url="/furniture" text="FURNITURE" />
          <TagText url="home-furnishings" text="HOME FURNISHING" />
          <TagText url="/home-decor" text="DECOR" />
          <TagText url="/tableware" text="TABLEWARE" />
          <TagText url="/kitchenware" text="KITCHENWARE" />
          <TagText url="/luggage" text="LUGGAGE" />
          <TagText url="/electronics" text="ELECTRONICS" />
          <TagText
            url="/modular-kitchens"
            style={{ borderRight: 'none', textTransform: 'uppercase' }}
            text="MODULAR KITCHEN"
          />
        </Row>
        <Box pt="30px" pb="30px">
          {/* eslint-disable */}
          <Container>
            <Heading fontSize="22px" color="#55545b">
              Plan Your Happily Ever Afters with Hometown.
            </Heading>
            <Heading color="#55545b" fontSize="16px" mt="20px">
              Try Different Looks for Each Rooms
            </Heading>
            <Text color="#817f7d">
              You can give a different look for each of your rooms in the house. For example the furniture used in your
              living room should be beautiful, elegant as well as designer. Whether it is a sofa set or a designer
              arrangement of traditional furniture, it should enhance the look for of your living room. Similarly,
              your bedroom furniture should be comfortable, sturdy as well as durable. It should well fit within the
              available space in your room without cluttering or congesting it.
            </Text>
            <Text color="#817f7d">
              The furniture should match the overall theme of your house, which could be somber or quirky. Further, for
              a modern look, you can use a modular kitchen that beautifies the house instantly. Hometown offers a wide
              range of furniture designs to help you get the best pick. You can also experiment with different material
              for each rooms individually. For example you can use a Polyurethane furniture for your living room and use
              a wooden bed in the bedroom. At hometown you can also explore outdoor furniture like swings, table and
              recliner chair to have an private space for yourself.
            </Text>

            <Heading color="#55545b" fontSize="16px" mt="20px">
              Our Online Collection of Home Furnishing Products
            </Heading>
            <Text color="#817f7d">
              Make the interior of your home the luxury of space with each of our online home furnishing items,
              comprising an array of bed linen, curtains, bath linen , bedsheets, pillow covers, mats ,
              cushions, protectors , covers and inserts, bedding , a mattress, bathroom accessories, blankets, towels,
              curtain and other accessories. Choose from a wide range of attractive bedsheets, bed covers available at
              HomeTown, ranging from floral to digital, check, ethnic, stripes or printed patterns to suit your
              penchants. You can also choose from many beautiful pillow covers as well as pillows to complement the
              shades and patterns of your bed sheets. Opt for bolster covers, chilly winter with range of quilts and
              blankets.
            </Text>

            <Heading color="#55545b" fontSize="16px" mt="20px">
              Explore More at Hometown!
            </Heading>
            <Text color="#817f7d">
              Once you get the furniture pieces you are looking for, you can further accentuate the beauty and elegance
              of your house by adding in some home decor items like matching curtains and lamps. Hometown has a wide
              range of home furnishing like upholstery, beddings, pillow covers and cushions. Moreover, you can also
              explore the different kitchenware and table options.
            </Text>
          </Container>
          {/* eslint-enable */}
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </Body>
  </Wrapper>
);

export default ComboOffer;
