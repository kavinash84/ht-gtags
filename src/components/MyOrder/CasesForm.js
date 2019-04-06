import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import InputField from 'hometown-components/lib/InputField';
// import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Theme from 'hometown-components/lib/Theme';
import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';
import { CASE_ORDER as CASE_ORDER_API } from 'helpers/apiUrls';
// import Img from 'hometown-components/lib/Img';
// import ImageShimmer from 'hometown-components/lib/ImageShimmer';
// import { validateMobile, validatePassword, validateEmail } from 'utils/validation';
import { isEmpty } from 'utils/validation';
// import { LOGIN_URL } from 'helpers/Constants';
// import { signUp } from 'redux/modules/signUp';
import { sendData } from 'redux/modules/cases';
// import { allowNChar, allowTypeOf } from 'utils/helper';
// import CasesFilters from '../Filters/CasesFilters';
const styles = require('./CasesForm.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ sendData }, dispatch);
const mapStateToProps = ({ services }) => ({
  serviceRequest: services.bulkorder || {}
});

class CasesFormContainer extends Component {
  static propTypes = {
    sendData: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired, //eslint-disable-line
    loading: PropTypes.bool //eslint-disable-line
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false
  };
  constructor() {
    super();
    this.state = {
      subject: '',
      origin: 'web',
      subjectError: '',
      subjectErrorMessage: 'Subject should Not Be Left Blank ',
      description: '',
      descriptionError: '',
      descriptionErrorMessage: 'Description should Not Be Left Blank ',
      type: '', //eslint-disable-line
      category: '', //eslint-disable-line
      subCategory: '', //eslint-disable-line
      open: false
    };
  }
  onChangeSubject = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      subject: value,
      subjectError: checkError
    });
  };
  onChangeDescription = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value);
    this.setState({
      description: value,
      descriptionError: checkError
    });
  };
  onChangeType = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      type: value
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
  onChangeSubCategory = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      subCategory: value
    });
  };
  onSubmitForm = e => {
    e.preventDefault();
    // const { sendFormData } = this.props;
    const {
      subject, description, type, category, subCategory, origin
    } = this.state;
    const { sendData: sendFormData } = this.props;
    const subjectError = isEmpty(subject);
    const descriptionError = isEmpty(description);
    if (subjectError || descriptionError) {
      this.setState({
        subjectError,
        descriptionError
      });
      return;
    }
    const data = {
      origin,
      subject,
      description,
      type,
      category,
      sub_category: subCategory
    };
    sendFormData(CASE_ORDER_API, data, 'ordercase');
    console.log(data);
  };
  handleModal = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const correctIcon = require('../../../static/correct.svg');
    const stylesModal = require('./index.scss');
    const {
      subject,
      subjectError,
      subjectErrorMessage,
      description,
      descriptionError,
      descriptionErrorMessage,
      open
    } = this.state;
    // const { loading } = this.props;
    return (
      <div className={stylesModal.signupWrapper}>
        <Row display="block" mr="0" ml="0">
          <Div col="12" bg={Theme.colors.colora39994} pt="0.625rem" pb="0.625rem">
            <Heading color="white" mt="0" mb="0" fontWeight="100" fontSize="1rem" ta="center" fontFamily="light" lh="1">
              Register New Case
            </Heading>
          </Div>
        </Row>
        <Row display="block" mr="0" ml="0">
          <Div col="12" mt="0.5rem">
            <form
              onSubmit={this.onSubmitForm}
              id="custom_form"
              name="custom_form"
              encType="multipart/form-data"
              className="bulk-order-form"
            >
              <div className={styles.formList}>
                <Row>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput
                      label="Subject"
                      type="text"
                      placeholder=""
                      onChange={this.onChangeSubject}
                      value={subject}
                      feedBackError={subjectError}
                      feedBackMessage={subjectErrorMessage}
                    />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput
                      label="Description"
                      type="text"
                      placeholder=""
                      onChange={this.onChangeDescription}
                      value={description}
                      feedBackError={descriptionError}
                      feedBackMessage={descriptionErrorMessage}
                    />
                  </Div>
                </Row>
                <Row>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Type
                      </Label>
                      <select onChange={this.onChangeType} className="form-control" name="caseType">
                        <option value="null">None</option>
                        <option value="query">Query</option>
                      </select>
                    </InputField>
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Category
                      </Label>
                      <select onChange={this.onChangeCategory} className="form-control" name="caseCategory">
                        <option value="null">None</option>
                        <option value="lead">Lead</option>
                      </select>
                    </InputField>
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Sub Category
                      </Label>
                      <select onChange={this.onChangeSubCategory} className="form-control" name="caseSubCategory">
                        <option value="null">None</option>
                        <option value="hot">Hot</option>
                      </select>
                    </InputField>
                  </Div>
                </Row>
                <Row>
                  <Div col="6" pl="10px" pr="10px">
                    <div className="buttons-set">
                      <Button onClick={this.onSubmitForm} btnType="primary" mt="0.625rem" title="Submit" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Div>
                </Row>
              </div>
            </form>
          </Div>
        </Row>
        <ResponsiveModal onCloseModal={this.handleModal} open={open}>
          <Div ta="center" className={styles.serviceThankYouWrapper}>
            <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
            <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
              Thank you !<br /> Your query is saved, We will get back to you soon.
            </Text>
          </Div>
        </ResponsiveModal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CasesFormContainer);
