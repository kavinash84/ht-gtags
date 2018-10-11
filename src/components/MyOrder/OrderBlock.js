import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { formatAmount } from 'utils/formatters';
import { getImageURL } from 'utils/helper';

const styles = require('./MyOrder.scss');

const OrderBlock = ({ order }) => (
  <Div mb="2.5rem">
    <Row type="block" m="0" mb="1rem">
      <Div col="12">
        <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
          Order No. {order.order_number}
        </Heading>
      </Div>
    </Row>
    <Div className={styles.blockWrapper}>
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
              <tr>
                <th colSpan="2">PRODUCT</th>
                <th>Order Status</th>
                <th>Delivery Estimate</th>
                {/* <th>Carrier</th>
                <th>Tracking ID</th> */}
              </tr>
              {order.order_items.map(item => (
                <tr key={item.order_item_id}>
                  <td width="70px">
                    <ImageShimmer src={getImageURL(item.image, 'catalog_360')} height="60px">
                      {imageURL => <Img src={imageURL} alt={item.product_name} />}
                    </ImageShimmer>
                  </td>
                  <td width="50%">{item.product_name || 'NOT AVAILABLE'}</td>
                  <td>{item.order_item_status_display_name || 'NOT AVAILABLE'}</td>
                  <td>{item.order_item_status_display_name !== 'Cancelled' ? item.delivery_date_text : '--'}</td>

                  {/* <td>{item.carrier_name || 'NOT AVAILABLE'}</td>
                  <td>{item.tracking_id || 'NOT AVAILABLE'}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </Div>
      </Row>
    </Div>
  </Div>
);

OrderBlock.propTypes = {
  order: PropTypes.object.isRequired
};
export default OrderBlock;
