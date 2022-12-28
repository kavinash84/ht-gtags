/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { notifSend } from 'redux/modules/notifs';
import { submitOffer } from 'redux/modules/landing';
import { addToSelectForDemo } from 'redux/modules/selectForDemo';
import { connect } from 'react-redux';

import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';

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

const multiselectCategory = () => {
  window.onmousedown = e => {
    const el = e.target;
    if (el.tagName.toLowerCase() === 'option' && el.parentNode.hasAttribute('multiple')) {
      e.preventDefault();

      // toggle selection
      if (el.hasAttribute('selected')) el.removeAttribute('selected');
      else el.setAttribute('selected', '');

      // hack to correct buggy behavior
      const select = el.parentNode.cloneNode(true);
      el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
  };
};

const setProductCategory = (landing, selectForDemo) => {
  const {
    cateData: { skuCategories = {} }
  } = landing;
  const category = document.getElementById('mobile-productCategory');
  const categorySection = document.getElementsByClassName('pc-section');

  if (skuCategories && category) {
    const categoryOption = skuCategories.map(
      ({ category_id: categoryId, category_name: categoryName }) =>
        `<option value='${JSON.stringify({ categoryId, categoryName })}'>${categoryName}</option>`
    );
    categoryOption.unshift('<option selected disabled>Please select</option>');
    category.innerHTML = categoryOption;

    // if (selectForDemo.length !== 0) {
    //   category.style.display = 'none';
    //   category.required = false;
    //   categorySection[0].style.display = 'none';
    // }

    category.addEventListener('input', event => {
      event.preventDefault();
      const selected = [...category.options].filter(arr => arr.selected).length;
      if (selected) category.options[0].selected = false;
      else category.options[0].selected = true;
    });

    multiselectCategory();
  }
};

const getCityFromSelectedState = (mapData, selectedState) => {
  let cityList = mapData.filter(item => item.state === selectedState).map(item => item.city);

  cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
  return cityList.map(item => `<option value="${item}">${item}</option>`);
};

const setStateAndCity = stores => {
  const { items: { text } = {} } = stores;
  const state = document.getElementById('mobile-homeState');
  const city = document.getElementById('mobile-homeCity');

  if (text && state) {
    let states = text.map(item => item.state);
    states = states.filter((item, pos) => states.indexOf(item) === pos);
    const stateOptions = states.map(arr => `<option value="${arr}">${arr}</option>`);

    state.innerHTML = stateOptions;
    state.selectedIndex = 0;
  }

  if (text && city) {
    city.selectedIndex = 0;
    let selectedState = state.value;
    let cityOptions = getCityFromSelectedState(text, selectedState);
    city.innerHTML = cityOptions;

    state.addEventListener('change', event => {
      event.preventDefault();
      selectedState = event.target.value;
      cityOptions = getCityFromSelectedState(text, selectedState);
      city.innerHTML = cityOptions;
    });
  }
};

const prefillLoginDetails = (profileData, isLoggedIn) => {
  if (isLoggedIn === true) {
    const { contact_number: mobile, email, first_name: firstName, last_name: lastName } = profileData;
    document.getElementById('mobile-firstName').value = firstName;
    document.getElementById('mobile-lastName').value = lastName;
    document.getElementById('mobile-mobileNo').value = mobile;
    document.getElementById('mobile-emailId').value = email;
  }
};

const resetForm = (form, isLoggedIn, profileData) => {
  const inputEle = document.querySelectorAll('select');
  form.reset();
  inputEle.forEach(arr => {
    if (arr.hasAttribute('multiple')) {
      [...arr.options].forEach(opts => {
        opts.selected = false;
      });
    }
  });

  prefillLoginDetails(profileData, isLoggedIn);
};

const setDataPicker = (currentTime = '') => {
  let options = {};

  const datePicker = document.getElementById('mobile-preferredDate');

  const slotTimeLimit = moment('14:00', 'HH:mm');

  if (currentTime.isAfter(slotTimeLimit)) {
    options = {
      min: moment()
        .add(1, 'd')
        .format('YYYY-MM-DD'),
      value: moment()
        .add(1, 'd')
        .format('YYYY-MM-DD'),
      timeSlots: getTimeSlots(12, 15)
    };
  } else {
    options = {
      min: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM-DD'),
      timeSlots: getTimeSlots(startTime(currentTime.add(1, 'h')), 15)
    };
  }

  Object.keys(options).forEach(key => {
    datePicker.setAttribute(key, options[key]);
  });
  return options;
};

const setPreferredTime = ({ timeSlots }) => {
  const prefferedTime = document.getElementById('mobile-preferredTime');

  prefferedTime.innerHTML = timeSlots.map(arr => `<option value=${arr}:00:00>${arr}:00</option>`);
};

const onInputDateChange = e => {
  e.preventDefault();
  let { value } = e.target;
  let datePickerOptions = {};
  // let { target: value } = e;
  value = moment(value, 'YYYY-MM-DD').isBefore() ? moment() : moment(value, 'YYYY-MM-DD');
  datePickerOptions = setDataPicker(value);
  setPreferredTime(datePickerOptions);
};

const setDate = () => {
  const datePicker = document.getElementById('mobile-preferredDate');

  let datePickerOptions = {};
  if (datePicker) {
    datePicker.addEventListener('change', onInputDateChange);
    datePickerOptions = setDataPicker(moment());
    setPreferredTime(datePickerOptions);
  }
};

const convertArrayToObj = arr => arr.reduce((obj, item) => ({ ...obj, [item.categoryId]: item.categoryName }), {});

const getSelectTagValue = ({ options }) => {
  let category = [];
  category = Array.from(options, ele => (ele.selected && !ele.disabled ? JSON.parse(ele.value) : '')).filter(
    arr => arr !== ''
  );
  return category.length > 0 ? convertArrayToObj(category) : category;
};

const getAllFormElements = ({ elements }, mandatoryFeilds) =>
  Array.from(elements, e => ({
    ele: e.tagName,
    value: e.name === 'productCategory' ? getSelectTagValue(e) : e.value,
    name: e.name,
    mandatory: mandatoryFeilds.some(arr => arr === e.name),
    type: e.type
  }));

const validatePrefferedTime = formData => {
  const preferredTime = formData.filter(arr => arr.name === 'preferredTime')[0];
  const preferredDate = formData.filter(arr => arr.name === 'preferredDate')[0];

  if (preferredTime && preferredDate) {
    const { value: time } = preferredTime;
    const { value: date } = preferredDate;

    const selectedDateSlot = moment(date, 'YYYY-MM-DD');
    const selectedTimeSlot = moment(time, 'HH:mm:ss');

    const isToday = selectedTimeSlot.isSameOrBefore(selectedDateSlot);
    const currentTime = moment()
      .startOf('hour')
      .add(2, 'hours');

    if (isToday) return false;

    if (selectedTimeSlot.isBefore(currentTime)) {
      setDate();
      return true;
    }
    return false;
  }
};
// eslint-disable-next-line max-len
const validateInputs = formData => {
  const checkPreferredTime = validatePrefferedTime(formData);
  const checkMandatoryInputs = formData
    .filter(arr => arr.mandatory)
    .some(arr => arr.value === '' || arr.value.length === 0);

  if (checkPreferredTime) return { error: true, message: 'Please select a different time slot' };
  else if (checkMandatoryInputs) return { error: true, message: 'Please Fill All Details Correctly !' };

  return { error: false, message: '' };
};

// const moveToFormListner = () => {
//   const link = document.getElementById('mobile-moveToForm');
//   if (link) {
//     link.addEventListener('click', event => {
//       event.preventDefault();
//       const form = document.querySelector('.form-container').offsetTop - 50;
//       window.scroll({ top: form, behavior: 'smooth' });
//     });
//   }
// };

// const getKeyName =  name =>
@connect(({ landing, landing: { data, submitErrorMessage }, storelocator, selectForDemo, userLogin, profile }) => ({
  landing,
  data,
  submitErrorMessage,
  stores: storelocator.data,
  selectForDemo: selectForDemo.data,
  loginDetails: userLogin,
  profileData: profile.data
}))
class DemoForm extends Component {
  static propTypes = {
    landing: PropTypes.object.isRequired,
    stores: PropTypes.object.isRequired,
    selectForDemo: PropTypes.array.isRequired,
    loginDetails: PropTypes.object.isRequired,
    profileData: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: {},
      submitErrorMessage: ''
    };
  }

  componentDidMount() {
    const {
      landing,
      stores,
      selectForDemo,
      loginDetails: { isLoggedIn },
      profileData
    } = this.props;

    prefillLoginDetails(profileData, isLoggedIn);

    setProductCategory(landing, selectForDemo);

    setStateAndCity(stores);

    setDate();

    // moveToFormListner();

    this.formEventListener(isLoggedIn, profileData, stores);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const update = {};
    if (nextProps.loginDetails !== prevState.loginDetails) {
      const { loginDetails: { isLoggedIn } = false } = nextProps;
      // return { isLoggedIn };
      update.isLoggedIn = isLoggedIn;
    }
    if (nextProps.submitErrorMessage !== prevState.submitErrorMessage) {
      const { submitErrorMessage } = nextProps;

      // return { submitErrorMessage };
      update.submitErrorMessage = submitErrorMessage;
    }
    return Object.keys(update).length ? update : null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.context.store;
    const { isLoggedIn, submitErrorMessage } = this.state;
    const { profileData, stores } = this.props;
    const state = [];
    const form = document.querySelector('form');

    if (prevState.submitErrorMessage !== submitErrorMessage && submitErrorMessage === '') {
      resetForm(form, isLoggedIn, profileData);
      setStateAndCity(stores);
      dispatch(addToSelectForDemo(state));
    }
    if (prevState.isLoggedIn !== isLoggedIn) {
      resetForm(form, isLoggedIn, profileData);
      setStateAndCity(stores);
      dispatch(addToSelectForDemo(state));
    }
  }

  getProductDataSet = selectForDemo =>
    selectForDemo.reduce((obj, item) => ({ ...obj, [item.productId]: item.simpleSku }), {});

  getFileUpload = () => {
    const imageFile = document.getElementById('uploadImage');
    if (imageFile) return imageFile.files[0];
    return '';
  };
  formEventListener = () => {
    const { dispatch } = this.context.store;
    const {
      landing: { data: { id: postId, key: postOffer, items: { cms_json: cms } = {} } = {} },
      selectForDemo
    } = this.props;
    if (cms && postOffer) {
      const { api, data: requiredFeilds, successMessage } = JSON.parse(cms);
      const form = document.querySelector('.mobile_form');
      form.addEventListener('submit', event => {
        event.preventDefault();
        let formData = getAllFormElements(form, requiredFeilds);

        let products = {};
        const uploadImage = this.getFileUpload();

        if (selectForDemo.length > 0) {
          // eslint-disable-next-line max-len
          formData = formData.map(arr => (arr.name !== 'productCategory' ? arr : { ...arr, mandatory: false }));
          products = this.getProductDataSet(selectForDemo);
        }

        const validate = validateInputs(formData);

        const mandatoryInputs = formData.filter(arr => {
          let status = true;
          if (arr.ele === 'BUTTON') status = false;
          else if (arr.type === 'file') status = false;
          return status;
        });
        if (!validate.error) {
          const bodyFormData = new FormData();
          const postData = {
            id: postId || 0,
            offer: postOffer,
            data: Object.assign({}, ...mandatoryInputs.map(item => ({ [item.name]: item.value }))),
            products,
            uploadImage
          };

          bodyFormData.append('id', postData.id);
          bodyFormData.append('offer', postData.offer);
          bodyFormData.append('data', JSON.stringify(postData.data));
          bodyFormData.append('products', JSON.stringify(postData.products));
          bodyFormData.append('uploadImage', postData.uploadImage);

          dispatch(submitOffer(api, bodyFormData, successMessage));
        } else {
          dispatch(
            notifSend({
              type: 'warning',
              msg: validate.message,
              dismissAfter: 4000
            })
          );
        }
        setTimeout(() => {
          const { handleModal } = this.props;
          handleModal();
        }, 2000);
      });
    }
  };

  // handleOnsubmit = () => {
  //   const { dispatch } = this.context.store;
  //   const {
  //     landing: { data: { id: postId, key: postOffer, items: { cms_json: cms } = {} } = {} },
  //     selectForDemo
  //   } = this.props;
  //   if (cms && postOffer) {
  //     const { api, data: requiredFeilds, successMessage } = JSON.parse(cms);
  //     const form = document.querySelector('.mobile_form');
  //     // form.addEventListener('submit', event => {
  //     // event.preventDefault();
  //     let formData = getAllFormElements(form, requiredFeilds);

  //     let products = {};
  //     const uploadImage = this.getFileUpload();

  //     if (selectForDemo.length > 0) {
  //       // eslint-disable-next-line max-len
  //       formData = formData.map(arr => (arr.name !== 'productCategory' ? arr : { ...arr, mandatory: false }));
  //       products = this.getProductDataSet(selectForDemo);
  //     }

  //     const validate = validateInputs(formData);

  //     const mandatoryInputs = formData.filter(arr => {
  //       let status = true;
  //       if (arr.ele === 'BUTTON') status = false;
  //       else if (arr.type === 'file') status = false;
  //       return status;
  //     });
  //     if (!validate.error) {
  //       const bodyFormData = new FormData();
  //       const postData = {
  //         id: postId || 0,
  //         offer: postOffer,
  //         data: Object.assign({}, ...mandatoryInputs.map(item => ({ [item.name]: item.value }))),
  //         products,
  //         uploadImage
  //       };

  //       bodyFormData.append('id', postData.id);
  //       bodyFormData.append('offer', postData.offer);
  //       bodyFormData.append('data', JSON.stringify(postData.data));
  //       bodyFormData.append('products', JSON.stringify(postData.products));
  //       bodyFormData.append('uploadImage', postData.uploadImage);

  //       dispatch(submitOffer(api, bodyFormData, successMessage));
  //     } else {
  //       dispatch(
  //         notifSend({
  //           type: 'warning',
  //           msg: validate.message,
  //           dismissAfter: 4000
  //         })
  //       );
  //     }
  //     // });
  //   }
  // };

  render() {
    const { landing } = this.props;
    const uiHtml = landing.data.items.text;
    return (
      <React.Fragment>
       <Div style={{width:'100%'}}>
       <Flex>
       <Img src="https://static.hometown.in/media/cms/designbuild/speaktoExperts.png" style={{width: '50%', height:'90vh'}}/>
       <Div style={{width:'50%', height:'90vh', backgroundColor: '#FFF8F4'}}>
       <div style={{ background: '#FFF8F4', padding: '10px 15px 0px', marginTop: '10px' }}>
          {landing !== null && (
            <Description itemProp="description" fontSize="0.875rem" dangerouslySetInnerHTML={{ __html: uiHtml }} />
          )}
        </div>
       </Div>
       </Flex>
       </Div>
       
      </React.Fragment>
    );
  }
}

export default DemoForm;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  ul {
    padding-left: 20px;
    li {
      font-size: 14px;
      margin-bottom: 5px;
      font-family: light;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;
