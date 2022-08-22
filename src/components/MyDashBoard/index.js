import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
@connect(({ profile }) => ({
  profile: profile.data
  // response: profile
}))
class MyDashBoard extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      contact_number: PropTypes.string,
      email: PropTypes.string,
      full_name: PropTypes.string,
      gst: PropTypes.string
    })
    // response: PropTypes.object
  };
  state = {
    email: '',
    phone: '',
    fullName: '',
    gst: '',
    showEditForm: false
  };

  componentWillMount() {
    const {
      profile: {
 full_name: fullName, email, contact_number: phone, gst
}
    } = this.props;
    this.setState({
      fullName: (fullName && fullName.trim()) || '',
      email,
      phone: phone || '',
      gst
    });
  }
  render() {
    const { fullName, email, phone } = this.state;
    return (
      <Box width={[1, 1, 7 / 10]} px={10}>
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
              {fullName}
            </Label>
            <Label mb={8} fontSize={16} fontWeight={300} variant="profileDashBoard">
              {email}
            </Label>
            <Label fontSize={16} fontWeight={300} variant="profileDashBoard">
              {phone}
            </Label>
          </Col>
          <Link to={{ pathname: '/profile', fromEditIcon: true }}>
            <Image src={EditProfileIcon} width="34px" height="34px" alt="profileEdit" />
          </Link>
        </Row>
        <Row mx={-10}>
          <ProfileBlock url="/my-orders" title="Orders" subTitle="Check your order status" src={ordersIcon} />
          <ProfileBlock url="/wishlist" title="Wishlist" subTitle="Check saved for later items" src={favouriteIcon} />
          <ProfileBlock url="/checkout/cart" title="Cart" subTitle="Check your shopping cart" src={shoppingCartIcon} />
          <ProfileBlock url="/coupons" title="Coupons" subTitle="Check available coupons" src={groupIcon} />
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
MyDashBoard.defaultProps = {
  profile: {}
};
MyDashBoard.propTypes = {
  profile: PropTypes.object
};
export default MyDashBoard;
// export default connect(mapStateToProps, mapDispatchToProps)(MyDashBoard);
