import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
// import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import { getDateFilters } from 'utils/helper';
import { loadMyOrders } from 'redux/modules/orders';
import { loadOrdersTracking, closeModal } from 'redux/modules/tracking';
// import { Label } from 'hometown-components/lib/Label';
import MyMenu from 'components/MyMenu';
import Button from 'hometown-components/lib/Buttons';
import OrderBlock from './OrderBlock';

// import ProductItems from '../../data/RecentlyViewedProducts.js';
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadMyOrders,
      loadOrdersTracking,
      closeModal
    },
    dispatch
  );
const mapStateToProps = ({
  orders,
  profile: {
    data: { contact_number: contactNumber }
  }
}) => ({
  results: orders.data,
  loading: orders.loading,
  loaded: orders.loaded,
  contactNumber
});

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      orderStatus: '',
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
      orderStatus: { value: status, label: status }
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
  getFilteredOrders = e => {
    e.preventDefault();
    const {
      startDate,
      endDate,
      orderStatus: { value: orderStatus }
    } = this.state;
    const { contactNumber } = this.props;
    console.log(`${startDate}${endDate}${orderStatus}`);
    this.props.loadMyOrders(contactNumber, startDate, endDate);
  };
  render() {
    const {
      results, loading, loadOrdersTracking: loadTrackingDetails, closeModal: closeTrackingModal
    } = this.props;
    return (
      <Div type="block">
        <MyMenu page="order" />
        <Section display="flex" pt="1.25rem" mb="0" height="auto">
          <Container type="container" pr="0.5rem" pl="0.5rem">
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
              <Div col="3" mr="1rem" hide>
                <Select
                  placeholder="Select Case Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Div>
              <Div col="2" mr="1rem">
                <Button
                  disabled={loading}
                  onClick={this.getFilteredOrders}
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
            {results.map(item => (
              <OrderBlock
                key={item.order_item_id}
                order={item}
                loadOrdersTracking={loadTrackingDetails}
                closeModal={closeTrackingModal}
              />
            ))}
          </Container>
        </Section>
      </Div>
    );
  }
}
MyOrder.defaultProps = {
  results: [],
  loading: false,
  contactNumber: ''
};
MyOrder.propTypes = {
  results: PropTypes.array,
  contactNumber: PropTypes.string,
  loading: PropTypes.bool,
  loadMyOrders: PropTypes.func.isRequired,
  loadOrdersTracking: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrder);
