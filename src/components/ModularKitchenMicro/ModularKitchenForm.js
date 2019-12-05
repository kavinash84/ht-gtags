import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResponsiveModal from 'components/Modal';
import Heading from 'hometown-components-dev/lib/Heading';
import ModularKitchenForm from 'hometown-components-dev/lib/Forms/ModularKitchenForm';
import Div from 'hometown-components-dev/lib/Div';
import Row from 'hometown-components-dev/lib/Row';
import Text from 'hometown-components-dev/lib/Text';
import Img from 'hometown-components-dev/lib/Img';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from 'helpers/apiUrls';
import { sendData, getData } from 'redux/modules/services';
import { validateMobile, validateEmail, isEmpty, pincode as validatePincode } from 'utils/validation';

const styles = require('./ModularKitchen.scss');

@connect(
  ({ services }) => ({
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class ModularKitchen extends Component {
  state = {
    name: '',
    nameErrorMessage: 'Name should not be left blank ',
    phone: '',
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    email: '',
    emailErrorMessage: 'Please Enter Valid Email ',
    address: '',
    addressErrorMessage: 'Address should not be left blank ',
    pincode: '',
    pincodeErrorMessage: 'Pincode is Invalid',
    open: false
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.data && nextprops.data !== this.props.data) {
      this.setState({
        city: nextprops.data.city,
        state: nextprops.data.state
      });
    }
    if (nextprops.loaded && nextprops.loaded !== this.props.loaded) {
      this.setState({
        open: true,
        name: '',
        phone: '',
        email: '',
        address: '',
        pincode: ''
      });
    }
  }

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
  onChangePincode = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePincode(value);
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      // Dispatch the load state and city api
      return;
    }
    if (value.length === 6) {
      const { loadPincodeDetails } = this.props;
      loadPincodeDetails(`${PINCODE_API}/details/${value}`, 'modularkitchen');
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
    const { sendFormData } = this.props;
    const {
      name, phone, email, pincode, address, city, state
    } = this.state;
    const nameError = isEmpty(name);
    const phoneError = !validateMobile(phone);
    const emailError = !validateEmail(email);
    const pincodeError = validatePincode(pincode) || isEmpty(pincode);
    if (nameError || phoneError || emailError || pincodeError) {
      this.setState({
        nameError,
        phoneError,
        emailError,
        pincodeError
      });
      return;
    }
    const data = {
      name,
      email,
      address,
      pincode,
      city,
      state,
      mobile: phone,
      service: 1
    };
    sendFormData(SERVICE_SIGNUPS, data, 'modularkitchen');
  };

  handleBookNow = () => {
    let pageoffset = window.pageYOffset;
    const scroller = pset =>
      new Promise(resolve => {
        window.setTimeout(() => {
          window.scroll(0, pset);
          resolve();
        }, 2);
      });
    const speed = 12;
    (async () => {
      while (pageoffset > 0) {
        pageoffset -= speed ** 2;
        /* eslint-disable no-await-in-loop */
        await scroller(pageoffset);
      }
    })();
  };
  handleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { loading, loaded } = this.props;
    const {
      name, email, phone, address, pincode, service
    } = this.state;
    const correctIcon = require('../../../static/correct.svg');
    const {
      nameError,
      nameErrorMessage,
      addressError,
      addressErrorMessage,
      pincodeError,
      pincodeErrorMessage,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      serviceError,
      serviceErrorMessage
    } = this.state;
    return (
      <div>
        <Div className={styles.mkForm}>
          <Row m="0 1rem">
            <Div col="12" pr="0.625rem" pl="0.625rem">
              <Heading mb="0.625rem" mt="0" color="mkFormHeading" fontSize="1.25rem" fontFamily="light">
                Want to design your kitchen?
              </Heading>
            </Div>
          </Row>
          {
            <ModularKitchenForm
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
              onChangeService={this.onChangeService}
              onSubmitForm={this.onSubmitForm}
            />
          }
        </Div>
        {loaded && !loading && (
          <ResponsiveModal
            classNames={{ modal: 'responsiveModal' }}
            onCloseModal={this.handleModal}
            open={this.state.open}
          >
            <Div ta="center" className={styles.serviceThankYouWrapper}>
              <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
              <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                Thank you !
              </Text>
            </Div>
          </ResponsiveModal>
        )}
      </div>
    );
  }
}

ModularKitchen.defaultProps = {
  loading: false,
  loaded: false,
  data: {},
  loadPincodeDetails: () => {},
  sendFormData: () => {}
};
ModularKitchen.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadPincodeDetails: PropTypes.func,
  data: PropTypes.object,
  sendFormData: PropTypes.func
};
