import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Div from 'hometown-components-dev/lib/Div';
import Heading from 'hometown-components-dev/lib/Heading';
import Row from 'hometown-components-dev/lib/Row';
import Text from 'hometown-components-dev/lib/Text';
import Img from 'hometown-components-dev/lib/Img';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import Button from 'hometown-components-dev/lib/Buttons';
import CasesForm from 'components/MyOrder/CasesForm';
import ResponsiveModal from 'components/Modal';
import { formatAmount } from 'utils/formatters';
import { getImageURL } from 'utils/helper';
import TrackingTimeline from './TrackingTimeline';

const PinIcon = require('../../../static/map-icon-white.svg');
const LoaderIcon = require('../../../static/refresh-black.svg');
const styles = require('./MyOrder.scss');

const mapStateToProps = ({ cases, tracking }) => ({
  ordercase: cases.ordercase || {},
  trackingLoading: tracking.trackingLoading,
  trackingLoaded: tracking.trackingLoaded,
  currentOrder: tracking.currentOrder,
  data: tracking.data
});
class OrderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCaseModal: false,
      caseItem: {},
      orderItem: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.ordercase;
    if (loaded && !loading) {
      this.setState({
        openCaseModal: false
      });
    }
  }
  handleChange = (key, caseItem = {}, orderItem = {}) => {
    const newState = {};
    newState[key] = !this.state[key];
    this.setState({
      ...newState,
      caseItem,
      orderItem
    });
  };
  loadTrackingData = order => {
    const { loadOrdersTracking, setCurrentOrder } = this.props;
    const { order_number: orderNumber = '' } = order;
    setCurrentOrder(orderNumber);
    loadOrdersTracking(orderNumber);
  };
  render() {
    const {
      order,
      ordercase: { loaded, loading },
      trackingLoading,
      trackingLoaded,
      data,
      closeModal,
      currentOrder
    } = this.props;
    // const { openSuccessModal } = this.state;
    const { show_track_order: show = '', bob_order: isBob = '', status } = order;
    const items = data.order_items || [];
    const error = data.error || '';
    return (
      <Div mb="2.5rem" className={styles.blockWrapper}>
        <Row type="block" m="0" mb="1rem" className={styles.blockHeading}>
          <Div col="6" pt="5px">
            <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              Order No. {order.order_number}
            </Heading>
          </Div>
          {show && (isBob === 0 || isBob === '0') && status !== 'canceled' ? (
            <Div ta="right" col="6" pr="5px">
              <Button
                disabled={trackingLoading && currentOrder === order.order_number}
                fontSize="14px !important"
                color="#ae8873"
                hoverColor="white"
                bc="transparent"
                btnType="primary"
                p="5px 10px"
                mr="10px"
                onClick={() => {
                  this.loadTrackingData(order);
                }}
              >
                <Img
                  src={PinIcon}
                  alt="Track"
                  height="16px"
                  position="relative"
                  top="4px"
                  mr="0.3125rem"
                  float="left"
                />
                {trackingLoading && currentOrder === order.order_number ? (
                  <span>
                    Please Wait
                    <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                  </span>
                ) : (
                  'Track'
                )}
              </Button>
            </Div>
          ) : (
            ''
          )}
          {/* <Div col="6" ta="right">
            <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              <Button
                fontSize="0.875rem"
                color="#ae8873"
                hoverColor="white"
                bc="transparent"
                btnType="primary"
                p="5px 10px"
                mr="10px"
                onClick={() => {}}
              >
                <Img
                  src={PinIcon}
                  alt="Track"
                  height="16px"
                  position="relative"
                  top="2px"
                  mr="0.3125rem"
                  float="left"
                />
                Track
              </Button>
              <Button
                fontSize="0.875rem"
                hoverColor="white"
                color="rgba(0,0,0,0.5)"
                bc="rgba(0,0,0,0.5)"
                btnType="btnOutline"
                p="5px 20px"
                onClick={e => {
                  e.preventDefault();
                  this.handleChange('openCaseModal');
                }}
              >
                Help
              </Button>
            </Heading>
          </Div> */}
        </Row>
        <Div className={styles.blockBody}>
          <Row type="block" m="0" mb="0.5rem">
            <Div col="3" pr="15px">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER DATE
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.order_date}
              </Text>
            </Div>
            <Div col="3" pr="15px">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                SHIPPING ADDRESS
              </Text>
              <Text mt="0" mb="0" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.s_customer_first_name || ''} ${order.s_customer_last_name || ''}`}
                <br />
                {order.s_address_1 || ''}
                <br />
                {order.s_city || ''}, {order.s_pincode || ''}
                <br />
                {order.s_region || ''}
                <br />
              </Text>
            </Div>
            <Div col="3" pr="15px">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                BILLING ADDRESS
              </Text>
              <Text mt="0" mb="0" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.b_customer_first_name || ''} ${order.b_customer_last_name || ''}`}
                <br />
                {order.b_address_1 || ''}
                <br />
                {order.b_city || ''}, {order.b_pincode || ''}
                <br />
                {order.b_region || ''}
                <br />
              </Text>
            </Div>
            <Div col="3" pr="15px">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER AMOUNT
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                Rs. {formatAmount(order.grand_total)}
              </Text>
            </Div>
          </Row>
          <Row type="block" m="0">
            <Div col="12">
              <table className="ordersTable table">
                <tbody>
                  <tr className={styles.tableHeading}>
                    <th colSpan="2">Products</th>
                    {<th style={{ minWidth: '150px' }}>Qty</th>}
                    <th>Delivery Estimate</th>
                    <th />
                    {/* <th>Carrier</th>
                    <th>Tracking ID</th> */}
                  </tr>
                  {order.order_items &&
                    order.order_items.map(item => (
                      <tr key={item.order_item_id}>
                        <td width="81px">
                          <ImageShimmer src={getImageURL(item.image, 'catalog_360')} height="60px">
                            {imageURL => <Img src={imageURL} alt={item.product_name} width="60px" height="60px" />}
                          </ImageShimmer>
                        </td>
                        <td width="50%">
                          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                            {item.product_name || '--'}
                          </Text>
                        </td>
                        {
                          <td>
                            <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                              {item.quantity || '--'}
                            </Text>
                          </td>
                        }
                        <td>
                          {order.status !== 'canceled' ? (
                            item.delivery_date_text || '--'
                          ) : (
                            <span style={{ color: 'red' }}> Cancelled </span>
                          )}
                        </td>
                        {item.bob_order_item === 0 || item.bob_order_item === '0' ? (
                          <td>
                            <Div ta="right">
                              <Button
                                fontSize="14px !important"
                                hoverColor="white"
                                color="rgba(0,0,0,0.5)"
                                bc="rgba(0,0,0,0.5)"
                                btnType="btnOutline"
                                p="5px 20px"
                                onClick={() => {
                                  this.handleChange('openCaseModal', item, order);
                                }}
                              >
                                Help
                              </Button>
                            </Div>
                          </td>
                        ) : (
                          ''
                        )}
                        {/* <td>{item.carrier_name || 'NOT AVAILABLE'}</td>
                      <td>{item.tracking_id || 'NOT AVAILABLE'}</td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </Div>
          </Row>
        </Div>
        <ResponsiveModal
          classNames={{ modal: 'casesModal' }}
          onCloseModal={e => {
            e.preventDefault();
            this.handleChange('openCaseModal');
          }}
          open={this.state.openCaseModal}
        >
          <CasesForm
            loading={loading}
            loaded={loaded}
            caseItem={this.state.caseItem}
            orderItem={this.state.orderItem}
          />
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{ modal: 'trackingModal' }}
          onCloseModal={e => {
            e.preventDefault();
            closeModal();
          }}
          open={trackingLoaded && currentOrder === order.order_number}
        >
          <TrackingTimeline error={error} data={items} />
        </ResponsiveModal>
      </Div>
    );
  }
}
OrderBlock.defaultProps = {
  ordercase: {}
};
OrderBlock.propTypes = {
  order: PropTypes.object.isRequired,
  ordercase: PropTypes.object,
  loadOrdersTracking: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  trackingLoading: PropTypes.bool.isRequired,
  trackingLoaded: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  currentOrder: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null
)(OrderBlock);
