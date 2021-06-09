import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
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
    const { homepageCategories = [] } = this.props;
    const {
      banner_image_desktop: bannerImage = 'https://static.hometown.in/media/cms/hometownv2/best-sellers/111.jpg'
    } = homepageCategories.find(obj => OFFER_ID === obj.id || OFFER_ID === parseInt(obj.id, 10));
    return (
      <Box>
        <Box>
          <Image src={bannerImage} alt="bulk-order-banner" />
        </Box>
        <Box mt="-150px" sx={{ position: 'relative', zIndex: 1 }}>
          <Box>
            <Container pr={0} pl={0}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <form
                  onSubmit={this.onSubmitForm}
                  id="custom_form"
                  name="custom_form"
                  encType="multipart/form-data"
                  className="bulk-order-form"
                >
                  <Box className={styles.formList}>
                    <Text ta="center" mt={0} mb="15px" fontSize="36px">
                      {'Corporate Gifting'}
                    </Text>
                    <Row ml="-15px" mr="-15px">
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <FormInput
                          label="Name*"
                          type="text"
                          placeholder=""
                          onChange={this.onChangeName}
                          value={name}
                          feedBackError={nameError}
                          feedBackMessage={nameErrorMessage}
                        />
                      </Box>
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <FormInput
                          label="Email*"
                          type="text"
                          placeholder=""
                          onChange={this.onChangeEmail}
                          value={email}
                          feedBackError={emailError}
                          feedBackMessage={emailErrorMessage}
                        />
                      </Box>
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <FormInput
                          label="Mobile No.*"
                          type="text"
                          placeholder=""
                          onChange={this.onChangePhone}
                          value={phone}
                          feedBackError={phoneError}
                          feedBackMessage={phoneErrorMessage}
                        />
                      </Box>
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <Box mb="0.625rem">
                          <Label fontSize="0.875em" mb="0.625rem">
                            {'Category*'}
                          </Label>
                          <Box my={10}>
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
                          </Box>
                        </Box>
                      </Box>
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <FormInput
                          label="Budget*"
                          type="text"
                          placeholder=""
                          onChange={this.onChangeBudget}
                          value={budget}
                          feedBackError={budgetError}
                          feedBackMessage={budgetErrorMessage}
                        />
                      </Box>
                      <Box width={1 / 2} pl="15px" pr="15px">
                        <FormInput
                          label="Quantity*"
                          type="text"
                          placeholder=""
                          onChange={this.onChangeQuantity}
                          value={quantity}
                          feedBackError={quantityError}
                          feedBackMessage={quantityErrorMessage}
                        />
                      </Box>
                    </Row>
                    <Row ml="-15px" mr="-15px">
                      <Box col="12" pl="15px" pr="15px" ta="center">
                        <Box className="buttons-set">
                          <Button
                            onClick={this.onSubmitForm}
                            btnType="bulkOrderSubmit"
                            mt="0.625rem"
                            title="Submit"
                            type="submit"
                          >
                            {'REQUEST A CALLBACK'}
                          </Button>
                        </Box>
                      </Box>
                    </Row>
                  </Box>
                </form>
              </Box>
            </Container>
          </Box>
          <Row textAlign="center" my={30}>
            <Box className={styles.divider} mx="auto" />
          </Row>
          <Box textAlign="center">
            <Heading fontSize={24} color="black">
              {'WHY CHOOSE HOMETOWN FOR GIFTS?'}
            </Heading>
          </Box>
          <Box bg="bgSecondary" p="20px 30px 40px" mt={20}>
            <Container>
              <Row alignItems="center" justifyContent="center">
                <Box px={30}>
                  <Image
                    src="https://www.hometown.in/media/cms/hometownv2/hometownnew/cart-icon.png"
                    alt="cart-icon"
                    m="auto"
                    width="130px"
                  />
                  <Text fontSize="16px" mt={0} color="white" ta="center">
                    {'Flexible Order Size'}
                  </Text>
                </Box>
                <Box px={30}>
                  <Image
                    src="https://www.hometown.in/media/cms/hometownv2/hometownnew/price-points-icon.png"
                    alt="price-points"
                    m="auto"
                    width="130px"
                  />
                  <Text fontSize="16px" mt={0} color="white" ta="center">
                    {'Unmatched Price Points'}
                  </Text>
                </Box>
                <Box px={30}>
                  <Image
                    src="https://www.hometown.in/media/cms/hometownv2/hometownnew/quality-icon.png"
                    alt="Assured-quality"
                    m="auto"
                    width="130px"
                  />
                  <Text fontSize="16px" mt={0} color="white" ta="center">
                    {'Assured Quality'}
                  </Text>
                </Box>
                <Box px={30}>
                  <Image
                    src="https://www.hometown.in/media/cms/hometownv2/hometownnew/year-warranty-icon.png"
                    alt="warranty"
                    m="auto"
                    width="130px"
                  />
                  <Text fontSize="16px" mt={0} color="white" ta="center">
                    {'One Year Waranty'}
                  </Text>
                </Box>
              </Row>
            </Container>
          </Box>
          <Box mt={50} textAlign="center">
            <Heading fontSize={24} color="black" mb={0}>
              {'CHOOSE FROM OUR WIDE RANGE OF GIFTING HOMEWARE PRODUCTS'}
            </Heading>
          </Box>
          <Box mb={40}>
            <Container pr={0} pl={0}>
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
          </Box>
        </Box>
        <ResponsiveModal onCloseModal={this.handleModal} open={open}>
          <Box textAlign="center" className={styles.serviceThankYouWrapper}>
            <Image m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
            <Text textAlign="center" fontSize="1.25rem" mb="0.625rem" mt={0} color="rgba(51, 51, 51, 0.85)">
              Thank you !<br /> We will get back to you soon.
            </Text>
          </Box>
        </ResponsiveModal>
      </Box>
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

export default connect(mapStateToProps, { sendFormData: sendData })(BulkOrder);
