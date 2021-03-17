import React, { Component } from 'react';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import ResponsiveModal from 'components/Modal';

const Step1Icon = require('../../../static/basket.png');
const Step2Icon = require('../../../static/checked.png');

export default class TrackOrderModal extends Component {
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const styles = require('./TrackOrderModal.scss');
    return (
      <div>
        <ButtonHtV1 p="0" ml="1.25rem" onClick={this.onOpenModal}>
          TrackOrder
        </ButtonHtV1>
        <ResponsiveModal
          classNames={{ modal: styles.trackOrderModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.trackOrderModalWrapper}>
            <RowHtV1 mr="0" ml="0" pl="0" pr="0">
              <BoxHtV1 col="12" ta="center" bg="#f98d29">
                <HeadingHtV1 color="white" mt="0.9375em" mb="0.9375em" fontFamily="700">
                  ORDER TRACKING
                </HeadingHtV1>
              </BoxHtV1>
            </RowHtV1>
            <RowHtV1 mr="0" ml="0" pl="0" pr="0">
              <BoxHtV1 col="4" bg="#f98d29" pt="1.25rem" pb="1.25rem" ta="center">
                <LabelHtV1 color="#f5a623" fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <BoxHtV1 mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </BoxHtV1>
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="4" bg="#f98d29" pt="1.25rem" pb="1.25rem" ta="center">
                <LabelHtV1 color="#f5a623" fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <BoxHtV1 mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </BoxHtV1>
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="4" bg="#f98d29" pt="1.25rem" pb="1.25rem" ta="center">
                <LabelHtV1 color="#f5a623" fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <BoxHtV1 mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </BoxHtV1>
                </LabelHtV1>
              </BoxHtV1>
            </RowHtV1>
            <RowHtV1 mr="0" ml="0" mt="4rem" mb="4rem" pl="0" pr="0">
              <BoxHtV1 col="3" ta="center" className={`${styles.processBlock} ${styles.completed}`}>
                <div className={styles.processImg}>
                  <ImageHtV1 src={Step1Icon} alt="" m="auto" />
                </div>
                <LabelHtV1 color="rgba(0, 0, 0, 0.8)" fontFamily="medium" mt="0.625rem">
                  Ordered
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="3" ta="center" className={`${styles.processBlock} ${styles.completed}`}>
                <div className={styles.processImg}>
                  <ImageHtV1 src={Step1Icon} alt="" m="auto" />
                </div>
                <LabelHtV1 color="rgba(0, 0, 0, 0.8)" fontFamily="medium" mt="0.625rem">
                  Dispatched
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <ImageHtV1 src={Step2Icon} alt="" m="auto" />
                </div>
                <LabelHtV1 color="rgba(0, 0, 0, 0.8)" fontFamily="medium" mt="0.625rem">
                  Reached Nearest Hub
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <ImageHtV1 src={Step2Icon} alt="" m="auto" />
                </div>
                <LabelHtV1 color="rgba(0, 0, 0, 0.8)" fontFamily="medium" mt="0.625rem">
                  Out For Delivery
                </LabelHtV1>
              </BoxHtV1>
              <BoxHtV1 col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <ImageHtV1 src={Step2Icon} alt="" m="auto" />
                </div>
                <LabelHtV1 color="rgba(0, 0, 0, 0.8)" fontFamily="medium" mt="0.625rem">
                  Delivered
                </LabelHtV1>
              </BoxHtV1>
            </RowHtV1>
          </div>
        </ResponsiveModal>
      </div>
    );
  }
}
