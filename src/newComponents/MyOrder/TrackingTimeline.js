import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import { getImageURL } from 'utils/helper';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';

// const statusIcon = require('../../../static/status-pending.svg');
// const statusActiveIcon = require('../../../static/status-active.svg');
const rectangleIcon = require('../../../static/rectangle.svg');
const OvalIcon = require('../../../static/oval.svg');
const statusIcon = require('../../../static/rightIcon.svg');
const filledRectangleIcon = require('../../../static/filledRectangleIcon.svg');

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const styles = require('./MyOrder.scss');
    const { data, error } = this.props;
    return (
      <div className={stylesModal.trackingModal}>
        <RowHtV1 type="block" margin="0px 0px 1rem" className={styles.blockHeading}>
          <BoxHtV1 col="6" pt="5px">
            <HeadingHtV1 fontSize={21} fontWeight="bold" color="#474747" variant="profileDashBoard">
              {error ? 'Error' : 'Track Order'}
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
                  <ColHtV1 col="1" width="26.33%" float="left">
                    <ImageShimmerHtV1 src={getImageURL(image, 'catalog_360')}>
                      {imageURL => <ImageHtV1 src={imageURL} alt="" width="60px" height="60px" />}
                    </ImageShimmerHtV1>
                    <BoxHtV1 col="3" pr="55px" pt="9px" float="left">
                      <TextHtV1
                        fontSize="14px"
                        mt="0"
                        mb="5px"
                        lineHeight="1.6"
                        color="rgba(0, 0, 0, 0.9)"
                        fontFamily="regular"
                      >
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
                  </ColHtV1>
                  <BoxHtV1 col="8" width="66.66%" float="left">
                    <ColHtV1
                      ml="-2%"
                      mr="-7%"
                      flexWrap="nowrap"
                      className={`${stylesModal.timeline} ${status.length === 3 ? stylesModal.homewareProduct : ''}`}
                    >
                      {/* {status.map((statusDetails, i) => {
                        const { status: StatusKey, display: active } = statusDetails;
                        return (
                          <BoxHtV1
                            key={String(i)}
                            display="flexEqual"
                            flexGrow="1"
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
                      })} */}

                      <ImageHtV1 src={rectangleIcon} sx={{ position: 'relative' }} />
                      <BoxHtV1 sx={{ position: 'absolute' }}>
                        <ImageHtV1 src={filledRectangleIcon} sx={{ position: 'relative' }} />
                        <ImageHtV1
                          ml={-21}
                          mt={4}
                          width="16px"
                          height="16px"
                          src={OvalIcon}
                          sx={{ position: 'absolute' }}
                        />
                        <ImageHtV1 ml={-18} mt={9} src={statusIcon} sx={{ position: 'absolute' }} />
                      </BoxHtV1>
                    </ColHtV1>
                    <RowHtV1 pt={14}>
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey } = statusDetails;
                        return (
                          <RowHtV1 key={String(i)}>
                            <TextHtV1
                              pr={50}
                              fontSize={15}
                              width={1}
                              fontWeight="500"
                              color="#474747"
                              variant="profileDashBoard"
                            >
                              {StatusKey || 'NA'}
                            </TextHtV1>
                          </RowHtV1>
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
