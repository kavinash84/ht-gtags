import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { NotFound } from 'containers';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

import ReactStars from 'react-stars';
import * as actionCreators from 'redux/modules/feedback';
import { bindActionCreators } from 'redux';

const LogoIcon = require('../../../static/logo.png');
const fbIcon = require('../../../static/facebook.png');
const twIcon = require('../../../static/twitter.png');
const ytIcon = require('../../../static/youtube.png');
const instaIcon = require('../../../static/instagram.png');

const xBtn = {
  position: 'absolute',
  right: '-9px',
  top: '-9px',
  border: '1px solid grey',
  width: '19px',
  fontSize: '10px',
  fontWeight: 'bold',
  borderRadius: '50%',
  backgroundColor: 'rgba(182, 11, 11, 1)',
  height: '19px',
  margin: 'auto',
  color: 'white'
};

const mapStateToProps = ({ feedback }) => ({
  feedback,
  customer: feedback.data.customer,
  prodArr: feedback.data.orderItems,
  orderDate: feedback.data.orderDate,
  mobile: feedback.data.mobile
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

class FeedbackMailer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
      formData: {},
      validFeedback: true,
      submitClicked: false,
      images: {},
      products: []
    };
  }

  componentDidMount() {
    this.initialRender();
  }

  // componentDidUpdate() {
  //   const { showMore } = this.state;
  //   const { prodArr } = this.props;
  //   this.setState({
  //     products: !showMore ? prodArr.slice(0,2) : prodArr
  //   })
  // }

  setValidErrorObject = val => {
    if (!val.rating) {
      val = {
        ...val,
        ratingError: true,
        ratingErrorMessage: 'Rating is required'
      };
    } else {
      val = { ...val, ratingError: false, ratingErrorMessage: '' };
    }
    if (val.rating <= 3) {
      if (!val.review) {
        val = {
          ...val,
          reviewError: true,
          reviewErrorMessage: 'Review is required'
        };
      } else {
        val = { ...val, reviewError: false, reviewErrorMessage: '' };
      }
    } else {
      val = { ...val, reviewError: false, reviewErrorMessage: '' };
    }
    return val;
  };

  initialRender = () => {
    const { showMore } = this.state;
    const { prodArr } = this.props;
    this.setState({
      products: !showMore ? prodArr.slice(0, 2) : prodArr
    });
  };

  showMoreHandler = () => {
    // const { showMore } = this.state;
    const { prodArr } = this.props;
    this.setState(
      {
        showMore: !this.state.showMore
      },
      () => {
        // console.log(this.state.showMore, 'showMore');
        this.setState({
          products: this.state.showMore ? prodArr : prodArr.slice(0, 2)
        });
      }
    );
  };

  validateForm = form => {
    if (!Object.keys(form).length) return true;

    // add validation Error and Error message object
    Object.keys(form).forEach(key => {
      form = {
        ...form,
        [`${key}`]: {
          ...this.setValidErrorObject(form[key])
        }
      };
    });
    this.setState({ formData: form });

    // Validate if there is any error
    return Object.keys(form).some(key => {
      if (form[key].ratingError) return true;
      if (form[key].reviewError) return true;
      return false;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const { customer, setFeedbackForm, mobile } = this.props;
    const valid = !this.validateForm(formData);
    this.setState({
      submitClicked: true,
      validFeedback: valid
    });
    if (valid) {
      const prodIds = Object.keys(formData).join();
      const formdata = new FormData();
      Object.values(formData).forEach(data => {
        const rating = parseInt(data.rating, 10);
        if (data.rating) formdata.append(`productRating[${data.id}]`, `${rating}`);
        if (data.review) {
          formdata.append(`productReview[${data.id}]`, data.review);
        } else {
          formdata.append(`productReview[${data.id}]`, '');
        }
        if (data.image) formdata.append('uploadImage', data.image);
      });
      formdata.append('customerMobile', mobile);
      formdata.append('products', `${prodIds}`);
      formdata.append('customerName', customer);

      setFeedbackForm(formdata);
    }
  };

  ratingChanged = (newRating, id, name) => {
    const { formData } = this.state;
    this.setState(
      {
        formData: {
          ...formData,
          [`${id}`]: {
            ...formData[`${name.id}`],
            id: name.id,
            rating: newRating
          }
        }
      },
      () => {
        if (this.state.submitClicked) {
          this.setState({
            validFeedback: !this.validateForm(this.state.formData)
          });
        }
      }
    );
  };

  handleChange = (value, name) => {
    const { formData } = this.state;
    if (value) {
      this.setState(
        {
          formData: {
            ...formData,
            [`${name.id}`]: {
              ...formData[`${name.id}`],
              id: name.id,
              review: value
            }
          }
        },
        () => {
          if (this.state.submitClicked) {
            this.setState({
              validFeedback: !this.validateForm(this.state.formData)
            });
          }
        }
      );
    } else {
      delete formData[`${name.id}`].review;
      if (this.state.submitClicked) {
        this.setState({
          validFeedback: !this.validateForm(this.state.formData)
        });
      }
    }
  };

  uploadImageHandler = (e, id, name) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    let typeError = false;
    if (file) {
      const pattern = /image-jpg|png|jpeg|bmp/;
      if (!file.type.match(pattern)) {
        typeError = true;
      }
    }
    const size = file.size / 1024 / 1024;
    if (file && size <= 5 && !typeError) {
      reader.onloadend = () => {
        this.setState(
          {
            images: {
              ...this.state.images,
              [`${id}-img`]: {
                imageFile: file,
                imagePreviewUrl: reader.result,
                imgSizeError: false,
                imgTypeError: false,
                imgSizeErrorMessage: ''
              }
            }
          },
          () => {
            const { formData } = this.state;
            this.setState(
              {
                formData: {
                  ...formData,
                  [`${id}`]: {
                    ...formData[`${id}`],
                    id: name.id,
                    image: file
                  }
                }
              },
              () => {
                if (this.state.submitClicked) {
                  this.setState({
                    validFeedback: !this.validateForm(this.state.formData)
                  });
                }
              }
            );
          }
        );
      };
      reader.readAsDataURL(file);
    } else if (typeError) {
      this.setState({
        images: {
          ...this.state.images,
          [`${id}-img`]: {
            imageFile: file,
            imagePreviewUrl: reader.result,
            imgSizeError: false,
            imgTypeError: true,
            imgSizeErrorMessage: 'Image type is invalid'
          }
        }
      });
    } else {
      this.setState({
        images: {
          ...this.state.images,
          [`${id}-img`]: {
            imageFile: file,
            imagePreviewUrl: reader.result,
            imgSizeError: true,
            imgTypeError: false,
            imgSizeErrorMessage: 'Image size not within limits'
          }
        }
      });
    }
  };

  removeImage = id => {
    const { images, formData } = this.state;
    delete images[`${id}-img`];
    delete formData[`${id}`].image;
    this.setState({ ...this.state });
  };

  renderProducts = () => {
    const { orderDate } = this.props;
    const { formData, images, products } = this.state;
    // let products = [];
    // if (!this.state.showMore) {
    //   // products = prodArr.slice(0, 2);
    //   products = prodArr;
    // } else {
    //   products = prodArr;
    // }
    const renderProds = products.map(prod => (
      <Box style={{ background: '#f0f0f0' }} p="20px" mb="10px">
        <Row alignItems="center" mb="20px">
          <Box variant="col-3" pl="15px" pr="15px">
            <Text fontSize="0.875rem" fontFamily="regular">
              Product Purchased
            </Text>
          </Box>
          <Row variant="col-8" ml="0" mr="0" alignItems="center">
            <Img src={prod.img} height="64px" mr="15px" />
            <Text fontFamily="medium" fontSize="16px">
              {prod.name}
            </Text>
          </Row>
        </Row>
        <Row alignItems="center" mb="20px">
          <Box variant="col-3" pl="15px" pr="15px">
            <Text fontSize="0.875rem" fontFamily="regular">
              Date of Purchase
            </Text>
          </Box>
          <Box variant="col-3" pl="0" pr="15px">
            <FormInput bg="white" fontSize="0.875rem" fontFamily="regular" type="date" value={orderDate} disabled />
          </Box>
          <Flex variant="col-4" pl="15px" pr="15px" justifyContent="space-between">
            <Text fontSize="0.875rem" fontFamily="regular">
              Product Rating*
            </Text>
            <ReactStars
              count={5}
              onChange={val => this.ratingChanged(val, prod.id, prod)}
              size={20}
              value={formData[`${prod.id}`] && formData[`${prod.id}`].rating ? formData[`${prod.id}`].rating : 0}
              half={false}
              color2="#ffd700"
            />
            {formData[`${prod.id}`] && formData[`${prod.id}`].ratingError ? (
              <Text color="red" fontSize="12px">
                {formData[`${prod.id}`].ratingErrorMessage}
              </Text>
            ) : null}
          </Flex>

          <Box variant="col-2" pl="0" pr="15px" justifyContent="flex-start">
            <span
              style={{
                display: 'inline-block',
                // width: '60px',
                marginLeft: '10px',
                position: 'relative'
              }}
            >
              {formData[`${prod.id}`] && formData[`${prod.id}`].image ? (
                <div>
                  <button style={xBtn} onClick={() => this.removeImage(prod.id, prod)}>
                    X
                  </button>
                  <img
                    src={
                      this.state.images && this.state.images[`${prod.id}-img`]
                        ? this.state.images[`${prod.id}-img`].imagePreviewUrl
                        : null
                    }
                    alt=""
                    style={{ height: '60px', width: '60px' }}
                  />
                </div>
              ) : null}
            </span>
          </Box>
        </Row>

        <Row alignItems="center">
          <Box variant="col-3" pl="15px" pr="15px">
            <Text fontSize="0.875rem" fontFamily="regular">
              Product Review
            </Text>
          </Box>
          <Box variant="col-3" pl="0" pr="15px">
            <textarea
              style={{
                padding: '4px',
                width: '195px',
                outline: 'none'
              }}
              type="text"
              onChange={e => this.handleChange(e.target.value, prod)}
            />
            {formData[`${prod.id}`] && formData[`${prod.id}`].reviewError ? (
              <Text color="red" fontSize="12px">
                {formData[`${prod.id}`].reviewErrorMessage}
              </Text>
            ) : null}
          </Box>
          <Box variant="col-6" pl="15px" pr="15px">
            <Row ml="0" mr="0" alignItems="center">
              <Box variant="col-7" pl="0" pr="0">
                <Text fontSize="0.875rem" fontFamily="regular">
                  We love to see our product in your home
                </Text>
              </Box>
              <Box variant="col-5" px="15px" sx={{ top: '15px' }}>
                <label htmlFor={`file-input${prod.id}`}>
                  <span
                    style={{
                      padding: '7px',
                      fontFamily: 'regular',
                      fontSize: '0.875rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      backgroundColor: '#D4D4D4',
                      border: '1px solid grey'
                    }}
                  >
                    Upload image
                  </span>
                </label>
                <input
                  type="file"
                  id={`file-input${prod.id}`}
                  style={{ display: 'none' }}
                  onChange={e => {
                    this.uploadImageHandler(e, prod.id, prod);
                  }}
                />
                {images[`${prod.id}-img`] && images[`${prod.id}-img`].imgSizeError ? (
                  <Text color="red" fontSize="12px" mt="15">
                    {images[`${prod.id}-img`].imgSizeErrorMessage}
                  </Text>
                ) : (
                    <Text color="grey" fontSize="12px" mt="15">
                      {'Image size sould be less than 5Mb'}
                    </Text>
                  )}
              </Box>
            </Row>
          </Box>
        </Row>
      </Box>
    ));
    return renderProds;
  };

  render() {
    const {
      customer,
      prodArr,
      feedback: {
        loading, formSubmit: formSubmited, error: pageLoadError, data
      }
    } = this.props;

    const { showMore, validFeedback } = this.state;

    if (!pageLoadError && Object.keys(data).length) {
      return (
        <Container mt="30px">
          <Helmet title="Feedback" />
          <Box
            type="flex"
            variant="col-9"
            m="auto"
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              float: 'none'
            }}
          >
            <Box textAlign="center">
              <Img src={LogoIcon} alt="Hometown" height="60px" width="auto" m="auto" />
            </Box>
            {!formSubmited ? (
              <Box>
                <Box mt="20px" mb="20px" textAlign="center">
                  <Text fontSize="0.975rem" fontFamily="medium" textAlign="center" pb="10px">
                    Dear {customer}
                  </Text>
                  <Text fontSize="0.975rem" fontFamily="medium" textAlign="center" lineHeight="1.2">
                    Thank you for making us a part of your home. We hope we have met your expectations in every sense.
                    <br />
                    We would love to hear from you on your experience with us.
                  </Text>
                </Box>
                {this.renderProducts(prodArr)}
                {prodArr && prodArr.length > 2 ? (
                  <Box mt="20px" textAlign="center">
                    <Button
                      type="button"
                      style={{ background: '#000', color: '#FFF' }}
                      onClick={() => {
                        this.showMoreHandler();
                      }}
                    >
                      {!showMore ? 'Show More' : 'Show Less'}
                    </Button>
                  </Box>
                ) : null}
                <Box mt="20px">
                  <Box textAlign="center" mb="30px">
                    <Button
                      disabled={loading || !validFeedback}
                      type="submit"
                      style={{ background: '#000', color: '#FFF' }}
                      onClick={e => this.handleSubmit(e)}
                    >
                      {loading ? 'Please Wait ...' : 'SUBMIT'}
                    </Button>

                    <Box mt="20px" textAlign="center">
                      {!validFeedback && (
                        <Text textAlign="center" fontSize="14px" color="red">
                          Please fill one form to submit your feedback
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
                <Box
                  type="flex"
                  style={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text textAlign="center" fontFamily="medium">
                    Thank you for your feedback
                </Text>
                </Box>
              )}

            <Box mb="10px">
              <Row ml="0" mr="0" justifyContent="center">
                <a href="https://www.facebook.com/hometown.in/" target="_blank" rel="noreferrer">
                  <Img src={fbIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
                <a href="https://twitter.com/HomeTown_In/" target="_blank" rel="noreferrer">
                  <Img src={twIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
                <a href="https://www.instagram.com/hometownindia/" target="_blank" rel="noreferrer">
                  <Img src={instaIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
                <a href="https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw" target="_blank" rel="noreferrer">
                  <Img src={ytIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
              </Row>
            </Box>
            <Box mb="20px">
              <Text as="p" fontSize="0.875rem" lineHeight="1.6" textAlign="center" fontFamily="medium">
                If you have any questions or issues, Please contact
                <br />
                08069252525(10am - 8pm) | care@hometown.in | www.hometown.in
              </Text>
            </Box>
          </Box>
        </Container>
      );
    }
    return <NotFound />;
  }
}

FeedbackMailer.defaultProps = {
  customer: '',
  prodArr: [],
  orderDate: '',
  mobile: ''
};

FeedbackMailer.propTypes = {
  customer: PropTypes.string,
  prodArr: PropTypes.array,
  orderDate: PropTypes.string,
  setFeedbackForm: PropTypes.func.isRequired,
  mobile: PropTypes.string,
  feedback: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackMailer);
