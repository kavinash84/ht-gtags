import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
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
      <Box>
        <Section mt={0} pt="1.25rem" mb={0} height="auto">
          <Box pr="0.5rem" pl="0.5rem" width={1}>
            <Row mr={0} ml={0} mb="1.5rem">
              <Box mr="1rem" width="25%" float="left">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </Box>
              <Box mr="1rem" width="25%" float="left">
                <Select
                  placeholder="Select Case Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Box>
              <Box mr="1rem" width="8.33%">
                <Button
                  disabled={loading}
                  onClick={this.getFilteredCases}
                  border="1px solid"
                  color="colors.white"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  bg="rgb(249, 141, 41)"
                  height="38px"
                  fontSize="16px"
                >
                  {loading ? 'Please Wait ...' : 'Find'}
                </Button>
              </Box>
            </Row>
            {data.map((item, index) => (
              <Box mb="2.5rem" className={styles.blockWrapper} key={String(index)}>
                {/* <Button
                  ta="left"
                  size="block"
                  border="1px solid rgba(151, 151, 151, 0.47)"
                  bc="rgba(151, 151, 151, 0.47)"
                  btnType="btnOutline"
                  p={0}
                  onClick={() => this.handleClick(index)}
                > */}
                <Row m={0} className={styles.blockHeading}>
                  <Box width={1 / 2}>
                    <Heading fontSize="1rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
                      {`Case No - ${item.caseNumber || 'NA'}`}
                    </Heading>
                  </Box>
                  <Box width={1 / 2} textAlign="right">
                    {`Status - ${item.status || 'NA'}`}
                  </Box>
                </Row>
                <Row className={styles.blockBody}>
                  <Box width={3 / 12} pr={10}>
                    <Text mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                      Created Date
                    </Text>
                    <Text mt={8} color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                      {item.CreatedDate || ''}
                    </Text>
                  </Box>
                  <Box width={3.5 / 12} pr={10}>
                    <Text whiteSpace="normal" mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                      Subject
                    </Text>
                    <Text whiteSpace="normal" mt={8} color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                      {item.subject || ''}
                    </Text>
                  </Box>
                  <Box width={2.5 / 12} pr={10}>
                    <Text whiteSpace="normal" mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                      Type
                    </Text>
                    <Text whiteSpace="normal" mt={8} color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                      {item.type || ''}
                    </Text>
                  </Box>
                  <Box width={3 / 12} pr={10}>
                    <Text whiteSpace="normal" mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                      Category
                    </Text>
                    <Text whiteSpace="normal" mt={8} color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                      {this.getMapping(item.category, item.subcategory, 'cat')}
                    </Text>
                  </Box>
                </Row>
                {/* </Button> */}
              </Box>
            ))}
          </Box>
        </Section>
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
