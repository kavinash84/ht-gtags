import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router';
import Button from 'hometown-components/lib/Buttons';
import InputField from 'hometown-components/lib/InputField';
// import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Theme from 'hometown-components/lib/Theme';
import { Label } from 'hometown-components/lib/Label';
import { CASE_ORDER as CASE_ORDER_API } from 'helpers/apiUrls';
// import Img from 'hometown-components/lib/Img';
// import ImageShimmer from 'hometown-components/lib/ImageShimmer';
// import { validateMobile, validatePassword, validateEmail } from 'utils/validation';
import { isEmpty } from 'utils/validation';
// import { LOGIN_URL } from 'helpers/Constants';
// import { signUp } from 'redux/modules/signUp';
import { sendData } from 'redux/modules/cases';
import categories from '../../data/case-category';
import subCategories from '../../data/case-sub-category';
// import { allowNChar, allowTypeOf } from 'utils/helper';
// import CasesFilters from '../Filters/CasesFilters';
const styles = require('./CasesForm.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ sendData }, dispatch);
const mapStateToProps = ({ cases, profile }) => ({
  ordercase: cases.ordercase || {},
  sfid: profile.data.salesforce_product_interest_id || ''
});

class CasesFormContainer extends Component {
  static propTypes = {
    sendData: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired, //eslint-disable-line
    loading: PropTypes.bool,
    sfid: PropTypes.string,
    ordercase: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    ordercase: {},
    sfid: '',
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
      type: { value: null, label: 'None' }, //eslint-disable-line
      category: { value: null, label: 'None' }, //eslint-disable-line
      subcategory: { value: null, label: 'None' } //eslint-disable-line
    };
    this.TypeOptions = [
      { value: null, label: 'None' },
      { value: 'Request', label: 'Raise a Request' },
      { value: 'Complaint', label: 'Raise a Complaint/Grievance' }
    ];
  }
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.ordercase;
    if (loaded && !loading) {
      this.setState({
        subject: '',
        description: '',
        type: '',
        category: '',
        subcategory: ''
      });
    }
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
  onChangeSubCategory = subcategory => {
    this.setState({
      subcategory
    });
  };
  onSubmitForm = e => {
    e.preventDefault();
    // const { sendFormData } = this.props;
    const {
      subject,
      description,
      type: { value: type },
      category: { value: category },
      subcategory: { value: subCategory },
      origin
    } = this.state;
    const { sendData: sendFormData, sfid } = this.props;
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
      sub_category: subCategory,
      account_id: sfid
    };
    sendFormData(CASE_ORDER_API, data, 'ordercase');
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
  render() {
    const stylesModal = require('./index.scss');
    const {
      subject,
      subjectError,
      subjectErrorMessage,
      description,
      descriptionError,
      descriptionErrorMessage
    } = this.state;
    const { loading } = this.props;
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
                  <Div col="12" pl="10px" pr="10px">
                    <FormInput
                      label="Subject *"
                      type="text"
                      placeholder=""
                      onChange={this.onChangeSubject}
                      value={subject}
                      feedBackError={subjectError}
                      feedBackMessage={subjectErrorMessage}
                    />
                  </Div>
                </Row>
                <Row>
                  <Div col="12" pl="10px" pr="10px">
                    <Label fontSize="0.875em" mb="0.625rem">
                      Type *
                    </Label>
                    <Select
                      defaultValue={null}
                      value={this.state.type}
                      onChange={this.onChangeType}
                      options={this.TypeOptions}
                    />
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Category *
                      </Label>
                      <Select
                        defaultValue={null}
                        value={this.state.category}
                        onChange={this.onChangeCategory}
                        options={this.getCategoryOptions()}
                      />
                    </InputField>
                  </Div>
                  <Div col="12" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Sub Category *
                      </Label>
                      <Select
                        defaultValue={null}
                        value={this.state.subcategory}
                        onChange={this.onChangeSubCategory}
                        options={this.getSubCategoryOptions()}
                      />
                    </InputField>
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput
                      label="Description *"
                      type="textarea"
                      rows={5}
                      placeholder=""
                      onChange={this.onChangeDescription}
                      value={description}
                      feedBackError={descriptionError}
                      feedBackMessage={descriptionErrorMessage}
                    />
                  </Div>
                </Row>
                <Row>
                  <Div col="6" pl="10px" pr="10px">
                    <div className="buttons-set">
                      <Button
                        disabled={this.isDisabled() || loading}
                        onClick={this.onSubmitForm}
                        btnType="primary"
                        mt="0.625rem"
                        title="Submit"
                        type="submit"
                      >
                        {loading ? 'Please Wait ...' : 'SUBMIT'}
                      </Button>
                    </div>
                  </Div>
                </Row>
              </div>
            </form>
          </Div>
        </Row>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CasesFormContainer);
