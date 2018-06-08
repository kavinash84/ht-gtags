import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import LoginForm from 'hometown-components/lib/Forms/LoginForm';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import { validateEmail, isBlank } from 'js-utility-functions';
import { SIGNUP_URL } from 'helpers/Constants';
import { login } from 'redux/modules/login';

const SidebarImg = require('../../../static/login-side-thumb.png');

@connect(state => ({
  loginResponse: state.userLogin
}))
@withRouter
export default class LoginFormContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired
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
    const styles = require('./index.scss');

    const {
      email, password, emailError, emailErrorMessage, passwordError, passwordErrorMessage
    } = this.state;
    const { loginResponse } = this.props;
    return (
      <Section p="0" mb="0">
        <Menu />
        <div className="wrapper">
          <Container pr="0" pl="0">
            <div className={styles.loginWrapper}>
              <Row display="block" mr="0" ml="0">
                <Div col={4}>
                  <div className={styles.imgWrapper}>
                    <Div>
                      <Heading color="white">LOGIN</Heading>
                      <Text color="white">
                        Get access to your Orders, <br />Wishlist and Recommendations
                      </Text>
                    </Div>
                    <Img src={SidebarImg} />
                  </div>
                </Div>
                <Div col={8} p="2rem 3.5rem">
                  <Row display="block" mr="0" ml="0">
                    <Div col="12" ta="right">
                      <Link to={SIGNUP_URL}>
                        <Label fontFamily="light" color="primary">
                          New User? Sign Up now
                        </Label>
                      </Link>
                    </Div>
                  </Row>
                  <Row display="block" mr="0" ml="0">
                    <Div mt="1.25rem">
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
                    </Div>
                  </Row>
                  <Row display="block" mr="0" ml="0" pt="1.25rem">
                    <Div col="6">
                      <Label fontFamily="light">
                        <Link to="/">Forgot Password?</Link>
                      </Label>
                    </Div>
                    <Div col="6" ta="right">
                      <Label fontFamily="light">
                        <Link to={SIGNUP_URL}>Login via OTP?</Link>
                      </Label>
                    </Div>
                  </Row>
                </Div>
              </Row>
            </div>
          </Container>
        </div>
        <Footer />
      </Section>
    );
  }
}
