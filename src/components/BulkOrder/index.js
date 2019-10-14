import React from 'react';
import Container from 'hometown-components/lib/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { Label } from 'hometown-components/lib/Label';
import InputField from 'hometown-components/lib/InputField';
import Text from 'hometown-components/lib/Text';
import HeadingH4 from 'hometown-components/lib/HeadingH4';
import Button from 'hometown-components/lib/Buttons';
import ResponsiveModal from 'components/Modal';
import CategoryCarousel from 'components/CategoryCarousel';
import { validateMobile, validateEmail, isEmpty } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { sendData } from 'redux/modules/services';
import { BULK_ORDER as BULK_ORDER_API } from 'helpers/apiUrls';

const styles = require('./BulkOrder.scss');

const OFFER_ID = 5;

const mapStateToProps = ({ services, homepage }) => ({
  serviceRequest: services.bulkorder || {},
  homepageCategories: homepage.categories.data || []
});

class BulkOrder extends React.Component {
  state = {
    name: '',
    nameErrorMessage: 'Name should Not Be Left Blank ',
    phone: '',
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    email: '',
    emailErrorMessage: 'Please Enter Valid Email ',
    category: 'Home Decor',
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
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeCategory = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      category: value
    });
  };
  onChangeQuantity = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    if (!allowTypeOf(value, 'number') && value.length > 0) {
      return;
    }
    this.setState({
      quantity: value,
      quantityError: checkError
    });
  };
  onChangeBudget = e => {
    const {
      target: { value }
    } = e;
    if (!allowTypeOf(value, 'number') && value.length > 0) {
      return;
    }
    const checkError = isEmpty(value);
    this.setState({
      budget: value,
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
      budget: Number(budget),
      quantity: Number(quantity)
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
    const { homepageCategories } = this.props;
    return (
      <Div type="block">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Img src="https://static.hometown.in/media/cms/hometownv2/best-sellers/111.jpg" alt="" />
          </Div>
        </Row>
        <Div mt="-150px">
          <Section display="flex" mb="0" height="auto">
            <Container type="container" pr="0" pl="0">
              <Div col="12">
                <form
                  onSubmit={this.onSubmitForm}
                  id="custom_form"
                  name="custom_form"
                  encType="multipart/form-data"
                  className="bulk-order-form"
                >
                  <div className={styles.formList}>
                    <Text ta="center" mt="0" mb="15px" fontSize="36px">
                      {'Corporate Gifting'}
                    </Text>
                    <Row ml="-15px" mr="-15px">
                      <Div col="6" pl="15px" pr="15px">
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
                      <Div col="6" pl="15px" pr="15px">
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
                      <Div col="6" pl="15px" pr="15px">
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
                      <Div col="6" pl="15px" pr="15px">
                        <InputField mb="0.625rem">
                          <Label fontSize="0.875em" mb="0.625rem">
                            {'Category*'}
                          </Label>
                          <select onChange={this.onChangeCategory} className="form-control" name="bulkOrderCategory">
                            <option value="Home Decor">Home Decor</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Home Furnishings">Home Furnishings</option>
                            <option value="Tableware">Tableware</option>
                            <option value="Tableware">Kitchenware</option>
                            <option value="Home Improvement">Home Improvement</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home Appliances">Home Appliances</option>
                          </select>
                        </InputField>
                      </Div>
                      <Div col="6" pl="15px" pr="15px">
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
                      <Div col="6" pl="15px" pr="15px">
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
                    <Row ml="-15px" mr="-15px" mb="20px">
                      <Div col="12" pl="15px" pr="15px" ta="center">
                        <div className="buttons-set">
                          <Button
                            onClick={this.onSubmitForm}
                            btnType="bulkOrderSubmit"
                            mt="0.625rem"
                            title="Submit"
                            type="submit"
                          >
                            {'REQUEST A CALLBACK'}
                          </Button>
                        </div>
                      </Div>
                    </Row>
                  </div>
                </form>
              </Div>
            </Container>
          </Section>
          <Row ta="center">
            <Div className={styles.divider} />
          </Row>
          <Div ta="center">
            <HeadingH4 fontSize="30px" color="black">
              WHY CHOOSE HOMETOWN FOR GIFTS?
            </HeadingH4>
          </Div>
          <Section bg="bulkorderUspBg" p="0px 30px">
            <Row>
              <Div col="3">
                <Img
                  src="https://www.hometown.in/media/cms/hometownv2/hometownnew/cart-icon.png"
                  alt=""
                  m="auto"
                  width="130px"
                />
                <Text fontSize="16px" mt="0" color="white" ta="center">
                  Flexible Order Size
                </Text>
              </Div>
              <Div col="3">
                <Img
                  src="https://www.hometown.in/media/cms/hometownv2/hometownnew/price-points-icon.png"
                  alt=""
                  m="auto"
                  width="130px"
                />
                <Text fontSize="16px" mt="0" color="white" ta="center">
                  Unmatched Price Points
                </Text>
              </Div>
              <Div col="3">
                <Img
                  src="https://www.hometown.in/media/cms/hometownv2/hometownnew/quality-icon.png"
                  alt=""
                  m="auto"
                  width="130px"
                />
                <Text fontSize="16px" mt="0" color="white" ta="center">
                  Assured Quality
                </Text>
              </Div>
              <Div col="3">
                <Img
                  src="https://www.hometown.in/media/cms/hometownv2/hometownnew/year-warranty-icon.png"
                  alt=""
                  m="auto"
                  width="130px"
                />
                <Text fontSize="16px" mt="0" color="white" ta="center">
                  OneYear Waranty
                </Text>
              </Div>
            </Row>
          </Section>
          <Div mt="0px" ta="center">
            <HeadingH4 fontSize="30px" color="black">
              CHOOSE FROM OUR WIDE RANGE OF GIFTING HOMEWARE PRODUCTS
            </HeadingH4>
          </Div>
          <Section mb="40px">
            <Container type="container" pr="0" pl="0">
              {homepageCategories.map((category, index) => {
                const {
                  title, id, sub_title: subTitle, values
                } = category;
                if (id && (OFFER_ID === id || OFFER_ID === parseInt(id, 10))) {
                  return (
                    <LazyLoad height={200} offset={100} key={String(index)}>
                      <CategoryCarousel categoryName={title} subTitle={subTitle} data={values} id={id} />
                    </LazyLoad>
                  );
                }
                return '';
              })}
            </Container>
          </Section>
        </Div>
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
  serviceRequest: {},
  homepageCategories: []
};
BulkOrder.propTypes = {
  serviceRequest: PropTypes.object,
  sendFormData: PropTypes.func.isRequired,
  homepageCategories: PropTypes.array
};
export default connect(
  mapStateToProps,
  { sendFormData: sendData }
)(BulkOrder);
