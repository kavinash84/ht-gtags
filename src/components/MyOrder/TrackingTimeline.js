import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components-dev/lib/Div';
import Img from 'hometown-components-dev/lib/Img';
import Row from 'hometown-components-dev/lib/Row';
import Text from 'hometown-components-dev/lib/Text';
import Heading from 'hometown-components-dev/lib/Heading';
import { getImageURL } from 'utils/helper';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';

const statusIcon = require('../../../static/status-pending.svg');
const statusActiveIcon = require('../../../static/status-active.svg');

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const styles = require('./MyOrder.scss');
    const { data, error } = this.props;
    return (
      <div className={stylesModal.trackingModal}>
        <Row type="block" m="0" mb="1rem" className={styles.blockHeading}>
          <Div col="6" pt="5px">
            <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              {error ? 'Error' : 'Order Tracking'}
            </Heading>
          </Div>
        </Row>
        <Div p="25px 25px 13px">
          {error ? (
            <span style={{ color: 'red', padding: '10px' }}>{error}</span>
          ) : (
            data.map((item, index) => {
              const {
                image,
                product_name: name,
                status,
                bill_of_landing: AWB,
                transport_id: transportId,
                quantity
              } = item;
              return (
                <Row
                  className={stylesModal.blockWrapper}
                  type="block"
                  ml="0"
                  mr="0"
                  mb="1rem"
                  pb="15px"
                  key={String(index)}
                >
                  <Div col="1">
                    <ImageShimmer src={getImageURL(image, 'catalog_360')} height="60px">
                      {imageURL => <Img src={imageURL} alt="" width="60px" height="60px" />}
                    </ImageShimmer>
                  </Div>
                  <Div col="3" pl="10px" pr="55px">
                    <Text fontSize="14px" mt="0" mb="5px" color="rgba(0, 0, 0, 0.9)" fontFamily="regular">
                      {name}
                    </Text>
                    <Text fontSize="13px" mt="0" mb="3px" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                      {`Qty-${quantity}`}
                    </Text>
                    {transportId && (
                      <Text mt="0" mb="3px" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`Delivery Partner - ${transportId || '--'}`}
                      </Text>
                    )}
                    {AWB && (
                      <Text mt="0" mb="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`AWB Number - ${AWB || '--'}`}
                      </Text>
                    )}
                  </Div>
                  <Div col="8">
                    <Row
                      ml="-2%"
                      mr="-7%"
                      flexWrap="nowrap"
                      className={`${stylesModal.timeline} ${status.length === 3 ? stylesModal.homewareProduct : ''}`}
                    >
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey, display: active } = statusDetails;
                        return (
                          <Div
                            key={String(i)}
                            display="flexEqual"
                            className={`${stylesModal.trackBlock} ${active === 1 ? stylesModal.active : ''}`}
                          >
                            <Text className={stylesModal.stepText} fontSize="12px">
                              {StatusKey || 'NA'}
                            </Text>
                            <Div className={stylesModal.line} />
                            <Div className={stylesModal.round}>
                              <Img width="16px" height="16px" src={active === 1 ? statusActiveIcon : statusIcon} />
                            </Div>
                          </Div>
                        );
                      })}
                    </Row>
                  </Div>
                </Row>
              );
            })
          )}
        </Div>
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired
};
export default TrackingDetails;
