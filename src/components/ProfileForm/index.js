import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validateEmail, isBlank } from 'js-utility-functions';
import moment from 'moment';
/**
 * Components
 */
import ProfileFormContainer from 'hometown-components-dev/lib/FormsHtV1/ProfileFormHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

/**
 * modules / utils
 */
import { validateMobile, checkSpecialChar, validateDob } from 'utils/validation';
import { updateUserProfile } from 'redux/modules/profile';
import {
  // allowNChar,
  // allowTypeOf,
  isGSTNumber
} from 'utils/helper';

import DatePicker from 'components/Form/DatePicker';

const showDateField = (dob, onChange) => (
  <DatePicker
    selected={dob}
    onChange={onChange}
    maxDate={new Date()}
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
);

const ProfileViewRow = ({ title, value }) => (
  <Row mb={20}>
    <Col variant="col-3">
      <Label fontFamily="light">{title}</Label>
    </Col>
    <Col variant="col-7">
      <Label>{value}</Label>
    </Col>
  </Row>
);

ProfileViewRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

@connect(({ profile }) => ({
  profile: profile.data,
  response: profile
}))
export default class ProfileForm extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      contact_number: PropTypes.string,
      customer_city: PropTypes.string,
      email: PropTypes.string,
      full_name: PropTypes.string,
      gst: PropTypes.string,
      dob: PropTypes.string,
      city: PropTypes.string,
      gender: PropTypes.string,
      birthday: PropTypes.string,
      today: PropTypes.string
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
    gstErrorMessage: 'Enter a valid GST Number',
    dob: '',
    today: '',
    dobError: false,
    dobErrorMessage: 'Invalid date of birth',
    gender: 'male',
    genderError: false,
    genderErrorMessage: 'Enter a valid Gender',
    city: '',
    cityError: false,
    cityErrorMessage: 'Enter a valid City',
    showEditForm: false
  };

  componentWillMount() {
    const {
      profile: {
 full_name: fullName, email, contact_number: phone, city, gst, dob, gender
}
    } = this.props;
    const dob1 = dob === 'Invalid date' ? '' : new Date(moment(dob, 'DD-MM-YYYY').toString());
    this.setState({
      fullName: (fullName && fullName.trim()) || '',
      email,
      phone: phone || '',
      gst,
      dob: dob1 || '',
      city,
      gender
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
  onChangeGender = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      gender: value
    });
  };
  onChangeCity = e => {
    const {
      target: { value }
    } = e;
    const checkError = checkSpecialChar(value);
    this.setState({
      city: value,
      cityError: checkError,
      cityErrorMessage: 'Numbers and special characters are not allowed !'
    });
  };
  onChangeDob = value => {
    const checkError = value && validateDob(value);
    this.setState({
      dob: value,
      dobError: checkError
    });
  };
  onSubmitProfile = e => {
    e.preventDefault();
    const {
 email, fullName, phone, gst, dob
} = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const phoneError = !validateMobile(phone);
    const checkFullName = isBlank(fullName) || checkSpecialChar(fullName);
    const isGSTError = !isGSTNumber(gst);
    const checkDob = validateDob(dob);
    if (checkEmail.error || checkFullName || phoneError || checkDob) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        fullNameError: checkFullName,
        fullNameErrorMessage: checkSpecialChar(fullName)
          ? 'Numbers and special characters are not allowed !'
          : 'Name Cannot be Left Empty !',
        phoneError,
        gstError: isGSTError,
        gstErrorMessage: 'Please enter a valid GST number !',
        dobError: checkDob
      });
    }
    const { dispatch } = this.context.store;
    // console.log(dob, 'Dob on submit%%%%%%');
    dispatch(updateUserProfile(this.state));
  };
  convertDateYyyy = date => {
    let newdate = '';
    if (date !== '' || date !== 'undefined' || date !== 'Invalid date') {
      // newdate = date.split('-');
      // if (newdate[0].length === 4) {
      //   newdate = newdate.reverse().join('-');
      // } else {
      //   newdate = date;
      // }
      const dt = new Date(date);
      const mnth = `0${dt.getMonth() + 1}`.slice(-2);
      const day = `0${dt.getDate()}`.slice(-2);
      newdate = [date.getFullYear(), mnth, day].reverse().join('-');
    }
    return newdate;
  };
  convertDateDd = date => {
    let newdate = '';
    if (date !== '' || date !== 'undefined' || date !== 'Invalid date') {
      newdate = date.split('-');
      if (newdate[0].length === 2) {
        newdate = newdate.reverse().join('-');
      } else {
        newdate = date;
      }
    }
    return newdate;
  };
  render() {
    // const styles = require('./index.scss');
    const {
      email,
      phone,
      fullName,
      gst,
      dob,
      gender,
      city,
      gstError,
      gstErrorMessage,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      fullNameError,
      fullNameErrorMessage,
      dobError,
      dobErrorMessage,
      genderError,
      genderErrorMessage,
      cityError,
      cityErrorMessage,
      showEditForm
    } = this.state;
    const { response } = this.props;
    // console.log(dob, 'dob');
    return (
      <Box>
        <Box>
          <Heading
            fontSize={20}
            color="textDark"
            pb={16}
            mb={30}
            sx={{
              borderBottom: 'divider'
            }}
          >
            Profile Details
          </Heading>
          <Box>
            <ProfileViewRow title="Full Name" value={fullName} />
            <ProfileViewRow title="E-mail-ID" value={email} />
            <ProfileViewRow title="Phone" value={phone} />
            <ProfileViewRow title="Gender" value={gender} />
            <ProfileViewRow title="Date of Birth" value={this.convertDateYyyy(dob)} />
            <ProfileViewRow title="Location" value={city} />
          </Box>
        </Box>
        <Box pt={50} pb={20}>
          <Button variant="outline.primary" width={180} onClick={() => this.setState({ showEditForm: !showEditForm })}>
            Edit
          </Button>
        </Box>
        {showEditForm ? (
          <Box>
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
              // dob={this.convertDateDd(dob)}
              dob={dob}
              dobFeedBackError={dobError}
              dobFeedBackMessage={dobErrorMessage}
              gender={gender}
              genderFeedBackError={genderError}
              genderFeedBackMessage={genderErrorMessage}
              city={city}
              cityFeedBackError={cityError}
              cityFeedBackMessage={cityErrorMessage}
              onChangeGender={this.onChangeGender}
              onChangeCity={this.onChangeCity}
              onChangeDob={this.onChangeDob}
              onCancelSubmit={() => this.setState({ showEditForm: !showEditForm })}
              onSubmitProfile={this.onSubmitProfile}
              response={response}
              date={showDateField(dob, this.onChangeDob)}
            />
          </Box>
        ) : null}
      </Box>
    );
  }
}
