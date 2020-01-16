import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileFormContainer from 'hometown-components/lib/Forms/ProfileForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import { validateEmail, isBlank } from 'js-utility-functions';
import { validateMobile, checkSpecialChar } from 'utils/validation';
import { updateUserProfile } from 'redux/modules/profile';
import {
  // allowNChar,
  // allowTypeOf,
  isGSTNumber
} from 'utils/helper';

@connect(({ profile }) => ({
  profile: profile.data,
  response: profile
}))
export default class ProfileForm extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      contact_number: PropTypes.string,
      email: PropTypes.string,
      full_name: PropTypes.string,
      gst: PropTypes.string
    }),
    response: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    profile: {},
    response: {}
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
    fullName: '',
    fullNameError: false,
    fullNameErrorMessage: '',
    gst: '',
    gstError: false,
    gstErrorMessage: 'Enter a valid GST Number'
  };

  componentWillMount() {
    const {
      profile: {
 full_name: fullName, email, contact_number: phone, gst
}
    } = this.props;
    this.setState({
      fullName: (fullName && fullName.trim()) || '',
      email,
      phone: phone || '',
      gst
    });
  }
  // onChangePhone = e => {
  //   const {
  //     target: { value }
  //   } = e;
  //   const checkError = !validateMobile(value);
  //   if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
  //     return;
  //   }
  //   this.setState({
  //     phone: value,
  //     phoneError: checkError,
  //     phoneErrorMessage:
  //       value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
  //   });
  // };
  onChangeGST = e => {
    const {
      target: { value }
    } = e;
    const checkError = value && !isGSTNumber(value);
    this.setState({
      gst: value,
      gstError: checkError,
      gstErrorMessage: 'Invalid GST Number !'
    });
  };
  onChangeFullName = e => {
    const {
      target: { value }
    } = e;
    const checkError = isBlank(value) || checkSpecialChar(value);
    this.setState({
      fullName: value,
      fullNameError: checkError,
      fullNameErrorMessage: checkSpecialChar(value)
        ? 'Numbers and special characters are not allowed !'
        : 'Name Cannot be Left Empty !'
    });
  };
  onSubmitProfile = e => {
    e.preventDefault();
    const {
 email, fullName, phone, gst
} = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const phoneError = !validateMobile(phone);
    const checkFullName = isBlank(fullName) || checkSpecialChar(fullName);
    const isGSTError = !isGSTNumber(gst);
    if (checkEmail.error || checkFullName || phoneError) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        fullNameError: checkFullName,
        fullNameErrorMessage: checkSpecialChar(fullName)
          ? 'Numbers and special characters are not allowed !'
          : 'Name Cannot be Left Empty !',
        phoneError,
        gstError: isGSTError,
        gstErrorMessage: 'Please enter a valid GST number !'
      });
    }
    const { dispatch } = this.context.store;
    dispatch(updateUserProfile(this.state));
  };

  render() {
    const styles = require('./index.scss');
    const {
      email,
      phone,
      fullName,
      gst,
      gstError,
      gstErrorMessage,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      fullNameError,
      fullNameErrorMessage
    } = this.state;
    const { response } = this.props;
    return (
      <div className={styles.formContainer}>
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <Row display="block" mr="0" ml="0">
            <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
              Profile Information
            </Heading>
          </Row>
        </Section>
        <div className={styles.formWrapper}>
          <Section p="0.5rem" mb="0">
            <Row display="block" mr="0" ml="0">
              <Div>
                <ProfileFormContainer
                  email={email}
                  onChangeEmail={() => {}}
                  emailFeedBackError={emailError}
                  emailFeedBackMessage={emailErrorMessage}
                  gst={gst}
                  onChangeGST={this.onChangeGST}
                  gstFeedBackError={gstError}
                  gstFeedBackMessage={gstErrorMessage}
                  phone={phone}
                  onChangePhone={() => {}}
                  phoneFeedBackError={phoneError}
                  phoneFeedBackMessage={phoneErrorMessage}
                  fullName={fullName}
                  onChangeFullName={this.onChangeFullName}
                  fullNameFeedBackError={fullNameError}
                  fullNameFeedBackMessage={fullNameErrorMessage}
                  onSubmitProfile={this.onSubmitProfile}
                  response={response}
                />
              </Div>
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}
