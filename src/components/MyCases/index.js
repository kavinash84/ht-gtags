import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
// import Button from 'hometown-components/lib/Buttons';
// import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
import MyMenu from 'components/MyMenu';
// import { addAddress, updateAddress } from 'redux/modules/myaddress';
// Validators
// import { isEmpty, pincode as validatePincode, validateEmail, validateMobile } from 'utils/validation';
// import { allowNChar, allowTypeOf } from 'utils/helper';

// const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./MyCases.scss');

@connect(({ mycases, profile }) => ({
  ...mycases,
  useremail: profile.data.email,
  mycases
}))
@withRouter
export default class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const { data, useremail } = this.props;
    const { loading } = this.props;
    console.log(useremail);
    console.log(loading);
    return (
      <Div type="block" mb="2rem">
        <MyMenu page="address" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              {data.map((item, index) => (
                <Div col="4" pr="0.625rem" key={String(index)}>
                  <button className={`${styles.addressBtn}`} onClick={() => this.handleClick(index)}>
                    <b>{item.full_name}</b>
                    <br />
                    {item.address}
                    <br />
                    {item.city}, {item.pincode}
                    <br />
                    {item.state}
                    <br />
                  </button>
                </Div>
              ))}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

DeliveryAddress.defaultProps = {
  data: [],
  useremail: '',
  loading: false,
  updated: false
};

DeliveryAddress.propTypes = {
  data: PropTypes.object,
  useremail: PropTypes.string,
  loading: PropTypes.bool,
  updated: PropTypes.bool //eslint-disable-line
};
