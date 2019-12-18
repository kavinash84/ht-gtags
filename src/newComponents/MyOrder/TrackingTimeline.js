import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import { getImageURL } from 'utils/helper';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';

const statusIcon = require('../../../static/status-pending.svg');
const statusActiveIcon = require('../../../static/status-active.svg');

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const styles = require('./MyOrder.scss');
    const { data, error } = this.props;
    return (
      <div className={stylesModal.trackingModal}>
        <RowHtV1 type="block" m="0" mb="1rem" className={styles.blockHeading}>
          <BoxHtV1 col="6" pt="5px">
            <HeadingHtV1 fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              {error ? 'Error' : 'Order Tracking'}
            </HeadingHtV1>
          </BoxHtV1>
        </RowHtV1>
        <BoxHtV1 p="25px 25px 13px">
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
                <RowHtV1
                  className={stylesModal.blockWrapper}
                  type="block"
                  ml="0"
                  mr="0"
                  mb="1rem"
                  pb="15px"
                  key={String(index)}
                >
                  <BoxHtV1 col="1">
                    <ImageShimmerHtV1 src={getImageURL(image, 'catalog_360')} height="60px">
                      {imageURL => <ImageHtV1 src={imageURL} alt="" width="60px" height="60px" />}
                    </ImageShimmerHtV1>
                  </BoxHtV1>
                  <BoxHtV1 col="3" pl="10px" pr="55px">
                    <TextHtV1 fontSize="14px" mt="0" mb="5px" color="rgba(0, 0, 0, 0.9)" fontFamily="regular">
                      {name}
                    </TextHtV1>
                    <TextHtV1 fontSize="13px" mt="0" mb="3px" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                      {`Qty-${quantity}`}
                    </TextHtV1>
                    {transportId && (
                      <TextHtV1 mt="0" mb="3px" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`Delivery Partner - ${transportId || '--'}`}
                      </TextHtV1>
                    )}
                    {AWB && (
                      <TextHtV1 mt="0" mb="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`AWB Number - ${AWB || '--'}`}
                      </TextHtV1>
                    )}
                  </BoxHtV1>
                  <BoxHtV1 col="8">
                    <RowHtV1
                      ml="-2%"
                      mr="-7%"
                      flexWrap="nowrap"
                      className={`${stylesModal.timeline} ${status.length === 3 ? stylesModal.homewareProduct : ''}`}
                    >
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey, display: active } = statusDetails;
                        return (
                          <BoxHtV1
                            key={String(i)}
                            display="flexEqual"
                            className={`${stylesModal.trackBlock} ${active === 1 ? stylesModal.active : ''}`}
                          >
                            <TextHtV1 className={stylesModal.stepText} fontSize="12px">
                              {StatusKey || 'NA'}
                            </TextHtV1>
                            <BoxHtV1 className={stylesModal.line} />
                            <BoxHtV1 className={stylesModal.round}>
                              <ImageHtV1
                                width="16px"
                                height="16px"
                                src={active === 1 ? statusActiveIcon : statusIcon}
                              />
                            </BoxHtV1>
                          </BoxHtV1>
                        );
                      })}
                    </RowHtV1>
                  </BoxHtV1>
                </RowHtV1>
              );
            })
          )}
        </BoxHtV1>
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired
};
export default TrackingDetails;
