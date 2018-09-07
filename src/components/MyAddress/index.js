import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import MyMenu from 'components/MyMenu';
import { addAddress, updateAddress } from 'redux/modules/myaddress';
// Validators
import { validateMobile } from 'js-utility-functions';
import { isEmpty, pincode as pincodeIsValid } from 'utils/validation';

const emailIsValid = value => !isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./MyAddress.scss');

const initialState = {
  fullName: '',
  address: '',
  pincode: '',
  phone: '',
  email: '',
  addressId: '',
  selectedAddress: '',
  editForm: false,
  addForm: false,
  emailFeedBackError: false,
  emailFeedBackMessage: 'Email not Valid',
  phoneFeedBackError: false,
  phoneFeedBackMessage: 'Phone number not Valid',
  pinFeedBackError: false,
  pinFeedBackMessage: 'PinCode not Valid',
  addressFeedBackError: false,
  addressFeedBackMessage: 'Address not Valid',
  fullNameFeedBackError: false,
  fullNameFeedBackMessage: 'Name cannot be left Empty'
};
@connect(({ myaddress, profile }) => ({
  ...myaddress,
  useremail: profile.data.email
}))
@withRouter
export default class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    fullName: '',
    address: '',
    pincode: '',
    phone: '',
    addressId: '',
    selectedAddress: '',
    editForm: false,
    addForm: false,
    emailFeedBackError: false,
    emailFeedBackMessage: 'Email not Valid',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Phone number not Valid',
    pinFeedBackError: false,
    pinFeedBackMessage: 'PinCode not Valid',
    addressFeedBackError: false,
    addressFeedBackMessage: 'Address not Valid',
    fullNameFeedBackError: false,
    fullNameFeedBackMessage: 'Name cannot be left Empty'
  };
  onSubmitValidator = () => {
    const {
      email, fullName, pincode, address, phone
    } = this.state;

    const fullNameFeedBackError = isEmpty(fullName);
    const emailFeedBackError = isEmpty(email) || !emailIsValid(email);
    const phoneFeedBackError = isEmpty(phone) || validateMobile(phone).error;
    const pinFeedBackError = isEmpty(pincode) || pincodeIsValid(pincode);
    const addressFeedBackError = isEmpty(address);
    this.setState({
      fullNameFeedBackError,
      emailFeedBackError,
      phoneFeedBackError,
      pinFeedBackError,
      addressFeedBackError
    });

    if (fullNameFeedBackError || emailFeedBackError || phoneFeedBackError || pinFeedBackError || addressFeedBackError) {
      return false;
    }
    return true;
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleClick = index => {
    const { data } = this.props;
    const {
      full_name: fullName, address, pincode, mobile: phone, email, id_customer_address: addressId
    } = data[index];
    this.setState({
      addForm: false,
      editForm: true,
      currentaddressindex: index,
      address,
      pincode,
      phone,
      email,
      fullName,
      addressId
    });
  };
  handleSubmit = e => {
    const { dispatch } = this.context.store;
    e.preventDefault();
    const { editForm } = this.state;
    if (this.onSubmitValidator()) {
      if (editForm) {
        dispatch(updateAddress(this.state));
        this.setState(initialState);
      } else {
        dispatch(addAddress(this.state));
        this.setState(initialState);
      }
    }
  };
  toggleAddAddresForm = () => {
    this.setState({
      addForm: true,
      editForm: false,
      address: '',
      pincode: '',
      phone: '',
      fullName: ''
    });
  };
  render() {
    const {
      emailFeedBackError,
      emailFeedBackMessage,
      phoneFeedBackError,
      phoneFeedBackMessage,
      pinFeedBackError,
      pinFeedBackMessage,
      addressFeedBackError,
      addressFeedBackMessage,
      fullNameFeedBackError,
      fullNameFeedBackMessage
    } = this.state;
    const {
      fullName, phone, address, pincode, editForm, addForm, currentaddressindex
    } = this.state;
    const { data, useremail } = this.props;
    return (
      <Div type="block" mb="2rem">
        <MyMenu page="address" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              {data.map((item, index) => (
                <Div col="4" pr="0.625rem" key={String(index)}>
                  <button
                    className={`${styles.addressBtn} ${index === currentaddressindex && styles.active}`}
                    onClick={() => this.handleClick(index)}
                  >
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

              <Div col="2">
                <button className={styles.addAddressBtn} onClick={this.toggleAddAddresForm}>
                  <img src={addIcon} alt="Add another address" />
                  <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                    Add address
                  </Text>
                </button>
              </Div>
            </Row>
            {editForm && (
              <form onSubmit={this.handleSubmit}>
                <Row display="block" mr="0" ml="0" mt="1rem">
                  <Div col="5">
                    <FormInput
                      label="Full Name *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={fullName}
                      name="fullName"
                      feedBackError={fullNameFeedBackError}
                      feedBackMessage={fullNameFeedBackMessage}
                    />
                    <FormInput
                      label="Street Address *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={address}
                      name="address"
                      feedBackError={addressFeedBackError}
                      feedBackMessage={addressFeedBackMessage}
                    />
                    <FormInput
                      label="Phone *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={phone}
                      name="phone"
                      feedBackError={phoneFeedBackError}
                      feedBackMessage={phoneFeedBackMessage}
                    />
                    <FormInput
                      label="PIN Code *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={pincode}
                      name="pincode"
                      feedBackError={pinFeedBackError}
                      feedBackMessage={pinFeedBackMessage}
                    />
                    <FormInput
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={useremail}
                      name="email"
                      feedBackError={emailFeedBackError}
                      feedBackMessage={emailFeedBackMessage}
                      hidden
                    />
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="2">
                    <Button size="block" btnType="primary" fontFamily="regular" height="42px" mt="1.5rem">
                      Save
                    </Button>
                  </Div>
                </Row>
              </form>
            )}
            {addForm && (
              <form onSubmit={this.handleSubmit}>
                <Row display="block" mr="0" ml="0" mt="1rem">
                  <Div col="5">
                    <FormInput
                      label="Full Name *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={fullName}
                      name="fullName"
                      feedBackError={fullNameFeedBackError}
                      feedBackMessage={fullNameFeedBackMessage}
                    />
                    <FormInput
                      label="Street Address *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={address}
                      name="address"
                      feedBackError={addressFeedBackError}
                      feedBackMessage={addressFeedBackMessage}
                    />
                    <FormInput
                      label="Phone *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={phone}
                      name="phone"
                      feedBackError={phoneFeedBackError}
                      feedBackMessage={phoneFeedBackMessage}
                    />
                    <FormInput
                      label="PIN Code *"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={pincode}
                      name="pincode"
                      feedBackError={pinFeedBackError}
                      feedBackMessage={pinFeedBackMessage}
                    />
                    <FormInput
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      value={useremail}
                      name="email"
                      feedBackError={emailFeedBackError}
                      feedBackMessage={emailFeedBackMessage}
                      hidden
                    />
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="2">
                    <Button size="block" btnType="primary" fontFamily="regular" height="42px" mt="1.5rem">
                      Save
                    </Button>
                  </Div>
                </Row>
              </form>
            )}
          </Container>
        </Section>
      </Div>
    );
  }
}

DeliveryAddress.defaultProps = {
  data: [],
  useremail: ''
};

DeliveryAddress.propTypes = {
  data: PropTypes.object,
  useremail: PropTypes.string
};
