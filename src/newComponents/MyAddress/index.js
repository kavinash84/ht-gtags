import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import { addAddress, updateAddress } from 'redux/modules/myaddress';

// Validators
import {
  isEmpty,
  pincode as validatePincode,
  validateEmail,
  validateMobile,
  validateAddress,
  // trimSpecialChar,
  checkSpecialChar
} from 'utils/validation';
import { allowNChar, allowTypeOf, isGSTNumber } from 'utils/helper';

/**
 * Icons
 */
const addIcon = require('../../../static/addressAddIcon.svg');
const editIcon = require('../../../static/addressEdit.svg');
const removeIcon = require('../../../static/addressRemove.svg');

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
  constructor(props) {
    super(props);
    this.state = {
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
  }
  componentWillMount() {
    const { useremail } = this.props;
    this.setState({
      email: useremail
    });
  }
  componentWillReceiveProps(nextProps) {
    const { useremail } = this.props;
    if (nextProps.updated) {
      this.setState({
        ...initialState,
        email: useremail
      });
    }
  }
  onSubmitValidator = () => {
    const {
 email, name, pincode, address1, address2, address3, phone
} = this.state;

    const nameError = isEmpty(name);
    const emailError = isEmpty(email) || !validateEmail(email);
    const phoneError = isEmpty(phone) || validateMobile(phone).error;
    const pincodeError = isEmpty(pincode) || validatePincode(pincode);
    const address1Error = validateAddress(address1, 'address1');
    const address2Error = validateAddress(address2, 'address2');
    const address3Error = validateAddress(address3, 'address3');
    this.setState({
      nameError,
      emailError,
      phoneError,
      pincodeError,
      address1Error: address1Error.error,
      address2Error: address2Error.error,
      address3Error: address3Error.error
    });

    if (
      nameError ||
      emailError ||
      phoneError ||
      pincodeError ||
      address1Error.error ||
      address2Error.error ||
      address3Error.error
    ) {
      return false;
    }
    return true;
  };
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const { nameErrorMessage } = this.state;
    const checkError = isEmpty(value);
    const check = checkSpecialChar(value);
    this.setState({
      name: value,
      nameError: checkError || check,
      nameErrorMessage: check ? 'Special character not allowed !' : nameErrorMessage
    });
  };
  onChangeAddress = (e, key) => {
    const {
      target: { value }
    } = e;
    const checkError = validateAddress(value, key);
    const addressValue = {};
    const addressErrorValue = {};
    const addressErrorMsg = {};
    const errorKey = `${key}Error`;
    const errorMsgKey = `${key}ErrorMessage`;
    addressValue[key] = value.slice(0, 41);
    addressErrorValue[errorKey] = checkError.error;
    addressErrorMsg[errorMsgKey] = checkError.errorMessage;
    this.setState({
      ...addressValue,
      ...addressErrorValue,
      ...addressErrorMsg
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
    const address1Data = validateAddress(address1, 'address1');
    const address2Data = validateAddress(address2, 'address2');
    const address3Data = validateAddress(address3, 'address3');
    const address1Error = address1Data.error;
    const address1ErrorMessage = address1Data.errorMessage;
    const address2Error = address2Data.error;
    const address2ErrorMessage = address2Data.errorMessage;
    const address3Error = address3Data.error;
    const address3ErrorMessage = address3Data.errorMessage;
    this.setState({
      address1,
      address2,
      address3,
      address1Error,
      address1ErrorMessage,
      address2Error,
      address2ErrorMessage,
      address3Error,
      address3ErrorMessage,
      addForm: false,
      editForm: true,
      currentAddressIndex: index,
      email,
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
  toggleAddAddressForm = () => {
    this.setState({
      addForm: true,
      editForm: false,
      address1: '',
      address2: '',
      address3: '',
      pincode: '',
      phone: '',
      name: ''
    });
  };
  checkDisabled = () => {
    const {
 address1Error, address2Error, address3Error, phoneError, pincodeError, nameError, gstError
} = this.state;
    const check =
      address1Error || address2Error || address3Error || phoneError || pincodeError || nameError || gstError;
    return check;
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
      currentAddressIndex
      // gst
    } = this.state;
    const { data, useremail } = this.props;
    const { loading } = this.props;
    return (
      <Box type="block" mb="2rem" width="868px">
        <Row justifyContent="space-between" alignItems="center" mx={0} width={1} mb={20}>
          <Label variant="heading.medium">Saved Addresses</Label>
          <Button variant="outline.primary" height={42} sx={{ border: 'divider' }} onClick={this.toggleAddAddressForm}>
            <Image src={addIcon} alt="ADD NEW CARD" /> ADD NEW ADDRESS
          </Button>
        </Row>
        <Row mb={10}>
          <Col>
            <Text variant="heading.default">DEFAULT ADDRESS</Text>
          </Col>
        </Row>
        <Box>
          <Col display="block" mr="0" ml="0" pl={0} pr={0}>
            {data.map((item, index) => (
              <Box
                width={1}
                key={`${item.id_address_customer || '_'}_${String(index)}`}
                onClick={() => this.handleClick(index)}
                mb={30}
                sx={{
                  border: index === currentAddressIndex ? 'primary' : 'heading',
                  borderRadius: 3
                }}
              >
                <Box px={14} py={12}>
                  <Text lineHeight={1.4}>
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
                  </Text>
                  <Box mt={10}>
                    <Button variant="linkPrimary" fontFamily="medium">
                      MAKE THIS DEFAULT
                    </Button>
                  </Box>
                </Box>
                <Row mx={0} py={5} px={5} sx={{ borderTop: 'divider' }}>
                  <Col flexGrow={1} sx={{ borderRight: 'divider' }}>
                    <Button
                      fontSize={16}
                      variant="linkPrimary"
                      height={30}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image src={editIcon} height={14} width={14} mr={12} />
                      Edit
                    </Button>
                  </Col>
                  <Col flexGrow={1}>
                    <Button
                      fontSize={16}
                      variant="linkPrimary"
                      height={30}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image src={removeIcon} height={14} width={14} mr={12} />
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Box>
            ))}
          </Col>
          {editForm && (
            <form onSubmit={this.handleSubmit}>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Box col="5">
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
                    label="Flat, House no., Building, Apartment: *"
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address1');
                    }}
                    value={address1 || ''}
                    feedBackError={address1Error}
                    feedBackMessage={address1ErrorMessage}
                  />
                  <FormInput
                    label="Area, Colony, Street, Sector: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address2');
                    }}
                    value={address2 || ''}
                    feedBackError={address2Error}
                    feedBackMessage={address2ErrorMessage}
                  />
                  <FormInput
                    label="Landmark,Village: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address3');
                    }}
                    value={address3 || ''}
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
                    type="text"
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
                </Box>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Box col="2">
                  <Button
                    size="block"
                    btnType="primary"
                    fontFamily="regular"
                    height="42px"
                    mt="1.5rem"
                    width={1}
                    onClick={this.handleSubmit}
                    disabled={this.checkDisabled()}
                  >
                    {loading ? 'Please wait ...' : 'Save'}
                  </Button>
                </Box>
              </Row>
            </form>
          )}
          {addForm && (
            <form onSubmit={this.handleSubmit}>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Box col="5">
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
                    label="Flat, House no., Building, Apartment: *"
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
                    label="Area, Colony, Street, Sector: "
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
                    label="Landmark,Village: "
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
                    type="text"
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
                </Box>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Box col="2">
                  <Button
                    size="block"
                    btnType="primary"
                    fontFamily="regular"
                    height="42px"
                    mt="1.5rem"
                    bg="rgb(249, 141, 41)"
                    onClick={this.handleSubmit}
                    disabled={this.checkDisabled()}
                  >
                    {loading ? 'Please wait ...' : 'Save'}
                  </Button>
                </Box>
              </Row>
            </form>
          )}
        </Box>
      </Box>
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
