import React, { Component } from 'react';
import ProfileForm from 'hometown-components/lib/Forms/ProfileForm';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Menu from 'components/OtherMenu';
import { validateEmail, isBlank } from 'js-utility-functions';

export default class ProfileFormContainer extends Component {
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
      <div className={styles.formContainer}>
        <Menu />
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="SFPDLight">
                Profile Information
              </Heading>
            </Row>
          </Container>
        </Section>
        <div className={styles.formWrapper}>
          <Section
            p="1.25rem"
            mb="0"
            bg="sectionBgDark"
            boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
            height="calc(100vh - 104px)"
          >
            <Row display="block" mr="0" ml="0">
              <Div>
                <ProfileForm
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
          </Section>
        </div>
      </div>
    );
  }
}
