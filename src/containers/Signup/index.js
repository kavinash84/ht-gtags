import React, { Component } from 'react';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Link from 'hometown-components/lib/Link';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import { validateEmail, isBlank } from 'js-utility-functions';

const closeIcon = require('../../../static/closebutton.png');

export default class SignupFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      phone: '',
      phoneError: false,
      phoneErrorMessage: '',
      password: '',
      passwordError: false,
      passwordErrorMessage: ''
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
    const checkError = isBlank(value);
    this.setState({
      phone: value,
      phoneError: checkError.error,
      phoneErrorMessage: checkError ? "Phone can't be blank" : ''
    });
  };
  onChangePassword = e => {
    const { target: { value } } = e;
    const checkError = isBlank(value);
    this.setState({
      password: value,
      passwordError: checkError,
      passwordErrorMessage: checkError ? "Password can't be blank" : ''
    });
  };
  onSubmitLogin = e => {
    e.preventDefault();
    const { email, password, phone } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkPhone = isBlank(phone);
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkPhone) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        phoneError: checkPhone.error,
        phoneErrorMessage: checkPhone ? "Phone can't be blank" : '',
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : ''
      });
    }
    // console.log(this.state);
  };
  render() {
    const styles = require('./index.scss');

    const {
      email,
      phone,
      password,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      passwordError,
      passwordErrorMessage
    } = this.state;
    return (
      <div className={styles.signupWrapper}>
        <Section p="0" mb="0.3125rem">
          <div className={styles.imgWrapper}>
            <Img src="http://via.placeholder.com/720x480" />
            <div className={styles.back}>
              <img src={closeIcon} alt="Back" />
            </div>
          </div>
        </Section>
        <Section mb="0" p="1.25rem" pt="1.5rem" pb="1.5rem">
          <Row display="block" mr="0" ml="0">
            <Div col="6">
              <Heading mt="0" mb="0" color="textDark" fontSize="1.25em">
                Sign Up
              </Heading>
            </Div>
            <Div col="6" ta="right">
              <Label fontFamily="light">
                <Link href="#login" fontSize="0.875em">
                  Existing User? Log in now
                </Link>
              </Label>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0">
            <Div mt="1.25rem">
              <SignupForm
                email={email}
                onChangeEmail={this.onChangeEmail}
                emailFeedBackError={emailError}
                emailFeedBackMessage={emailErrorMessage}
                phone={phone}
                onChangePhone={this.onChangePhone}
                phoneFeedBackError={phoneError}
                phoneFeedBackMessage={phoneErrorMessage}
                password={password}
                onChangePassword={this.onChangePassword}
                passwordFeedBackError={passwordError}
                passwordFeedBackMessage={passwordErrorMessage}
                onSubmitLogin={this.onSubmitLogin}
              />
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0" pt="1.5625rem">
            <Div col="6">
              <Label fontFamily="light">
                <Link href="#forgot" fontSize="0.875em">
                  Forgot Password?
                </Link>
              </Label>
            </Div>
            <Div col="6" ta="right">
              <Label fontFamily="light">
                <Link href="#otp" fontSize="0.875em">
                  Login via OTP?
                </Link>
              </Label>
            </Div>
          </Row>
        </Section>
      </div>
    );
  }
}
