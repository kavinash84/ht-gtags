import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import { CASE_ORDER as CASE_ORDER_API } from 'helpers/apiUrls';
import { isEmpty } from 'utils/validation';
import { sendData } from 'redux/modules/cases';
import categories from '../../data/case-category';
import subCategories from '../../data/case-sub-category';

const styles = require('./CasesForm.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ sendData }, dispatch);
const mapStateToProps = ({
  cases
  // profile
}) => ({
  ordercase: cases.ordercase || {}
  // sfid: profile.data.salesforce_account_id || ''
});

class CasesFormContainer extends Component {
  static propTypes = {
    sendData: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    // sfid: PropTypes.string,
    ordercase: PropTypes.object,
    caseItem: PropTypes.object,
    orderItem: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    ordercase: {},
    caseItem: {},
    orderItem: {},
    // sfid: '',
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
      subcategory: { value: null, label: 'None' }, //eslint-disable-line
      crm: {
        type: null,
        category: null,
        subcategory: null
      }
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
    const { crm = null } = category;
    this.setState(
      {
        category,
        crm: crm || { type: null, category: null, subcategory: null }
      },
      () => {
        this.resetDropDown({
          subcategory: { value: null, label: 'None' }
        });
      }
    );
  };
  onChangeSubCategory = subcategory => {
    const { crm = null } = subcategory;
    this.setState({
      subcategory,
      crm: crm || { type: null, category: null, subcategory: null }
    });
  };
  onSubmitForm = e => {
    e.preventDefault();
    // const { sendFormData } = this.props;
    const {
      subject,
      description,
      crm: { type },
      crm: { category },
      crm: { subcategory },
      origin
    } = this.state;
    const { article_code: code = '', order_item_id: itemId = '' } = this.props.caseItem;
    const { sforder_id: order_id = '', sfaccount_id: sfid = '' } = this.props.orderItem;
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
      desc: description,
      type,
      category,
      sub_category: subcategory,
      account_id: sfid,
      code,
      order_id,
      item_id: itemId
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
      crm: { type },
      crm: { category },
      crm: { subcategory }
    } = this.state;
    return !(subject && description && type && category && subcategory);
  };
  render() {
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
      <div className={styles.caseFormWrapper}>
        <RowHtV1 display="block" mr="0" ml="0">
          <BoxHtV1 col="12" bg="#a39994" pt="20px" pb="18px">
            <HeadingHtV1 color="white" mt="0" mb="0" fontSize="18px" ta="center" fontFamily="regular" lh="1">
              Register New Case
            </HeadingHtV1>
          </BoxHtV1>
        </RowHtV1>
        <RowHtV1 display="block" mr="0" ml="0">
          <BoxHtV1 col="12">
            <form
              onSubmit={this.onSubmitForm}
              id="custom_form"
              name="custom_form"
              encType="multipart/form-data"
              className="bulk-order-form"
            >
              <div className={styles.formList}>
                <BoxHtV1 col="12">
                  <FormInputHtV1
                    label="Subject *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangeSubject}
                    value={subject}
                    feedBackError={subjectError}
                    feedBackMessage={subjectErrorMessage}
                  />
                </BoxHtV1>
                <BoxHtV1 col="12" mb="0.625rem">
                  <LabelHtV1 fontSize="0.875em" mb="0.625rem">
                    Type *
                  </LabelHtV1>
                  <Select
                    defaultValue={null}
                    value={this.state.type}
                    onChange={this.onChangeType}
                    options={this.TypeOptions}
                  />
                </BoxHtV1>
                <BoxHtV1 col="12">
                  <InputFieldHtV1 mb="0.625rem">
                    <LabelHtV1 fontSize="0.875em" mb="0.625rem">
                      Category *
                    </LabelHtV1>
                    <Select
                      defaultValue={null}
                      value={this.state.category}
                      onChange={this.onChangeCategory}
                      options={this.getCategoryOptions()}
                    />
                  </InputFieldHtV1>
                </BoxHtV1>
                {this.getSubCategoryOptions().length ? (
                  <BoxHtV1 col="12">
                    <InputFieldHtV1 mb="0.625rem">
                      <LabelHtV1 fontSize="0.875em" mb="0.625rem">
                        Sub Category *
                      </LabelHtV1>
                      <Select
                        defaultValue={null}
                        value={this.state.subcategory}
                        onChange={this.onChangeSubCategory}
                        options={this.getSubCategoryOptions()}
                      />
                    </InputFieldHtV1>
                  </BoxHtV1>
                ) : (
                  ''
                )}
                <BoxHtV1 col="12">
                  <FormInputHtV1
                    label="Description *"
                    type="textarea"
                    rows={5}
                    placeholder=""
                    onChange={this.onChangeDescription}
                    value={description}
                    feedBackError={descriptionError}
                    feedBackMessage={descriptionErrorMessage}
                  />
                </BoxHtV1>
                <BoxHtV1 col="12">
                  <div className="buttons-set">
                    <ButtonHtV1
                      disabled={this.isDisabled() || loading}
                      onClick={this.onSubmitForm}
                      btnType="primary"
                      mt="0.625rem"
                      title="Submit"
                      type="submit"
                    >
                      {loading ? 'Please Wait ...' : 'SUBMIT'}
                    </ButtonHtV1>
                  </div>
                </BoxHtV1>
              </div>
            </form>
          </BoxHtV1>
        </RowHtV1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasesFormContainer);
