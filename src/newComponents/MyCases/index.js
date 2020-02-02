import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * Helpers / Modules
 */
import { getDateFilters } from 'utils/helper';
import { loadMyCases } from 'redux/modules/mycases';

const caseMapping = require('../../data/case-reverse-mapping');

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
      <Box>
        <Row mb="1.5rem">
          <Col variant="col-3">
            <Select
              placeholder="Select From Date"
              defaultValue={null}
              value={this.state.dateFilter}
              onChange={this.onChangeDate}
              options={getDateFilters(this.FILTER_CONFIG)}
            />
          </Col>
          <Col variant="col-3">
            <Select
              placeholder="Select Case Status"
              defaultValue={null}
              value={this.state.caseStatus}
              onChange={this.onStatusChange}
              options={this.STATUS_FILTER}
            />
          </Col>
          <Col variant="col-3">
            <Button disabled={loading} onClick={this.getFilteredCases} variant="outline.primary">
              {loading ? 'Please Wait...' : 'Find'}
            </Button>
          </Col>
        </Row>
        {data.map((item, index) => (
          <Box
            key={String(index)}
            width={1}
            px={20}
            mb={32}
            sx={{
              boxShadow: 'profile',
              border: 'light'
            }}
            onClick={() => this.handleClick(index)}
          >
            <Row mx={0} py={16} justifyContent="space-between" sx={{ borderBottom: 'light' }}>
              <Col>
                <Text variant="text.regular">{`Case No . ${item.caseNumber || 'NA'}`}</Text>
              </Col>
              <Col>
                <Text variant="text.regular">{`${item.status || 'NA'}`}</Text>
              </Col>
            </Row>
            <Box py={16}>
              <Row mx={0} mb={16}>
                <Col variant="col-2">
                  <Text variant="heading.small">DATE CREATED</Text>
                </Col>
                <Col variant="col-3">
                  <Text variant="heading.small">SUBJECT</Text>
                </Col>
                <Col variant="col-3">
                  <Text variant="heading.small">TYPE</Text>
                </Col>
                <Col variant="col-4">
                  <Text variant="heading.small">CATEGORY</Text>
                </Col>
              </Row>
              <Row mx={0}>
                <Col variant="col-2">
                  <Text variant="text.regular">{item.CreatedDate || ''}</Text>
                </Col>
                <Col variant="col-3">
                  <Text variant="text.regular">{item.subject || ''}</Text>
                </Col>
                <Col variant="col-3">
                  <Text variant="text.regular">{item.type || ''}</Text>
                </Col>
                <Col variant="col-4">
                  <Text variant="text.regular">{this.getMapping(item.category, item.subcategory, 'cat')}</Text>
                </Col>
              </Row>
            </Box>
          </Box>
        ))}
      </Box>
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
