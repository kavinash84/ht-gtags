import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import ResetPasswordForm from 'hometown-components/lib/Forms/ResetPasswordForm';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { isBlank } from 'js-utility-functions';
import { validatePassword } from 'utils/validation';
import { updatePassword } from 'redux/modules/updatepassword';

const SidebarImg = require('../../../static/login-side-thumb.png');

@connect(state => ({
  updatingPassword: state.updatingPassword,
  updateError: state.updateError,
  updateMessage: state.updateMessage
}))
export default class ResetPasswordContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      newPwd: '',
      newPwdError: false,
      newPwdErrorMessage: '',
      confirmPwd: '',
      confirmPwdError: false,
      confirmPwdErrorMessage: ''
    };
  }
  onChangeNewPwd = e => {
    const { target: { value } } = e;
    const checkError = validatePassword(value, 'Password must be at least 6 character long');
    this.setState({
      newPwd: value,
      newPwdError: checkError.error,
      newPwdErrorMessage: checkError ? checkError.errorMessage : ''
    });
  };
  onChangeConfirmPwd = e => {
    const { target: { value } } = e;
    const checkError = this.matchConfirmPassword(value);
    this.setState({
      confirmPwd: value,
      confirmPwdError: checkError,
      confirmPwdErrorMessage: checkError ? "Confirm Password doesn't match" : ''
    });
  };
  onSubmitUpdatePassword = e => {
    e.preventDefault();
    const {
      confirmPwd, newPwd, newPwdError, confirmPwdError
    } = this.state;
    const checkNewPwd = isBlank(newPwd) || newPwdError;
    const checkConfirmPwd = isBlank(confirmPwd) || confirmPwdError;
    if (newPwd !== confirmPwd) {
      return this.setState({
        confirmPwdError: true,
        confirmPwdErrorMessage: "Confirm Password doesn't match"
      });
    }

    if (checkConfirmPwd || checkNewPwd) {
      return this.setState({
        newPwdError: checkNewPwd,
        newPwdErrorMessage: checkNewPwd ? 'Password must be at least 6 character long' : '',
        confirmPwdError: checkConfirmPwd,
        confirmPwdErrorMessage: checkConfirmPwd ? "Confirm Password doesn't match" : ''
      });
    }
    const { dispatch } = this.context.store;
    dispatch(updatePassword(this.state));
  };
  matchConfirmPassword = value => {
    if (value === this.state.newPwd) {
      return false;
    }
    return true;
  };

  render() {
    const styles = require('../Login/index.scss');

    const {
      newPwd, confirmPwd, newPwdError, newPwdErrorMessage, confirmPwdError, confirmPwdErrorMessage
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
                        RESET PASSWORD
                      </Heading>
                      <Text color="white" />
                    </Div>
                    <Img src={SidebarImg} />
                  </div>
                </Div>
                <Div col={7} p="1.25rem 3.5rem" bg="#f8f8f8">
                  <div className={`${styles.formBlock} ${styles.resetForm}`}>
                    <Row display="block" mr="0" ml="0">
                      <Div mt="0">
                        <ResetPasswordForm
                          newPwd={newPwd}
                          onChangeNewPwd={this.onChangeNewPwd}
                          newPwdFeedBackError={newPwdError}
                          newPwdFeedBackMessage={newPwdErrorMessage}
                          confirmPwd={confirmPwd}
                          onChangeConfirmPwd={this.onChangeConfirmPwd}
                          confirmPwdFeedBackError={confirmPwdError}
                          confirmPwdFeedBackMessage={confirmPwdErrorMessage}
                          onSubmitUpdatePassword={this.onSubmitUpdatePassword}
                        />
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
