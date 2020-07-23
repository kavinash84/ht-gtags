import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import CasesFormContainer from 'components/MyOrder/CasesForm';
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
      <Box mb="2.5rem" className={styles.blockWrapper}>
        <Row margin={0} className={styles.blockHeading}>
          <Box col="6" pt="5px" width="49.8%">
            <Heading fontSize="1.25rem" color="textLight" mb={0} mt={0} pb={2} fontFamily="light">
              Order No. {order.order_number}
            </Heading>
          </Box>
          {show && (isBob === 0 || isBob === '0') && status !== 'canceled' ? (
            <Box textAlign="right" col="6" width="49.8%">
              <Button
                disabled={trackingLoading && currentOrder === order.order_number}
                onClick={() => {
                  this.loadTrackingData(order);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginLeft: 'auto'
                }}
              >
                <Image src={PinIcon} alt="Track" height={16} position="relative" top={4} mr={5} float="left" />
                {trackingLoading && currentOrder === order.order_number ? (
                  <Fragment>
                    Please Wait
                    <Image className="spin" ml={5} src={LoaderIcon} display="inline" width={18} />
                  </Fragment>
                ) : (
                    'Track'
                  )}
              </Button>
            </Box>
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
        <Box className={styles.blockBody}>
          <Row m={0} mb="0.5rem">
            <Box col="3" pr={15} width="25%">
              <Text mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium" mb="0.625rem">
                ORDER DATE
              </Text>
              <Text mt={0} color="rgba(0, 0, 0, 0.6)" fontFamily="regular" mb="0.625rem">
                {order.order_date}
              </Text>
            </Box>
            <Box col="3" pr="15px" width="25%">
              <Text mt={0} color="rgba(0, 0, 0, 0.7)" fontFamily="medium" mb="0.625rem">
                SHIPPING ADDRESS
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.s_customer_first_name || ''} ${order.s_customer_last_name || ''}`}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_address_1 || ''}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_city || ''}, {order.s_pincode || ''}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_region || ''}
              </Text>
            </Box>
            <Box col="3" pr="15px" width="25%">
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                BILLING ADDRESS
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.b_customer_first_name || ''} ${order.b_customer_last_name || ''}`}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_address_1 || ''}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_city || ''}, {order.b_pincode || ''}
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_region || ''}
              </Text>
            </Box>
            <Box col="3" pr="15px" width="25%">
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER AMOUNT
              </Text>
              <Text mt={0} mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                Rs. {formatAmount(order.grand_total)}
              </Text>
            </Box>
          </Row>
          {/* {order.order_items &&
            order.order_items.map(item => (
              <Flex pb={20}>
                <Box variant="col-4" pr={0} pl={0}>
                  <ImageShimmer src={getImageURL(item.image, 'catalog_360')}>
                    {imageURL => <Image src={imageURL} alt={item.product_name} width="60px" height="60px" />}
                  </ImageShimmer>
                </Box>
                <Box variant="col-8" pl={20}>
                  <Box mb="10px">
                    <Heading color="heading" fontSize={[14, 14, 14, 16]} lineHeight={1.4} pb={10}>
                      {item.product_name || '--'}
                    </Heading>
                    <Text fontSize={14} pb={10}>
                      {order.status !== 'canceled' ? (
                        item.delivery_date_text || '--'
                      ) : (
                        <span style={{ color: 'red' }}> Cancelled </span>
                      )}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            ))} */}
          <Row type="block" m="0">
            <Box col="12" width="100%">
              <table className="ordersTable table">
                <tbody>
                  <tr className={styles.tableHeading}>
                    <th colSpan="2">Products</th>
                    <th style={{ minWidth: '150px' }}>Qty</th>
                    <th>Delivery Estimate</th>
                    <th />
                    {/* <th>Carrier</th>
                    <th>Tracking ID</th> */}
                  </tr>
                  {order.order_items &&
                    order.order_items.map(item => (
                      <tr key={item.order_item_id}>
                        <td width="81px">
                          <ImageShimmer src={getImageURL(item.image, 'catalog_360')}>
                            {imageURL => <Image src={imageURL} alt={item.product_name} width="60px" height="60px" />}
                          </ImageShimmer>
                        </td>
                        <td width="50%">
                          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                            {item.product_name || '--'}
                          </Text>
                        </td>
                        <td>
                          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                            {item.quantity || '--'}
                          </Text>
                        </td>
                        <td>
                          {order.status !== 'canceled' ? (
                            item.delivery_date_text || '--'
                          ) : (
                              <span style={{ color: 'red' }}> Cancelled </span>
                            )}
                        </td>
                        {item.bob_order_item === 0 || item.bob_order_item === '0' ? (
                          <td>
                            <Box ta="right">
                              <Button
                                sx={{
                                  ':hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white'
                                  },
                                  fontSize: '14px !important',
                                  color: 'rgba(0,0,0,0.5)',
                                  p: '5px 20px',
                                  borderRadius: '3px',
                                  border: '1px solid',
                                  bg: 'white',
                                  btnType: 'btnOutline'
                                }}
                                onClick={() => {
                                  this.handleChange('openCaseModal', item, order);
                                }}
                              >
                                Help
                              </Button>
                            </Box>
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
            </Box>
          </Row>
        </Box>
        <ResponsiveModal
          classNames={{ modal: 'casesModal' }}
          onCloseModal={e => {
            e.preventDefault();
            this.handleChange('openCaseModal');
          }}
          open={this.state.openCaseModal}
        >
          <CasesFormContainer
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
      </Box>
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
export default connect(mapStateToProps, null)(OrderBlock);
