import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
// import Text from 'hometown-components-dev/lib/Text';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import { getDateFilters } from 'utils/helper';
import { loadMyOrders } from 'redux/modules/orders';
import { loadOrdersTracking, closeModal, setCurrentOrder } from 'redux/modules/tracking';
// import { Label } from 'hometown-components-dev/lib/Label';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import OrderBlock from './OrderBlock';

// import ProductItems from '../../data/RecentlyViewedProducts.js';
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadMyOrders,
      loadOrdersTracking,
      closeModal,
      setCurrentOrder
    },
    dispatch
  );
const mapStateToProps = ({
  orders,
  profile: {
    data: { contact_number: contactNumber }
  }
}) => ({
  results: orders.data || [],
  loading: orders.loading,
  loaded: orders.loaded,
  contactNumber
});

class MyOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
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
    // const { label } = dateFilter;
    // const startDate = dateFilter.start ? new Date(dateFilter.start) : '';
    // const endDate = dateFilter.end ? new Date(dateFilter.end) : '';
    // const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    // const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    // this.setState({
    //   dateFilter: { value: label, label },
    //   startDate: start,
    //   endDate: end
    // });
    const { label } = dateFilter;
    if (dateFilter.start && dateFilter.end) {
      const startDate = new Date(dateFilter.start);
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1 <= 9 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
      const startDay = startDate.getDate() <= 9 ? `0${startDate.getDate()}` : startDate.getDate();
      const endDate = new Date(dateFilter.end);
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1 <= 9 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1;
      const endDay = endDate.getDate() <= 9 ? `0${endDate.getDate()}` : endDate.getDate();
      const start = `${startYear}-${startMonth}-${startDay}`;
      const end = `${endYear}-${endMonth}-${endDay}`;
      this.setState({
        dateFilter: { value: label, label },
        startDate: start,
        endDate: end
      });
    } else {
      this.setState({
        dateFilter: { value: label, label },
        startDate: '',
        endDate: ''
      });
    }
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
      results,
      loading,
      loadOrdersTracking: loadTrackingDetails,
      closeModal: closeTrackingModal,
      setCurrentOrder: setOrderNumber
    } = this.props;
    return (
      <BoxHtV1 type="block">
        <SectionHtV1 display="flex" pt="1.25rem" mb="0" height="auto">
          <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
            <RowHtV1 display="block" mr="0" ml="0" mb="1.5rem">
              <BoxHtV1 col="3" mr="1rem" width="25%">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </BoxHtV1>
              {/* <Div col="3" mr="1rem" hide>
                <Select
                  placeholder="Select Order Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Div> */}
              <BoxHtV1 col="2" mr="1rem" width="16.65%">
                <ButtonHtV1
                  disabled={loading}
                  onClick={this.getFilteredOrders}
                  border="1px solid"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  btnColor="#515151"
                  height="38px"
                  width="100%"
                  color="colors.white"
                  bg="rgb(249, 141, 41)"
                  fontSize="16px"
                >
                  {loading ? 'Please Wait ...' : 'Find'}
                </ButtonHtV1>
              </BoxHtV1>
            </RowHtV1>
            {results.map((item, index) => (
              <OrderBlock
                key={`${item.order_item_id}_${String(index)}`}
                order={item}
                loadOrdersTracking={loadTrackingDetails}
                setCurrentOrder={setOrderNumber}
                closeModal={closeTrackingModal}
              />
            ))}
          </ContainerHtV1>
        </SectionHtV1>
      </BoxHtV1>
    );
  }
}
MyOrderContainer.defaultProps = {
  results: [],
  loading: false,
  contactNumber: ''
};
MyOrderContainer.propTypes = {
  results: PropTypes.array,
  contactNumber: PropTypes.string,
  loading: PropTypes.bool,
  loadMyOrders: PropTypes.func.isRequired,
  loadOrdersTracking: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrderContainer);
