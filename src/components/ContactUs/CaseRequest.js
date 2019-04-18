import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
// import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import ResponsiveModal from 'components/Modal';
import TitleBar from 'components/TitleBar';
import CaseRequestForm from 'hometown-components/lib/Forms/CaseRequestForm';
import { validateMobile, isEmpty, validateEmail } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';
// import { sendData } from 'redux/modules/services';
import { sendData } from 'redux/modules/cases';
import { CASE_REQUEST as CASE_REQUEST_API } from 'helpers/apiUrls';
import styles from './ContactUs.scss';

@connect(({ cases }) => ({
  caseRequestData: cases.caseRequest || {}
}))
class CaseRequest extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
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
    open: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.caseRequestData;
    if (loaded && !loading) {
      this.setState({
        open: true,
        fullName: '',
        subject: '',
        phone: '',
        email: '',
        review: ''
      });
    }
  }
  onSubmitForm = e => {
    e.preventDefault();
    // Validate Form
    const { dispatch } = this.context.store;
    /* eslint-disable */
    const { fullName, subject, phone, email, review } = this.state;
    /* eslint-enable */
    const fullNameFeedBackError = isEmpty(fullName);
    const subjectFeedBackError = isEmpty(subject);
    const phoneFeedBackError = !validateMobile(phone);
    const emailFeedBackError = !validateEmail(email);
    const reviewFeedBackError = isEmpty(review);

    if (
      fullNameFeedBackError ||
      subjectFeedBackError ||
      phoneFeedBackError ||
      emailFeedBackError ||
      reviewFeedBackError
    ) {
      this.setState({
        fullNameFeedBackError,
        subjectFeedBackError,
        phoneFeedBackError,
        emailFeedBackError,
        reviewFeedBackError
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
        type: 'Query',
        category: 'Lead',
        subcategory: 'Hot',
        mobile: phone
      };
      dispatch(sendData(CASE_REQUEST_API, postData, 'caseRequest'));
    }
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
  handleModal = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { loaded, loading } = this.props.caseRequestData;
    const { open } = this.state;
    const correctIcon = require('../../../static/correct.svg');
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
              <CaseRequestForm
                onSubmitForm={this.onSubmitForm}
                handleChange={this.handleChange}
                handleCheckBoxChange={this.handleCheckBoxChange}
                loading={loading}
                loaded={loaded}
                {...this.state}
              />
            </Row>
            <ResponsiveModal onCloseModal={this.handleModal} open={open}>
              <Div ta="center" className={styles.serviceThankYouWrapper}>
                <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
                <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                  Thank you !
                </Text>
              </Div>
            </ResponsiveModal>
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
