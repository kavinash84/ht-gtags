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
import { isEmpty, pincode as validatePincode, validateEmail, validateMobile } from 'utils/validation';
import { allowNChar, allowTypeOf, isGSTNumber } from 'utils/helper';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./MyAddress.scss');

const initialState = {
  name: '',
  address1: '',
  address2: '',
  address3: '',
  pincode: '',
  phone: '',
  email: '',
  addressId: '',
  selectedAddress: '',
  editForm: false,
  addForm: false,
  emailError: false,
  emailErrorMessage: 'Email not Valid',
  phoneError: false,
  phoneErrorMessage: 'Phone number not Valid',
  pincodeError: false,
  pincodeErrorMessage: 'PinCode not Valid',
  address1Error: false,
  address1ErrorMessage: 'Address1 not Valid',
  address2Error: false,
  address2ErrorMessage: '',
  address3Error: false,
  address3ErrorMessage: '',
  nameError: false,
  nameErrorMessage: 'Name cannot be left Empty',
  gst: '',
  gstError: false,
  gstErrorMessage: 'GST Number not valid'
};
@connect(({ myaddress, profile }) => ({
  ...myaddress,
  useremail: profile.data.email,
  myaddress
}))
@withRouter
export default class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    name: '',
    address1: '',
    address2: '',
    address3: '',
    pincode: '',
    phone: '',
    addressId: '',
    selectedAddress: '',
    editForm: false,
    addForm: false,
    emailError: false,
    emailErrorMessage: 'Email not Valid',
    address1Error: false,
    address1ErrorMessage: 'Address 1 is Required !',
    address2Error: false,
    address2ErrorMessage: '',
    address3Error: false,
    address3ErrorMessage: '',
    phoneError: false,
    phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
    pincodeError: false,
    pincodeErrorMessage: 'Pincode is not Valid',
    nameError: false,
    nameErrorMessage: 'Name cannot be left Empty',
    gst: '',
    gstError: false,
    gstErrorMessage: 'GST Number not valid'
  };
  componentWillMount() {
    const { useremail } = this.props;
    this.setState({
      email: useremail
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState(initialState);
    }
  }
  onSubmitValidator = () => {
    const {
      email, name, pincode, address1, phone
    } = this.state;

    const nameError = isEmpty(name);
    const emailError = isEmpty(email) || !validateEmail(email);
    const phoneError = isEmpty(phone) || validateMobile(phone).error;
    const pincodeError = isEmpty(pincode) || validatePincode(pincode);
    const address1Error = isEmpty(address1);
    this.setState({
      nameError,
      emailError,
      phoneError,
      pincodeError,
      address1Error
    });

    if (nameError || emailError || phoneError || pincodeError || address1Error) {
      return false;
    }
    return true;
  };
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      name: value,
      nameError: checkError
    });
  };
  onChangeAddress = (e, key) => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    const addressValue = {};
    const addressErrorValue = {};
    const errorKey = `${key}Error`;
    addressValue[key] = value;
    addressErrorValue[errorKey] = checkError;
    this.setState({
      ...addressValue,
      ...addressErrorValue
    });
  };
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangePincode = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePincode(value);
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      pincode: value,
      pincodeError: checkError
    });
  };
  onChangeGST = e => {
    const {
      target: { value }
    } = e;
    const checkError = isGSTNumber(value);
    this.setState({
      gst: value,
      gstError: !checkError
    });
  };
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
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
      full_name: name,
      address1,
      address2,
      address3,
      pincode,
      mobile: phone,
      email,
      id_customer_address: addressId
    } = data[index];
    this.setState({
      addForm: false,
      editForm: true,
      currentaddressindex: index,
      email,
      address1,
      address2,
      address3,
      pincode,
      phone,
      name,
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
      } else {
        dispatch(addAddress(this.state));
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
      name: ''
    });
  };
  render() {
    const {
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      pincodeError,
      pincodeErrorMessage,
      address1Error,
      address1ErrorMessage,
      address2Error,
      address2ErrorMessage,
      address3Error,
      address3ErrorMessage,
      nameError,
      nameErrorMessage
      // gstError,
      // gstErrorMessage
    } = this.state;
    const {
      name,
      phone,
      address1,
      address2,
      address3,
      pincode,
      editForm,
      addForm,
      currentaddressindex
      // gst
    } = this.state;
    const { data, useremail } = this.props;
    const { loading } = this.props;
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
                    {item.address1 || ''}
                    {item.address2 && <br />}
                    {item.address2 || ''}
                    {item.address3 && <br />}
                    {item.address3 || ''}
                    <br />
                    {item.city || ''}, {item.pincode || ''}
                    <br />
                    {item.state || ''}
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
                      onChange={this.onChangeName}
                      value={name}
                      feedBackError={nameError}
                      feedBackMessage={nameErrorMessage}
                    />
                    <FormInput
                      label="Address1 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address1');
                      }}
                      value={address1}
                      feedBackError={address1Error}
                      feedBackMessage={address1ErrorMessage}
                    />
                    <FormInput
                      label="Address2 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address2');
                      }}
                      value={address2}
                      feedBackError={address2Error}
                      feedBackMessage={address2ErrorMessage}
                    />
                    <FormInput
                      label="Address3 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address3');
                      }}
                      value={address3}
                      feedBackError={address3Error}
                      feedBackMessage={address3ErrorMessage}
                    />
                    <FormInput
                      label="Phone *"
                      type="text"
                      placeholder=""
                      onChange={this.onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                    <FormInput
                      label="PIN Code *"
                      type="text"
                      placeholder=""
                      onChange={this.onChangePincode}
                      value={pincode}
                      feedBackError={pincodeError}
                      feedBackMessage={pincodeErrorMessage}
                    />
                    <FormInput
                      label="Email ID *"
                      type="hidden"
                      placeholder=""
                      onChange={this.onChangeEmail}
                      value={useremail}
                      feedBackError={emailError}
                      feedBackMessage={emailErrorMessage}
                    />
                    {/* <FormInput
                      hide
                      label="GST Number "
                      type="text"
                      placeholder=""
                      onChange={this.onChangeGST}
                      value={gst}
                      feedBackError={gstError}
                      feedBackMessage={gstErrorMessage}
                    /> */}
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="2">
                    <Button
                      size="block"
                      btnType="primary"
                      fontFamily="regular"
                      height="42px"
                      mt="1.5rem"
                      onClick={this.handleSubmit}
                    >
                      {loading ? 'Please wait ...' : 'Save'}
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
                      onChange={this.onChangeName}
                      value={name}
                      feedBackError={nameError}
                      feedBackMessage={nameErrorMessage}
                    />
                    <FormInput
                      label="Address1 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address1');
                      }}
                      value={address1}
                      feedBackError={address1Error}
                      feedBackMessage={address1ErrorMessage}
                    />
                    <FormInput
                      label="Address2 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address2');
                      }}
                      value={address2}
                      feedBackError={address2Error}
                      feedBackMessage={address2ErrorMessage}
                    />
                    <FormInput
                      label="Address3 *"
                      type="text"
                      placeholder=""
                      onChange={e => {
                        this.onChangeAddress(e, 'address3');
                      }}
                      value={address3}
                      feedBackError={address3Error}
                      feedBackMessage={address3ErrorMessage}
                    />
                    <FormInput
                      label="Phone *"
                      type="text"
                      placeholder=""
                      onChange={this.onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                    <FormInput
                      label="PIN Code *"
                      type="text"
                      placeholder=""
                      onChange={this.onChangePincode}
                      value={pincode}
                      feedBackError={pincodeError}
                      feedBackMessage={pincodeErrorMessage}
                    />
                    <FormInput
                      label="Email ID *"
                      type="hidden"
                      placeholder=""
                      onChange={this.onChangeEmail}
                      value={useremail}
                      feedBackError={emailError}
                      feedBackMessage={emailErrorMessage}
                    />
                    {/* <FormInput
                      label="GST Number "
                      type="text"
                      placeholder=""
                      onChange={this.onChangeGST}
                      value={gst}
                      feedBackError={gstError}
                      feedBackMessage={gstErrorMessage}
                    /> */}
                  </Div>
                </Row>
                <Row display="block" mr="0" ml="0">
                  <Div col="2">
                    <Button
                      size="block"
                      btnType="primary"
                      fontFamily="regular"
                      height="42px"
                      mt="1.5rem"
                      onClick={this.handleSubmit}
                    >
                      {loading ? 'Please wait ...' : 'Save'}
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
  useremail: '',
  loading: false,
  updated: false
};

DeliveryAddress.propTypes = {
  data: PropTypes.array,
  useremail: PropTypes.string,
  loading: PropTypes.bool,
  updated: PropTypes.bool
};
