import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

/**
 * Page Components
 */
import ResponsiveModal from 'newComponents/Modal';
import TrackingTimeline from '../MyOrder/TrackingTimeline';

/**
 * Icons
 */
const LoaderIcon = require('../../../static/refresh-white.svg');

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
      <Box>
        <Row mx={0} mb={15}>
          <Heading fontSize={22} fontWeight="bold" color="#474747" variant="profileDashBoard">
            Track Your Order
          </Heading>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col variant="col-4">
              <FormInput
                size="default"
                label="Order Number"
                type="text"
                placeholder=""
                onChange={handleChange}
                value={orderId}
                required
              />
            </Col>
            <Col variant="col-2">
              {loading ? (
                <Button height={40} mt="26px" type="submit" display="flex" alignItems="center" justifyContent="center">
                  PLEASE WAIT
                  <Image className="spin" src={LoaderIcon} width="18px" ml={10} />
                </Button>
              ) : (
                <Button height="38px" mt="26px" type="submit">
                  CONFIRM
                </Button>
              )}
            </Col>
          </Row>
          <Row mx={0} mt={-10} mb={40}>
            <Label fontSize={12}>Enter the order number for any order placed online, in a store or by phone.</Label>
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
          <Box mb={20}>
            <Label fontSize={16}>
              {loaded && orderId && !onChange && (
                <b style={{ color: 'red' }}>
                  {data.status === 'canceled'
                    ? 'This Order is Cancelled !'
                    : error || 'Sorry, no products found, please call customer care for further assistance !'}
                </b>
              )}
            </Label>
          </Box>
        )}
        <Label fontSize={12}>
          <b>Note:</b> Products with different delivery times may be shipped separately.
          <br />
          For any queries please call 18002100004 (10AM - 8PM) or mail us at
          <a href="mailto:care@homwtown.in"> care@hometown.in</a>
        </Label>
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
