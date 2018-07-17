import React from 'react';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';

// Validators
import { validateMobile, isBlank } from 'js-utility-functions';
import { isEmpty, pincode as pincodeIsValid } from 'utils/validation';

const emailIsValid = value => !isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

class AddressForm extends React.Component {
  state = {
    fullName: '',
    fullNameFeedBackError: false,
    fullNameFeedBackMessage: 'Name Cannot be Left Empty !',
    email: '',
    emailFeedBackError: false,
    emailFeedBackMessage: 'Email is Not Valid  !',
    phone: '',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Phone is Not Valid !',
    address: '',
    addressFeedBackError: false,
    addressFeedBackMessage: 'Address Cannot be Left Empty !',
    city: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City cannot be Empty',
    pincode: '',
    pincodeFeedBackError: false,
    pincodeFeedBackMessage: 'Pincode is Invalid !',
    state: '',
    stateFeedBackError: false,
    stateFeedBackMessage: 'State cannot be Empty'
  };

  onChangeFullName = e => {
    e.preventDefault();
    this.setState(
      {
        fullName: e.target.value,
        fullNameFeedBackError: false
      },
      () => {
        if (isEmpty(this.state.fullName)) {
          this.setState({
            fullNameFeedBackError: true
          });
        }
      }
    );
  };
  onChangeEmail = e => {
    e.preventDefault();
    this.setState(
      {
        email: e.target.value,
        emailFeedBackError: false
      },
      () => {
        if (!emailIsValid(this.state.email)) {
          this.setState({
            emailFeedBackError: true
          });
        }
      }
    );
  };
  onChangePhone = e => {
    e.preventDefault();
    this.setState(
      {
        phone: e.target.value,
        phoneFeedBackError: false
      },
      () => {
        if (validateMobile(this.state.phone).error) {
          this.setState({
            phoneFeedBackError: true
          });
        }
      }
    );
  };
  onChangeAddress = e => {
    e.preventDefault();
    this.setState(
      {
        address: e.target.value,
        addressFeedBackError: false
      },
      () => {
        if (isEmpty(this.state.address)) {
          this.setState({
            addressFeedBackError: true
          });
        }
      }
    );
  };
  onChangePincode = e => {
    e.preventDefault();
    this.setState(
      {
        pincode: e.target.value,
        pincodeFeedBackError: false
      },
      () => {
        if (isEmpty(this.state.pincode) || pincodeIsValid(this.state.pincode)) {
          this.setState({
            pincodeFeedBackError: true
          });
        }
      }
    );
  };
  onChangeState = e => {
    e.preventDefault();
    this.setState(
      {
        state: e.target.value,
        stateFeedBackError: false
      },
      () => {
        if (isEmpty(this.state.pincode)) {
          this.setState({
            stateFeedBackError: true
          });
        }
      }
    );
  };
  onChangeCity = e => {
    e.preventDefault();
    this.setState(
      {
        city: e.target.value,
        cityFeedBackError: false
      },
      () => {
        if (isEmpty(this.state.pincode)) {
          this.setState({
            cityFeedBackError: true
          });
        }
      }
    );
  };

  validateForm = () => {
    const {
      fullName,
      fullNameFeedBackError,
      email,
      emailFeedBackError,
      phone,
      phoneFeedBackError,
      address,
      addressFeedBackError,
      city,
      cityFeedBackError,
      pincode,
      pincodeFeedBackError,
      state,
      stateFeedBackError
    } = this.state;

    const fullNameError = isBlank(fullName) || fullNameFeedBackError;
    const emailError = isBlank(email) || emailFeedBackError;
    const phoneError = isBlank(phone) || phoneFeedBackError;
    const pincodeError = isBlank(pincode) || pincodeFeedBackError;
    const cityError = isBlank(city) || cityFeedBackError;
    const stateError = isBlank(state) || stateFeedBackError;
    const addressError = isBlank(address) || addressFeedBackError;

    if (fullNameError || emailError || pincodeError || phoneError || cityError || stateError || addressError) {
      this.setState({
        fullNameFeedBackError: fullNameError,
        emailFeedBackError: emailError,
        phoneFeedBackError: phoneError,
        pincodeFeedBackError: pincodeError,
        cityFeedBackError: cityError,
        stateFeedBackError: stateError,
        addressFeedBackError: addressError
      });
      return {
        error: true,
        data: null
      };
    }
    return {
      error: false,
      data: {
        fullName,
        phone,
        email,
        pincode,
        address,
        city,
        state
      }
    };
  };

  render() {
    const {
      fullName,
      fullNameFeedBackError,
      fullNameFeedBackMessage,
      email,
      emailFeedBackError,
      emailFeedBackMessage,
      phone,
      phoneFeedBackError,
      phoneFeedBackMessage,
      address,
      addressFeedBackError,
      addressFeedBackMessage,
      city,
      cityFeedBackError,
      cityFeedBackMessage,
      pincode,
      pincodeFeedBackError,
      pincodeFeedBackMessage,
      state,
      stateFeedBackError,
      stateFeedBackMessage
    } = this.state;

    const {
      onChangeEmail,
      onChangePhone,
      onChangeFullName,
      onChangeAddress,
      onChangePincode,
      onChangeCity,
      onChangeState
    } = this;

    return (
      <div>
        <Row display="block" mr="0" ml="0">
          <Div col="5">
            <FormInput
              label="Full Name"
              type="text"
              placeholder=""
              onChange={onChangeFullName}
              value={fullName}
              feedBackError={fullNameFeedBackError}
              feedBackMessage={fullNameFeedBackMessage}
            />
            <FormInput
              label="Pincode"
              type="text"
              placeholder=""
              onChange={onChangePincode}
              value={pincode}
              feedBackError={pincodeFeedBackError}
              feedBackMessage={pincodeFeedBackMessage}
            />
            <FormInput
              label="Address"
              type="text-area"
              placeholder=""
              onChange={onChangeAddress}
              value={address}
              feedBackError={addressFeedBackError}
              feedBackMessage={addressFeedBackMessage}
            />
            <FormInput
              label="City"
              type="text"
              placeholder=""
              onChange={onChangeCity}
              value={city}
              feedBackError={cityFeedBackError}
              feedBackMessage={cityFeedBackMessage}
            />
            <FormInput
              label="State"
              type="text"
              placeholder=""
              onChange={onChangeState}
              value={state}
              feedBackError={stateFeedBackError}
              feedBackMessage={stateFeedBackMessage}
            />
            <FormInput
              label="Email ID"
              type="text"
              placeholder=""
              onChange={onChangeEmail}
              value={email}
              feedBackError={emailFeedBackError}
              feedBackMessage={emailFeedBackMessage}
            />
            <FormInput
              label="Phone"
              type="text"
              placeholder=""
              onChange={onChangePhone}
              value={phone}
              feedBackError={phoneFeedBackError}
              feedBackMessage={phoneFeedBackMessage}
            />
          </Div>
        </Row>
      </div>
    );
  }
}

export default AddressForm;
