import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBar from 'newComponents/TitleBar';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
// import Span from 'hometown-components-dev/lib/Span';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';
// import { formatDate } from 'utils/formatters';
// import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import ResponsiveModal from 'newComponents/Modal';
import TrackingTimeline from '../MyOrder/TrackingTimeline';

const LoaderIcon = require('../../../static/refresh-black.svg');
// const styles = require('./TrackOrder.scss');

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
      <BoxHtV1>
        <TitleBar title="Track Order(s)" />
        <SectionHtV1 display="block" p="0" pb="1rem" mb="0" height="auto">
          <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
            <BoxHtV1 type="block" pt="2rem" pb="2.5rem">
              <RowHtV1 display="block" mr="0" ml="0">
                <form onSubmit={handleSubmit}>
                  <BoxHtV1 col="5">
                    <FormInput
                      size="default"
                      label="Order Number"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={orderId}
                      required
                    />
                  </BoxHtV1>
                  <BoxHtV1 col="5" pt="0.875rem" pl="1rem">
                    {loading ? (
                      <ButtonHtV1 btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                        <span>
                          PLEASE WAIT
                          <ImageHtV1 className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                        </span>
                      </ButtonHtV1>
                    ) : (
                      <ButtonHtV1 btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                        SUBMIT
                      </ButtonHtV1>
                    )}
                  </BoxHtV1>
                </form>
              </RowHtV1>
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
                <LabelHtV1 fontSize="0.75rem" lh="1.8" mb="1.125rem">
                  {loaded && orderId && !onChange ? (
                    <b style={{ color: 'red' }}>
                      {data.status === 'canceled'
                        ? 'This Order is Cancelled !'
                        : error || 'Sorry, no products found, please call customer care for further assistance !'}
                    </b>
                  ) : (
                    ''
                  )}
                </LabelHtV1>
              )}
              <RowHtV1 display="block" mr="0" ml="0" mt="1rem">
                <BoxHtV1>
                  <LabelHtV1 fontSize="0.75rem" lh="1.8" mb="1.125rem">
                    <b>Note:</b> Products with different delivery times may be shipped separately.
                    <br />
                    For any queries please call 18002100004 (10AM - 8PM) or mail us at
                    <a href="mailto:care@homwtown.in"> care@hometown.in</a>
                  </LabelHtV1>
                </BoxHtV1>
              </RowHtV1>
            </BoxHtV1>
          </ContainerHtV1>
        </SectionHtV1>
      </BoxHtV1>
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
