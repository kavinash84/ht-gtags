import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
// import { Label } from 'hometown-components/lib/Label';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
// import { isEmpty } from 'utils/validation';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
import MyMenu from 'components/MyMenu';
import { getDateFilters } from 'utils/helper';
import { loadMyCases } from 'redux/modules/mycases';
import { caseMapping } from '../../data/case-reverse-mapping';

const styles = require('../MyOrder/MyOrder.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ loadMyCases }, dispatch);
const mapStateToProps = ({ mycases, profile }) => ({
  ...mycases,
  useremail: profile.data.email,
  mycases,
  contactNumber: profile.data.contact_number,
  salesforce_product_interest_id: profile.data.salesforce_product_interest_id
});
class MyCases extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
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
      { value: 'Resolved', label: 'Resolved' }
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
    const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
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
    const { salesforce_product_interest_id: sfid } = this.props;
    this.props.loadMyCases(sfid, startDate, endDate, caseStatus);
  };
  getMapping = (cat = '', subcat = '', type = '') => {
    let value = '';
    if (cat && subcat) {
      const key = `${cat}-${subcat}`;
      const item = caseMapping[key] || {};
      value = item[type] || '';
    }
    return value;
  };
  render() {
    const { data } = this.props;
    const { loading } = this.props;
    return (
      <Div type="block" mb="2rem">
        <MyMenu page="address" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0" mb="1.5rem">
              <Div col="3" mr="1rem">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </Div>
              <Div col="3" mr="1rem">
                <Select
                  placeholder="Select Case Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Div>
              <Div col="1" mr="1rem">
                <Button
                  disabled={loading}
                  onClick={this.getFilteredCases}
                  border="1px solid"
                  color="red"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  btnColor="#515151"
                  height="38px"
                  fontSize="16px"
                >
                  {loading ? 'Please Wait ...' : 'Find'}
                </Button>
              </Div>
            </Row>
            <Row display="block" mr="0" ml="0">
              {data.map((item, index) => (
                <Div col="12" key={String(index)} mb="20px">
                  <Button
                    ta="left"
                    size="block"
                    border="1px solid rgba(151, 151, 151, 0.47)"
                    bc="rgba(151, 151, 151, 0.47)"
                    btnType="btnOutline"
                    p="0"
                    onClick={() => this.handleClick(index)}
                  >
                    <Row type="block" m="0" mb="1rem" className={styles.blockHeading} p="15px 15px !important">
                      <Div col="6">
                        <Heading fontSize="1rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
                          {`Case No - ${item.caseNumber || 'NA'}`}
                        </Heading>
                      </Div>
                      <Div col="6" ta="right">
                        {`Status - ${item.status || 'NA'}`}
                      </Div>
                    </Row>
                    <Row p="15px 15px" type="block" m="0" mb="0.5rem">
                      <Div col="2">
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                          Subject
                        </Text>
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                          {item.subject || ''}
                        </Text>
                      </Div>
                      <Div col="2">
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                          Type
                        </Text>
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                          {item.type || ''}
                        </Text>
                      </Div>
                      <Div col="2">
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                          Category
                        </Text>
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                          {this.getMapping(item.category, item.subcategory, 'cat')}
                        </Text>
                      </Div>
                      <Div col="2">
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                          SubCategory
                        </Text>
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                          {this.getMapping(item.category, item.subcategory, 'subcat')}
                        </Text>
                      </Div>
                      <Div col="4">
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                          Description
                        </Text>
                        <Text whiteSpace="normal" mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                          {item.description || ''}
                        </Text>
                      </Div>
                    </Row>
                  </Button>
                </Div>
              ))}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

MyCases.defaultProps = {
  data: [],
  loading: false,
  updated: false,
  salesforce_product_interest_id: ''
};

MyCases.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  updated: PropTypes.bool, //eslint-disable-line
  salesforce_product_interest_id: PropTypes.string,
  loadMyCases: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCases);
