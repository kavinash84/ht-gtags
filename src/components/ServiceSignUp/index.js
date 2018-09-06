import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ServiceSignUpForm from 'hometown-components/lib/Forms/ServiceSignUpForm';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components/lib/Buttons';
import { sendData } from 'redux/modules/services';
import { SERVICE_SIGNUPS } from 'helpers/apiUrls';

const mapStateToProps = ({ services }, props) => ({
  ...services[props.formType]
});

class ServiceSignUpModal extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    pincode: '',
    location: '',
    open: false
  };
  onChangeName = e => {
    const { target: { value } } = e;
    this.setState({
      name: value
    });
  };
  onChangeEmail = e => {
    const { target: { value } } = e;
    this.setState({
      email: value
    });
  };
  onChangePhone = e => {
    const { target: { value } } = e;
    const regex = /^((?!(0))[0-9]{1,10})$/;
    if (regex.test(value)) {
      this.setState({
        phone: value
      });
    }
  };
  onChangeAddress = e => {
    const { target: { value } } = e;
    this.setState({
      address: value
    });
  };
  onChangeLocation = e => {
    const { target: { value } } = e;
    this.setState({
      location: value
    });
  };
  onChangePincode = e => {
    const { target: { value } } = e;
    const regex = /^((?!(0))[0-9]{1,6})$/;
    if (regex.test(value)) {
      this.setState({
        pincode: value
      });
    }
  };
  onChangeService = e => {
    const { target: { value } } = e;
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
    const styles = require('../Login/LoginModal.scss');
    const { loading, loaded } = this.props;
    console.log(loading);
    return (
      <div className={styles.signupModal}>
        <Row display="block" mr="0" ml="0">
          <Div>
            <Row ml="0" mr="0" mt="2.5rem">
              <Div col="12" ta="center">
                <Button btnType="primary" pl="1rem" pr="2rem" onClick={this.handleModal}>
                  SIGN UP NOW
                </Button>
              </Div>
            </Row>
            <ResponsiveModal onCloseModal={this.handleModal} open={this.state.open}>
              {!loading &&
                !loaded && (
                <ServiceSignUpForm
                  name={name}
                  email={email}
                  phone={phone}
                  address={address}
                  location={location}
                  pincode={pincode}
                  service={service}
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
              {loaded && !loading && <div>Thank you !</div>}
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
