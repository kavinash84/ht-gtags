import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
// import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import { connect } from 'react-redux';
// import { formatDate } from 'utils/formatters';
// import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import ResponsiveModal from 'components/Modal';
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
      <Div>
        <TitleBar title="Track Order(s)" />
        <Section display="block" p="0" pb="1rem" mb="0" height="auto">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Div type="block" pt="2rem" pb="2.5rem">
              <Row display="block" mr="0" ml="0">
                <form onSubmit={handleSubmit}>
                  <Div col="5">
                    <FormInput
                      size="default"
                      label="Order Number"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={orderId}
                      required
                    />
                  </Div>
                  <Div col="5" pt="0.875rem" pl="1rem">
                    {loading ? (
                      <Button btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                        <span>
                          PLEASE WAIT
                          <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                        </span>
                      </Button>
                    ) : (
                      <Button btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                        SUBMIT
                      </Button>
                    )}
                  </Div>
                </form>
              </Row>
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
                  {loaded && orderId && !onChange ? (
                    <b style={{ color: 'red' }}>
                      {data.status === 'canceled'
                        ? 'This Order is Cancelled !'
                        : error || 'Sorry, No Products Found, Please Check the Order Number'}
                    </b>
                  ) : (
                    ''
                  )}
                </Label>
              )}
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Div>
                  <Label fontSize="0.75rem" lh="1.8" mb="1.125rem">
                    <b>Note:</b> Products with different delivery times may be shipped separately.
                    <br />
                    For any queries please call 18002100004 (10AM - 8PM) or mail us at
                    <a href="mailto:care@homwtown.in"> care@hometown.in</a>
                  </Label>
                </Div>
              </Row>
            </Div>
          </Container>
        </Section>
      </Div>
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
export default connect(
  mapStateToProps,
  null
)(TrackOrder);
