import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import ForgotPasswordForm from 'hometown-components/lib/Forms/ForgotPasswordForm';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { validateEmail } from 'js-utility-functions';

const SidebarImg = require('../../../static/login-side-thumb.png');
const ForgotPasswordImg = require('../../../static/forgot-password-icon.png');

@withRouter
export default class ForgotPasswordContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: ''
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
  onSubmitForgot = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    if (checkEmail.error) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage
      });
    }
  };
  render() {
    const styles = require('../Login/index.scss');

    const { email, emailError, emailErrorMessage } = this.state;
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
                        FORGOT PASSWORD
                      </Heading>
                      <Text color="white" />
                    </Div>
                    <Img src={SidebarImg} />
                  </div>
                </Div>
                <Div col={7} p="1.25rem 3.5rem" bg="#f8f8f8">
                  <div className={`${styles.formBlock} ${styles.forgotForm}`}>
                    <Row display="block" mr="0" ml="0">
                      <Div mt="0">
                        <ForgotPasswordForm
                          email={email}
                          onChangeEmail={this.onChangeEmail}
                          emailFeedBackError={emailError}
                          emailFeedBackMessage={emailErrorMessage}
                          onSubmitForgot={this.onSubmitForgot}
                        />
                      </Div>
                    </Row>
                  </div>
                  <div className={`${styles.responseBlock} ${styles.hide}`}>
                    <img src={ForgotPasswordImg} alt="" />
                    <Row display="block" mr="0" ml="0">
                      <Div mt="0">
                        <div className={styles.content}>
                          <p>
                            An email has been sent to <br />
                            <b>test123@gmail.com</b>
                          </p>
                          <p>Please follow the instructions to reset your password</p>
                        </div>
                      </Div>
                    </Row>
                  </div>
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