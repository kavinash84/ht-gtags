import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResponsiveModal from 'components/Modal';
import FormInput from './FormInput';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { withRouter } from 'react-router';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from 'helpers/apiUrls';
import { sendData, getData } from 'redux/modules/services';
import {
  validateMobile,
  validateEmail,
  isEmpty,
  pincode as validatePincode,
  validateFullname,
  checkSpecialChar
} from 'utils/validation';

import moment from 'moment';

const startTime = date =>
  date
    .startOf('hour')
    .add(1, 'h')
    .format('HH');

const getTimeSlots = (start, end) => {
  const list = [];
  start = start < 12 ? 12 : start;
  for (let i = start; i <= end; i++) {
    list.push(String(i));
  }
  return list;
};

const setDataPicker = (currentTime = '', notMin) => {
  let options = {};

  // const datePicker = document.getElementById('preferredDate');

  // const slotTimeLimit = moment('20:00', 'HH:mm');

  // if (currentTime.isAfter(slotTimeLimit) && notMin) {
  //   options = {
  //     min: moment()
  //       .add(1, 'd')
  //       .format('YYYY-MM-DD'),
  //     value: moment()
  //       .add(1, 'd')
  //       .format('YYYY-MM-DD'),
  //     timeSlots: getTimeSlots(12, 20)
  //   };
  // } else if (currentTime.isAfter(slotTimeLimit) && !notMin) {
  //   options = {
  //     min: moment().format('YYYY-MM-DD'),
  //     value: moment()
  //       .add(1, 'd')
  //       .format('YYYY-MM-DD'),
  //     timeSlots: getTimeSlots(12, 20)
  //   };
  // } else {
  //   options = {
  //     min: moment().format('YYYY-MM-DD'),
  //     value: moment().format('YYYY-MM-DD'),
  //     timeSlots: getTimeSlots(startTime(currentTime.add(1, 'h')), 20)
  //   };
  // }

  // Object.keys(options).forEach(key => {
  //   datePicker.setAttribute(key, options[key]);
  // });
  return options;
};

const setPreferredTime = ({ timeSlots }) => {
  // const prefferedTime = document.getElementById('preferredTime');
  // prefferedTime.innerHTML = `<option value="" disabled selected>Preferred Timeline*</option>`;
  // prefferedTime.insertAdjacentHTML(
  //   'beforeend',
  //   timeSlots.map(arr => {
  //     if (arr > 12) {
  //       return `<option value="${arr - 12} pm">${arr - 12} pm</option>`;
  //     } else {
  //       return `<option value="${arr} pm">${arr} pm</option>`;
  //     }
  //   })
  // );
};

const setDate = () => {
  // const datePicker = document.getElementById('preferredDate');
  // let datePickerOptions = {};
  // if (datePicker) {
  //   datePickerOptions = setDataPicker(moment(), true);
  //   setPreferredTime(datePickerOptions);
  // }
};
@withRouter

@connect(
  ({ services, designbuild }) => ({
    prefferedTime: designbuild.data.items.text.prefferedTime,
    state: designbuild.data.items.text.state,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class ModularKitchen extends Component {
  state = {
    name: '',
    nameErrorMessage: 'Enter Valid Full Name',
    phone: '',
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    email: '',
    emailErrorMessage: 'Please Enter Valid Email ',
    address: '',
    addressErrorMessage: 'Address Should Not Be Left Blank ',
    pincode: '',
    pincodeErrorMessage: 'Pincode is Invalid',
    city: '',
    cityErrorMessage: 'Please Enter The City Name',
    state: this.props.state,
    selectedState: '',
    stateError: false,
    stateErrorMessage: 'Please Select A State',
    date: '',
    dateError: '',
    dateErrorMessage: 'Enter Valid Date',
    open: false,
    prefferedTime: '',
    time: '',
    timeError: '',
    timeErrorMessage: 'Please Select A Time'
  };

  componentDidMount() {
    setDate();
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.loaded && nextprops.loaded !== this.props.loaded) {
      this.setState({
        // open: true,
        name: '',
        phone: '',
        email: '',
        address: '',
        pincode: '',
        city: '',
        selectedState: '',
        date: ''
      });
    }
  }

  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      name: value,
      nameError: checkError
    });
  };
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeAddress = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      address: value,
      addressError: checkError
    });
  };
  onChangePincode = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePincode(value);
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      // Dispatch the load state and city api
      return;
    }
    if (value.length === 6) {
      const { loadPincodeDetails } = this.props;
      loadPincodeDetails(`${PINCODE_API}/details/${value}`, 'modularkitchen');
    }
    this.setState({
      pincode: value,
      pincodeError: checkError
    });
  };
  onChangeCity = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      city: value,
      cityError: checkError
    });
  };
  onChangeState = e => {
    const {
      target: { value }
    } = e;
    const checkError = !value;
    this.setState({
      selectedState: value,
      stateError: checkError
    });
  };
  onInputDateChange = e => {
    e.preventDefault();
    let { value } = e.target;
    let datePickerOptions = {};
    const selectedDate = value.split('-');
    const today = new Date();
    const selectedValue = new Date(selectedDate[0], selectedDate[1] - 1, selectedDate[2]);
    const checkError = !value;
    if (selectedValue) {
      this.setState({
        date: value,
        dateError: checkError
      });
    }
    value = moment(value, 'YYYY-MM-DD').isBefore() ? moment() : moment(value, 'YYYY-MM-DD');
    datePickerOptions = setDataPicker(value, false);
    setPreferredTime(datePickerOptions);
  };
  onChangeTime = e => {
    const {
      target: { value }
    } = e;
    const checkError = !value;
    this.setState({
      prefferedTime: value,
      timeError: checkError
    });
  };
  onChangeService = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      service: value
    });
  };
  onSubmitForm = e => {
    e.preventDefault();

    let source = 'Website';
    let campaign = 'Website';
    let medium = 'Website';

    const { sendFormData } = this.props;
    const { name, phone, email, pincode, address, city, state, date, selectedState, time, prefferedTime } = this.state;
    const nameError = isEmpty(name) || validateFullname(name) || checkSpecialChar(name);
    const phoneError = !validateMobile(phone);
    const stateCheck = !selectedState;
    const emailError = !validateEmail(email);
    const pincodeError = !validatePincode(pincode) || isEmpty(pincode);
    const cityError = isEmpty(city);
    const stateError = !selectedState;
    const dateError = isEmpty(date);
    const checkDate = !date;
    const checkTime = !prefferedTime;
    if (nameError || phoneError || emailError || cityError || stateError) {
      this.setState({
        nameError,
        phoneError,
        emailError,
        // pincodeError,
        cityError,
        stateError,
        dateError,
        // stateError: stateCheck,
        // dateError: checkDate,
        timeError: checkTime
      });
      return;
    }
    const leadURL = window ? window.location.href : '';
    if (leadURL) {
      const urlString = new URL(leadURL);
      const utmSource = urlString.searchParams.get('utm_source');
      const utmCampaign = urlString.searchParams.get('utm_campaign');
      const utmMedium = urlString.searchParams.get('utm_medium');
      source = utmSource ? utmSource : source;
      campaign = utmCampaign ? utmCampaign : campaign;
      medium = utmMedium ? utmMedium : medium;
    }
    const data = {
      campaign,
      name,
      email,
      address,
      pincode,
      city,
      state: selectedState,
      // date,
      // time: prefferedTime,
      mobile: phone,
      medium,
      service: 2,
      source,
      // mkLead: 'Online consultaion',
      devicePlatform: 'msite'
    };
    // this.setState({
    //   open: true
    // });
    sendFormData(SERVICE_SIGNUPS, data, 'modularkitchen');
    const { history } = this.props;
    history.push('/thankyou-db');
  };

  handleBookNow = () => {
    let pageoffset = window.pageYOffset;
    const scroller = pset =>
      new Promise(resolve => {
        window.setTimeout(() => {
          window.scroll(0, pset);
          resolve();
        }, 2);
      });
    const speed = 12;
    (async () => {
      while (pageoffset > 0) {
        pageoffset -= speed ** 2;
        /* eslint-disable no-await-in-loop */
        await scroller(pageoffset);
      }
    })();
  };
  // handleModal = () => {
  //   this.setState({
  //     open: !this.state.open
  //   });
  // };
  render() {
    // const { loading, loaded, modularkitchen } = this.props;
    const { name, email, phone, address, pincode, service, city, state, date, selectedState, time } = this.state;
    // const correctIcon = require('../../../static/correct.svg');
    const {
      nameError,
      nameErrorMessage,
      addressError,
      addressErrorMessage,
      pincodeError,
      pincodeErrorMessage,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      serviceError,
      serviceErrorMessage,
      cityError,
      cityErrorMessage,
      stateError,
      stateErrorMessage,
      dateError,
      dateErrorMessage,
      timeError,
      timeErrorMessage
    } = this.state;
    return (
      <div>
        <Div style={{ backgroundColor: '#FBF2ED' }}>

          <Div>
            <Heading color="#000000" fontSize="24px" fontFamily="medium" style={{ textAlign: 'center', lineHeight: '30px', marginTop: '100px', marginBottom: '30px' }}>
              Speak To Our Interior <br /> Experts
            </Heading>
          </Div>

          <Div>
            <form onSubmit={this.onSubmitForm}>

              <Div>
                <FormInput
                  label=""
                  type="text"
                  placeholder="Name"
                  onChange={this.onChangeName}
                  value={name}
                  feedBackError={nameError}
                  feedBackMessage={nameErrorMessage}

                />
              </Div>
              <Div>
                <FormInput
                  label=""
                  type="text"
                  placeholder="Mobile No."
                  onChange={this.onChangePhone}
                  value={phone}
                  feedBackError={phoneError}
                  feedBackMessage={phoneErrorMessage}
                />
              </Div>
              <Div>
                <FormInput
                  label=""
                  type="email"
                  placeholder="Email ID"
                  onChange={this.onChangeEmail}
                  value={email}
                  feedBackError={emailError}
                  feedBackMessage={emailErrorMessage}
                />
              </Div>
              <Div>
                <FormInput
                  label=""
                  type="text"
                  placeholder="City"
                  onChange={this.onChangeCity}
                  value={city}
                  feedBackError={cityError}
                  feedBackMessage={cityErrorMessage}
                />
              </Div>


              <Div>
                <div className="select-wrapper">
                  <div
                    style={{
                      width: '60%',
                      marginLeft: '20%',
                      borderRadius: '5px',
                      height: '50px',
                      border: '1px solid #E3E3E3',
                      padding: '0px 8px',
                      fontSize: '14px',
                      color: '#7E7575',
                      marginBottom: '10px',
                      marginTop: '0.625rem',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                  >
                    <select
                      onChange={this.onChangeState}
                      placeholder="State"
                      style={{
                        width: '100%',
                        height: '47px',
                        border: 'none',
                        fontSize: '14px',
                        color: '#7E7575',
                        marginBottom: '10px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="State/Region" disabled selected>
                        State/Region
                      </option>
                      {state.map(val => (
                        <option key={val.id} value={val.option}>
                          {val.option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {stateError ? (
                  <Text color="#dc3545" fontSize="14px" mt="0px" style={{ marginLeft: '20%' }}>
                    {stateErrorMessage}
                  </Text>
                ) : null}
              </Div>
              {/* <Div col="12" pr="0.625rem" pl="0.625rem">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label
                      style={{
                        marginRight: '5px',
                        marginBottom: '10px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        border: '1px solid rgb(227, 227, 227)',
                        padding: '0px 8px',
                        fontSize: '14px',
                        color: 'rgb(126, 117, 117)'
                      }}
                    >
                      Date*
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      value={date}
                      onChange={this.onInputDateChange}
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        padding: '0px 8px',
                        fontSize: '14px',
                        color: '#7E7575',
                        marginBottom: '10px',
                        outline: 'none',
                        backgroundColor: 'white',
                        border: '1px solid #E3E3E3',
                        flexGrow: '1'
                      }}
                    />
                  </div>
                  {dateError ? (
                    <Text color="#dc3545" fontSize="13px" mt="0px">
                      {dateErrorMessage}
                    </Text>
                  ) : null}
                </Div> */}
              {/* <Div col="12" pr="0.625rem" pl="0.625rem">
                  <div className="select-wrapper">
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '5px',
                        height: '50px',
                        borderColor: '#E3E3E3',
                        padding: '0px 8px',
                        fontSize: '14px',
                        color: '#7E7575',
                        marginBottom: '10px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                    >
                      <select
                        id="preferredTime"
                        onChange={this.onChangeTime}
                        style={{
                          width: '100%',
                          height: '50px',
                          border: 'none',
                          fontSize: '14px',
                          color: '#7E7575',
                          marginBottom: '10px',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      ></select>
                    </div>
                  </div>
                  {timeError ? (
                    <Text fontSize="13px" color="#dc3545" mt="0px">
                      {timeErrorMessage}
                    </Text>
                  ) : null}
                </Div> */}
              <Div col="12" style={{ display: 'flex' }} pr="0.625rem" pl="0.625rem">
                <Button
                  mt="20px"
                  style={{
                    border: '1px solid #F47020',
                    color: '#F47020',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '5px',
                    textTransform: 'none'
                  }}
                  fontFamily="regular"
                  height="50px"
                  m="40px auto 0"
                  pl="5%"
                  pr="5%"
                >
                  Book a Consultation
                </Button>
              </Div>
            </form>
          </Div>
        </Div>
        {/* {!loading && loaded ? (
          <ResponsiveModal
            classNames={{ modal: 'mkModal' }}
            onCloseModal={() => this.setState({ open: false })}
            open={this.state.open}
          >
            <Div
              mt="50px"
              p="50px 15%"
              style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
            >
              <Heading ta="center" fontSize="22px" mb="50px" mt="10px" color="#000000" style={{ whiteSpace: 'normal' }}>
                Thank you for your Interest, Our Team will get in touch with you Shortly
              </Heading>
              <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
            </Div>
          </ResponsiveModal>
        ) : null} */}
      </div>
    );
  }
}

ModularKitchen.defaultProps = {
  loading: false,
  loaded: false,
  data: {},
  loadPincodeDetails: () => { },
  sendFormData: () => { }
};
ModularKitchen.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadPincodeDetails: PropTypes.func,
  data: PropTypes.object,
  sendFormData: PropTypes.func
};
