import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';
import { Label } from 'hometown-components/lib/Label';
import Img from 'hometown-components/lib/Img';
import { validateEmail, isBlank } from 'js-utility-functions';
import { validateMobile } from 'utils/validation';
import { LOGIN_URL } from 'helpers/Constants';
import { signUp } from 'redux/modules/signUp';

const SidebarImg = require('../../../static/login-side-thumb.png');

@connect(({ userSignUp, app, notifs }) => ({
  signUpResponse: userSignUp,
  session: app.sessionId,
  notifs
}))
@withRouter
export default class SignupFormContainer extends Component {
  static propTypes = {
    session: PropTypes.string.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
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
    const checkError = !validateMobile(value);
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage: checkError ? 'Mobile no. should be 10 digits' : ''
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
  onSubmitSignup = e => {
    e.preventDefault();
    const { email, password, phone } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkPhone = validateMobile(phone, 'Mobile no. should be 10 digits');
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkPhone.error) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        phoneError: checkPhone.error,
        phoneErrorMessage: checkPhone.errorMessage,
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : ''
      });
    }
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(this.state, session));
  };
  render() {
    const styles = require('../Login/index.scss');

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
      <Section p="0" mb="0">
        <Menu />
        <div className="wrapper">
          <Container pr="0" pl="0">
            <div className={styles.userWrapper}>
              <Row display="block" mr="0" ml="0">
                <Div col={5}>
                  <div className={styles.imgWrapper}>
                    <Div>
                      <Heading color="white" fontSize="1.375rem">
                        SIGN UP
                      </Heading>
                      <Text color="white">
                        Get access to your Orders, <br /> Wishlist and Recommendations
                      </Text>
                    </Div>
                    <Img src={SidebarImg} />
                  </div>
                </Div>
                <Div col={7} p="1.25rem 3.5rem" bg="#f8f8f8">
                  <div className={styles.formBlock}>
                    <Row display="block" mr="0" ml="0">
                      <Div col="12" ta="right">
                        <Link to={LOGIN_URL}>
                          <Label color="primary">Existing User? Log in now</Label>
                        </Link>
                      </Div>
                    </Row>
                    <Row display="block" mr="0" ml="0">
                      <Div mt="0">
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
                          onSubmitSignup={this.onSubmitSignup}
                        />
                      </Div>
                    </Row>
                  </div>
                  {/* <Row display="block" mr="0" ml="0" pt="0.3125rem">
                    <Div col="12">
                      <Label fontFamily="medium" color="error" display="block" ta="center">
                        Message
                      </Label>
                    </Div>
                  </Row> */}
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
