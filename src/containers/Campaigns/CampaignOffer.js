/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuFooter from 'containers/MenuFooter';

import { notifSend } from 'redux/modules/notifs';
import { submitOffer } from 'redux/modules/landing';
import { connect } from 'react-redux';

import moment from 'moment';

const startTime = date =>
  date
    .startOf('hour')
    .add(1, 'h')
    .format('HH');

const getTimeSlots = (start, end) => {
  console.log('getTimeSlots function', start, end);
  const list = [];
  start = start < 12 ? 12 : start;
  for (let i = start; i <= end; i++) {
    list.push(String(i));
  }
  console.log('FInal list', list);
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
  const category = document.getElementById('productCategory');
  const categorySection = document.getElementsByClassName('pc-section');

  if (skuCategories && category) {
    const categoryOption = skuCategories.map(item => {
      const value = {
        categoryId: item.category_id,
        categoryName: item.category_name
      };
      return `<option value='${JSON.stringify(value)}'>
      ${item.category_name}</option>`;
    });
    category.innerHTML = categoryOption;

    if (selectForDemo.length !== 0) {
      category.style.display = 'none';
      categorySection[0].style.display = 'none';
    }

    multiselectCategory();
  }
};

const getCityFromSelectedState = (mapData, selectedState) => {
  let cityList = mapData.filter(item => item.state === selectedState).map(item => item.city);

  cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
  return cityList.map(item => `<option value="${item}">${item}</option>`);
};

const setStateAndCity = stores => {
  console.log('setStateAndCity function');
  const { items: { text } = {} } = stores;
  const state = document.getElementById('homeState');
  const city = document.getElementById('homeCity');

  if (text && state) {
    let states = text.map(item => item.state);
    states = states.filter((item, pos) => states.indexOf(item) === pos);
    console.log({ state });
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

const resetForm = form => {
  const inputEle = document.querySelectorAll('select');
  form.reset();
  inputEle.forEach(arr => {
    if (arr.hasAttribute('multiple')) {
      [...arr.options].forEach(opts => {
        opts.selected = false;
      });
    }
  });
};

const setDataPicker = (currentTime = '') => {
  let options = {};

  const datePicker = document.getElementById('preferredDate');

  const slotTimeLimit = moment('14:00', 'HH:mm');

  console.log('Current time is after 2pm', moment().isAfter(slotTimeLimit));
  if (currentTime.isAfter(slotTimeLimit)) {
    options = {
      min: moment()
        .add(1, 'd')
        .format('YYYY-MM-DD'),
      value: moment()
        .add(1, 'd')
        .format('YYYY-MM-DD'),
      timeSlots: getTimeSlots(12, 16)
    };
  } else {
    console.log('given hour', currentTime.format('HH:mm'));

    options = {
      min: moment().format('YYYY-MM-DD'),
      value: moment().format('YYYY-MM-DD'),
      timeSlots: getTimeSlots(startTime(currentTime.add(1, 'h')), 16)
    };
  }

  Object.keys(options).forEach(key => {
    datePicker.setAttribute(key, options[key]);
  });
  return options;
};

const setPreferredTime = ({ timeSlots }) => {
  console.log('setPreferredTime function');
  const prefferedTime = document.getElementById('preferredTime');

  prefferedTime.innerHTML = timeSlots.map(arr => `<option value=${arr}:00:00>${arr}:00</option>`);
};

const onInputDateChange = e => {
  e.preventDefault();
  let { value } = e.target;
  let datePickerOptions = {};
  // let { target: value } = e;
  console.log(value);
  value = moment(value, 'YYYY-MM-DD').isBefore() ? moment() : moment(value, 'YYYY-MM-DD');
  console.log(value.format('YYYY-MM-DD HH:mm'));
  datePickerOptions = setDataPicker(value);
  setPreferredTime(datePickerOptions);
};

const setDate = () => {
  const datePicker = document.getElementById('preferredDate');

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
  category = Array.from(options, ele => (ele.selected ? JSON.parse(ele.value) : '')).filter(arr => arr !== '');
  console.log('Selected inputs', category);
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

// eslint-disable-next-line max-len
const validateInputs = formData =>
  formData.filter(arr => arr.mandatory).some(arr => arr.value === '' || arr.value.length === 0);

// const getKeyName =  name =>
@connect(({
  landing, landing: { data }, storelocator, selectForDemo, userLogin, profile
}) => ({
  landing,
  data,
  stores: storelocator.data,
  selectForDemo: selectForDemo.data,
  loginDetails: userLogin,
  profileData: profile.data
}))
class Campaign extends Component {
  static propTypes = {
    landing: PropTypes.object.isRequired,
    stores: PropTypes.object.isRequired,
    selectForDemo: PropTypes.object.isRequired,
    loginDetails: PropTypes.object.isRequired,
    profileData: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      landing,
      stores,
      selectForDemo,
      loginDetails: { isLoggedIn },
      profileData
    } = this.props;

    if (isLoggedIn === true) {
      this.prefillLoginDetails(profileData);
    }

    setProductCategory(landing, selectForDemo);

    setStateAndCity(stores);

    setDate();

    this.formEventListener();
  }

  getProductDataSet = selectForDemo =>
    selectForDemo.reduce((obj, item) => ({ ...obj, [item.productId]: item.simpleSku }), {});

  getFileUpload = () => {
    const imageFile = document.getElementById('uploadImage');
    if (imageFile) return imageFile.files[0];
    return '';
  };
  formEventListener = () => {
    const { landing, selectForDemo } = this.props;
    const { dispatch } = this.context.store;
    const postApi = JSON.parse(landing.data.items.cms_json).api;
    const postId = landing.data.id;
    const postOffer = landing.data.key;

    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const requiredFeilds = JSON.parse(landing.data.items.cms_json).data;
      const formData = getAllFormElements(form, requiredFeilds);

      let mandatoryInputs = formData.filter(arr => {
        let status = true;
        if (arr.ele === 'BUTTON') status = false;
        else if (arr.type === 'file') status = false;
        return status;
      });

      let products = {};
      const uploadImage = this.getFileUpload();

      if (selectForDemo.length > 0) {
        // eslint-disable-next-line max-len
        mandatoryInputs = mandatoryInputs.map(arr =>
          arr.name !== 'productCategory' ? arr : { ...arr, mandatory: false });
        products = this.getProductDataSet(selectForDemo);
      }

      const isEmpty = validateInputs(mandatoryInputs);

      if (!isEmpty) {
        const bodyFormData = new FormData();
        const postData = {
          id: postId || 0,
          offer: postOffer,
          data: Object.assign({}, ...mandatoryInputs.map(item => ({ [item.name]: item.value }))),
          products,
          uploadImage
        };
        console.log({ postData });
        Object.keys(postData).forEach(key => {
          if (key === 'uploadImage') bodyFormData.append(key, uploadImage);
          else bodyFormData.append(key, JSON.stringify(postData[key]));
        });
        dispatch(submitOffer(postApi, bodyFormData));
      } else {
        dispatch(notifSend({
          type: 'warning',
          msg: 'Please Fill All Details Correctly !',
          dismissAfter: 2000
        }));
      }
      resetForm(form);
    });
  };

  prefillLoginDetails = profileData => {
    const {
      contact_number: mobile, email, first_name: firstName, last_name: lastName
    } = profileData;
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('mobileNo').value = mobile;
    document.getElementById('emailId').value = email;
  };

  render() {
    const { landing } = this.props;
    const uiHtml = landing.data.items.text;
    // console.log(JSON.stringify(uiHtml));
    return (
      <MenuFooter pageTitle="Promotions and Offers">
        {landing !== null && (
          <Description itemProp="description" fontSize="0.875rem" dangerouslySetInnerHTML={{ __html: uiHtml }} />
        )}
      </MenuFooter>
    );
  }
}

export default Campaign;

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
