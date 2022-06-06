import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import ResponsiveModal from 'components/Modal';
import TrackingTimeline from '../MyOrder/TrackingTimeline';

const LoaderIcon = require('../../../static/refresh-black.svg');

const mapStateToProps = ({ trackorder }) => ({
  ...trackorder
});
class TrackOrder extends Component {
  render() {
    const {
      handleSubmit, handleChange, loaded, loading, data, orderId, closeStatusModal, onChange
    } = this.props;
    const orders = data.order_items || [];
    const error = data.error || '';
    return (
      <Box py={90}>
        <TitleBar title="Track Your Order" />
        <Box mt={20}>
          <Container width={1}>
            <form onSubmit={handleSubmit}>
              <Row alignItems="flex-end">
                <Box width={5 / 12}>
                  <FormInput
                    size="default"
                    label="Order Number"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={orderId}
                    required
                    mb={0}
                    boxProps={{ mb: 0 }}
                  />
                </Box>
                <Box width={2 / 12} ml={32}>
                  <Button
                    type="submit"
                    fontFamily="medium"
                    height={40}
                    width={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {loading ? (
                      <React.Fragment>
                        PLEASE WAIT
                        <Image className="spin" src={LoaderIcon} width={18} ml={4} />
                      </React.Fragment>
                    ) : (
                        'CONFIRM'
                      )}
                  </Button>
                </Box>
              </Row>
              <Row mt={8}>
                <Box width={5 / 12}>
                  <Text variant="text.small" fontSize={12}>
                    Enter the order number for any order placed online, in a store or by phone.
                  </Text>
                  <Box mt={40}>
                    <Label fontSize={12}>
                      <b>Note :</b> Products with different delivery times may be shipped separately.
                      <br />
                      For any queries please call 08069252525 (10AM - 8PM) or mail us at
                      <a href="mailto:care@homwtown.in"> care@hometown.in</a>
                    </Label>
                  </Box>
                </Box>
              </Row>
            </form>
            {orders.length ? (
              <ResponsiveModal
                classNames={{ modal: 'trackingModal' }}
                onCloseModal={e => {
                  e.preventDefault();
                  closeStatusModal();
                }}
                open={loaded}
              >
                <TrackingTimeline data={orders} error={error} />
              </ResponsiveModal>
            ) : (
                <Label fontSize="0.75rem" lh="1.8" mb="1.125rem">
                  {loaded && !onChange ? (
                    <b style={{ color: 'red' }}>
                      {data.status === 'canceled'
                        ? 'This Order is Cancelled !'
                        : error || 'Sorry, no products found, please call customer care for further assistance !'}
                    </b>
                  ) : (
                      ''
                    )}
                </Label>
              )}
          </Container>
        </Box>
      </Box>
    );
  }
}

TrackOrder.propTypes = {
  // status: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  // error: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  onChange: PropTypes.bool.isRequired,
  // errorMessage: PropTypes.string.isRequired,
  closeStatusModal: PropTypes.func.isRequired
};
export default connect(mapStateToProps, null)(TrackOrder);
