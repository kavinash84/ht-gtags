import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import CouponsCard from './Card';

@connect(({ profile }) => ({
  profile: profile.data,
  response: profile
}))
class CouponsContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      coupons: PropTypes.object
    })
    // response: PropTypes.object
  };
  static defaultProps = {
    profile: {}
    // response: {},
  };
  state = {
    coupons: {},
    availableClicked: true
  };
  componentWillMount() {
    const {
      profile: { coupons }
    } = this.props;
    this.setState({
      coupons
    });
  }
  toggleButton = () => {
    const { availableClicked } = this.state;
    this.setState({
      availableClicked: !availableClicked
    });
  };
  render() {
    const { coupons, availableClicked } = this.state;
    const { available, expired } = coupons;
    const buttonSx = {
      border: 'divider',
      borderBottom: 'none',
      top: 1,
      position: 'relative'
    };
    return (
      <Box width={[1, 1, 4 / 5]} px={10}>
        <Row
          mb={40}
          sx={{
            borderBottom: 'divider'
          }}
        >
          <Button
            width={120}
            height={40}
            variant={availableClicked ? 'linkPrimary' : 'link'}
            bg="white"
            sx={availableClicked ? buttonSx : null}
            onClick={this.toggleButton}
          >
            ACTIVE
          </Button>
          <Button
            width={120}
            height={40}
            variant={!availableClicked ? 'linkPrimary' : 'link'}
            bg="white"
            sx={!availableClicked ? buttonSx : null}
            onClick={this.toggleButton}
          >
            MISSED
          </Button>
        </Row>
        <Box>
          {availableClicked
            ? available.map(data => (
              <CouponsCard
                status="available"
                code={data.code}
                discountAmount={data.discount_amount}
                fromDate={data.from_date}
                toDate={data.to_date}
                subtotal={data.subtotal}
                discountValue={data.discount_value}
                type={data.type}
              />
              ))
            : expired.map(data => (
              <CouponsCard
                status="expired"
                code={data.code}
                discountAmount={data.discount_amount}
                fromDate={data.from_date}
                toDate={data.to_date}
                subtotal={data.subtotal}
                discountValue={data.discount_value}
                type={data.type}
              />
              ))}
        </Box>
      </Box>
    );
  }
}

export default CouponsContainer;
