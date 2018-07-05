import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { connect } from 'react-redux';

const mapStateToProps = ({ trackorder }) => ({
  ...trackorder
});

const TrackOrder = ({
  status, handleSubmit, handleChange, loading, data, error, errorMessage
}) => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Track Order(s)" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div type="block" pt="2rem" pb="2.5rem">
        <Row display="block" mr="0" ml="0">
          <form onSubmit={handleSubmit}>
            <Div col="5">test</Div>
          </form>
          <input type="text" onChange={handleChange} required />
          <button type="submit">SUBMIT</button>
          {status && (
            <div>
              {loading && !error && <div>Loading...</div>}
              {!error && !loading && <div> {JSON.stringify(data)}</div>}
              {error && !loading && <div>{JSON.stringify(errorMessage)}</div>}
            </div>
          )}
        </Row>
      </Div>
    </Container>
  </Section>
);

TrackOrder.propTypes = {
  status: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null
)(TrackOrder);
