import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { checkGiftWrap, loadCart } from 'redux/modules/cart';

const styles = require('./productitem.scss');

@connect(({ app, cart, pincode }) => ({
  session: app.sessionId,
  summary: cart.summary,
  products: cart.data,
  pincode: pincode.selectedPincode
}))
class ApplyGiftWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isChecked: false,
    shouldShow: false,
    loading: false
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { summary, products } = this.props;
    this.setState({ isChecked: summary.is_gift_wrap_applied });
    const found = products.find(element => element.product_info.gift_wrap === '1') || '';
    if (found) {
      this.setState({ shouldShow: true });
    } else {
      this.setState({ shouldShow: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { summary, products } = this.props;
    if (prevProps.products !== products) {
      const found = products.find(element => element.product_info.gift_wrap === '1') || '';
      console.log(found, 'found');
      if (found) {
        this.setState({ shouldShow: true });
      } else {
        this.setState({ shouldShow: false });
      }
    }
  }

  handleCheckboxClick = e => {
    const { dispatch } = this.context.store;
    const { session, pincode } = this.props;
    this.setState({ loading: true });
    this.setState({ isChecked: !this.state.isChecked });
    dispatch(checkGiftWrap(!this.state.isChecked));
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    setTimeout(() => {
      dispatch(loadCart(session, pincode));
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.shouldShow ? (
          <div style={{ background: "white", padding: "0px 10px 0px" }}>
            <label
              className={styles.checkbox_container}
              style={{ marginBottom: "0px", color: "black" }}
            >
              Add Gift wrap to eligible products
              <input
                type="checkbox"
                onClick={this.handleCheckboxClick}
                checked={this.state.isChecked}
                disabled={this.state.loading}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default ApplyGiftWrapper;
