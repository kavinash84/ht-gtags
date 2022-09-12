import React from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/* ====== Page Components ====== */
import Footer from 'components/Footer';
import Header from 'components/Header';
import TrackOrderContainer from 'components/TrackOrder';
import { trackOrder, closeStatusModal } from 'redux/modules/trackorder';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeStatusModal
    },
    dispatch
  );
class TrackOrder extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    status: false,
    orderId: '',
    onChange: false
  };

  componentDidMount = () => {
    const { dispatch } = this.context.store;
    const url = window.location || '';
    const urlArray = url.pathname ? url.pathname.split('/')[2] : '';
    const orderNum = urlArray ? urlArray.split('=')[1] : undefined;
    if (orderNum) {
      this.setStatus(orderNum);
      dispatch(trackOrder(orderNum));
    }
  };

  setStatus = orderNum => {
    this.setState({
      status: true,
      onChange: false,
      orderId: orderNum
    });
  };

  handleSubmit = e => {
    const { dispatch } = this.context.store;
    e.preventDefault();
    this.setState({
      status: true,
      onChange: false
    });
    dispatch(trackOrder(this.state.orderId));
  };
  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      orderId: value,
      onChange: true
    });
  };

  render() {
    const { closeStatusModal: closeModal } = this.props;
    /* eslint-disable max-len */
    const seoDescription =
      'Tracking the order that you placed with us? All you need to have is your order number. Visit our track order page at Hometown to know about your orders today!';
    /* eslint-enable max-len */
    return (
      <Wrapper>
        <Helmet title="Track Order - Hometown.in" />
        <Helmet>
          <meta name="description" content={seoDescription} />
        </Helmet>
        <Body>
          {/* Header */}
          <Header />

          {/* Container */}
          <Container>
            <TrackOrderContainer
              status={this.state.status}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              loading={false}
              orderId={this.state.orderId}
              onChange={this.state.onChange}
              closeStatusModal={closeModal}
            />
          </Container>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
TrackOrder.propTypes = {
  closeStatusModal: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(TrackOrder);
