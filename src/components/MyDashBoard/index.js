import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

/**
 * Icons
 */
const EditProfileIcon = require('../../../static/editIconTwo.svg');
const ordersIcon = require('../../../static/orders.png');
const favouriteIcon = require('../../../static/favourite.svg');
const shoppingCartIcon = require('../../../static/shoppingCart.svg');
const groupIcon = require('../../../static/group.svg');
const creditCardIcon = require('../../../static/creditCard.svg');
const descriptionIcon = require('../../../static/description.svg');

const ProfileBlock = ({
 title, subTitle, src, url
}) => (
  <Col width={1 / 3} px={10}>
    <Link to={url}>
      <Flex
        px={10}
        py={15}
        mb={20}
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        sx={{
          border: 'divider'
        }}
      >
        <Image src={src} height={40} alt="orders" />
        <Label mt={10} mb={4} fontSize={14} fontFamily="medium" textAlign="center">
          {title}
        </Label>
        <Label fontSize={12} fontFamily="light" textAlign="center">
          {subTitle}
        </Label>
      </Flex>
    </Link>
  </Col>
);

ProfileBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

class MyDashBoard extends Component {
  render() {
    return (
      <Box width={7 / 10} px={10}>
        <Row
          mx={0}
          pb={20}
          mb={30}
          alignItems="center"
          sx={{
            borderBottom: 'divider'
          }}
        >
          <Col
            width={100}
            height={100}
            bg="bgPrimary"
            mr={15}
            sx={{
              borderRadius: 8
            }}
          />
          <Col>
            <Label mb={10} fontSize={18} fontWeight="bold" variant="profileDashBoard">
              Matthew xyz
            </Label>
            <Label mb={8} fontSize={16} fontWeight={300} variant="profileDashBoard">
              matthew.xyz@gmail.com
            </Label>
            <Label fontSize={16} fontWeight={300} variant="profileDashBoard">
              +91974209765
            </Label>
          </Col>
          <Image src={EditProfileIcon} width="34px" height="34px" alt="profileEdit" />
        </Row>
        <Row mx={-10}>
          <ProfileBlock url="/my-orders" title="Orders" subTitle="Check your order status" src={ordersIcon} />
          <ProfileBlock url="/wishlist" title="Wishlist" subTitle="Check saved for later items" src={favouriteIcon} />
          <ProfileBlock url="/cart" title="Cart" subTitle="Check your shopping cart" src={shoppingCartIcon} />
          <ProfileBlock url="/" title="Coupons" subTitle="Check available coupons" src={groupIcon} />
          <ProfileBlock url="/" title="Saved Cards" subTitle="Check saved for later items" src={creditCardIcon} />
          <ProfileBlock
            url="/profile"
            title="Profile Details"
            subTitle="Update your profile details"
            src={descriptionIcon}
          />
        </Row>
      </Box>
    );
  }
}

export default MyDashBoard;
