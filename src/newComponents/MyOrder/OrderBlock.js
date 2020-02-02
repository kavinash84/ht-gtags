import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * formatters / helper
 */
import { formatAmount } from 'utils/formatters';
import { getImageURL } from 'utils/helper';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * Page Components
 */
import CasesFormContainer from 'newComponents/MyOrder/CasesForm';
import ResponsiveModal from 'newComponents/Modal';
import TrackingTimeline from './TrackingTimeline';

/**
 * Icons
 */
const loaderIcon = require('../../../static/refresh.svg');
const rightArrowIcon = require('../../../static/rightArrow.svg');
const expendIcon = require('../../../static/expand_more_primary.svg');

const DetailTab = props => (
  <Button variant="linkPrimaryBold" height={30} display="flex" justifyContent="center" alignItems="center" {...props} />
);

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
      <Box>
        <Row justifyContent="space-between" alignItems="center" mb={10} mx={0}>
          <Text variant="heading.default">Order No. {order.order_number}</Text>
          {show && (isBob === 0 || isBob === '0') && status !== 'canceled' && (
            <Button
              variant="linkPrimary"
              fontFamily="medium"
              onClick={() => {
                this.loadTrackingData(order);
              }}
              disabled={trackingLoading && currentOrder === order.order_number}
            >
              {trackingLoading && currentOrder === order.order_number ? (
                <Flex alignItems="center">
                  Please Wait
                  <Image className="spin" src={loaderIcon} width="18px" ml={5} />
                </Flex>
              ) : (
                'TRACK ORDER'
              )}
            </Button>
          )}
        </Row>
        {/* Order Box */}
        <Box px={20} mb={40} sx={{ boxShadow: 'profile', border: 'light' }}>
          {order.order_items &&
            order.order_items.map(item => (
              <Box
                py={20}
                sx={{
                  borderBottom: 'light',
                  ':last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                <Row key={item.order_item_id} alignItems="center">
                  <Col width={150}>
                    <ImageShimmer src={getImageURL(item.image, 'catalog_360')} height="120px">
                      {imageURL => (
                        <Image
                          src={imageURL}
                          alt={item.product_name}
                          width="120px"
                          height="120px"
                          sx={{
                            boxShadow: 'productThumb'
                          }}
                        />
                      )}
                    </ImageShimmer>
                  </Col>
                  <Col pl={0} width="calc(100% - 190px)">
                    <Text pb={10} variant="heading.default">
                      {item.product_name || '--'}
                    </Text>
                    <Text pb={10} variant="regular" color="label">
                      Qty: {item.quantity || '--'}
                    </Text>
                    {/* TODO: @sanjeev replace static value */}
                    <Row pb={10} ml={0} mr={0}>
                      <Text pr={10} color="label">
                        ₹12,999
                      </Text>
                      <Text pr={10} color="textLight">
                        ₹33,999
                      </Text>
                      <Text color="primary">Saved ₹ 3,000</Text>
                    </Row>
                    {order.status !== 'canceled' ? (
                      <Text variant="heading.default">{item.delivery_date_text}</Text>
                    ) : (
                      <Text variant="heading.default" color="error">
                        Cancelled
                      </Text>
                    )}
                  </Col>
                  <Col width={40}>
                    <Image src={rightArrowIcon} alt="order" width="7px" height="12px" />
                  </Col>
                  {/* <td>{item.carrier_name || 'NOT AVAILABLE'}</td>
                        <td>{item.tracking_id || 'NOT AVAILABLE'}</td> */}
                </Row>
              </Box>
            ))}
          <Row mx={0} py={5} px={5}>
            <Col flexGrow={1} sx={{ borderRight: 'light' }}>
              <DetailTab
                onClick={() => {
                  this.handleChange('openCaseModal', items, order);
                }}
              >
                HELP
              </DetailTab>
            </Col>
            <Col flexGrow={1}>
              <DetailTab alignItems="flex-end">
                ORDER DETAILS <Image src={expendIcon} alt="Expend Order Details" ml={5} height="18px" />
              </DetailTab>
            </Col>
          </Row>
          <Row sx={{ borderTop: 'light' }} mx={0} px={20} py={15}>
            <Box width={1.5 / 10}>
              <Heading color="label" variant="heading.small" mb={10}>
                ORDER DATE
              </Heading>
              <Text color="label">{order.order_date}</Text>
            </Box>
            <Box width={3 / 10}>
              <Heading color="label" variant="heading.small" mb={10}>
                SHIPPING ADDRESS
              </Heading>
              <Text color="label" lineHeight={1.25}>
                {`${order.s_customer_first_name || ''} ${order.s_customer_last_name || ''}`}
                <br />
                {order.s_address_1 || ''}
                <br />
                {order.s_city || ''}, {order.s_pincode || ''}
                <br />
                {order.s_region || ''}
              </Text>
            </Box>
            <Box width={3 / 10}>
              <Heading color="label" variant="heading.small" mb={10}>
                BILLING ADDRESS
              </Heading>
              <Text color="label" lineHeight={1.25}>
                {`${order.b_customer_first_name || ''} ${order.b_customer_last_name || ''}`}
                <br />
                {order.b_address_1 || ''}
                <br />
                {order.b_city || ''}, {order.b_pincode || ''}
                <br />
                {order.b_region || ''}
              </Text>
            </Box>
            <Box width={2.5 / 10}>
              <Heading color="label" variant="heading.small" mb={10}>
                ORDER AMOUNT
              </Heading>
              <Text color="label">Rs. {formatAmount(order.grand_total)}</Text>
            </Box>
          </Row>
        </Box>
        {/* /Order Box */}
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
