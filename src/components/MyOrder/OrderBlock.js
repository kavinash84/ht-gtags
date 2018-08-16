import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';
import { formatAmount } from 'utils/formatters';

const styles = require('./MyOrder.scss');

const OrderBlock = ({ order }) => (
  <Div mb="2.5rem">
    <Row type="block" m="0" mb="1rem">
      <Div col="12">
        <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="thin">
          Order No. {order.order_id}
        </Heading>
      </Div>
    </Row>
    <Div className={styles.blockWrapper}>
      <Row type="block" m="0" mb="0.5rem">
        <Div col="2">
          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
            ORDER DATE
          </Text>
          <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="thin">
            {order.order_date}
          </Text>
        </Div>
        <Div col="2">
          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="medium">
            ORDER AMOUNT
          </Text>
          <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="thin">
            Rs. {formatAmount(order.grand_total)}
          </Text>
        </Div>
      </Row>
      <Row type="block" m="0">
        <Div col="12">
          <table className="ordersTable">
            <tbody>
              <tr>
                <th colSpan="2">PRODUCT</th>
                <th>Delivery Status</th>
                <th>Carrier</th>
                <th>Tracking ID</th>
                <th>Tracking Link</th>
              </tr>
              {order.order_items.map(item => (
                <tr key={item.order_item_id}>
                  <td>
                    <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                  </td>
                  <td>{item.product_name || 'NOT AVAILABLE'}</td>
                  <td>{item.order_item_status_display_name || 'NOT AVAILABLE'}</td>
                  <td>{item.carrier_name || 'NOT AVAILABLE'}</td>
                  <td>{item.tracking_id || 'NOT AVAILABLE'}</td>
                  <td>
                    <Button fontSize="0.875rem" fontFamily="thin" color="#f98d29" btnType="link">
                      Track Now
                    </Button>
                  </td>
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
