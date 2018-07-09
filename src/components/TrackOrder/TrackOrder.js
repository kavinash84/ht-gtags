import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import { connect } from 'react-redux';
import { formatDate } from 'utils/formatters';

const styles = require('./TrackOrder.scss');

const mapStateToProps = ({ trackorder }) => ({
  ...trackorder
});

const TrackOrder = ({
  status, handleSubmit, handleChange, loading, data, error, errorMessage, orderId
}) => (
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
                  label="Order Number(s)*"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  value={orderId}
                  required
                />
              </Div>
              <Div col="5" pt="0.875rem" pl="1rem">
                <Button btnType="primary" fontWeight="regular" height="42px" mt="1.25rem" type="submit">
                  SUBMIT
                </Button>
              </Div>
            </form>
          </Row>
          {status && (
            <div>
              {loading && !error && <div>Loading...</div>}
              {error && !loading && <div>{errorMessage}</div>}
              {!error &&
                !loading && (
                <Row display="block" mr="0" ml="0" mt="2rem">
                  <Div col="12" className={styles.trackOrderTable} p="1.25rem">
                    <Label fontSize="1rem" mb="1.125rem">
                        Order No. : {data.order_nr || null}
                      <Span fontSize="0.875rem" ml="1rem">
                          ({formatDate(data.created_at)})
                      </Span>
                    </Label>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th colSpan="2">Item</th>
                          <th>Status</th>
                          <th>Updated On</th>
                          <th>Carrier</th>
                          <th>Tracking ID</th>
                        </tr>
                        {data.order_items.map(item => (
                          <tr key={item.order_item_id}>
                            <td>
                              <img className="thumb" src="http://via.placeholder.com/75x75" alt="" />
                            </td>
                            <td>{item.product_name}</td>
                            <td>{item.order_item_status_display_name || 'Not Available'}</td>
                            <td>{formatDate(item.updated_at) || 'Not Available'}</td>
                            <td>{item.carrier_name || 'Not Available'}</td>
                            <td>{item.tracking_id || 'Not Available'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Div>
                </Row>
              )}
            </div>
          )}
          <Row display="block" mr="0" ml="0" mt="1rem">
            <Div>
              <Label fontSize="0.75rem" lh="1.8" mb="1.125rem">
                <b>Note:</b> Products with different delivery times may be shipped separately.<br />
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

TrackOrder.propTypes = {
  status: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null
)(TrackOrder);
