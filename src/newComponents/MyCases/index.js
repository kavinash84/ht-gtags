import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
// import { Label } from 'hometown-components-dev/lib/Label';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
// import { isEmpty } from 'utils/validation';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
// import FormInput from 'hometown-components-dev/lib/Forms/FormInput';
import { getDateFilters } from 'utils/helper';
import { loadMyCases } from 'redux/modules/mycases';

const caseMapping = require('../../data/case-reverse-mapping');

const styles = require('../MyOrder/MyOrder.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ loadMyCases }, dispatch);
const mapStateToProps = ({ mycases, profile }) => ({
  ...mycases,
  useremail: profile.data.email,
  mycases,
  contactNumber: profile.data.contact_number,
  salesforce_account_id: profile.data.salesforce_account_id
});
class MyCasesContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      caseStatus: '',
      dateFilter: ''
    };
    this.FILTER_CONFIG = {
      days: [30],
      months: [6],
      years: 3
    };
    this.STATUS_FILTER = [
      { value: 'Open', label: 'Open' },
      { value: 'In-Process', label: 'In-Process' },
      { value: 'Completed', label: 'Resolved' }
    ];
  }
  onStatusChange = status => {
    this.setState({
      caseStatus: status
    });
  };
  onChangeDate = dateFilter => {
    const { label } = dateFilter;
    const startDate = dateFilter.start ? new Date(dateFilter.start) : '';
    const endDate = dateFilter.end ? new Date(dateFilter.end) : '';
    const start = this.formatDate(startDate);
    const end = this.formatDate(endDate);
    this.setState({
      dateFilter: { value: label, label },
      startDate: start,
      endDate: end
    });
  };
  getFilteredCases = e => {
    e.preventDefault();
    const {
      startDate,
      endDate,
      caseStatus: { value: caseStatus }
    } = this.state;
    const { salesforce_account_id: sfid, contactNumber: cn } = this.props;
    this.props.loadMyCases(sfid, startDate, endDate, caseStatus, cn);
  };
  getMapping = (cat = '', subcat = '', type = '') => {
    let value = '';
    if (cat && subcat) {
      const key = `${cat}-${subcat}`;
      const item = caseMapping[`${key}`] ? caseMapping[`${key}`] : {};
      value = item[`${type}`] || '';
    }
    return value;
  };
  formatDate = inputDate => {
    const yearValue = inputDate.getFullYear();
    const monthInput = inputDate.getMonth() + 1;
    const monthValue = monthInput <= 9 ? `0${monthInput}` : monthInput;
    const dayInput = inputDate.getDate();
    const dayValue = dayInput <= 9 ? `0${dayInput}` : dayInput;
    const value = `${yearValue}-${monthValue}-${dayValue}`;
    return value;
  };
  render() {
    const { data } = this.props;
    const { loading } = this.props;
    return (
      <BoxHtV1 type="block" mb="2rem">
        <SectionHtV1 display="flex" pt="1.25rem" mb="0" height="auto">
          <ContainerHtV1 type="container" pr="0" pl="0" width="100%">
            <RowHtV1 display="block" mr="0" ml="0" mb="1.5rem">
              <BoxHtV1 col="3" mr="1rem" width="25%" float="left">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </BoxHtV1>
              <BoxHtV1 col="3" mr="1rem" width="25%" float="left">
                <Select
                  placeholder="Select Case Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </BoxHtV1>
              <BoxHtV1 col="1" mr="1rem" width="8.33%" float="left">
                <ButtonHtV1
                  disabled={loading}
                  onClick={this.getFilteredCases}
                  border="1px solid #f15a22"
                  color="#f15a22"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  bg="#fff"
                  height="38px"
                  fontSize="16px"
                >
                  {loading ? 'Please Wait ...' : 'Find'}
                </ButtonHtV1>
              </BoxHtV1>
            </RowHtV1>
            <RowHtV1 display="block" mr="0" ml="0" mb="32px" width="972px" bg="colors.white">
              {data.map((item, index) => (
                <BoxHtV1
                  col="12"
                  key={String(index)}
                  width={1}
                  height="124px"
                  mb={32}
                  sx={{
                    boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.13)',
                    border: '0.2px solid #595858',
                  }}
                >
                  <ButtonHtV1
                    ta="left"
                    size="block"
                    p="0"
                    bg="#fff"
                    margin="16px 25px 28px 40px"
                    onClick={() => this.handleClick(index)}
                  >
                    <ColHtV1>
                      <RowHtV1
                        justifyContent="space-between"
                        pb={9}
                        sx={{
                          borderBottom: 'divider'
                        }}
                      >
                        <HeadingHtV1 color="#474747" fontSize={16} fontWeight="bold" variant="profileDashBoard">
                          {`Case No . ${item.caseNumber || 'NA'}`}
                        </HeadingHtV1>
                        <BoxHtV1 color="#474747" fontSize={16} fontWeight="bold" variant="profileDashBoard">
                          {`${item.status || 'NA'}`}
                        </BoxHtV1>
                      </RowHtV1>
                      <RowHtV1 justifyContent="space-between" pt={17} pb={15}>
                        <TextHtV1 color="#474747" fontSize={14} fontWeight="bold" variant="profileDashBoard">
                          DATE CREATED
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={14} fontWeight="bold" variant="profileDashBoard">
                          SUBJECT
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={14} fontWeight="bold" variant="profileDashBoard">
                          TYPE
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={14} fontWeight="bold" variant="profileDashBoard">
                          CATEGORY
                        </TextHtV1>
                      </RowHtV1>
                      <RowHtV1 justifyContent="space-between" mb={32}>
                        <TextHtV1 color="#474747" fontSize={16} variant="profileDashBoard">
                          {item.CreatedDate || ''}
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={16} variant="profileDashBoard">
                          {item.subject || ''}
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={16} variant="profileDashBoard">
                          {item.type || ''}
                        </TextHtV1>
                        <TextHtV1 color="#474747" fontSize={16} variant="profileDashBoard">
                          {this.getMapping(item.category, item.subcategory, 'cat')}
                        </TextHtV1>
                      </RowHtV1>
                    </ColHtV1>
                  </ButtonHtV1>
                </BoxHtV1>
              ))}
            </RowHtV1>
          </ContainerHtV1>
        </SectionHtV1>
      </BoxHtV1>
    );
  }
}

MyCasesContainer.defaultProps = {
  data: [],
  loading: false,
  updated: false,
  salesforce_account_id: '',
  contactNumber: ''
};

MyCasesContainer.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  updated: PropTypes.bool, //eslint-disable-line
  salesforce_account_id: PropTypes.string,
  contactNumber: PropTypes.string,
  loadMyCases: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCasesContainer);
