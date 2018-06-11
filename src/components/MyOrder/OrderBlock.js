import React from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';

const styles = require('./MyOrder.scss');

const OrderBlock = () => (
  <Div mb="2.5rem">
    <Row type="block" m="0" mb="1rem">
      <Div col="12">
        <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="300">
          Order No. 401261676
        </Heading>
      </Div>
    </Row>
    <Div className={styles.blockWrapper}>
      <Row type="block" m="0" mb="0.5rem">
        <Div col="2">
          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="600">
            ORDER DATE
          </Text>
          <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="300">
            16 Jan 2018
          </Text>
        </Div>
        <Div col="2">
          <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="600">
            ORDER AMOUNT
          </Text>
          <Text mt="0" color="rgba(0, 0, 0, 0.6)" fontFamily="300">
            Rs. 1,49,700
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
              <tr>
                <td>
                  <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                </td>
                <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                <td>Dispatched at 2:35 PM, 16 Jan</td>
                <td>Bluedart</td>
                <td>AG567TG</td>
                <td>
                  <Button fontSize="0.875rem" fontFamily="300" color="#ae8873" btnType="link">
                    Track Now
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                </td>
                <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                <td>Dispatched at 2:35 PM, 16 Jan</td>
                <td>Bluedart</td>
                <td>AG567TG</td>
                <td>
                  <Button fontSize="0.875rem" fontFamily="300" color="#ae8873" btnType="link">
                    Track Now
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                </td>
                <td>Ambra King Bed in Engineered Wood with Box Storage</td>
                <td>Dispatched at 2:35 PM, 16 Jan</td>
                <td>Bluedart</td>
                <td>AG567TG</td>
                <td>
                  <Button fontSize="0.875rem" fontFamily="300" color="#ae8873" btnType="link">
                    Track Now
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Div>
      </Row>
    </Div>
  </Div>
);

export default OrderBlock;
