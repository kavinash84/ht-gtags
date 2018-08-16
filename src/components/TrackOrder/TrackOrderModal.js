import React, { Component } from 'react';
// import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import Row from 'hometown-components/lib/Row';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import Heading from 'hometown-components/lib/Heading';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';
// import { Label } from 'hometown-components/lib/Label';
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
        <Button p="0" ml="1.25rem" onClick={this.onOpenModal}>
          TrackOrder
        </Button>
        <ResponsiveModal
          classNames={{ modal: styles.trackOrderModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.trackOrderModalWrapper}>
            <Row mr="0" ml="0" pl="0" pr="0">
              <Div col="12" ta="center" bg={Theme.colors.primary}>
                <Heading color="white" mt="0.9375em" mb="0.9375em" fontFamily="700">
                  ORDER TRACKING
                </Heading>
              </Div>
            </Row>
            <Row mr="0" ml="0" pl="0" pr="0">
              <Div col="4" bg={Theme.colors.primary} pt="1.25rem" pb="1.25rem" ta="center">
                <Label color={Theme.colors.yellowDark} fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
              <Div col="4" bg={Theme.colors.primary} pt="1.25rem" pb="1.25rem" ta="center">
                <Label color={Theme.colors.yellowDark} fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
              <Div col="4" bg={Theme.colors.primary} pt="1.25rem" pb="1.25rem" ta="center">
                <Label color={Theme.colors.yellowDark} fontSize="1.125rem" fontFamily="medium">
                  Shipped Via :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
            </Row>
            <Row mr="0" ml="0" mt="4rem" mb="4rem" pl="0" pr="0">
              <Div col="3" ta="center" className={`${styles.processBlock} ${styles.completed}`}>
                <div className={styles.processImg}>
                  <Img src={Step1Icon} alt="" m="auto" />
                </div>
                <Label color={Theme.colors.textDark} fontFamily="medium" mt="0.625rem">
                  Ordered
                </Label>
              </Div>
              <Div col="3" ta="center" className={`${styles.processBlock} ${styles.completed}`}>
                <div className={styles.processImg}>
                  <Img src={Step1Icon} alt="" m="auto" />
                </div>
                <Label color={Theme.colors.textDark} fontFamily="medium" mt="0.625rem">
                  Dispatched
                </Label>
              </Div>
              <Div col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <Img src={Step2Icon} alt="" m="auto" />
                </div>
                <Label color={Theme.colors.textDark} fontFamily="medium" mt="0.625rem">
                  Reached Nearest Hub
                </Label>
              </Div>
              <Div col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <Img src={Step2Icon} alt="" m="auto" />
                </div>
                <Label color={Theme.colors.textDark} fontFamily="medium" mt="0.625rem">
                  Out For Delivery
                </Label>
              </Div>
              <Div col="3" ta="center" className={`${styles.processBlock}`}>
                <div className={styles.processImg}>
                  <Img src={Step2Icon} alt="" m="auto" />
                </div>
                <Label color={Theme.colors.textDark} fontFamily="medium" mt="0.625rem">
                  Delivered
                </Label>
              </Div>
            </Row>
          </div>
        </ResponsiveModal>
      </div>
    );
  }
}
