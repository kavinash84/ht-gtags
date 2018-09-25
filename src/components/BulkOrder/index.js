import React from 'react';
import Container from 'hometown-components/lib/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { Label } from 'hometown-components/lib/Label';
import InputField from 'hometown-components/lib/InputField';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';
import ResponsiveModal from 'components/Modal';
import { validateMobile, validateEmail, isEmpty } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { sendData } from 'redux/modules/services';
import { BULK_ORDER as BULK_ORDER_API } from 'helpers/apiUrls';
import TitleBar from '../TitleBar';

const bulkOrderBG = require('../../../static/bulk-order-collage.jpg');
const styles = require('./BulkOrder.scss');

const mapStateToProps = ({ services }) => ({
  serviceRequest: services.bulkorder || {}
});

class BulkOrder extends React.Component {
  state = {
    name: '',
    nameErrorMessage: 'Name should Not Be Left Blank ',
    phone: '',
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    email: '',
    emailErrorMessage: 'Please Enter Valid Email ',
    category: 'Furniture',
    budget: '',
    budgetErrorMessage: 'Enter Your Budget',
    quantity: '',
    quantityErrorMessage: 'Enter the Approx Quantity',
    open: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.serviceRequest;
    if (loaded && !loading) {
      this.setState({
        open: true,
        name: '',
        phone: '',
        email: '',
        quantity: '',
        budget: ''
      });
    }
  }
  onChangeName = e => {
    const { target: { value } } = e;
    const checkError = isEmpty(value);
    this.setState({
      name: value,
      nameError: checkError
    });
  };
  onChangeEmail = e => {
    const { target: { value } } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  onChangePhone = e => {
    const { target: { value } } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };

  onChangeCategory = e => {
    const { target: { value } } = e;
    this.setState({
      category: value
    });
  };
  onChangeQuantity = e => {
    const { target: { value } } = e;
    const checkError = isEmpty(value);
    if (!allowTypeOf(value, 'number') && value.length > 0) {
      return;
    }
    this.setState({
      quantity: Number(value),
      quantityError: checkError
    });
  };
  onChangeBudget = e => {
    const { target: { value } } = e;
    if (!allowTypeOf(value, 'number') && value.length > 0) {
      return;
    }
    const checkError = isEmpty(value);
    this.setState({
      budget: Number(value),
      budgetError: checkError
    });
  };
  onSubmitForm = e => {
    e.preventDefault();
    const { sendFormData } = this.props;
    const {
      name, phone, email, budget, quantity, category
    } = this.state;
    const nameError = isEmpty(name);
    const phoneError = !validateMobile(phone);
    const emailError = !validateEmail(email);
    const budgetError = isEmpty(budget);
    const quantityError = isEmpty(quantity);
    if (nameError || phoneError || emailError || budgetError || quantityError) {
      this.setState({
        nameError,
        phoneError,
        emailError,
        budgetError,
        quantityError
      });
      return;
    }
    const data = {
      name,
      mobile: phone,
      email,
      category,
      budget,
      quantity
    };
    sendFormData(BULK_ORDER_API, data, 'bulkorder');
  };
  handleModal = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const correctIcon = require('../../../static/correct.svg');
    const {
      name,
      nameError,
      nameErrorMessage,
      email,
      emailError,
      emailErrorMessage,
      phone,
      phoneError,
      phoneErrorMessage,
      budget,
      budgetError,
      budgetErrorMessage,
      quantity,
      quantityError,
      quantityErrorMessage,
      open
    } = this.state;
    return (
      <Div type="block">
        <TitleBar title="Bulk Order" />
        <Section display="flex" pt="2rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0">
              <Div col="12">
                <Img src={bulkOrderBG} alt="" />
              </Div>
            </Row>
            <Row display="block" mr="0" ml="0">
              <Div col="12" className={styles.headerContent}>
                <Heading mt="0">Bulk Order</Heading>
                <Text fontSize="1rem">
                  In this gifting season select the most appropriate gift for your Friends/Teams
                </Text>
                <ul>
                  <li>1. A bulk order can be placed from anywhere in India and will be delivered there </li>
                  <li>
                    2. You may also request HomeTown products which are not featured on webstores and we can arrange to
                    send you images and possible samples{' '}
                  </li>
                  <li>3. we can make personalized products for you depending on the quantity </li>
                  <li>4. Rest assured to get volume discounts </li>
                  <li>
                    5. Once registered with us as a bulk buyer customer, enjoy special promotions and offer only for you{' '}
                  </li>
                  <li>6. we will revert within 1 working day on an enquiry</li>
                </ul>
                <Div col="12" mt="2rem">
                  <form
                    onSubmit={this.onSubmitForm}
                    id="custom_form"
                    name="custom_form"
                    encType="multipart/form-data"
                    className="bulk-order-form"
                  >
                    <div className={styles.formList}>
                      <Text ta="center" mt="0" mb="0.3125rem" fontSize="0.875rem">
                        To know more, call us at 18002100004
                      </Text>
                      <Text fontSize="0.875rem" ta="center" mt="0" mb="0.3125rem">
                        Or
                      </Text>
                      <Text fontSize="0.875rem" ta="center" mt="0" mb="1.5rem">
                        Drop in your Requirement.
                      </Text>
                      <Row>
                        <Div col="6" pl="10px" pr="10px">
                          <FormInput
                            label="Name*"
                            type="text"
                            placeholder=""
                            onChange={this.onChangeName}
                            value={name}
                            feedBackError={nameError}
                            feedBackMessage={nameErrorMessage}
                          />
                        </Div>
                        <Div col="6" pl="10px" pr="10px">
                          <FormInput
                            label="Email*"
                            type="text"
                            placeholder=""
                            onChange={this.onChangeEmail}
                            value={email}
                            feedBackError={emailError}
                            feedBackMessage={emailErrorMessage}
                          />
                        </Div>
                      </Row>
                      <Row>
                        <Div col="6" pl="10px" pr="10px">
                          <FormInput
                            label="Mobile No.*"
                            type="text"
                            placeholder=""
                            onChange={this.onChangePhone}
                            value={phone}
                            feedBackError={phoneError}
                            feedBackMessage={phoneErrorMessage}
                          />
                        </Div>
                        <Div col="6" pl="10px" pr="10px">
                          <InputField mb="0.625rem">
                            <Label fontSize="0.875em" mb="0.625rem">
                              Category*
                            </Label>
                            <select onChange={this.onChangeCategory} className="form-control" name="bulkOrderCategory">
                              <option value="Furniture">Furniture</option>
                              <option value="Home Furnishings">Home Furnishings</option>
                              <option value="Home Decor">Home Decor</option>
                              <option value="Tableware">Tableware</option>
                              <option value="Tableware">Kitchenware</option>
                              <option value="Home Improvement">Home Improvement</option>
                            </select>
                          </InputField>
                        </Div>
                      </Row>
                      <Row>
                        <Div col="6" pl="10px" pr="10px">
                          <FormInput
                            label="Budget*"
                            type="text"
                            placeholder=""
                            onChange={this.onChangeBudget}
                            value={budget}
                            feedBackError={budgetError}
                            feedBackMessage={budgetErrorMessage}
                          />
                        </Div>
                        <Div col="6" pl="10px" pr="10px">
                          <FormInput
                            label="Quantity*"
                            type="text"
                            placeholder=""
                            onChange={this.onChangeQuantity}
                            value={quantity}
                            feedBackError={quantityError}
                            feedBackMessage={quantityErrorMessage}
                          />
                        </Div>
                      </Row>
                      <Row>
                        <Div col="6" pl="10px" pr="10px">
                          <div className="buttons-set">
                            <Button
                              onClick={this.onSubmitForm}
                              btnType="primary"
                              mt="0.625rem"
                              title="Submit"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </div>
                        </Div>
                      </Row>
                    </div>
                  </form>
                </Div>
              </Div>
            </Row>
          </Container>
        </Section>
        <ResponsiveModal onCloseModal={this.handleModal} open={open}>
          <Div ta="center" className={styles.serviceThankYouWrapper}>
            <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
            <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
              Thank you !<br /> We will get back to you soon.
            </Text>
          </Div>
        </ResponsiveModal>
      </Div>
    );
  }
}
BulkOrder.defaultProps = {
  serviceRequest: {}
};
BulkOrder.propTypes = {
  serviceRequest: PropTypes.object,
  sendFormData: PropTypes.func.isRequired
};
export default connect(mapStateToProps, { sendFormData: sendData })(BulkOrder);
