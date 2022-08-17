import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

/* ====== Page Components ====== */

@connect(({ profile }) => ({
  profile: profile.data
}))
export default class DashboardHeader extends Component {
  static propTypes = {
    profile: PropTypes.string,
    first_name: PropTypes.string
  };
  static defaultProps = {
    profile: {},
    first_name: ''
  };
  render() {
    const { first_name: name } = this.props.profile;
    return (
      <Row width={1} sx={{ borderBottom: 'divider' }} mx={0}>
        <Heading fontSize={20} pb={10}>
          Hello {name}
        </Heading>
      </Row>
    );
  }
}
