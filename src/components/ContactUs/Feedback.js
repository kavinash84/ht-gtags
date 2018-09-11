import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import TitleBar from 'components/TitleBar';
import FeedbackForm from 'hometown-components/lib/Forms/FeedbackForm';
import { validateMobile, isEmpty, validateEmail } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';
import { sendData } from 'redux/modules/services';
import { FEEDBACK as FEEDBACK_API } from 'helpers/apiUrls';

@connect(({ services }) => ({
  serviceRequest: services.feedback
}))
class Feedback extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    firstNameFeedBackError: false,
    firstNameFeedBackMessage: 'First Name Cannot be Empty ',
    lastNameFeedBackError: false,
    lastNameFeedBackMessage: 'Last Name Cannot be Empty',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Enter Valid 10 Digits Mobile Number',
    emailFeedBackError: false,
    emailFeedBackMessage: 'Enter Valid Email Id ',
    orderFeedBackError: false,
    orderFeedBackMessage: '',
    storeNameFeedBackError: false,
    storeNameFeedBackMessage: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City Cannot be Empty',
    instore: false,
    delivery: false,
    fitment: false,
    aftersale: false
  };
  onSubmitForm = e => {
    e.preventDefault();
    // Validate Form
    const { dispatch } = this.context.store;
    const {
      firstName,
      lastName,
      phone,
      email,
      city,
      storeName,
      instore,
      aftersale,
      fitment,
      delivery,
      review,
      order
    } = this.state;
    const firstNameFeedBackError = isEmpty(firstName);
    const lastNameFeedBackError = isEmpty(lastName);
    const phoneFeedBackError = !validateMobile(phone);
    const emailFeedBackError = !validateEmail(email);
    const cityFeedBackError = isEmpty(city);
    if (
      firstNameFeedBackError ||
      lastNameFeedBackError ||
      phoneFeedBackError ||
      emailFeedBackError ||
      cityFeedBackError
    ) {
      this.setState({
        firstNameFeedBackError,
        lastNameFeedBackError,
        phoneFeedBackError,
        cityFeedBackError,
        emailFeedBackError
      });
      dispatch(notifSend({
        type: 'warning',
        msg: 'Please Fill All Details Correctly',
        dismissAfter: 3000
      }));
    } else {
      let services = {
        aftersale,
        delivery,
        instore,
        fitment
      };
      services = Object.values(services)
        .map((item, index) => item && Object.keys(services)[index])
        .filter(item => item !== false)
        .join(',');

      const postData = {
        firstName,
        lastName,
        email,
        store: storeName,
        city,
        review,
        services,
        mobile: phone,
        orderNumber: order
      };
      dispatch(sendData(FEEDBACK_API, postData, 'serviceRequest'));
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
  handleCheckBoxChange = e => {
    const {
      target: { name }
    } = e;
    this.setState({
      [name]: !this.state[name]
    });
  };
  render() {
    const { loaded, loading } = this.props.feedback;
    return (
      <Div type="block">
        <TitleBar title="FEEDBACK" />
        <Section
          pt="3rem"
          pb="4rem"
          mb="0"
          mt="-0.625rem"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          display="flex"
        >
          <Container type="container" pr="1.5rem" pl="1.5rem">
            <Row m="0 -0.625rem">
              <FeedbackForm
                onSubmitForm={this.onSubmitForm}
                handleChange={this.handleChange}
                handleCheckBoxChange={this.handleCheckBoxChange}
                {...this.state}
                loading={loading}
                loaded={loaded}
              />
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}
Feedback.defaultProps = {
  loading: false,
  loaded: false,
  feedback: {}
};
Feedback.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  feedback: PropTypes.object
};
export default Feedback;
