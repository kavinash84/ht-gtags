import React, { Component } from 'react';
import ProfileFormContainer from 'hometown-components/lib/Forms/ProfileForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import { validateEmail, validateMobile, isBlank } from 'js-utility-functions';

export default class ProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      phone: '',
      phoneError: false,
      phoneErrorMessage: '',
      fullName: '',
      fullNameError: false,
      fullNameErrorMessage: ''
    };
  }
  onChangeEmail = e => {
    const { target: { value } } = e;
    const checkError = validateEmail(value, 'Enter valid email');
    this.setState({
      email: value,
      emailError: checkError.error,
      emailErrorMessage: checkError.error ? checkError.errorMessage : ''
    });
  };
  onChangePhone = e => {
    const { target: { value } } = e;
    const checkError = validateMobile(value, 'Mobile should be 10 digits');
    this.setState({
      phone: value,
      phoneError: checkError.error,
      phoneErrorMessage: checkError.error ? checkError.errorMessage : ''
    });
  };
  onChangeFullName = e => {
    const { target: { value } } = e;
    const checkError = isBlank(value);
    this.setState({
      fullName: value,
      fullNameError: checkError,
      fullNameErrorMessage: checkError ? "Name can't be blank" : ''
    });
  };
  onSubmitProfile = e => {
    e.preventDefault();
    const { email, fullName, phone } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkPhone = validateMobile(phone, 'Mobile no. should be 10 digits');
    const checkFullName = isBlank(fullName);
    if (checkEmail.error || checkFullName || checkPhone) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        phoneError: checkPhone.error,
        phoneErrorMessage: checkPhone.errorMessage,
        fullNameError: checkFullName,
        fullNameErrorMessage: checkFullName ? "Name can't be blank" : ''
      });
    }
    // console.log(this.state);
  };
  render() {
    const styles = require('./index.scss');

    const {
      email,
      phone,
      fullName,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      fullNameError,
      fullNameErrorMessage
    } = this.state;
    return (
      <div className={styles.formContainer}>
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <Row display="block" mr="0" ml="0">
            <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="300">
              Profile Information
            </Heading>
          </Row>
        </Section>
        <div className={styles.formWrapper}>
          <Section p="0.5rem" mb="0">
            <Row display="block" mr="0" ml="0">
              <Div>
                <ProfileFormContainer
                  email={email}
                  onChangeEmail={this.onChangeEmail}
                  emailFeedBackError={emailError}
                  emailFeedBackMessage={emailErrorMessage}
                  phone={phone}
                  onChangePhone={this.onChangePhone}
                  phoneFeedBackError={phoneError}
                  phoneFeedBackMessage={phoneErrorMessage}
                  fullName={fullName}
                  onChangeFullName={this.onChangeFullName}
                  fullNameFeedBackError={fullNameError}
                  fullNameFeedBackMessage={fullNameErrorMessage}
                  onSubmitProfile={this.onSubmitProfile}
                />
              </Div>
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}
