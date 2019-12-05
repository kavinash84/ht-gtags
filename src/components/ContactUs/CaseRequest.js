import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components-dev/lib/Container';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
// import Heading from 'hometown-components-dev/lib/Heading';
// import Text from 'hometown-components-dev/lib/Text';
import Section from 'hometown-components-dev/lib/Section';
// import Img from 'hometown-components-dev/lib/Img';
// import ResponsiveModal from 'components/Modal';
import TitleBar from 'components/TitleBar';
import Button from 'hometown-components-dev/lib/Buttons';
import InputField from 'hometown-components-dev/lib/InputField';
import FormInput from 'hometown-components-dev/lib/Forms/FormInput';
import { Label } from 'hometown-components-dev/lib/Label';
import { validateMobile, isEmpty, validateEmail } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';
// import { sendData } from 'redux/modules/services';
import { sendData } from 'redux/modules/cases';
import { CASE_REQUEST as CASE_REQUEST_API } from 'helpers/apiUrls';
// import styles from './ContactUs.scss';
import categories from '../../data/case-category';
import subCategories from '../../data/case-sub-category';

@connect(({ cases }) => ({
  caseRequestData: cases.caseRequest || {}
}))
class CaseRequest extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      fullNameFeedBackError: false,
      fullNameFeedBackMessage: 'First Name Cannot be Empty ',
      subjectFeedBackError: false,
      subjectFeedBackMessage: 'Last Name Cannot be Empty',
      phoneFeedBackError: false,
      phoneFeedBackMessage: 'Enter Valid 10 Digits Mobile Number',
      emailFeedBackError: false,
      emailFeedBackMessage: 'Enter Valid Email Id ',
      reviewFeedBackError: false,
      reviewFeedBackMessage: 'Should Not be Empty',
      // open: false,
      type: { value: null, label: 'None' }, //eslint-disable-line
      typeError: false,
      typeErrorMessage: 'Type can not be empty',
      categoryError: false,
      categoryErrorMessage: 'Catgeory can not be empty',
      subcategoryError: false,
      subcategoryErrorMessage: 'Sub Category can not be empty',
      category: { value: null, label: 'None' }, //eslint-disable-line
      subcategory: { value: null, label: 'None' } //eslint-disable-line
    };
    this.TypeOptions = [
      { value: null, label: 'None' },
      { value: 'Query', label: 'Query' },
      { value: 'Complaint', label: 'Complaint' },
      { value: 'Request', label: 'Request' }
    ];
  }
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.caseRequestData;
    if (loaded && !loading) {
      this.setState({
        // open: true,
        fullName: '',
        subject: '',
        phone: '',
        email: '',
        review: '',
        type: { value: null, label: 'None' },
        category: { value: null, label: 'None' },
        subcategory: { value: null, label: 'None' }
      });
    }
  }
  onChangeType = type => {
    this.setState(
      {
        type
      },
      () => {
        this.resetDropDown({
          category: { value: null, label: 'None' },
          subcategory: { value: null, label: 'None' }
        });
      }
    );
  };
  onChangeSubCategory = subcategory => {
    this.setState({
      subcategory
    });
  };
  onChangeCategory = category => {
    this.setState(
      {
        category
      },
      () => {
        this.resetDropDown({
          subcategory: { value: null, label: 'None' }
        });
      }
    );
  };
  onSubmitForm = e => {
    e.preventDefault();
    // Validate Form
    const { dispatch } = this.context.store;
    /* eslint-disable */
    const {
      fullName,
      subject,
      phone,
      email,
      review,
      type: { value: type },
      category: { value: category },
      subcategory: { value: subcategory }
    } = this.state;
    /* eslint-enable */
    const fullNameFeedBackError = isEmpty(fullName);
    const subjectFeedBackError = isEmpty(subject);
    const phoneFeedBackError = !validateMobile(phone);
    const emailFeedBackError = !validateEmail(email);
    const reviewFeedBackError = isEmpty(review);
    const typeError = isEmpty(type);
    const categoryError = isEmpty(category);
    const subcategoryError = isEmpty(subcategory);

    if (
      fullNameFeedBackError ||
      subjectFeedBackError ||
      phoneFeedBackError ||
      emailFeedBackError ||
      reviewFeedBackError ||
      typeError ||
      categoryError ||
      subcategoryError
    ) {
      this.setState({
        fullNameFeedBackError,
        subjectFeedBackError,
        phoneFeedBackError,
        emailFeedBackError,
        reviewFeedBackError,
        typeError,
        categoryError,
        subcategoryError
      });
      dispatch(notifSend({
        type: 'warning',
        msg: 'Please Fill All Details Correctly',
        dismissAfter: 3000
      }));
    } else {
      const postData = {
        fullName,
        subject,
        email,
        description: review,
        mobile: phone,
        type,
        category,
        subcategory
      };
      dispatch(sendData(CASE_REQUEST_API, postData, 'caseRequest'));
    }
  };
  getCategoryOptions = () => {
    const {
      type: { value }
    } = this.state;
    const catList = value ? categories[value] : [];
    return catList;
  };
  getSubCategoryOptions = () => {
    const {
      category: { value }
    } = this.state;
    const subCatList = value ? subCategories[value] : [];
    return subCatList;
  };
  resetDropDown = state => {
    this.setState(state);
  };
  isDisabled = () => {
    const {
      subject,
      description,
      type: { value: type },
      category: { value: category },
      subcategory: { value: subCategory }
    } = this.state;
    return !(subject && description && type && category && subCategory);
  };
  handleChange = e => {
    const {
      target: { value, name }
    } = e;
    this.setState({
      [name]: value,
      [`${name}FeedBackError`]: false
    });
  };
  // handleModal = () => {
  //   this.setState({ open: !this.state.open });
  // };
  render() {
    const {
      fullName,
      fullNameFeedBackError,
      fullNameFeedBackMessage,
      phone,
      phoneFeedBackError,
      phoneFeedBackMessage,
      email,
      emailFeedBackError,
      emailFeedBackMessage,
      subject,
      subjectFeedBackError,
      subjectFeedBackMessage,
      type,
      category,
      subcategory,
      review,
      reviewFeedBackError,
      reviewFeedBackMessage,
      typeError,
      typeErrorMessage,
      categoryError,
      categoryErrorMessage,
      subcategoryError,
      subcategoryErrorMessage
    } = this.state;
    const { loaded, loading } = this.props.caseRequestData;
    // const { open } = this.state;
    // const correctIcon = require('../../../static/correct.svg');
    return (
      <Div type="block">
        <TitleBar title="CASE REQUEST" />
        <Section
          pt="3rem  "
          pb="4rem"
          mb="0"
          mt="-0.625rem"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          display="flex"
        >
          <Container type="container" pr="1.5rem" pl="1.5rem">
            <Row m="0 -0.625rem">
              <form onSubmit={this.onSubmitForm}>
                <Row ml="0" mr="0">
                  <Div col="4" pr="0.625rem" pl="0.625rem">
                    <FormInput
                      label="Full Name*"
                      type="text"
                      placeholder=""
                      name="fullName"
                      onChange={this.handleChange}
                      value={fullName}
                      feedBackError={fullNameFeedBackError}
                      feedBackMessage={fullNameFeedBackMessage}
                    />
                  </Div>
                  <Div col="4" pr="0.625rem" pl="0.625rem">
                    <FormInput
                      label="Mobile No*"
                      type="text"
                      maxlength="10"
                      placeholder=""
                      onChange={this.handleChange}
                      name="phone"
                      value={phone}
                      feedBackError={phoneFeedBackError}
                      feedBackMessage={phoneFeedBackMessage}
                    />
                  </Div>
                  <Div col="4" pr="0.625rem" pl="0.625rem">
                    <FormInput
                      label="Email*"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      name="email"
                      value={email}
                      feedBackError={emailFeedBackError}
                      feedBackMessage={emailFeedBackMessage}
                    />
                  </Div>
                </Row>
                <Row ml="0" mr="0">
                  <Div col="12" pr="0.625rem" pl="0.625rem">
                    <FormInput
                      label="Subject*"
                      type="text"
                      placeholder=""
                      onChange={this.handleChange}
                      name="subject"
                      value={subject}
                      feedBackError={subjectFeedBackError}
                      feedBackMessage={subjectFeedBackMessage}
                    />
                  </Div>
                </Row>
                <Row ml="0" mr="0">
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Type *
                      </Label>
                      <Select
                        defaultValue={null}
                        value={type}
                        onChange={this.onChangeType}
                        options={this.TypeOptions}
                      />
                      {typeError && (
                        <Label fontSize="0.875em" mb="0.625rem" style={{ color: 'red' }}>
                          {typeErrorMessage}
                        </Label>
                      )}
                    </InputField>
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Category *
                      </Label>
                      <Select
                        defaultValue={null}
                        value={category}
                        onChange={this.onChangeCategory}
                        options={this.getCategoryOptions()}
                      />
                      {categoryError && (
                        <Label fontSize="0.875em" mb="0.625rem" style={{ color: 'red' }}>
                          {categoryErrorMessage}
                        </Label>
                      )}
                    </InputField>
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Sub Category *
                      </Label>
                      <Select
                        defaultValue={null}
                        value={subcategory}
                        onChange={this.onChangeSubCategory}
                        options={this.getSubCategoryOptions()}
                      />
                      {subcategoryError && (
                        <Label fontSize="0.875em" mb="0.625rem" style={{ color: 'red' }}>
                          {subcategoryErrorMessage}
                        </Label>
                      )}
                    </InputField>
                  </Div>
                </Row>
                <Row ml="0" mr="0">
                  <Div col="12" pr="0.625rem" pl="0.625rem">
                    <FormInput
                      label="Description*"
                      onChange={this.handleChange}
                      name="review"
                      value={review}
                      rows={5}
                      type="textarea"
                      placeholder=""
                      feedBackError={reviewFeedBackError}
                      feedBackMessage={reviewFeedBackMessage}
                    />
                  </Div>
                </Row>
                <Row ml="0" mr="0" pb="1rem">
                  <Div col="4" pr="0.625rem" pl="0.625rem" mt="1rem">
                    <Button
                      size="block"
                      btnType="primary"
                      fontFamily="regular"
                      height="42px"
                      mt="0.625rem"
                      rows={5}
                      onClick={this.onSubmitForm}
                      disable={loading || loaded}
                    >
                      {loading ? 'Please Wait ...' : 'SUBMIT'}
                    </Button>
                  </Div>
                </Row>
                {/* eslint-disable */}
              </form>
            </Row>
            {/* <ResponsiveModal onCloseModal={this.handleModal} open={open}>
              <Div ta="center" className={styles.serviceThankYouWrapper}>
                <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
                <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                  Thank you, your request submitted successfully !
                </Text>
              </Div>
            </ResponsiveModal> */}
          </Container>
        </Section>
      </Div>
    );
  }
}
CaseRequest.defaultProps = {
  loading: false,
  loaded: false,
  caseRequestData: {}
};
CaseRequest.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  caseRequestData: PropTypes.object
};

export default CaseRequest;
