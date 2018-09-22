import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import ResponsiveModal from 'components/Modal';
import TitleBar from 'components/TitleBar';
import ServiceRequestForm from 'hometown-components/lib/Forms/ServiceRequestForm';
import { validateMobile, isEmpty, validateEmail } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';
import { sendData } from 'redux/modules/services';
import { SERVICE_REQUEST as SERVICE_REQUEST_API } from 'helpers/apiUrls';
import styles from './ContactUs.scss';

@connect(({ services }) => ({
  serviceRequest: services.serviceRequest || {}
}))
class ServiceRequest extends React.Component {
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
    orderFeedBackMessage: 'Order Number is Required',
    storeNameFeedBackError: false,
    storeNameFeedBackMessage: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'Should Not be Empty',
    reviewFeedBackError: false,
    reviewFeedBackMessage: 'Should Not be Empty',
    under_warranty: false,
    out_of_warranty: false,
    assembly_dismatling: false,
    open: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.serviceRequest;
    if (loaded && !loading) {
      this.setState({
        open: true,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        order: '',
        review: '',
        storeName: '',
        assembly_dismatling: false,
        out_of_warranty: false,
        under_warranty: false
      });
    }
  }
  onSubmitForm = e => {
    e.preventDefault();
    // Validate Form
    const { dispatch } = this.context.store;
    /* eslint-disable */
    const {
      firstName,
      lastName,
      phone,
      email,
      city,
      order,
      review,
      storeName,
      assembly_dismatling,
      out_of_warranty,
      under_warranty
    } = this.state;
    /* eslint-enable */
    const firstNameFeedBackError = isEmpty(firstName);
    const lastNameFeedBackError = isEmpty(lastName);
    const phoneFeedBackError = !validateMobile(phone);
    const emailFeedBackError = !validateEmail(email);
    const cityFeedBackError = isEmpty(city);
    const orderFeedBackError = isEmpty(order);
    const reviewFeedBackError = isEmpty(review);

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
        emailFeedBackError,
        orderFeedBackError,
        reviewFeedBackError
      });
      dispatch(notifSend({
        type: 'warning',
        msg: 'Please Fill All Details Correctly',
        dismissAfter: 3000
      }));
    } else {
      let services = {
        assembly_dismatling,
        out_of_warranty,
        under_warranty
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
      dispatch(sendData(SERVICE_REQUEST_API, postData, 'serviceRequest'));
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
  handleModal = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { loaded, loading } = this.props.serviceRequest;
    const { open } = this.state;
    const correctIcon = require('../../../static/correct.svg');
    return (
      <Div type="block">
        <TitleBar title="SERVICE REQUEST" />
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
            <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="1rem">
              <Div>
                <Heading mt="0" color="textDark" fontSize="0.875rem" fontFamily="medium" ellipsis={false}>
                  Request a Technician for a service request –
                </Heading>
                <Text color="#8d8d8d" fontSize="0.75rem" mb="0">
                  We would love to hear from you! Reach out to us through any of the modes below, and we shall respond
                  at the earliest.
                </Text>
              </Div>
            </Section>
            <Row m="0 -0.625rem">
              <ServiceRequestForm
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
ServiceRequest.defaultProps = {
  loading: false,
  loaded: false,
  serviceRequest: {}
};
ServiceRequest.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  serviceRequest: PropTypes.object
};

export default ServiceRequest;
