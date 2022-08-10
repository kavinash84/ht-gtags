import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ServiceSignUpForm from 'hometown-components-dev/lib/Forms/ServiceSignUpForm';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components-dev/lib/Buttons';
import Img from 'hometown-components-dev/lib/Img';
import Text from 'hometown-components-dev/lib/Text';
import { sendData } from 'redux/modules/services';
import { SERVICE_SIGNUPS } from 'helpers/apiUrls';
import { validateMobile, validateEmail, isEmpty, pincode as validatePincode } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';

const mapStateToProps = ({ services }, props) => ({
  ...services[props.formType]
});

class ServiceSignUpModal extends Component {
  state = {
    name: '',
    nameErrorMessage: 'Name should not be left blank ',
    phone: '',
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    email: '',
    emailErrorMessage: 'Please Enter Valid Email ',
    address: '',
    addressErrorMessage: 'Address should not be left blank ',
    service: '',
    serviceErrorMessage: 'Please Choose A Service',
    pincode: '',
    pincodeErrorMessage: 'Pincode is Invalid',
    location: '',
    locationErrorMessage: 'Location should not be left blank',
    open: false
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
  onChangeAddress = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      address: value,
      addressError: checkError
    });
  };
  onChangeLocation = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      location: value,
      locationError: checkError
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
  onChangeService = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      service: value
    });
  };
  onSubmitForm = e => {
    e.preventDefault();
    const { sendFormData, formType } = this.props;
    const {
 name, phone, email, location, pincode, address, service
} = this.state;
    const nameError = isEmpty(name);
    const phoneError = !validateMobile(phone);
    const emailError = !validateEmail(email);
    const locationError = isEmpty(location);
    const pincodeError = validatePincode(pincode) || isEmpty(pincode);
    const addressError = isEmpty(address);
    const serviceError = isEmpty(service);
    if (nameError || phoneError || emailError || locationError || pincodeError || addressError || serviceError) {
      this.setState({
        nameError,
        phoneError,
        emailError,
        locationError,
        pincodeError,
        addressError,
        serviceError
      });
      return;
    }
    const data = {
      name,
      mobile: phone,
      email,
      address,
      pincode,
      city: location,
      state: location,
      service: Number(service)
    };
    sendFormData(SERVICE_SIGNUPS, data, formType);
  };
  handleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const {
 name, email, phone, address, location, pincode, service
} = this.state;
    const styles = require('./ServiceSignUpModal.scss');
    const correctIcon = require('../../../static/correct.svg');
    const refreshIcon = require('../../../static/refresh-primary.svg');
    const { loading, loaded } = this.props;
    const {
      nameError,
      nameErrorMessage,
      addressError,
      addressErrorMessage,
      pincodeError,
      pincodeErrorMessage,
      locationError,
      locationErrorMessage,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      serviceError,
      serviceErrorMessage
    } = this.state;
    return (
      <div>
        <Row display="block" mr="0" ml="0">
          <Div>
            <Row ml="0" mr="0" mt="1.5rem">
              <Div col="12" ta="center">
                <Button btnType="primary" pl="1.5rem" pr="1.5rem" onClick={this.handleModal}>
                  SIGN UP NOW
                </Button>
              </Div>
            </Row>
            <ResponsiveModal
              classNames={{ modal: 'responsiveModal' }}
              onCloseModal={this.handleModal}
              open={this.state.open}
            >
              {loading && (
                <div className={styles.overlay}>
                  <Img className="spin" m="0 auto" width="36px" src={refreshIcon} alt="Pls Wait..." />
                </div>
              )}
              <Div p="1rem">
                {!loaded && (
                  <ServiceSignUpForm
                    name={name}
                    nameError={nameError}
                    nameErrorMessage={nameErrorMessage}
                    email={email}
                    emailError={emailError}
                    emailErrorMessage={emailErrorMessage}
                    phone={phone}
                    phoneError={phoneError}
                    phoneErrorMessage={phoneErrorMessage}
                    address={address}
                    addressError={addressError}
                    addressErrorMessage={addressErrorMessage}
                    location={location}
                    locationError={locationError}
                    locationErrorMessage={locationErrorMessage}
                    pincode={pincode}
                    pincodeError={pincodeError}
                    pincodeErrorMessage={pincodeErrorMessage}
                    service={service}
                    serviceError={serviceError}
                    serviceErrorMessage={serviceErrorMessage}
                    onChangeName={this.onChangeName}
                    onChangeEmail={this.onChangeEmail}
                    onChangePhone={this.onChangePhone}
                    onChangeAddress={this.onChangeAddress}
                    onChangePincode={this.onChangePincode}
                    onChangeLocation={this.onChangeLocation}
                    onChangeService={this.onChangeService}
                    onSubmitForm={this.onSubmitForm}
                  />
                )}
                {loaded && !loading && (
                  <Div ta="center" className={styles.serviceThankYouWrapper}>
                    <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
                    <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                      Thank you !
                    </Text>
                  </Div>
                )}
              </Div>
            </ResponsiveModal>
          </Div>
        </Row>
      </div>
    );
  }
}

ServiceSignUpModal.defaultProps = {
  formType: '',
  loading: false,
  loaded: false
};

ServiceSignUpModal.propTypes = {
  formType: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  sendFormData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { sendFormData: sendData })(ServiceSignUpModal);
