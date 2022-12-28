import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Body from "hometown-components-dev/lib/BodyHtV1";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import Footer from "components/Footer";
import Header from "components/Header";

const happilyEver = require("../../../static/campaign/Happily-Ever-After.png");
const category1 = require("../../../static/campaign/Bed.jpg");
const category3 = require("../../../static/campaign/Dining-Essentials.jpg");
const category6 = require("../../../static/campaign/travel-essential.jpg");
const duracucineLogo = require("../../../static/campaign/duracucine-logo.png");
const dbLogo = require("../../../static/campaign/db-logo.png");

const ContentSection = ({ description, title }) => (
  <Fragment>
    {(title !== "" || title !== null) && (
      <Heading fontSize="40px" ta="center" color="black" fontFamily="light">
        {title}
      </Heading>
    )}
    <Row justifyContent="center" mb="20px">
      <Box bg="black" col="1" height="1px" />
    </Row>
    {(!description !== "" || description !== null) && (
      <Text fontSize="20px" ta="center">
        {description}
      </Text>
    )}
  </Fragment>
);

ContentSection.defaultProps = {
  title: "",
  description: ""
};

ContentSection.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
};

const WeddingCampaign = () => (
  <Wrapper>
    <Body>
      {/* Header */}
      <Header />
      <Box pl="15px" pr="15px">
        <Box mb="-100px">
          <Img src="https://static.hometown.in/media/cms/extras-desktop/banner.jpg" alt="" />
        </Box>
        <Row pb="30px">
          <Box col="7" ta="center" m="auto">
            <Img
              src={happilyEver}
              alt=""
              height="200px"
              width="auto"
              m="auto"
            />
            {/* eslint-disable max-len */}
            <ContentSection
              title="It All Starts Here"
              description="You’ve found your perfect match – now find the perfect pieces to begin your perfect life together. Celebrate each marriage milestone with dinnerware to host your first party, barware for that 1st anniversary toast and décor you’ll fall in love with over and over again."
            />
          </Box>
        </Row>
        <Row ml="0" mr="0" bg="#dedede" alignItems="center">
          <Box col="6" ta="center">
            <Heading color="#3d3d3b" fontSize="30px" mt="0" mb="20px">
              Every After Product Combos
            </Heading>
            <Heading color="#3d3d3b" fontSize="20px" mt="0" mb="20px">
              Starting at Rs. 69,900/-
            </Heading>
            <Text
              ta="center"
              color="#434341"
              fontSize="18px"
              mb="0"
              fontFamily="light"
            >
              Style up your space into a cosy and comfortable abode
            </Text>
            <Text
              ta="center"
              color="#434341"
              fontSize="18px"
              mt="5px"
              fontFamily="light"
            >
              with our room combo offer on furniture
            </Text>
            <Text
              ta="center"
              color="#434341"
              fontSize="18px"
              mt="5px"
              fontFamily="light"
            >
              and electronics
            </Text>
            <Link to="/combo-offer">
              <Text
                mt="50px"
                ta="center"
                fontSize="30px"
                fontFamily="light"
                style={{ textDecoration: "underline" }}
              >
                KNOW MORE
              </Text>
            </Link>
          </Box>
          <Box col="6">
            <Img width="100%" src="https://static.hometown.in/media/cms/extras-desktop/Hot-Deals-Dining-Set.jpg" />
          </Box>
        </Row>
        <Row pb="40px" pt="30px">
          <Box col="7" ta="center" m="auto">
            <ContentSection
              title="Married Life Must-Haves"
              description="Make every occasion a celebration with our exclusive furniture, décor, tableware, barware, serviettes, kitchen utilities, travel essentials and more."
            />
          </Box>
        </Row>
        <Row ml="-8px" mr="-8px">
          <Box col="4" p="8px">
            <Link to="/furniture">
              <Img width="100%" src={category1} />
              <Heading ta="center" color="black" fontFamily="light">
                FURNITURE ESSENTIALS
              </Heading>
            </Link>
          </Box>
          <Box col="4" p="8px">
            <Link to="/home-furnishings/bedding">
              <Img width="100%" src="https://static.hometown.in/media/cms/extras-desktop/Bedding-essentials.jpg" />
              <Heading ta="center" color="black" fontFamily="light">
                BEDDING ESSENTIALS
              </Heading>
            </Link>
          </Box>
          <Box col="4" p="8px">
            <Link to="/tableware">
              <Img width="100%" src="https://static.hometown.in/media/cms/extras-desktop/Dining-Essentials.jpg" />
              <Heading ta="center" color="black" fontFamily="light">
                DINNING ESSENTIALS
              </Heading>
            </Link>
          </Box>
          <Box col="4" p="8px">
            <Link to="/kitchenware">
              <Img width="100%" src="https://static.hometown.in/media/cms/extras-desktop/Kitchen-essential.jpg" />
              <Heading ta="center" color="black" fontFamily="light">
                KITCHEN ESSENTIALS
              </Heading>
            </Link>
          </Box>
          <Box col="4" p="8px">
            <Link to="/home-furnishings/bath-accessory">
              <Img width="100%" src="https://static.hometown.in/media/cms/extras-desktop/Bath-essentials.jpg" />
              <Heading ta="center" color="black" fontFamily="light">
                BATH ESSENTIALS
              </Heading>
            </Link>
          </Box>
          <Box col="4" p="8px">
            <Link to="/luggage">
              <Img width="100%" src={category6} />
              <Heading ta="center" color="black" fontFamily="light">
                TRAVEL ESSENTIALS
              </Heading>
            </Link>
          </Box>
        </Row>
        <Row pb="40px">
          <Box col="9" ta="center" m="auto">
            <ContentSection description="Customize your dream kitchen to whip up the perfect meal. Choose from over 1000 designs and finishes to turn your everyday activities like cooking and eating into a feast." />
          </Box>
        </Row>
        <Row ml="0" mr="0" alignItems="center" bg={`url($"https://static.hometown.in/media/cms/extras-desktop/Kitchen-Banner.jpg")`}>
          <Box col="6" />
          <Box
            col="6"
            ta="center"
            bg="#9d9696"
            pt="50px"
            pb="30px"
            style={{ width: "45%" }}
          >
            <Img
              src={duracucineLogo}
              alt=""
              width="auto"
              m="auto"
              mb="50px"
              height="150px"
            />
            <Text
              ta="center"
              color="white"
              fontSize="24px"
              mb="0"
              fontFamily="light"
            >
              Modular Kitchens Starting
            </Text>
            <Text
              ta="center"
              color="white"
              fontSize="20px"
              mt="5px"
              fontFamily="light"
            >
              at Rs. 99,900/-
            </Text>
            <Text
              ta="center"
              color="white"
              fontSize="15px"
              mt="30px"
              fontFamily="light"
            >
              50000 CUSTOMERS | 1000 MODULES | 200 FINISHES
            </Text>
            <Link to="/modular-kitchens/" target="_blank" rel="noopener">
              <Text
                mt="20px"
                mb="0"
                ta="center"
                color="white"
                fontSize="20px"
                fontFamily="light"
                style={{ textDecoration: "underline" }}
              >
                CLICK HERE
              </Text>
            </Link>
          </Box>
        </Row>
        <Row pb="40px">
          <Box col="9" ta="center" m="auto">
            <ContentSection description="Make your house into a home with expert help on interior design, home styling and end-to-end project management and execution" />
          </Box>
        </Row>
        <Row alignItems="center" bg={`url($"https://static.hometown.in/media/cms/extras-desktop/Kitchen-Banner.jpg")`}>
          <Box
            col="6"
            ta="center"
            bg="#9d9696"
            pt="50px"
            pb="30px"
            style={{ width: "45%" }}
            ml="5%"
          >
            <Img
              src={dbLogo}
              alt=""
              width="auto"
              m="auto"
              mb="50px"
              height="150px"
            />
            <Text
              ta="center"
              color="white"
              fontSize="20px"
              mb="0"
              fontFamily="light"
            >
              MODULAR KITCHEN | MODULAR WARDROBE
            </Text>
            <Text
              ta="center"
              color="white"
              fontSize="20px"
              mt="5px"
              fontFamily="light"
            >
              FULL HOUSE INTERIORS | PART HOUSE RENOVATION
            </Text>
            <Link target="_blank" rel="noopener" to="/design-build/">
              <Text
                mt="50px"
                mb="0"
                ta="center"
                color="white"
                fontSize="30px"
                fontFamily="light"
                style={{ textDecoration: "underline" }}
              >
                CLICK HERE
              </Text>
            </Link>
          </Box>
          <Box col="6" />
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
              You can give a different look for each of your rooms in the house.
              For example the furniture used in your living room should be
              beautiful, elegant as well as designer. Whether it is a sofa set
              or a designer arrangement of traditional furniture, it should
              enhance the look for of your living room. Similarly, your bedroom
              furniture should be comfortable, sturdy as well as durable. It
              should well fit within the available space in your room without
              cluttering or congesting it.
            </Text>
            <Text color="#817f7d">
              The furniture should match the overall theme of your house, which
              could be somber or quirky. Further, for a modern look, you can use
              a modular kitchen that beautifies the house instantly. Hometown
              offers a wide range of furniture designs to help you get the best
              pick. You can also experiment with different material for each
              rooms individually. For example you can use a Polyurethane
              furniture for your living room and use a wooden bed in the
              bedroom. At hometown you can also explore outdoor furniture like
              swings, table and recliner chair to have an private space for
              yourself.
            </Text>

            <Heading color="#55545b" fontSize="16px" mt="20px">
              Our Online Collection of Home Furnishing Products
            </Heading>
            <Text color="#817f7d">
              Make the interior of your home the luxury of space with each of
              our online home furnishing items, comprising an array of bed
              linen, curtains, bath linen , bedsheets, pillow covers, mats ,
              cushions, protectors , covers and inserts, bedding , a mattress,
              bathroom accessories, blankets, towels, curtain and other
              accessories. Choose from a wide range of attractive bedsheets, bed
              covers available at HomeTown, ranging from floral to digital,
              check, ethnic, stripes or printed patterns to suit your
              penchants. You can also choose from many beautiful pillow covers
              as well as pillows to complement the shades and patterns of your
              bed sheets. Opt for bolster covers, chilly winter with range of
              quilts and blankets.
            </Text>

            <Heading color="#55545b" fontSize="16px" mt="20px">
              Explore More at Hometown!
            </Heading>
            <Text color="#817f7d">
              Once you get the furniture pieces you are looking for, you can
              further accentuate the beauty and elegance of your house by adding
              in some home decor items like matching curtains and lamps.
              Hometown has a wide range of home furnishing like upholstery,
              beddings, pillow covers and cushions. Moreover, you can also
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

export default WeddingCampaign;
