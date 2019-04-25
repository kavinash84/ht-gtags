import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Button from 'hometown-components/lib/Buttons';
import CasesForm from 'components/MyOrder/CasesForm';
import ResponsiveModal from 'components/Modal';
import { formatAmount } from 'utils/formatters';
import { getImageURL } from 'utils/helper';

const PinIcon = require('../../../static/map-icon-white.svg');
const styles = require('./MyOrder.scss');

@connect(({ cases }) => ({
  ordercase: cases.ordercase || {}
}))
class OrderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCaseModal: false
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
  handleChange = key => {
    const newState = {};
    newState[key] = !this.state[key];
    this.setState(newState);
  };
  render() {
    const {
      order,
      ordercase: { loaded, loading }
    } = this.props;
    // const { openSuccessModal } = this.state;
    return (
      <Div mb="2.5rem" className={styles.blockWrapper}>
        <Row type="block" m="0" mb="1rem" className={styles.blockHeading}>
          <Div col="6" pt="5px">
            <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              Order No. {order.order_number}
            </Heading>
          </Div>
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
            <Div col="2">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER DATE
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                {order.order_date}
              </Text>
            </Div>
            <Div col="3">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                SHIPPING ADDRESS
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                {`${order.customer_first_name} ${order.customer_last_name !== null ? order.customer_last_name : ''}`}
                <br />
                {order.s_address_1}
                <br />
                {order.s_city}, {order.s_pincode}
                <br />
                {order.s_region}
                <br />
              </Text>
            </Div>
            <Div col="3">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                BILLING ADDRESS
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                {`${order.customer_first_name} ${order.customer_last_name !== null ? order.customer_last_name : ''}`}
                <br />
                {order.b_address_1}
                <br />
                {order.b_city}, {order.b_pincode}
                <br />
                {order.b_region}
                <br />
              </Text>
            </Div>
            <Div col="2">
              <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
                ORDER AMOUNT
              </Text>
              <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="light">
                Rs. {formatAmount(order.grand_total)}
              </Text>
            </Div>
          </Row>
          <Row type="block" m="0">
            <Div col="12">
              <table className="ordersTable table">
                <tbody>
                  <tr className={styles.tableHeading}>
                    <th style={{ minWidth: '70px' }} colSpan="2">
                      PRODUCTS
                    </th>
                    {/* <th style={{ minWidth: '150px' }}>Order Status</th> */}
                    <th style={{ minWidth: '200px' }}>Delivery Estimate</th>
                    <th style={{ minWidth: '180px' }} />
                    {/* <th>Carrier</th>
                    <th>Tracking ID</th> */}
                  </tr>
                  {order.order_items &&
                    order.order_items.map(item => (
                      <tr key={item.order_item_id}>
                        <td style={{ minWidth: '70px' }}>
                          <ImageShimmer src={getImageURL(item.image, 'catalog_360')} height="49px">
                            {imageURL => <Img src={imageURL} alt={item.product_name} />}
                          </ImageShimmer>
                        </td>
                        <td width="50%">{item.product_name || 'NOT AVAILABLE'}</td>
                        {/* <td>{item.order_item_status_display_name || 'NOT AVAILABLE'}</td> */}
                        <td>{item.order_item_status_display_name !== 'Cancelled' ? item.delivery_date_text : '--'}</td>
                        <td>
                          <Div>
                            <Button
                              fontSize="14px !important"
                              color="#ae8873"
                              hoverColor="white"
                              bc="transparent"
                              btnType="primary"
                              p="5px 10px"
                              mr="10px"
                              onClick={this.handleModal}
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
                              Track
                            </Button>
                            <Button
                              fontSize="14px !important"
                              hoverColor="white"
                              color="rgba(0,0,0,0.5)"
                              bc="rgba(0,0,0,0.5)"
                              btnType="btnOutline"
                              p="5px 20px"
                              onClick={() => {
                                this.handleChange('openCaseModal');
                              }}
                            >
                              Help
                            </Button>
                          </Div>
                        </td>
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
          classNames={{ modal: 'signupModal' }}
          onCloseModal={e => {
            e.preventDefault();
            this.handleChange('openCaseModal');
          }}
          open={this.state.openCaseModal}
        >
          <CasesForm loading={loading} loaded={loaded} />
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
  ordercase: PropTypes.object
};
export default OrderBlock;
