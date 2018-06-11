import React, { Component } from 'react';
import UpdatePasswordFormContainer from 'hometown-components/lib/Forms/UpdatePasswordForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import { isBlank } from 'js-utility-functions';

export default class UpdatePasswordForm extends Component {
  constructor() {
    super();
    this.state = {
      oldPwd: '',
      oldPwdError: false,
      oldPwdErrorMessage: '',
      newPwd: '',
      newPwdError: false,
      newPwdErrorMessage: '',
      confirmPwd: '',
      confirmPwdError: false,
      confirmPwdErrorMessage: ''
    };
  }
  onChangeOldPwd = e => {
    const { target: { value } } = e;
    const checkError = isBlank(value);
    this.setState({
      oldPwd: value,
      oldPwdError: checkError.error,
      oldPwdErrorMessage: checkError ? "Old Password can't be blank" : ''
    });
  };
  onChangeNewPwd = e => {
    const { target: { value } } = e;
    const checkError = isBlank(value);
    this.setState({
      newPwd: value,
      newPwdError: checkError.error,
      newPwdErrorMessage: checkError ? "New Password can't be blank" : ''
    });
  };
  onChangeConfirmPwd = e => {
    const { target: { value } } = e;
    const checkError = isBlank(value);
    this.setState({
      confirmPwd: value,
      confirmPwdError: checkError,
      confirmPwdErrorMessage: checkError ? "Confirm Password can't be blank" : ''
    });
  };
  onSubmitUpdatePassword = e => {
    e.preventDefault();
    const { oldPwd, confirmPwd, newPwd } = this.state;
    const checkOldPwd = isBlank(oldPwd);
    const checkNewPwd = isBlank(newPwd);
    const checkConfirmPwd = isBlank(confirmPwd);
    if (checkOldPwd || checkConfirmPwd || checkNewPwd) {
      return this.setState({
        oldPwdError: checkOldPwd,
        oldPwdErrorMessage: checkOldPwd ? "Old Password can't be blank" : '',
        newPwdError: checkNewPwd,
        newPwdErrorMessage: checkNewPwd ? "New Password can't be blank" : '',
        confirmPwdError: checkConfirmPwd,
        confirmPwdErrorMessage: checkConfirmPwd ? "Confirm Password can't be blank" : ''
      });
    }
    // console.log(this.state);
  };
  render() {
    const styles = require('../ProfileForm/index.scss');

    const {
      oldPwd,
      newPwd,
      confirmPwd,
      oldPwdError,
      oldPwdErrorMessage,
      newPwdError,
      newPwdErrorMessage,
      confirmPwdError,
      confirmPwdErrorMessage
    } = this.state;
    return (
      <div className={styles.formContainer}>
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <Row display="block" mr="0" ml="0">
            <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="300">
              Update Password
            </Heading>
          </Row>
        </Section>
        <div className={styles.formWrapper}>
          <Section p="0.5rem" mb="0">
            <Row display="block" mr="0" ml="0">
              <Div>
                <UpdatePasswordFormContainer
                  oldPwd={oldPwd}
                  onChangeOldPwd={this.onChangeOldPwd}
                  oldPwdFeedBackError={oldPwdError}
                  oldPwdFeedBackMessage={oldPwdErrorMessage}
                  newPwd={newPwd}
                  onChangeNewPwd={this.onChangeNewPwd}
                  newPwdFeedBackError={newPwdError}
                  newPwdFeedBackMessage={newPwdErrorMessage}
                  confirmPwd={confirmPwd}
                  onChangeconfirmPwd={this.onChangeConfirmPwd}
                  confirmPwdFeedBackError={confirmPwdError}
                  confirmPwdFeedBackMessage={confirmPwdErrorMessage}
                  onSubmitUpdatePassword={this.onSubmitUpdatePassword}
                />
              </Div>
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}
