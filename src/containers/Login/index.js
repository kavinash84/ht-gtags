import React, { Component } from 'react';
import LoginForm from 'hometown-components/lib/Forms/LoginForm';
import { validateEmail, isBlank } from 'js-utility-functions';

export default class LoginFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
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
    const { email, password } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : ''
      });
    }
    console.log(this.state);
  };
  render() {
    const {
      email, password, emailError, emailErrorMessage, passwordError, passwordErrorMessage
    } = this.state;
    return (
      <LoginForm
        email={email}
        onChangeEmail={this.onChangeEmail}
        emailFeedBackError={emailError}
        emailFeedBackMessage={emailErrorMessage}
        password={password}
        onChangePassword={this.onChangePassword}
        passwordFeedBackError={passwordError}
        passwordFeedBackMessage={passwordErrorMessage}
        onSubmitLogin={this.onSubmitLogin}
      />
    );
  }
}
