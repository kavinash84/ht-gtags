import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Address from 'components/Address';

export class SimpleForm extends Component {
  static propTypes = {};
  render() {
    return (
      <Fragment>
        <div>
          <Address formType="shipping" />
        </div>
        Test
        <div>
          <Address formType="billing" />
        </div>
      </Fragment>
    );
  }
}

export default SimpleForm;
