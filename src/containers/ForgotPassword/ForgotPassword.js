import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import ForgotPasswordForm from 'hometown-components/lib/Forms/ForgotPasswordForm';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import { LOGIN_URL } from 'helpers/Constants';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';

const SidebarImg = require('../../../static/forgotpassword-sidebar-bg.jpg');
const ForgotPasswordImg = require('../../../static/forgot-password-icon.png');

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
@withRouter
export default class ForgotPasswordContainer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired
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
      submitted: false
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
    this.setState({ submitted: true });
    const { dispatch } = this.context.store;
    dispatch(forgotPassword(email));
  };
  render() {
    const styles = require('../Login/index.scss');

    const {
      email, emailError, emailErrorMessage, submitted
    } = this.state;
    const { response } = this.props;
    const { loaded, error } = response;
    return (
      <Section p="0" mb="0">
        <Menu />
        <div className="wrapper">
          <Container pr="0" pl="0">
            <Div p="3rem 0 1rem">
              <div className={styles.userWrapper}>
                <Row display="block" mr="0" ml="0">
                  <Div col={6}>
                    <div className={styles.imgWrapper}>
                      <Img src={SidebarImg} />
                    </div>
                  </Div>
                  <Div col={6} p="1.25rem 3.5rem">
                    {loaded && !error && submitted ? (
                      <div className={`${styles.responseBlock}`}>
                        <img src={ForgotPasswordImg} alt="" />
                        <Row display="block" mr="0" ml="0">
                          <Div mt="0">
                            <div className={styles.content}>
                              <p>
                                An email has been sent to <br />
                                <b>{email}</b>
                              </p>
                              <p>Please follow the instructions to reset your password</p>
                            </div>
                          </Div>
                        </Row>
                      </div>
                    ) : (
                      <div className={`${styles.formBlock} ${styles.forgotForm}`}>
                        <Row display="block" mt="1.5rem" mr="0" ml="0">
                          <Div col="12" ta="center">
                            <Heading
                              color="color676767"
                              mt="0"
                              mb="0"
                              fontWeight="400"
                              fontSize="2rem"
                              ta="center"
                              fontFamily="light"
                            >
                              Forgot password?
                            </Heading>
                            <Text color="color676767" ta="center" lh="1.6">
                              Enter the e-mail address associated with your account <br />
                              Click submit to have your password e-mailed to you.
                            </Text>
                          </Div>
                        </Row>
                        <Row display="block" mr="0" ml="0">
                          <Div mt="0">
                            <ForgotPasswordForm
                              email={email}
                              onChangeEmail={this.onChangeEmail}
                              emailFeedBackError={emailError}
                              emailFeedBackMessage={emailErrorMessage}
                              onSubmitForgot={this.onSubmitForgot}
                              forgotResponse={response}
                              loginUrl={LOGIN_URL}
                            />
                          </Div>
                        </Row>
                      </div>
                    )}
                  </Div>
                </Row>
              </div>
            </Div>
          </Container>
        </div>
        <Footer />
      </Section>
    );
  }
}
