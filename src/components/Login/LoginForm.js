import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginForm from 'hometown-components/lib/Forms/LoginForm';
import { validateEmail, isBlank } from 'js-utility-functions';
import { login } from 'redux/modules/login';

@connect(state => ({
  loginResponse: state.userLogin
}))
@withRouter
export default class LoginFormContainer extends Component {
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    password: '',
    passwordError: false,
    passwordErrorMessage: ''
  };

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
    const { dispatch } = this.context.store;
    dispatch(login(this.state));
  };
  render() {
    const {
      email, password, emailError, emailErrorMessage, passwordError, passwordErrorMessage
    } = this.state;
    const { loginResponse } = this.props;
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
        loginResponse={loginResponse}
      />
    );
  }
}
