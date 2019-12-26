import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import CasesFormContainer from 'newComponents/MyOrder/CasesForm';
import ResponsiveModal from 'newComponents/Modal';
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
      <BoxHtV1 mb="2.5rem" className={styles.blockWrapper}>
        <RowHtV1 type="block" margin="0px 0px 1rem" className={styles.blockHeading}>
          <BoxHtV1 col="6" pt="5px" width="49.8%">
            <HeadingHtV1 fontSize="1.25rem" color="textLight" mb="0px" mt="0px" pb="2px" fontFamily="light">
              Order No. {order.order_number}
            </HeadingHtV1>
          </BoxHtV1>
          {show && (isBob === 0 || isBob === '0') && status !== 'canceled' ? (
            <BoxHtV1 textAlign="right" col="6" pr="5px" width="49.8%">
              <ButtonHtV1
                disabled={trackingLoading && currentOrder === order.order_number}
                fontSize="14px !important"
                hoverColor="white"
                bc="transparent"
                btnType="primary"
                p="5px 10px"
                color="colors.white"
                bg="rgb(249, 141, 41)"
                mr="10px"
                onClick={() => {
                  this.loadTrackingData(order);
                }}
              >
                <ImageHtV1
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
                    <ImageHtV1 className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                  </span>
                ) : (
                  'Track'
                )}
              </ButtonHtV1>
            </BoxHtV1>
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
        </RowHtV1>
        <BoxHtV1 className={styles.blockBody}>
          <RowHtV1 type="block" m="0" mb="0.5rem">
            <BoxHtV1 col="3" pr="15px" width="25%">
              <TextHtV1 mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium" mb="0.625rem">
                ORDER DATE
              </TextHtV1>
              <TextHtV1 mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="regular" mb="0.625rem">
                {order.order_date}
              </TextHtV1>
            </BoxHtV1>
            <BoxHtV1 col="3" pr="15px" width="25%">
              <TextHtV1 mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium" mb="0.625rem">
                SHIPPING ADDRESS
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.s_customer_first_name || ''} ${order.s_customer_last_name || ''}`}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_address_1 || ''}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_city || ''}, {order.s_pincode || ''}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.s_region || ''}
              </TextHtV1>
            </BoxHtV1>
            <BoxHtV1 col="3" pr="15px" width="25%">
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                BILLING ADDRESS
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {`${order.b_customer_first_name || ''} ${order.b_customer_last_name || ''}`}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_address_1 || ''}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_city || ''}, {order.b_pincode || ''}
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.b_region || ''}
              </TextHtV1>
            </BoxHtV1>
            <BoxHtV1 col="3" pr="15px" width="25%">
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER AMOUNT
              </TextHtV1>
              <TextHtV1 mt="0" mb="0.625rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                Rs. {formatAmount(order.grand_total)}
              </TextHtV1>
            </BoxHtV1>
          </RowHtV1>
          <RowHtV1 type="block" m="0">
            <BoxHtV1 col="12" width="100%">
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
                          <ImageShimmerHtV1 src={getImageURL(item.image, 'catalog_360')}>
                            {imageURL => (
                              <ImageHtV1 src={imageURL} alt={item.product_name} width="60px" height="60px" />
                            )}
                          </ImageShimmerHtV1>
                        </td>
                        <td width="50%">
                          <TextHtV1 mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                            {item.product_name || '--'}
                          </TextHtV1>
                        </td>
                        <td>
                          <TextHtV1 mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                            {item.quantity || '--'}
                          </TextHtV1>
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
                            <BoxHtV1 ta="right">
                              <ButtonHtV1
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
                              </ButtonHtV1>
                            </BoxHtV1>
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
            </BoxHtV1>
          </RowHtV1>
        </BoxHtV1>
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
      </BoxHtV1>
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
